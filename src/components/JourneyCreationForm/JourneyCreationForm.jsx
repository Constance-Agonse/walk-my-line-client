import React from "react";
import { Button as MuiButton, TextField } from '@material-ui/core';
import { Button } from '../ui';

import { Callout } from '../Callout';
import { Panel } from '../Panel';
import { Tags } from './Tags';
import APIHandler from "../../api/APIHandler";

import "./JourneyCreationForm.css";

export class JourneyCreationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      lat: this.props.pinData?.geometry.coordinates[1],
      long: this.props.pinData?.geometry.coordinates[0],
      description: "",
      url: "",
      genre: "image", // we assume only using this type
      creator: this.props.creator,
      media: React.createRef(), // create a reference to attach to the virtual DOM,
      isCalloutOpened: !this.props.pinData,
      isFinalizationFormOpened: false,
      selectedFile: null,
    };
  }

  componentDidUpdate(props) {
    if (this.props.pinData !== props.pinData) {
      this.setState({
        isCalloutOpened: !this.props.pinData,
        lat: this.props.pinData?.geometry.coordinates[1],
        long: this.props.pinData?.geometry.coordinates[0],
      })
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault(); // prevent the form to reload
    this.props.isSubmit(false)

    const { title, lat, long, description, url, genre } = this.state; //, creator

    const isImageUploaded = this.state.selectedFile !== null;

    if (isImageUploaded) {
      console.log('in image')
      const file = this.state.media.current.files[0]; // target the image file associated to the input[type=file]
      var uploadData = new FormData(); // create a form data => an object to send as post body
      uploadData.append("title", title); // create a key [title] on the formDate
      uploadData.append("lat", lat);  // create a key [lat] on the formDate
      uploadData.append("long", long);  // create a key [long] on the formDate
      uploadData.append("description", description);  // create a key [description] on the formDate
      uploadData.append("url", url);  // create a key [url] on the formDate
      uploadData.append("genre", genre);  // create a key [genre] on the formDate
      uploadData.append("media", file);
    }

    try {
      if (!isImageUploaded) {
        const resultat = await APIHandler.post("/api/pins/text", { title, lat, long, description, url, genre }); // sending the formData //
        this.props.setPinArray(old => [...old, resultat.data._id])
        this.setState({
          isCalloutOpened: true,
          selectedFile: null,
        })
      }
      else if (isImageUploaded) {
        const resultat = await APIHandler.post("/api/pins/image", uploadData); // sending the formData //{ title, lat, long, description, url, genre}
        this.props.setPinArray(old => [...old, resultat.data._id]);
        this.setState({
          isCalloutOpened: true,
          selectedFile: null,
        })
      }
    } catch (err) {
      console.error(err);
    }
  };

  renderPinForm = () => {
    if (this.state.isFinalizationFormOpened) {
      return null;
    }
    return (
      <Panel isHidable>
        <div className="JourneyCreationForm__pin-form">
          <p className="JourneyCreationForm__pin-form__desc">
            Please give more information to the place you've chosen on the map.
          </p>
          <div className="JourneyCreationForm__pin-form__desc__field">
            <TextField
              label="Place name"
              variant="standard"
              size="small"
              fullWidth
              onChange={(e) => {
                this.setState({
                  title: e.target.value,
                })
              }}
            />
          </div>
          <div className="JourneyCreationForm__pin-form__desc__field">
            <TextField
              label="Description"
              variant="standard"
              size="small"
              multiline
              maxRows={4}
              fullWidth
              onChange={(e) => {
                this.setState({
                  description: e.target.value,
                })
              }}
            />
          </div>
          <div className="JourneyCreationForm__pin-form__desc__field--media">
            <MuiButton
              variant="contained"
              component="label"
              fullWidth
            >
              <input
                name="media"
                type="file"
                onChange={(event) => {
                  this.setState({ selectedFile: event.target.files[0] });
                }}
                ref={this.state.media}
              />
            </MuiButton>
          </div>
        </div>
        <div className="JourneyCreationForm__actions">
          <Button type="outlined" onClick={this.handleSubmit}>
            Save place
          </Button>
        </div>
      </Panel>
    )
  }

  renderFinalizationForm = () => {
    return (
      <Panel>
        <div className="JourneyCreationForm__pin-form">
          <p className="JourneyCreationForm__pin-form__desc">
            What's left? Just put some info about this trip and we're good to go!
          </p>
          <div className="JourneyCreationForm__pin-form__desc__field">
            <TextField
              label="Trip name"
              variant="standard"
              size="small"
              fullWidth
              onChange={(e) => {
                this.setState({
                  title: e.target.value,
                })
              }}
            />
          </div>
          <div className="JourneyCreationForm__pin-form__desc__field">
            <TextField
              label="Description"
              variant="standard"
              size="small"
              multiline
              maxRows={4}
              fullWidth
              onChange={(e) => {
                this.setState({
                  description: e.target.value,
                })
              }}
            />
          </div>
          <div className="JourneyCreationForm__pin-form__desc__field">
            <Tags onChange={(tags) => {
              this.setState({
                tags,
              })
            }} />
          </div>
        </div>
        <div className="JourneyCreationForm__actions">
          <MuiButton variant="outlined" onClick={() => {
            this.props.createJourney({
              title: this.state.title,
              description: this.state.description,
              tags: this.state.tags,
            })
          }}>
            Submit my trip
          </MuiButton>
        </div>
      </Panel>
    )
  }

  render() {
    return (
      <div className="JourneyCreationForm">
        <div className="JourneyCreationForm__panel">
          {this.state.isCalloutOpened ? (
            <>
              <Callout
                text="Please choose the place you would like to register in this trip by using the map tools."
                onButtonClick={
                  this.props.pinArray.length > 0 ?
                    () => {
                      this.setState({
                        isFinalizationFormOpened: true,
                        isCalloutOpened: false,
                      })
                    }
                    : undefined
                }
                buttonText="Finalize the trip"
              />
            </>
          ) : this.renderPinForm()}
          {this.state.isFinalizationFormOpened && this.renderFinalizationForm()}
        </div>
      </div>
    )
  }
}