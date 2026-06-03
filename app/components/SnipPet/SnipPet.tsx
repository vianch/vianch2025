"use client";

import {
  PointerEvent as ReactPointerEvent,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* Constants */
import {
  PetAfraidFrame,
  PetAfraidLiftThresholdPx,
  PetClickMovementThresholdPx,
  PetDazedFrame,
  PetDesktopMinWidthPx,
  PetDizzyFrame,
  PetDizzyMessages,
  PetDropMinHeightPx,
  PetEdgePaddingPx,
  PetExcitedFrame,
  PetFacings,
  PetGrabbedFrame,
  PetGravityPxPerSecondSquared,
  PetGridHeight,
  PetGridWidth,
  PetGroundOffsetPx,
  PetHappyFrame,
  PetHardImpactRatio,
  PetIdleFrame,
  PetIdlePauseMs,
  PetLandingDurationMs,
  PetLandingMessages,
  PetLegFrameIntervalMs,
  PetMaxImpactSpeedPxPerSecond,
  PetMaxWalkBeforeIdleMs,
  PetMessages,
  PetMinWalkBeforeIdleMs,
  PetModes,
  PetPixelSizePx,
  PetReactionDurationMs,
  PetScaredMessages,
  PetShakeDecayPerSecond,
  PetShakeMaxEnergy,
  PetShakeMinDeltaPx,
  PetShakeReleaseEnergy,
  PetShakeTriggerEnergy,
  PetWalkFrames,
  PetWalkSpeedPxPerSecond,
} from "@/lib/constants/snipPet.constants";

/* Utils */
import { frameToCells } from "@/lib/utils/snipPet.utils";

/* Types */
import type { PetFacing, PetMode } from "@/lib/constants/snipPet.constants";

/* Styles */
import styles from "./SnipPet.module.css";

/**
 * SnipPet — a tiny pixel-art mascot that walks along the bottom of the viewport,
 * can be picked up and tossed (with real gravity + squash-on-landing), shaken
 * until dizzy, and clicked for a reaction. A playful nod to the Snippets app.
 * Desktop + fine-pointer only, and fully inert under prefers-reduced-motion.
 */
const SnipPet = (): ReactElement => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [mode, setMode] = useState<PetMode>(PetModes.Walking);
  const [legFrameIndex, setLegFrameIndex] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<number>(PetEdgePaddingPx);
  const facingRef = useRef<PetFacing>(PetFacings.Right);
  const liftRef = useRef<number>(0);
  const modeRef = useRef<PetMode>(PetModes.Walking);
  const legAccumulatorRef = useRef<number>(0);
  const walkUntilRef = useRef<number>(0);
  const idleUntilRef = useRef<number>(0);
  const lastTimestampRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);
  const reactionCountRef = useRef<number>(0);
  const reactionExcitedRef = useRef<boolean>(false);
  const scaredCountRef = useRef<number>(0);
  const landingCountRef = useRef<number>(0);
  const dizzyCountRef = useRef<number>(0);
  const reactionTimeoutRef = useRef<number>(0);
  const fallVelocityRef = useRef<number>(0);
  const impactRef = useRef<number>(0);
  const landingUntilRef = useRef<number>(0);
  const shakeEnergyRef = useRef<number>(0);
  const shakeDirectionRef = useRef<number>(0);
  const lastPointerXRef = useRef<number>(0);
  const grabOffsetXRef = useRef<number>(0);
  const dragStartRef = useRef<{ moved: boolean; x: number; y: number } | null>(null);

  const petWidthPx = PetGridWidth * PetPixelSizePx;
  const petHeightPx = PetGridHeight * PetPixelSizePx;

  const activeFrame = useMemo<PetFrame>(() => {
    if (mode === PetModes.Afraid) {
      return PetAfraidFrame;
    }

    if (mode === PetModes.Grabbed) {
      return PetGrabbedFrame;
    }

    if (mode === PetModes.Dizzy) {
      return PetDizzyFrame;
    }

    if (mode === PetModes.Excited) {
      return PetExcitedFrame;
    }

    if (mode === PetModes.Celebrating) {
      return PetHappyFrame;
    }

    if (mode === PetModes.Falling) {
      return PetAfraidFrame;
    }

    if (mode === PetModes.Landing) {
      return PetDazedFrame;
    }

    if (mode === PetModes.Walking) {
      return PetWalkFrames[legFrameIndex] ?? PetIdleFrame;
    }

    return PetIdleFrame;
  }, [legFrameIndex, mode]);

  const cells = useMemo<PetCell[]>(() => frameToCells(activeFrame), [activeFrame]);

  const updateMode = (nextMode: PetMode): void => {
    modeRef.current = nextMode;
    setMode(nextMode);
  };

  const renderPetTransform = (): void => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.style.setProperty("--pet-facing", String(facingRef.current));
    container.style.setProperty("--pet-impact", String(impactRef.current));
    container.style.transform = `translate3d(${Math.round(positionRef.current)}px, ${-Math.round(
      liftRef.current
    )}px, 0)`;
  };

  const triggerClickReaction = (): void => {
    const index = reactionCountRef.current % PetMessages.length;

    reactionExcitedRef.current = !reactionExcitedRef.current;
    reactionCountRef.current += 1;
    liftRef.current = 0;
    setMessage(PetMessages[index] ?? null);
    updateMode(reactionExcitedRef.current ? PetModes.Excited : PetModes.Celebrating);
    window.clearTimeout(reactionTimeoutRef.current);

    reactionTimeoutRef.current = window.setTimeout(() => {
      setMessage(null);
      walkUntilRef.current = 0;
      updateMode(PetModes.Walking);
    }, PetReactionDurationMs);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>): void => {
    event.preventDefault();
    window.clearTimeout(reactionTimeoutRef.current);
    setMessage(null);
    dragStartRef.current = { moved: false, x: event.clientX, y: event.clientY };
    grabOffsetXRef.current = event.clientX - positionRef.current;
    shakeEnergyRef.current = 0;
    shakeDirectionRef.current = 0;
    lastPointerXRef.current = event.clientX;
    updateMode(PetModes.Grabbed);

    const handleMove = (moveEvent: PointerEvent): void => {
      const maxX = window.innerWidth - petWidthPx - PetEdgePaddingPx;
      const nextX = moveEvent.clientX - grabOffsetXRef.current;
      const nextLift = window.innerHeight - PetGroundOffsetPx - petHeightPx - moveEvent.clientY;

      positionRef.current = Math.max(
        PetEdgePaddingPx,
        Math.min(nextX, Math.max(PetEdgePaddingPx, maxX))
      );
      liftRef.current = Math.max(0, nextLift);

      if (dragStartRef.current) {
        const distance = Math.hypot(
          moveEvent.clientX - dragStartRef.current.x,
          moveEvent.clientY - dragStartRef.current.y
        );

        if (distance > PetClickMovementThresholdPx) {
          dragStartRef.current.moved = true;
        }
      }

      const movementX = moveEvent.clientX - lastPointerXRef.current;
      const movementDirection = Math.sign(movementX);

      lastPointerXRef.current = moveEvent.clientX;

      if (
        Math.abs(movementX) >= PetShakeMinDeltaPx &&
        movementDirection !== 0 &&
        shakeDirectionRef.current !== 0 &&
        movementDirection !== shakeDirectionRef.current
      ) {
        shakeEnergyRef.current = Math.min(shakeEnergyRef.current + 1, PetShakeMaxEnergy);
      }

      if (movementDirection !== 0) {
        shakeDirectionRef.current = movementDirection;
      }

      renderPetTransform();
    };

    const handleUp = (): void => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);

      const wasClick = dragStartRef.current ? !dragStartRef.current.moved : true;

      dragStartRef.current = null;
      shakeEnergyRef.current = 0;
      shakeDirectionRef.current = 0;

      if (wasClick) {
        triggerClickReaction();

        return;
      }

      setMessage(null);

      if (isAnimatingRef.current && liftRef.current > PetDropMinHeightPx) {
        fallVelocityRef.current = 0;
        updateMode(PetModes.Falling);

        return;
      }

      liftRef.current = 0;
      walkUntilRef.current = 0;
      updateMode(PetModes.Walking);

      if (!isAnimatingRef.current) {
        renderPetTransform();
      }
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  };

  const handlePointerEnter = (): void => {
    if (modeRef.current === PetModes.Walking) {
      idleUntilRef.current = 0;
      walkUntilRef.current = 0;
      updateMode(PetModes.Idle);
    }
  };

  const handlePointerLeave = (): void => {
    if (modeRef.current === PetModes.Idle && idleUntilRef.current === 0) {
      walkUntilRef.current = 0;
      updateMode(PetModes.Walking);
    }
  };

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${PetDesktopMinWidthPx}px) and (pointer: fine)`);

    const sync = (): void => setIsDesktop(query.matches);

    sync();
    query.addEventListener("change", sync);

    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      return;
    }

    renderPetTransform();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Stand still under reduced motion. Defer the state update a tick so we
      // don't call setState synchronously inside the effect body.
      const idleTimeout = window.setTimeout(() => updateMode(PetModes.Idle), 0);

      return () => window.clearTimeout(idleTimeout);
    }

    isAnimatingRef.current = true;

    const step = (timestamp: number): void => {
      const previous = lastTimestampRef.current ?? timestamp;
      const deltaMs = Math.min(timestamp - previous, 48);
      const maxX = window.innerWidth - petWidthPx - PetEdgePaddingPx;

      lastTimestampRef.current = timestamp;

      if (shakeEnergyRef.current > 0) {
        shakeEnergyRef.current = Math.max(
          0,
          shakeEnergyRef.current - (PetShakeDecayPerSecond * deltaMs) / 1000
        );
      }

      if (modeRef.current === PetModes.Walking) {
        if (walkUntilRef.current === 0) {
          const walkSpan = PetMaxWalkBeforeIdleMs - PetMinWalkBeforeIdleMs;

          walkUntilRef.current =
            timestamp + PetMinWalkBeforeIdleMs + (Math.floor(timestamp) % walkSpan);
        }

        positionRef.current += (PetWalkSpeedPxPerSecond * facingRef.current * deltaMs) / 1000;

        if (positionRef.current <= PetEdgePaddingPx) {
          positionRef.current = PetEdgePaddingPx;
          facingRef.current = PetFacings.Right;
        } else if (positionRef.current >= maxX) {
          positionRef.current = Math.max(PetEdgePaddingPx, maxX);
          facingRef.current = PetFacings.Left;
        }

        legAccumulatorRef.current += deltaMs;

        if (legAccumulatorRef.current >= PetLegFrameIntervalMs) {
          legAccumulatorRef.current = 0;
          setLegFrameIndex((previousIndex) => (previousIndex === 0 ? 1 : 0));
        }

        if (timestamp >= walkUntilRef.current) {
          walkUntilRef.current = 0;
          idleUntilRef.current = timestamp + PetIdlePauseMs;
          updateMode(PetModes.Idle);
        }
      } else if (modeRef.current === PetModes.Idle) {
        if (idleUntilRef.current !== 0 && timestamp >= idleUntilRef.current) {
          idleUntilRef.current = 0;
          walkUntilRef.current = 0;
          updateMode(PetModes.Walking);
        }
      } else if (modeRef.current === PetModes.Falling) {
        fallVelocityRef.current += (PetGravityPxPerSecondSquared * deltaMs) / 1000;
        liftRef.current -= (fallVelocityRef.current * deltaMs) / 1000;

        if (liftRef.current <= 0) {
          const impact = Math.min(fallVelocityRef.current / PetMaxImpactSpeedPxPerSecond, 1);

          liftRef.current = 0;
          impactRef.current = impact;
          fallVelocityRef.current = 0;
          landingUntilRef.current = timestamp + PetLandingDurationMs;

          if (impact >= PetHardImpactRatio) {
            const landingIndex = landingCountRef.current % PetLandingMessages.length;

            landingCountRef.current += 1;
            setMessage(PetLandingMessages[landingIndex] ?? null);
          }

          updateMode(PetModes.Landing);
        }
      } else if (modeRef.current === PetModes.Landing) {
        if (timestamp >= landingUntilRef.current) {
          landingUntilRef.current = 0;
          impactRef.current = 0;
          walkUntilRef.current = 0;
          setMessage(null);
          updateMode(PetModes.Walking);
        }
      } else if (
        modeRef.current === PetModes.Grabbed ||
        modeRef.current === PetModes.Afraid ||
        modeRef.current === PetModes.Dizzy
      ) {
        const dizzyThreshold =
          modeRef.current === PetModes.Dizzy ? PetShakeReleaseEnergy : PetShakeTriggerEnergy;

        if (shakeEnergyRef.current >= dizzyThreshold) {
          if (modeRef.current !== PetModes.Dizzy) {
            const dizzyIndex = dizzyCountRef.current % PetDizzyMessages.length;

            dizzyCountRef.current += 1;
            setMessage(PetDizzyMessages[dizzyIndex] ?? null);
            updateMode(PetModes.Dizzy);
          }
        } else if (liftRef.current > PetAfraidLiftThresholdPx) {
          if (modeRef.current !== PetModes.Afraid) {
            const scaredIndex = scaredCountRef.current % PetScaredMessages.length;

            scaredCountRef.current += 1;
            setMessage(PetScaredMessages[scaredIndex] ?? null);
            updateMode(PetModes.Afraid);
          }
        } else if (modeRef.current !== PetModes.Grabbed) {
          setMessage(null);
          updateMode(PetModes.Grabbed);
        }
      }

      const liftManaged =
        modeRef.current === PetModes.Grabbed ||
        modeRef.current === PetModes.Afraid ||
        modeRef.current === PetModes.Dizzy ||
        modeRef.current === PetModes.Falling;

      if (!liftManaged && liftRef.current !== 0) {
        liftRef.current = Math.abs(liftRef.current) < 0.5 ? 0 : liftRef.current * 0.8;
      }

      renderPetTransform();
      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      isAnimatingRef.current = false;
      lastTimestampRef.current = null;
      cancelAnimationFrame(animationFrameRef.current);
      window.clearTimeout(reactionTimeoutRef.current);
    };
  }, [isDesktop]);

  if (!isDesktop) {
    return <></>;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={styles.pet}
      data-mode={mode}
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        height: `${petHeightPx}px`,
        transform: `translate3d(${PetEdgePaddingPx}px, 0, 0)`,
        width: `${petWidthPx}px`,
      }}
    >
      {message ? <span className={styles.bubble}>{message}</span> : null}

      <span className={styles.facing}>
        <span className={styles.motion}>
          <svg className={styles.sprite} viewBox={`0 0 ${PetGridWidth} ${PetGridHeight}`}>
            {cells.map((cell) => (
              <rect height={1} key={`${cell.x}-${cell.y}`} width={1} x={cell.x} y={cell.y} />
            ))}
          </svg>
        </span>
      </span>
    </div>
  );
};

export default SnipPet;
