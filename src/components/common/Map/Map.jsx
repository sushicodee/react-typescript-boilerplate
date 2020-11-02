import Configs from 'configs/Configs';
import React from 'react';
import { GoogleMap,withScriptjs,withGoogleMap,Marker} from 'react-google-maps';

function Map({storeData}) {
    const {center,defaultZoom} = Configs.googleMaps;
    // const [selected,setSelectedStore] = useState({})
  return (
    <GoogleMap defaultZoom={defaultZoom} defaultCenter={center}>
        {storeData && storeData.location.map(store => 
        <Marker 
            key = {store.storeId}
            position = {{lat:store.coordinates[0],lng:store.coordinates[1]}}
        />)}
    </GoogleMap>
  );
}
//takes props googleMapsUrl loadingElement contaienrElement mapElement
const WrappedMap = withScriptjs(withGoogleMap(Map))
export default WrappedMap;
