import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react'
import SearchOutline from '@/components/ui/icons/SearchOutline'
import WorkSpaceCard from '@/components/home/WorkSpaceCard'
import TaskOutline from '@/components/ui/icons/TaskOutline'
import Notes from '@/components/ui/icons/Notes'
import FocusButton from '@/components/ui/buttons/FocusButton'
import TaskCard from '@/components/home/TaskCard'
import { TaskCardProps } from '@/components/home/TaskCard'
import axios from 'axios'
import { ScrollView } from 'react-native-virtualized-view'
import ToDoBottomDrawer from '@/components/home/ToDoBottomDrawer'

const { width, height } = Dimensions.get("screen");
const Home = () => {
  const [focus, setFocus] = useState<string>('In Progress');
  const [taskList, setTaskList] = useState<TaskCardProps[]>([]);
  const [filterTaskList, setFilterTaskList] = useState<TaskCardProps[]>([]);
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
  }, []);

  const getTaskData = async() => {
    try {
      // console.log("Fetching data")
      const user_id = "qwerty";
      const response = await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/todo/${user_id}`)
      const data = response.data;
      // console.log(data)
      setTaskList(data);
      // console.log(dataList)
      const filteredData = data.filter((item:any) => {
        return item.label === focus;
      })
      setFilterTaskList(filteredData);
    }catch(error) {
      console.log(error)
    }
  }

  const handleFocus = (focus: string) => {
    console.log("focus: ", focus);
    setFocus(focus);
    const filteredData = taskList.filter((item) => {
      // console.log(item.label, focus)
      return item.label === focus;
    });
    // console.log(filteredData)
    setFilterTaskList(filteredData)
  }

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
        <Text style={styles.text}>Your workspace</Text>
        <View style={styles.container4}>
          <WorkSpaceCard
            title="Tasks"
            taskCount={`${taskList.length} tasks`}
            icon={<TaskOutline width={30} height={30} />}

          />
          <WorkSpaceCard
            title="Notes"
            taskCount={`${25} notes`}
            icon={<Notes width={30} height={30} />}
            cardBackgroundColor='#fb5158'
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
          data={filterTaskList}
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
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  container1: {
    backgroundColor: '#f1f1f1',
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
    marginTop: 10
  },
  container4: { marginTop: 10, flexDirection: 'row', gap: 20, flexWrap: 'wrap' },
  container5: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10

  },
  // ------------------- Text Styles -------------------
  text: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: 'bold'
  }
})