import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import Dialog from 'material-ui/Dialog';
import Master from '../master/Master.jsx';
import Detail from '../detail/Detail.jsx';
import Create from '../create/Create.jsx';

const APIUrl = "http://" + window.location.hostname + ":5000/";

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
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
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
      display: 'block'
  },
  progress: {
    margin: theme.spacing.unit * 2,
    position: 'absolute',
    left: "500px",
    top: "200px",
    textAlign: 'center',
    zIndex: 1000,
    opacity: 1
  },
  busyDialog: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  dialog: {
    width: '80%',
    maxHeight: 435,
  },
  checkInIcon:{
    position: 'absolute',
    right: '5px',
    top: '5px',
    width: '20px',
    height: '20px',
    fontSize: '20px'
  }
});

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            mobileOpen: false,
            tabValue : 0,
            masterData: [],
            detailData: [],
            isLoading: false,
            error: null,
            expanded: null,
            controlsVisibility : {
              vehStat 	  : { RD: true,  RB: false, HD: false,  CR: false, CA: false },
              vehNo 	    : { RD: true,  RB: true,  HD: false,  CR: true,  CA: true  },
              fleetType   : { RD: true,  RB: true,  HD: false,  CR: true,  CA: true  },
              transName   : { RD: true,  RB: true,  HD: false,  CR: true,  CA: true  },
              sealCond 	  : { RD: true,  RB: false, HD: false,  CR: false, CA: false },
              seal1 	    : { RD: true,  RB: false, HD: false,  CR: false, CA: false },
              seal2 	    : { RD: true,  RB: false, HD: false,  CR: false, CA: false },
              licNo 	    : { RD: true,  RB: true,  HD: false,  CR: true,  CA: true  },
              mobNo 	    : { RD: true,  RB: true,  HD: true,   CR: true,  CA: true  },
              personName  : { RD: true,  RB: true,  HD: true,   CR: true,  CA: true  },
              noOfBoxes   : { RD: true,  RB: false, HD: false,  CR: false, CA: false },
              lrNo 		    : { RD: true,  RB: false, HD: false,  CR: true,  CA: true },
              idProof 	  : { RD: false, RB: false, HD: true,   CR: false, CA: false },
              outVehStat 	: { RD: true,  RB: true,  HD: false,  CR: true,  CA: true },  
              outSealCond : { RD: true,  RB: false, HD: false,  CR: false, CA: false },
              outNoOfBoxes: { RD: true,  RB: true,  HD: true,   CR: true,  CA: true },
              podRemarks  : { RD: true,  RB: true,  HD: true,   CR: true,  CA: true }
            },
            outVehStatus: "",
            noOfBoxes: "",
            sealCond: "",
            podRemarks: "",
            messageDialogOpen: false,
            messageDialogValue: "",
            snackBarOpen: false,
            snackBarMessage: ""
        };

        this.handleAPICall = this.handleAPICall.bind(this);
        this.handleLoading = this.handleLoading.bind(this);
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.updateDetailData = this.updateDetailData.bind(this);
        this.handleExpPanelChange = this.handleExpPanelChange.bind(this);
        this.handleOutVehStat = this.handleOutVehStat.bind(this);
        this.handleNoOfBoxes = this.handleNoOfBoxes.bind(this);
        this.handleSealCond = this.handleSealCond.bind(this);
        this.handlePODRemarks = this.handlePODRemarks.bind(this);
        this.handleMsgDlgOpen = this.handleMsgDlgOpen.bind(this);
        this.handleMsgDlgValue = this.handleMsgDlgValue.bind(this);
        this.handleSnkBarOpen = this.handleSnkBarOpen.bind(this);
        this.handleSnkBarMsg = this.handleSnkBarMsg.bind(this);
    }

    handleAPICall(path, method, fnResponse, data){
      var payload = JSON.stringify(data);
      fetch(APIUrl + path, {
            method: method,
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            body: payload
        })
        .then(response => {
          if(response.ok) {
            return response.json(); 
          }
          else{
            throw new Error("Something went wrong ...");
          }
        })
        .then(fnResponse)
        .catch(error => this.setState({error, isLoading: false}));
    }

    handleLoading(load) {
      this.setState({ isLoading: load });
    }

    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    handleTabChange(event, value) {
        this.setState({ tabValue: value });
    }

    updateDetailData(data) {
        this.setState({ detailData: data });
    }

    handleExpPanelChange(panel){
      var that = this;
        return function(event, expanded) {
          that.setState({ expanded : expanded ?  panel : false });
      }
    }

    handleOutVehStat(event, value) {
      this.setState({
        outVehStatus: value        
      });
      if(value === "E") {
        this.setState({
          noOfBoxes: "",
          sealCond: ""
        });
      }
    }

    handleNoOfBoxes(event, value) {
      this.setState({ noOfBoxes: value});
    }

    handleSealCond(event, value) {
      this.setState({ sealCond: value});
    }

    handlePODRemarks(event, value) {
      this.setState({ podRemarks: value });
    }

    handleMsgDlgOpen(open) {
      this.setState({ messageDialogOpen: open });
    }

    handleMsgDlgValue(value) {
      this.setState({ messageDialogValue: value });
    }

    handleSnkBarOpen(open){
      this.setState({ snackBarOpen: open });
    }

    handleSnkBarMsg(value){
      this.setState({ snackBarMessage: value });
    }

    render() {
        const { classes, theme } = this.props;
        const { isLoading, error } = this.state;

        if(error) {
          return (
            <p>{error.message}</p>
          );
        }

        if(isLoading){
        return (
          // <Dialog className={classes.busyDialog} open={isLoading}>
            <CircularProgress className={classes.progress} size={100} thickness={4} />
          // </Dialog>
        );
        }

        return (          
            <Router>
                <div className={classes.root}>
                  <Route 
                  exact 
                  path='' 
                  render={
                      (props) => <Master 
                                  classes={classes} 
                                  theme={theme}
                                  isLoading={this.state.isLoading}
                                  error={this.state.error}
                                  handleAPICall={this.handleAPICall}
                                  handleLoading={this.handleLoading}
                                  handleDrawerToggle={this.handleDrawerToggle} 
                                  mobileOpen={this.state.mobileOpen} 
                                  masterData={this.state.masterData} 
                                  updateDetailData={this.updateDetailData}
                                  handleTabChange={this.handleTabChange}
                                  handleExpPanelChange={this.handleExpPanelChange}
                                  {...props} />} />
                  <Route 
                  exact 
                  path='/detail/:id' 
                  render={
                      (props) => <Detail 
                                  classes={classes} 
                                  theme={theme}
                                  isLoading={this.state.isLoading}
                                  error={this.state.error}
                                  handleAPICall={this.handleAPICall}
                                  handleLoading={this.handleLoading}
                                  handleDrawerToggle={this.handleDrawerToggle} 
                                  tabValue={this.state.tabValue} 
                                  handleTabChange={this.handleTabChange} 
                                  masterData={this.state.masterData} 
                                  detailData={this.state.detailData} 
                                  updateDetailData={this.updateDetailData}
                                  expanded={this.state.expanded} 
                                  handleExpPanelChange={this.handleExpPanelChange} 
                                  controlsVisibility={this.state.controlsVisibility} 
                                  outVehStatus={this.state.outVehStatus}
                                  handleOutVehStat={this.handleOutVehStat}
                                  noOfBoxes={this.state.noOfBoxes}                                  
                                  handleNoOfBoxes={this.handleNoOfBoxes}
                                  sealCond={this.state.sealCond}
                                  handleSealCond={this.handleSealCond}
                                  podRemarks={this.state.podRemarks}
                                  handlePODRemarks={this.handlePODRemarks}
                                  messageDialogOpen={this.state.messageDialogOpen}
                                  handleMsgDlgOpen={this.handleMsgDlgOpen}
                                  messageDialogValue={this.state.messageDialogValue}
                                  handleMsgDlgValue={this.handleMsgDlgValue}
                                  snackBarOpen={this.state.snackBarOpen}
                                  handleSnkBarOpen={this.handleSnkBarOpen}
                                  snackBarMessage={this.state.snackBarMessage}
                                  handleSnkBarMsg={this.handleSnkBarMsg}
                                  {...props} />} />
                  <Route exact path='/create' component={Create} />                    
                </div>
            </Router>
        );        
    }

    componentDidMount() {
      let that = this;
      this.handleLoading(true);      
      var fnResponse = function(data){
        that.setState({masterData: data.sort(function(a, b){return b.VRN - a.VRN})});
        that.handleLoading(false);
      }
      let path = "VRNMaster";
      this.handleAPICall(path, "GET", fnResponse);
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
  
export default (withStyles(styles, { withTheme: true }))(App);