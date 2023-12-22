import images from '@assets/theme/images';
import { CustomLayout, CustomText } from '@components/common';
import { strings } from '../../localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import styles from './style';
import { IS_NEW_USER_KEY } from '@utils/constants';
import { CustomButton } from '@components/Form';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/RootStackPrams';
import Row from '@components/common/Row';
import { AUTHENTICATION_TABS } from './authentication.constants';

export const AuthenticationScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState(AUTHENTICATION_TABS.LOGIN);

  useEffect(() => {
    AsyncStorage.setItem(IS_NEW_USER_KEY, 'true');
  }, []);

  const onNextPress = () => {
    navigation.navigate('Home');
  };
  return (
    <CustomLayout style={styles.screen}>
      <Image
        source={images.icons.loginLogo}
        resizeMode="contain"
        style={styles.logo}
      />
      <Row style={styles.topBarCont}>
        <TouchableOpacity
          onPress={() => setActiveTab(AUTHENTICATION_TABS.LOGIN)}
          activeOpacity={0.7}
          style={[
            styles.topBarItem,
            activeTab === AUTHENTICATION_TABS.LOGIN && styles.activeTopBarItem,
          ]}>
          <CustomText
            size={20}
            style={[
              styles.tabText,
              activeTab === AUTHENTICATION_TABS.LOGIN && styles.activeTabText,
            ]}>
            {strings('authentication.login')}
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab(AUTHENTICATION_TABS.SIGNUP)}
          activeOpacity={0.7}
          style={[
            styles.topBarItem,
            activeTab === AUTHENTICATION_TABS.SIGNUP &&
              styles.activeTopBarItem &&
              styles.activeTopBarItem,
          ]}>
          <CustomText
            size={20}
            style={[
              styles.tabText,
              activeTab === AUTHENTICATION_TABS.SIGNUP && styles.activeTabText,
            ]}>
            {strings('authentication.signup')}
          </CustomText>
        </TouchableOpacity>
      </Row>

      <CustomButton
        onPress={onNextPress}
        title={strings('next')}
        style={styles.button}
      />
    </CustomLayout>
  );
};
