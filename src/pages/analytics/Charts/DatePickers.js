import React from "react";
import styled from "styled-components";

import {
  CardContent,
  Card as MuiCard,
  Paper as MuiPaper,
  Typography,
  TextField
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);

const Paper = styled(MuiPaper)(spacing);

function DatePickers({ cardName, description, id, label, type, defaultValue, InputLabelProps }) {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {cardName}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {description}
        </Typography>
        <Paper mt={3}>
          <form noValidate>
            <TextField
              id={id}
              label={label}
              type={type}
              defaultValue={defaultValue}
              InputLabelProps={InputLabelProps}
            />
          </form>
        </Paper>
      </CardContent>
    </Card>
  );
}


export default DatePickers;
