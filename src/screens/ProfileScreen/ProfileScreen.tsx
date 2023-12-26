import React from 'react';
import { CustomLayout, CustomText } from '@components/common';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import images from '@assets/theme/images';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '@assets/theme/theme';
import Row from '@components/common/Row';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/RootStackPrams';
import auth from '@react-native-firebase/auth';

type ProfileScreenProp = StackNavigationProp<RootStackParamList, 'Profile'>;
export const ProfileScreen = () => {
  const { goBack, navigate } = useNavigation<ProfileScreenProp>();

  const onLogoutPress = () => {
    auth()
      .signOut()
      .then(() => navigate('Login'));
  };

  return (
    <CustomLayout style={styles.layout} scrollEnabled>
      <Row alignItems="center">
        <MaterialCommunityIcons
          name="arrow-left"
          color={COLORS.darkGray}
          size={30}
          onPress={() => goBack()}
        />
      </Row>
      <View style={styles.profileImageCont}>
        <ImageBackground
          source={images.icons.profile}
          style={styles.profileImage}>
          <View style={styles.cameraCont}>
            <MaterialCommunityIcons
              name="camera-outline"
              color={COLORS.white}
              size={20}
            />
          </View>
        </ImageBackground>
        <CustomText weight="bold" marginBottom={8}>
          Daniel Bronks
        </CustomText>
        <CustomText size={14} color={COLORS.gray}>
          Indonesia
        </CustomText>
      </View>

      <Row style={styles.statsCont}>
        <View style={styles.statCont}>
          <CustomText style={styles.statValue}>47</CustomText>
          <CustomText style={styles.statTitle}>Reviews</CustomText>
        </View>
        <View style={styles.statCont}>
          <CustomText style={styles.statValue}>75</CustomText>
          <CustomText style={styles.statTitle}>Transactions</CustomText>
        </View>
        <View style={styles.statCont}>
          <CustomText style={styles.statValue}>2</CustomText>
          <CustomText style={styles.statTitle}>Bookings</CustomText>
        </View>
      </Row>

      <CustomText style={styles.options}>Options</CustomText>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigate('Settings')}>
          <Row
            justifyContent="space-between"
            alignItems="center"
            style={styles.tabCont}>
            <Row alignItems="center">
              <Image
                source={images.icons.award}
                style={styles.tabIcon}
                resizeMode="contain"
              />
              <CustomText size={14}>User Settings</CustomText>
            </Row>
            <MaterialCommunityIcons
              name="chevron-right"
              color={COLORS.primary}
              size={30}
            />
          </Row>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={onLogoutPress}>
          <Row
            justifyContent="space-between"
            alignItems="center"
            style={styles.tabCont}>
            <Row alignItems="center">
              <MaterialCommunityIcons
                name="logout"
                color={COLORS.gray}
                size={28}
                style={styles.logoutIcon}
              />
              <CustomText size={14}>Logout</CustomText>
            </Row>
          </Row>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigate('Bookings')}>
          <Row
            justifyContent="space-between"
            alignItems="center"
            style={styles.tabCont}>
            <Row alignItems="center">
              <MaterialCommunityIcons
                name="checkbox-marked-circle-outline"
                color={COLORS.primary}
                size={28}
                style={styles.logoutIcon}
              />
              <CustomText size={14}>Bookings</CustomText>
            </Row>
            <MaterialCommunityIcons
              name="chevron-right"
              color={COLORS.primary}
              size={30}
            />
          </Row>
        </TouchableOpacity>
      </View>
    </CustomLayout>
  );
};
