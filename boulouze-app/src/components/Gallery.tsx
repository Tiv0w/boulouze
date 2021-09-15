import React from 'react';
import axios from 'axios';
import { IonGrid, IonImg, IonRow, IonCol, withIonLifeCycle, IonCardContent, IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';
import './Gallery.css';

type Product = {
  id: number,
  name: string,
  price: number,
  description: string,
  fileid: number
};
type Props = {};
type State = { imagesList: any, productsList: Product[] }
class Gallery extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      imagesList: {},
      productsList: []
    };

    this.getImagesList = this.getImagesList.bind(this);
  }

  componentDidMount() {
    this.getImagesList();
    this.getProductsList();
  }

  ionViewWillEnter() {
    this.getImagesList();
    this.getProductsList();
  }

  getProductsList() {
    axios.get('http://localhost:3000/list-products')
      .then((response) => {
        this.setState({
          productsList: response.data
        })
        console.log(this.state);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  getImagesList() {
    axios.get('http://localhost:3000/list-files')
      .then((response) => {
        this.setState({
          imagesList: Object.fromEntries(
            response.data.map((file: any) =>
              [file.id, 'http://localhost:3000/get-image?path=' + file.path]
            )
          )
        })
        console.log(this.state);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <IonGrid>
        <IonRow>
          {this.state.productsList.map((product, index) =>
            <IonCol sizeLg="4" size="12" key={index}>
              <IonCard key={index}>
                <IonImg
                  className="gallery-product-img"
                  src={this.state.imagesList[product.fileid]}
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
      </IonGrid>
    );
  }
}

export default withIonLifeCycle(Gallery);
