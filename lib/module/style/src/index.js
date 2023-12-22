import { UnistylesRegistry } from 'react-native-unistyles';
import { breakpoints } from './breakpoints';
import { lightTheme, darkTheme } from './theme';
UnistylesRegistry.addBreakpoints(breakpoints).addThemes({
  light: lightTheme,
  dark: darkTheme
}).addConfig({
  adaptiveThemes: true
});
export { lightTheme, darkTheme };
//# sourceMappingURL=index.js.map