import React, { Component } from 'react';
import { Router, Route, withRouter } from 'react-router-dom';//BrowserRouter as 
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Master from '../master/Master.jsx';
import Detail from '../detail/Detail.jsx';
import Create from '../create/Create.jsx';
import BusyDialog from '../dialog/BusyDialog.jsx';
import MessageDialog from '../dialog/MessageDialog.jsx';
import history from '../history';
import Snackbar from 'material-ui/Snackbar';

const APIUrl = "http://" + window.location.hostname + ":5000/";//"http://192.168.43.110:5000/";

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
  selectedItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
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
    height: "100%"
  },
  button: {
    margin: theme.spacing.unit,
    position: 'absolute',
    right: '10px',
    bottom: '10px'
  },
  stepperButton: {
    margin: theme.spacing.unit
  },
  searchButton: {
      position: 'absolute',
      right: '10px'
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
    // position: 'absolute',
    // left: "500px",
    // top: "200px",
    // textAlign: 'center',
    // zIndex: 1000,
    // opacity: 1
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
            tabValue: 0,
            tempMasterData: [],
            masterData: [],
            detailData: [],
            selectedIndex: 0,
            searchVisible: false,
            searchText: "",
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
            outNoOfBoxes: "",
            outSealCond: "",
            outPODRemarks: "",
            messageDialogOpen: false,
            messageDialogTitle: "",
            messageDialogValue: "",
            messageDialogButtons: [],
            snackBarOpen: false,
            snackBarMessage: "",            
            transportModes: [],
            activeStep: 0,
            modeOfTransport: "",            
            inVehStat: "",
            inVehNo: "",
            inFleetType: "",
            inTransporter: "",
            inSealCond: "",
            inSeal1: "",
            inSeal2: "",
            inNoOfBoxes: "",
            inLicNo: "",
            inMobNo: "",
            inDriverName: "",
            inProofType: "",
            inProofNo: "",
            inLRNo: "",
            inRemarks: ""
        };

        this.handleMasterData = this.handleMasterData.bind(this);
        this.handleTempMasterData = this.handleTempMasterData.bind(this);
        this.handleSearchVisible = this.handleSearchVisible.bind(this);
        this.updateSearchText = this.updateSearchText.bind(this);
        this.handleAPICall = this.handleAPICall.bind(this);
        this.callBack = this.callBack.bind(this);
        this.loadMasterData = this.loadMasterData.bind(this);
        this.loadDetailData = this.loadDetailData.bind(this);
        this.updateSelectedIndex = this.updateSelectedIndex.bind(this);
        this.toggleLoader = this.toggleLoader.bind(this);
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.updateDetailData = this.updateDetailData.bind(this);
        this.handleExpPanelChange = this.handleExpPanelChange.bind(this);
        //Departure
        this.handleOutVehStat = this.handleOutVehStat.bind(this);
        this.handleOutNoOfBoxes = this.handleOutNoOfBoxes.bind(this);
        this.handleOutSealCond = this.handleOutSealCond.bind(this);
        this.handleOutPODRemarks = this.handleOutPODRemarks.bind(this);
        //Message Dialog
        this.handleMsgDlg = this.handleMsgDlg.bind(this);
        //Snackbar
        this.toggleSnackBar = this.toggleSnackBar.bind(this);
        //Create methods
        this.handleMOTChange = this.handleMOTChange.bind(this);
        this.handleTransportModes = this.handleTransportModes.bind(this);
        this.handleActiveStep = this.handleActiveStep.bind(this);
        this.handleStepperNext = this.handleStepperNext.bind(this);
        this.handleStepperBack = this.handleStepperBack.bind(this);

        this.handleInVehStat = this.handleInVehStat.bind(this);
        this.handleBlurInVehNo = this.handleBlurInVehNo.bind(this);        
        this.handleChangeInVehNo = this.handleChangeInVehNo.bind(this);
        this.handleInFleetType = this.handleInFleetType.bind(this);
        this.handleInTransporter = this.handleInTransporter.bind(this);
        this.handleInSealCond = this.handleInSealCond.bind(this);
        this.handleInSeal1 = this.handleInSeal1.bind(this);
        this.handleInSeal2 = this.handleInSeal2.bind(this);
        this.handleInNoOfBoxes = this.handleInNoOfBoxes.bind(this);
        this.handleInLicNo = this.handleInLicNo.bind(this);
        this.handleInMobNo = this.handleInMobNo.bind(this);
        this.handleInDriverName = this.handleInDriverName.bind(this);
        this.handleInProofType = this.handleInProofType.bind(this);
        this.handleInProofNo = this.handleInProofNo.bind(this);
        this.handleInLRNo = this.handleInLRNo.bind(this);
        this.handleInRemarks = this.handleInRemarks.bind(this);
    }

    handleMasterData(data) {
      this.setState({masterData: data});
    }

    handleTempMasterData(data) {
      this.setState({tempMasterData: data});
    }

    updateSelectedIndex(index) {
      this.setState({selectedIndex: index});
    }

    handleSearchVisible(visible) {
      this.setState({search: visible});
    }

    updateSearchText(value) {
      this.setState({searchText: value});
    }

    handleAPICall(path, method, fnResponse, data){
      var payload = JSON.stringify(data);
      this.toggleLoader();
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
        .catch(error => {
          this.setState({error, isLoading: false});
          var btns = [{
            text: 'Ok',
            event: () => this.handleMsgDlg()
          }]
          this.handleMsgDlg("Error", error.message, btns);
        })
    }

    loadMasterData(){
      let that = this;   
      var fnResponse = function(data){
        that.toggleLoader();
        if(Array.isArray(data)){
          if(data.length > 0){
            var sortedData = data.sort(function(a, b){return b.VRN - a.VRN});
            that.setState({masterData: sortedData, tempMasterData: sortedData});
            that.loadDetailData(sortedData[0]);
          }          
        }
        else if(typeof data === "object" && data.message !== undefined){
          var title = that.getTitle(data.msgCode);
          var msg = data.message;
          var btns = [{
              text: "Ok",
              event: () => that.handleMsgDlg()
          }];
          that.handleMsgDlg(title, msg, btns);          
        }        
      }
      let path = "VRNMaster";
      this.handleAPICall(path, "GET", fnResponse);
    }

    loadDetailData(vrn){
      var that = this;
      history.push("/detail/" + vrn.VRN);//for Routing to detail
      this.handleTabChange(null,0);//for initially setting Arrival tab visible
      var fnExpPanelChange = this.handleExpPanelChange((vrn.MODEOFTRANSPORT !== 'HD') ? 'panel1' : 'panel2');//for initially setting Vehicle panel visible
      fnExpPanelChange(null, true);//calling the returned function
      var fnDetailResponse = function(data){
          that.updateDetailData(data);
          that.toggleLoader();
      }
      let path = "VRNDetail/";
      this.handleAPICall(path + vrn.VRN, "GET", fnDetailResponse);
    }

    toggleLoader() {
      const { isLoading } = this.state;
      this.setState({ isLoading: !isLoading });
    }

    handleDrawerToggle() {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    handleTabChange(event, value) {
        this.setState({ tabValue: value });
    }

    updateDetailData(data) {
        this.setState({
          detailData: data, 
          outVehStatus: "",
          outNoOfBoxes: "",
          outSealCond: "",
          outPODRemarks: ""
        });
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
          outNoOfBoxes: "",
          outSealCond: ""
        });
      }
    }

    handleOutNoOfBoxes(event) {
      var val = event.target.value;
      if(val.length <= 6){
        if(/^[0-9]+$/.test(val)){
          this.setState({ outNoOfBoxes: event.target.value});
        }
        else{
          this.setState({ outNoOfBoxes: ""});
        }
      }      
    }

    handleOutSealCond(event, value) {
      this.setState({ outSealCond: value});
    }

    handleOutPODRemarks(event) {
      this.setState({ outPODRemarks: event.target.value });
    }

    handleMsgDlg(title, value, btns) {
      const { messageDialogOpen } = this.state;
      this.setState({ 
        messageDialogOpen: !messageDialogOpen,
        messageDialogTitle: title ? title : "",
        messageDialogValue: value ? value : "",
        messageDialogButtons: btns ? btns : []
      });
    }    

    toggleSnackBar(msg){
      const { snackBarOpen } = this.state;
      this.setState({
        snackBarOpen: !snackBarOpen,
        snackBarMessage: (msg ? msg : "")
      });
    }    

    handleMOTChange(event){
      var val = event.target.value;
      this.setState({
        modeOfTransport: val, 
        inVehStat: (val === "RD") ? "L": "",
        inSealCond: (val === "RD") ? "I": "",
      });
    }

    handleTransportModes(data){
      this.setState({
        transportModes: data,
        modeOfTransport: "RD",
        inVehStat: "L",
        inVehNo: "",
        inFleetType: "",
        inTransporter: "",
        inSealCond: "I",
        inSeal1: "",
        inSeal2: "",
        inNoOfBoxes: "",
        inLicNo: "",
        inMobNo: "",
        inDriverName: "",
        inProofType: "",
        inProofNo: "",
        inLRNo: "",
        inRemarks: ""
      });
    }

    handleActiveStep(step) {
      this.setState({activeStep: step});
    }

    handleStepperNext() {
      const { activeStep } = this.state;
      this.setState({activeStep: activeStep + 1});
    }

    handleStepperBack() {
      const { activeStep } = this.state;
      this.setState({activeStep: activeStep - 1});
    }

    handleInVehStat(event, value) {
      this.setState({inVehStat: value});
    }

    handleChangeInVehNo(event) {
      var val = event.target.value;
      if(val.length <= 10){        
        this.setState({inVehNo: val});
      }
    }

    handleBlurInVehNo(event){
      var val = this.state.inVehNo;      
      if(/^[A-Z]{2}[0-9]{1,3}(?:[A-Z])?(?:[A-Z]*)?[0-9]{1,4}$/.test(val)){
        //this.setState({inVehNo: val});
      }
      else{
        this.setState({inVehNo: ""});
      }
    }

    handleInFleetType(event) {
      this.setState({inFleetType: event.target.value});
    }

    handleInTransporter(event) {
      this.setState({inTransporter: event.target.value});
    }

    handleInSealCond(event, value) {
      this.setState({inSealCond: value});
    }

    handleInSeal1(event) {
      this.setState({inSeal1: event.target.value});
    }

    handleInSeal2(event) {
      this.setState({inSeal2: event.target.value});
    }

    handleInNoOfBoxes(event) {
      this.setState({inNoOfBoxes: event.target.value});
    }

    handleInLicNo(event) {
      this.setState({inLicNo: event.target.value});
    }

    handleInMobNo(event) {
      this.setState({inMobNo: event.target.value});
    }

    handleInDriverName(event) {
      this.setState({inDriverName: event.target.value});
    }

    handleInProofType(event) {
      this.setState({inProofType: event.target.value});
    }

    handleInProofNo(event) {
      this.setState({inProofNo: event.target.value});
    }

    handleInLRNo(event) {
      this.setState({inLRNo: event.target.value});
    }

    handleInRemarks(event) {
      this.setState({inRemarks: event.target.value});
    }

    getTitle(code){
      switch(code) {
        case "S": return "Success";
        case "E": return "Error";
        default: return "Warning";
      }
    }

    callBack(data) {
      var title = this.getTitle(data.msgCode);
      var msg = data.message;
      var btns = [{
          text: "Ok",
          event: () => {
            history.push("");
            this.loadMasterData();
            this.handleMsgDlg();
          }
      }];
      this.handleMsgDlg(title, msg, btns);
      this.toggleLoader();
    }

    render() {
        const { classes, theme } = this.props;      

        return (
          <div>
            <Router history={history}>
                <div className={classes.root}>
                  <Route 
                  exact 
                  path='' 
                  render={
                      (props) => <Master 
                                  classes={classes} 
                                  theme={theme}
                                  handleMasterData={this.handleMasterData}
                                  handleTempMasterData={this.handleTempMasterData}
                                  handleAPICall={this.handleAPICall}
                                  loadDetailData={this.loadDetailData}
                                  selectedIndex={this.state.selectedIndex}
                                  updateSelectedIndex={this.updateSelectedIndex}
                                  toggleLoader={this.toggleLoader}
                                  handleDrawerToggle={this.handleDrawerToggle} 
                                  mobileOpen={this.state.mobileOpen}
                                  tempMasterData={this.state.tempMasterData}  
                                  masterData={this.state.masterData} 
                                  updateDetailData={this.updateDetailData}
                                  handleTabChange={this.handleTabChange}
                                  handleExpPanelChange={this.handleExpPanelChange}
                                  search={this.state.search}
                                  handleSearchVisible={this.handleSearchVisible}
                                  searchText={this.state.searchText}
                                  updateSearchText={this.updateSearchText}
                                  {...props} />} />
                  <Route 
                    exact 
                    path='/detail/:id' 
                    render={
                      (props) => <Detail 
                                  classes={classes} 
                                  theme={theme}
                                  handleAPICall={this.handleAPICall}
                                  loadMasterData={this.loadMasterData}
                                  toggleLoader={this.toggleLoader}
                                  handleDrawerToggle={this.handleDrawerToggle} 
                                  tabValue={this.state.tabValue} 
                                  handleTabChange={this.handleTabChange} 
                                  tempMasterData={this.state.tempMasterData} 
                                  detailData={this.state.detailData} 
                                  updateDetailData={this.updateDetailData}
                                  expanded={this.state.expanded} 
                                  handleExpPanelChange={this.handleExpPanelChange} 
                                  controlsVisibility={this.state.controlsVisibility} 
                                  outVehStatus={this.state.outVehStatus}
                                  handleOutVehStat={this.handleOutVehStat}
                                  outNoOfBoxes={this.state.outNoOfBoxes}                                  
                                  handleOutNoOfBoxes={this.handleOutNoOfBoxes}
                                  outSealCond={this.state.outSealCond}
                                  handleOutSealCond={this.handleOutSealCond}
                                  outPODRemarks={this.state.outPODRemarks}
                                  handleOutPODRemarks={this.handleOutPODRemarks}
                                  handleMsgDlg={this.handleMsgDlg}
                                  toggleSnackBar={this.toggleSnackBar}
                                  callBack={this.callBack}
                                  {...props} 
                                  />} 
                  />
                  <Route
                    exact
                    path='/create'
                    render={
                      props => <Create
                                classes={classes}
                                theme={theme}
                                controlsVisibility={this.state.controlsVisibility}
                                handleAPICall={this.handleAPICall}
                                loadMasterData={this.loadMasterData}
                                toggleLoader={this.toggleLoader}
                                handleDrawerToggle={this.handleDrawerToggle}
                                handleMsgDlg={this.handleMsgDlg}
                                toggleSnackBar={this.toggleSnackBar}
                                modeOfTransport={this.state.modeOfTransport}
                                transportModes={this.state.transportModes}
                                handleTransportModes={this.handleTransportModes}
                                handleMOTChange={this.handleMOTChange}
                                activeStep={this.state.activeStep}
                                handleActiveStep={this.handleActiveStep}
                                handleStepperNext={this.handleStepperNext}
                                handleStepperBack={this.handleStepperBack}
                                inVehStat={this.state.inVehStat}                                
                                inVehNo={this.state.inVehNo}                                
                                inFleetType={this.state.inFleetType}
                                inTransporter={this.state.inTransporter}
                                inSealCond={this.state.inSealCond}
                                inSeal1={this.state.inSeal1}
                                inSeal2={this.state.inSeal2}
                                inNoOfBoxes={this.state.inNoOfBoxes}
                                inLicNo={this.state.inLicNo}
                                inMobNo={this.state.inMobNo}
                                inDriverName={this.state.inDriverName}
                                inProofType={this.state.inProofType}
                                inProofNo={this.state.inProofNo}
                                inLRNo={this.state.inLRNo}
                                inRemarks={this.state.inRemarks}
                                handleInVehStat={this.handleInVehStat}
                                handleChangeInVehNo={this.handleChangeInVehNo}
                                handleBlurInVehNo={this.handleBlurInVehNo}
                                handleInFleetType={this.handleInFleetType}
                                handleInTransporter={this.handleInTransporter}
                                handleInSealCond={this.handleInSealCond}
                                handleInSeal1={this.handleInSeal1}
                                handleInSeal2={this.handleInSeal2}
                                handleInNoOfBoxes={this.handleInNoOfBoxes}
                                handleInLicNo={this.handleInLicNo}
                                handleInMobNo={this.handleInMobNo}
                                handleInDriverName={this.handleInDriverName}
                                handleInProofType={this.handleInProofType}
                                handleInProofNo={this.handleInProofNo}
                                handleInLRNo={this.handleInLRNo}
                                handleInRemarks={this.handleInRemarks} 
                                callBack={this.callBack}
                                {...props}
                                />} 
                  />
                </div>
            </Router>
            <BusyDialog classes={classes} isLoading={this.state.isLoading} />
            <MessageDialog
              classes={{
                  paper: classes.dialog
              }}
              handleMsgDlg={this.handleMsgDlg}              
              open={this.state.messageDialogOpen}
              title={this.state.messageDialogTitle}
              value={this.state.messageDialogValue}
              btns={this.state.messageDialogButtons}
              loadMasterData={this.loadMasterData}
            />
            <Snackbar
              anchorOrigin={{
                  vertical: 'bottom', 
                  horizontal: 'center'
              }}
              open={this.snackBarOpen}
              onClose={() => this.toggleSnackBar()}
              //autoHideDuration={3000}
              SnackbarContentProps={{
                  'aria-describedby': 'message-id'
              }}
              message={<span id="message-id">{this.snackBarMessage}</span>}
            />
          </div>
        );        
    }

    componentDidMount() {
      this.loadMasterData();
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
  
export default (withStyles(styles, { withTheme: true }))(App);