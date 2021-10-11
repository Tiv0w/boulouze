import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Product from '../../components/Product/Product';
import './ProductShowcase.css';


const ProductShowcase: React.FC = () => {
  const [product, setProduct] = useState<{ name?: string }>({});
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{product.name || 'Produit'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Product setProduct={setProduct} />
      </IonContent>
    </IonPage>
  );
};

export default ProductShowcase;
