import images from '@assets/theme/images';
import { CustomLayout, CustomText } from '@components/common';
import { strings } from '../../localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';

import styles from './style';
import { IS_NEW_USER_KEY } from '@utils/constants';
import { CustomButton } from '@components/Form';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/RootStackPrams';

export const OnBoarding = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    AsyncStorage.setItem(IS_NEW_USER_KEY, 'true');
  }, []);

  const onNextPress = () => {
    navigation.navigate('Login');
  };
  return (
    <CustomLayout style={styles.screen}>
      <Image source={images.images.onBoarding} resizeMode="contain" />
      <View style={styles.textCont}>
        <CustomText size={20} weight="semiBold">
          {strings('onBoarding.title')}
        </CustomText>
        <CustomText size={14} style={styles.description}>
          {strings('onBoarding.description')}
        </CustomText>
      </View>
      <CustomButton
        onPress={onNextPress}
        title={strings('next')}
        style={styles.button}
      />
    </CustomLayout>
  );
};
