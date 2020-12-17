import React from "react";
import styled from "styled-components";

import {
    Button as MuiButton,
    FormControl as MuiFormControl,
    FormHelperText,
    Menu,
    MenuItem, Select as MuiSelect
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import {formattedToday} from "../../utils/helpfunctions";

const Button = styled(MuiButton)(spacing);

const FormControlSpacing = styled(MuiFormControl)(spacing);

const FormControl = styled(FormControlSpacing)`
  min-width: 148px;
`;

const Select = styled(MuiSelect)(spacing);

function Actions (props) {

    return (
      <React.Fragment>
        <FormControl mr={4}>
              <Select
                  name={props.selectName}
                  value={props.account}
                  onChange={props.accountChanged}
                  displayEmpty
              >
                  <MenuItem value="" disabled>
                      Accounts
                  </MenuItem>
                  <MenuItem value={"Account1"}>Account1</MenuItem>
                  <MenuItem value={"Account2"}>Account2</MenuItem>
                  <MenuItem value={"Account3"}>Account3</MenuItem>
              </Select>
              <FormHelperText>Select an Account</FormHelperText>
          </FormControl>

        <Button
          variant="contained"
          size="small"
          color="secondary"
          aria-owns={props.anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={props.dateClicked}
        >
          Today: {formattedToday("Month dd")}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={props.anchorEl}
          open={Boolean(props.anchorEl)}
          onClose={props.dateClosed}
        >
          <MenuItem onClick={props.dateClosed}>Today</MenuItem>
          <MenuItem onClick={props.dateClosed}>Yesterday</MenuItem>
          <MenuItem onClick={props.dateClosed}>Last 7 days</MenuItem>
          <MenuItem onClick={props.dateClosed}>Last 30 days</MenuItem>
          <MenuItem onClick={props.dateClosed}>This month</MenuItem>
          <MenuItem onClick={props.dateClosed}>Last month</MenuItem>
          <MenuItem onClick={props.dateClosed}>This Year</MenuItem>

        </Menu>
      </React.Fragment>
    );
}

export default Actions;
