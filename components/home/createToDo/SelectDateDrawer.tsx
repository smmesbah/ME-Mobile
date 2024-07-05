import {
  Dimensions,
  LayoutChangeEvent,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";

export type SelectDateDrawerProps = {
  isSelectDateOpen: boolean;
  setIsSelectDateOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDay: string;
  setSelectedDay: React.Dispatch<React.SetStateAction<string>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

const SelectDateDrawer: React.FC<SelectDateDrawerProps> = ({
  isSelectDateOpen,
  setIsSelectDateOpen,
  selectedDay,
  setSelectedDay,
  setSelectedDate,
}) => {
  const windowHeight = Dimensions.get("window").height;
  const [selected, setSelected] = useState("");
  const [calenderWidth, setCalenderWidth] = useState(0);

  useEffect(() => {
    if (selectedDay) {
      const inputDate = selectedDay;

      // Parse the input date string
      const dateParts = inputDate.split(" ");
      const monthName = dateParts[0];
      const day = parseInt(dateParts[1].replace(",", ""), 10);
      const year = parseInt(dateParts[2], 10);

      // Map month names to month numbers
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const month = monthNames.indexOf(monthName) + 1;

      // Create a new Date object
      const date = new Date(year, month - 1, day);

      // Format the Date object to "YYYY-MM-DD"
    //   const formattedDate = date.toISOString().slice(0, 10);
    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day+1).padStart(2, '0')}`;

        console.log(formattedDate);
      setSelected(formattedDate);
    }
  }, []);

  const handleLayout = (event: LayoutChangeEvent) => {
    setCalenderWidth(event.nativeEvent.layout.width);
  };
  const handleDayPress = (day: any) => {
    // console.log(day)
    const selectedDate = moment(day.dateString);
    const today = moment().startOf("day");
    const tomorrow = moment().add(1, "days").startOf("day");

    let formattedDate;
    if (selectedDate.isSame(today, "day")) {
      formattedDate = "Today";
    } else if (selectedDate.isSame(tomorrow, "day")) {
      formattedDate = "Tomorrow";
    } else {
      formattedDate = selectedDate.format("MMMM D, YYYY");
    }
    console.log(formattedDate);
    setSelected(day.dateString);
    setSelectedDate(selectedDate.toDate());
    setSelectedDay(formattedDate);
  };

  const handleDonePress = () => {
    if (selected === "") {
      alert("Please select a date");
      return;
    }
    setIsSelectDateOpen(false);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSelectDateOpen}
      >
        <View
          style={[
            styles.bottomSheet,
            { height: windowHeight * 0.86, backgroundColor: "#fff" },
          ]}
        >
          {/* Top section */}
          <View style={[styles.container1]}>
            <TouchableOpacity onPress={handleDonePress}>
              <Text style={[styles.text1]}>Done</Text>
            </TouchableOpacity>
          </View>

          <View onLayout={handleLayout} style={[styles.container2]}>
            <View>
              <Text style={[styles.text2]}>
                {selectedDay === "" ? "Select any day" : selectedDay}
              </Text>
            </View>
            <Calendar
              onDayPress={(day: any) => handleDayPress(day)}
              markedDates={{
                [selected]: { selected: true, disableTouchEvent: true },
              }}
              minDate={new Date().toString()}
              style={{
                width: calenderWidth,
              }}
              theme={{}}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SelectDateDrawer;

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
    borderWidth: 1,
  },
  container1: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container2: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 20,
  },
  // ------------------- Text Styles -------------------
  text1: {
    fontSize: 16,
    fontWeight: "500",
  },
  text2: { color: "#000", fontSize: 18, fontWeight: "600" },
});
