import { createTheme } from '@material-ui/core/styles';

export const siadtheme = createTheme({
    overrides: {
        MuiIconButton: {
            root: {
                '&:hover': {
                    backgroundColor: "$labelcolor"
                }
            }
        }
    },
    palette: {
        primary: {
            light: '#4265A6',
            main: '#092458',
            dark: '#061A40',
            contrastText: '#fff',
        },
        secondary: {
            light: 'rgb(90,86,86)',
            main: 'rgb(230,15,15)',
            dark: 'rgb(179,12,12)',
            contrastText: 'rgb(255,255,255)',
            // light: '#EA5656',
            // main: '#E60F0F',
            // dark: '#B30C0C',
            // contrastText: '#000',
        },
    },
})