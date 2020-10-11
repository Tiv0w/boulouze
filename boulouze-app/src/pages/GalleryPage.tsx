import './GalleryPage.css';
import React, { useState } from 'react';
import Gallery  from '../components/Gallery'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, withIonLifeCycle } from '@ionic/react';

const GalleryPage: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Enregistrer un produit</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Gallery />
      </IonContent>
    </IonPage>
  );
};

export default GalleryPage;

