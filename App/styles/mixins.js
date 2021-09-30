import {Dimensions, PixelRatio} from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

// Guideline sizes are based on iPhone 11 Pro dimensions (375 x 812)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scaleSize = size => (WINDOW_WIDTH / guidelineBaseWidth) * size;
export const verticalScaleSize = size =>
  (WINDOW_HEIGHT / guidelineBaseHeight) * size;

export const scaleFont = size => size * PixelRatio.getFontScale();
