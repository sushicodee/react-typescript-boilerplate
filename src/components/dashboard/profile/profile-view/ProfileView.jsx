import WrappedMap from 'components/common/Map/Map'
import MapLoading from 'components/common/Map/MapLoading'
import React from 'react'

function ProfileView() {
    return (
        <div style = {{width:'100%',height:'500px'}}>
             <WrappedMap
                loadingElement= {<div style = {{height:'100%'}}> Loading ... </div>}
                googleMapURL = {`${process.env.REACT_APP_GOOGLE_MAPS_URL}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                containerElement = {<div style = {{height:'100%'}}/>}
                mapElement = {<div style = {{height:'100%'}}/>}
             
        />
        </div>
    )
}

export default ProfileView
