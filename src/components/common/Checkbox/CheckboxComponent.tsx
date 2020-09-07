import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid  from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }),
);

function CheckboxComponent({name,label,data,value,handlechange}) {
    const classes = useStyles();
    return (
       <>
       <Grid item xs ={12} key={name}>
        <FormControl component="fieldset" className={classes.formControl}>
        <FormControlLabel
            control={<Checkbox className ='form-checkbox' checked={value} onChange={handlechange} inputProps={{ 'aria-label': 'secondary checkbox' }} name={name} />}
            label={label}
        />
        </FormControl>
       </Grid>
       </>

    )
}

export default CheckboxComponent
