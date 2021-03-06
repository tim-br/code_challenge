import React from 'react'
import './App.css'

interface Props {
  updateLat: Function
  updateLng: Function
  currentLat: string
  currentLng: string
  invalidLatMsg: string
  invalidLngMsg: string
}

const LatLngForm = (props: Props) => {
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
        <input type="text" value={props.currentLat} onChange={updateLat} />
      </label>
      {props.invalidLatMsg !== '' &&
      props.currentLat !== '' &&
      props.currentLat !== '-' ? (
        <div>
            <br/>
            <span className="error"> {props.invalidLatMsg} </span>
        </div>
      ) : null}
      <br />
      <label>
        Longitude:
        <input type="text" value={props.currentLng} onChange={updateLng} />
      </label>
      {props.invalidLngMsg !== '' &&
      props.currentLng !== '' &&
      props.currentLng !== '-' ? (
        <div>
            <br/>
            <span className="error"> {props.invalidLngMsg} </span>
        </div>

      ) : null}
    </form>
  )
}

export default LatLngForm
