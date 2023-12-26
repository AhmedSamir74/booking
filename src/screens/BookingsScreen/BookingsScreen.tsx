import React, { useEffect, useRef, useState } from 'react';
import {
  CustomLayout,
  CustomText,
  EmptyList,
  ErrorCard,
} from '@components/common';

import styles from './styles';
import Row from '@components/common/Row';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '@assets/theme/theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/RootStackPrams';
import { useNavigation } from '@react-navigation/native';
import { strings } from 'localization';
import { FlatList } from 'react-native';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { BookingCard } from './Components/BookingCard/BookingCard';
import { BookingCardSkelton } from './Components/BookingCardSkelton/BookingCardSkelton';
import FirebaseController from '@utils/FirebaseController';
import { useSelector } from 'react-redux';
import { selectUserData } from '@store/slices/userSlice';

type ProfileScreenProp = StackNavigationProp<RootStackParamList, 'Profile'>;
export const BookingsScreen = () => {
  const { goBack } = useNavigation<ProfileScreenProp>();
  const firebaseController = useRef(new FirebaseController());
  const user = useSelector(selectUserData);

  const [bookings, setBookings] = useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const [loadingError, setLoadingError] = useState('');

  const getBookings = async () => {
    firebaseController.current
      .getUserBookings(user.uid)
      .then(async querySnapshot => querySnapshot.docs)
      .then(async docs => {
        setBookings(docs);
      })
      .catch((error: any) => {
        setLoadingError("Can't Load data, Please try again");
        return error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getListEmptyComponent = () => {
    return isLoading ? <BookingCardSkelton /> : <EmptyList />;
  };

  useEffect(() => {
    !!user.uid && getBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingError) {
    <ErrorCard>{loadingError}</ErrorCard>;
  }

  return (
    <CustomLayout style={styles.layout}>
      <Row alignItems="center">
        <MaterialCommunityIcons
          name="arrow-left"
          color={COLORS.darkGray}
          size={30}
          style={styles.backIcon}
          onPress={() => goBack()}
        />
        <CustomText size={14} weight="semiBold">
          Bookings
        </CustomText>
      </Row>

      <FlatList
        data={bookings}
        renderItem={({ item }) => <BookingCard booking={item.data()} />}
        ListEmptyComponent={getListEmptyComponent}
      />
    </CustomLayout>
  );
};
