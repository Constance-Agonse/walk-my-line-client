import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "./CreateSearchJourney.css";
import CreatePinJourney from "../components/CreatePinJourney";
import Hashtags from "../components/Hashtags";

import './CreateJourney2.css'
import { HomeRounded } from "@material-ui/icons";
import { PersonRounded } from "@material-ui/icons";

import APIHandler from "../api/APIHandler";

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



export default function CreateJourney2({ location }) {
  // console.log("location>>>",location)
  const creator = location.state.creator;
  const cityData = location.state.isSearchDone;
  //la ligne commenté ci dessous pourrait me permettre de gérer le pb de changement de view, lorsque l'on définit un trajet loin de notre point original on y revient et c'est relou donc il faut pas rentrer en dur les paramètres sauf si on les update avec un useeffect ou use state
  //   const [coordMapView, setCoordMapView] = useState([cityData.longitude,cityData.latitude,cityData.zoom])
  const [isPublic, setIsPublic] = useState(true);
  const [addTag, setAddTag] = useState([]);
  const [drawPointJourney, setDrawPointJourney] = useState([]);
  const [drawLineJourney, setDrawLineJourney] = useState([]);

  // State des pins (sélectionné ou non) à utiliser si on ne fait plus de radio button
  const [isText, setIsText] = useState(true);
  const [isAudio, setAudio] = useState(false);
  const [isVideo, setVideo] = useState(false);
  const [isImage, setImage] = useState(false);
  const [radioType, setRadioType] = useState("text");
  const [formIsVisibel, setFormIsVisibel] = useState(false);
  const [pinArray, setPinArray] = useState([])
/*
  req.body
{
  isPublic: false,
  tags: [ 'aa', 'ee', 'xxxxxxxxxxxxxxxxxxx' ],
  pins: [
    {
      id: '88e912b9693cd8d7e09a847c5a9518f4',
      type: 'Feature',
      properties: {},
      geometry: [Object],
      pinType: 'text'
    }
  ],
  creator: '61967029042d717b00ab24bd',
  journeyTime: 47,
  km: 47,
  isLikedBy: [],
  rate: 1.6363841450923011
}*/


  // console.log(location)
  const createJourney = async (e) => {
    console.log( "drawLineJourney.geometry.coordinates***************")

    console.log( drawLineJourney)
    console.log( drawLineJourney[0].geometry.coordinates[0][0])

    console.log( drawLineJourney[0].geometry.coordinates[0][1])
    console.log( "drawLineJourney.geometry.coordinates***************")

      const randomRate = Math.random() * 5;
      const journeyData = {
      isPublic: isPublic, 
      tags: addTag,            //a changer
      pins: pinArray, //checker si c'est une id
      creator:creator,
      journeyTime: 47,        //a changer
      km: 47,                 //a changer
      isLikedBy:[],
      rate:randomRate,         //bancale
      latInitial: drawLineJourney[0].geometry.coordinates[0][1], //on prend le premier point du trajet en reference du debut
      longInitial: drawLineJourney[0].geometry.coordinates[0][0],
      geometry : drawLineJourney[0].geometry.coordinates //on stocke les coordonées du trajet
    };
    
    try {      
      await APIHandler.post("/createSearchJourney", journeyData); // sending the formData
      // this.props.handler(); // passing the ball to the parent's callback
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
    //  console.log(features[0])
    //  console.log(features[0].geometry)
    //  console.log(features[0].geometry.type)
    //return console.log(">",payload);
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

  const handleChange = (e) => {
    setAddTag(e.target.value);
    // console.log("drawPointJourney", drawPointJourney);
    // console.log("drawLineJourney",drawLineJourney)
    // console.log("addTag",addTag)
  };
  console.log("drawPointJourney", drawPointJourney);
    console.log("drawLineJourney",drawLineJourney)

  //On doit create un tag dans la database en fonction du trajet ou l'on est ensuite on push le tag dans l'array de l' useState pour que on est plusieurs tag
  //ou alors on peut pusher tous les tags seulement lorsqu'on click sur done
  // j'ai d'abord essayé de pusher le addTag ( setAddTag([...addTag, addTag]) et setAddTag(oldArray => [...oldArray, addTag]);)
  // avec setaddtag mais ca remplacé la derniere valeur
  //a la place je créé un array en dhors de la fonction qui contient les tags que je push quand on est dans le submit
  //je vide ensuite le contenu de l'input
  //il me faut trouver un moyen de rerender une fois le handlesubmit terminé
  // lorsque l'utilisateur cliquera sur done ! je recup toutes les data pour en faire un create
  //SOLUTION IL FALLAIT ENLEVER LE HANDLE CHANGE
  
  const handleSubmitTag = (e) => {
    e.preventDefault();

    const newTag = e.target[0].value;
    setAddTag((oldState) => [...oldState, newTag])

    e.target[0].value = ""; //on enleve la valeur que l'on vient de marquer dans le input
  };

  /*********************Radio btn for pins*********************** */

  const onChangeRadio = (event) => {
    setRadioType(event.target.value);
  };
  /*********************Radio btn for pins*********************** */
  console.log('daaaaaaaaaaaaaaaaaaaaaa :', pinArray)
  return (
    <div id="blockcreatejourney2-container">
      <div id="blockcreatejourney2">
        <Map
          // mapboxApiAccessToken = "pk.eyJ1IjoiaHVnb3dhbGsiLCJhIjoiY2t2cjdnNmRnOG05cjJwcXd5bzdrcXNsMyJ9.V4USQMRev0gaQMP7zfrRlg"
          style="mapbox://styles/hugowalk/ckvyzg1n629ta15mvc49rx7ll"
          containerStyle={{
            height: "75vh",
            width: "100vw",
          }}
          // center={[coordMapView[0], coordMapView[1]]}
          // zoom={[coordMapView[2]]}
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

      <section id="menu-createjourney-2">
        <div className="nav-icone-container-journey2">
          <NavLink to="/">
            <HomeRounded  />
          </NavLink>
          <NavLink to="/profile">
            <PersonRounded />
          </NavLink>
        </div>
        <div id="pins-container">
          {/* <input type="radio" value="Video" name="pins" onChange={onChangeRadio}/> Video
                    <input type="radio" value="Audio" name="pins" onChange={onChangeRadio}/> Audio */}
          <input
            type="radio"
            value="image"
            name="pins"
            onChange={onChangeRadio}
          />{" "}
          Image
          <input
            type="radio"
            value="text"
            name="pins"
            onChange={onChangeRadio}
            checked="checked"
          />{" "}
          Text
        </div>
        <div className="feature-container-container2">
          <form onSubmit={handleSubmitTag}>
            <input
              className="input"
              id="addTag"
              type="text"
              name="addTagInput"
              placeholder="#AddTag"
              // onChange={handleChange}
            />
            <button id="plusbutton">+</button>
          </form>
          </div>
          <div className="feature-container-container2">
          <NavLink exact to="/profile"><button id="plusbutton" onClick={createJourney}>Done !</button></NavLink>

          <button id="plusbutton" onClick={() => setIsPublic((prev) => (prev = !prev))}>
            {isPublic ? "Public" : "Private"}
          </button>
        </div>
        {addTag.length ? (
          <div>
            {addTag.map((tag, index) => (
              <Hashtags key={index} text={tag}/>
            ))}
          </div>
        ) : (
          <div>
          <Hashtags text={"..."}/>
          </div>
        )}
        <div>
            {formIsVisibel && <CreatePinJourney setPinArray={setPinArray} pinArray={pinArray} isSubmit={setFormIsVisibel} genre={radioType} creator={creator} pinData={drawPointJourney[drawPointJourney.length-1]}/>}
        </div>
      </section>
    </div>
  );
}

/**************************************************radio pins */
// 
{
  /* <form onSubmitRadio={onSubmitRadio}>
                        <div className="radio">
                        <label>
                            <input
                            type="radio"
                            value="Audio"
                            checked={this.state.selectedOption === "Audio"}
                            onChange={onRadioValueChange}
                            />
                            Audio
                        </label>
                        </div>
                        <div className="radio">
                        <label>
                            <input
                            type="radio"
                            value="Video"
                            checked={this.state.selectedOption === "Video"}
                            onChange={onRadioValueChange}
                            />
                            Video
                        </label>
                        </div>
                        <div className="radio">
                        <label>
                            <input
                            type="radio"
                            value="Image"
                            checked={this.state.selectedOption === "Image"}
                            onChange={onRadioValueChange}
                            />
                            Image
                        </label>
                        <label>
                            <input
                            type="radio"
                            value="Text"
                            checked={this.state.selectedOption === "Text"}
                            onChange={onRadioValueChange}
                            />
                            Text
                        </label>
                        </div>
                        <div>
                        Selected option is : {this.state.selectedOption}
                        </div>
                        <button className="btn btn-default" type="submit">
                        Submit
                        </button>
                    </form> */
}
//                     const onRadioValueChange = () => {

// }
//     constructor() {
//     super();
//     this.state = {
//       name: "React"
//     };
//     this.onValueChange = this.onValueChange.bind(this);
//     this.formSubmit = this.formSubmit.bind(this);
//   }

//   onValueChange(event) {
//     this.setState({
//       selectedOption: event.target.value
//     });
//   }

//   formSubmit(event) {
//     event.preventDefault();
//     console.log(this.state.selectedOption)
//   }
