import React from 'react';
import Container from '@material-ui/core/Container';
import Routes from './routes';
import 'fontsource-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import Store from './store/Store';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export default function App() {
  // Doc: https://material-ui.com/customization/theming/
  // Add theme at application
  const theme = createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          a: {
            textDecoration: 'none'
          }
        }
      }
    },
    palette: {
      primary: {
        main: '#4caf50'
      },
      secondary: {
        main: '#9e9e9e'
      }
    }
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Store>
            <Routes />
          </Store>
        </Container>
      </ThemeProvider>
    </>
  );
}
