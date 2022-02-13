import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLocations } from './api/search';
import { GeoLocation } from './api/types';

export interface LocationsState {
  fetchedLocations: {
    status: 'loading' | 'idle',
    list: GeoLocation[]
  },
  selectedLocation: GeoLocation | null,
  comparisonLocations: GeoLocation[],
}

const initialLocationsState: LocationsState = {
  fetchedLocations: {
    status: 'idle',
    list: [],
  },
  selectedLocation: null,
  comparisonLocations: [],
};

export const fetchByLocationName = createAsyncThunk(
  'locations/fetchByLocationName',
  async (locationName: string) => getLocations(locationName),
);

export const locationsSlice = createSlice<LocationsState, {}>({
  name: 'locations',
  initialState: initialLocationsState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchByLocationName.pending, (locations: LocationsState) => {
      locations.fetchedLocations = {
        status: 'loading',
        list: [],
      };
    });

    builder.addCase(fetchByLocationName.fulfilled, (locations: LocationsState, action) => {
      locations.fetchedLocations = {
        status: 'idle',
        list: action.payload,
      };
    });
  },
});
