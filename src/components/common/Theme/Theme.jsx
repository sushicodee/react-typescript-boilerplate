import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from 'actions/app/appActions';
import './ThemeMode.scss';

function Theme() {
  const [selectedTheme, setTheme] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.app.theme);
  useEffect(() => {
    const initTheme = () => {
        if(theme === 'dark'){
            setTheme(true);
        }
    };
    initTheme();
  }, [theme]);

  useEffect(() => {
    const switchTheme = () => {
      document.body.classList.add(theme);
    };
    switchTheme();
  }, [theme]);

  const handletoggle = (e) => {
    const {checked} = e.target;
    setTheme(checked)
    document.body.classList.remove(theme);
    dispatch(toggleTheme());
  };
  return (
    <label className = 'toggle-label'>
      <input
        className="toggle-checkbox"
        type="checkbox"
        onClick={handletoggle}
        onChange = {() => {}}
        checked = {selectedTheme}
      ></input>
      <div className="toggle-slot">
        <div className="sun-icon-wrapper">
          <div
            className="iconify sun-icon"
            data-icon="feather-sun"
            data-inline="false"
          ></div>
        </div>
        <div className="toggle-button"></div>
        <div className="moon-icon-wrapper">
          <div
            className="iconify moon-icon"
            data-icon="feather-moon"
            data-inline="false"
          ></div>
        </div>
      </div>
    </label>
  );
}
export default Theme;
