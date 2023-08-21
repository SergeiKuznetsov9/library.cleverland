import { RootState } from '..';

export const getUserSelector = (state: RootState) => state.user;
export const getUserFullInfoSelector = (state: RootState) => state.user.data;
