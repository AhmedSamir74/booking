import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { View } from 'react-native';
import RBSheet, { RBSheetProps } from 'react-native-raw-bottom-sheet';
import styles from './style';
import { useSelector } from 'react-redux';
import { COLORS } from '@assets/theme/theme';

interface ISheetProps extends RBSheetProps {
  animationType?: 'none' | 'fade' | 'slide';
  children: any;
  style?: any;
  container?: any;
  [key: string]: any;
}

export const CustomSheet = forwardRef(
  (
    { animationType, children, style, container, ...props }: ISheetProps,
    ref,
  ) => {
    const sheetRef = useRef<any>(null);
    const schema = useSelector((state: any) => state.theme.theme);

    useImperativeHandle(ref, () => ({
      open() {
        sheetRef.current?.open();
      },
      close() {
        sheetRef.current?.close();
      },
    }));

    return (
      <RBSheet
        ref={sheetRef}
        openDuration={250}
        animationType={animationType || 'fade'}
        customStyles={{
          wrapper: styles.sheetWrapper,
          container: {
            ...styles.sheetContainer,
            ...styles.pickerSheetContainer,
            backgroundColor: schema === 'dark' ? COLORS.primary : COLORS.white,
            ...container,
          },
        }}
        {...props}>
        <View style={[styles.listContainer, style]}>{children}</View>
      </RBSheet>
    );
  },
);
