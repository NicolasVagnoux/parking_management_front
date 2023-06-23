import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const { data } = await axios.get(`${import.meta.env.VITE_API_URL}`);
const initialState = {list: data};

export const parkingSlice = createSlice({
  name: 'parking',
  initialState,
  reducers: {},
});

export const selectParkingList = (state: any) => state.parking.list;

export default parkingSlice.reducer;

