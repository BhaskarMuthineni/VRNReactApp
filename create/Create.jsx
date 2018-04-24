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
// import Autosuggest from 'react-autosuggest';
// import match from 'autosuggest-highlight/match';
// import parse from 'autosuggest-highlight/parse';

class Create extends Component {
    constructor(props) {
        super(props);
        this.handleReportIn = this.handleReportIn.bind(this);
        this.handleCheckIn = this.handleCheckIn.bind(this);
    }

    handleReportIn() {
        // if(that.props.controlsVisibility["outVehStat"][vrn.MODEOFTRANSPORT] && that.props.outVehStatus === ""){
        //     that.props.toggleSnackBar("Select Vehicle Status");
        // }
        // else{
            
        //}
        this.postVRN();
    }

    handleCheckIn() {
        this.postVRN(true);
    }

    postVRN(checkIn) {        
        var data = {
            MODEOFTRANSPORT: this.props.modeOfTransport,
            VEHICLESTATUS: this.props.inVehStat,
            VEHICLENUM: this.props.inVehNo,
            FLEETTYPE: this.props.inFleetType,
            FLEETTYPECODE: this.props.inFleetType,
            TRANSPORTER: this.props.inTransporter,
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
        this.props.handleAPICall(path, "POST",  this.props.callBack, data);
    }

     render() {
        const { classes, theme, activeStep, controlsVisibility, modeOfTransport} = this.props;

        const steps = [];
        
        if(modeOfTransport !== "HD"){
            steps.push('Vehicle');            
        }
        steps.push('Driver');
        steps.push('Done');

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
                    <Stepper activeStep={this.props.activeStep}>
                        {
                            steps.map((label, index) => 
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            )
                        }
                    </Stepper>
                    <div>
                    {   
                        steps.indexOf("Vehicle") === activeStep &&
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
                                    />
                                }
                                {
                                    controlsVisibility["fleetType"][modeOfTransport] &&
                                    <TextField
                                    id="fleetType"
                                    label="Fleet Type"
                                    className={classes.textField}
                                    value={this.props.inFleetType}
                                    margin="normal"
                                    onChange={this.props.handleInFleetType}
                                    //disabled
                                    />
                                }
                                {
                                    controlsVisibility["transName"][modeOfTransport] && 
                                    <TextField
                                    id="transName"
                                    label="Transporter/Agency Name"
                                    className={classes.textField}
                                    value={this.props.inTransporter}
                                    margin="normal"
                                    onChange={this.props.handleInTransporter}
                                    />                                   
                                    //<Autosuggest
                                        // theme={{
                                        // container: classes.container,
                                        // suggestionsContainerOpen: classes.suggestionsContainerOpen,
                                        // suggestionsList: classes.suggestionsList,
                                        // suggestion: classes.suggestion,
                                        // }}
                                        // renderInputComponent={renderInput}
                                        // suggestions={this.state.suggestions}
                                        // onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                                        // onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                                        // renderSuggestionsContainer={renderSuggestionsContainer}
                                        // getSuggestionValue={getSuggestionValue}
                                        // renderSuggestion={renderSuggestion}
                                        //inputProps={
                                       // classes,
                                        // placeholder='Transporter/Agency Name'
                                        // value= {this.props.inTransporter}
                                        // onChange= {this.props.handleInTransporter}
                                       // }
                                    ///>
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
                        steps.indexOf("Driver") === activeStep &&
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
                                    onChange={this.props.handleInLicNo}
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
                                    />
                                }
                                {
                                    controlsVisibility["idProof"][modeOfTransport] &&
                                    <TextField
                                    id="proofType"
                                    label="ID Proof Type"
                                    className={classes.textField}
                                    value={this.props.inProofType}
                                    margin="normal"
                                    onChange={this.props.handleInProofType}
                                    />
                                }
                                {
                                    controlsVisibility["idProof"][modeOfTransport] &&
                                    <TextField
                                    id="proofNumber"
                                    label="ID Proof Number"
                                    className={classes.textField}
                                    value={this.props.inProofNo}
                                    margin="normal"
                                    onChange={this.props.handleInProofNo}
                                    />
                                }
                            </form>
                            <div>
                                {
                                    steps.indexOf("Driver") !== 0 &&
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
                        steps.indexOf("Done") === activeStep &&
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
                                <Button variant="raised" color="secondary" onClick={this.handleReportIn} className={classes.stepperButton}>
                                    Report-In
                                </Button>
                                <Button variant="raised" color="primary" onClick={this.handleCheckIn} className={classes.stepperButton}>
                                    Check-In
                                </Button>
                            </div>
                        </div>
                    }
                    </div>
                </main>
            </div>
         );
     }

     componentDidMount(){
        let that = this;      
        var fnResponse = function(data){
          that.props.handleTransportModes(data);
          that.props.toggleLoader();
        }
        let path = "VRNParam/TrnsprtMode";
        this.props.handleAPICall(path, "GET", fnResponse);
     }
}

export default Create;