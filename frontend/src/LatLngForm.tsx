import { LatLngExpression } from "leaflet";
import React from 'react';

interface Props {
    updateLat: Function;
    updateLng: Function;
    currentLat: string;
    currentLng: string;
}

const LatLngForm = (props: Props) => {

    // const foo = (e) => {
    //     return "bax"
    // }

    const updateLat = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.updateLat(e.target.value)
    }

    const updateLng = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.updateLng(e.target.value)
    }
    return (
    <form>
        <label>
        Latitude:
        <input type="text" value={ props.currentLat } onChange={updateLat} />
        </label>
        <label>
        Longitude:
        <input type="text" value={ props.currentLng } onChange={updateLng} />
        </label>
    </form>
    );
}

export default LatLngForm