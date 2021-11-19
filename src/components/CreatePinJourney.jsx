import React, { Component } from "react";
import APIHandler from "../api/APIHandler";
import { NavLink } from "react-router-dom";
import "./../pages/Form.css"
export default class CreatePinJourney extends Component {

  // using the constructor form to associate a ref
  constructor(props) {
    super(props); 

    this.state = {
      title: "",
      lat: this.props.pinData.geometry.coordinates[1],
      long: this.props.pinData.geometry.coordinates[0],
      description: "",
      url: "http://google.com",
      genre: this.props.genre,
      creator: this.props.creator, 
      media: React.createRef(), // create a reference to attach to the virtual DOM,
    };
  }


  handleSubmit = async (e) =>  {
    e.preventDefault(); // prevent the form to reload
    // destructuring the state
    this.props.isSubmit(false)
    console.log("this",this)

    const { title, lat, long, description, url, genre} = this.state; //, creator
    
    if(genre ==='image'){
      console.log('in image')

      const file = this.state.media.current.files[0]; // target the image file associated to the input[type=file]
    // }

    var uploadData = new FormData(); // create a form data => an object to send as post body
    // uploadData.append("creator", creator);
    uploadData.append("title", title); // create a key [title] on the formDate
    uploadData.append("lat", lat);  // create a key [lat] on the formDate
    uploadData.append("long", long);  // create a key [long] on the formDate
    uploadData.append("description", description);  // create a key [description] on the formDate
    uploadData.append("url", url);  // create a key [url] on the formDate
    uploadData.append("genre", genre);  // create a key [genre] on the formDate
    uploadData.append("media", file);

    
    }

    

    // console.log('------------------------------')
    // console.log(uploadData)
    // console.log('******************************')
    // for(let entry of uploadData.entries()) {
    //   console.log(entry[1])
    // }
    // console.log('------------------------------')
    try {
      if(genre ==='text'){
        const resultat = await APIHandler.post("/api/pins/text", { title, lat, long, description, url, genre} ); // sending the formData //
        
        
        this.props.setPinArray(old => [...old, resultat.data._id])

//         console.log(resultat.data._id)
//         let tmp = [...this.state.pinArray, ]
//         console.log('tmp: ',tmp)
// console.log('state: ', this.state.pinArray)
//         tmp.push(resultat.data._id)
//         this.setState({pinArray: tmp})
//         console.log(this.state.pinArray)
       
      }
      else if(genre ==='image'){
        const resultat = await APIHandler.post("/api/pins/image", uploadData ); // sending the formData //{ title, lat, long, description, url, genre}
        // this.setState({pinArray: [...this.state.pinArray, resultat.data._id]}, () => console.log(this.state.pinArray))
        this.props.setPinArray(old => [...old, resultat.data._id])
        
        // this.state.pinArray.push(resultat.data._id);
      }
      
      // this.props.handler(); // passing the ball to the parent's callback
      // console.log("resultat >>>>>>>")
      // console.log(resultat)

      // console.log("this.state.pinArray >>>>");
      // console.log(this.state.pinArray)
      // this.state.pinArray.push(resultat.data._id); //on ajoute l'id au tableau pour le transmettre plus tard
      // console.log(this.state.pinArray)            
    } catch (err) {
      console.error(err);
    }
  };

  handleChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log('props >>>')
    console.log(this.props)
  }; 
  componentWillUnmount() {
    console.log('unmounting')
  }
  render() {
    console.log('>>>>>>>',this.state.pinArray)
    return (
    <div className="form-page">
      <form className="form" 
      onSubmit={this.handleSubmit}>
          {/* <div className="form-block">
            <label className="label" htmlFor="creator">
              creator
            </label>
            <input
              className="input"
              id="creator"
              type="text"
              placeholder="creator"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div> */}
          <div className="form-block">
            <label className="label" htmlFor="title">
              title
            </label>
            <input
              className="input"
              id="title"
              type="text"
              placeholder="title"
              name="title"
              onChange={this.handleChange}
            />
          </div>
          {/* <div className="form-block">
            <label className="label" htmlFor="rating">
              rating
            </label>
            <input
              className="input"
              id="rating"
              type="number"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-block">
            <label className="label" htmlFor="lat">
              lat
            </label>
            <input
              className="input"
              id="lat"
              type="number"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-block">
            <label className="label" htmlFor="long">
              long
            </label>
            <input
              className="input"
              id="long"
              type="number"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div> */}
          <div className="form-block">
            <label className="label" htmlFor="description">
              description
            </label>
            <input
              className="input"
              id="description"
              type="string"
              name="description"
              placeholder="description"
              // value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          {this.props.genre === 'image' &&
          <>
          <div className="form-block">
            <label className="label" htmlFor="media">
              media
            </label>
            <input
              ref={this.state.media}
              name="media"
              type="file" />

          </div> 
          {/* <div className="form-block">
            <label className="label" htmlFor="genre">
              genre
            </label>
            <input
              className="input"
              id="genre"
              type="string"
              value={this.props.genre}
              onChange={this.handleChange}
            />
          </div> */}
          </>
          }          
        <button>Submit!</button>
      </form>
    </div>


  )
  }
}
