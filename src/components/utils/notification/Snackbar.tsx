import {toast} from 'react-toastify';

const showSuccess = (msg:string) => {
    toast.success(msg);
}
const showInfo = (msg:string) => {
    toast.info(msg);
}

const showWarning = (msg:string) => {
    toast.warn(msg);
}
const showError = (msg:string) => {
    toast.error(msg);
}
//handle error
const handleError = (error) => {
    let defaultMessage = 'something went wrong'
    if(error && error.message){
        defaultMessage = error.message;
    }
    if(error && error.data && error.data.message){
        defaultMessage = error.data.message;
    }
    showError(defaultMessage);

}

export default {
    showSuccess,showWarning,showInfo,handleError
}