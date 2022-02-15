import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLocations } from './api/search';
import { GeoLocation } from './api/types';

export interface LocationsState {
  fetchedLocations: {
    status: 'pending' | 'idle',
    list: GeoLocation[]
  },
  selectedLocation: GeoLocation | null,
  comparisonLocations: GeoLocation[],
  selectedLocationModalOpened: boolean
}

const initialLocationsState: LocationsState = {
  fetchedLocations: {
    status: 'idle',
    list: [],
  },
  selectedLocation: null,
  comparisonLocations: [],
  selectedLocationModalOpened: false,
};

export const fetchByLocationName = createAsyncThunk(
  'locations/fetchByLocationName',
  async (locationName: string) => getLocations(locationName),
);

export const locationsSlice = createSlice({
  name: 'locations',
  initialState: initialLocationsState,
  reducers: {
    openSelectedLocationModal: (locations) => {
      locations.selectedLocationModalOpened = true;
    },
    closeSelectedLocationModal: (locations) => {
      locations.selectedLocationModalOpened = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchByLocationName.pending, (locations) => {
      locations.fetchedLocations = {
        status: 'pending',
        list: [],
      };
    });

    builder.addCase(fetchByLocationName.fulfilled, (locations, action) => {
      locations.fetchedLocations = {
        status: 'idle',
        list: action.payload,
      };
    });
  },
});
