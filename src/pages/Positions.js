import React from "react";
import styled from "styled-components";

import Helmet from 'react-helmet';

import {
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

import { green, orange, red } from "@material-ui/core/colors";

import {
  Add as AddIcon,
  Archive as ArchiveIcon,
  FilterList as FilterListIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const Divider = styled(MuiDivider)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Chip = styled(MuiChip)`
  ${spacing};

  background: ${props => props.shipped && green[500]};
  background: ${props => props.processing && orange[700]};
  background: ${props => props.cancelled && red[500]};
  color: ${props => props.theme.palette.common.white};
`

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
  min-width: 150px;
`;

function createData(id, product, date, total, status, method) {
  return { id, product, date, total, status, method };
}

const rows = [
  createData('000253', 'MSFT', '2020-01-02', '$3002,00', 0, '1000'),
  createData('000254', 'ZS', '2020-01-04', '$1300,00', 0, '1000'),
  createData('000255', 'AAPL', '2020-01-04', '$8000,00', 2, '1000'),
  createData('000256', 'TSLA', '2020-01-08', '$4005,00', 0, '1000'),
  createData('000257', 'AMZN', '2020-01-09', '$4330,00', 0, '1000'),
  createData('000258', 'QQQ', '2020-01-14', '$1335,00', 0, '1000'),
  createData('000259', 'PBW', '2020-01-16', '$2225,00', 1, '1000'),
  createData('000260', 'FSLY', '2020-01-22', '$2550,00', 0, '1000'),
  createData('000261', 'CRM', '2020-01-22', '$6435,00', 2, '1000'),
  createData('000262', 'SQ', '2020-01-23', '$2410,00', 0, '1000'),
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
  { id: 'id', alignment: 'right', label: 'Position ID' },
  { id: 'product', alignment: 'left', label: 'Ticker' },
  { id: 'date', alignment: 'left', label: 'Date' },
  { id: 'total', alignment: 'right', label: 'Total' },
  { id: 'status', alignment: 'left', label: 'Status' },
  { id: 'method', alignment: 'left', label: 'Number of Stocks' },
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
            Positions
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
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

                      <TableCell align="right">#{row.id}</TableCell>
                      <TableCell align="left">{row.product}</TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="right">{row.total}</TableCell>
                      <TableCell>
                        {row.status === 0 && <Chip size="small" mr={1} mb={1} label="Winning" shipped />}
                        {row.status === 1 && <Chip size="small" mr={1} mb={1} label="Flat" processing />}
                        {row.status === 2 && <Chip size="small" mr={1} mb={1} label="Losing" cancelled />}
                      </TableCell>
                      <TableCell align="left">{row.method}</TableCell>
                      <TableCell padding="none" align="right">
                        <Box mr={2}>
                          <IconButton aria-label="delete">
                            <CancelIcon />
                          </IconButton>  
                          <IconButton aria-label="details">
                            <EditIcon />
                          </IconButton>  
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={8} />
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

function OrderList() {
  return (
    <React.Fragment>
      <Helmet title="Positions" />

      <Grid
        justify="space-between"
        container 
        spacing={24}
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
          Positions
          </Typography>

        </Grid>
        <Grid item>
          <div>
            <Button variant="contained" color="primary">
              <AddIcon />
              New Position
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

export default OrderList;
