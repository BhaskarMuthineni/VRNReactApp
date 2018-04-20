import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import MenuIcon from 'material-ui-icons/Menu';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import Tabs, { Tab } from 'material-ui/Tabs';
import ExpansionPanel, {ExpansionPanelSummary, ExpansionPanelDetails } from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import TextField from 'material-ui/TextField';
import Radio, { RadioGroup } from 'material-ui/Radio';
import MessageDialog from '../dialog/MessageDialog.jsx';
import Snackbar from 'material-ui/Snackbar';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.handleCheckIn = this.handleCheckIn.bind(this);
    }

    handleCheckIn(vrn) {
        var that = this;
        return function(event) {
            that.props.handleLoading(true);      
            var fnResponse = function(data){
                that.props.handleMsgDlgOpen(true);
                that.props.handleMsgDlgValue(data.message);
                that.props.handleLoading(false);
            }
            let path = "VRNCheckIN/";
            that.props.handleAPICall(path + vrn, "PUT", fnResponse);
        }
    }

    handleCheckOut(vrn) {
        var that = this;
        return function(event) {
            if(that.props.tabValue !== 1){
                that.props.handleTabChange(null, 1);
            }
            if(that.props.outVehStatus !== ""){
                that.props.handleLoading(true);      
                var fnResponse = function(data){
                    console.log(data);
                    that.props.handleMsgDlgOpen(true);
                    that.props.handleMsgDlgValue(data.message);
                    that.props.handleLoading(false);
                }
                let path = "VRNCheckOUT";
                var data = {
                    VEHICLESTATUS : that.props.outVehStatus,
                    NUMOFBOXES : that.props.noOfBoxes,
                    SEALCONDITION : that.props.sealCond,
                    REMARKS : that.props.podRemarks,
                    VRN: vrn
                }
                that.props.handleAPICall(path, "POST", fnResponse, data);
            }
            else{
                that.props.handleSnkBarOpen(true);
                that.props.handleSnkBarMsg("Select Vehicle Status");
            }
        }
    }    

    render() {
        const { classes, theme, detailData, expanded, isLoading, error} = this.props;
        const vrnData = this.props.masterData.filter((ele) => {
            return (ele.VRN == parseInt(this.props.match.params.id));
        });

        const visibility = this.props.controlsVisibility;

        const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', { 
            year: 'numeric', 
            month: 'short', 
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });

        if(error) {
            return (
                <p>{error.message}</p>
            );
        }

        if(isLoading){
            return (
            <Dialog className={classes.busyDialog} open={isLoading}>
                <CircularProgress className={classes.progress} size={100} thickness={4} />
            </Dialog>
            );
        }

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
                        VRN Check-In: {vrnData[0].VRN}
                    </Typography>
                </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <FormControl className={classes.formControl} disabled>
                        <InputLabel htmlFor="name-disabled">Mode of Transport</InputLabel>
                        <Input value={vrnData[0].TrnsprtMode} name="name" id="name-disabled" />                    
                    </FormControl>
                    <AppBar position="static">
                        <Tabs value={this.props.tabValue} onChange={this.props.handleTabChange}>
                            <Tab label="Arrival" />
                            {
                                vrnData[0].VRNSTATUS === 'C' &&
                                <Tab label="Departure" />
                            }                            
                        </Tabs>
                    </AppBar>
                    {
                        this.props.tabValue === 0 &&
                        <div>
                        {
                            vrnData[0].MODEOFTRANSPORT !== 'HD' &&
                            <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.props.handleExpPanelChange('panel1')}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.heading}>Vehicle</Typography>
                                    <Typography className={classes.secondaryHeading}>{vrnData[0].VEHICLENUM}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <form className={classes.container} noValidate autoComplete="off">                                    
                                        {
                                            visibility["vehStat"][vrnData[0].MODEOFTRANSPORT] &&
                                            <TextField
                                            id="vehStat"
                                            label="Vehicle Status"
                                            className={classes.textField}
                                            value={detailData.length > 0 ? detailData[0].VEHICLESTATUS : ""}
                                            margin="normal"
                                            disabled
                                            />
                                        }
                                        {
                                            visibility["vehNo"][vrnData[0].MODEOFTRANSPORT] &&
                                            <TextField
                                            id="vehNo"
                                            label="Vehicle No."
                                            className={classes.textField}
                                            value={vrnData[0].VEHICLENUM}                                    
                                            margin="normal"
                                            disabled
                                            />
                                        }
                                        {
                                            visibility["fleetType"][vrnData[0].MODEOFTRANSPORT] &&
                                            <TextField
                                            id="fleetType"
                                            label="Fleet Type"
                                            className={classes.textField}
                                            value={vrnData[0].FLEETTYPE}
                                            margin="normal"
                                            disabled
                                            />
                                        }
                                        {
                                            visibility["transName"][vrnData[0].MODEOFTRANSPORT] &&
                                            <TextField
                                            id="transName"
                                            label="Transporter/Agency Name"
                                            className={classes.textField}
                                            value={vrnData[0].TRANSPORTER}
                                            margin="normal"
                                            disabled
                                            />
                                        }
                                        {
                                            visibility["sealCond"][vrnData[0].MODEOFTRANSPORT] &&
                                            <TextField
                                            id="sealCond"
                                            label="Seal Condition"
                                            className={classes.textField}                         
                                            value={detailData.length > 0 ? detailData[0].SEALCONDITION : ""}
                                            margin="normal"
                                            disabled
                                            />
                                        }
                                        {
                                            visibility["seal1"][vrnData[0].MODEOFTRANSPORT] &&
                                            <TextField
                                            id="seal1"
                                            label="Seal No. 1"
                                            className={classes.textField}
                                            value={detailData.length > 0 ? detailData[0].SEAL1 : ""}
                                            margin="normal"
                                            disabled
                                            />
                                        }
                                        {
                                            visibility["seal2"][vrnData[0].MODEOFTRANSPORT] &&
                                            <TextField
                                            id="seal2"
                                            label="Seal No. 2"
                                            className={classes.textField}
                                            value={detailData.length > 0 ? detailData[0].SEAL2 : ""}
                                            margin="normal"
                                            disabled
                                            />
                                        }
                                        {
                                            visibility["noOfBoxes"][vrnData[0].MODEOFTRANSPORT] &&
                                            <TextField
                                            id="numBox"
                                            label="No. of Boxes"
                                            className={classes.textField}
                                            value={detailData.length > 0 ? detailData[0].NUMOFBOXES : ""}
                                            margin="normal"
                                            disabled
                                            />
                                        }
                                    </form>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        }
                            <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.props.handleExpPanelChange('panel2')}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.heading}>Driver</Typography>
                                    <Typography className={classes.secondaryHeading}>{vrnData[0].DRIVERNAME}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <form className={classes.container} noValidate autoComplete="off">                                    
                                        {
                                            visibility["licNo"][vrnData[0].MODEOFTRANSPORT] &&
                                            <TextField
                                            id="LicNo"
                                            label="Driver License No."
                                            className={classes.textField}
                                            value={vrnData[0].LICENSENUM}
                                            margin="normal"
                                            disabled
                                            />
                                        }
                                        {
                                            visibility["mobNo"][vrnData[0].MODEOFTRANSPORT] &&
                                            <TextField
                                            id="mobileNo"
                                            label="Mobile No."
                                            className={classes.textField}
                                            value={vrnData[0].DRIVERNUM}
                                            margin="normal"
                                            disabled
                                            />
                                        }
                                        {
                                            visibility["personName"][vrnData[0].MODEOFTRANSPORT] &&
                                            <TextField
                                            id="driverName"
                                            label="Driver/Pickup Person Name"
                                            className={classes.textField}
                                            value={vrnData[0].DRIVERNAME}             
                                            margin="normal"
                                            disabled
                                            />
                                        }
                                        {
                                            visibility["idProof"][vrnData[0].MODEOFTRANSPORT] &&
                                            <TextField
                                            id="proofType"
                                            label="ID Proof Type"
                                            className={classes.textField}
                                            value={vrnData[0].IDPROOFTYPE}              
                                            margin="normal"
                                            disabled
                                            />
                                        }
                                        {
                                            visibility["idProof"][vrnData[0].MODEOFTRANSPORT] &&
                                            <TextField
                                            id="proofNumber"
                                            label="ID Proof Number"
                                            className={classes.textField}
                                            value={vrnData[0].IDPROOFNUM}             
                                            margin="normal"
                                            disabled
                                            />
                                        }
                                    </form>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.props.handleExpPanelChange('panel3')}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.heading}>Remarks</Typography>
                                    <Typography className={classes.secondaryHeading}>{detailData.length > 0 ? detailData[0].REMARKS : ""}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <form className={classes.container} noValidate autoComplete="off">                              
                                        {
                                            visibility["lrNo"][vrnData[0].MODEOFTRANSPORT] &&
                                            <TextField
                                            id="lrNo"
                                            label="AWB No./Docker No./LR No."
                                            className={classes.textField}
                                            value={vrnData[0].LRNUM}
                                            margin="normal"
                                            disabled
                                            />
                                        }
                                        <TextField
                                        id="remarks"
                                        label="In Remarks"
                                        className={classes.textField}
                                        value={detailData.length > 0 ? detailData[0].REMARKS : ""}
                                        margin="normal"
                                        disabled
                                        multiline
                                        rowsMax="2"
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
                                {
                                    visibility["outVehStat"][vrnData[0].MODEOFTRANSPORT] &&
                                    <FormControl component="fieldset" required className={classes.formControl}>
                                        <FormLabel component="legend">Vehicle Status</FormLabel>
                                        <RadioGroup aria-label="Vehicle Status" name="VehStat" className={classes.group} value={this.props.outVehStatus} onChange={this.props.handleOutVehStat}>
                                            <FormControlLabel value="L" control={<Radio />} label="Loaded"/>
                                            <FormControlLabel value="E" control={<Radio />} label="Empty"/>
                                        </RadioGroup>
                                        <FormHelperText>Select an option</FormHelperText>
                                    </FormControl>
                                }
                                {
                                    visibility["outNoOfBoxes"][vrnData[0].MODEOFTRANSPORT] && this.props.outVehStatus !== "E" &&
                                    <TextField
                                    id="noOfBoxes"
                                    label="No. of Boxes"
                                    className={classes.textField}
                                    value={this.props.noOfBoxes}
                                    onChange={this.props.handleNoOfBoxes}
                                    margin="normal"
                                    />
                                }
                                {
                                    visibility["outSealCond"][vrnData[0].MODEOFTRANSPORT] && this.props.outVehStatus !== "E" &&
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">Seal Condition</FormLabel>
                                        <RadioGroup aria-label="Seal Condition" name="SealCond" className={classes.group} value={this.props.sealCond} onChange={this.props.handleSealCond}>
                                            <FormControlLabel value="I" control={<Radio />} label="Intact"/>
                                            <FormControlLabel value="D" control={<Radio />} label="Damaged"/>
                                            <FormControlLabel value="N" control={<Radio />} label="No Seal"/>
                                        </RadioGroup>
                                    </FormControl>
                                }
                                {
                                    visibility["podRemarks"][vrnData[0].MODEOFTRANSPORT] &&
                                    <TextField
                                    id="OutRemarks"
                                    label="POD/Out Remarks"
                                    className={classes.textField}
                                    value={this.props.podRemarks}
                                    margin="normal"
                                    multiline
                                    rowsMax="2"
                                    onChange={this.props.handlePODRemarks}
                                    />
                                }
                                <TextField
                                id="reported"
                                label="Reported"
                                className={classes.textField}
                                value={dateTimeFormatter.format(detailData.length > 0 && detailData[0].VEHICLECHECKINDATE !== null ? detailData[0].VEHICLECHECKINDATE.$date : "")}
                                margin="normal"
                                readOnly
                                />
                                <TextField
                                id="checkIn"
                                label="Checked"
                                className={classes.textField}
                                value={dateTimeFormatter.format(detailData.length > 0 && detailData[0].VEHICLESECURITYDATE !== null ? detailData[0].VEHICLESECURITYDATE.$date : "")}
                                margin="normal"
                                readOnly
                                />
                            </form>
                        </div>
                    }
                    {
                        vrnData[0].VRNSTATUS == "R" &&
                        <Button variant="raised" color="primary" className={classes.button} onClick={this.handleCheckIn(vrnData[0].VRN)}>
                            Check-In
                        </Button>
                    }
                    {
                        vrnData[0].VRNSTATUS == "C" &&
                        <Button variant="raised" color="primary" className={classes.button} onClick={this.handleCheckOut(vrnData[0].VRN)}>
                            Check-Out
                        </Button>
                    }
                    <MessageDialog
                        classes={{
                            paper: classes.dialog
                        }}
                        handleMsgDlgOpen={this.props.handleMsgDlgOpen}
                        handleMsgDlgValue={this.props.handleMsgDlgValue}
                        open={this.props.messageDialogOpen}
                        value={this.props.messageDialogValue}
                    />
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom', 
                            horizontal: 'center'
                        }}
                        open={this.props.snackBarOpen}
                        onClose={() => this.props.handleSnkBarOpen(false)}
                        //autoHideDuration={3000}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id'
                        }}
                        message={<span id="message-id">{this.props.snackBarMessage}</span>}
                    />
                </main>
            </div>
        );        
    }    
}

export default Detail;