import { breakpoints } from './breakpoints';
import { lightTheme, darkTheme } from './theme';
type AppBreakpoints = typeof breakpoints;
type AppThemes = {
    light: typeof lightTheme;
    dark: typeof darkTheme;
};
declare module 'react-native-unistyles' {
    interface UnistylesBreakpoints extends AppBreakpoints {
    }
    interface UnistylesThemes extends AppThemes {
    }
}
export { lightTheme, darkTheme };
//# sourceMappingURL=index.d.ts.map