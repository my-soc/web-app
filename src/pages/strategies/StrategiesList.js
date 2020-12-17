import React from "react";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

import Helmet from 'react-helmet';

import {
  Avatar as MuiAvatar,
  Box,
  Button,
  Checkbox,
  Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  IconButton,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography
} from "@material-ui/core";

import {green, red} from "@material-ui/core/colors";

import {
  Add as AddIcon,
  Archive as ArchiveIcon,
  FilterList as FilterListIcon,
  RemoveRedEye as RemoveRedEyeIcon
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Chip = styled(MuiChip)`
  ${spacing};

  background: ${props => props.winning && green[500]};
  background: ${props => props.losing && red[500]};
  color: ${props => (props.winning || props.losing) && props.theme.palette.common.white};
`

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
  min-width: 150px;
`;

const Avatar = styled(MuiAvatar)`
  background: ${props => props.theme.palette.primary.main};
`;

const Customer = styled.div`
  display: flex;
  align-items: center;
`;

function createData(customer, customerEmail, customerAvatar, status, amount, id, date) {
  return { customer, customerEmail, customerAvatar, status, amount, id, date };
}

const rows = [
  createData('Falling Angel', 'Tags:', 'F', 1, "$0","000113",'2020-02-13'),
  createData('Opening Range Breakout', 'Tags:', 'D', 1, '$209,00', "000114", '2020-02-13'),
  createData('VWAP Reversal', 'Tags:', 'E', 2, '$535,00', "000117", '2020-03-04'),
  createData('Bull Flag', 'Tags:', 'E', 2, '$678,00', "000115", '2020-02-17'),
  createData('ADCB', 'Tags:', 'G', 0, '$314,00', "000119", '2020-03-28'),
  createData('Arbitrage Opportunities', 'Tags:', 'J', 0, '$864,00', "000113", '2020-01-23'),
  createData('Index Fund Rebalancing', 'Tags:', 'L', 2, '$341,00', "000118", '2020-03-14'),
  createData('Percentage of Volume', 'Tags:', 'M', 1, '$781,00', "000116", '2020-02-22'),
  createData('Trading Range', 'Tags:', 'M', 0, '$273,00', "000121", '2020-05-31'),
  createData('Swing Trading ', 'Tags:', 'S', 0, '$713,00', "000120", '2020-04-25')
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'strategy', alignment: 'left', label: 'Strategy' },
  { id: 'performance', alignment: 'left', label: 'Performance' },
  { id: 'id', alignment: 'right', label: 'ID' },
  { id: 'profit/loss', alignment: 'right', label: 'Profit/Loss' },
  { id: 'lastrun', alignment: 'left', label: 'Last Run' },
  { id: 'actions', alignment: 'right', label: 'Actions' },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

let EnhancedTableToolbar = props => {
  const { numSelected } = props;

  return (
    <Toolbar>
      <ToolbarTitle>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Strategies
          </Typography>
        )}
      </ToolbarTitle>
      <Spacer />
      <div>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <ArchiveIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('customer');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
  
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
  
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
      <Paper>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${row.id}-${index}`}
                      selected={isItemSelected}
                      >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={(event) => handleClick(event, row.id)}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row">
                        <Customer>
                          <Avatar>
                            {row.customerAvatar}
                          </Avatar>
                          <Box ml={3}>
                            {row.customer}
                            <br />
                            {row.customerEmail}
                          </Box>
                        </Customer>
                      </TableCell>
                      <TableCell>
                        {row.status === 0 && <Chip size="small" mr={1} mb={1} label="winning" winning />}
                        {row.status === 1 && <Chip size="small" mr={1} mb={1} label="not tested" />}
                        {row.status === 2 && <Chip size="small" mr={1} mb={1} label="losing" losing />}
                      </TableCell>
                      <TableCell align="right">#{row.id}</TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell align="right">
                        <IconButton aria-label="delete">
                          <ArchiveIcon />
                        </IconButton>  
                        <IconButton aria-label="details" component={RouterLink} to="/strategies/builder">
                          <RemoveRedEyeIcon />
                        </IconButton>  
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

function StrategiesList() {
  return (
    <React.Fragment>
      <Helmet title="Strategies" />

      <Grid
        justify="space-between"
        container 
        spacing={24}
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Strategies
          </Typography>

        </Grid>
        <Grid item>
          <div>
            <Button variant="contained" color="primary">
              <AddIcon />
              New Strategy
            </Button>
          </div>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default StrategiesList;
