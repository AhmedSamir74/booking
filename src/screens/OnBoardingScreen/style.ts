import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '@utils/scaling';
import { COLORS } from '@assets/theme/theme';

export default StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-around',
  },
  textCont: {
    paddingHorizontal: 16,
  },
  description: {
    marginTop: 32,
    color: COLORS.darkGray,
    lineHeight: 30,
  },
  button: {
    alignSelf: 'center',
    width: SCREEN_WIDTH * 0.4,
  },
});
