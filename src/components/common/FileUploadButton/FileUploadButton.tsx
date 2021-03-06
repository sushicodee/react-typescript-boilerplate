import React,{useState,useEffect,useRef} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './FileUploadButton.scss'
import { Icon, Typography } from '@material-ui/core';

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
  const imageUrl = process.env.REACT_APP_IMAGE_URL;
  const [image,setImage] = useState<File>()
  const [preview,setPreview] = useState<string>()
  const imageInputRef = useRef<HTMLInputElement>();
  const handleImageChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0])
    handlechange(e);
  }
  useEffect(()=>{
    if(image){
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(image)
    }else{
      setPreview('');
    }
  }
  ,[image])
  return (
    <div className={classes.root +' '+'upload-button-wrapper'} key={name}>
      <input
        name={name}
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple={props.multiple || false}
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          <Icon>
             add
          </Icon>
          {preview &&
          // <img className = {`image-overlay ${props.round ?'image-overlay-round':null}`} src = {`${imageUrl}/${value}`}
          <img className = {`image-overlay ${props.round ?'image-overlay-round':null}`} src = {preview}>
          </img>
        }
        </Button>
      </label>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
      />
      
      {!props.round && <Typography className = 'photo-info' variant = 'caption'>
        {value ? typeof value === 'string'? value.split('-')[1] :value[0].name:'No Photo selected' }
      </Typography>}
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
