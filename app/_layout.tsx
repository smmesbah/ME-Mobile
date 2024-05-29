import LeftArrow from "@/components/ui/icons/LeftArrow";
import { Slot, router, usePathname } from "expo-router";
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width, height } = Dimensions.get("screen");

// Header component
const Header = () => {
  const pathname = usePathname();
  const header = pathname.split('/').pop();
  const headerName = header?.charAt(0).toUpperCase() + header?.slice(1)!;
  return (
    <View
      style={{
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.05,
      }}
    >
      {
        router.canGoBack() && (
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <LeftArrow height={34} width={34} />
          </TouchableOpacity>
        )
      }
      <Text style={{ color: '#000', fontSize: 20, fontWeight: '500', }}>{headerName}</Text>
    </View>
  );
};

export default function RootLayout() {
  const pathname = usePathname();
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {
          pathname === '/auth/login' || pathname === '/auth/register' ? <Header /> : null
        }
        <Slot />
        {/* <View style={{backgroundColor: 'red'}}>
          <Text>Hello</Text>
        </View>
        <View style={{backgroundColor: 'red'}}>
          <Text>Hellooooo</Text>
        </View> */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: 20,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  }
})