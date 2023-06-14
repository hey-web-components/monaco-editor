import {addons} from '@storybook/manager-api';
import myTheme from './my-theme.js';

addons.setConfig({
  enableShortcuts: false,
  theme: myTheme,
});
