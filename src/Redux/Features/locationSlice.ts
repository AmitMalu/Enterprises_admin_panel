import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setLocationCache, clearLocationCache } from "../../Utils/locationCache";

interface LocationState {
  lat: number | null;
  lng: number | null;
  ipAddress: string | null;
  loading: boolean;
}

const initialState: LocationState = {
  lat: null,
  lng: null,
  ipAddress: null,
  loading: false,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (
      state,
      action: PayloadAction<{ lat: number; lng: number; ipAddress?: string }>,
    ) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      if (action.payload.ipAddress !== undefined) {
        state.ipAddress = action.payload.ipAddress;
      }
      state.loading = false;
      // Update cache for API service
      if (typeof window !== 'undefined') {
        localStorage.setItem('locationCache', JSON.stringify({
          lat: action.payload.lat,
          lng: action.payload.lng,
          ipAddress: action.payload.ipAddress || '',
        }));
        // Update in-memory cache for AxiosInstance
        setLocationCache({
          lat: action.payload.lat,
          lng: action.payload.lng,
          ipAddress: action.payload.ipAddress || '',
        });
      }
    },
    clearLocation: (state) => {
      state.lat = null;
      state.lng = null;
      state.ipAddress = null;
      state.loading = false;
      // Clear cache for API service
      if (typeof window !== 'undefined') {
        localStorage.removeItem('locationCache');
        // Clear in-memory cache for AxiosInstance
        clearLocationCache();
      }
    },
    setIpAddress: (state, action: PayloadAction<string>) => {
      state.ipAddress = action.payload;
    },
    setLocationLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setLocation, clearLocation, setLocationLoading, setIpAddress } =
  locationSlice.actions;
export default locationSlice.reducer;
