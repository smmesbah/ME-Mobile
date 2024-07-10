import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Calender from "../ui/icons/Calender";
import Flag from "../ui/icons/Flag";
import MenuDot from "../ui/icons/MenuDot";
import ProgressBarNative from "../ui/progressbars/ProgressBarLinear";
import EditBottomDrawer from "./EditBottomDrawer";
import Priority from "../ui/icons/Priority";
import axios from "axios";

export type TaskCardProps = {
  // Props type definition

  // taskType?: string;
  // taskTitle: string;
  // progress: number;
  // startDate: string;
  // startTime?: string;
  // endDate?: string;
  // endTime?: string;
  // priority?: "High" | "Medium" | "Low";
  // redirectUrl?: string;
  // key?: string;

  taskType: string;
  taskTitle: string;
  taskColor?: string;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  reminderTime?: string;
  tag?: string;
  label?: "To Do" | "In Progress" | "Completed";
  progress: number;
  priority: "High" | "Medium" | "Low";
  redirectUrl: string;
  id: string;
  getTaskData: () => void;
};

const TaskCard: React.FC<TaskCardProps> = ({
  taskTitle,
  taskType,
  progress,
  startDate,
  startTime,
  endDate,
  endTime,
  priority,
  redirectUrl,
  taskColor,
  label,
  reminderTime,
  id,
  getTaskData,
}) => {
  // const [progress, setProgress] = useState(60);
  const startTimeObject = new Date(startTime ? startTime : "");
  const timeStart = startTimeObject.toLocaleTimeString();
  const endTimeObject = new Date(endTime ? endTime : "");
  const timeEnd = endTimeObject.toLocaleTimeString();
  const [openEdit, setOpenEdit] = useState(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/todo-delete/${id}`
      );
      console.log(response.data);
      setDeleteModal(false);
      getTaskData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#D4D4D4",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            gap: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: "#0560FD", fontWeight: "400" }}>
              {taskType}
            </Text>
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 5,
                backgroundColor: "#0560FD",
                borderRadius: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 12, color: "#fff", fontWeight: "500" }}>
                {priority}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => console.log(redirectUrl)}>
            <Text style={{ fontSize: 18, color: "#000", fontWeight: "500" }}>
              {taskTitle}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            height: 30,
            width: 30,
            borderWidth: 1,
            borderColor: "#D4D4D4",
            borderRadius: 50,
            padding: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setOpenEdit(!openEdit)}
        >
          <MenuDot />
        </TouchableOpacity>
        {openEdit && (
          <View
            style={{
              position: "absolute",
              right: -10,
              top: 45,
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#D4D4D4",
              borderRadius: 15,
              paddingHorizontal: 12,
              paddingVertical: 10,
              zIndex: 999,
              gap: 5,
            }}
          >
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6E6E6E",
                  fontWeight: "500",
                }}
                onPress={() => {
                  setOpenEditDrawer(true);
                  setOpenEdit(false);
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6E6E6E",
                  fontWeight: "500",
                }}
                // onPress={() => console.log("delete",id)}
                onPress={() => {
                  setDeleteModal(true);
                  setOpenEdit(false);
                }}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* <View
        style={{
          marginTop: 10,
          gap: 5,
          width: "80%",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "#6E6E6E",
            fontWeight: "500",
          }}
        >
          Progress
        </Text>

        <ProgressBarNative progressValue={progress} />
      </View> */}
      <View
        style={{
          marginTop: 10,
          backgroundColor: "#6E6E6E",
          paddingHorizontal: 10,
          paddingVertical: 5,
          width: 100,
          alignItems: "center",
          borderRadius: 20,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "#fff",
            fontWeight: "500",
          }}
        >
          {label}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 15,
          gap: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <Calender height={20} width={20} fill={"#0560FD"} />
          <View
            style={{
              gap: 2,
            }}
          >
            <Text style={{ fontSize: 12 }}>{startDate}</Text>
            {startTime !== "" && (
              <Text style={{ fontSize: 12 }}>{timeStart}</Text>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <Flag height={20} width={20} fill={"#0560FD"} />
          <View
            style={{
              gap: 2,
            }}
          >
            <Text style={{ fontSize: 12 }}>{endDate}</Text>
            {endTime !== "" && <Text style={{ fontSize: 12 }}>{timeEnd}</Text>}
          </View>
        </View>
      </View>
      {/* Add Edit drawer */}
      {openEditDrawer && (
        <EditBottomDrawer
          openEditSheet={openEditDrawer}
          setOpenEditSheet={setOpenEditDrawer}
          title={taskTitle}
          color={taskColor ?? ""}
          taskPriority={priority}
          taskTag={taskType}
          taskLabel={label ?? ""}
          startDate={startDate}
          endDate={endDate}
          taskStartTime={startTime ?? ""}
          taskEndTime={endTime ?? ""}
          taskReminderTime={reminderTime ? reminderTime : ""}
          id={id}
          getTaskData={getTaskData}
          setOpenEdit={setOpenEdit}
        />
      )}
      <Modal
        transparent={true}
        visible={deleteModal}
        animationType="fade"
        onRequestClose={() => setDeleteModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setDeleteModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <Text style={styles.modalText}>
                  Are you sure you want to delete?
                </Text>
                <View style={styles.buttonContainer}>
                  <Button title="Yes" onPress={handleDelete} />
                  <Button title="No" onPress={() => setDeleteModal(false)} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    //   marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: "blue",
    fontSize: 16,
  },
});
