import React from 'react';
import SimpleMap from './SimpleMap';
import { useState } from 'react';
import axios from "axios";

function App() {
   // new line start
   const [profileData, setProfileData] = useState(null)

   function getHumidityDailyAvg() {
     axios({
       method: "GET",
       url:"/forecast/humidityDailyAvg",
     })
     .then((response) => {
       const res =response.data
       setProfileData(({
         humidity: res.humidity}))
     }).catch((error) => {
       if (error.response) {
         console.log(error.response)
         console.log(error.response.status)
         console.log(error.response.headers)
         }
     })}

  return (
    <div>
      <h1>My Leaflet.js and React Map</h1>
      {/* <SimpleMap /> */}
      <p>To get your profile details: </p><button onClick={getHumidityDailyAvg}>Click me</button>
        {profileData && <div>
              <p>Profile name: {profileData.humidity}</p>
            </div>
        }
    </div>
  );
}
export default App;