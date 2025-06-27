import { ReactElement, useEffect, useState } from 'react'
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { request, PERMISSIONS, RESULTS, openSettings } from "react-native-permissions";
import { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker";

interface IProps {
  navigation: {
    navigate: (name: string) => void
  }
}

interface IStaticTabs {
  id: number,
  name: string,
  icon: ReactElement
}[]

const staticTabs: IStaticTabs[] = [
  {
    id: 1,
    name: "Whishlist",
    icon: <Feather name="heart" size={moderateScale(20)} color={"#000000"} />
  },
  {
    id: 2,
    name: "Address",
    icon: <Feather name="map-pin" size={moderateScale(20)} color={"#000000"} />
  },
  {
    id: 3,
    name: "Help Center",
    icon: <Feather name="headphones" size={moderateScale(20)} color={"#000000"} />
  },
  {
    id: 4,
    name: "Orders",
    icon: <Feather name="box" size={moderateScale(20)} color={"#000000"} />
  },
  {
    id: 5,
    name: "Select Language",
    icon: <FontAwesome name="language" size={moderateScale(20)} color={"#000000"} />
  },
  {
    id: 6,
    name: "Notificatin Settings",
    icon: <Feather name="bell" size={moderateScale(20)} color={"#000000"} />
  },


]

const profileImg = require("./assets/download.jpeg")

const Profile = (props: IProps) => {

  const [userImage, setUserImage] = useState<string>("")

  const openGallery = async () => {
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      quality: 1,
    }
    const selectedImage = await launchImageLibrary(options)
    if (selectedImage.assets) {
      const imageUri = selectedImage.assets[0].uri
      imageUri && setUserImage(imageUri)
    }
  }

  const getCameraPermissions = async () => {
    const permission = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES)
    console.log("permission", permission)
    switch (permission) {
      case RESULTS.BLOCKED:
        return openSettings()
      case RESULTS.DENIED:
        return openSettings()
      case RESULTS.LIMITED:
        return openGallery()
      case RESULTS.GRANTED:
        return openGallery()
      default:
        return openSettings()
    }
  }

  const navigteToStack = (stack: string) => {
    switch (stack) {
      case "Whishlist":
        return props.navigation.navigate("Whishlist")
    }
  }

  const renderEachTab = (tab: IStaticTabs) => {
    return (
      <View key={tab.id}>
        <TouchableOpacity style={styles.eachTab} onPress={() => navigteToStack(tab.name)}>
          <View style={styles.rowConatiner}>
            {tab.icon}
            <Text style={styles.tabName}>{tab.name}</Text>
          </View>
          <Feather name="chevron-right" size={moderateScale(15)} color={"#000000"} />
        </TouchableOpacity>
        <View key={tab.id} style={{ height: 1, backgroundColor: "#00000040", marginHorizontal: scale(-10) }} />
      </View>
    )
  }
  return (
    <View style={styles.profileScreen}>
      <View style={styles.topContainer}>
        <View style={styles.imageFrame}>
          <Image style={styles.imageStyles} resizeMode='cover' source={userImage ? { uri: userImage } : profileImg} />
        </View>
        <TouchableOpacity style={styles.pencilContainer} onPress={getCameraPermissions}>
          <Feather name="camera" size={moderateScale(15)} color={"#000000"} />
        </TouchableOpacity>
        <View>
          <Text style={styles.nameStyles}>Amar kumar</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        {staticTabs.map((eachItem: IStaticTabs) => renderEachTab(eachItem))}
      </View>
      <TouchableOpacity style={styles.logoutContainer}>
        <Text style={styles.logoutTextStyle}>Logout</Text>
        <Feather name="log-out" color={"#FFFFFF"} size={moderateScale(20)} />
      </TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  nameStyles:{
    fontFamily: "Poppins-Medium",
    fontSize: moderateScale(14),
    color: "#FFFFFF",
  },
  logoutTextStyle: {
    fontFamily: "Poppins-Medium",
    fontSize: moderateScale(14),
    color: "#FFFFFF",
  },
  logoutContainer: {
    flexDirection: "row",
    gap: scale(10),
    backgroundColor: "#2874f0",
    height: verticalScale(50),
    marginHorizontal: scale(10),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(10)
  },
  tabName: {
    fontFamily: "Poppins-Medium",
    fontSize: moderateScale(14),
    color: "#000000",
  },
  rowConatiner: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  bottomContainer: {
    paddingHorizontal: scale(10),
    height: verticalScale(370)
  },
  eachTab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: verticalScale(8)
  },
  imageStyles: {
    height: "100%",
    width: "100%",
  },
  pencilContainer: {
    backgroundColor: "#FFFFFF",
    height: moderateScale(25),
    width: moderateScale(25),
    borderRadius: moderateScale(25),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: moderateScale(195),
    top: moderateScale(120)
  },
  topContainer: {
    backgroundColor: "#2874f0",
    height: verticalScale(200),
    justifyContent: "center",
    alignItems: "center",
  },
  imageFrame: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: moderateScale(50),
    overflow: "hidden",
    borderColor: "#00000040",
    borderWidth: 5,
  },
  profileScreen: {
    flex: 1,
  }
})