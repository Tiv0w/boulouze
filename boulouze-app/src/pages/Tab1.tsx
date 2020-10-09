import './Tab1.css';
import React, { useState } from 'react';
import { FileUpload } from '../components/FileUpload'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';

const Tab1: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Enregistrer un produit</IonTitle>
        </IonToolbar>
      </IonHeader>
      <FileUpload />
      <IonContent>
     
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
