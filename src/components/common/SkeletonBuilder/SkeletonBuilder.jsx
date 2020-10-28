import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
function SkeletonBuilder({component:Component,props}) {
    return (
        <Skeleton animation='wave' className ='skeleton' variant = {props.type}>
            <Component {...props}/>
        </Skeleton>
    )
}

export default SkeletonBuilder
