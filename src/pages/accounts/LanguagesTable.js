import React from "react";
import styled, { withTheme } from "styled-components";

import {
  Card as MuiCard,
  CardHeader,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  LinearProgress as MuiLinearProgress
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { MoreVertical } from "react-feather";

const Card = styled(MuiCard)(spacing);

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${props => props.theme.spacing(12)}px);
`;

const LinearProgress = styled(MuiLinearProgress)`
  height: 14px;
  width: 180px;
  border-radius: 3px;
  background: ${props => props.theme.palette.grey[200]};
`;

function LanguagesTable() {
  return (
    <Card mb={3}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertical />
          </IconButton>
        }
        title="Top Tickers"
      />
      <Paper>
        <TableWrapper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  Ticker
                </TableCell>
                <TableCell align="right">Profit</TableCell>
                <TableCell>% of Total Profit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell scope="row">MSFT</TableCell>
                <TableCell align="right">865</TableCell>
                <TableCell>
                  <LinearProgress
                    variant="determinate"
                    value={75}
                    color="secondary"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">AMAZN</TableCell>
                <TableCell align="right">240</TableCell>
                <TableCell>
                  <LinearProgress
                    variant="determinate"
                    value={65}
                    color="secondary"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">TSLA</TableCell>
                <TableCell align="right">220</TableCell>
                <TableCell>
                  <LinearProgress
                    variant="determinate"
                    value={50}
                    color="secondary"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">CRWD</TableCell>
                <TableCell align="right">162</TableCell>
                <TableCell>
                  <LinearProgress
                    variant="determinate"
                    value={30}
                    color="secondary"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">ZS</TableCell>
                <TableCell align="right">86</TableCell>
                <TableCell>
                  <LinearProgress
                    variant="determinate"
                    value={15}
                    color="secondary"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">AMD</TableCell>
                <TableCell align="right">32</TableCell>
                <TableCell>
                  <LinearProgress
                    variant="determinate"
                    value={5}
                    color="secondary"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableWrapper>
      </Paper>
    </Card>
  );
}

export default withTheme(LanguagesTable);
