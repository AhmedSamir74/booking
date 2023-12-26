import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { CustomInput } from '@components/common/CustomInput/CustomInput';
import { CustomButton } from '@components/Form';
import { COLORS } from '@assets/theme/theme';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/RootStackPrams';
import { strings } from 'localization';
import { CustomText } from '@components/common';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import Toast from 'react-native-toast-message';

const schema = Yup.object({
  usernameOrEmail: Yup.mixed()
    .required('Username or email is required')
    .test(
      'usernameOrEmail',
      'Please enter a valid username or email',
      function (value) {
        const { path, createError } = this;

        if (!value) {
          return false;
        }

        // Check if the value is a valid email address
        if (Yup.string().email().isValidSync(value)) {
          return true;
        }

        // Check if the value is a valid username
        if (
          Yup.string()
            .matches(/^[a-zA-Z0-9_-]+$/)
            .isValidSync(value)
        ) {
          return true;
        }

        // Neither a valid email nor a valid username
        return createError({
          path,
          message: 'Please enter a valid username or email',
        });
      },
    ),
  password: Yup.string().required(strings('auth.required')),
}).required();

interface ILoginInputs {
  usernameOrEmail: string;
  password: string;
}
export const LoginForm = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const onForgetPasswordPress = () => {};
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ILoginInputs) => {
    auth()
      .signInWithEmailAndPassword(data.usernameOrEmail, data.password)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error,
        });
        console.error(error);
      });
  };

  return (
    <View style={styles.formCont}>
      <View>
        <CustomInput
          control={control}
          title={strings('auth.usernameOrEmail')}
          name="usernameOrEmail"
          error={errors.usernameOrEmail?.message as string}
        />

        <CustomInput
          control={control}
          title={strings('auth.password')}
          name="password"
          error={errors.password?.message}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={styles.forgetPassLink}
        onPress={onForgetPasswordPress}>
        <CustomText size={14} color={COLORS.darkGray}>
          {strings('auth.forgetPassword')}
        </CustomText>
      </TouchableOpacity>

      <CustomButton
        onPress={handleSubmit(onSubmit)}
        title={strings('auth.loginButtonTitle')}
        style={styles.button}
      />
    </View>
  );
};
