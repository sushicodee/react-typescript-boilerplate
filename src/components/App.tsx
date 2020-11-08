import React from 'react';
import './App.scss';
import Routes from 'routes/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import {createMuiTheme,MuiThemeProvider} from '@material-ui/core'
import { getItem } from './utils/localStorage/LocalStorage';
const App: React.FC = () => {
  const theme = createMuiTheme({
    palette:{
      type:getItem('theme') === 'dark' ? 'dark' :'light'
    }
  })
  return (
    <div className="App">
      <Provider store={store}>
        {/* <MuiThemeProvider theme = {theme}> */}
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Router>
            <Routes />
          </Router>
        </MuiPickersUtilsProvider>
        {/* </MuiThemeProvider> */}
        <ToastContainer containerId="an id" draggable={false} />
      </Provider>
    </div>
  );
};
export default App;
