import React, {Component} from "react";
import {connect} from "react-redux";
import Helmet from 'react-helmet';

import styled, { withTheme } from "styled-components";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography
} from "@material-ui/core";

import { green, red } from "@material-ui/core/colors";
import { spacing } from "@material-ui/system";

import Actions from "./Actions";
import BarChart from "./BarChart";
import DoughnutChart from "./DoughnutChart";
import LanguagesTable from "./LanguagesTable";
import Stats from "./Stats";
import TrafficTable from "./TrafficTable";
import LineChart from "./LineChart";

import {handleAccountChange} from "../../redux/actions";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

class Accounts extends Component {

  render () {
    return (
        <React.Fragment>
          <Helmet title="Accounts Dashboard" />
          <Grid justify="space-between" container spacing={6}>
            <Grid item>
              <Typography variant="h3" display="inline">
                Accounts Dashboard
              </Typography>
              <Typography variant="body2" ml={2} display="inline">
                {`${new Date()}`}
              </Typography>
            </Grid>

            <Grid item>
              <Actions
                  selectName={"account"}
                  account={this.props.account}
                  anchorEL={this.props.anchorEl}
                  accountChanged = {this.props.handleAccountChange}
                  dateClicked = {this.handleDateClick}
                  dateClosed = {this.handleDateClose}
              />
            </Grid>
          </Grid>

          <Divider my={6} />

          <Grid container spacing={6}>
            <Grid item xs={12} lg={5}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={12} md={6}>
                  <Stats
                      title="Total"
                      amount="120000"
                      chip="USD"
                      percentageText="+14%"
                      percentagecolor={green[500]}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Stats
                      title="Balance"
                      amount="63.200"
                      chip="USD"
                      percentageText="-12%"
                      percentagecolor={red[500]}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Stats
                      title="Securities"
                      amount="1.320"
                      chip="USD"
                      percentageText="-18%"
                      percentagecolor={red[500]}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Stats
                      title="Daily Change"
                      amount="12.364"
                      chip="USD"
                      percentageText="+27%"
                      percentagecolor={green[500]}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={7}>
              <BarChart
                  title={"Account History"}
              />
            </Grid>
          </Grid>

          <Grid container spacing={6}>
            <Grid item xs={12} lg={8}>
              <LineChart />
            </Grid>
            <Grid item xs={12} lg={4}>
              <DoughnutChart />
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xs={12} lg={4}>
              <LanguagesTable />
            </Grid>
            <Grid item xs={12} lg={8}>
              <TrafficTable />
            </Grid>
          </Grid>
        </React.Fragment>
    );
  }

  handleAccountChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleDateClose = () => {
    this.setState({ anchorEl: null });
  };


}

function mapStateToProps (store) {
  return ({
    actionsState: store.accountsReducer
  })
}

function mapDispatchToProps (dispatch) {
  return {
    handleAccountChange: (event) => dispatch(handleAccountChange(event))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withTheme(Accounts));
