import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [timer, setTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [records, setRecords] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTimer(0);
    setIsRunning(false);
  };

  const saveRecord = () => {
    setRecords([...records, timer]);
    resetTimer();
  };

  const removeRecord = (index: number) => {
    const updatedRecords = [...records];
    updatedRecords.splice(index, 1);
    setRecords(updatedRecords);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cronómetro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="timer-container">
          <h2>{formatTime(timer)}</h2>
          {!isRunning ? (
            <>
              <IonButton onClick={startTimer}>Start</IonButton>
              <IonButton onClick={resetTimer}>Reset</IonButton>
            </>
          ) : (
            <>
              <IonButton onClick={stopTimer}>Stop</IonButton>
              <IonButton onClick={saveRecord}>Save</IonButton>
            </>
          )}
        </div>

        <IonList>
          {records.map((record, index) => (
            <IonItem key={index}>
              <IonLabel>{formatTime(record)}</IonLabel>
              <IonButton fill="clear" slot="end" onClick={() => removeRecord(index)}>
                Delete
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

// Función auxiliar para formatear el tiempo en formato HH:MM:SS
const formatTime = (time: number): string => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
};

// Función auxiliar para formatear un número menor a 10 con un cero delante
const formatNumber = (number: number): string => {
  return number < 10 ? `0${number}` : `${number}`;
};

export default Tab3;
