import React from "react";
import { connect } from "react-redux";

import Helmet from 'react-helmet';

import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components";

import maTheme from "./theme";
import Routes from "./routes/Routes";

function App({ theme }) {
  return (
    <React.Fragment>
      <Helmet
        titleTemplate="%s | Wave Platform"
        defaultTitle="Wave - Algo Trading Platform"
      />
      <StylesProvider injectFirst>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MuiThemeProvider theme={maTheme[theme.currentTheme]}>
            <ThemeProvider theme={maTheme[theme.currentTheme]}>
              <Routes/>
            </ThemeProvider>
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    </React.Fragment>
  );
}

function mapStateToProps (store) {
    return ({
        theme: store.themeReducer
    })
}

export default connect(mapStateToProps)(App);
