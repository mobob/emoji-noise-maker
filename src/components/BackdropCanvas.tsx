import React, { useEffect, useRef } from "react";
import { cn } from "../lib/utils";

interface BackdropCanvasProps extends React.HTMLAttributes<HTMLCanvasElement> {
  emojis?: string[];
}

export const BackdropCanvas = React.forwardRef<
  HTMLCanvasElement,
  BackdropCanvasProps
>(({ className, emojis = ["🌟", "🎉", "🚀"], ...props }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.floor(Math.random() * 255);
        data[i] = value; // red
        data[i + 1] = value; // green
        data[i + 2] = value; // blue
        data[i + 3] = 25; // alpha
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const drawEmojis = () => {
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        ctx.font = "20px Arial";
        ctx.fillText(emoji, x, y);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawNoise();
      drawEmojis();
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Slow down animation
    const frameRate = 1; // Adjust this value to control animation speed (lower = slower)
    let lastTime = 0;
    const animateSlower = (currentTime: number) => {
      if (currentTime - lastTime > 1000 / frameRate) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawNoise();
        drawEmojis();
        lastTime = currentTime;
      }
      requestAnimationFrame(animateSlower);
    };

    animateSlower(0);
    // animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [emojis]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed top-0 left-0 -z-10", className)}
      {...props}
    />
  );
});

BackdropCanvas.displayName = "BackdropCanvas";
