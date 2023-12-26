import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { CustomText } from '@components/common';
import styles from './styles';

interface IProps {
  onPress: () => void;
  category: ICategory;
  isActive: boolean;
}

interface ICategory {
  name: string;
  id: number;
}

export const CategoryCard = ({ onPress, category, isActive }: IProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.container}>
      <CustomText style={[styles.text, isActive && styles.activeText]}>
        {category.name}
      </CustomText>
      <View
        style={[styles.categoryCircle, isActive && styles.activeCategory]}
      />
    </TouchableOpacity>
  );
};
