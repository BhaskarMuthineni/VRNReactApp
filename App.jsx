import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Hidden from 'material-ui/Hidden';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import SearchIcon from 'material-ui-icons/Search';
import Select from 'material-ui/Select';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import Tabs, { Tab } from 'material-ui/Tabs';

const drawerWidth = 290;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  masterAppBar: {
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      width: `calc(${drawerWidth}px)`,
    },
  },
  detailAppBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  button: {
    margin: theme.spacing.unit,
    position: 'absolute',
    right: '10px',
    bottom: '10px'
  },
  search: {
      position: 'absolute',
      right: '15px'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mobileOpen: false,
        };
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    }

    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <Master classes={classes} theme={theme} handleDrawerToggle={this.handleDrawerToggle} mobileOpen={this.state.mobileOpen}/>
                <Detail classes={classes} theme={theme} handleDrawerToggle={this.handleDrawerToggle}/>
            </div>
        );        
    }
}

class Master extends React.Component {    
    render() {
        const { classes, theme } = this.props;

        const drawer = (
            <div>
                <AppBar className={classes.masterAppBar}>
                <Toolbar>                    
                    <Typography variant="title" color="inherit" noWrap>
                        VRN List
                    </Typography>
                    <SearchIcon className={classes.search}/>
                </Toolbar>
                </AppBar>
                <List component="nav">
                    <ListItem button>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />                    
                    </ListItem>
                    <Divider />
                </List>
                <Button variant="fab" color="primary" aria-label="add" className={classes.button}>
                    <AddIcon />
                </Button>
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

class Detail extends React.Component {
    render() {
        const { classes, theme } = this.props;
        this.props.value = 0;

        return (
            <div style={{ width: '100%' }}>
                <AppBar className={classes.detailAppBar}>
                <Toolbar>
                    <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={this.props.handleDrawerToggle}
                    className={classes.navIconHide}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" noWrap>
                        VRN Check-In
                    </Typography>
                </Toolbar>
                </AppBar>
                <main className={classes.content}>
                <div className={classes.toolbar} />
                <FormControl className={classes.formControl} style={{ width: '100%'}}>
                    <InputLabel htmlFor="age-simple">Mode of Transport</InputLabel>
                    <Select value={'CA'}>
                        <MenuItem value={'CA'}>Courier Air</MenuItem>
                        <MenuItem value={'CR'}>Courier Road</MenuItem>
                        <MenuItem value={'HD'}>Hand Delivered</MenuItem>
                        <MenuItem value={'RB'}>Road Bike</MenuItem>
                        <MenuItem value={'RD'}>Road Truck</MenuItem>
                    </Select>
                </FormControl>
                <Tabs value={this.props.value} onChange={this.props.value = 1}>
                    <Tab label="Arrival" />
                    <Tab label="Departure" />
                </Tabs>
                </main>
            </div>
        );        
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
  
export default withStyles(styles, { withTheme: true })(App);