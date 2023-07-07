import { StackRoutes } from './stack.routes';
import { StackAuth } from './auth.routes';
import "../index.css";

// theme for some reason
import { siadtheme } from '../contexts/ThemeMui';
import { ThemeProvider } from '@material-ui/core/styles';

//Context
import { useAuth } from '../contexts/authProvider';

export function Routes() {
    const { authData } = useAuth();

    if (authData) {
        return (
            <ThemeProvider theme={siadtheme}>

                <StackRoutes />

            </ThemeProvider>
        )
    } else {
        return (
            <ThemeProvider theme={siadtheme}>

                <StackAuth />
                
            </ThemeProvider>
        )
    }
}