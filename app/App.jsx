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
    flexWrap: 'wrap',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  selectedItem: {
    backgroundColor: theme.palette.action.selected
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
    }
  },
  scroller: {
    position: 'absolute',
    overflowX: 'hidden',
    overflowY: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0, 
    [theme.breakpoints.up('md')]: {
      marginTop: theme.mixins.toolbar[theme.breakpoints.up('sm')].minHeight,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '48px',
    },
  },
  content: {    
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    position: 'absolute',
    overflowX: 'hidden',
    overflowY: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    [theme.breakpoints.down('sm')]: {
      marginTop: '48px',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.mixins.toolbar[theme.breakpoints.up('sm')].minHeight,
      marginLeft: `calc(${drawerWidth}px)`,
    }
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
  searchLabel: {
    color: theme.palette.common.white
  },
  searchTextField: {
    color: theme.palette.common.white,
    padding: '0px'
  },
  searchButton: {
      position: 'absolute',
      right: '10px'
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%'
  },
  listItemText: {
    padding: '0px'
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
    margin: theme.spacing.unit * 2    
  },
  busyDialog: {
    backgroundColor: 'transparent',
    boxShadow: theme.shadows[0],
    overflow: 'hidden'
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
            transporters: [],
            proofTypes: [],
            activeStep: 0,
            modeOfTransport: "",      
            inVehStat: "",
            inVehNo: "",
            inFleetType: "",
            inFleetTypeDesc: "",
            inTransporter: "",
            inTransporterDesc: "",
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
            inRemarks: "",
            licenseDialogOpen: false,
            licenseValidUpto: "",
            licenseDriverName: "",
            licenseMobileNo: "",
            licenseRegionCode: "",
            licenseRegions: [],
            errValidUpto: false,
            errDriverName: false,
            errMobNo: false,
            errRegionCode: false,
            errOutVehStat: false,
            errInVehNo: false,
            errInTrans: false,
            errInLicNo: false,
            errInNewLicNo: false,
            errInMobNo: false,
            errInDriverName: false,
            errInProofType: false,
            errInProofNo: false
        };

        this.handleMasterData = this.handleMasterData.bind(this);
        this.handleTempMasterData = this.handleTempMasterData.bind(this);
        this.handleSearchVisible = this.handleSearchVisible.bind(this);
        this.updateSearchText = this.updateSearchText.bind(this);
        this.handleAPICall = this.handleAPICall.bind(this);
        this.loadMasterData = this.loadMasterData.bind(this);
        this.loadDetailData = this.loadDetailData.bind(this);
        this.loadTransportModes = this.loadTransportModes.bind(this);
        this.loadTransporters = this.loadTransporters.bind(this);
        this.loadProofTypes = this.loadProofTypes.bind(this);
        this.loadLicenseRegions = this.loadLicenseRegions.bind(this);
        this.updateSelectedIndex = this.updateSelectedIndex.bind(this);
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
        this.handleActiveStep = this.handleActiveStep.bind(this);
        this.handleStepperNext = this.handleStepperNext.bind(this);
        this.handleStepperBack = this.handleStepperBack.bind(this);

        this.handleInVehStat = this.handleInVehStat.bind(this);
        this.handleBlurInVehNo = this.handleBlurInVehNo.bind(this);        
        this.handleChangeInVehNo = this.handleChangeInVehNo.bind(this);
        this.handleInTransporter = this.handleInTransporter.bind(this);
        this.handleInSealCond = this.handleInSealCond.bind(this);
        this.handleInSeal1 = this.handleInSeal1.bind(this);
        this.handleInSeal2 = this.handleInSeal2.bind(this);
        this.handleInNoOfBoxes = this.handleInNoOfBoxes.bind(this);
        this.handleChangeInLicNo = this.handleChangeInLicNo.bind(this);
        this.handleBlurInLicNo = this.handleBlurInLicNo.bind(this);
        this.handleInMobNo = this.handleInMobNo.bind(this);
        this.handleInDriverName = this.handleInDriverName.bind(this);
        this.handleInProofType = this.handleInProofType.bind(this);
        this.handleInProofNo = this.handleInProofNo.bind(this);
        this.handleInLRNo = this.handleInLRNo.bind(this);
        this.handleInRemarks = this.handleInRemarks.bind(this);

        this.handleLicenseValidUpto = this.handleLicenseValidUpto.bind(this);
        this.handleLicenseDriverName = this.handleLicenseDriverName.bind(this);
        this.handleLicenseMobileNo = this.handleLicenseMobileNo.bind(this);
        this.handleLicenseRegionCode = this.handleLicenseRegionCode.bind(this);
        this.handleLicenseDialog = this.handleLicenseDialog.bind(this);

        this.updateErrLicValidUpto = this.updateErrLicValidUpto.bind(this);
        this.updateErrLicDriverName = this.updateErrLicDriverName.bind(this);
        this.updateErrLicMobileNo = this.updateErrLicMobileNo.bind(this);
        this.updateErrLicRegionCode = this.updateErrLicRegionCode.bind(this);

        this.updateErrOutVehStat = this.updateErrOutVehStat.bind(this);

        this.updateErrInVehNo = this.updateErrInVehNo.bind(this);
        this.updateErrInTrans = this.updateErrInTrans.bind(this);
        this.updateErrInLicNo = this.updateErrInLicNo.bind(this);
        this.updateErrInMobNo = this.updateErrInMobNo.bind(this);
        this.updateErrInDriverName = this.updateErrInDriverName.bind(this);
        this.updateErrInProofType = this.updateErrInProofType.bind(this);
        this.updateErrInProofNo =  this.updateErrInProofNo.bind(this);

        this.inVehNoChanged = false;
        this.inLicNoChanged = false;
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
                                  handleActiveStep={this.handleActiveStep}
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
                                  errOutVehStat={this.state.errOutVehStat}
                                  updateErrOutVehStat={this.updateErrOutVehStat}
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
                                handleDrawerToggle={this.handleDrawerToggle}
                                handleMsgDlg={this.handleMsgDlg}
                                toggleSnackBar={this.toggleSnackBar}
                                modeOfTransport={this.state.modeOfTransport}
                                transportModes={this.state.transportModes}
                                transporters={this.state.transporters}
                                proofTypes={this.state.proofTypes}
                                loadTransportModes={this.loadTransportModes}                                
                                handleMOTChange={this.handleMOTChange}
                                activeStep={this.state.activeStep}
                                handleActiveStep={this.handleActiveStep}
                                handleStepperNext={this.handleStepperNext}
                                handleStepperBack={this.handleStepperBack}
                                inVehStat={this.state.inVehStat}
                                inVehNo={this.state.inVehNo}             
                                inFleetType={this.state.inFleetType}
                                inFleetTypeDesc={this.state.inFleetTypeDesc}
                                inTransporter={this.state.inTransporter}
                                inTransporterDesc={this.state.inTransporterDesc}
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
                                handleInTransporter={this.handleInTransporter}
                                handleInSealCond={this.handleInSealCond}
                                handleInSeal1={this.handleInSeal1}
                                handleInSeal2={this.handleInSeal2}
                                handleInNoOfBoxes={this.handleInNoOfBoxes}
                                handleChangeInLicNo={this.handleChangeInLicNo}
                                handleBlurInLicNo={this.handleBlurInLicNo}
                                handleInMobNo={this.handleInMobNo}
                                handleInDriverName={this.handleInDriverName}
                                handleInProofType={this.handleInProofType}
                                handleInProofNo={this.handleInProofNo}
                                handleInLRNo={this.handleInLRNo}
                                handleInRemarks={this.handleInRemarks}
                                licenseDialogOpen={this.state.licenseDialogOpen}
                                licenseValidUpto={this.state.licenseValidUpto}
                                licenseDriverName={this.state.licenseDriverName}
                                licenseMobileNo={this.state.licenseMobileNo}
                                licenseRegionCode={this.state.licenseRegionCode}
                                handleLicenseValidUpto={this.handleLicenseValidUpto}
                                handleLicenseDriverName={this.handleLicenseDriverName}
                                handleLicenseMobileNo={this.handleLicenseMobileNo}
                                handleLicenseRegionCode={this.handleLicenseRegionCode}
                                licenseRegions={this.state.licenseRegions}
                                loadLicenseRegions={this.loadLicenseRegions}
                                handleLicenseDialog={this.handleLicenseDialog}
                                errValidUpto={this.state.errValidUpto}
                                errDriverName={this.state.errDriverName}
                                errMobNo={this.state.errMobNo}
                                errRegionCode={this.state.errRegionCode}
                                updateErrLicValidUpto={this.updateErrLicValidUpto}
                                updateErrLicDriverName={this.updateErrLicDriverName}
                                updateErrLicMobileNo={this.updateErrLicMobileNo}
                                updateErrLicRegionCode={this.updateErrLicRegionCode}
                                errInVehNo={this.state.errInVehNo}
                                errInTrans={this.state.errInTrans}
                                errInLicNo={this.state.errInLicNo}
                                errInNewLicNo={this.state.errInNewLicNo}
                                errInMobNo={this.state.errInMobNo}
                                errInDriverName={this.state.errInDriverName}
                                errInProofType={this.state.errInProofType}
                                errInProofNo={this.state.errInProofNo}
                                updateErrInVehNo={this.updateErrInVehNo}
                                updateErrInTrans={this.updateErrInTrans}
                                updateErrInLicNo={this.updateErrInLicNo}
                                updateErrInMobNo={this.updateErrInMobNo}
                                updateErrInDriverName={this.updateErrInDriverName}
                                updateErrInProofType={this.updateErrInProofType}
                                updateErrInProofNo={this.updateErrInProofNo}
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
              open={this.state.snackBarOpen}
              onClose={() => this.toggleSnackBar()}
              //autoHideDuration={3000}
              SnackbarContentProps={{
                  'aria-describedby': 'message-id'
              }}
              message={<span id="message-id">{this.state.snackBarMessage}</span>}
            />
          </div>
        );        
    }

    componentDidMount() {
      this.loadMasterData();
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

    handleAPICall(path, method, callBack, data){
      var payload = JSON.stringify(data);
      this.setState({isLoading: true});
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
            throw new Error(response.statusText);
          }
        })
        .then(data => {
          this.setState({isLoading: false});
          if(Array.isArray(data)){
            callBack(data);
          }
          else if(typeof data === "object" && data.message !== undefined){
            var btns = [{
                text: "Ok",
                event: () => {
                  if(data.msgCode === "S"){
                    callBack();
                  }
                  this.handleMsgDlg()                 
                }
            }];
            this.handleMsgDlg(this.getTitle(data.msgCode), data.message, btns);
          }          
        })
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
      history.push("");
      var fnResponse = function(data){
        if(Array.isArray(data) && data.length > 0){
          var sortedData = data.sort(function(a, b){
            return b.VRN - a.VRN;
          });
          that.setState({
            masterData: sortedData,
            tempMasterData: sortedData,
            selectedIndex: 0
          });
          that.loadDetailData(sortedData[0]);
        }        
      }
      let path = "VRNMaster";
      this.handleAPICall(path, "GET", fnResponse);
    }

    loadDetailData(vrn){
      var that = this;      
      this.handleTabChange(null,0);//for initially setting Arrival tab visible
      var fnExpPanelChange = this.handleExpPanelChange((vrn.MODEOFTRANSPORT !== 'HD') ? 'panel1' : 'panel2');//for initially setting Vehicle panel visible
      fnExpPanelChange(null, true);//calling the returned function
      var fnDetailResponse = function(data){
          if(Array.isArray(data) && data.length > 0){
            that.updateDetailData(data);
          }          
      }
      let path = "VRNDetail/";
      this.handleAPICall(path + vrn.VRN, "GET", fnDetailResponse);
      history.push("/detail/" + vrn.VRN);//for Routing to detail
    }

    loadTransportModes() {
      if(this.state.transportModes.length === 0){
        let that = this;
        var callBack = function(data){
          if(Array.isArray(data) && data.length > 0){
            that.setState({
              transportModes: data              
            });
            that.loadTransporters();
            that.loadProofTypes();
          }
        }
        let path = "VRNParam/TrnsprtMode";
        this.handleAPICall(path, "GET", callBack);
      }
      else{
        this.loadTransporters();
        this.loadProofTypes();
      }
      this.setState({
        modeOfTransport: "RD",
        inVehStat: "L",
        inVehNo: "",
        inFleetType: "",
        inFleetTypeDesc: "",
        inTransporter: "",
        inTransporterDesc: "",
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

    loadTransporters() {
      let that = this;
      //var transName = "";
      var callBack = function(data){
          if(Array.isArray(data) && data.length > 0){
              that.setState({ transporters: data });
          }
      }
      let path = "VRNTransporters";
      this.handleAPICall(path, "GET", callBack);// + transName
    }

    loadProofTypes() {
      let that = this;
      if(this.state.proofTypes.length === 0){
        var callBack = function(data){
          if(Array.isArray(data) && data.length > 0){
              that.setState({ proofTypes: data });
          }
        }
        let path = "VRNParam/IDProffList";
        this.handleAPICall(path, "GET", callBack);
      }      
    }

    loadLicenseRegions() {
      let that = this;
      if(this.state.licenseRegions.length === 0){
        var callBack = function(data){
          if(Array.isArray(data) && data.length > 0){
              that.setState({ licenseRegions: data });
          }
        }
        let path = "LicenseRegion";
        this.handleAPICall(path, "GET", callBack);
      }
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
      this.updateErrOutVehStat(false);
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
          this.setState({ outNoOfBoxes: val});
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
      var val = event.target.value;
      if(val.length <= 40){
        this.setState({outPODRemarks: val});
      }
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
        inVehNo: "",
        inFleetType: "",
        inFleetTypeDesc: "",
        inTransporter: "",
        inTransporterDesc: "",
        inSealCond: (val === "RD") ? "I": "",
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
      this.updateErrInVehNo(false);
      var val = event.target.value.toUpperCase();
      if(val.length <= 10){
        this.setState({inVehNo: val});
        this.inVehNoChanged = true;
      }
    }

    handleBlurInVehNo(event){
      const { inVehNo, modeOfTransport } = this.state;
      if(inVehNo !== ""){
        if(/^[A-Z]{2}[0-9]{1,3}(?:[A-Z])?(?:[A-Z]*)?[0-9]{1,4}$/.test(inVehNo)){
          let that = this;
          var fnResponse = function(data){
            if(Array.isArray(data)){
              if(data.length > 0){
                that.setState({
                  inFleetType: data[0].FleetType,
                  inFleetTypeDesc: data[0].FleetTypeDesc,
                  inTransporter: data[0].Vendor,
                  inTransporterDesc: data[0].VendorName
                });
              }
              else{
                var fleetType = "", fleetTypeDesc = "";
                switch(modeOfTransport){
                  case "RD": fleetType = "M";
                             fleetTypeDesc = "Market Vehicle";
                             break;
                  case "CA":
                  case "CR": fleetType = "V";
                             fleetTypeDesc = "Vendor Vehicle";
                             break;
                  case "RB": fleetType = "B";
                             fleetTypeDesc = "Biker";
                             break;
                  default: fleetType = "";
                           fleetTypeDesc = "";
                }
                that.setState({
                  inFleetType: fleetType,
                  inFleetTypeDesc: fleetTypeDesc,
                  inTransporter: "",
                  inTransporterDesc: ""
                });
              }
            }
            else{
              that.setState({
                inVehNo: "",
                inFleetType: "",
                inFleetTypeDesc: "",
                inTransporter: "",
                inTransporterDesc: ""
              });
            }
          }
          let path = "VRNVehicle/";
          if(this.inVehNoChanged){
            this.handleAPICall(path + inVehNo, "GET", fnResponse);
            this.inVehNoChanged = false;
          }
        }
        else{
          this.setState({inVehNo: ""});
          this.toggleSnackBar("Invalid vehicle number");
        }
      }      
    }

    handleInTransporter(event) {
      this.updateErrInTrans(false);
      var val = event.target.value;
      const { transporters } = this.state;
      var trans = transporters.filter((e) => e.Vendor === val);
      this.setState({
        inTransporter: trans[0].Vendor,
        inTransporterDesc: trans[0].Name1
      });      
    }

    handleInSealCond(event, value) {
      this.setState({inSealCond: value});
    }

    handleInSeal1(event) {
      var val = event.target.value;
      if(val.length <= 15){
        this.setState({inSeal1: val});
      }
    }

    handleInSeal2(event) {
      var val = event.target.value;
      if(val.length <= 15){
        this.setState({inSeal2: val});
      }
    }

    handleInNoOfBoxes(event) {
      var val = event.target.value;
      if(val.length <= 6){
        if(/^[0-9]+$/.test(val)){
          this.setState({ inNoOfBoxes: val});
        }
        else{
          this.setState({ inNoOfBoxes: ""});
        }
      }      
    }

    handleChangeInLicNo(event) {
      this.updateErrInLicNo(false);
      var val = event.target.value;
      if(val.length <= 20){
        this.setState({inLicNo: val});
        this.inLicNoChanged = true;
      }      
    }

    handleBlurInLicNo(event) {
      const { inLicNo } = this.state;
      if(inLicNo !== ""){
        let that = this;
        var fnResponse = function(data){
          if(Array.isArray(data)){
            if(data.length > 0){
              that.setState({
                inMobNo: data[0].Telephone,
                inDriverName: data[0].Lastname
              });
            }
            else{
              that.setState({
                errInNewLicNo: true,
                licenseDialogOpen: true,
                inMobNo: "",
                inDriverName: ""
              });
            }
          }          
        }
        let path = "License/";
        if(this.inLicNoChanged){
          this.handleAPICall(path + inLicNo, "GET", fnResponse);
          this.inLicNoChanged = false;
        }        
      }
    }

    handleInMobNo(event) {
      var val = event.target.value;
      this.updateErrInMobNo(false);
      if(val.length <= 10){
        if(/^[0-9]+$/.test(val)){
          this.setState({inMobNo: val});
        }
        else{
          this.setState({inMobNo: ""});
        }        
      }
    }

    handleInDriverName(event) {
      var val = event.target.value;
      this.updateErrInDriverName(false);
      if(val.length <= 35){
        if(/^[A-Za-z0-9 ]+$/.test(val)){
          this.setState({inDriverName: val});
        }
        else{
          this.setState({inDriverName: ""});
        }
      }
    }

    handleInProofType(event) {
      this.updateErrInProofType(false);
      var val = event.target.value;
      const { proofTypes } = this.state;
      var proof = proofTypes.filter((e) => e.modeNum === val);
      this.setState({
        inProofType: proof[0].modeNum,
        inProofTypeDesc: proof[0].modeTxt
      });
    }

    handleInProofNo(event) {
      this.updateErrInProofNo(false);
      var val = event.target.value;
      if(val.length <= 15){
        this.setState({inProofNo: val});
      }
    }

    handleInLRNo(event) {
      var val = event.target.value;
      if(val.length <= 15){
        this.setState({inLRNo: val});
      }      
    }

    handleInRemarks(event) {
      var val = event.target.value;
      if(val.length <= 40){
        this.setState({inRemarks: val});
      }
    }

    getTitle(code){
      switch(code) {
        case "S": return "Success";
        case "E": return "Error";
        default: return "Warning";
      }
    }

    handleLicenseValidUpto(event) {
      this.updateErrLicValidUpto(false);
      this.setState({licenseValidUpto: event.target.value});
    }
  
    handleLicenseDriverName(event) {
      this.updateErrLicDriverName(false);
      var val = event.target.value.trim();
      if(val.length <= 35){
        if(/^[A-Za-z0-9 ]+$/.test(val)){
          this.setState({licenseDriverName: val});
        }
        else{
          this.setState({licenseDriverName: ""});
        }
      }
    }

    handleLicenseMobileNo(event) {
      this.updateErrLicMobileNo(false);
      var val = event.target.value;
      if(val.length <= 10){
        if(/^[0-9]+$/.test(val)){
          this.setState({licenseMobileNo: val});
        }
        else{
          this.setState({licenseMobileNo: ""});
        }        
      }
    }

    handleLicenseRegionCode(event) {
      this.updateErrLicRegionCode(false);
      this.setState({licenseRegionCode: event.target.value});
    }

    handleLicenseDialog(mobNo, driverName) {
      const { licenseDialogOpen } = this.state;
      this.setState({
        licenseDialogOpen: !licenseDialogOpen,
        licenseValidUpto: "",
        licenseDriverName: "",
        licenseMobileNo: "",
        licenseRegionCode: "",
        inMobNo: (mobNo) ? mobNo: "",
        inDriverName: (driverName) ? driverName : "",
        errInNewLicNo: (mobNo && driverName) ? false : true
      });      
    }

    updateErrLicValidUpto(flag) {
      this.setState({errValidUpto: flag});
    }

    updateErrLicDriverName(flag) {
      this.setState({errDriverName: flag});
    }

    updateErrLicMobileNo(flag) {
      this.setState({errMobNo: flag});
    }

    updateErrLicRegionCode(flag) {
      this.setState({errRegionCode: flag});
    }

    updateErrOutVehStat(flag) {
      this.setState({errOutVehStat: flag});
    }

    updateErrInVehNo(flag) {
      this.setState({errInVehNo: flag});
    }

    updateErrInTrans(flag) {
      this.setState({errInTrans: flag});
    }

    updateErrInLicNo(flag) {
      this.setState({errInLicNo: flag});
    }

    updateErrInMobNo(flag) {
      this.setState({errInMobNo: flag});
    }

    updateErrInDriverName(flag) {
      this.setState({errInDriverName: flag});
    }

    updateErrInProofType(flag) {
      this.setState({errInProofType: flag});
    }

    updateErrInProofNo(flag) {
      this.setState({errInProofNo: flag});
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
  
export default (withStyles(styles, { withTheme: true }))(App);