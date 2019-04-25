import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { sendAllProductTest } from '../../services/ApiCall';
import history from '../../services/History';
import { PopulateProductsList } from "../../actions";
import { Link } from 'react-router-dom'

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
    counter += 1;
    return { id: counter, name, calories, fat, carbs, protein };
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Product Name' },
    { id: 'origin', numeric: true, disablePadding: false, label: 'Origin' },
    { id: 'availability', numeric: true, disablePadding: false, label: 'Availability' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
    { id: 'expiryDate', numeric: true, disablePadding: true, label: 'Expire Date' },
    { id: 'AddToCart', numeric: true, disablePadding: true, label: 'Add To Cart' },
];


const EnhancedTableHeadStyles = theme => ({
    headtable: {
        backgroundColor: '#A2AACB',

    },
    headRow: {
        color: 'white',
        fontSize: 15,
    }

});

class EnhancedTableHead extends React.Component {



    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };



    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
        const { classes } = this.props;

        return (
            <TableHead className={classes.headtable}>
                <TableRow>
                    {/* <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell> */}
                    {rows.map(

                        row => (
                            <TableCell

                                className={classes.headRow}
                                key={row.id}
                                align={row.numeric ? 'right' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip

                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel

                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this,
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
};


EnhancedTableHead = withStyles(EnhancedTableHeadStyles)(EnhancedTableHead);


// ###############################################################################################################

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const { numSelected, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
          </Typography>
                ) : (
                        <Typography variant="h6" id="tableTitle">
                            Products
          </Typography>
                    )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
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

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);




// ###############################################################################################################



const styles = theme => ({
    root: {
        width: '100%',
        // marginTop: theme.spacing.unit * 3,
        border: '1px solid black',
    },
    table: {
        width: '100%',
        // marginLeft: 10,
        // marginRight: 20,
        // margin: 10,

    },
    tableWrapper: {
        overflowX: 'auto',
        marginRight: 10,
        marginLeft: 10,

    },
    row: {
        '&:nth-of-type(odd)': {
            //   backgroundColor: theme.palette.background.default,
            backgroundColor: '#DCE2F7',
        }
    },
    leftcell: {
        paddingLeft: 2,
    },
    rightcell: {
        paddingRight: 3,
    },
    fab: {
        height: 24,
        width: 35,
    },
});

class EnhancedTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            page: 0,
            rowsPerPage: 5,
            id: [this.props.products.id],
            arrayAvailability: [this.props.products.availability],
            arrayLocation: [this.props.products.origin],
            producer: [],
            price: [this.props.products.price],
            min: [],
            max: [],
            arrayNames: [this.props.products.productsList.name],
            expireDate: [this.props.products.productsList.expiryDate],
            checkedAvailability: true,
            product: {
                name: '',
            },
            producerToSend: '',
            minToSend: '',
            maxToSend: '',
            nameToSend: '',
            expireDateToSend: '',
            locationToSend: '',
        }
    };






    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        debugger;
        if (event.target.checked) {
            this.setState(state => ({ selected: this.props.products.productsList.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        debugger;
        const { selected } = this.state;
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
        this.setState({ selected: newSelected });
        console.log(selected);
    };


    // handleClickRow = (event, id) => {
    //     console.log('clicked');
    //     console.log(event);
    //     console.log(id);
    //     debugger;
    // };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;


    // componentDidMount() {
    //     // debugger;
    //     this.listOfProducts();
    // }

    listOfProducts() {
        if (this.state.arrayNames.length === 1) {
            // debugger;
            let name = this.state.nameToSend;
            let producer = this.state.producerToSend;
            let location = this.state.locationToSend;
            let expireDate = this.state.expireDateToSend;
            console.log({ expireDate });
            let min = this.state.minToSend;
            let max = this.state.maxToSend;
            let availability = this.state.checkedAvailability;
            console.log({ availability });
            sendAllProductTest(name, producer, location, expireDate, min, max, availability, this.success, this.error);
        }
    }

    success = async (response) => {
        if (response.status === 200) {
            // debugger;
            let productsList = await response.json();
            console.log("products =", productsList);
            this.props.PopulateProductsList(productsList);
            console.log("hey")
            console.log(this.props.products);
            // debugger;
            history.push('/product');
        }
    }



    error() {

    }

    goToProductPage = (id) => {
        this.props.push(`/products/${id}`);
        //this.props.push("/products/:id");
    }


    render() {
        const { classes } = this.props;
        const { order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.products.productsList.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead

                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={this.props.products.productsList.length}
                        />
                        <TableBody>
                            {stableSort(this.props.products.productsList, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            className={classes.row}
                                            hover
                                            //onClick={event => this.handleClick(event, n.id)}
                                            // onClick={event => this.handleClickRow(event, n.id)}
                                            // role="checkbox"
                                            //onClick =  {event => this.handleClickLink(event, n.id)}
                                            onClick = {() => this.goToProductPage(n.id)}
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            {/* <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell> */}
                                            <TableCell component="th" scope="row" padding="none" className={classes.leftcell}>
                                                {n.name}
                                            </TableCell>
                                            <TableCell align="right">{n.origin}</TableCell>
                                            <TableCell align="right">{n.availability}</TableCell>
                                            <TableCell align="right">{n.price}</TableCell>
                                            <TableCell align="right" padding="none" className={classes.rightcell}>
                                                {n.expiryDate}
                                            </TableCell>
                                            <TableCell align="right" padding="none">
                                                <Fab aria-label="Add" className={classes.fab}><AddIcon /></Fab>
                                            </TableCell>
                                            

                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>

                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={this.props.products.productsList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ products }) => {
    return {
        products
    }
}

export default connect(mapStateToProps, { PopulateProductsList })(withStyles(styles)(EnhancedTable));