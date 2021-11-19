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
    // accessing the image out of the ref
    // console.log(this.state.media)
    // if(genre === 'image') {
    //   const file = this.state.media.current.files[0]; // target the image file associated to the input[type=file]
    // }

    const uploadData = new FormData(); // create a form data => an object to send as post body
    console.log('genre :', genre)
    // appending the keys / values pairs to the FormData
    // uploadData.append("creator", creator);
    uploadData.append("title", title); // create a key [title] on the formDate
    uploadData.append("lat", lat);  // create a key [lat] on the formDate
    uploadData.append("long", long);  // create a key [long] on the formDate
    uploadData.append("description", description);  // create a key [description] on the formDate
    uploadData.append("url", url);  // create a key [url] on the formDate
    uploadData.append("genre", genre);  // create a key [genre] on the formDate
    // if(genre === 'image') {
    //   const file = this.state.media.current.files[0]; // target the image file associated to the input[type=file]
    //   uploadData.append("media", file);
    // }

    console.log('------------------------------')
    console.log(uploadData)
    console.log('******************************')
    for(let entry of uploadData.entries()) {
      console.log(entry[1])
    }
    console.log('------------------------------')
    try {
      
      await APIHandler.post("/api/pins", uploadData); // sending the formData
      // this.props.handler(); // passing the ball to the parent's callback
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

  render() {
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
          <div className="form-block">
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
          </div>
          </>
          }          
        <button>Submit!</button>
      </form>
    </div>


  )
  }
}
