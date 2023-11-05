import { configureStore } from "@reduxjs/toolkit";
import webApiSliceReducer from "./WeatherApiSlice"

export default configureStore({
    reducer: { weather: webApiSliceReducer }
})