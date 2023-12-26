import React, { FC, useRef, useState } from 'react';
import { Image, View } from 'react-native';
import { CustomLayout, CustomSheet, CustomText } from '@components/common';
import _isEmpty from 'lodash/isEmpty';

import styles from './style';
import { strings } from 'localization';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '@assets/theme/theme';
import Row from '@components/common/Row';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IDateProps, IHotel } from 'types';
import { CustomButton } from '@components/Form';

import { Calendar, DateData } from 'react-native-calendars';
import { SCREEN_HEIGHT } from '@utils/scaling';
import { MarkedDates } from 'react-native-calendars/src/types';
import {
  calenderTheme,
  checkDayValid,
  getPeriod,
  markingProps,
} from './calendar.helpers';
import moment from 'moment';
import FirebaseController from '@utils/FirebaseController';
import { useSelector } from 'react-redux';
import { selectUserData } from '@store/slices/userSlice';
import images from '@assets/theme/images';
import { RootStackParamList } from 'types/RootStackPrams';
import { StackNavigationProp } from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';

const INITIAL_DATE = new Date();

type HotelDetailsScreenProp = StackNavigationProp<
  RootStackParamList,
  'HotelDetails'
>;
export const HotelsDetailsScreen: FC = () => {
  const firebaseController = useRef(new FirebaseController());
  const navigation = useNavigation<HotelDetailsScreenProp>();
  const calenderSheetRef = useRef<any>();
  const successSheetRef = useRef<any>();
  const failedSheetRef = useRef<any>();
  const { params } = useRoute<any>();
  const hotelData: IHotel = params.hotel;

  const [startDate, setStartDate] = useState<IDateProps>();
  const [endDate, setEndDate] = useState<IDateProps>();
  const [period, setPeriod] = useState<MarkedDates>();

  const user = useSelector(selectUserData);

  const onBookPress = () => {
    calenderSheetRef.current.open();
  };
  const onConfirmDates = () => {
    firebaseController.current
      .createReservation({
        userId: user?.uid,
        hotelData,
        startDate,
        endDate,
      })
      .then(documentReference => {
        console.log('Document added with ID: ', documentReference.id);
        // Success! You can perform additional operations here.
        calenderSheetRef.current.close();
        setTimeout(() => {
          successSheetRef.current.open();
        }, 500);
      })
      .catch(error => {
        console.error('Error adding document: ', error);
        // Handle the error here.
      });
  };

  const onUpdate = (startD: any, endD: any, tempPeriod: MarkedDates) => {
    console.log(startD);
    console.log(endD);
    console.log(tempPeriod);
    setStartDate(startD);
    setEndDate(endD);
    setPeriod(tempPeriod);
  };

  const setDay = (dayObj: DateData) => {
    const isSelectionValid = checkDayValid(dayObj, period);
    if (!isSelectionValid) {
      return;
    }

    const { dateString, day, month, year } = dayObj;
    const timestamp = new Date(year, month - 1, day).getTime();
    const newDayObj = { ...dayObj, timestamp };

    const startIsEmpty = _isEmpty(startDate);

    if (startIsEmpty || (!startIsEmpty && !_isEmpty(endDate))) {
      const tempPeriod = {
        [dateString]: {
          endingDay: true,
          startingDay: true,
          ...markingProps,
        },
      };
      onUpdate(newDayObj, {}, tempPeriod);
    } else {
      // if end date is older than start date switch
      const { timestamp: savedTimestamp } = startDate;
      if (savedTimestamp > timestamp) {
        const tempPeriod = getPeriod(timestamp, savedTimestamp);
        onUpdate(newDayObj, startDate, tempPeriod);
      } else {
        const tempPeriod = getPeriod(savedTimestamp, timestamp);
        onUpdate(startDate, newDayObj, tempPeriod);
      }
    }
  };

  const backToHome = () => {
    successSheetRef.current?.close();
    navigation.navigate('Home');
  };
  return (
    <CustomLayout style={styles.layout}>
      <View>
        <Row alignItems="center">
          <MaterialCommunityIcons
            name="arrow-left"
            color={COLORS.darkGray}
            size={30}
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
          <CustomText size={14} weight="semiBold">
            {strings('descriptionPage.title')}
          </CustomText>
        </Row>

        <Row alignItems="center" style={styles.cardCont}>
          <FastImage
            source={{ uri: hotelData.image }}
            style={styles.cardImage}
          />
          <View style={styles.cardData}>
            <CustomText size={14} weight="bold">
              {hotelData.name}
            </CustomText>
            <CustomText style={styles.address}>{hotelData.address}</CustomText>
            <Row alignItems="center">
              <MaterialCommunityIcons
                name="star"
                color={COLORS.yellow}
                size={20}
              />
              <CustomText
                size={14}
                color={COLORS.yellow}
                style={styles.rateText}>
                {hotelData.rate}
              </CustomText>
              <CustomText size={14} color={COLORS.gray}>
                (1763 Reviews)
              </CustomText>
            </Row>
          </View>
        </Row>

        <View>
          <CustomText style={styles.descriptionText}>
            Tropicasa De Hotel is high rated hotels with 1000+ reviews and we
            are always maintaning the quality for better rating and high
            attitude service for you.
          </CustomText>

          <CustomText style={styles.descriptionText}>
            Tropicasa De Hotel located in a strategic location, only 6 Km from
            the airport and 1 Km from the train station. The hotel located in
            the middle of the city so you can enjoy the city and see something
            nearby.
          </CustomText>

          <CustomText style={styles.descriptionText}>
            You will be welcomed amongst olive trees, citron trees and
            magnolias, in gardens that hide exotic plants and in a wonderful
            outdoor pool with deck chairs.
          </CustomText>
        </View>
      </View>
      <CustomButton
        onPress={onBookPress}
        title={strings('descriptionPage.book')}
        style={styles.button}
      />

      <CustomSheet
        closeOnDragDown
        ref={calenderSheetRef}
        height={SCREEN_HEIGHT * 0.8}
        style={styles.sheetCont}>
        <Calendar
          initialDate={INITIAL_DATE.toString()}
          hideExtraDays={false}
          hideDayNames={false}
          onDayPress={date => {
            setDay(date);
          }}
          markedDates={period}
          markingType="period"
          minDate={INITIAL_DATE.toString()}
          theme={calenderTheme()}
        />

        <Row justifyContent="space-between" alignItems="center">
          <View>
            <CustomText size={12} color={COLORS.gray} marginBottom={8}>
              Check In
            </CustomText>
            <CustomText weight="semiBold" size={16}>
              {moment(startDate?.timestamp).format('MMM DD')}
            </CustomText>
          </View>
          <View>
            <CustomText color={COLORS.gray}>{'>'}</CustomText>
          </View>
          <View>
            <CustomText size={12} color={COLORS.gray} marginBottom={8}>
              Check Out
            </CustomText>
            <CustomText weight="semiBold" size={16}>
              {moment(endDate?.timestamp).format('MMM DD')}
            </CustomText>
          </View>
        </Row>
        <CustomButton
          onPress={onConfirmDates}
          title={strings('descriptionPage.continue')}
        />
      </CustomSheet>

      <CustomSheet
        ref={successSheetRef}
        height={SCREEN_HEIGHT * 0.6}
        style={styles.sheetCont}>
        <Image
          source={images.icons.success}
          resizeMode="contain"
          style={styles.statusImg}
        />
        <CustomText size={20} weight="semiBold">
          Transaction Success
        </CustomText>
        <CustomText size={14} color={COLORS.gray}>
          Congratulations! You can see your bookings in the booking section.
          Enjoy your trip!
        </CustomText>
        <CustomButton onPress={backToHome} title="Back To Home" />
      </CustomSheet>

      <CustomSheet ref={failedSheetRef}>
        <View>
          <Image
            source={images.icons.failed}
            resizeMode="contain"
            style={styles.statusImg}
          />
          <CustomText size={20} weight="semiBold">
            Transaction Failed
          </CustomText>
          <CustomText size={14} color={COLORS.gray}>
            Please check your internet connection and try again in a moments.
            Good luck!
          </CustomText>
          <CustomButton onPress={onConfirmDates} title="Try Again" />
        </View>
      </CustomSheet>
    </CustomLayout>
  );
};
