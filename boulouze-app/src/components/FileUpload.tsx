import React from 'react';
import axios from 'axios';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import './FileUpload.css';
import { IonImg } from '@ionic/react';
import { Product } from '../types/Product';


type Props = {
  product: Product | null,
  handleFinish: any,
  submitClicked: boolean
};
type State = {
  id?: number,
  fileUploaded: any,
  fileId: number,
  imagePreviewUrl: any,
  name: string,
  price: number,
  description: string
};
export class FileUpload extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      description: "",
      fileId: -1,
      fileUploaded: {},
      imagePreviewUrl: ''
    };
    if (props.product) {
      this.state = { ...this.state, ...props.product };
    }

    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.postProductData = this.postProductData.bind(this)
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.submitClicked && this.props.submitClicked !== prevProps.submitClicked) {
      this.handleSubmit();
    }
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

    console.log(file);
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

  handleSubmit() {
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
        if (res.status === 201)
          this.props.handleFinish();
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      })
  }

  render() {
    let $imagePreview = null
    if (this.state.imagePreviewUrl) {
      $imagePreview = (<IonImg src={this.state.imagePreviewUrl} alt="What you uploaded." />);
    }
    return (
      <div id="main-div">
        <form onSubmit={this.handleSubmit}>
          <div className="field column is-half">
            <label className="label">Nom du produit</label>
            <div className="control">
              <input className="input" type="text" placeholder="Nom du produit" name="name" onChange={this.handleNameChange} />
            </div>
          </div>
          <div className="field column is-half">
            <label className="label">Prix</label>
            <div className="control">
              <input className="input" type="text" placeholder="Prix" name="price" onChange={this.handlePriceChange} />
            </div>
          </div>
          <div className="field column is-half">
            <label className="label">Description</label>
            <div className="control">
              <textarea className="textarea" placeholder="Description" name="description" onChange={this.handleDescriptionChange}></textarea>
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
              <span className="file-name">{this.state.fileUploaded.name || "Nom du fichier"}</span>
            </label>
          </div>
          <div className="column">
            {$imagePreview}
          </div>
        </form>
      </div>
    );
  }
}
