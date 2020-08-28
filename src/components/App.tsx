import React from 'react';
import { Switch } from 'react-router-dom';
import Header from './header/Header';
import './App.scss';
import Routes from 'routes/Routes';
const App: React.FC = () => {
  return (
    <div className="App">
        <Routes/>
    </div>
  );
};
export default App;
