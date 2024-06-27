import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import * as VoiceTranscription from "@smmesbah/voice-transcription";

const Home = () => {
  const [transcription, setTranscription] = useState("");
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    // Add listener for transcription changes
    const transcriptionSubscription = VoiceTranscription.addChangeListener(
      (event) => {
        setTranscription(event.text);
        console.log("transciption", event.text);
        if (event.error) {
          console.log(event.error);
          transcriptionSubscription.remove();
        }
      },
    );

    // Cleanup subscriptions on component unmount
    return () => {
      transcriptionSubscription.remove();
    };
  }, []);

  const handleStartRecording = async () => {
    await VoiceTranscription.startRecording();
    setRecording(true);
  };

  const handleStopRecording = () => {
    VoiceTranscription.stopRecording();
    setRecording(false);
  };
  return (
    <View style={styles.container}>
      <Text>Voice Transcription</Text>
      <Text style={styles.transcription}>{transcription}</Text>
      <Pressable style={styles.button} onPress={recording? handleStopRecording: handleStartRecording}>
        <Text style={styles.buttonText}>{recording? "Stop": "Start"}</Text>
      </Pressable>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    // flex: 1, 
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    marginTop: 16,
    padding: 16, 
    backgroundColor: "#007BFF", 
    borderRadius: 8
  },
  buttonText: {
    color: "#fff",
    fontWeight: 'bold',
  },
  transcription: {
    flexWrap: 'wrap',
    marginTop: 16,
    padding: 16,
    // height: 100,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    width: '100%',
    textAlign: 'center',
  }
})