import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLocations } from './api/search';
import { GeoLocation, GeoLocationWeather } from './api/types';
import { getWeather } from './api/current';

export interface LocationsState {
  fetchedLocations: {
    status: 'pending' | 'idle';
    list: GeoLocation[];
  };
  selectedLocation: ApiWeatherData;
  comparisonLocations: ApiWeatherData[];
  selectedLocationModalOpened: boolean;
}

interface ApiWeatherData {
  status: 'pending' | 'idle';
  data: GeoLocationWeather | null;
}

const initialLocationsState: LocationsState = {
  fetchedLocations: {
    status: 'idle',
    list: [],
  },
  selectedLocation: {
    status: 'idle',
    data: null,
  },
  comparisonLocations: [],
  selectedLocationModalOpened: false,
};

export const fetchByLocationName = createAsyncThunk(
  'locations/fetchByLocationName',
  async (locationName: string) => getLocations(locationName),
);

export const getSelectedLocationWeather = createAsyncThunk(
  'locations/getSelectedLocationWeather',
  async (locationUrl: string) => getWeather(locationUrl),
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
    /**
     * Location search
     */
    builder.addCase(fetchByLocationName.pending, (locations) => {
      locations.fetchedLocations.status = 'pending';
    });
    builder.addCase(fetchByLocationName.fulfilled, (locations, action) => {
      locations.fetchedLocations = {
        status: 'idle',
        list: action.payload,
      };
    });

    /**
     * Selected location weather
     */
    builder.addCase(getSelectedLocationWeather.pending, (locations) => {
      locations.selectedLocation.status = 'pending';
    });
    builder.addCase(getSelectedLocationWeather.fulfilled, (locations, action) => {
      locations.selectedLocation = {
        status: 'idle',
        data: action.payload,
      };
    });
  },
});

export const { openSelectedLocationModal, closeSelectedLocationModal } = locationsSlice.actions;
