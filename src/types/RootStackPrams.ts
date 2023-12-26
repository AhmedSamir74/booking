import { StackNavigationProp } from '@react-navigation/stack';
import { IHotel } from 'types';

export type RootStackParamList = {
  Loading: undefined;
  OnBoarding: undefined;
  Home: undefined;
  Login: undefined;
  Profile: undefined;
  Settings: undefined;
  Bookings: undefined;
  HotelDetails: {
    hotel: IHotel;
  };
};

export type HotelDetailsScreenProp = StackNavigationProp<
  HotelDetailsStackParamList,
  'HotelDetails'
>;
export type HotelDetailsStackParamList = {
  HotelDetails: {
    hotel: IHotel;
  };
};
