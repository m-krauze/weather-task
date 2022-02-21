import { RootState } from '../../app/store';

export const selectCurrentLocation = (state: RootState) => state.locations.selectedLocation;
export const selectModalOpened = (state: RootState) => state.locations.selectedLocationModalOpened;
