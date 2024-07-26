import {
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import SearchOutline from "@/components/ui/icons/SearchOutline";
import WorkSpaceCard from "@/components/home/WorkSpaceCard";
import TaskOutline from "@/components/ui/icons/TaskOutline";
import Notes from "@/components/ui/icons/Notes";
import FocusButton from "@/components/ui/buttons/FocusButton";
import TaskCard from "@/components/home/TaskCard";
import { TaskCardProps } from "@/components/home/TaskCard";
import axios from "axios";
import { ScrollView } from "react-native-virtualized-view";
import ToDoBottomDrawer from "@/components/home/ToDoBottomDrawer";
import AllTasks from "@/components/home/AllTasks";
import * as Speech from "expo-speech";
import { router } from "expo-router";
import CallManager from "../../CallManager"
import * as RecieveCalls from "../../modules/receive-incoming-call/index"

const { width, height } = Dimensions.get("screen");
const Home = () => {
  const [focus, setFocus] = useState<string>("In Progress");
  const [taskList, setTaskList] = useState<TaskCardProps[]>([]);
  const [filterTaskList, setFilterTaskList] = useState<TaskCardProps[]>([]);
  const [openAllTasks, setOpenAllTasks] = useState<boolean>(false);
  const [todayTaskList, setTodayTaskList] = useState<TaskCardProps[]>([]);
  // const taskData: TaskCardProps[] = [
  //   {
  //     taskType: 'Design',
  //     taskTitle: 'Hello There',
  //     progress: 50,
  //     startDate: '12 Jan 2024',
  //     startTime: '12:00PM',
  //     endDate: '12 Jan 2024',
  //     endTime: '12:30PM',
  //     priority: 'High',
  //     redirectUrl: '/',
  //     key: '1',
  //   },
  //   {
  //     taskType: 'Design',
  //     taskTitle: 'Hello There',
  //     progress: 50,
  //     startDate: '12 Jan 2024',
  //     startTime: '12:00PM',
  //     endDate: '12 Jan 2024',
  //     endTime: '12:30PM',
  //     priority: 'High',
  //     redirectUrl: '/',
  //     key: '2',
  //   },
  //   {
  //     taskType: 'Design',
  //     taskTitle: 'Hello There',
  //     progress: 50,
  //     startDate: '12 Jan 2024',
  //     startTime: '12:00PM',
  //     endDate: '12 Jan 2024',
  //     endTime: '12:30PM',
  //     priority: 'High',
  //     redirectUrl: '/',
  //     key: '3',
  //   },
  //   {
  //     taskType: 'Design',
  //     taskTitle: 'Hello There',
  //     progress: 50,
  //     startDate: '12 Jan 2024',
  //     startTime: '12:00PM',
  //     endDate: '12 Jan 2024',
  //     endTime: '12:30PM',
  //     priority: 'High',
  //     redirectUrl: '/',
  //   },
  // ];

  useEffect(() => {
    getTaskData();
    // getTodayDateString()
  }, []);
  const getTodayDateString = () => {
    const today = new Date();
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const todayDate = today.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const todayFormattedDate = todayDate.replace(/,/g, "");
    const dateParts = todayFormattedDate.split(" ");
    const day = parseInt(dateParts[2], 10); // Convert day to integer to remove leading zero
    dateParts[2] = day < 10 ? `0${day}` : day.toString(); // Convert day back to string
    // console.log(dateParts.join(" "));
    return dateParts.join(" ");
  };

  const getTaskData = async () => {
    try {
      // console.log("Fetching data")
      const user_id = "asdfg";
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/todo/${user_id}`
      );
      const data = response.data;
      // console.log(data)
      setTaskList(data);
      const todayDate = getTodayDateString();
      const filterTodayTask = data.filter((item: any) => {
        // console.log(item.startDate, todayDate);
        return item.startDate === todayDate;
      });
      // console.log("Today's task", filterTodayTask);
      setTodayTaskList(filterTodayTask);
      const filteredData = filterTodayTask.filter((item: any) => {
        return item.label === focus;
      });
      setFilterTaskList(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFocus = (focus: string) => {
    // console.log("focus: ", focus);
    setFocus(focus);
    const filteredData = todayTaskList.filter((item) => {
      // console.log(item.label, focus)
      return item.label === focus;
    });
    // console.log(filteredData)
    setFilterTaskList(filteredData);
  };

  const handleOpenAllTasks = () => {
    setOpenAllTasks(true);
  };

  const handleOpenAllNotes = async() => {
    router.push("/call-receive")
  };

  const handleReceivePhoneCall = async () => {
    await RecieveCalls.receiveIncomingCalls()
  }

  useEffect(() => {
    const ReportCall = async () => {
      const id = "26fac8de-391a-4a43-b9dd-3e5912733c23"
      const handle = "+8801826700175"
      CallManager.reportIncomingCall(id, handle)
    }
    ReportCall()
  }, []);


  return (
    <SafeAreaView style={styles.container2}>
      {/* Search bar */}
      <View>
        <View style={styles.container}>
          <SearchOutline />
        </View>
        <TextInput
          placeholder="Search task or project..."
          style={styles.container1}
        />
      </View>

      {/* Workspace */}
      <View style={styles.container3}>
        <Pressable onPress={handleReceivePhoneCall}>
          <Text>Press me for receiving phone call</Text>
        </Pressable>
        <Text style={styles.text}>Your workspace</Text>
        <View style={styles.container4}>
          <WorkSpaceCard
            title="Tasks"
            taskCount={`${taskList.length} tasks`}
            icon={<TaskOutline width={30} height={30} />}
            onPressFunc={handleOpenAllTasks}
          />
          <WorkSpaceCard
            title="Notes"
            taskCount={`${25} notes`}
            icon={<Notes width={30} height={30} />}
            cardBackgroundColor="#fb5158"
            onPressFunc={handleOpenAllNotes}
          />
        </View>
      </View>

      {/* Today's Task List*/}
      <View>
        <Text style={styles.text}>Today's Task List</Text>

        {/* Task category section */}
        <View style={styles.container5}>
          <FocusButton
            label="In Progress"
            focus={focus}
            onPressFunc={handleFocus}
          />
          <FocusButton label="To Do" focus={focus} onPressFunc={handleFocus} />
          <FocusButton
            label="Completed"
            focus={focus}
            onPressFunc={handleFocus}
          />
        </View>

        {/* Task section */}
        <FlatList
          data={filterTaskList}
          renderItem={({ item, index }) => (
            <TaskCard
              taskType={item.taskType ? item.taskType : "Design"}
              taskTitle={item.taskTitle}
              progress={item.progress}
              startDate={item.startDate}
              startTime={item.startTime ? item.startTime : ""}
              endDate={item.endDate}
              endTime={item.endTime ? item.endTime : ""}
              priority={item.priority}
              redirectUrl={item.redirectUrl}
              taskColor={item.taskColor}
              label={item.label}
              reminderTime={item.reminderTime}
              id={item.id}
              getTaskData={getTaskData}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          style={{
            marginTop: 10,
            height: height * 0.37,
          }}
          contentContainerStyle={{
            gap: 10,
          }}
          ListFooterComponent={<View style={{ height: height * 0.06 }} />}
        />
      </View>
      <AllTasks
        taskList={taskList}
        getTaskData={getTaskData}
        openAllTasks={openAllTasks}
        setOpenAllTasks={setOpenAllTasks}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 10,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    zIndex: 1,
  },
  container1: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 15,
    borderRadius: 10,
    paddingLeft: 40,
    zIndex: -1,
  },
  container2: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  container3: {
    marginTop: 10,
  },
  container4: {
    marginTop: 10,
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
  },
  container5: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  // ------------------- Text Styles -------------------
  text: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});
