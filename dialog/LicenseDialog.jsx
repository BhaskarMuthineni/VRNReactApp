import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';

class LicenseDialog extends Component {
    constructor(props) {
        super(props);        
        this.handleLicenseSubmit = this.handleLicenseSubmit.bind(this);
    }    

    render() {
        const { classes, theme } = this.props;

        return(
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                aria-labelledby="confirmation-dialog-title"
                open={this.props.open}>
                <DialogTitle id="confirmation-dialog-title">
                    License Details
                </DialogTitle>
                <DialogContent>
                    <form className={classes.container} autoComplete="off">                    
                        <TextField
                        id="LicNo"
                        label="License No."
                        className={classes.textField}
                        value={this.props.inLicNo}
                        margin="normal"
                        disabled
                        />
                        <TextField
                        id="ValidUpto"
                        label="Valid Upto"
                        type="date"
                        className={classes.textField}
                        value={this.props.licenseValidUpto}
                        margin="normal"
                        onChange={this.props.handleLicenseValidUpto}
                        required
                        error={this.props.errValidUpto}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                        <TextField
                        id="DriverName"
                        label="Driver Name"
                        className={classes.textField}
                        value={this.props.licenseDriverName}
                        margin="normal"
                        onChange={this.props.handleLicenseDriverName}
                        required
                        error={this.props.errDriverName}
                        />
                        <TextField
                        id="MobNo"
                        label="Mobile No."
                        className={classes.textField}
                        value={this.props.licenseMobileNo}
                        margin="normal"
                        onChange={this.props.handleLicenseMobileNo}
                        required
                        error={this.props.errMobNo}
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="region">Region</InputLabel>
                            <Select
                                value={this.props.licenseRegionCode}
                                onChange={this.props.handleLicenseRegionCode}
                                required
                                error={this.props.errRegionCode}
                                inputProps={{
                                name: 'region',
                                id: 'region',
                                }}>
                            {
                                this.props.licenseRegions.map((region, i) =>
                                    <MenuItem key={i} value={region.Rg}>{region.Description}</MenuItem>
                                )
                            }
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() =>this.props.handleLicenseDialog()} color="secondary">
                        Close
                    </Button>
                    <Button onClick={this.handleLicenseSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        );        
    };

    componentDidMount(){
        this.props.loadLicenseRegions();
    }

    handleLicenseSubmit() {        
        if(this.props.licenseValidUpto === ""){
            this.props.toggleSnackBar("Enter Valid Upto");
            this.props.updateErrLicValidUpto(true);
        }
        else if(this.props.licenseDriverName === ""){
            this.props.toggleSnackBar("Enter Driver Name");
            this.props.updateErrLicDriverName(true);
        }
        else if(this.props.licenseMobileNo === ""){
            this.props.toggleSnackBar("Enter Mobile No.");
            this.props.updateErrLicMobileNo(true);
        }
        else if(this.props.licenseRegionCode === ""){
            this.props.toggleSnackBar("Select Region");
            this.props.updateErrLicRegionCode(true);
        }
        else{            
            var data = {
                Licencenumber: this.props.inLicNo,
                Lastname: this.props.licenseDriverName,
                Validto: this.props.licenseValidUpto,
                Telephone: this.props.licenseMobileNo,
                Rg: this.props.licenseRegionCode
            };
            
            let path = "License", method = "POST";
            this.props.handleAPICall(path, method, () => this.props.handleLicenseDialog(this.props.licenseMobileNo, this.props.licenseDriverName), data);
        }        
    }
}

LicenseDialog.propTypes = {
    open: PropTypes.bool
};

export default LicenseDialog;