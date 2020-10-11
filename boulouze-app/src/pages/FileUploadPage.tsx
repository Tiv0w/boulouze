import './FileUploadPage.css';
import React, { useState } from 'react';
import { FileUpload } from '../components/FileUpload'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, withIonLifeCycle } from '@ionic/react';

const FileUploadPage: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Enregistrer un produit</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <FileUpload />
      </IonContent>
    </IonPage>
  );
};

export default FileUploadPage;
