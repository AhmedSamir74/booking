import { StyleSheet } from 'react-native';
import theme, { COLORS } from '@assets/theme/theme';
import { scaleFontSize } from '@utils/scaling';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background.light,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginVertical: 40,
  },

  topBarCont: {
    backgroundColor: '#FFFFFF',
  },
  topBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  activeTopBarItem: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: scaleFontSize(20),
    color: COLORS.gray,
  },
  activeTabText: {
    fontFamily: theme.fontFamily.bold,
    color: COLORS.black,
  },
});
