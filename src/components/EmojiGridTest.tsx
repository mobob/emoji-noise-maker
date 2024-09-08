import { useState, useRef, useEffect } from "react";
import { EmojiNoiseTextureGridGenerator } from "./EmojiGridGenerator";

export const EmojiGridTest: React.FC = () => {
  const [emoji, setEmoji] = useState("😊");
  const [gridSize, setGridSize] = useState(20);
  const [emojiSize, setEmojiSize] = useState(40);
  const [noiseDensity, setNoiseDensity] = useState(0.3);
  const [noiseColor, setNoiseColor] = useState("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState("#808080");
  const [maxRotation, setMaxRotation] = useState(15);
  const [invertNoise, setInvertNoise] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const gridGenerator = new EmojiNoiseTextureGridGenerator(800, 800);
      gridGenerator.applyToElement(
        containerRef.current,
        emoji,
        gridSize,
        emojiSize,
        noiseDensity,
        noiseColor,
        backgroundColor,
        maxRotation,
        invertNoise,
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
    invertNoise,
  ]);

  return (
    <div className="p-4">
      <div ref={containerRef} className="w-[800px] h-[800px] mb-4"></div>
      <div className="space-y-2">
        <label className="block">
          <span className="text-gray-700">Emoji:</span>
          <input
            className="mt-1 block w-full"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            placeholder="Emoji"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Grid Size:</span>
          <input
            className="mt-1 block w-full"
            type="number"
            value={gridSize}
            onChange={(e) => setGridSize(Number(e.target.value))}
            placeholder="Grid Size"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Emoji Size:</span>
          <input
            className="mt-1 block w-full"
            type="number"
            value={emojiSize}
            onChange={(e) => setEmojiSize(Number(e.target.value))}
            placeholder="Emoji Size"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Noise Density:</span>
          <input
            className="mt-1 block w-full"
            type="number"
            step="0.1"
            value={noiseDensity}
            onChange={(e) => setNoiseDensity(Number(e.target.value))}
            placeholder="Noise Density"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Noise Color:</span>
          <input
            className="mt-1 block w-full"
            type="color"
            value={noiseColor}
            onChange={(e) => setNoiseColor(e.target.value)}
            placeholder="Noise Color"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Background Color:</span>
          <input
            className="mt-1 block w-full"
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            placeholder="Background Color"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Max Rotation:</span>
          <input
            className="mt-1 block w-full"
            type="number"
            value={maxRotation}
            onChange={(e) => setMaxRotation(Number(e.target.value))}
            placeholder="Max Rotation"
          />
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={invertNoise}
            onChange={(e) => setInvertNoise(e.target.checked)}
          />
          <span className="ml-2">Invert Noise</span>
        </label>
      </div>
    </div>
  );
};
