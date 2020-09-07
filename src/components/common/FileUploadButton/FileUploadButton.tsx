import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }),
);

const FileUploadButton = ({name,label,value,props, handlechange,error }) => {
  const classes = useStyles();
  return (
    <div className={classes.root} key={name}>
      <input
        name={name}
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple={props.multiple || false}
        type="file"
        onChange={handlechange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          {label}
        </Button>
      </label>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
      />
      <Typography className = 'photo-info' variant = 'caption'>
        {value ? typeof value === 'string'? value :value[0].name:'No Photo selected' }
      </Typography>
      {/* <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label> */}
    </div>
  );
};
export default FileUploadButton;
