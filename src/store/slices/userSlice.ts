import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

type UserDataState = {
  data: IUserData;
};
export interface IUserData {
  phoneNumber: any;
  tenantId: any;
  displayName: any;
  isAnonymous: boolean;
  email: string;
  providerData: providerData[];
  emailVerified: boolean;
  photoURL: any;
  providerId: string;
  metadata: Metadata;
  uid: string;
}
export interface providerData {
  email: string;
  providerId: string;
  photoURL: any;
  phoneNumber: any;
  displayName: string;
  uid: string;
}

export interface Metadata {
  lastSignInTime: number;
  creationTime: number;
}
const userSlice = createSlice({
  name: 'userData',
  initialState: { data: {} } as UserDataState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IUserData>) => {
      state.data = payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUserData = (state: RootState) => state.userData.data;
