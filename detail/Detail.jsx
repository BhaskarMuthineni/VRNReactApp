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
import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
  } from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import TextField from 'material-ui/TextField';
import Radio, { RadioGroup } from 'material-ui/Radio';

const API = "http://localhost:5000/VRNDetail/";

class Detail extends Component {
    constructor(props) {
        super(props);
        // fetch(API + this.props.match.params.id)
        // .then(response => response.json())
        // .then(data => this.props.data);
    }
    
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
                <FormControl className={classes.formControl} disabled>
                    <InputLabel htmlFor="name-disabled">Mode of Transport</InputLabel>
                    <Select value={'CA'} input={<Input name="name" id="name-disabled" />}>
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
                                    disabled
                                    />
                                    <TextField
                                    id="name"
                                    label="Vehicle No."
                                    className={classes.textField}
                                    value="MH01R1234"                                    
                                    margin="normal"
                                    disabled
                                    />
                                    <TextField
                                    id="name"
                                    label="Fleet Type"
                                    className={classes.textField}
                                    value="Market Vehicle"                                    
                                    margin="normal"
                                    disabled
                                    />
                                    <TextField
                                    id="name"
                                    label="Transporter/Agency Name"
                                    className={classes.textField}
                                    value="Test Vendor"
                                    margin="normal"
                                    disabled
                                    />
                                    <TextField
                                    id="name"
                                    label="Seal Condition"
                                    className={classes.textField}
                                    value="Intact"                                    
                                    margin="normal"
                                    disabled
                                    />
                                    <TextField
                                    id="name"
                                    label="Seal No. 1"
                                    className={classes.textField}
                                    value="1123"                                    
                                    margin="normal"
                                    disabled
                                    />
                                    <TextField
                                    id="name"
                                    label="Seal No. 2"
                                    className={classes.textField}
                                    value="123"                                    
                                    margin="normal"
                                    disabled
                                    />
                                    <TextField
                                    id="name"
                                    label="No. of Boxes"
                                    className={classes.textField}
                                    value="10"                                    
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
}

export default Detail;