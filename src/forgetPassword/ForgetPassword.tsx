import { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"
import Feather from "react-native-vector-icons/Feather"

interface IProps {
    navigation: {
        goBack: () => void,
        navigate:(stack:string)=>void
    }
}

const ForgetPassword = (props: IProps) => {
    const [phonenumber,setPhonenumber] = useState<string>("")
    const backnavigation = () => {
        props.navigation.goBack()
    }
    const getUserPhoneNumber = (number:string) =>{
        setPhonenumber(number)
    }
    const navigateToRestPasswordScreen = () =>{
        props.navigation.navigate("ResetPassword")
    }
    return (
        <View style={styles.forgetScreen}>
            <TouchableOpacity onPress={backnavigation}>
                <Feather name="arrow-left" color={"#000000"} size={responsiveFontSize(3)} />
            </TouchableOpacity>
            <Text style={styles.forgetText}>Forget Password</Text>
            <Text style={styles.tagNameStyles}>It was popularised in the 1960s with the release of Letraset sheetscontaining Lorem Ipsum.</Text>
            <View>
                <View style={[styles.inputContainer]}>
                    <TextInput
                        value={phonenumber}
                        placeholder="Confirm Password"
                        placeholderTextColor={"#7C8BA0"}
                        style={styles.inputTextStyle}
                        onChangeText={getUserPhoneNumber}
                        focusable={true}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.continueButton} onPress={navigateToRestPasswordScreen}>
                                    <Text style={styles.continueBtnText}>Continue</Text>
                                </TouchableOpacity>
        </View>

    )
}

export default ForgetPassword

const styles = StyleSheet.create({
    continueBtnText: {
        fontFamily: "Poppins-Medium",
        fontSize: responsiveFontSize(1.8),
        color: "#FFFFFF",
        paddingVertical: responsiveFontSize(1.5),
    },
    continueButton:{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3461FD",
        borderRadius: responsiveWidth(1.5),
        width: "100%",
        marginTop: responsiveHeight(8),
    },
    inputTextStyle: {
        fontFamily: "Poppins-Medium",
        fontSize: responsiveFontSize(1.8),
        color: "#262626",
        paddingVertical: responsiveFontSize(2),
        width: "100%",
    },
    inputContainer: {
        backgroundColor: "#F5F9FE",
        width: "100%",
        borderRadius: responsiveFontSize(1),
        paddingHorizontal: responsiveWidth(5),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth:0.5,
        borderColor:"#3461FD",
    },
    tagNameStyles: {
        fontFamily: "Poppins-Regular",
        fontSize: responsiveFontSize(1.5),
        color: "#61677D",
        textAlign: "center",
    },
    forgetText: {
        fontFamily: "Poppins-Bold",
        fontSize: responsiveFontSize(3.5),
        color: "#1877F2",
        textAlign:"center",
    },
    forgetScreen: {
        paddingTop: responsiveHeight(5),
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: responsiveWidth(5),
        gap: responsiveHeight(1),
        marginTop: responsiveHeight(5),
    },
})