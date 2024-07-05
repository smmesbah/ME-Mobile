import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import Close from "../ui/icons/Close";
import TextInputWithTextLength from "./createToDo/TextInputWithTextLength";
import CalenderOutline from "../ui/icons/Calender1";
import ClockOutline from "../ui/icons/ClockOutline";
import AlarmIcon from "../ui/icons/AlarmOutline";
import TagOutline from "../ui/icons/TagOutline";
import Priority from "../ui/icons/Priority";
import SelectDateDrawer from "./createToDo/SelectDateDrawer";
import SelectTimeDrawer from "./createToDo/SelectTimeDrawer";
import moment from "moment";
import ReminderDrawer from "./createToDo/ReminderDrawer";
import TagDrawer from "./createToDo/TagDrawer";
import PriorityDrawer from "./createToDo/PriorityDrawer";
import axios from "axios";
import Label from "../ui/icons/Label";
import LabelDrawer from "./createToDo/LabelDrawer";

export type ToDoBottomDrawerProps = {
  openToDoSheet: boolean;
  setOpenToDoSheet: Dispatch<SetStateAction<boolean>>;
};

const colors = [
  "#D2CCF2",
  "#A9E8E8",
  "#F5E29E",
  "#E8B7CA",
  "#C8EBEF",
  "#B2EAD3",
  "#F68BA2",
];

const ToDoBottomDrawer: React.FC<ToDoBottomDrawerProps> = ({
  openToDoSheet,
  setOpenToDoSheet,
}) => {
  const windowHeight = Dimensions.get("window").height;
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isSelectDateOpen, setIsSelectDateOpen] = useState<boolean>(false);
  const [isSelectTimeOpen, setIsSelectTimeOpen] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const [isReminderDrawerOpen, setIsReminderDrawerOpen] =
    useState<boolean>(false);
  const [reminderTime, setReminderTime] = useState<Date | undefined>();
  const [isTagDrawerOpen, setIsTagDrawerOpen] = useState<boolean>(false);
  const [tag, setTag] = useState<string | undefined>();
  const [priority, setPriority] = useState<string>();
  const [isPriorityDrawerOpen, setIsPriorityDrawerOpen] =
    useState<boolean>(false);
  const [label, setLabel] = useState<string>();
  const [isLabelDrawerOpen, setIsLabelDrawerOpen] = useState<boolean>(false);
  const timeZoneOffsetInHours = (moment().utcOffset() / 60) * -1;

  // Day options
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const handleToDoCreateClick = async () => {
    // setOpenToDoSheet(false);
    try {
      // check everything is filled or not
      if (taskTitle === "") {
        alert("Please fill the task title");
        return;
      } else if (selectedDay === "") {
        alert("Please select the day");
        return;
      }
      const timeZoneOffsetInHours = moment().utcOffset() / 60;
      const taskInfo = {
        user_id: "qwerty",
        taskTitle: taskTitle,
        taskColor: selectedColor,
        startDate: selectedDate?.toDateString(),
        endDate: selectedDate?.toDateString(),
        startTime: startTime? startTime: "",
        endTime: endTime? endTime: "",
        reminderTime: reminderTime?moment(reminderTime)
          .add(timeZoneOffsetInHours, "hours")
          .toDate(): "",
        taskType: tag?? "",
        tag: tag?? "",
        label: label? label : "To Do",
        progress: 0,
        priority: priority ? priority : "Low",
        redirectURL: "/",
      };
      
      const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/todo`,taskInfo)
      if(response.data.status === "success"){
        console.log("todo created")
        const res = await axios.post(
          `${process.env.EXPO_PUBLIC_BACKEND_URL}/history`,
          { user_id: "qwerty", description: JSON.stringify(taskInfo) }
        );
        if (res.data.status === "success") {
          console.log("history created")
          alert("Task created successfully");
        }
      }
      // clear all the states
      setTaskTitle("");
      setSelectedColor(colors[0]);
      setSelectedDay("");
      setStartTime(undefined);
      setEndTime(undefined);
      setReminderTime(undefined);
      setTag(undefined);
      setPriority(undefined);
      setLabel(undefined);

      // console.log(taskInfo);
      setOpenToDoSheet(false);
    } catch (error) {
      alert("Error while creating task");
      console.log(error);
    }
  };
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={openToDoSheet}>
        <View
          style={[
            styles.bottomSheet,
            { height: windowHeight * 0.86, backgroundColor: selectedColor },
          ]}
        >
          {/* Top section */}
          <View style={[styles.container1]}>
            <TouchableOpacity onPress={() => setOpenToDoSheet(false)}>
              <Close fillColor={"#000"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleToDoCreateClick}>
              <Text style={[styles.text1]}>Create</Text>
            </TouchableOpacity>
          </View>

          {/* Title and color selection section */}
          <View style={[styles.container2]}>
            <TextInputWithTextLength
              taskTitle={taskTitle}
              setTaskTitle={setTaskTitle}
            />

            <View style={styles.container3}>
              {colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedColor(color)}
                  style={[
                    styles.container4,
                    {
                      backgroundColor: color,
                      borderWidth: selectedColor === color ? 3 : 3,
                      borderColor: selectedColor === color ? "#fff" : "#778592",
                    },
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Date, time, reminder and tag section */}
          <View style={styles.container5}>
            <TouchableOpacity
              style={[styles.container6]}
              onPress={() => setIsSelectDateOpen(true)}
            >
              <Text>{selectedDay === "" ? "Select Day" : selectedDay}</Text>
              <CalenderOutline width={24} height={24} fillColor={"#778592"} />
            </TouchableOpacity>

            <View style={[styles.container7]} />

            <TouchableOpacity
              style={[styles.container6]}
              onPress={() => setIsSelectTimeOpen(true)}
            >
              <Text>
                {startTime === undefined && endTime === undefined
                  ? "Select Time"
                  : startTime !== undefined && endTime === undefined
                  ? `Time: ${moment(startTime)
                      .add(timeZoneOffsetInHours, "hours")
                      .format("hh:mm A")}`
                  : `Time: ${moment(startTime)
                      .add(timeZoneOffsetInHours, "hours")
                      .format("hh:mm A")} - ${moment(endTime)
                      .add(timeZoneOffsetInHours, "hours")
                      .format("hh:mm A")}`}
              </Text>
              <ClockOutline />
            </TouchableOpacity>

            <View style={[styles.container7]} />

            <TouchableOpacity
              style={[styles.container6]}
              onPress={() => setIsReminderDrawerOpen(true)}
            >
              <Text>
                {reminderTime === undefined
                  ? "Add Reminder"
                  : `Reminder: ${moment(reminderTime).format("hh:mm A")}`}
              </Text>
              <AlarmIcon width={24} height={24} fillColor={"#778592"} />
            </TouchableOpacity>

            <View style={[styles.container7]} />

            <TouchableOpacity
              style={[styles.container6]}
              onPress={() => setIsTagDrawerOpen(true)}
            >
              <Text>{tag === undefined ? "Add Tag" : `Tag: ${tag}`}</Text>
              <TagOutline fillColor={"#778592"} />
            </TouchableOpacity>
            <View style={[styles.container7]} />
            <TouchableOpacity
              style={[styles.container6]}
              onPress={() => setIsPriorityDrawerOpen(true)}
            >
              <Text>
                {priority === undefined
                  ? "Add Priority"
                  : `Priority: ${priority}`}
              </Text>
              <Priority />
            </TouchableOpacity>
            <View style={[styles.container7]} />
            <TouchableOpacity
              style={[styles.container6]}
              onPress={() => setIsLabelDrawerOpen(true)}
            >
              <Text>
                {label === undefined ? "Add label" : `Label: ${label}`}
              </Text>
              <Label />
            </TouchableOpacity>

            {/* <View
                            style={[styles.container7]}
                        />

                        <View style={[styles.container6]}>
                            <Text>
                                Status
                            </Text>
                        </View> */}
          </View>
        </View>

        {/* Select Date Drawer */}
        <SelectDateDrawer
          isSelectDateOpen={isSelectDateOpen}
          setIsSelectDateOpen={setIsSelectDateOpen}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          setSelectedDate={setSelectedDate}
        />

        {/* Select Time Drawer */}
        <SelectTimeDrawer
          isSelectTimeOpen={isSelectTimeOpen}
          setIsSelectTimeOpen={setIsSelectTimeOpen}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />

        {/* Add Reminder Drawer */}
        <ReminderDrawer
          isReminderDrawerOpen={isReminderDrawerOpen}
          setIsReminderDrawerOpen={setIsReminderDrawerOpen}
          reminderTime={reminderTime}
          setReminderTime={setReminderTime}
          eventTime={startTime}
        />

        {/* Add tag drawer */}
        <TagDrawer
          isTagDrawerOpen={isTagDrawerOpen}
          setIsTagDrawerOpen={setIsTagDrawerOpen}
          tag={tag}
          setTag={setTag}
        />
        {/* Add priority drawer */}
        <PriorityDrawer
          isPriorityDrawerOpen={isPriorityDrawerOpen}
          setIsPriorityDrawerOpen={setIsPriorityDrawerOpen}
          priority={priority}
          setPriority={setPriority}
        />
        {/* Add label drawer */}
        <LabelDrawer
          isLabelDrawerOpen={isLabelDrawerOpen}
          setIsLabelDrawerOpen={setIsLabelDrawerOpen}
          label={label}
          setLabel={setLabel}
        />
      </Modal>
    </View>
  );
};

export default ToDoBottomDrawer;

const styles = StyleSheet.create({
  // ------------------- Container Styles -------------------
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    bottom: 0,
    // borderWidth: 1,
  },
  container1: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container2: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  container3: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    flexWrap: "wrap",
    marginTop: 25,
  },
  container4: {
    margin: 5,
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  container5: {
    width: "100%",
    marginTop: 20,
    gap: 15,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  container6: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container7: {
    borderWidth: 0.5,
    width: "100%",
    borderRadius: 10,
    borderColor: "#bababa",
  },
  // ------------------- Text Styles -------------------
  text1: {
    fontSize: 16,
    fontWeight: "500",
  },
});
