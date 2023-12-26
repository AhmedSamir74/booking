import { COLORS } from '@assets/theme/theme';
import * as React from 'react';
import { Controller } from 'react-hook-form';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextProps,
  View,
  ViewStyle,
} from 'react-native';
import { CustomText } from '../CustomText/CustomText';

interface CustomInputProps extends TextProps {
  title?: string;
  control: any;
  name: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
  [key: string]: any;
}

export const CustomInput = ({
  title,
  control,
  error,
  name,
  style,
  ...props
}: CustomInputProps) => {
  return (
    <View style={[styles.inputCont, style]}>
      <CustomText size={14} style={styles.inputTitle}>
        {title}
      </CustomText>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            {...props}
          />
        )}
        name={name}
      />
      {error && <CustomText style={styles.errorText}>{error}</CustomText>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputCont: {
    marginVertical: 15,
  },
  input: {
    height: 55,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 28,
    paddingHorizontal: 15,
  },
  inputTitle: {
    marginBottom: 10,
    color: COLORS.darkGray,
  },
  errorText: {
    color: COLORS.error,
    marginTop: 8,
    marginStart: 10,
  },
});
