import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { useVideoGallery, UserVideo } from '../hooks/useVideoGallery';

const Tab1: React.FC = () => {
  const { videos, startRecording, stopRecording } = useVideoGallery();
  const [recording, setRecording] = useState(false);

  const handleStartRecording = () => {
    startRecording();
    setRecording(true);
  };

  const handleStopRecording = () => {
    stopRecording();
    setRecording(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Videos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {!recording && videos.length === 0 && (
          <IonButton expand="full" onClick={handleStartRecording}>
            Start Recording
          </IonButton>
        )}
        {recording && (
          <IonButton expand="full" onClick={handleStopRecording}>
            Stop Recording
          </IonButton>
        )}
        <IonList>
          {videos.map((video: UserVideo) => (
            <IonItem key={video.filepath}>
              <video src={video.webviewPath} controls></video>
              <IonLabel>{video.filepath}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;