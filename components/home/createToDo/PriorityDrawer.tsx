import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CircleCheckOutline from "@/components/ui/icons/CircleCheckOutline";

const windowHeight = Dimensions.get("window").height;

export type PriorityDrawerProps = {
  isPriorityDrawerOpen: boolean;
  setIsPriorityDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  priority: string | undefined;
  setPriority: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const priorities = ["High", "Medium", "Low"];

const PriorityDrawer: React.FC<PriorityDrawerProps> = ({
  isPriorityDrawerOpen,
  setIsPriorityDrawerOpen,
  priority,
  setPriority,
}) => {
  const handlePrioritySave = () => {
    setIsPriorityDrawerOpen(false);
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPriorityDrawerOpen}
      >
        <View style={[styles.bottomSheet]}>
          <View style={[styles.container1]}>
            <TouchableOpacity>
              <Text style={[styles.text1]}>New priority</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePrioritySave}>
              <Text style={[styles.text1]}>Done</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={[styles.text2]}>Priority</Text>
            {priorities.map((item, index) => (
              <View
                key={index}
                style={{
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => setPriority(item)}
                  style={{
                    padding: 20,
                    backgroundColor: priority === item ? "#f5f5f5" : "#fff",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderRadius: 10,
                  }}
                >
                  <Text>{item}</Text>
                  {priority === item && (
                    <CircleCheckOutline
                      fillColors="#000"
                      height={20}
                      width={20}
                    />
                  )}
                </TouchableOpacity>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#f5f5f5",
                    width: "95%",
                    alignSelf: "center",
                  }}
                />
              </View>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PriorityDrawer;

const styles = StyleSheet.create({
  // ------------------- Container Styles -------------------
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "flex-start",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    bottom: 0,
    borderWidth: 1,
    height: windowHeight * 0.86,
    backgroundColor: "#fff",
  },
  container1: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // ------------------- Text Styles -------------------
  text1: {
    fontSize: 16,
    fontWeight: "500",
  },
  text2: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
