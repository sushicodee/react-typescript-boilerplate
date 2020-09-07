import React from 'react';
import './App.scss';
import Routes from 'routes/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";

const App: React.FC = () => {
  return (
    <div className="App">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Routes />
      </MuiPickersUtilsProvider>
      <ToastContainer containerId="an id" draggable={false} />
    </div>
  );
};
export default App;
