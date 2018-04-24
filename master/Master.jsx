import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Hidden from 'material-ui/Hidden';
import LocalShippingIcon from 'material-ui-icons/LocalShipping';
import FlightIcon from 'material-ui-icons/Flight';
import LocalTaxiIcon from 'material-ui-icons/LocalTaxi';
import DirectionsWalkIcon from 'material-ui-icons/DirectionsWalk';
import DirectionsBikeIcon from 'material-ui-icons/DirectionsBike';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import SearchIcon from 'material-ui-icons/Search';
import { Link } from 'react-router-dom';
import CheckCircleIcon from 'material-ui-icons/CheckCircle';
import TextField from 'material-ui/TextField';

class Master extends Component {
    constructor(props) {
        super(props);
        this.handleListItemClick = this.handleListItemClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchText = this.handleSearchText.bind(this);
    }

    handleListItemClick(vrn) {
        var that = this;
        return function(event){
            that.props.loadDetailData(vrn);
        }
    }

    handleSearchText(event) {
        var val = event.target.value.toLowerCase();
        this.props.updateSearchText(val);
        if(val === ""){
            this.props.handleMasterData(this.props.tempMasterData);
        }
        else{
            var data = this.props.masterData.filter(function(ele){
                return (ele.VRN.toString().toLowerCase().indexOf(val) > -1) || (ele.VEHICLENUM.toLowerCase().indexOf(val) > -1);
            });
            this.props.handleMasterData(data);
        }        
    }

    handleSearch() {
        const { search } = this.props;
        this.props.handleSearchVisible(!search);
    }

    render() {
        const { classes, theme } = this.props;

        const drawer = (
            <div>
                <AppBar className={classes.masterAppBar}>
                <Toolbar>
                {
                    !this.props.search &&
                    <Typography variant="title" color="inherit" noWrap>
                        VRN List
                    </Typography>
                }
                {
                    this.props.search &&
                    <TextField
                    id="search"
                    label="Search"
                    className={classes.textField}
                    value={this.props.searchText}
                    onChange={this.handleSearchText}
                    margin="normal"
                    />
                }
                    <Button variant="fab" mini color="primary" aria-label="search" onClick={this.handleSearch} className={classes.searchButton}>
                        <SearchIcon/>
                    </Button>
                </Toolbar>
                </AppBar>
                <List component="nav">
                    {
                        this.props.masterData.map((vrn, i) =>
                            <ListItem key={i} button divider onClick={this.handleListItemClick(vrn)}>
                                <ListItemIcon>
                                    { vrn.MODEOFTRANSPORT === "CA" ? <FlightIcon color="primary" /> : 
                                    (vrn.MODEOFTRANSPORT === "CR" ? <LocalTaxiIcon color="primary"/> : 
                                    (vrn.MODEOFTRANSPORT === "HD" ? <DirectionsWalkIcon color="primary"/> :
                                    (vrn.MODEOFTRANSPORT === "RB" ? <DirectionsBikeIcon color="primary"/> :
                                    (vrn.MODEOFTRANSPORT === "RD" ? <LocalShippingIcon color="primary"/> : <WarningIcon color="primary"/>)))) }
                                </ListItemIcon>
                                <ListItemText primary={"VRN No.: " + vrn.VRN} secondary={(vrn.MODEOFTRANSPORT === "HD") ? ("Driver Name: " + vrn.DRIVERNAME) : ("Vehicle No.: " + vrn.VEHICLENUM)} />
                                {
                                    vrn.VRNSTATUS === "C" &&
                                    <ListItemIcon className={classes.checkInIcon}>
                                        <CheckCircleIcon color="primary" />
                                    </ListItemIcon>
                                }
                            </ListItem>
                        )
                    }                    
                </List>
                <Link to={'/create'}>
                    <Button variant="fab" mini color="primary" aria-label="add" className={classes.button}>
                        <AddIcon />
                    </Button>
                </Link>
            </div>
          );

        return (
            <div>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.props.mobileOpen}
                        onClose={this.props.handleDrawerToggle}
                        classes={{
                        paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        open
                        classes={{
                        paper: classes.drawerPaper,
                        }}
                    >
                            {drawer}
                    </Drawer>
                </Hidden>
            </div>
        );        
    }    
}

export default Master;