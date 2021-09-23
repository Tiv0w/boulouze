import './FileUploadPage.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import FileUpload from '../components/FileUpload';
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
import { Product } from '../types/Product';
import useStore from '../store';


type Props = {
  product?: Product
};
const FileUploadPage: React.FC<Props> = () => {
  const [submitClicked, setSubmitClicked] = useState(false);
  const [displayToast] = useIonToast();
  const history = useHistory();
  const product = useStore(state => state.product);

  function handleFinish() {
    setSubmitClicked(false);
    displayToast('Votre produit a bien été enregistré !', 3000);
    history.push('/tab2');
  };

  function handleSubmit() {
    setSubmitClicked(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{product ? 'Modifier' : 'Enregistrer'} un produit</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <FileUpload
          // product={product}
          handleFinish={handleFinish}
          submitClicked={submitClicked}
        />
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
