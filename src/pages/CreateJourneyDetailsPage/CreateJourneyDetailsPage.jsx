import React, { useState } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import { useHistory } from "react-router-dom";

import APIHandler from "../../api/APIHandler";
import { JourneyCreationForm } from "../../components/JourneyCreationForm/JourneyCreationForm";

import "./CreateJourneyDetailsPage.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg",
});

// **************************DRAW CUSTOM*****************************************//

// Pour avoir seulement certain outils je custom ma drawbar
const controls = {
  point: true,
  line_string: true,
  trash: true,
  combine_features: false,
  uncombine_features: false,
  polygon: false,
};
const styles = [
  // Set the line style for the user-input coordinates.
  {
    id: "gl-draw-line",
    type: "line",
    filter: ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#438EE4",
      "line-dasharray": [0.2, 2],
      "line-width": 7,
      "line-opacity": 0.7,
    },
  },
  // Style the vertex point halos.
  {
    id: "gl-draw-polygon-and-line-vertex-halo-active",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"],
    ],
    paint: {
      "circle-radius": 12,
      "circle-color": "#FFF",
    },
  },
  // Style the vertex points.
  {
    id: "gl-draw-polygon-and-line-vertex-active",
    type: "circle",
    filter: [
      "all",
      ["==", "meta", "vertex"],
      ["==", "$type", "Point"],
      ["!=", "mode", "static"],
    ],
    paint: {
      "circle-radius": 8,
      "circle-color": "#ffb703", //ffb703 //438EE4
    },
  },
  {
    id: "highlight-active-points",
    type: "circle",
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["==", "meta", "feature"],
      ["==", "active", "true"],
    ],
    paint: {
      "circle-radius": 8,
      "circle-color": "#ffb703",
    },
  },
  {
    id: "points-are-blue",
    type: "circle",
    filter: [
      "all",
      ["==", "$type", "Point"],
      ["==", "meta", "feature"],
      ["==", "active", "false"],
    ],
    paint: {
      "circle-radius": 8,
      "circle-color": "#219ebc",
    },
  },
];
// **************************DRAW CUSTOM*****************************************//



export const CreateJourneyDetailsPage = ({ location }) => {
  const history = useHistory();
  console.log(">>loca>>", location)
  const creator = location.state.creator;
  const cityData = location.state.searchParams;
  //la ligne commenté ci dessous pourrait me permettre de gérer le pb de changement de view, lorsque l'on définit un trajet loin de notre point original on y revient et c'est relou donc il faut pas rentrer en dur les paramètres sauf si on les update avec un useeffect ou use state
  //   const [coordMapView, setCoordMapView] = useState([cityData.longitude,cityData.latitude,cityData.zoom])
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [addTag, setAddTag] = useState([]);
  const [drawPointJourney, setDrawPointJourney] = useState([]);
  const [drawLineJourney, setDrawLineJourney] = useState([]);

  const [radioType, setRadioType] = useState("text");
  const [formIsVisibel, setFormIsVisibel] = useState(false);
  const [pinArray, setPinArray] = useState([])

  // console.log(location)
  const createJourney = async (journeyCreationFormData) => {
    console.log("drawLineJourney.geometry.coordinates***************")

    console.log(drawLineJourney)
    console.log(drawLineJourney[0].geometry.coordinates[0][0])

    console.log(drawLineJourney[0].geometry.coordinates[0][1])
    console.log("drawLineJourney.geometry.coordinates***************")

    const randomRate = Math.random() * 5;
    const journeyData = {
      name: journeyCreationFormData.title,
      description: journeyCreationFormData.description,
      isPublic: isPublic,
      tags: journeyCreationFormData.tags,            //a changer
      pins: pinArray, //checker si c'est une id
      creator: creator,
      journeyTime: 47,        //a changer
      km: 47,                 //a changer
      isLikedBy: [],
      rate: randomRate,         //bancale
      latInitial: drawLineJourney[0].geometry.coordinates[0][1], //on prend le premier point du trajet en reference du debut
      longInitial: drawLineJourney[0].geometry.coordinates[0][0],
      geometry: drawLineJourney[0].geometry.coordinates //on stocke les coordonées du trajet
    };

    try {
      await APIHandler.post("/createSearchJourney", journeyData); // sending the formData
      // this.props.handler(); // passing the ball to the parent's callback
      history.push('/profile');
    } catch (err) {
      console.error(err);
    }
  }



  const onDrawCreate = (payload) => {
    const feature = { ...payload.features[0] };
    if (feature.geometry.type === "Point") {

      feature.pinType = radioType;
      setDrawPointJourney((oldState) => [...oldState, feature]); // on ajoute au state la nouvelle valeur
      setFormIsVisibel(true);

    } else if (feature.geometry.type === "LineString") {

      setDrawLineJourney((oldState) => [...oldState, feature]);

    } else {
      console.log("pas de point pas de line ?");
    }
  };

  const onDrawUpdate = (payload) => {
    const feature = { ...payload.features[0] };
    if (feature.geometry.type === "Point") {
      feature.pinType = radioType;
      setDrawPointJourney((oldState) => [...oldState, feature]);
    } else if (feature.geometry.type === "LineString") {
      setDrawLineJourney((oldState) => [...oldState, feature]);
    } else {
      console.log("pas de point pas de line ?");
    }
  };

  //on renvoie un array qui contient les pins sans celui qui a été supprimé
  //Pour le moment je ne gere pas le delete des chemins à faire en bonus
  const onDrawDelete = (e) => {
    let idToDelete = e.features[0].id;
    // console.log(e.features[0].geometry.type)
    if (e.features[0].geometry.type === "Point") {
      setDrawPointJourney((currentState) => {
        const x = currentState.filter((el) => {
          return el.id !== idToDelete;
        });
        return x;
      });
    }
  };

  //On doit create un tag dans la database en fonction du trajet ou l'on est ensuite on push le tag dans l'array de l' useState pour que on est plusieurs tag
  //ou alors on peut pusher tous les tags seulement lorsqu'on click sur done
  // j'ai d'abord essayé de pusher le addTag ( setAddTag([...addTag, addTag]) et setAddTag(oldArray => [...oldArray, addTag]);)
  // avec setaddtag mais ca remplacé la derniere valeur
  //a la place je créé un array en dhors de la fonction qui contient les tags que je push quand on est dans le submit
  //je vide ensuite le contenu de l'input
  //il me faut trouver un moyen de rerender une fois le handlesubmit terminé
  // lorsque l'utilisateur cliquera sur done ! je recup toutes les data pour en faire un create
  //SOLUTION IL FALLAIT ENLEVER LE HANDLE CHANGE

  const handleSubmitTag = (newTag) => {
    setAddTag((oldState) => [...oldState, newTag])
  };
  
  return (
    <div id="CreateJourneyDetailsPage">
      <div id="blockcreatejourney2">
        <Map
          style="mapbox://styles/hugowalk/ckvyzg1n629ta15mvc49rx7ll"
          containerStyle={{
            height: "100vh",
          }}
          center={[cityData.longitude, cityData.latitude]}
          zoom={[cityData.zoom]}
        >
          <DrawControl
            onDrawCreate={onDrawCreate}
            onDrawUpdate={onDrawUpdate}
            onDrawDelete={onDrawDelete}
            id="drawcontrol"
            position="top-right"
            controls={controls}
            styles={styles}
          />
        </Map>
      </div>

      <JourneyCreationForm
        setPinArray={setPinArray}
        pinArray={pinArray}
        isSubmit={setFormIsVisibel}
        genre={radioType}
        creator={creator}
        pinData={drawPointJourney[drawPointJourney.length - 1]}
        createJourney={createJourney}
      />
    </div>
  );
}