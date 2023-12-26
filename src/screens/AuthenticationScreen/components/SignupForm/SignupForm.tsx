import React from 'react';
import { View } from 'react-native';

import { CustomInput } from '@components/common/CustomInput/CustomInput';
import { CustomButton } from '@components/Form';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/RootStackPrams';
import { strings } from 'localization';
import auth from '@react-native-firebase/auth';

import styles from './styles';
import Toast from 'react-native-toast-message';

const schema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username can be at most 20 characters')
    .matches(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, underscores, and hyphens',
    ),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: Yup.string().required(strings('auth.required')),
}).required();

interface ISignupInputs {
  username: string;
  email: string;
  password: string;
}
export const SignupForm = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ISignupInputs) => {
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        console.log('User account created & signed in!');
        Toast.show({
          type: 'success',
          text1: 'User account created & signed in!',
        });
        navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          Toast.show({
            type: 'error',
            text1: 'That email address is already in use!',
          });
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          Toast.show({
            type: 'error',
            text1: 'That email address is invalid',
          });
        }

        console.error(error);
      });
  };

  return (
    <View style={styles.formCont}>
      <View>
        <CustomInput
          control={control}
          title={strings('auth.username')}
          name="username"
          error={errors.username?.message}
        />

        <CustomInput
          control={control}
          title={strings('auth.email')}
          name="email"
          error={errors.email?.message}
        />

        <CustomInput
          control={control}
          title={strings('auth.password')}
          name="password"
          error={errors.password?.message}
          secureTextEntry
        />
      </View>

      <CustomButton
        onPress={handleSubmit(onSubmit)}
        title={strings('auth.signup')}
        style={styles.button}
        // disabled={!isValid}
      />
    </View>
  );
};
