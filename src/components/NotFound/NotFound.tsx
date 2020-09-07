import React from 'react'
import './NotFound.scss';
import { Typography } from '@material-ui/core';
const NotFound = () => {
    return (
        <div className ='not-found-container'>
            <Typography variant = "h3">
                404 not found
            </Typography>
        </div>
    )
}

export default NotFound
