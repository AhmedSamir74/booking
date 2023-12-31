import { scaleHeight, scaleWidth } from '@utils/scaling';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  layout: {
    paddingHorizontal: scaleWidth(16),
    paddingTop: scaleHeight(15),
  },
  backIcon: {
    marginEnd: 15,
  },
});
