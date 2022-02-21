import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLocations } from './api/search';
import { GeoLocation, GeoLocationWeather } from './api/types';
import { getWeather } from './api/current';

export interface LocationsState {
  fetchedLocations: {
    status: 'pending' | 'idle';
    list: GeoLocation[];
  };
  selectedLocation: {
    status: 'pending' | 'idle';
    data: GeoLocationWeather | null;
  };
  comparisonLocations: {
    status: 'pending' | 'idle';
    data: GeoLocationWeather[] | null;
  };
  selectedLocationModalOpened: boolean;
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
  comparisonLocations: {
    status: 'idle',
    data: null,
  },
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

export const getComparisonLocationsWeather = createAsyncThunk(
  'locations/getComparisonLocationsWeather',
  async () => {
    const staticCitiesURls = [
      'krakow-poland',
      'poznan-poland',
      'wroclaw-poland',
      'gdansk-poland',
    ];

    const promises = staticCitiesURls.map((cityUrl) => getWeather(cityUrl));

    return Promise.all(promises);
  },
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

    /**
     * Comparison locations
     */
    builder.addCase(getComparisonLocationsWeather.pending, (locations) => {
      locations.comparisonLocations.status = 'pending';
    });
    builder.addCase(getComparisonLocationsWeather.fulfilled, (locations, action) => {
      locations.comparisonLocations = {
        status: 'idle',
        data: action.payload,
      };
    });
  },
});

export const { openSelectedLocationModal, closeSelectedLocationModal } = locationsSlice.actions;
