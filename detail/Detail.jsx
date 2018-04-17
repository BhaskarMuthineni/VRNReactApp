import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
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

const API = "http://localhost:5000/VRNDetail/";

class Detail extends Component {
    constructor(props) {
        super(props);
    }    

    render() {
        const { classes, theme } = this.props;
        const vrnData = this.props.masterData.filter((ele) => {
            return (ele.VRN === parseInt(this.props.match.params.id));
        });

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
                    {/* <Select>
                        <MenuItem value={'CA'}>Courier Air</MenuItem>
                        <MenuItem value={'CR'}>Courier Road</MenuItem>
                        <MenuItem value={'HD'}>Hand Delivered</MenuItem>
                        <MenuItem value={'RB'}>Road Bike</MenuItem>
                        <MenuItem value={'RD'}>Road Truck</MenuItem>
                    </Select> */}
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
                                    value={this.props.detailData[0].VEHICLESTATUS}
                                    margin="normal"
                                    disabled
                                    />
                                    <TextField
                                    id="name"
                                    label="Vehicle No."
                                    className={classes.textField}
                                    value={vrnData[0].VEHICLENUM}                                    
                                    margin="normal"
                                    disabled
                                    />
                                    <TextField
                                    id="name"
                                    label="Fleet Type"
                                    className={classes.textField}
                                    value={vrnData[0].FLEETTYPE}
                                    margin="normal"
                                    disabled
                                    />
                                    <TextField
                                    id="name"
                                    label="Transporter/Agency Name"
                                    className={classes.textField}
                                    value={vrnData[0].TRANSPORTER}
                                    margin="normal"
                                    disabled
                                    />
                                    <TextField
                                    id="name"
                                    label="Seal Condition"
                                    className={classes.textField}                         
                                    value={detailData[0].SEALCONDITION}
                                    margin="normal"
                                    disabled
                                    />
                                    <TextField
                                    id="name"
                                    label="Seal No. 1"
                                    className={classes.textField}
                                    value={detailData[0].SEAL1}
                                    margin="normal"
                                    disabled
                                    />
                                    <TextField
                                    id="name"
                                    label="Seal No. 2"
                                    className={classes.textField}
                                    value={detailData[0].SEAL2}
                                    margin="normal"
                                    disabled
                                    />
                                    <TextField
                                    id="name"
                                    label="No. of Boxes"
                                    className={classes.textField}
                                    value={detailData[0].SEALCONDITION}
                                    margin="normal"
                                    disabled
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
                                    disabled
                                    />
                                    <TextField
                                    id="name"
                                    label="Mobile No."
                                    className={classes.textField}
                                    value="987654"                                    
                                    margin="normal"
                                    disabled
                                    />
                                    <TextField
                                    id="name"
                                    label="Driver/Pickup Person Name"
                                    className={classes.textField}
                                    value="RAM"                                    
                                    margin="normal"
                                    disabled
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
                                    disabled
                                    />
                                    <TextField
                                    id="name"
                                    label="In Remarks"
                                    className={classes.textField}
                                    value="asdf"                                    
                                    margin="normal"
                                    disabled
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

    componentDidMount() {
        fetch(API + this.props.match.params.id)
        .then(response => response.json())
        .then(data => this.props.updateDetailData(data));
    }

    componentDidUpdate() {
        fetch(API + this.props.match.params.id)
        .then(response => response.json())
        .then(data => this.props.updateDetailData(data));
    }
}

export default Detail;