import React, {Component} from "react";
import styled, { withTheme } from "styled-components";
import {connect} from 'react-redux'
import Helmet from 'react-helmet';

import {
    Grid,
    Divider as MuiDivider,
    Typography as MuiTypography,
    Toolbar,
    AppBar as MuiAppBar, InputBase
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import {darken} from "polished";

import DatePickers from "./DatePickers";
import SearchButton from './SearchButton'
import SaveButton from './SaveButton'
import CandleStickChart from './CandleSticksChart';

import {formattedToday} from "../../../utils/helpfunctions";

import {searchDB} from '../../../redux/actions'

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

const AppBar = styled(MuiAppBar)`
  background: ${props => props.theme.header.background};
  color: ${props => props.theme.header.color};
  box-shadow: ${props => props.theme.shadows[1]};
`;

const Search = styled.div`
  border-radius: 2px;
  background-color: ${props => props.theme.header.background};
  display: none;
  position: relative;
  width: 780%;

  &:hover {
    background-color: ${props => darken(0.05, props.theme.header.background)};
  }

  ${props => props.theme.breakpoints.up("md")} {
    display: block;
  }
`;


const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${props => props.theme.header.search.color};
    padding-top: ${props => props.theme.spacing(2.5)}px;
    padding-right: ${props => props.theme.spacing(2.5)}px;
    padding-bottom: ${props => props.theme.spacing(2.5)}px;
    padding-left: ${props => props.theme.spacing(12)}px;
    width: 160px;
  }
`;


class Home extends Component {

    render() {

        return (
            <React.Fragment>

                <Helmet title="Stock Charts" />

                <Grid justify="space-between" container spacing={6}>
                    <Grid item>
                        <Typography variant="h3" display="inline">
                            Investment Charts
                        </Typography>
                        <Typography variant="body2" ml={2} display="inline">
                            {`${new Date()}`}
                        </Typography>
                    </Grid>
                </Grid>

                <Divider my={6} />

                <AppBar position="sticky" elevation={0}>
                    <Toolbar>
                        <Grid container alignItems="center">

                            <Grid item>
                                <Search>
                                    <Input placeholder="Search Query" />
                                </Search>
                            </Grid>
                            <Grid item xs />
                            <Grid item>
                                <DatePickers
                                    type="date"
                                    id="date"
                                    label="Filter by Date"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    defaultValue={`${formattedToday("yyyy-mm-dd")}`}
                                />
                            </Grid>
                            <Grid item>
                                <SearchButton search={this.props.searchDB}/>
                            </Grid>
                            <Grid item>
                                <SaveButton />
                            </Grid>
                        </Grid>

                    </Toolbar>
                </AppBar>
                <Divider my={6} />
                <Grid container  alignItems="center" spacing={6}>
                        <Grid item xs={12} lg={12}>
                            <CandleStickChart type={"svg"} data={this.props.candleSticks} />
                        </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

function mapStateToProps (store) {
    return ({
        countersData: store.filteredDashboardReducer.counters,
        candleSticks: store.filteredDashboardReducer.candlesticks
    })
}

function mapDispatchToProps (dispatch) {
    return {
        searchDB: (query) => dispatch(searchDB(query))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withTheme(Home));
