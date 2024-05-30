import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Point {
  x: number;
  y: number;
}

interface DrawingState {
  points: Point[];
}

const initialState: DrawingState = {
  points: [],
};

const drawingSlice = createSlice({
  name: "drawing",
  initialState,
  reducers: {
    addPoint: (state, action: PayloadAction<Point>) => {
      state.points.push(action.payload);
    },
    clearPoints: (state) => {
      state.points = [];
    },
  },
});

export const { addPoint, clearPoints } = drawingSlice.actions;
export default drawingSlice.reducer;
