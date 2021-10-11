import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './FileUpload.css';
import { IonImg, IonInput, IonItem, IonLabel, IonTextarea } from '@ionic/react';
import useStore from '../../store';
import FileInput from '../FileInput/FileInput';


type Props = {
    handleFinish: any,
    handleBadRequest: any,
    submitClicked: boolean
};

const FileUpload: React.FC<Props> = (props: Props) => {
    const product = useStore(state => state.product);
    const [name, setName] = useState<string>(product?.name || '');
    const [price, setPrice] = useState<number | null>(product?.price || null);
    const [description, setDescription] = useState<string>(product?.description || '');
    const [fileId, setFileId] = useState<number>(product?.fileId || -1);
    const [fileUploaded, setFileUploaded] = useState<any>({});
    const [imagePreviewUrl, setImagePreviewUrl] = useState<any>('');


    useEffect(() => {
        if (product) {
            console.log(product);
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setFileId(product.fileId);
        }
    }, [product, name]);


    const postProductData = useCallback(() => {
        axios.post("http://localhost:3000/post-product", {
            fileId,
            name,
            price,
            description,
        })
            .then((res: any) => {
                if (res.status === 201)
                    props.handleFinish();
            })
            .catch((err: any) => {
                if (err.response.status === 400)
                    props.handleBadRequest();
            });
    }, [fileId, name, price, description, props]);


    const handleSubmit = useCallback(() => {
        const formData = new FormData();
        formData.append('file', fileUploaded);
        axios.post("http://localhost:3000/upload-file", formData)
            .then((res: any) => {
                setFileId(res.data.id);
                postProductData();
            })
            .catch((err: any) => {
                console.log(err);
            });
    }, [fileUploaded, postProductData]);

    useEffect(() => {
        if (props.submitClicked) {
            handleSubmit();
        }
    }, [props.submitClicked, handleSubmit]);


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
        setName(event.detail.value);
    }

    function handlePriceChange(event: any) {
        setPrice(event.target.value);
    }

    function handleDescriptionChange(event: any) {
        setDescription(event.target.value);
    }

    return (
        <div id="main-div">
            <form>
                <IonItem>
                    <IonLabel // className="label"
                        position="floating">Nom du produit</IonLabel>
                    <IonInput
                        // className="input"
                        value={name}
                        type="text"
                        placeholder="Nom du produit"
                        name="name"
                        onIonChange={handleNameChange}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Prix</IonLabel>
                    <IonInput
                        value={price}
                        type="number"
                        placeholder="prix"
                        name="price"
                        onIonChange={handlePriceChange}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Description</IonLabel>
                    <IonTextarea
                        value={description}
                        autoGrow
                        placeholder="Description"
                        name="description"
                        onIonChange={handleDescriptionChange}
                    />
                </IonItem>

                <FileInput handleFileChange={handleFileChange} fileUploadedName={fileUploaded?.name} />
                {
                    imagePreviewUrl ?
                        (<div className="column">
                            <IonImg src={imagePreviewUrl} alt="What you uploaded." />
                        </div>) : null
                }
            </form>
        </div>
    );
}

export default FileUpload;
