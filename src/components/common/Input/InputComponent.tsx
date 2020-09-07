import React , {useEffect,useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { isArray } from 'util';
import InputAdornment from '@material-ui/core/InputAdornment';
import './InputComponent.scss';
function InputComponent({ type,name,label,error,handlechange,data,props}) {
    const inputType = type === undefined ? 'string':`${type}`;
    const [display, setdisplay] = useState(true)
    const [currency,setCurrency] = useState(false);
    
    const inputProps ={
    startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
    }

    useEffect(() => {
        if(isArray(props.dependency)){
                setdisplay(data[props.dependency[0]])
        }
        if(props.currency){
            setCurrency(props.currency)
        }
    }, [data])
    return (
        <>
        <Grid item xs ={12} sm ={6} md ={4} key={name}>
        <TextField
              className = {`form-field form-field${error !== ''?'-error':null} form-field-${display?'show':'hide'}`}
              variant="outlined"
              margin="normal"
              fullWidth
              id={name}
              label={label}
              name={name}
              required={props.required || false}
              type = {inputType}
              autoComplete={name}
              autoFocus
              onChange={handlechange}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={currency? {...inputProps}:{}
              }
              value={data[name] || ''}
            />
            <Grid className = 'error-span'>{error}</Grid>
        </Grid>
            </>
    )
}

export default InputComponent
