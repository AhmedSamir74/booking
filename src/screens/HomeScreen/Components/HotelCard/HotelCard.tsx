import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { IHotel } from 'types';
import { COLORS } from '@assets/theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomText } from '@components/common';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/RootStackPrams';
import { useNavigation } from '@react-navigation/native';

interface IProps {
  hotel: IHotel;
}

type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
export const HotelCard = ({ hotel }: IProps) => {
  const { navigate } = useNavigation<HomeScreenProp>();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigate('HotelDetails', { hotel: hotel })}>
      <ImageBackground source={{ uri: hotel.image }} style={styles.background}>
        <View style={styles.rateCont}>
          <MaterialCommunityIcons
            name="star"
            color={COLORS.yellow}
            size={20}
            style={styles.icon}
          />
          <CustomText size={14} weight="semiBold" color={COLORS.white}>
            {hotel.rate}
          </CustomText>
        </View>
        <View>
          <CustomText
            size={17}
            weight="bold"
            color={COLORS.white}
            style={styles.name}>
            {hotel.name}
          </CustomText>
          <CustomText size={14} weight="semiBold" color={COLORS.white}>
            {hotel.address}
          </CustomText>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
