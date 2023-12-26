import images from '@assets/theme/images';
import { CustomLayout, CustomText } from '@components/common';
import { strings } from '../../localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';

import styles from './style';
import { IS_NEW_USER_KEY } from '@utils/constants';

import Row from '@components/common/Row';
import { AUTHENTICATION_TABS } from './authentication.constants';
import { LoginForm, SignupForm } from './components';
import { Animated } from 'react-native';

export const AuthenticationScreen = () => {
  const loginFormFadeAnim = useRef(new Animated.Value(1)).current;
  const signupFormFadeAnim = useRef(new Animated.Value(0)).current;
  const [activeTab, setActiveTab] = useState(AUTHENTICATION_TABS.LOGIN);

  useEffect(() => {
    AsyncStorage.setItem(IS_NEW_USER_KEY, 'true');
  }, []);

  useEffect(() => {
    if (activeTab === AUTHENTICATION_TABS.LOGIN) {
      toggleLoginForm(true);
      toggleSignupForm(false);
    } else {
      toggleLoginForm(false);
      toggleSignupForm(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const toggleLoginForm = (show: boolean) => {
    Animated.timing(loginFormFadeAnim, {
      toValue: show ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const toggleSignupForm = (show: boolean) => {
    Animated.timing(signupFormFadeAnim, {
      toValue: show ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <CustomLayout style={styles.screen} scrollEnabled>
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
            {strings('auth.login')}
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
            {strings('auth.signup')}
          </CustomText>
        </TouchableOpacity>
      </Row>
      {activeTab === AUTHENTICATION_TABS.LOGIN && (
        <Animated.View
          style={{
            opacity: loginFormFadeAnim,
          }}>
          <LoginForm />
        </Animated.View>
      )}

      {activeTab === AUTHENTICATION_TABS.SIGNUP && (
        <Animated.View
          style={{
            opacity: signupFormFadeAnim,
          }}>
          <SignupForm />
        </Animated.View>
      )}
    </CustomLayout>
  );
};
