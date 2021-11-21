import React, { useState, useEffect } from 'react'


export default function CityCountry(props) {
    console.log("props",props)
  const [town, setTown] = useState("");
  const [country, setCountry] = useState("");


    const coordinates = props.journeyData.geometry[0];
    const latInitial = coordinates[0][0];
    const longInitial = coordinates[0][1];
    console.log("latInitial",latInitial)
    console.log("longInitial",longInitial)




    const getMapMaptchingResp = async () => {
    try{
            const query = await fetch(        
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${latInitial}%2C%20${longInitial}.json?access_token=pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg`,
        { method: 'GET' }
    );
  
    const response = await query.json();
    console.log('respppp')
//   console.log(query)
    // console.log(response.features[2].text)
    setTown(prev => prev = response.features[2].text)
    // console.log(response.features[4].text)
    setCountry(prev => prev = response.features[4].text)

//   setResponse(prev => prev = response)
    // setRespMapBox(prev => prev = response.matchings[0])  //not fast enough
    // respMapBox = response.matchings[0]; //fonctionne pour les petits trajets mais si trop long alors beug car on demande le résultat avant de l'avoir

    } catch (err) {
        console.log("errooooor",err)
    }
    
  };

    useEffect(() => {   
        getMapMaptchingResp();        
    }, [])

    return (
        <div>
            <h3 id="townName">{town}</h3>
                        <p>{country}</p>

                        {/* <h2>{town}</h2>
              <h3>{country}</h3> */}
        </div>
    )
}
