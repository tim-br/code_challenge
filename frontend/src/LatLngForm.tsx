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
      {props.invalidLatMsg !== '' ? <span> {props.invalidLatMsg} </span> : null}
      <br />
      <label>
        Longitude:
        <input type="text" value={props.currentLng} onChange={updateLng} />
      </label>
      {props.invalidLngMsg !== '' ? <span> {props.invalidLngMsg} </span> : null}
    </form>
  )
}

export default LatLngForm
