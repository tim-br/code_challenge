import { LatLngExpression } from "leaflet";
import { useState } from 'react';
import { Marker, useMapEvents } from 'react-leaflet'

interface Props {
    handleHealthServiceArea: Function,
    setLastLatLng: Function,
    setCurrentLatLng: Function,
    latLng: LatLngExpression,
    lastLatLng: LatLngExpression,
    formEditing: boolean,
}
  
const AddMarker = (props: Props) => {

    useMapEvents({
        click: (e) => {
        let latLngExp: LatLngExpression = e.latlng
        props.setLastLatLng(latLngExp)
        props.setCurrentLatLng(latLngExp)
    },
    });
    return (
        <div>
        { props.formEditing? <Marker position={props.lastLatLng}></Marker> : <Marker position={props.latLng}></Marker> } 
        </div>
    )
    // if(position != null){
    //     return <Marker position={position}></Marker>
    // } else {
    //     return <Marker position={props.latLng}></Marker>
    // }
}

export default AddMarker