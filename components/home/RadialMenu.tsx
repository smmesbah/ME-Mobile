import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
  PanResponder,
} from "react-native";
import Close from "../ui/icons/Close";
import Plus from "../ui/icons/Plus";
import RadialMenuButton from "../ui/buttons/RadialMenuButton";
import HomeIcon from "../ui/icons/Home";
import CalenderOutline from "../ui/icons/Calender1";
import TaskAdd from "../ui/icons/TaskAdd";
import NotesAdd from "../ui/icons/NotesAdd";
import MicrophoneFilled from "../ui/icons/MicrophoneFilled";
import useWakeWord from "@/hooks/useWakeWord";
import * as VoiceTranscription from "@smmesbah/voice-transcription";
import axios from "axios";
import { transform } from "@babel/core";

export type RadialMenuProps = {
  setOpenToDoSheet: Dispatch<SetStateAction<boolean>>;
};

const { height, width } = Dimensions.get("screen");

const RadialMenu: FC<RadialMenuProps> = ({ setOpenToDoSheet }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const animatedValue = useState(new Animated.Value(0))[0];
  const pulseValue = useState(new Animated.Value(1))[0];
  const { wordDetected, error, porcupineManager } = useWakeWord();
  const [transcription, setTranscription] = useState<string>("");
  const widthAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;
  const [answerOpen, setAnswerOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const answerRef = useRef<View>(null);

  useEffect(() => {
    const transcriptionSubscription = VoiceTranscription.addChangeListener(
      (event) => {
        setTranscription(event.text);
        console.log("transcription: ", event.text);
        if (event.error) {
          console.log(event.error);
          transcriptionSubscription.remove();
        }
      }
    );
    return () => {
      transcriptionSubscription.remove();
    };
  }, []);

  useEffect(() => {
    console.log("say your wake up word");
    if (wordDetected === "JARVIS") {
      console.log("Jarvis detected");
      toggleMenuToMic();
    } else if (wordDetected === "BLUEBERRY") {
      console.log("Blueberry detected");
      toggleMenuToMic();
    }
  }, [wordDetected]);

  const handleStartRecording = async () => {
    await VoiceTranscription.startRecording();
  };

  const handleStopRecording = async () => {
    VoiceTranscription.stopRecording();
    // handleTranscription();
    if (transcription.length !== 0) {
        console.log("transcription: ", transcription)
      setAnswerOpen(true);
      handleTranscription();
    }
    setTranscription("");
  };

  const handleTranscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/vector_search?query=${transcription}`
      );
      console.log(response.data);
      setAnswer(response.data); // Log or handle the response data from the backend
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
    Animated.timing(animatedValue, {
      toValue: menuOpen ? 0 : 1,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const toggleMenuToMic = () => {
    let micNewState = !micOn;
    setMicOn((prevState) => !prevState);
    if (micNewState) {
      startPulse();
      handleStartRecording();
      console.log("Mic is on");
    } else {
      handleStopRecording();
      console.log("Mic is off");
    //   if (transcription.length === 0) {
    //     setAnswerOpen(true);
    //   }
    }
  };
  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.5,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const plusToClose = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "135deg"],
  });

  const closeToPlus = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["135deg", "0deg"],
  });

  return (
    <View style={styles.container}>
      {/* {
                micOn && (
                    <Animated.View
                        style={[
                            styles.pulse,
                            {
                                transform: [{
                                    scale: pulseValue
                                }]
                            }
                        ]}
                    />
                )
            } */}
      {answerOpen && (
        <View style={styles.answer_view} ref={answerRef}>
          <Text style={styles.answer_title}>Title</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Text style={styles.answer_description}>{answer}</Text>
          )}
        </View>
      )}
      {micOn ? (
        <Animated.View style={[styles.animated_container]}>
          <View style={styles.text_style}>
            {transcription.length === 0 ? (
              <Text>Listening...</Text>
            ) : (
              <Text>{transcription}</Text>
            )}
          </View>
          <TouchableOpacity onPress={toggleMenuToMic} activeOpacity={0.8}>
            <Animated.View
              style={[
                styles.pulse,
                {
                  transform: [
                    {
                      scale: pulseValue,
                    },
                  ],
                },
              ]}
            />
            <Animated.View style={[styles.button]}>
              <MicrophoneFilled width={28} height={28} />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      ) : answerOpen ? (
        <TouchableOpacity
          onPress={()=>setAnswerOpen(false)}
        //   onLongPress={toggleMenuToMic}
          activeOpacity={0.8}
        >
          <Animated.View
            style={[styles.button]}
          >
            <Close width={28} height={28} />
          </Animated.View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={toggleMenu}
          onLongPress={toggleMenuToMic}
          activeOpacity={0.8}
        >
          <Animated.View
            style={[styles.button, { transform: [{ rotate: closeToPlus }] }]}
          >
            <Close width={28} height={28} />
          </Animated.View>
        </TouchableOpacity>
      )}

      {/* Other menu items can be added here */}
      <RadialMenuButton
        animatedValue={animatedValue}
        icon={<TaskAdd width={22} height={22} />}
        translateX={-65}
        translateY={10}
        onActionFunc={setOpenToDoSheet}
      />
      <RadialMenuButton
        animatedValue={animatedValue}
        icon={<NotesAdd width={24} height={24} />}
        translateX={-50}
        translateY={-45}
      />
      <RadialMenuButton
        animatedValue={animatedValue}
        icon={<CalenderOutline width={24} height={24} />}
        translateX={10}
        translateY={-60}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: height / 10,
    right: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 10,
  },
  button: {
    width: width / 8.5,
    height: width / 8.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#173a56",
    // Add shadows for a 3D effect
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8, // for Android
    zIndex: 1,
  },
  pulse: {
    position: "absolute",
    width: width / 8.5,
    height: width / 8.5,
    borderRadius: 50,
    backgroundColor: "#173a56",
    opacity: 0.3,
    zIndex: 0,
  },
  animated_container: {
    paddingTop: 10,
    marginRight: 8,
    flexDirection: "row",
    width: width * 0.9,
    alignItems: "flex-end",
    justifyContent: "space-between",
    // backgroundColor: "rgba(208, 184, 187, 0.4)",
    backgroundColor: "white",
    minHeight: width / 5.5,
    height: "auto",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgb(208, 184, 187)",
  },
  text_style: {
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    minHeight: width / 5.5,
    width: width * 0.8,
    paddingLeft: 10,
    paddingRight: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContainer: {
    height: "auto",
    minHeight: height * 0.2,
    width: width * 0.8,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "rgb(208, 184, 187)",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  answer_view: {
    width: width * 0.8,
    backgroundColor: "white",
    minHeight: width / 5.5,
    height: "auto",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgb(208, 184, 187)",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  answer_title: {
    fontSize: 18,
    fontWeight: "900",
    color: "blue",
    marginBottom: 10,
  },
  answer_description: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default RadialMenu;
