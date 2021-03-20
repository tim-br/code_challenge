import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { LatLngExpression } from "leaflet";
import { ReactComponent } from '*.svg';
import { parseJsonConfigFileContent } from 'typescript';

// function LocationMarker() {
//   const [position, setPosition] = useState(null)
//   const map = useMapEvents({
//     click(e) {
//       //map.locate()
//       setPosition(e.latlng)
//     },
//     locationfound(e) {
//       setPosition(e.latlng)
//       map.flyTo(e.latlng, map.getZoom())
//     },
//   })

//   return position === null ? null : (
//     <Marker position={position}>
//       <Popup>You are here</Popup>
//     </Marker>
//   )
// }

interface Props {
  handler: Function
}

const AddMarker = (props: Props) => {
  const [position, setPosition] = useState<null | LatLngExpression>();

  useMapEvents({
    click: (e) => {
      let latLngExp: LatLngExpression = e.latlng
      let latitude = latLngExp.lat
      let longitude = latLngExp.lng
      setPosition(latLngExp)
      const urlTemplate = `http://localhost:8000/myview/?longitude=${longitude}&latitude=${latitude}`
      fetch(urlTemplate)
        .then(response => response.json())
        .then(data => {
          if(data.totalFeatures === 0){
            props.handler("INVALID LOCATION")
          } else {
            props.handler(data.features[0].properties.CMNTY_HLTH_SERV_AREA_NAME)
          }
        })

      /* CODE TO ADD NEW PLACE TO STORE (check the source code) */
    },
  });

  if(position != null){
    return <Marker position={position}></Marker>
  } else {
    return <div></div>
  }
};

class App extends React.Component {

  state = { 
    someVar: "Click a location on the map to view your Community Health Service Area"
  }

  constructor(props: {} | Readonly<{}>) {
    super(props)

    this.handler = this.handler.bind(this)
  }

  handler(newValue: string) {
    this.setState({
      someVar: newValue
    })
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <MapContainer style={{ height: '100vh', width: '100wh' }} center={[50.726669, -120.647621]} zoom={6} scrollWheelZoom={true} touchZoom={true}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <Marker position={[53.726669, -127.647621]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker> */}
            <AddMarker handler = {this.handler} />
          </MapContainer>
          <p>
            Community Health Service Area
          </p>
          <div>{this.state.someVar}</div>
        </header>
      </div>
    );
  }
}

export default App;
