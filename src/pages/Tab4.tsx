import { IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { LocalNotifications } from '@capacitor/local-notifications';
import React, { useState } from 'react';

const Tab4: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);
  const [newNote, setNewNote] = useState('');
  const [reminderTime, setReminderTime] = useState('');

  const addNote = () => {
    if (newNote === '' || reminderTime === '') {
      console.log('Por favor, ingresa una nota y una hora de recordatorio válidas');
      return;
    }

    const note = {
      content: newNote,
      reminder: reminderTime,
    };

    setNotes([...notes, note]);
    scheduleNotification(note.content, note.reminder);

    setNewNote('');
    setReminderTime('');
  };

  const removeNote = (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const scheduleNotification = async (content: string, reminder: string) => {
    const notificationTime = new Date(reminder);

    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Recordatorio de nota',
          body: content,
          id: Math.floor(Math.random() * 1000), // Generar un ID aleatorio para la notificación
          schedule: { at: notificationTime },
          sound: 'beep.wav', // Opcional: Ruta al archivo de sonido de la notificación
        }
      ]
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notas con Recordatorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="notes-container">
          <h2>Agregar Nota</h2>
          <IonItem>
            <IonLabel position="floating">Contenido de la nota</IonLabel>
            <IonTextarea value={newNote} onIonChange={(e) => setNewNote(e.detail.value!)}></IonTextarea>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Hora de recordatorio</IonLabel>
            <IonDatetime displayFormat="h:mm A" value={reminderTime} onIonChange={(e) => setReminderTime(e.detail.value!)}></IonDatetime>
          </IonItem>
          <IonButton onClick={addNote}>Agregar Nota</IonButton>
        </div>

        <div className="notes-list">
          <h2>Notas</h2>
          {notes.map((note, index) => (
            <div className="note-item" key={index}>
              <p>{note.content}</p>
              <p>Recordatorio: {note.reminder}</p>
              <IonButton onClick={() => removeNote(index)}>Eliminar</IonButton>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
