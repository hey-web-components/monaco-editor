module.exports = {
  stories: ['./**/*.stories.mdx', './**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/web-components',
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },
  viteFinal(config) {
    config.base = './';
    return config;
  },
};
