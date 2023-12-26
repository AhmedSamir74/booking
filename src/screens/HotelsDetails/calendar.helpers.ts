import { COLORS, FONT_FAMILIES } from '@assets/theme/theme';
import { I18nManager, Platform } from 'react-native';
import { DateData } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';

export const checkDayValid = (day: DateData, markedDates?: MarkedDates) => {
  const daysSelected = Object.keys(markedDates ?? {});
  const onlyOneDaySelected = daysSelected?.length === 1;
  if (!onlyOneDaySelected) {
    return true;
  }
  const daySelected = daysSelected[0];
  const dayToBeSelected = day.dateString;
  return daySelected !== dayToBeSelected;
};

export const getDateString = (timestamp: any) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let dateString = `${year}-`;
  if (month < 10) {
    dateString += `0${month}-`;
  } else {
    dateString += `${month}-`;
  }
  if (day < 10) {
    dateString += `0${day}`;
  } else {
    dateString += day;
  }

  return dateString;
};

export const calenderTheme: any = () => ({
  backgroundColor: '#ffffff',
  calendarBackground: '#ffffff',
  monthTextColor: COLORS.secondary,
  arrowColor: COLORS.secondary,
  todayTextColor: COLORS.secondary,
  textDayHeaderFontWeight: 'bold',

  textDayHeaderFontFamily: FONT_FAMILIES.bold,
  textDayFontFamily: FONT_FAMILIES.regular,

  textDisabledColor: '#d9dbe0',

  textMonthFontFamily: FONT_FAMILIES.bold,
  textMonthFontWeight: 'bold',
  textMonthFontSize: 18,
});

export const markingProps: any = {
  color: COLORS.primary,
  customTextStyle: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    fontFamily: FONT_FAMILIES.bold,
    width: 35,
    height: 35,
    borderRadius: 30 / 2,
    textAlign: 'center',
    paddingTop: Platform.OS === 'ios' && I18nManager.isRTL ? 3 : 8.5,
  },
};

export const getPeriod = (startTimestamp: any, endTimestamp: any) => {
  const tempPeriod: MarkedDates = {};
  let currentTimestamp = startTimestamp;
  while (currentTimestamp < endTimestamp) {
    const dateString = getDateString(currentTimestamp);
    tempPeriod[dateString] = {
      color: 'rgba(0, 167, 110, 0.2)',
      startingDay: currentTimestamp === startTimestamp,
      customTextStyle: {
        color: COLORS.white,
      },
    };
    currentTimestamp += 24 * 60 * 60 * 1000;
  }

  const dateString = getDateString(endTimestamp);
  const startDateString = getDateString(startTimestamp);

  tempPeriod[startDateString] = {
    startingDay: true,
    ...markingProps,
  };

  tempPeriod[dateString] = {
    endingDay: true,
    ...markingProps,
  };

  return tempPeriod;
};
