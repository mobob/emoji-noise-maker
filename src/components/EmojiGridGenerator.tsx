export class EmojiNoiseTextureGridGenerator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext("2d")!;
  }

  private generateSingleEmojiTexture(
    emoji: string,
    size: number,
    noiseDensity: number,
    noiseColor: string,
    invertNoise: boolean,
  ): HTMLCanvasElement {
    const singleCanvas = document.createElement("canvas");
    singleCanvas.width = size;
    singleCanvas.height = size;
    const singleCtx = singleCanvas.getContext("2d")!;

    singleCtx.font = `${size * 0.8}px Arial`;
    singleCtx.textAlign = "center";
    singleCtx.textBaseline = "middle";
    singleCtx.fillText(emoji, size / 2, size / 2);

    const imageData = singleCtx.getImageData(0, 0, size, size);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const drawPixel = !invertNoise == Math.random() < noiseDensity;
      if (data[i + 3] > 0) {
        // If pixel is not transparent
        if (drawPixel) {
          data[i] = parseInt(noiseColor.slice(1, 3), 16); // R
          data[i + 1] = parseInt(noiseColor.slice(3, 5), 16); // G
          data[i + 2] = parseInt(noiseColor.slice(5, 7), 16); // B
        } else {
          data[i] = 0; // R
          data[i + 1] = 0; // G
          data[i + 2] = 0; // B
        }
        data[i + 3] = 255; // A (fully opaque)
      } else if (drawPixel) {
        data[i] = parseInt(noiseColor.slice(1, 3), 16); // R
        data[i + 1] = parseInt(noiseColor.slice(3, 5), 16); // G
        data[i + 2] = parseInt(noiseColor.slice(5, 7), 16); // B
        data[i + 3] = 255; // A (fully opaque)
      }
    }

    singleCtx.putImageData(imageData, 0, 0);
    return singleCanvas;
  }

  generateGrid(
    emoji: string,
    gridSize: number = 20,
    emojiSize: number = 40,
    noiseDensity: number = 0.3,
    noiseColor: string = "#ffffff",
    backgroundColor: string = "#808080",
    maxRotation: number = 15,
    invertNoise: boolean = false,
  ): string {
    // Clear canvas with background color
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const singleEmojiTexture = this.generateSingleEmojiTexture(
      emoji,
      emojiSize,
      noiseDensity,
      noiseColor,
      invertNoise,
    );

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const rotation =
          ((Math.random() - 0.5) * 2 * maxRotation * Math.PI) / 180;
        const xPos =
          x * (this.canvas.width / gridSize) + this.canvas.width / gridSize / 2;
        const yPos =
          y * (this.canvas.height / gridSize) +
          this.canvas.height / gridSize / 2;

        this.ctx.save();
        this.ctx.translate(xPos, yPos);
        this.ctx.rotate(rotation);
        this.ctx.drawImage(singleEmojiTexture, -emojiSize / 2, -emojiSize / 2);
        this.ctx.restore();
      }
    }

    return this.canvas.toDataURL();
  }

  applyToElement(
    element: HTMLElement,
    emoji: string,
    gridSize: number = 20,
    emojiSize: number = 40,
    noiseDensity: number = 0.3,
    noiseColor: string = "#ffffff",
    backgroundColor: string = "#808080",
    maxRotation: number = 15,
    invertNoise: boolean = false,
  ): void {
    const gridTexture = this.generateGrid(
      emoji,
      gridSize,
      emojiSize,
      noiseDensity,
      noiseColor,
      backgroundColor,
      maxRotation,
      invertNoise,
    );
    element.style.backgroundImage = `url(${gridTexture})`;
    element.style.backgroundRepeat = "repeat";
  }
}

// Usage example
// const gridGenerator = new EmojiNoiseTextureGridGenerator(800, 800);
