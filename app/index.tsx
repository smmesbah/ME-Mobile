import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT from "expo-jwt";
import { Redirect, router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // checkSession();
    router.replace('/home')
  }, [])

  // check user already logged in or not
  const checkSession = async () => {
    // await AsyncStorage.removeItem("Me-token");
    router.replace('/home')
    // try {
    //   const token = await AsyncStorage.getItem("Me-token");
    //   if (token) {
    //     // if token is present , check if it is valid or not
    //     const decoded = JWT.decode(token!, process.env.EXPO_PUBLIC_JWT_SECRET!);
    //     if (decoded) {
    //       setLoading(false);
    //       router.replace("/home");
    //     }
    //   } else {
    //     setLoading(false);
    //     router.replace("/auth/login");
    //   }
    // } catch (error: any) {
    //   console.error("Error while decoding JWT token:", error);
    //   setLoading(false);
    //   alert("Your session has expired. Please login again.");
    //   await AsyncStorage.removeItem("Me-token");
    //   router.replace("/auth/login");
    // }

  }
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }
  // return (
  //   <Redirect href={"/auth/login"} />
  // );
}
