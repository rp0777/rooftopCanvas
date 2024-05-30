import React, { useState } from "react";
import Canvas from "./components/Canvas";
import Button from "./components/Button";
import { exportCanvasAsImage } from "./utils/imageExport";
import { useDispatch } from "react-redux";
import { clearPoints } from "./features/drawingSlice";
import defaultImage from "./assets/aerial-multipleroofs-sanmateo-ca-2019-03-17.webp";

const App = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState<string>(defaultImage);

  const handleExport = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      exportCanvasAsImage(canvas);
    }
  };

  const handleClear = () => {
    dispatch(clearPoints());
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className=" h-full flex flex-col items-center bg-fuchsia-300 p-4 ">
      <h1 className="text-2xl font-bold mb-4">Roof Drawing App</h1>
      <Canvas image={image} />
      <div className="mt-4 flex space-x-2">
        <Button onClick={handleExport}>Export Image</Button>
        <Button onClick={handleClear}>Clear Drawing</Button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="upload-input"
        />
        <label htmlFor="upload-input" className="cursor-pointer">
          <div className="bg-blue-500 hover:bg-blue-700 text-center text-sm lg:text-base text-white font-bold py-2 px-4 rounded">
            Upload Image
          </div>
        </label>
      </div>
    </div>
  );
};

export default App;
