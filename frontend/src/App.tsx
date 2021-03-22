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
  init: boolean
}

class App extends React.Component<{}, State> {
  state = {
    health_service_area:
      'Click a location on the map to view your Community Health Service Area',
    currentLatLng: { lat: 50.726669, lng: -120.647621 },
    lastLatLng: { lat: 50.726669, lng: -120.647621 },
    currentLat: '50.726669',
    currentLng: '-120.647621',
    formEditing: false,
    map: null,
    invalidLatMsg: '',
    invalidLngMsg: '',
    init: true
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
      init: false
    })
    this.setState({
      currentLatLng: latLng,
      formEditing: false,
      invalidLatMsg: '',
      invalidLngMsg: ''
    })
  }

  setLastLatLng(latLng: LatLngExpression) {
    this.setState({
      init: false
    })
    this.setState({
      lastLatLng: latLng,
      formEditing: false,
      invalidLatMsg: '',
      invalidLngMsg: ''
    })
  }

  updateLat = (lat: string) => {
    if (lat !== null && lat !== '' && !Number.isNaN(parseFloat(lat))) {
      let latFloat = parseFloat(lat)
      let newCurrentLatLng = {
        lat: latFloat,
        lng: parseFloat(this.state.currentLng)
      }
      let nextLng = ''
      if (!Number.isNaN(newCurrentLatLng.lng)) {
        nextLng = newCurrentLatLng.lng.toString()
      }
      this.setState({
        currentLng: nextLng,
        currentLat: lat,
        currentLatLng: newCurrentLatLng,
        formEditing: true,
        invalidLatMsg: ''
      })
    } else {
      this.setState({
        currentLat: lat,
        formEditing: true,
        invalidLatMsg: INVALID_LAT_MSG
      })
    }
  }

  updateLng = (lng: string) => {
    this.setState({
      init: false
    })
    if (lng !== null && lng !== '' && !Number.isNaN(parseFloat(lng))) {
      let lngFloat = parseFloat(lng)
      let newCurrentLatLng = {
        lat: parseFloat(this.state.currentLat),
        lng: lngFloat
      }
      let nextLat = ''
      if (!Number.isNaN(newCurrentLatLng.lat)) {
        nextLat = newCurrentLatLng.lat.toString()
      }
      this.setState({
        currentLng: lng,
        currentLat: nextLat,
        currentLatLng: newCurrentLatLng,
        formEditing: true,
        invalidLngMsg: ''
      })
    } else {
      this.setState({
        currentLng: lng,
        formEditing: true,
        invalidLngMsg: INVALID_LNG_MSG
      })
    }
  }

  fetchCommunityHealthServiceArea() {
    this.setState({
      init: false
    })
    if (this.state.formEditing) {
      if (this.state.invalidLatMsg !== '' || this.state.invalidLngMsg !== '') {
        this.handleHealthServiceArea('INVALID LATITUDE OR LONGITUDE VALUE')
      } else {
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
      }
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
    let currentLat
    let currentLng
    if (this.state.formEditing) {
      currentLat = this.state.currentLat
      currentLng = this.state.currentLng
    } else {
      currentLat = this.state.currentLatLng.lat.toString()
      currentLng = this.state.currentLatLng.lng.toString()
    }
    return (
      <div className="App">
        <header className="App-header">
          <p>Community Health Service Area:</p>
          <div>{this.state.health_service_area}</div>
          <br />
          <LatLngForm
            invalidLatMsg={this.state.invalidLatMsg}
            invalidLngMsg={this.state.invalidLngMsg}
            currentLat={currentLat}
            currentLng={currentLng}
            updateLat={this.updateLat}
            updateLng={this.updateLng}
          />
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
              init={this.state.init}
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
