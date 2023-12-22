import Storage from '../../storage';
import { UnistylesRuntime } from "react-native-unistyles";
function toggleTheme() {
  if (UnistylesRuntime.themeName === 'dark') {
    UnistylesRuntime.setTheme('light');
    Storage.setItem('theme', 'light');
  } else {
    UnistylesRuntime.setTheme('dark');
    Storage.setItem('theme', 'dark');
  }
}
export default toggleTheme;
//# sourceMappingURL=index.js.map