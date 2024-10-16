module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/': './src',
          '@assets': './src/assets',
          '@components': './src/components',
          '@features': './src/features',
          '@services': './src/services',
          '@styles': './src/styles',
          '@utils': './src/utils',
          '@state': './src/state',
          '@navigation': './src/navigation',
          '@types': './src/types',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
