import {addons} from '@storybook/addons';
import myTheme from './my-theme.cjs';

addons.setConfig({
  enableShortcuts: false,
  theme: myTheme,
});
