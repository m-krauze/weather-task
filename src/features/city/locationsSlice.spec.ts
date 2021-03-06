import { Action } from '@reduxjs/toolkit';
import { locationsSlice, LocationsState } from './locationsSlice';

describe('Locations reducer', () => {
  const initialState: LocationsState = {
    selectedLocationModalOpened: false,
    selectedLocation: {
      status: 'idle',
      data: null,
    },
    comparisonLocations: {
      status: 'idle',
      data: null,
    },
    fetchedLocations: {
      status: 'idle',
      list: [],
    },
  };

  it('should handle initial state', () => {
    const action: Action = { type: 'unknown' };
    const newState = locationsSlice.reducer(undefined, action);

    expect(newState).toEqual(initialState);
  });

  it('sets opened modal status', () => {
    const action: Action = { type: locationsSlice.actions.openSelectedLocationModal.type };
    const newState = locationsSlice.reducer(initialState, action);

    expect(newState.selectedLocationModalOpened).toEqual(true);
  });

  it('sets closed modal status', () => {
    const action: Action = { type: locationsSlice.actions.closeSelectedLocationModal.type };
    const newState = locationsSlice.reducer({
      ...initialState,
      selectedLocationModalOpened: true,
    }, action);

    expect(newState.selectedLocationModalOpened).toEqual(false);
  });
});
