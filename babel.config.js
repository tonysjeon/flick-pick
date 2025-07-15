module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
            '@/components': './components',
            '@/screens': './screens',
            '@/hooks': './hooks',
            '@/utils': './utils',
            '@/types': './types',
          },
        },
      ],
    ],
  };
}; 