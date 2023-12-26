import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';

import {
  CustomLayout,
  CustomText,
  EmptyList,
  ErrorCard,
  Skelton,
} from '@components/common';

import FirebaseController from '@utils/FirebaseController';

import styles from './styles';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import images from '@assets/theme/images';
import { strings } from 'localization';
import { CATEGORIES } from './categories.constants';
import { CategoryCard, HotelCard } from './Components';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/RootStackPrams';
import { useNavigation } from '@react-navigation/native';

// FOR GETTING HOTELS USING GOOGLE PLACE API BUT IT COULDN'T BE USED BECAUSE IT'S NOT FREE
// import { useGetNearbyHotels } from '@hooks/useGetNearbyHotels';

type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
export const HomeScreen = () => {
  const { navigate } = useNavigation<HomeScreenProp>();

  // const { hotels: hotelsData, isLoading: isHotelsLoading } =
  //   useGetNearbyHotels();

  const firebaseController = useRef(new FirebaseController()).current;
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);

  const [hotels, setHotels] = useState<FirebaseFirestoreTypes.DocumentData[]>(
    [],
  );

  const [isLoading, setIsLoading] = useState(true);

  const [loadingError, setLoadingError] = useState('');

  const getHotels = async () => {
    firebaseController
      .getHotels()
      .then(async querySnapshot => querySnapshot.docs)
      .then(async docs => {
        setHotels(docs);
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
    return isLoading ? <Skelton /> : <EmptyList />;
  };

  useEffect(() => {
    getHotels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingError) {
    <ErrorCard>{loadingError}</ErrorCard>;
  }

  return (
    <CustomLayout style={styles.layout}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigate('Profile')}>
        <Image
          source={images.icons.award}
          style={styles.headerIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.categoriesAndHotelsCont}>
        <View>
          <CustomText size={28} weight="semiBold" style={styles.greeting}>
            {strings('homePage.greeting')}
          </CustomText>
          <FlatList
            data={CATEGORIES}
            renderItem={({ item }) => (
              <CategoryCard
                onPress={() => setActiveCategory(item.id)}
                category={item}
                isActive={item.id === activeCategory}
              />
            )}
            horizontal
          />
        </View>
        <FlatList
          data={hotels}
          renderItem={({ item }) => <HotelCard hotel={item.data()} />}
          ListEmptyComponent={getListEmptyComponent}
          horizontal
        />
      </View>
    </CustomLayout>
  );
};
