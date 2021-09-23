import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import './FileUpload.css';
import { IonImg, IonInput, IonLabel } from '@ionic/react';
import { Product } from '../types/Product';
import useStore from '../store';


type Props = {
  // product: Product | null,
  handleFinish: any,
  submitClicked: boolean
};
const FileUpload: React.FC<Props> = (props: Props) => {
  const product = useStore(state => state.product);
  const [name, setName] = useState<string>(product?.name || '');
  const [price, setPrice] = useState<number>(product?.price || 0);
  const [description, setDescription] = useState<string>(product?.description || '');
  const [fileId, setFileId] = useState<number>(product?.fileId || -1);
  const [fileUploaded, setFileUploaded] = useState<any>({});
  const [imagePreviewUrl, setImagePreviewUrl] = useState<any>('');


  // if (props.product) {
  //   setName(props.product.name);
  //   setPrice(props.product.price);
  //   setDescription(props.product.description);
  //   setFileId(props.product.fileId);
  // }

  useEffect(() => {
    if (product) {
      console.log(product);
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setFileId(product.fileId);
      // console.log(name);
    }
  }, [product, name]);


  useEffect(() => {
    if (props.submitClicked) {
      handleSubmit();
    }
  }, [props.submitClicked, handleSubmit]);


  // useEffect(() => {
  //   if (props.submitClicked) {
  //     handleSubmit();
  //   }
  // }, [props.submitClicked]);

  function handleFileChange(event: any) {
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      setFileUploaded(file);
      setImagePreviewUrl(reader.result);
    }
    reader.readAsDataURL(file);

    console.log(file);
  }

  function handleNameChange(event: any) {
    // console.log(event);
    setName(event.detail.value);
  }

  function handlePriceChange(event: any) {
    setPrice(event.target.value);
  }

  function handleDescriptionChange(event: any) {
    setDescription(event.target.value);
  }

  function handleSubmit() {
    const formData = new FormData()
    formData.append('file', fileUploaded)
    // console.log(this.state)
    axios.post("http://localhost:3000/upload-file", formData)
      .then((res: any) => {
        setFileId(res.data.id);
        postProductData();
      })
      .catch((err: any) => {
        console.log(err);
      })
  }

  function postProductData() {
    axios.post("http://localhost:3000/post-product", {
      fileId,
      name,
      price,
      description,
    })
      .then((res: any) => {
        if (res.status === 201)
          props.handleFinish();
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      })
  }

  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = (<IonImg src={imagePreviewUrl} alt="What you uploaded." />);
  }
  return (
    <div id="main-div">
      <form onSubmit={handleSubmit}>
        <div className="field column is-half">
          <label className="label">Nom du produit</label>
          <div className="control">
            <IonLabel className="label">Nom du produit</IonLabel>
            <IonInput
              // className="input"
              value={name}
              type="text"
              placeholder="Nom du produit"
              name="name"
              onIonChange={handleNameChange}
            />
          </div>
        </div>
        <div className="field column is-half">
          <label className="label">Prix</label>
          <div className="control">
            <input className="input" type="text" placeholder="Prix" name="price" onChange={handlePriceChange} />
          </div>
        </div>
        <div className="field column is-half">
          <label className="label">Description</label>
          <div className="control">
            <textarea className="textarea" placeholder="Description" name="description" onChange={handleDescriptionChange}></textarea>
          </div>
        </div>
        <div className="file column is-half">
          <label className="file-label">
            <input className="file-input" type="file" onChange={handleFileChange} />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">
                Choisir un fichier...
                </span>
            </span>
            <span className="file-name">{fileUploaded.name || "Nom du fichier"}</span>
          </label>
        </div>
        <div className="column">
          {$imagePreview}
        </div>
      </form>
    </div>
  );
}

export default FileUpload;
