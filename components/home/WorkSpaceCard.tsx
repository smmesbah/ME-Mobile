import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { ReactNode } from "react";

export type WorkSpaceCardProps = {
  title: string;
  taskCount: string;
  icon: ReactNode;
  cardBackgroundColor?: string;
  onPressFunc?: () => void;
};

const { height, width } = Dimensions.get("screen");

const WorkSpaceCard: React.FC<WorkSpaceCardProps> = ({
  title,
  taskCount,
  icon,
  cardBackgroundColor,
  onPressFunc,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: cardBackgroundColor
            ? cardBackgroundColor
            : "#282635",
        },
      ]}
      onPress={onPressFunc}
    >
      <View style={styles.container1}>{icon}</View>
      <Text style={styles.text1}>{title}</Text>
      <Text style={styles.text2}>{taskCount}</Text>
    </TouchableOpacity>
  );
};

export default WorkSpaceCard;

const styles = StyleSheet.create({
  // ----------------- View Styles -----------------
  container: {
    padding: 20,
    borderRadius: 10,
    height: height / 6,
    width: width / 2.5,
    alignItems: "center",
    gap: 10,
  },
  container1: {
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  // ----------------- Text Styles -----------------
  text1: { fontSize: 16, color: "#fff", fontWeight: "600" },
  text2: { fontSize: 14, color: "#fff", fontWeight: "400" },
});
