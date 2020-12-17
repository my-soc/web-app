import React from "react";
import styled from "styled-components";

import Helmet from 'react-helmet';

import {
  Typography as MuiTypography
} from "@material-ui/core";

import { display } from "@material-ui/system";

const Typography = styled(MuiTypography)(display);

function StrategyBuilder() {
  return (
    <React.Fragment>
      <Helmet title="Strategy Builder" />

      <Typography variant="h3" gutterBottom display="inline">
        Place Holder
      </Typography>
    </React.Fragment>
  );
}

export default StrategyBuilder;
