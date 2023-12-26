import { COLORS, FONT_FAMILIES } from '@assets/theme/theme';
import { scaleHeight, scaleWidth } from '@utils/scaling';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  layout: {
    paddingHorizontal: scaleWidth(16),
    paddingTop: scaleHeight(10),
  },
  langCont: {
    flex: 1,
    borderWidth: 1,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
    marginBottom: 10,
  },
  profileImageCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraCont: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsCont: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 28,
    marginTop: 40,
    marginBottom: 35,
  },
  statCont: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    color: COLORS.primary,
    fontFamily: FONT_FAMILIES.bold,
    marginBottom: 5,
  },
  statTitle: {
    color: COLORS.gray,
    fontSize: 14,
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginEnd: 15,
  },
  tabCont: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  options: {
    fontFamily: FONT_FAMILIES.semiBold,
    marginBottom: 25,
    fontSize: 16,
  },
  logoutIcon: {
    marginEnd: 15,
  },
});
