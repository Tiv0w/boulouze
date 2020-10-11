import React from 'react';
import axios from 'axios';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonGrid, IonImg, IonRow, IonCol, withIonLifeCycle, IonCardContent, IonCard } from '@ionic/react';
import './Gallery.css';

type Props = {};
type State = { imagesList: string[] }
class Gallery extends React.Component<Props, State> {
    constructor(props: any) {
      super(props);
      this.state = {
        imagesList: []
      };

      this.getImagesList = this.getImagesList.bind(this);
    }

    componentDidMount() {
      this.getImagesList();
    }

    ionViewWillEnter() {
      this.getImagesList();
      console.log('ion view lalal');
    }

    getImagesList() {
      axios.get('http://localhost:3000/list-files')
        .then((response) => {
          this.setState({
            imagesList: response.data.map((file: any) => 'http://localhost:3000/get-image?path=' + file.path)
          })
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
              { this.state.imagesList.map((img: string, index: number) => 
                  
                      <IonCol size="3">
                          <IonCard className="img-container" key={index}>
                                  <IonCardContent>
                                      <IonImg src={img} />
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