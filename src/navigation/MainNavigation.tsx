import React from 'react';
import {
  SplashScreen,
  StudentDetailsScreen,
  OnBoarding,
  HomeScreen,
  AuthenticationScreen,
} from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { strings } from '../localization';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '@assets/theme/theme';
import { StyleSheet } from 'react-native';
import { shareApp } from '@utils/links';

const StackNavigator = createStackNavigator();

const HomeHeaderIcon = () => (
  <MaterialCommunityIcons
    name="share-variant"
    color={theme.colors.lightBlue}
    size={25}
    style={styles.homeHeaderIcon}
    onPress={shareApp}
  />
);

const MainNavigation = () => {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <StackNavigator.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{ headerShown: false }}
      />
      <StackNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: strings('studentsManagmentApp'),
          headerRight: HomeHeaderIcon,
          headerLeft: () => null,
        }}
      />
      <StackNavigator.Screen name="Login" component={AuthenticationScreen} />
      <StackNavigator.Screen
        name="StudentDetails"
        component={StudentDetailsScreen}
        options={{
          headerBackTitle: '',
          title: strings('studentDetails'),
        }}
      />
    </StackNavigator.Navigator>
  );
};
const styles = StyleSheet.create({
  homeHeaderIcon: { marginEnd: 15 },
});
export default MainNavigation;
