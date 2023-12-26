import { scaleWidth } from '@utils/scaling';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  layout: {
    paddingVertical: 30,
    paddingHorizontal: scaleWidth(16),
  },
  footerLoader: {
    marginBottom: 15,
  },
  headerIcon: {
    width: 25,
    height: 25,
    alignSelf: 'flex-end',
  },
  greeting: {
    paddingVertical: 20,
  },
  categoriesAndHotelsCont: {
    flex: 1,
  },
});
