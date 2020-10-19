
import React from 'react';
import Pricing from './pages/Pricing';
import Copyright from './components/Copyright';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from 'react-router-dom';
import SideBarLayout from './layouts/SideBarLayout';
import Home from './pages/Home';
import { SnackbarProvider } from 'notistack';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from './theme';
import MealsPage from './pages/MealsPage';
import { MealsContextProvider } from './contexts/MealsContext';

export default function App() {
  const title = 'Home Calendar'
  return (
    <SnackbarProvider maxSnack={3}>
      <MealsContextProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Router>
            <SideBarLayout title={title}>
              <Switch>
                <Route path="/meals">
                  <MealsPage />
                </Route>
                <Route path="/pricing">
                  <Pricing title="Tasks. Gameified." copy="do things. get points. feel good. now you really want to buy."/>
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
              <Box pt={4}>
                <Copyright />
              </Box>
            </SideBarLayout>
          </Router>
        </ThemeProvider>
      </MealsContextProvider>
    </SnackbarProvider>
  );
}