
import { useState, useEffect, useCallback } from 'react';
import { PorcupineManager, BuiltInKeywords } from '@picovoice/porcupine-react-native';

const useWakeWord = () => {
  const [wordDetected, setWordDetected] = useState<string>("No word detected");
  const [error, setError] = useState<string | null>(null);
  const [porcupineManager, setPorcupineManager] = useState<PorcupineManager>();

  const detectionCallback = useCallback((keywordIndex: any) => {
    if (keywordIndex === 0) {
      setWordDetected("JARVIS");
    } else if (keywordIndex === 1) {
      setWordDetected("BLUEBERRY");
    } else if (keywordIndex === 2) {
      setWordDetected("Alexa");
    }
  }, []);

  const initializePorcupine = useCallback(async () => {
    try {
      const manager = await PorcupineManager.fromBuiltInKeywords(
        "ba7DDKlkWxGkWSnflnJxD45cOgY9SqasO1f7TPwUeXOoWcDSx2c3MA==",
        [BuiltInKeywords.JARVIS, BuiltInKeywords.BLUEBERRY, BuiltInKeywords.ALEXA],
        detectionCallback
      );
      setPorcupineManager(manager);
    } catch (err: any) {
      console.error("Error while initializing Porcupine:", err);
      setError(err.message);
    }
  }, [detectionCallback]);

  useEffect(() => {
    initializePorcupine();
  }, [initializePorcupine]);

  useEffect(() => {
    if (porcupineManager) {
      porcupineManager.start();
    }
    // initializePorcupine()

    return () => {
      if (porcupineManager) {
        // porcupineManager.stop();
        // porcupineManager.delete();
      }
    };
  }, [porcupineManager]);

  return { wordDetected, error, porcupineManager, initializePorcupine };
};

export default useWakeWord;
