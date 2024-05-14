module.exports = {
  stories: ['./**/*.mdx', './**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-mdx-gfm'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },
  core: {
    disableTelemetry: true
  },
  viteFinal(config) {
    config.base = './';
    return config;
  },
  docs: {
    autodocs: true
  }
};