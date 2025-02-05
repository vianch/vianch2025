import { Redis, type SetCommandOptions } from "@upstash/redis";

class RedisService {
  private static instance: RedisService;
  private redis: Redis | null = null;
  private isAvailable = true;
  private retryCount = 0;
  private lastError: Error | null = null;

  private readonly cacheTTL = 86400; // 24 hours in seconds
  private readonly maxRetries = 3;

  private constructor() {
    this.initializeRedis();
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }

    return RedisService.instance;
  }

  private initializeRedis(): void {
    try {
      this.redis = Redis.fromEnv();
      this.isAvailable = true;
      this.lastError = null;
    } catch (error) {
      this.handleConnectionError(error as Error);
    }
  }

  private handleConnectionError(error: Error): void {
    console.error("Redis connection error:", error);
    this.isAvailable = false;
    this.lastError = error;
  }

  private async reconnect(): Promise<void> {
    if (this.retryCount >= this.maxRetries) {
      console.warn("Max Redis reconnection attempts reached");
      return;
    }

    try {
      this.retryCount++;
      this.initializeRedis();

      if (this.redis) {
        await this.redis.ping();
        this.retryCount = 0;
      }
    } catch (error) {
      this.handleConnectionError(error as Error);
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    if (!this.isAvailable || !this.redis) {
      if (this.retryCount < this.maxRetries) {
        await this.reconnect();
      }

      if (!this.isAvailable || !this.redis) {
        return null;
      }
    }

    try {
      return await this.redis.get<T>(key);
    } catch (error) {
      this.handleConnectionError(error as Error);
      return null;
    }
  }

  public async set(
    key: string,
    value: unknown,
    options: { ex: number } = { ex: this.cacheTTL }
  ): Promise<boolean> {
    if (!this.isAvailable || !this.redis) {
      if (this.retryCount < this.maxRetries) {
        await this.reconnect();
      }

      if (!this.isAvailable || !this.redis) {
        return false;
      }
    }

    try {
      await this.redis.set(key, value, { ex: options?.ex } as SetCommandOptions);
      return true;
    } catch (error) {
      this.handleConnectionError(error as Error);
      return false;
    }
  }

  public getStatus(): { isAvailable: boolean; lastError: Error | null } {
    return {
      isAvailable: this.isAvailable,
      lastError: this.lastError,
    };
  }
}

export const redisService = RedisService.getInstance();
