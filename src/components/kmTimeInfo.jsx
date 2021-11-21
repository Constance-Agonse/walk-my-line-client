import React, { useState, useEffect } from 'react'

export default function KmTimeInfo(props) {
  const [km, setkm] = useState(0);
  const [hours, sethours] = useState(0);
  const [min, setmin] = useState(0);
//   const [respMapBox, setRespMapBox] = useState(); //not fast enough
let respMapBox;



    console.log("props in kmTime :")
    // console.log(props)
    const coordinates = props.journeyData.geometry;
    // console.log(coordinates)
    // // Format the coordinates
    const newCoords = coordinates[0].join(';');
    const radius = coordinates[0].map(() => 25);
    const radiuses = radius.join(';');


  const getMapMaptchingResp = async () => {
    try{
            const query = await fetch(        
        `https://api.mapbox.com/matching/v5/mapbox/walking/${newCoords}?steps=true&radiuses=${radiuses}&access_token=pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg`,
        { method: 'GET' }
    );
  
    const response = await query.json();
    console.log('respppp')
//   console.log(query)
    console.log(response)
//   setResponse(prev => prev = response)
    // setRespMapBox(prev => prev = response.matchings[0])  //not fast enough
    respMapBox = response.matchings[0]; //fonctionne pour les petits trajets mais si trop long alors beug car on demande le résultat avant de l'avoir
    conversion();
    } catch (err) {
        console.log("errooooor",err)
    }
    
  };

    useEffect(() => {   
        getMapMaptchingResp();        
    }, [])

    const conversion = () => {
        let time = respMapBox.distance;
        let distance = respMapBox.duration;
        console.log(respMapBox.legs[0].summary)
        const hoursNoRound = time/3600;
        
        sethours(prev => prev = Math.floor(hoursNoRound))
        setmin(prev => prev = Math.round((hoursNoRound - hours)*60)) //peut etre pas le temps de changer hours
        setkm(prev => prev =  distance/1000)
        // hours = Math.floor(hoursNoRound);
        // min = Math.round((hoursNoRound - hours)*60);
        console.log(`${hours} heure ${min} min`)
        // km = distance/1000;
        console.log(`${km.toFixed(2)} km`)
    }

    return (
        <>
            <p>{(km-1)<0 ? `${(km*1000).toFixed(0)}m` : `${km.toFixed(3)}km`}</p>
            <p>{hours ? `${hours}h${min}min` : `${min}min`}</p>
        </>
    )
}

