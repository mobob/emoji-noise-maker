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
    noiseDensityOnEmoji: number,
    noiseColor: string,
    invertNoise: boolean,
    canvasSize: number,
    noiseDensityOffEmoji: number = 0.01,
  ): HTMLCanvasElement {
    const singleCanvas = document.createElement("canvas");
    singleCanvas.width = canvasSize;
    singleCanvas.height = canvasSize;
    const singleCtx = singleCanvas.getContext("2d")!;

    try {
      if (emoji) {
        singleCtx.font = `${size * 0.8}px Arial`;
        singleCtx.textAlign = "center";
        singleCtx.textBaseline = "middle";
        singleCtx.fillText(emoji, size / 2, size / 2);
      }

      const imageData = singleCtx.getImageData(0, 0, canvasSize, canvasSize);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] > 0) {
          // on emoji path
          //
          const drawPixel = !invertNoise == Math.random() < noiseDensityOnEmoji;
          if (drawPixel) {
            data[i] = parseInt(noiseColor.slice(1, 3), 16); // R
            data[i + 1] = parseInt(noiseColor.slice(3, 5), 16); // G
            data[i + 2] = parseInt(noiseColor.slice(5, 7), 16); // B
            data[i + 3] = 255; // A (fully opaque)
          } else {
            // if we don't wipe it out here, then we just get the colored emoji'
            data[i] = 0; // R
            data[i + 1] = 0; // G
            data[i + 2] = 0; // B
            data[i + 3] = 0;
          }
        } else {
          // didn't hit the emoji path, only do it if no emoji was passed in
          // (ie the backdrop path)
          //
          const drawPixel =
            emoji.length == 0 &&
            !invertNoise == Math.random() < noiseDensityOffEmoji;

          if (drawPixel) {
            data[i] = parseInt(noiseColor.slice(1, 3), 16); // R
            data[i + 1] = parseInt(noiseColor.slice(3, 5), 16); // G
            data[i + 2] = parseInt(noiseColor.slice(5, 7), 16); // B
            data[i + 3] = 255; // A (fully opaque)
          }
        }
      }

      singleCtx.putImageData(imageData, 0, 0);
    } catch (e) {
      console.error(e);
    }
    return singleCanvas;
  }

  generateGrid(
    emoji: string,
    gridSize: number = 20,
    emojiSize: number = 40,
    noiseDensityOnEmoji: number = 0.3,
    noiseColor: string = "#ffffff",
    backgroundColor: string = "#000000",
    maxRotation: number = 15,
    invertNoise: boolean = false,
    emojiAreaRatio: number = 0.5,
    noiseDensityOffEmoji: number = 0.01,
  ): string {
    try {
      // Clear canvas with background color
      this.ctx.fillStyle = backgroundColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Calculate scaled emoji size
      const scaledEmojiSize = emojiSize * emojiAreaRatio;

      // Calculate cell dimensions
      const cellWidth = this.canvas.width / gridSize;
      const cellHeight = this.canvas.height / gridSize;
      const canvasSize = Math.max(cellWidth, cellHeight);

      // generate a big one full backdrop
      const backdropNoise = this.generateSingleEmojiTexture(
        "",
        scaledEmojiSize,
        noiseDensityOnEmoji,
        noiseColor,
        invertNoise,
        this.canvas.width,
        noiseDensityOffEmoji,
      );

      this.ctx.save();
      this.ctx.translate(0, 0);
      this.ctx.drawImage(
        backdropNoise,
        (Math.random() * -0) / 2,
        (Math.random() * -0) / 2,
      );
      this.ctx.restore();

      const singleEmojiTexture = this.generateSingleEmojiTexture(
        emoji,
        scaledEmojiSize,
        noiseDensityOnEmoji,
        noiseColor,
        invertNoise,
        canvasSize,
        noiseDensityOffEmoji,
      );

      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          const rotation =
            ((Math.random() - 0.5) * 2 * maxRotation * Math.PI) / 180;
          const xPos = x * cellWidth + cellWidth / 2;
          const yPos = y * cellHeight + cellHeight / 2;

          this.ctx.save();
          this.ctx.translate(xPos, yPos);
          this.ctx.rotate(rotation);
          this.ctx.drawImage(
            singleEmojiTexture,
            (Math.random() * -cellWidth) / 2,
            (Math.random() * -cellHeight) / 2,
          );
          this.ctx.restore();
        }
      }
    } catch (e) {
      console.error(e);
    }

    return this.canvas.toDataURL();
  }

  applyToElement(
    element: HTMLElement,
    emoji: string,
    gridSize: number = 20,
    emojiSize: number = 40,
    noiseDensityOnEmoji: number = 0.3,
    noiseColor: string = "#ffffff",
    backgroundColor: string = "#808080",
    maxRotation: number = 15,
    invertNoise: boolean = false,
    emojiAreaRatio: number = 0.5,
    noiseDensityOffEmoji: number = 0.01,
  ): void {
    const gridTexture = this.generateGrid(
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
    element.style.backgroundImage = `url(${gridTexture})`;
    element.style.backgroundRepeat = "no-repeat";
    element.style.backgroundPosition = "center";
    element.style.backgroundSize = "contain";
  }
}
