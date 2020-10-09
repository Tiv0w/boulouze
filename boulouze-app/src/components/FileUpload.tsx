import React from 'react';
import axios from 'axios';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'react-bulma-components/dist/react-bulma-components.min.css';

type Props = {};
type State = { fileUploaded: any, imagePreviewUrl: any}
export class FileUpload extends React.Component<Props, State> {
    constructor(props: any) {
      super(props);
      this.state = {
        fileUploaded: {},
        imagePreviewUrl: ''
      };

      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event: any) {
        // console.log(event.target)
        // this.setState({fileUploaded: event.target.files[0]})

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        fileUploaded: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
    }

    handleSubmit(event: any) {
      event.preventDefault()
      const formData = new FormData()
      formData.append('file', this.state.fileUploaded)
      console.log(formData);
      axios.post("http://localhost:3000/upload-file", formData)
      .then((res: any) => {
          console.log(res);
      })
      .catch((err: any) => {
          console.log(err);
      })
    }
  
    render() {
      let $imagePreview = null
      if (this.state.imagePreviewUrl) {
        $imagePreview = (<img src={this.state.imagePreviewUrl} alt="What you uploaded."/>);
      }
      return (
      <form onSubmit={this.handleSubmit}>
        <div className="file">
        <label className="file-label">
          Name:
          <input className="file-input" type="file" onChange={this.handleChange} /> 
          <span className="file-cta">
      <span className="file-icon">
        <i className="fas fa-upload"></i>
      </span>
      <span className="file-label">
        Choose a file…
      </span>
    </span>       
        </label>
        </div>
        {$imagePreview}
        <button className="button is-primary" type="submit">Upload</button>
      </form>
      );
    }
  }


