import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers({name,label,value,handlechange}) {
  return (
      <Grid key ={name} container justify="space-around">
        <KeyboardDatePicker
          name ={name}
          margin="normal"
          id="date-picker-dialog"
          label={label}
          format="DD/MM/YYYY"
          value={value|| null}
          onChange={(e) => handlechange(e,name)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
  );
}