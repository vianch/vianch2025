import { FilledPixel } from "@/lib/constants/snipPet.constants";

/* Flatten a pixel frame into the list of solid cells the sprite should draw. */
export const frameToCells = (frame: PetFrame): PetCell[] =>
  frame.flatMap((row, rowIndex) =>
    Array.from(row).flatMap((pixel, columnIndex) =>
      pixel === FilledPixel ? [{ x: columnIndex, y: rowIndex }] : []
    )
  );
