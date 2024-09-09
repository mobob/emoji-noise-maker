import { useEffect, useRef } from "react";
import { EmojiNoiseTextureGridGenerator } from "./EmojiGridGenerator";

// Include the EmojiNoiseTextureGridGenerator class here

function EmojiNoiseTextureGrid({
  emoji,
  gridSize = 20,
  emojiSize = 40,
  noiseDensity = 0.1,
  noiseColor = "#ffffff",
  backgroundColor = "#808080",
  maxRotation = 90,
}: {
  emoji: string;
  gridSize?: number;
  emojiSize?: number;
  noiseDensity?: number;
  noiseColor?: string;
  backgroundColor?: string;
  maxRotation?: number;
}) {
  const gridDivRef = useRef(null);

  useEffect(() => {
    if (gridDivRef.current) {
      const gridGenerator = new EmojiNoiseTextureGridGenerator(800, 800);
      gridGenerator.applyToElement(
        gridDivRef.current,
        emoji,
        gridSize,
        emojiSize,
        noiseDensity,
        noiseColor,
        backgroundColor,
        maxRotation,
      );
    }
  }, [
    emoji,
    gridSize,
    emojiSize,
    noiseDensity,
    noiseColor,
    backgroundColor,
    maxRotation,
  ]);

  return (
    <div>
      <div
        ref={gridDivRef}
        style={{ width: "400px", height: "400px", border: "1px solid black" }}
      />
      <div>{`Emoji: ${emoji}`}</div>
    </div>
  );
}

export default EmojiNoiseTextureGrid;
