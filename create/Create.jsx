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
class Create extends Component {
    constructor(props) {
        super(props);
    }

     render() {
        const { classes, theme, error, activeStep, controlsVisibility} = this.props;

        const steps = ['Vehicle', 'Driver', 'Done'];

        if(error) {
            return (
                <p>{error.message}</p>
            );
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
                            value={this.props.modeOfTransport}
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
                    {steps.map((label, index) => 
                        <Step key={label}>
                            <StepLabel {...label}></StepLabel>
                        </Step>
                        )
                    }
                    </Stepper>
                    <div>
                    {activeStep === steps.length ? (
                        <div>
                        <Button onClick={this.handleReset} className={classes.button}>
                            Reset
                        </Button>
                        <Button onClick={this.handleReset} className={classes.button}>
                            Report-In
                        </Button>
                        <Button onClick={this.handleReset} className={classes.button}>
                            Check-In
                        </Button>
                        </div>
                    ) : (
                        <div>
                        {/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <div>
                            <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                            >
                            Back
                            </Button>
                            {this.isStepOptional(activeStep) && (
                            <Button
                                variant="raised"
                                color="primary"
                                onClick={this.handleSkip}
                                className={classes.button}
                            >
                                Skip
                            </Button>
                            )}
                            <Button
                            variant="raised"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}
                            >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div> */}
                        </div>
                    )}
                    </div>
                </main>
            </div>
         );
     }

     componentDidMount(){
        let that = this;
        this.props.handleLoading(true);      
        var fnResponse = function(data){
          that.props.handleTransportModes(data);
          that.props.handleLoading(false);
        }
        let path = "VRNParam/TrnsprtMode";
        this.props.handleAPICall(path, "GET", fnResponse);
     }
}

export default Create;