import React from 'react'
import AddMarker from './AddMarker'
import LatLngForm from './LatLngForm'
import './App.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import { LatLngExpression, Map } from 'leaflet'

const OUTSIDE_OF_BC_ERROR_MSG =
  'INVALID LOCATION -- OUTSIDE OF BRITISH COLUMBIA'
const INVALID_LAT_MSG = 'invalid latitude, must be geographic coordinate'
const INVALID_LNG_MSG = 'invalid longitude, must be geographic coordinate'

interface State {
  health_service_area: string
  currentLatLng: LatLngExpression
  lastLatLng: LatLngExpression
  currentLat: string
  currentLng: string
  formEditing: boolean
  map: null | Map
  invalidLatMsg: string
  invalidLngMsg: string
}

class App extends React.Component<{}, State> {
  state = {
    health_service_area:
      'Click a location on the map to view your Community Health Service Area',
    currentLatLng: { lat: 0, lng: 0 },
    lastLatLng: { lat: 0, lng: 0 },
    currentLat: '',
    currentLng: '',
    formEditing: true,
    map: null,
    invalidLatMsg: '',
    invalidLngMsg: ''
  }

  constructor(props: {} | Readonly<{}>) {
    super(props)

    this.handleHealthServiceArea = this.handleHealthServiceArea.bind(this)
    this.fetchCommunityHealthServiceArea = this.fetchCommunityHealthServiceArea.bind(
      this
    )
    this.setCurrentLatLng = this.setCurrentLatLng.bind(this)
    this.setLastLatLng = this.setLastLatLng.bind(this)
    this.updateLat = this.updateLat.bind(this)
    this.updateLng = this.updateLng.bind(this)
  }

  handleHealthServiceArea(newValue: string) {
    this.setState({
      health_service_area: newValue
    })
  }

  setCurrentLatLng(latLng: LatLngExpression) {
    this.setState({
      currentLatLng: latLng,
      formEditing: false
    })
  }

  setLastLatLng(latLng: LatLngExpression) {
    this.setState({
      lastLatLng: latLng,
      formEditing: false
    })
  }

  updateLat = (lat: string) => {
    if (lat !== null && lat !== '') {
      let latFloat = parseFloat(lat)
      if (Number.isNaN(latFloat)) {
        this.setState({
          currentLat: lat,
          currentLng: this.state.currentLatLng.lng.toString(),
          formEditing: true,
          invalidLatMsg: INVALID_LAT_MSG
        })
      } else {
        let newCurrentLatLng = {
          lat: latFloat,
          lng: this.state.currentLatLng.lng
        }
        this.setState({
          currentLng: this.state.currentLatLng.lng.toString(),
          currentLat: lat,
          currentLatLng: newCurrentLatLng,
          formEditing: true
        })
      }
    } else {
      this.setState({
        currentLat: lat,
        currentLng: this.state.currentLatLng.lng.toString(),
        formEditing: true,
        invalidLatMsg: INVALID_LAT_MSG
      })
    }
  }

  updateLng = (lng: string) => {
    console.log('update lng')
    if (lng !== null && lng !== '') {
      let lngFloat = parseFloat(lng)
      if (Number.isNaN(lngFloat)) {
        console.log('is nan')
        this.setState({
          currentLng: lng,
          currentLat: this.state.currentLatLng.lat.toString(),
          formEditing: true,
          invalidLngMsg: INVALID_LNG_MSG
        })
      } else {
        let newCurrentLatLng = {
          lat: this.state.currentLatLng.lat,
          lng: lngFloat
        }
        this.setState({
          currentLng: lng,
          currentLat: this.state.currentLatLng.lat.toString(),
          currentLatLng: newCurrentLatLng,
          formEditing: true
        })
      }
    } else {
      this.setState({
        currentLng: lng,
        currentLat: this.state.currentLatLng.lat.toString(),
        formEditing: true,
        invalidLngMsg: INVALID_LNG_MSG
      })
    }
  }

  fetchCommunityHealthServiceArea() {
    if (this.state.formEditing) {
      this.setState({ lastLatLng: this.state.currentLatLng })
      let currentLatLng = this.state.currentLatLng
      let latitude = currentLatLng.lat
      let longitude = currentLatLng.lng
      const urlTemplate = `http://localhost:8000/healthservicearea/?longitude=${longitude}&latitude=${latitude}`
      fetch(urlTemplate)
        .then(response => response.json())
        .then(data => {
          if (data.totalFeatures === 0) {
            this.handleHealthServiceArea(OUTSIDE_OF_BC_ERROR_MSG)
          } else {
            this.handleHealthServiceArea(
              data.features[0].properties.CMNTY_HLTH_SERV_AREA_NAME
            )
          }

          // flyto marker -- but don't flyto if selected point is outside of bc
          if (
            this.state.map !== null &&
            this.state.health_service_area !== OUTSIDE_OF_BC_ERROR_MSG
          ) {
            this.state.map.flyTo(this.state.currentLatLng, 12, {
              animate: true,
              duration: 1.5
            })
          }
        })
    } else {
      let currentLatLng = this.state.currentLatLng
      let latitude = currentLatLng.lat
      let longitude = currentLatLng.lng
      const urlTemplate = `http://localhost:8000/healthservicearea/?longitude=${longitude}&latitude=${latitude}`
      fetch(urlTemplate)
        .then(response => response.json())
        .then(data => {
          if (data.totalFeatures === 0) {
            this.handleHealthServiceArea(OUTSIDE_OF_BC_ERROR_MSG)
          } else {
            this.handleHealthServiceArea(
              data.features[0].properties.CMNTY_HLTH_SERV_AREA_NAME
            )
          }

          // flyto marker -- but don't flyto if selected point is outside of bc
          if (
            this.state.map !== null &&
            this.state.health_service_area !== OUTSIDE_OF_BC_ERROR_MSG
          ) {
            this.state.map.flyTo(this.state.currentLatLng, 12, {
              animate: true,
              duration: 1.5
            })
          }
        })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Community Health Service Area</p>
          <div>{this.state.health_service_area}</div>
          <br />
          {this.state.formEditing ? (
            <LatLngForm
              invalidLatMsg={this.state.invalidLatMsg}
              invalidLngMsg={this.state.invalidLngMsg}
              currentLat={this.state.currentLat}
              currentLng={this.state.currentLng}
              updateLat={this.updateLat}
              updateLng={this.updateLng}
            />
          ) : (
            <LatLngForm
              invalidLatMsg={this.state.invalidLatMsg}
              invalidLngMsg={this.state.invalidLngMsg}
              currentLat={this.state.currentLatLng.lat.toString()}
              currentLng={this.state.currentLatLng.lng.toString()}
              updateLat={this.updateLat}
              updateLng={this.updateLng}
            />
          )}
          <br />
          <button onClick={this.fetchCommunityHealthServiceArea}>
            {' '}
            Get Community Health Service Area{' '}
          </button>
          <br />
          <MapContainer
            style={{ height: '100vh', width: '100wh' }}
            center={[50.726669, -120.647621]}
            zoom={6}
            scrollWheelZoom={true}
            touchZoom={true}
            whenCreated={map => this.setState({ map })}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <AddMarker
              formEditing={this.state.formEditing}
              lastLatLng={this.state.lastLatLng}
              latLng={this.state.currentLatLng}
              setCurrentLatLng={this.setCurrentLatLng}
              setLastLatLng={this.setLastLatLng}
              handleHealthServiceArea={this.handleHealthServiceArea}
            />
          </MapContainer>
        </header>
      </div>
    )
  }
}

export default App
