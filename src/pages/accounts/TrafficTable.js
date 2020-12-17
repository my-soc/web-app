import React from "react";
import styled from "styled-components";

import {
  Card as MuiCard,
  CardHeader,
  Chip as MuiChip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

import { red, green } from "@material-ui/core/colors";

import { spacing } from "@material-ui/system";

import { MoreVertical } from "react-feather";

const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${props => props.rgbcolor};
  color: ${props => props.theme.palette.common.white};
`;

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${props => props.theme.spacing(12)}px);
`;

// Data
let id = 0;
function createData(ticker, stocks, totalValue, bounce, profit) {
  id += 1;
  return { id, ticker, stocks, totalValue, bounce, profit };
}

const rows = [
  createData(
    "MSFT",
    "1023",
    "1265",
    <Chip label="30%" rgbcolor={green[500]} />,
    "100"
  ),
  createData(
    "AMZN",
    "872",
    "1077",
    <Chip label="63%" rgbcolor={red[500]} />,
      "100"
  ),
  createData(
    "MU",
    "812",
    "1003",
    <Chip label="28%" rgbcolor={green[500]} />,
      "100"
  ),
  createData(
    "CRM",
    "713",
    "881",
    <Chip label="22%" rgbcolor={green[500]} />,
      "100"
  ),
  createData(
    "QQQ",
    "693",
    "856",
    <Chip label="56%" rgbcolor={red[500]} />,
      "100"
  ),
  createData(
    "FSLY",
    "623",
    "770",
    <Chip label="20%" rgbcolor={green[500]} />,
      "100"
  )
];

const TrafficTable = () => (
  <Card mb={3}>
    <CardHeader
      action={
        <IconButton aria-label="settings">
          <MoreVertical />
        </IconButton>
      }
      title="Positions"
    />

    <Paper>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ticker</TableCell>
              <TableCell align="right">Stocks</TableCell>
              <TableCell align="right">Total Value</TableCell>
              <TableCell align="right">Bounce Rate</TableCell>
              <TableCell align="right">Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.ticker}>
                <TableCell component="th" scope="row">
                  {row.ticker}
                </TableCell>
                <TableCell align="right">{row.stocks}</TableCell>
                <TableCell align="right">{row.totalValue}</TableCell>
                <TableCell align="right">{row.bounce}</TableCell>
                <TableCell align="right">{row.profit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </Paper>
  </Card>
);

export default TrafficTable;
