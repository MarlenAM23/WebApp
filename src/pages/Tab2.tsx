import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToast } from '@ionic/react';
import React, { useState } from 'react';
import { Plugins } from '@capacitor/core';
import { HapticsImpactStyle } from '@capacitor/haptics';


const { Haptics, Toast } = Plugins;

const Tab2: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('');

  const changeBackgroundColor = () => {
    const randomColor = generateRandomColor();
    setBackgroundColor(randomColor);
    setShowToast(true);
    vibrate();
  };
  
  const generateRandomColor = () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff']; // Colores predefinidos
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  

  const vibrate = () => {
    Haptics.impact({
      style: HapticsImpactStyle.Medium
    });
  };

  const showToastMessage = async () => {
    await Toast.show({
      text: '¡Color cambiado!',
      duration: 'short'
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cambiar Fondo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen onClick={changeBackgroundColor}>
        <div className="background-container" style={{ background: backgroundColor }}>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="¡Color cambiado!"
            duration={2000}
            onIonToastWillPresent={showToastMessage}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
