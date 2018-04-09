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
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import Tabs, { Tab } from 'material-ui/Tabs';
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
  } from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import TextField from 'material-ui/TextField';
import Radio, { RadioGroup } from 'material-ui/Radio';

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
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  group: {
      margin: `${theme.spacing.unit}px 0`,
  }
});

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mobileOpen: false,
            tabValue : 0
        };
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    handleTabChange(event, value) {
        this.setState({ tabValue: value });
    }

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <Master classes={classes} theme={theme} handleDrawerToggle={this.handleDrawerToggle} mobileOpen={this.state.mobileOpen}/>
                <Detail classes={classes} theme={theme} handleDrawerToggle={this.handleDrawerToggle} tabValue={this.state.tabValue} handleTabChange={this.handleTabChange}/>
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
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">Mode of Transport</InputLabel>
                    <Select value={'CA'}>
                        <MenuItem value={'CA'}>Courier Air</MenuItem>
                        <MenuItem value={'CR'}>Courier Road</MenuItem>
                        <MenuItem value={'HD'}>Hand Delivered</MenuItem>
                        <MenuItem value={'RB'}>Road Bike</MenuItem>
                        <MenuItem value={'RD'}>Road Truck</MenuItem>
                    </Select>
                </FormControl>
                <AppBar position="static">
                    <Tabs value={this.props.tabValue} onChange={this.props.handleTabChange}>
                        <Tab label="Arrival">                        
                        </Tab>
                        <Tab label="Departure" />
                    </Tabs>
                </AppBar>
                {
                    this.props.tabValue === 0 &&
                    <div>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>Vehicle</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <form className={classes.container} noValidate autoComplete="off">                                    
                                    <TextField
                                    id="name"
                                    label="Vehicle Status"
                                    className={classes.textField}
                                    value="Loaded"                                    
                                    margin="normal"
                                    />
                                    <TextField
                                    id="name"
                                    label="Vehicle No."
                                    className={classes.textField}
                                    value="MH01R1234"                                    
                                    margin="normal"
                                    />
                                    <TextField
                                    id="name"
                                    label="Fleet Type"
                                    className={classes.textField}
                                    value="Market Vehicle"                                    
                                    margin="normal"
                                    />
                                    <TextField
                                    id="name"
                                    label="Transporter/Agency Name"
                                    className={classes.textField}
                                    value="Test Vendor"                                    
                                    margin="normal"
                                    />
                                    <TextField
                                    id="name"
                                    label="Seal Condition"
                                    className={classes.textField}
                                    value="Intact"                                    
                                    margin="normal"
                                    />
                                    <TextField
                                    id="name"
                                    label="Seal No. 1"
                                    className={classes.textField}
                                    value="1123"                                    
                                    margin="normal"
                                    />
                                    <TextField
                                    id="name"
                                    label="Seal No. 2"
                                    className={classes.textField}
                                    value="123"                                    
                                    margin="normal"
                                    />
                                    <TextField
                                    id="name"
                                    label="No. of Boxes"
                                    className={classes.textField}
                                    value="10"                                    
                                    margin="normal"
                                    />
                                </form>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Driver</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <form className={classes.container} noValidate autoComplete="off">                                    
                                    <TextField
                                    id="name"
                                    label="Driver License No."
                                    className={classes.textField}
                                    value="LIC1234"                                    
                                    margin="normal"
                                    />
                                    <TextField
                                    id="name"
                                    label="Mobile No."
                                    className={classes.textField}
                                    value="987654"                                    
                                    margin="normal"
                                    />
                                    <TextField
                                    id="name"
                                    label="Driver/Pickup Person Name"
                                    className={classes.textField}
                                    value="RAM"                                    
                                    margin="normal"
                                    />
                                </form>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>Remarks</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <form className={classes.container} noValidate autoComplete="off">                                    
                                    <TextField
                                    id="name"
                                    label="AWB No./Docker No./LR No."
                                    className={classes.textField}
                                    value="asdf"                                    
                                    margin="normal"
                                    />
                                    <TextField
                                    id="name"
                                    label="In Remarks"
                                    className={classes.textField}
                                    value="asdf"                                    
                                    margin="normal"
                                    />                                    
                                </form>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                }
                {
                    this.props.tabValue === 1 &&
                    <div>
                        <form className={classes.container} noValidate autoComplete="off">
                            <FormControl component="fieldset" required className={classes.formControl}>
                                <RadioGroup aria-label="Vehicle Status" name="VehStat" className={classes.group} value="L">
                                    <FormControlLabel value="L" control={<Radio />} label="Loaded"/>
                                    <FormControlLabel value="E" control={<Radio />} label="Empty"/>
                                </RadioGroup>
                            </FormControl>
                            <TextField
                            id="name"
                            label="No. of Boxes"
                            className={classes.textField}
                            value="asdf"                                    
                            margin="normal"
                            />
                            <FormControl component="fieldset" required className={classes.formControl}>
                                <RadioGroup aria-label="Seal Condition" name="SealCond" className={classes.group} value="I">
                                    <FormControlLabel value="I" control={<Radio />} label="Intact"/>
                                    <FormControlLabel value="D" control={<Radio />} label="Damaged"/>
                                    <FormControlLabel value="N" control={<Radio />} label="No Seal"/>
                                </RadioGroup>
                            </FormControl>
                            <TextField
                            id="name"
                            label="POD/Out Remarks"
                            className={classes.textField}
                            value="asdf"                                    
                            margin="normal"
                            />                                    
                        </form>
                    </div>
                }
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