import './GalleryPage.css';
import React from 'react';
import Gallery from '../../components/Gallery/Gallery'
import {
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { add } from 'ionicons/icons';

const GalleryPage: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gallerie</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Gallery />
      </IonContent>
      <IonFab vertical="bottom" horizontal="end">
        <IonFabButton routerLink="/tab1" className="gallery-add-fab-button">
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default GalleryPage;

