import React, { Component } from 'react';
import './Dashboard.scss';
interface IProps {
  history: any;
  match: any;
  location: any;
}

interface IState {}

export default class Dashboard extends Component<IProps, IState> {
  componentDidMount() {}
  render() {
    return (
      <div className="dashboard wrapper">
          <div className = 'navigation container'>
              navigation bar
          </div>
        <div className = 'dash-item container'>dash1</div>
        <div className = 'dash-item container'>dash2</div>
        <div className = 'dash-item container'>dash3</div>
        <div className = 'dash-item container'>dash4</div>
        <div className = 'dash-item container '>dash5</div>
        <div className = 'dash-item container '>dash6</div>
      </div>
    );
  }
}
