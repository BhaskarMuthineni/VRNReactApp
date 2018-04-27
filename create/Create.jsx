import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Snackbar from 'material-ui/Snackbar';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import LicenseDialog from '../dialog/LicenseDialog.jsx';

class Create extends Component {
    constructor(props) {
        super(props);
        this.postVRN = this.postVRN.bind(this);

        this.steps = ['Vehicle', 'Driver', 'Done'];
    }

    render() {
        const { classes, theme, activeStep, controlsVisibility, modeOfTransport } = this.props;        
        
        if(modeOfTransport === "HD"){
            this.steps.splice(this.steps.indexOf("Vehicle"), 1);
        }

         return(
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
                        VRN Create
                    </Typography>
                </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="mode-of-transport">Mode of Transport</InputLabel>
                        <Select
                            value={modeOfTransport}
                            onChange={this.props.handleMOTChange}
                            inputProps={{
                            name: 'modeOfTransport',
                            id: 'mode-of-transport',
                            }}>
                        {
                            this.props.transportModes.map((modes, i) =>
                                <MenuItem key={i} value={modes.modeNum}>{modes.modeTxt}</MenuItem>
                            )
                        }
                    </Select>
                    </FormControl>
                    {
                        this.props.transportModes.length > 0 &&
                        <Stepper activeStep={this.props.activeStep}>
                        {
                            this.steps.map((label, index) => 
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            )
                        }
                        </Stepper>
                    }                    
                    <div>
                    {   
                        this.props.transportModes.length > 0 && this.steps.indexOf("Vehicle") === activeStep &&
                        <div>
                            <form className={classes.container} noValidate autoComplete="off">                                    
                                {
                                    controlsVisibility["vehStat"][modeOfTransport] &&
                                    <FormControl component="fieldset" required className={classes.formControl}>
                                        <FormLabel component="legend">Vehicle Status</FormLabel>
                                        <RadioGroup 
                                        aria-label="Vehicle Status" 
                                        name="VehStat" 
                                        className={classes.group} 
                                        value={this.props.inVehStat} 
                                        onChange={this.props.handleInVehStat}>
                                            <FormControlLabel value="L" control={<Radio />} label="Loaded"/>
                                            <FormControlLabel value="E" control={<Radio />} label="Empty"/>
                                        </RadioGroup>
                                        {/* <FormHelperText>Select an option</FormHelperText> */}
                                    </FormControl>
                                }
                                {
                                    controlsVisibility["vehNo"][modeOfTransport] &&
                                    <TextField
                                    id="vehNo"
                                    label="Vehicle No."
                                    className={classes.textField}
                                    value={this.props.inVehNo}
                                    margin="normal"
                                    onChange={this.props.handleChangeInVehNo}
                                    onBlur={this.props.handleBlurInVehNo}
                                    required
                                    error={this.props.errInVehNo}
                                    />
                                }
                                {
                                    controlsVisibility["fleetType"][modeOfTransport] &&
                                    <TextField
                                    id="fleetType"
                                    label="Fleet Type"
                                    className={classes.textField}
                                    value={this.props.inFleetTypeDesc}
                                    margin="normal"
                                    disabled
                                    />
                                }
                                {
                                    controlsVisibility["transName"][modeOfTransport] &&                                     
                                    <FormControl
                                        className={classes.formControl}
                                        required
                                        error={this.props.errInTrans}
                                    >
                                        <InputLabel htmlFor="transporter">Transporter/Agency Name</InputLabel>
                                        <Select
                                            value={this.props.inTransporter}
                                            onChange={this.props.handleInTransporter}
                                            inputProps={{
                                            name: 'transporter',
                                            id: 'transporter',
                                            }}>
                                        {
                                            this.props.transporters.map((trans, i) =>
                                                <MenuItem key={i} value={trans.Vendor}>{trans.Name1}</MenuItem>
                                            )
                                        }
                                        </Select>
                                    </FormControl>
                                }
                                {
                                    controlsVisibility["sealCond"][modeOfTransport] && this.props.inVehStat !== "E" &&
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">Seal Condition</FormLabel>
                                        <RadioGroup
                                        aria-label="Seal Condition"
                                        name="inSealCond"
                                        className={classes.group}
                                        value={this.props.inSealCond}
                                        onChange={this.props.handleInSealCond}>
                                            <FormControlLabel value="I" control={<Radio />} label="Intact"/>
                                            <FormControlLabel value="D" control={<Radio />} label="Damaged"/>
                                            <FormControlLabel value="N" control={<Radio />} label="No Seal"/>
                                        </RadioGroup>
                                    </FormControl>
                                }
                                {
                                    controlsVisibility["seal1"][modeOfTransport] && this.props.inVehStat !== "E" && this.props.inSealCond !== "N" &&
                                    <TextField
                                    id="seal1"
                                    label="Seal No. 1"
                                    className={classes.textField}
                                    value={this.props.inSeal1}
                                    margin="normal"
                                    onChange={this.props.handleInSeal1}
                                    />
                                }
                                {
                                    controlsVisibility["seal2"][modeOfTransport] && this.props.inVehStat !== "E" && this.props.inSealCond !== "N" &&
                                    <TextField
                                    id="seal2"
                                    label="Seal No. 2"
                                    className={classes.textField}
                                    value={this.props.inSeal2}
                                    margin="normal"
                                    onChange={this.props.handleInSeal2}
                                    />
                                }
                                {
                                    controlsVisibility["noOfBoxes"][modeOfTransport] && this.props.inVehStat !== "E" &&
                                    <TextField
                                    id="numBox"
                                    label="No. of Boxes"
                                    className={classes.textField}
                                    value={this.props.inNoOfBoxes}
                                    margin="normal"
                                    onChange={this.props.handleInNoOfBoxes}
                                    />
                                }
                            </form>
                            <div>
                                <Button variant="raised" onClick={this.props.handleStepperNext} className={classes.stepperButton}>
                                    Next
                                </Button>
                            </div>
                        </div>
                    }
                    {
                        this.props.transportModes.length > 0 && this.steps.indexOf("Driver") === activeStep &&
                        <div>
                            <form className={classes.container} noValidate autoComplete="off">                                    
                                {
                                    controlsVisibility["licNo"][modeOfTransport] &&
                                    <TextField
                                    id="LicNo"
                                    label="Driver License No."
                                    className={classes.textField}
                                    value={this.props.inLicNo}
                                    margin="normal"
                                    onChange={this.props.handleChangeInLicNo}
                                    onBlur={this.props.handleBlurInLicNo}
                                    required
                                    error={this.props.errInLicNo}
                                    />
                                }
                                {
                                    controlsVisibility["mobNo"][modeOfTransport] &&
                                    <TextField
                                    id="mobileNo"
                                    label="Mobile No."
                                    className={classes.textField}
                                    value={this.props.inMobNo}
                                    margin="normal"
                                    onChange={this.props.handleInMobNo}
                                    required
                                    error={this.props.errInMobNo}
                                    />
                                }
                                {
                                    controlsVisibility["personName"][modeOfTransport] &&
                                    <TextField
                                    id="driverName"
                                    label="Driver/Pickup Person Name"
                                    className={classes.textField}
                                    value={this.props.inDriverName}
                                    margin="normal"
                                    onChange={this.props.handleInDriverName}
                                    required
                                    error={this.props.errInDriverName}
                                    />
                                }
                                {
                                    controlsVisibility["idProof"][modeOfTransport] &&                                    
                                    <FormControl
                                        className={classes.formControl}
                                        required
                                        error={this.props.errInProofType}
                                    >
                                        <InputLabel htmlFor="proofType">ID Proof Type</InputLabel>
                                        <Select
                                            value={this.props.inProofType}
                                            onChange={this.props.handleInProofType}
                                            inputProps={{
                                            name: 'proofType',
                                            id: 'proofType',
                                            }}>
                                        {
                                            this.props.proofTypes.map((modes, i) =>
                                                <MenuItem key={i} value={modes.modeNum}>{modes.modeTxt}</MenuItem>
                                            )
                                        }
                                        </Select>
                                    </FormControl>
                                }
                                {
                                    controlsVisibility["idProof"][modeOfTransport] && this.props.inProofType !== "" &&
                                    <TextField
                                    id="proofNumber"
                                    label="ID Proof Number"
                                    className={classes.textField}
                                    value={this.props.inProofNo}
                                    margin="normal"
                                    onChange={this.props.handleInProofNo}
                                    required
                                    error={this.props.errInProofNo}
                                    />
                                }
                            </form>
                            <div>
                                {
                                    this.steps.indexOf("Driver") !== 0 &&
                                    <Button variant="raised" onClick={this.props.handleStepperBack} className={classes.stepperButton}>
                                        Back
                                    </Button>
                                }
                                <Button variant="raised" onClick={this.props.handleStepperNext} className={classes.stepperButton}>
                                    Next
                                </Button>
                            </div>
                        </div>
                    }
                    {
                        this.props.transportModes.length > 0 && this.steps.indexOf("Done") === activeStep &&
                        <div>
                            <form className={classes.container} noValidate autoComplete="off">                              
                                {
                                    controlsVisibility["lrNo"][modeOfTransport] &&
                                    <TextField
                                    id="lrNo"
                                    label="AWB No./Docker No./LR No."
                                    className={classes.textField}
                                    value={this.props.inLRNo}
                                    margin="normal"
                                    onChange={this.props.handleInLRNo}
                                    />
                                }
                                <TextField
                                id="remarks"
                                label="In Remarks"
                                className={classes.textField}
                                value={this.props.inRemarks}
                                margin="normal"
                                onChange={this.props.handleInRemarks}
                                multiline
                                rowsMax="2"
                                />
                            </form>
                            <div>
                                <Button variant="raised" onClick={this.props.handleStepperBack} className={classes.stepperButton}>
                                    Back
                                </Button>                                
                                <Button variant="raised" color="secondary" onClick={() => this.postVRN() } className={classes.stepperButton}>
                                    Report-In
                                </Button>
                                <Button variant="raised" color="primary" onClick={() => this.postVRN(true)} className={classes.stepperButton}>
                                    Check-In
                                </Button>
                            </div>
                        </div>
                    }
                    </div>
                    <LicenseDialog
                        classes={{
                            paper: classes.dialog
                        }}
                        classes={classes}
                        theme={theme}
                        open={this.props.licenseDialogOpen}
                        inLicNo={this.props.inLicNo}
                        licenseValidUpto={this.props.licenseValidUpto}
                        licenseDriverName={this.props.licenseDriverName}
                        licenseMobileNo={this.props.licenseMobileNo}
                        licenseRegionCode={this.props.licenseRegionCode}
                        handleLicenseValidUpto={this.props.handleLicenseValidUpto}
                        handleLicenseDriverName={this.props.handleLicenseDriverName}
                        handleLicenseMobileNo={this.props.handleLicenseMobileNo}
                        handleLicenseRegionCode={this.props.handleLicenseRegionCode}
                        licenseRegions={this.props.licenseRegions}
                        loadLicenseRegions={this.props.loadLicenseRegions}
                        handleLicenseDialogClose={this.props.handleLicenseDialogClose}
                        handleAPICall={this.props.handleAPICall}
                        toggleSnackBar={this.props.toggleSnackBar}
                        errValidUpto={this.props.errValidUpto}
                        errDriverName={this.props.errDriverName}
                        errMobNo={this.props.errMobNo}
                        errRegionCode={this.props.errRegionCode}
                        updateErrLicValidUpto={this.props.updateErrLicValidUpto}
                        updateErrLicDriverName={this.props.updateErrLicDriverName}
                        updateErrLicMobileNo={this.props.updateErrLicMobileNo}
                        updateErrLicRegionCode={this.props.updateErrLicRegionCode}
                    />
                </main>
            </div>
         );
     }

    componentDidMount(){
        this.props.loadTransportModes();
    }

    postVRN(checkIn) {
        if(this.props.controlsVisibility["vehNo"][this.props.modeOfTransport] &&
            this.props.inVehNo === ""){
            this.props.handleActiveStep(this.steps.indexOf("Vehicle"));
            this.props.toggleSnackBar("Enter Vehicle Number");
            this.props.updateErrInVehNo(true);
        }
        else if(this.props.controlsVisibility["transName"][this.props.modeOfTransport] &&
            this.props.inTransporter === ""){
            this.props.handleActiveStep(this.steps.indexOf("Vehicle"));
            this.props.toggleSnackBar("Select Transporter/Agency");
            this.props.updateErrInTrans(true);
        }
        else if(this.props.controlsVisibility["licNo"][this.props.modeOfTransport] &&
            this.props.inLicNo === ""){
            this.props.handleActiveStep(this.steps.indexOf("Driver"));
            this.props.toggleSnackBar("Enter License Number");
            this.props.updateErrInLicNo(true);
        }
        else if(this.props.controlsVisibility["mobNo"][this.props.modeOfTransport] &&
            this.props.inMobNo === ""){
            this.props.handleActiveStep(this.steps.indexOf("Driver"));
            this.props.toggleSnackBar("Enter Mobile Number");
            this.props.updateErrInMobNo(true);
        }
        else if(this.props.controlsVisibility["personName"][this.props.modeOfTransport] &&
            this.props.inDriverName === ""){
            this.props.handleActiveStep(this.steps.indexOf("Driver"));
            this.props.toggleSnackBar("Enter Driver/Pickup Person Name");
            this.props.updateErrInDriverName(true);
        }
        else if(this.props.controlsVisibility["idProof"][this.props.modeOfTransport] &&
            this.props.inProofType === ""){
            this.props.handleActiveStep(this.steps.indexOf("Driver"));
            this.props.toggleSnackBar("Select ID Proof Type");
            this.props.updateErrInProofType(true);
        }
        else if(this.props.controlsVisibility["idProof"][this.props.modeOfTransport] &&
            this.props.inProofNo === ""){
            this.props.handleActiveStep(this.steps.indexOf("Driver"));
            this.props.toggleSnackBar("Enter ID Proof Number");
            this.props.updateErrInProofNo(true);
        }
        else{
            var data = {
                MODEOFTRANSPORT: this.props.modeOfTransport,
                VEHICLESTATUS: this.props.inVehStat,
                VEHICLENUM: this.props.inVehNo,
                FLEETTYPE: this.props.inFleetTypeDesc,
                FLEETTYPECODE: this.props.inFleetType,
                TRANSPORTER: this.props.inTransporterDesc,
                TRANSPORTERCODE: this.props.inTransporter,
                SEALCONDITION: this.props.inSealCond,
                SEAL1: this.props.inSeal1,
                SEAL2: this.props.inSeal2,
                NUMOFBOXES: this.props.inNoOfBoxes,
                LICENSENUM: this.props.inLicNo,
                DRIVERNUM: this.props.inMobNo,
                DRIVERNAME: this.props.inDriverName,
                IDPROOFTYPE: this.props.inProofType,
                IDPROOFNUM: this.props.inProofNo,
                LRNUM: this.props.inLRNo,
                REMARKS: this.props.inRemarks,
                VRNSTATUS: (checkIn) ? "C" : "R",
                CHECKINOUT: "I"
            };
            let path = "VRNMaster";
            this.props.handleAPICall(path, "POST", () => this.props.loadMasterData(), data);
        }
    }
}

export default Create;