import { COLORS } from '@assets/theme/theme';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cardCont: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  cardImage: {
    width: 100,
    height: 100,
    marginEnd: 12,
    borderRadius: 12,
  },
  cardData: {
    justifyContent: 'space-between',
    flex: 1,
  },
  address: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 10,
  },
});
