import './FileUploadPage.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { FileUpload } from '../components/FileUpload'
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSpinner,
  useIonToast,
} from '@ionic/react';
import { add } from 'ionicons/icons';


const FileUploadPage: React.FC = () => {
  const [submitClicked, clickSubmit] = useState(false);
  const [displayToast] = useIonToast();
  const history = useHistory();

  function handleFinish() {
    clickSubmit(false);
    displayToast('Votre produit a bien été enregistré !', 3000);
    history.push('/tab2');
  };

  function handleSubmit() {
    clickSubmit(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Enregistrer un produit</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <FileUpload handleFinish={handleFinish} submitClicked={submitClicked} />
      </IonContent>
      <IonFab vertical="bottom" horizontal="end">
        <IonFabButton onClick={handleSubmit} className="file-upload-fab-button">
          {submitClicked ? <IonSpinner /> : <IonIcon icon={add} />}
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default FileUploadPage;
