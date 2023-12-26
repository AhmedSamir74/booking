import { CustomText } from '@components/common';
import Row from '@components/common/Row';
import React from 'react';
import { View } from 'react-native';
import { IBookingProps } from 'types';

import styles from './styles';
import { COLORS } from '@assets/theme/theme';
import FastImage from 'react-native-fast-image';
interface IProps {
  booking: IBookingProps;
}
export const BookingCard = ({
  booking: { hotelData, startDate, endDate },
}: IProps) => {
  return (
    <Row alignItems="center" style={styles.cardCont}>
      <FastImage source={{ uri: hotelData.image }} style={styles.cardImage} />
      <View style={styles.cardData}>
        <CustomText size={14} weight="bold">
          {hotelData.name}
        </CustomText>
        <CustomText style={styles.address}>{hotelData.address}</CustomText>
        <Row alignItems="center" justifyContent="space-between">
          <CustomText size={14} color={COLORS.darkGray}>
            From
          </CustomText>
          <CustomText size={14} color={COLORS.darkGray}>
            {startDate.dateString}
          </CustomText>
        </Row>
        <Row alignItems="center" justifyContent="space-between">
          <CustomText size={14} color={COLORS.darkGray}>
            To
          </CustomText>
          <CustomText size={14} color={COLORS.darkGray}>
            {endDate.dateString}
          </CustomText>
        </Row>
      </View>
    </Row>
  );
};
