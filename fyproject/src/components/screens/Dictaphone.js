import React from 'react';
import SpeechRecognition from 'react-speech-recognition/lib/SpeechRecognition';
import { useSpeechRecognition } from 'react-speech-recognition';


const Dictaphone = () => {
  const {
    transcript,
    resetTranscript
  } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <div>
      
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;