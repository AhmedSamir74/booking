import { COLORS } from '@assets/theme/theme';
import { selectIsDark } from '@store/slices/themSlice';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils/scaling';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useSelector } from 'react-redux';
import { View } from 'react-native';

export const BookingCardSkelton = () => {
  const isDark = useSelector(selectIsDark);

  return (
    <View>
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonPlaceholder
          key={index}
          backgroundColor={isDark ? COLORS.darkGray : COLORS.lightGray}>
          <SkeletonPlaceholder.Item
            marginTop={15}
            flexDirection="row"
            alignItems="center">
            <SkeletonPlaceholder.Item
              width={SCREEN_WIDTH * 0.2}
              height={100}
              borderRadius={6}
              marginLeft={10}
            />
            <SkeletonPlaceholder.Item
              width={SCREEN_WIDTH * 0.65}
              height={100}
              borderRadius={6}
              marginLeft={10}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      ))}
    </View>
  );
};
