import { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"
import Feather from "react-native-vector-icons/Feather"

interface IProps {
    navigation: {
        goBack: () => void,
        navigate: (stack: string) => void
    }
}

const ResetPassword = (props: IProps) => {
    const [ newPassword, setNewPassword] = useState<string>("")
    const [ confirmPassword, setConfirmPassword] = useState<string>("")
    const [newPasswordFocus,setNewPasswordFocus] = useState(false)
    const [confirmPasswordFocus,setConfirmPasswordFocus] = useState<boolean>(false)
    const [passwordVisibility,setPasswordVisibility] = useState<boolean>(false)
    const [confirmPasswordVisibility,setConfirmPasswordVisibility] = useState<boolean>(false)
    const backnavigation = () => {
        props.navigation.goBack()
    }

    const navigateToRestPasswordScreen = () => {
        props.navigation.navigate("ResetPassword")
    }

    const getNewPasswordInput = (password:string) =>{
        setNewPassword(password)
    }

    const handleNewPasswordVisibility = () =>{
        setPasswordVisibility(p => !p)
    }

    const getNewConfirmPasswordInput = (password:string) =>{
        setConfirmPassword(password)
    } 

    const handleConfirmPasswordVisibility = () =>{
        setConfirmPasswordVisibility(p => !p)
    }

    return (
        <View style={styles.forgetScreen}>
            <TouchableOpacity onPress={backnavigation}>
                <Feather name="arrow-left" color={"#000000"} size={responsiveFontSize(3)} />
            </TouchableOpacity>
            <Text style={styles.forgetText}>Reset Password</Text>
            <Text style={styles.tagNameStyles}>It was popularised in the 1960s with the release of Letraset sheetscontaining Lorem Ipsum.</Text>
            <View>
                <View style={[styles.inputContainer, newPasswordFocus && { borderWidth: 1, borderColor: "#3461FD" }]}>
                    <TextInput
                        value={newPassword}
                        placeholder="New Password"
                        placeholderTextColor={"#7C8BA0"}
                        style={styles.inputTextStyle}
                        onChangeText={getNewPasswordInput}
                        onFocus={() => setNewPasswordFocus(true)}
                    />
                    <TouchableOpacity onPress={handleNewPasswordVisibility}>
                        <Feather name={passwordVisibility ? "eye" : "eye-off"} color={"#000000"} size={responsiveFontSize(2)} />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <View style={[styles.inputContainer, confirmPasswordFocus && { borderWidth: 1, borderColor: "#3461FD" }]}>
                    <TextInput
                        value={confirmPassword}
                        placeholder="Confirm New Password"
                        placeholderTextColor={"#7C8BA0"}
                        style={styles.inputTextStyle}
                        onChangeText={getNewConfirmPasswordInput}
                        onFocus={() => setConfirmPasswordFocus(true)}
                    />
                    <TouchableOpacity onPress={handleConfirmPasswordVisibility}>
                        <Feather name={confirmPasswordVisibility ? "eye" : "eye-off"} color={"#000000"} size={responsiveFontSize(2)} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.continueButton} onPress={navigateToRestPasswordScreen}>
                <Text style={styles.continueBtnText}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ResetPassword

const styles = StyleSheet.create({
    continueBtnText: {
        fontFamily: "Poppins-Medium",
        fontSize: responsiveFontSize(1.8),
        color: "#FFFFFF",
        paddingVertical: responsiveFontSize(1.5),
    },
    continueButton: {
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
        borderWidth: 0.5,
        borderColor: "#3461FD",
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
        textAlign: "center",
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