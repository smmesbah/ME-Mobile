import {
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Close from "../ui/icons/Close";
import FocusButton from "../ui/buttons/FocusButton";
import TaskCard, { TaskCardProps } from "./TaskCard";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export type AllTasksProps = {
    taskList: TaskCardProps[];
    getTaskData: ()=> void;
    openAllTasks: boolean;
    setOpenAllTasks: React.Dispatch<React.SetStateAction<boolean>>;
};

const AllTasks: React.FC<AllTasksProps> = ({taskList, getTaskData, openAllTasks, setOpenAllTasks}) => {
  const [focus, setFocus] = useState<string>("In Progress");
  const [filteredTaskList, setFilteredTaskList] = useState<TaskCardProps[]>([]);

  useEffect(() => {
    if(openAllTasks){
    filterTaskList()
    }
  },[openAllTasks])

  const filterTaskList = () => {
    // console.log("Initial focus: ", focus)
    const filteredData = taskList.filter((item) =>{
        return item.label === focus;
    })
    setFilteredTaskList(filteredData);
  }

  const handleFocus = (focus: string) => {
    setFocus(focus);
    const filteredData = taskList.filter((item) =>{
        return item.label === focus;
    })
    setFilteredTaskList(filteredData);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={openAllTasks}>
      <View style={styles.bottomSheet}>
        <View style={styles.container1}>
          <TouchableOpacity onPress={() => setOpenAllTasks(false)}>
            <Close fillColor="#000" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.text}>All Tasks List: </Text>
          <View style={styles.container5}>
            <FocusButton
              label="In Progress"
              focus={focus}
              onPressFunc={handleFocus}
            />
            <FocusButton
              label="To Do"
              focus={focus}
              onPressFunc={handleFocus}
            />
            <FocusButton
              label="Completed"
              focus={focus}
              onPressFunc={handleFocus}
            />
          </View>
          {/* Task section */}
          <FlatList
          data={filteredTaskList}
          renderItem={({ item, index }) => (
            <TaskCard
              taskType={item.taskType? item.taskType: "Design"}
              taskTitle={item.taskTitle}
              progress={item.progress}
              startDate={item.startDate}
              startTime={item.startTime? item.startTime: ""}
              endDate={item.endDate}
              endTime={item.endTime? item.endTime: ""}
              priority={item.priority}
              redirectUrl={item.redirectUrl}
              taskColor={item.taskColor}
              label={item.label}
              reminderTime={item.reminderTime}
              id={item.id}
              getTaskData={getTaskData}
            />
          )}
          keyExtractor={(item,index)=>index.toString()}
          style={{
            marginTop: 10,
            height: height * 0.37
          }}
          contentContainerStyle={{
            gap: 10,
          }}
          ListFooterComponent={<View style={{height: height*0.06}}/>}
        />
        </View>
      </View>
    </Modal>
  );
};

export default AllTasks;

const styles = StyleSheet.create({
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
    height: height * 0.86,
    borderWidth: 1,
    borderColor: "#000",
  },
  container1: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    // backgroundColor: "red"
  },
  container5: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: width * 0.9,
  },
  // ------------------- Text Styles -------------------
  text: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});
