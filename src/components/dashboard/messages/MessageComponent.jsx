import React, { Component } from 'react';
import * as io from 'socket.io-client';
import { Box, Typography, Input, Button } from '@material-ui/core';
import './MessageComponent.scss';
import { getItem } from 'components/utils/localStorage/LocalStorage';
import Moment from './../../utils/utils'
import Snackbar from 'components/utils/notification/Snackbar';
class MessageComponent extends Component {
  state = {
    data: {
      message: '',
      senderId: '',
      username: '',
      reciverId: '',
      recieverName: '',
      time: '',
    },
    messages: [],
    users: [],
  };

  componentDidMount() {
    this.user = JSON.parse(getItem('user'));
    this.socket = io(process.env.REACT_APP_SOCKET_URL);
    this.runSocket();
  }
  componentWillUnmount() {
      this.socket.emit('disconnect');
  }

  runSocket = () => {
    this.socket.on('connect', () => {
      console.log('connected to socket');
    });
    this.socket.emit('new-user',{username:this.user.username,name:this.user.name})
    this.socket.on('rply-msg', (data) => {
      const { messages } = this.state;
      messages.push(data);
      this.setState((pre) => ({
        ...pre,
        messages,
      }));
    });

    this.socket.on('rply-msg-to', (data) => {
      const { messages } = this.state;
      messages.push(data);
      this.setState((pre) => ({
        ...pre,
        data:{...pre.data,reciverId:data.senderId},
        messages,
      }));
    });
    this.socket.on('user',data => {
      console.log(data,'users gettinhg')
      let senderId;
        data.forEach((user,i) => {
          if(user.username === this.user.username){
            senderId = user.id;
          }
        })
        this.setState(prev =>({
            ...prev,
            data:{...prev.data,senderId},
            users:data
        }))
    })
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      data: { ...prevState.data, [name]: value },
    }));
  };

  handleSubmit = (e) => {
    console.log(this.state.data)
    e.preventDefault();
    if(!this.state.data.reciverId){
      return Snackbar.showInfo('Please select user to send Message')
    }
    const data = {
      ...this.state.data,
    };
    data.userid = this.user._id;
    data.username = this.user.username;
    data.time = new Date();
    this.socket.emit('new-message', data);
    this.setState(prev => ({
      ...prev,
      data:{...prev.data,message:''}
    }))
  };

  selectUser = (user) => {
      this.setState(prev => ({
        ...prev,
        data:{...prev.data,reciverId:user.id,
        recieverName:user.username}
      }))
  }
  render() {
    const username = this.user && this.user.username
    const { message } = this.state.data;
    let msgContent = this.state.messages && this.state.messages.map((message,index) => {
      return (
        <li className={`message message-${ message.username && username === message.username?'right':'left'}`} key={index}>
          <Typography variant="subtitle1">{message.message}</Typography>
          <Typography variant="subtitle2">{message.username}</Typography>
          <Typography variant="caption">
            <small> {Moment.formatDate(message.time)}</small>
          </Typography>
        </li>
      );
    });
    let usrContent = this.state.users && this.state.users.map((user,index) => {
        return (
          <li className={`user `} key={index}>
            <Typography onClick = {() => this.selectUser(user)} variant="subtitle2">{user.username}</Typography>
          </li>
        );
      });
    return (
      <Box className="messages-wrapper">
        <Box className="messages-container">
          <Box className="messages">
            <Typography variant="h5">Messages</Typography>
            <Box className="message-box">
                <ul>
                    {msgContent}
                </ul>
            </Box>
            <form className="message-control" onSubmit={this.handleSubmit}>
              <Input
                name="message"
                value={message}
                onChange={this.handleChange}
                className="msg-input"
              ></Input>
              <Button type="submit">Send</Button>
            </form>
          </Box>
          <Box className="users-list">
             
            <Typography variant="h5">Users</Typography>
            <Box className="users-box">
            <ul>
                  {usrContent}
              </ul>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default MessageComponent;
