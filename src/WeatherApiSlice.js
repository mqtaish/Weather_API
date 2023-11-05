import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Export Axios Function
import axios from "axios";


const initialState = {
    result: "empty",
    weather: {},
    isLoading: false,
}

export const fetchWeather = createAsyncThunk("weatherApi/fetchWeather", async () => {
    const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?lat=31.96&lon=35.93&appid=b8c98798fcbc864d790595f603981ef3"
    );
    const responseTemp = Math.round(response.data.main.temp - 272.15);
    const max = Math.round(response.data.main.temp_max - 272.15);
    const min = Math.round(response.data.main.temp_min - 272.15);
    const description = response.data.weather[0].description;
    const responseIcon = response.data.weather[0].icon;

    return {
        responseTemp, max, min, description, icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png `
    }
})


export const weatherAppSlice = createSlice({
    name: "weatherApp",
    initialState: initialState,
    reducers: {
        changeState: ((currentState, action) => {
            currentState.result = "changed";
        })
    },

    extraReducers(builder) {
        builder.addCase(fetchWeather.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchWeather.fulfilled, (state, action) => {
            state.isLoading = false;

            state.weather = action.payload;
        }).addCase(fetchWeather.rejected, (state, action) => {
            state.isLoading = false;
        })
    }
})

export const { changeState } = weatherAppSlice.actions;
export default weatherAppSlice.reducer;