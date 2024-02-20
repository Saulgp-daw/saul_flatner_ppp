module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [['@babel/plugin-proposal-decorators', {legacy: true}]],
  plugins: ['react-native-reanimated/plugin'],
};
