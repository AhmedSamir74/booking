import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './style';
import { useSelector } from 'react-redux';
import { IOption } from 'types';
import { CustomText } from '@components/common';
import { selectIsDark } from '@store/slices/themSlice';
import { CustomPressable } from '../CustomPressable/CustomPressable';
import { strings } from 'localization';

export const RadioGroup = ({
  data,
  onSelect,
  style,
  initialValue,
}: {
  data: IOption[];
  onSelect: any;
  style?: any;
  initialValue?: IOption;
}) => {
  const [selectedItem, setSelectedItem] = useState<IOption | undefined>(
    initialValue,
  );
  const isDark = useSelector(selectIsDark);

  return (
    <View>
      {data.map((item, index) => (
        <CustomPressable
          onPress={() => {
            setSelectedItem(item);
            onSelect(item);
          }}
          key={index}
          style={[
            styles.itemCont,
            isDark && styles.darkItemCont,
            // eslint-disable-next-line react-native/no-inline-styles
            { borderBottomWidth: index % 2 === 0 ? 1 : 0 },
          ]}>
          <View
            style={[
              styles.checkBox,
              selectedItem?.value === item.value && styles.activeCheckBox,
            ]}
          />
          <CustomText size={14}>{strings(item.title)}</CustomText>
        </CustomPressable>
      ))}
    </View>
  );
};
