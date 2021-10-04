import './GalleryPage.css';
import React from 'react';
import Gallery from '../components/Gallery'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

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
    </IonPage>
  );
};

export default GalleryPage;

