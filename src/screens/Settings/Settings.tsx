import React from 'react';
import { CustomLayout, Section } from '@components/common';
import styles from './styles';
import { LANGUAGES_OPTIONS, THEMES_OPTIONS, THEME_KEY } from '@utils/constants';
import {
  changeLanguage,
  getCurrentLanguage,
  strings,
} from '../../localization';
import { IOption } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, setTheme } from '@store/slices/themSlice';
import { RadioGroup } from '@components/Form';
import { _storeData } from '@utils/storageController';
import Row from '@components/common/Row';
import { COLORS } from '@assets/theme/theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'types/RootStackPrams';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type SettingsScreenProp = StackNavigationProp<RootStackParamList, 'Settings'>;
export const SettingsScreen = () => {
  const theme = useSelector(selectTheme);
  const { goBack } = useNavigation<SettingsScreenProp>();

  const dispatch = useDispatch();
  return (
    <CustomLayout style={styles.layout}>
      <Row alignItems="center">
        <MaterialCommunityIcons
          name="arrow-left"
          color={COLORS.darkGray}
          size={30}
          onPress={() => goBack()}
        />
      </Row>

      <Section title={strings('languages.title')} style={styles.langCont}>
        <RadioGroup
          initialValue={LANGUAGES_OPTIONS.find(
            value => value.value === getCurrentLanguage(),
          )}
          data={LANGUAGES_OPTIONS}
          onSelect={(item: IOption) => {
            changeLanguage(item.value);
          }}
        />
      </Section>

      <Section title={strings('themes.title')}>
        <RadioGroup
          initialValue={
            THEMES_OPTIONS.find(value => value.value === theme) ||
            THEMES_OPTIONS[0]
          }
          data={THEMES_OPTIONS}
          onSelect={(item: IOption) => {
            dispatch(setTheme(item.value));
            _storeData(THEME_KEY, item.value);
          }}
        />
      </Section>
    </CustomLayout>
  );
};
