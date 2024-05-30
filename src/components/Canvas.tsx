import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPoint } from "../features/drawingSlice";
import { RootState } from "../store/store";
import useCanvas from "../hooks/useCanvas";

interface CanvasProps {
  image: string;
}

const Canvas = ({ image }: CanvasProps) => {
  const dispatch = useDispatch();
  const points = useSelector((state: RootState) => state.drawing.points);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const newPoint = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    dispatch(addPoint(newPoint));
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    if (!image) return;

    const img = new Image();
    img.src = image;
    img.onload = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear canvas before drawing new image
      ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.beginPath();
      points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      if (points.length > 2) {
        ctx.closePath();
      }
      ctx.stroke();
    };
    img.onerror = () => {
      alert("Failed to load image. Please check the URL and try again.");
    };
  };

  const canvasRef = useCanvas(draw);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth * 0.8}
      height={window.innerHeight * 0.75}
      onMouseDown={handleMouseDown}
      style={{ border: "1px solid black", maxWidth: "100%" }}
    />
  );
};

export default Canvas;
