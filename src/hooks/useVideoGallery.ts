import { useState } from 'react';

export interface UserVideo {
  filepath: string;
  webviewPath?: string;
}

export function useVideoGallery() {
  const [videos, setVideos] = useState<UserVideo[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      const constraints = { audio: true, video: true };
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      const recorder = new MediaRecorder(mediaStream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = async () => {
        mediaStream.getTracks().forEach((track) => track.stop());

        const blob = new Blob(chunks, { type: 'video/mp4' });
        const videoUrl = URL.createObjectURL(blob);

        const capturedVideo: UserVideo = {
          filepath: 'captured_video.mp4',
          webviewPath: videoUrl,
        };

        setVideos([...videos, capturedVideo]);
      };

      recorder.start();

      setMediaRecorder(recorder);
      setStream(mediaStream);
    } catch (error) {
      console.error('Error al capturar video:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
    }

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  return {
    videos,
    startRecording,
    stopRecording,
  };
}