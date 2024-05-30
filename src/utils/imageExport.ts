export const exportCanvasAsImage = (canvas: HTMLCanvasElement) => {
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "roof-drawing.png";
  link.click();
};
