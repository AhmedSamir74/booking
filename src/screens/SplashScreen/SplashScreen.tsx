/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { Animated, Easing, View } from 'react-native';
import images from '@assets/theme/images';
import { useNavigation } from '@react-navigation/core';

import styles from './style';
import { IS_NEW_USER_KEY } from '@utils/constants';
import { RootStackParamList } from 'types/RootStackPrams';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '@store/slices/userSlice';

type SplashScreenProp = StackNavigationProp<RootStackParamList, 'Loading'>;
export const SplashScreen: FC = () => {
  const dispatch = useDispatch();
  const fadeInValue = useMemo(() => new Animated.Value(0), []);
  const navigation = useNavigation<SplashScreenProp>();
  const isNewUser = useCallback(async () => {
    let isNew = true;
    await AsyncStorage.getItem(IS_NEW_USER_KEY, (_err, result: any) => {
      if (result !== null) {
        isNew = false;
      }
    });
    return isNew;
  }, []);

  useEffect(() => {
    // ANIMATING Logo
    Animated.sequence([
      Animated.timing(fadeInValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeInValue]);

  // Handle user state changes
  const onAuthStateChanged = async (user: any) => {
    const returnedNewUser = await isNewUser();
    setTimeout(() => {
      if (returnedNewUser) {
        navigation.replace('OnBoarding');
      } else {
        if (user) {
          dispatch(setUser(user));
          navigation.replace('Home');
          // Signed in
        } else {
          // Signed out
          navigation.replace('Login');
        }
      }
    }, 1000);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[
          styles.splashIcon,
          {
            opacity: fadeInValue,
          },
        ]}
        source={images.icons.splashIcon}
        resizeMode="contain"
      />
    </View>
  );
};
