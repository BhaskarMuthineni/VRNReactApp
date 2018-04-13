import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import Dialog from 'material-ui/Dialog';
import Master from '../master/Master.jsx';
import Detail from '../detail/Detail.jsx';
import Create from '../create/Create.jsx';

const API = "http://localhost:5000/VRNMaster";

const drawerWidth = 300;

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
    width: '100%'
  },
  group: {
      margin: `${theme.spacing.unit}px 0`,
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  dialog: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  }
});

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            mobileOpen: false,
            tabValue : 0,
            masterData: [],
            isLoading: false,
            error: null
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
        const loader = this.state.isLoading;
        const error = this.state.error;

        if(error) {
          return (
            <p>{error.message}</p>
          );
        }

        if(loader){
        return (
          <Dialog className={classes.dialog} open={loader}>
            <CircularProgress className={classes.progress} size={100} thickness={4} />
          </Dialog>
        );
        }

        return (
            // <Router>
                <div className={classes.root}>
                  <Master classes={classes} theme={theme} handleDrawerToggle={this.handleDrawerToggle} mobileOpen={this.state.mobileOpen} masterData={this.state.masterData} />
                  <Detail classes={classes} theme={theme} handleDrawerToggle={this.handleDrawerToggle} tabValue={this.state.tabValue} handleTabChange={this.handleTabChange} />
                    {/* <Switch>
                      <Route exact path='/' component={Master} />
                      <Route exact path='/detail/:id' component={Detail} />
                        {/* <Route exact path='/' render={(props) => <Master classes={classes} theme={theme} handleDrawerToggle={this.handleDrawerToggle} mobileOpen={this.state.mobileOpen} masterData={this.state.masterData} {...props} />} />
                        <Route exact path='/detail/:id' render={(props) => <Detail classes={classes} theme={theme} handleDrawerToggle={this.handleDrawerToggle} tabValue={this.state.tabValue} handleTabChange={this.handleTabChange} masterData={this.state.masterData} {...props} />} />
                        <Route exact path='/create' render={(props) => <Create />} />
                    </Switch> */}
                </div>
            // </Router>
        );        
    }

    componentDidMount() {
      this.setState({ isLoading: true });
      fetch(API)
        .then(response => {
          if(response.ok) {
            return response.json(); 
          }
          else{
            throw new Error("Something went wrong ...");
          }
        })
        .then(data => this.setState({masterData: data.sort(function(a, b){return b.VRN - a.VRN}), isLoading: false}))
        .catch(error => this.setState({error, isLoading: false}));
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
  
export default withStyles(styles, { withTheme: true })(App);