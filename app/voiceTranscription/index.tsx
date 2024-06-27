import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Pressable, ActivityIndicator } from "react-native";
import * as VoiceTranscription from "@smmesbah/voice-transcription";
import useWakeWord from "@/hooks/useWakeWord";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'

interface RecordedProps {
  transcription: string;
  time: string;
}

const Home = () => {
  const [transcription, setTranscription] = useState("");
  const [recording, setRecording] = useState(false);
  const [word, setWord] = useState("Waiting");
  const [recordedList, setRecordedList] = useState<RecordedProps[]>([]); // [{transcription: "hello", time: "12:00"}, {transcription: "hello", time: "12:00"}
  const { wordDetected, error, porcupineManager } = useWakeWord();
  const [answer, setAnswer ] = useState("")
  const [loading, setLoading] = useState(false)

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
      }
    );

    // Cleanup subscriptions on component unmount
    return () => {
      transcriptionSubscription.remove();
    };
  }, []);

  useEffect(() => {
    console.log("say your wake up word");
    console.log(wordDetected);
    if (wordDetected === "JARVIS") {
      console.log("JARVIS detected");
      setWord("Started");
      handleStartRecording();
    }
    if (wordDetected === "BLUEBERRY") {
      console.log("BLUEBERRY detected");
      console.log("Stopped");
      setWord("Stopped");
      handleStopRecording();
    }
  }, [wordDetected]);

  useEffect(() => {
    getRecordedLists()
  }, []);

  const getRecordedLists = async () => {
    const lists = await AsyncStorage.getItem("recordedLists");
    if(lists){
      setRecordedList(JSON.parse(lists))
    }
  }

  const handleStartRecording = async () => {
    await VoiceTranscription.startRecording();
    setRecording(true);
  };

  const handleStopRecording = () => {
    VoiceTranscription.stopRecording();
    setRecording(false);
    setRecordedList([
      ...recordedList,
      { transcription, time: new Date().toLocaleTimeString() },
    ]);
    handleClickMe()
    // setTranscription("");
    // AsyncStorage.setItem("recordedLists", JSON.stringify([
    //   ...recordedList,
    //   { transcription, time: new Date().toLocaleTimeString() },
    // ]))
    resetWakeWordDetection();
  };

  const resetWakeWordDetection = () => {
    // Reset the wordDetected state to allow for re-triggering
    if (porcupineManager) {
      console.log("porcupine manager still there");
      console.log(wordDetected);
      // porcupineManager.stop()
    }
  };

  const handleClickMe = async () => {
    try {
      setLoading(true)
      console.log(transcription)
      const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/vector_search?query=${transcription}`);
      console.log(response.data); 
      setAnswer(response.data)// Log or handle the response data from the backend
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Voice Transcription: {word}</Text>
      <Text style={styles.transcription}>{transcription}</Text>
      <Pressable
        style={styles.button}
        onPress={recording ? handleStopRecording : handleStartRecording}
      >
        <Text style={styles.buttonText}>{recording ? "Stop" : "Start"}</Text>
      </Pressable>
      {/* <Pressable style={styles.button} onPress={handleClickMe}>
        <Text style={styles.buttonText}>Click me!</Text>
      </Pressable> */}
      {/* <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "800" }}>
        Recorded Lists:{" "}
      </Text> */}
      <View style={{marginTop: 20, justifyContent: "center", alignItems: "center"}}>
      {loading?
      <ActivityIndicator size="large" color="#0000ff" />
      :<Text style={{fontSize: 16, fontWeight: "bold"}}>{answer}</Text>}
      </View>
      {/* {recordedList.map((record, index) => (
        <View
          key={index}
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "bold" }}>
            List {index}:{" "}
          </Text>
          <Text style={{ marginHorizontal: 5, fontSize: 16 }}>
            {record.transcription} - {record.time}
          </Text>
        </View>
      ))} */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
  },
  button: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#007BFF",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  transcription: {
    flexWrap: "wrap",
    marginTop: 16,
    padding: 16,
    // height: 100,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    width: "100%",
    textAlign: "center",
  },
});
