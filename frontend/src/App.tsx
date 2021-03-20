import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { LatLngExpression } from "leaflet";
import { ReactComponent } from '*.svg';
import { parseJsonConfigFileContent } from 'typescript';

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

interface State {
  health_service_area: string;
  currentLatLng: LatLngExpression
}

class App extends React.Component <{}, State>{

  state = { 
    health_service_area: "Click a location on the map to view your Community Health Service Area",
    currentLatLng: {lat: 50, lng: -120}
  }

  constructor(props: {} | Readonly<{}>) {
    super(props)

    this.handleHealthServiceArea = this.handleHealthServiceArea.bind(this)
    this.fetchCommunityHealthServiceArea = this.fetchCommunityHealthServiceArea.bind(this)
    this.setCurrentLatLng = this.setCurrentLatLng.bind(this)

  }

  handleHealthServiceArea(newValue: string) {
    this.setState({
      health_service_area: newValue
    })
  }

  setCurrentLatLng(latLng: LatLngExpression) {
    this.setState({
      currentLatLng: latLng
    })
  }

  fetchCommunityHealthServiceArea() {
    let currentLatLng = this.state.currentLatLng
    let latitude = currentLatLng.lat
    let longitude = currentLatLng.lng
    const urlTemplate = `http://localhost:8000/healthservicearea/?longitude=${longitude}&latitude=${latitude}`
    fetch(urlTemplate)
      .then(response => response.json())
      .then(data => {
        if(data.totalFeatures === 0){
          this.handleHealthServiceArea("INVALID LOCATION")
        } else {
          this.handleHealthServiceArea(data.features[0].properties.CMNTY_HLTH_SERV_AREA_NAME)
        }
      })
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Community Health Service Area
          </p>
          <div>{this.state.health_service_area}</div>
          <br/>
          <button onClick={this.fetchCommunityHealthServiceArea} > Get Community Health Service Area </button>
          <br/>
          <MapContainer style={{ height: '100vh', width: '100wh' }} center={[50.726669, -120.647621]} zoom={6} scrollWheelZoom={true} touchZoom={true}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <AddMarker setCurrentLatLng = {this.setCurrentLatLng} handleHealthServiceArea = {this.handleHealthServiceArea} />
          </MapContainer>
        </header>
      </div>
    );
  }
}

export default App;
