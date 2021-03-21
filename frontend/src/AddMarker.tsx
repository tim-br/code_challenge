import { LatLngExpression } from "leaflet";
import { useState } from 'react';
import { Marker, useMapEvents } from 'react-leaflet'

interface Props {
    handleHealthServiceArea: Function,
    setCurrentLatLng: Function
}
  
const AddMarker = (props: Props) => {
    const [position, setPosition] = useState<null | LatLngExpression>();

    useMapEvents({
        click: (e) => {
        let latLngExp: LatLngExpression = e.latlng
        setPosition(latLngExp)
        props.setCurrentLatLng(latLngExp)
    },
    });

    if(position != null){
        return <Marker position={position}></Marker>
    } else {
        return <div></div>
    }
};

export default AddMarker