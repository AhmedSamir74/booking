import { COLORS } from '@assets/theme/theme';
import { SCREEN_WIDTH } from '@utils/scaling';
import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  layout: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  backIcon: {
    marginEnd: 30,
  },
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
    marginTop: 10,
    marginBottom: 7,
  },
  rateText: {
    marginHorizontal: 5,
  },
  descriptionText: {
    marginTop: 25,
    fontSize: 14,
    color: COLORS.darkGray,
  },
  button: {
    alignSelf: 'center',
    width: SCREEN_WIDTH * 0.5,
  },
  sheetCont: {
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  statusImg: {
    width: 78,
    height: 78,
    alignSelf: 'center',
    marginTop: 50,
  },
});
