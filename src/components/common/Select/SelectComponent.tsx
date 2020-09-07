import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { isArray } from 'util';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);

const SelectComponent = ({name, label, value, props = {dependency:[],menuItems:[{key:'',value:''}]}, handleChange, data }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [display, setdisplay] = useState(true);
  useEffect(() => {
    if (isArray(props.dependency)) {
      setdisplay(data[props.dependency[0]]);
    }
  }, [data]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
     <Grid key ={name} container  className={`${classes.formControl} form-field-${
            display ? 'show' : 'hide'
          }`}>
      <Grid item xs={3}/>
      <Grid item xs={6}>
        <FormControl
          className={`${classes.formControl} form-field-${
            display ? 'show' : 'hide'
          }`}
        >
          <InputLabel id="demo-controlled-open-select-label">
            {label}
          </InputLabel>
          <Select
            name={name}
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            onChange={handleChange}
            fullWidth
            defaultValue = {value || props.menuItems[0].key}
          >
            {/* <MenuItem value="none">
              <em>None</em>
            </MenuItem> */}
            {props.menuItems.map((item,index) => (
              <MenuItem key ={index} value={item.key}>{item.value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}/>
    </Grid>
    </>
  );
};
export default SelectComponent;
