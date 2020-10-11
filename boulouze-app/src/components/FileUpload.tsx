import React from 'react';
import axios from 'axios';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import './FileUpload.css';

type Props = {};
type State = { fileUploaded: any, fileId: number, imagePreviewUrl: any, name: string, price: string, description: string }
export class FileUpload extends React.Component<Props, State> {
    constructor(props: any) {
      super(props);
      this.state = {
        name: "",
        price: "",
        description: "",
        fileId: -1,
        fileUploaded: {},
        imagePreviewUrl: ''
      };

      this.handleFileChange = this.handleFileChange.bind(this)
      this.handleNameChange = this.handleNameChange.bind(this)
      this.handlePriceChange = this.handlePriceChange.bind(this)
      this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.postProductData = this.postProductData.bind(this)
    }

    handleFileChange(event: any) {
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

    handleNameChange(event: any) {
        this.setState({
          name: event.target.value
        });
    }

    handlePriceChange(event: any) {
      this.setState({
        price: event.target.value
      });
    }

    handleDescriptionChange(event: any) {
      this.setState({
        description: event.target.value
      });
    }

    handleSubmit(event: any) {
      event.preventDefault()
      const formData = new FormData()
      formData.append('file', this.state.fileUploaded)
      console.log(this.state)
      axios.post("http://localhost:3000/upload-file", formData)
      .then((res: any) => {
        this.setState({
          fileId: res.data.id
        });
        this.postProductData();
      })
      .catch((err: any) => {
          console.log(err);
      })
    }

    postProductData() {
      axios.post("http://localhost:3000/post-product", { 
        fileId: this.state.fileId, 
        name: this.state.name, 
        price: this.state.price, 
        description: this.state.description
      })
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
      <div id="main-div">
        <form onSubmit={this.handleSubmit}>
        <div className="field column is-half">
          <label className="label">Nom du produit</label>
          <div className="control">
            <input className="input" type="text" placeholder="Text input" name="name" onChange={this.handleNameChange} />
          </div>
        </div>
        <div className="field column is-half">
          <label className="label">Prix</label>
          <div className="control">
            <input className="input" type="text" placeholder="Text input" name="price" onChange={this.handlePriceChange} />
          </div>
        </div>
        <div className="field column is-half">
          <label className="label">Description</label>
          <div className="control">
            <textarea className="textarea" placeholder="Textarea" name="description" onChange={this.handleDescriptionChange}></textarea>
          </div>
        </div>
        <div className="file column is-half">
          <label className="file-label">
              <input className="file-input" type="file" onChange={this.handleFileChange} /> 
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">
                  Choisir un fichier...
                </span>
              </span>
              <span className="file-name">Nom du fichier</span>       
          </label>
          </div>
          <div className="column is-half">
            {$imagePreview}
          </div>
          <div className="column is-half">
            <button className="button is-primary" type="submit">Enregistrer</button>
          </div>
        </form>
      </div>
      
      );
    }
  }


