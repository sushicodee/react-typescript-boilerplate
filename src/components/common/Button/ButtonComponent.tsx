import React from 'react';
import Button from '@material-ui/core/Button';
import './ButtonComponent.scss'
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';

function ButtonComponent({type,color,handlesubmit,disabled = false ,options:{size,isSubmitting = false,icon,variantType},classname,value}) {
  return (
    <>
    <Grid item xs = {6}>
      {icon ?
        <IconButton aria-label="edit"
        className={classname ||'btn'}
        disabled={isSubmitting  }
        onClick = {handlesubmit}
        >
          <Icon>
            {icon}
          </Icon>
        </IconButton>
        :
      <Button
        type = {type ||'submit'}
        // fullWidth
        variant={variantType || 'contained'}
        color={'secondary'}
        className={classname ||'button-default'}
        disabled={isSubmitting}
        onClick = {handlesubmit}
        size = {size}

      >
        {isSubmitting ?'Submitting':value === 'Edit Product'?'Confirm Edit Product':value}
      </Button>
      }
    </Grid>
    </>
  );
}

export default ButtonComponent;
