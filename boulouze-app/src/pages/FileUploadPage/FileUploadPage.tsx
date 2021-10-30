import './FileUploadPage.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import FileUpload from '../../components/FileUpload/FileUpload';
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
import { checkmark } from 'ionicons/icons';
import { Product } from '../../types/Product';
import useStore from '../../store';


type Props = {
    product?: Product
};
const FileUploadPage: React.FC<Props> = () => {
    const [submitClicked, setSubmitClicked] = useState(false);
    const [displayToast] = useIonToast();
    const history = useHistory();
    const product = useStore(state => state.product);


    function handleSubmitClicked() {
        setSubmitClicked(false);
    }

    function handleFinish() {
        setSubmitClicked(false);
        // displayToast('Votre produit a bien été enregistré !', 3000);
        displayToast({
            message: 'Votre produit a bien été enregistré !',
            duration: 3000,
            color: 'success',
        });
        history.push('/tab2');
    };

    function handleBadRequest() {
        setSubmitClicked(false);
        displayToast({
            message: 'Une erreur s\'est produite lors de l\'enregistrement.',
            duration: 6000,
            color: 'danger',
        });
    };

    function handleSubmit() {
        setSubmitClicked(true);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        {product ? 'Modifier' : 'Enregistrer'} un produit
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <FileUpload
                    handleFinish={handleFinish}
                    handleBadRequest={handleBadRequest}
                    handleSubmitClicked={handleSubmitClicked}
                    submitClicked={submitClicked}
                />
            </IonContent>
            <IonFab vertical="bottom" horizontal="end">
                <IonFabButton onClick={handleSubmit} className="file-upload-fab-button" color="success">
                    {submitClicked ? <IonSpinner /> : <IonIcon icon={checkmark} />}
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
};

export default FileUploadPage;
