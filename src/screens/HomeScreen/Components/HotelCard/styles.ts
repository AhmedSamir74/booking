import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils/scaling';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    justifyContent: 'space-between',
    height: SCREEN_HEIGHT * 0.55,
    width: SCREEN_WIDTH * 0.75,
    marginEnd: 20,
    borderRadius: 25,
    overflow: 'hidden',
    padding: 15,
  },
  icon: {
    marginEnd: 5,
  },
  rateCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  name: {
    marginBottom: 15,
  },
});
