import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { Animated, Easing, View } from 'react-native';
import images from '@assets/theme/images';
import { useNavigation } from '@react-navigation/core';

import styles from './style';
import { IS_NEW_USER_KEY } from '@utils/constants';
import { RootStackParamList } from 'types/RootStackPrams';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SplashScreenProp = StackNavigationProp<RootStackParamList, 'Loading'>;
export const SplashScreen: FC = () => {
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

  const navigateUser = useCallback(async () => {
    console.log('Login');

    navigation.replace('Login');

    // const returnedNewUser = await isNewUser();
    // if (returnedNewUser) {
    //   navigation.replace('OnBoarding');
    // } else {
    //   navigation.replace('Home');
    // }
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
    ]).start(navigateUser);
  }, [fadeInValue, navigateUser]);

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
