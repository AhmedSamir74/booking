import { COLORS, FONT_FAMILIES } from '@assets/theme/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    marginHorizontal: 15,
  },
  categoryCircle: {
    height: 12,
    width: 12,
    borderRadius: 12 / 2,
  },
  activeCategory: {
    backgroundColor: COLORS.primary,
  },
  text: {
    color: COLORS.gray,
  },
  activeText: {
    fontFamily: FONT_FAMILIES.semiBold,
    color: COLORS.darkGray,
  },
});
