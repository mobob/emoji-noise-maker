import { useState, useRef, useEffect, useCallback } from "react";
import { EmojiNoiseTextureGridGenerator } from "./EmojiGridGenerator";

export const EmojiGridTest: React.FC = () => {
  const [emoji, setEmoji] = useState("🎉");
  const [gridSize, setGridSize] = useState(20);
  const [emojiSize, setEmojiSize] = useState(40);
  const [noiseDensityOnEmoji, setNoiseDensityOnEmoji] = useState(0.3);
  const [noiseDensityOffEmoji, setNoiseDensityOffEmoji] = useState(0.1);
  const [noiseColor, setNoiseColor] = useState("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [maxRotation, setMaxRotation] = useState(15);
  const [invertNoise, setInvertNoise] = useState(false);
  const [emojiAreaRatio, setEmojiAreaRatio] = useState(0.5);

  // only support squares rn
  const [pixelSize, setPixelSize] = useState(800);

  const containerRef = useRef<HTMLDivElement>(null);

  const downloadAsPNG = useCallback(() => {
    if (containerRef.current) {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;

      // Draw the content of the div onto the canvas
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Convert the background image to a data URL
        const backgroundImage = getComputedStyle(
          containerRef.current,
        ).backgroundImage;
        const imageUrl = backgroundImage.slice(5, -2); // Remove 'url("' and '")'

        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Convert canvas to blob
          canvas.toBlob((blob) => {
            if (blob) {
              // Create a download link
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = "emoji-grid.png";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            }
          }, "image/png");
        };
        img.src = imageUrl;
      }
    }
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const gridGenerator = new EmojiNoiseTextureGridGenerator(
        pixelSize,
        pixelSize,
      );
      gridGenerator.applyToElement(
        containerRef.current,
        emoji,
        gridSize,
        emojiSize,
        noiseDensityOnEmoji,
        noiseColor,
        backgroundColor,
        maxRotation,
        invertNoise,
        emojiAreaRatio,
        noiseDensityOffEmoji,
      );
    }
  }, [
    emoji,
    gridSize,
    emojiSize,
    noiseDensityOnEmoji,
    noiseColor,
    backgroundColor,
    maxRotation,
    invertNoise,
    emojiAreaRatio,
    noiseDensityOffEmoji,
    pixelSize,
  ]);

  return (
    <div className="p-4 space-x-2 flex flex-row">
      <div className="space-y-16 flex flex-col w-full h-full">
        <div
          ref={containerRef}
          style={{
            width: `${pixelSize}px`,
            height: `${pixelSize}px`,
          }}
        ></div>

        {/* ... (existing input elements) */}
        <button
          onClick={downloadAsPNG}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Download PNG
        </button>
      </div>
      <div className="space-y-2">
        <label className="block">
          <span className="text-gray-700">Size in Pixels:</span>
          <input
            className="mt-1 block w-full"
            type="number"
            value={pixelSize}
            onChange={(e) => setPixelSize(Number(e.target.value))}
            placeholder="Width"
          />
        </label>
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
          <span className="text-gray-700">Noise Density (on Emoji):</span>
          <input
            className="mt-1 block w-full"
            type="number"
            step="0.1"
            value={noiseDensityOnEmoji}
            onChange={(e) => setNoiseDensityOnEmoji(Number(e.target.value))}
            placeholder="Noise Density On Emoji"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Noise Density (off Emoji):</span>
          <input
            className="mt-1 block w-full"
            type="number"
            step="0.1"
            value={noiseDensityOffEmoji}
            onChange={(e) => setNoiseDensityOffEmoji(Number(e.target.value))}
            placeholder="Noise Density Off Emoji"
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
        <label className="block">
          <span className="text-gray-700">Emoji Area Ratio:</span>
          <input
            className="mt-1 block w-full"
            type="number"
            step="0.1"
            min="0.1"
            max="1"
            value={emojiAreaRatio}
            onChange={(e) => setEmojiAreaRatio(Number(e.target.value))}
            placeholder="Emoji Area Ratio"
          />
        </label>
      </div>
    </div>
  );
};
