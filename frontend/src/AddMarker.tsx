import { LatLngExpression } from 'leaflet'
import { Marker, useMapEvents } from 'react-leaflet'

interface Props {
  handleHealthServiceArea: Function
  setLastLatLng: Function
  setCurrentLatLng: Function
  latLng: LatLngExpression
  lastLatLng: LatLngExpression
  formEditing: boolean
  init: boolean
}

const AddMarker = (props: Props) => {
  useMapEvents({
    click: e => {
      let latLngExp: LatLngExpression = e.latlng
      props.setLastLatLng(latLngExp)
      props.setCurrentLatLng(latLngExp)
    }
  })
  return (
    <div>
      {!props.init ? (
        props.formEditing ? (
          <Marker position={props.lastLatLng} />
        ) : (
          <Marker position={props.latLng} />
        )
      ) : null}
    </div>
  )
}

export default AddMarker
