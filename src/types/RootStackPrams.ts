import { StackNavigationProp } from '@react-navigation/stack';
import { IStudent } from 'types';

export type RootStackParamList = {
  Loading: undefined;
  OnBoarding: undefined;
  Home: undefined;
  Login: undefined;
};

export type HomeScreenProp = StackNavigationProp<HomeStackParamList, 'Home'>;
export type HomeStackParamList = {
  Home: undefined;
  StudentDetails: {
    student: IStudent;
    studentId?: string;
  };
};

export type StudentDetailsScreenProp = StackNavigationProp<
  StudentDetailsStackParamList,
  'StudentDetails'
>;
export type StudentDetailsStackParamList = {
  StudentDetails: {
    student: IStudent;
    studentId: string;
  };
  ChatRoom: {
    studentId: string;
  };
};
