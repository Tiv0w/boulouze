import React, { useState } from 'react';
import axios from 'axios';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonImg,
  IonRow,
  useIonViewWillEnter,
} from '@ionic/react';
import { pencil } from 'ionicons/icons';
import './Gallery.css';
import { Product } from '../types/Product';
import useStore from '../store';


type Props = {};
const Gallery: React.FC<Props> = () => {
  const [imagesList, setImagesList] = useState<{ [index: number]: string }>({});
  const [productsList, setProductsList] = useState<Product[]>([]);
  const setProduct: ((_: Product) => void) = useStore(state => state.setProduct);

  useIonViewWillEnter(() => {
    getImagesList();
    getProductsList();
  });

  const editProduct = (product: Product) => {
    console.log(product);
    setProduct(product);
  };

  const getProductsList = () => {
    axios.get('http://localhost:3000/list-products')
      .then((response) => {
        setProductsList(response.data)
        console.log('productsList:', productsList);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const getImagesList = () => {
    axios.get('http://localhost:3000/list-files')
      .then((response) => {
        setImagesList(
          Object.fromEntries(response.data.map((file: any) =>
            [file.id, 'http://localhost:3000/get-image?path=' + file.path]
          ))
        )
        console.log(imagesList);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  return (
    <IonGrid>
      <IonRow>
        {productsList.map((product, index) =>
          <IonCol sizeLg="4" size="12" key={index}>
            <IonCard key={index}>
              <IonFab vertical="top" horizontal="end">
                <IonFabButton
                  onClick={() => editProduct(product)}
                  className="gallery-card-fab-button"
                  size="small"
                  color="light"
                >
                  <IonIcon icon={pencil} />
                </IonFabButton>
              </IonFab>
              <IonImg
                className="gallery-product-img"
                src={imagesList[product.fileId]}
              />
              <IonCardHeader>
                <IonCardTitle>{product.name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {product.description}
              </IonCardContent>
            </IonCard>
          </IonCol>
        )}
      </IonRow>
    </IonGrid >
  );
};


export default Gallery;
