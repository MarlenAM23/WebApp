import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonModal, IonInput, IonText, IonCheckbox, IonToast } from '@ionic/react';
import React, { useState } from 'react';

const Tab6: React.FC = () => {
  const [showModal, setShowModal] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleLogin = () => {
    if (email === 'prueba@gmail.com' && password === 'Ya Paseme') {
      setShowToast(true);
    } else {
      setShowToast(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Compartir</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonContent>
            <IonText>
              <h2>Plugin @capacitor/share</h2>
              <p>El plugin @capacitor/share permite compartir contenido desde tu aplicación a través de las capacidades de intercambio de dispositivos nativos.</p>
              <p>Esta función te permite compartir texto, enlaces, imágenes u otros tipos de contenido utilizando aplicaciones o servicios disponibles en tu dispositivo.</p>
            </IonText>
            <IonButton expand="full" onClick={() => setShowModal(false)}>
              Comenzar
            </IonButton>
          </IonContent>
        </IonModal>

        <IonButton expand="full" onClick={() => setShowModal(true)}>
          Informacion de @Capacitor/Share
        </IonButton>

        <IonInput
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)}
        ></IonInput>
        <IonInput
          type={showPassword ? 'text' : 'password'}
          placeholder="Contraseña"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
        ></IonInput>
        <IonCheckbox
          checked={showPassword}
          onIonChange={(e) => setShowPassword(e.detail.checked)}
        ></IonCheckbox>
        <label>Mostrar contraseña</label>

        <IonButton expand="full" onClick={handleLogin}>
          Iniciar sesión
        </IonButton>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Felicidades, tienes 100 en la materia"
          duration={3000}
        />
        <IonToast
          isOpen={!showToast && email !== '' && password !== ''}
          onDidDismiss={() => setShowToast(false)}
          message="Credenciales incorrectas"
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab6;
