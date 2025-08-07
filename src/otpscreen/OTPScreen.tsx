import { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { OtpInput } from "react-native-otp-entry"
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"
import Feather from "react-native-vector-icons/Feather"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../redux/Store"
import { updateToken } from "../redux/AuthSlicer"

interface IProps {
    navigation: {
        goBack: () => void,
        navigate: (stack: string) => void
    }
}

const OTPScreen = (props: IProps) => {

    const dispatch = useDispatch<AppDispatch>()

    const backnavigation = () => {
        props.navigation.goBack()
    }

    const handleOTPSuccess = () => {
        dispatch(updateToken())
    }

    return (
        <View style={styles.otpScreen}>
            <TouchableOpacity onPress={backnavigation}>
                <Feather name="arrow-left" color={"#000000"} size={responsiveFontSize(3)} />
            </TouchableOpacity>
            <Text style={styles.otpText}>Reset Password</Text>
            <Text style={styles.otpNameStyles}>Enter the OTP code we just sent you on your registered Email/Phone number</Text>
            <View>
                <OtpInput
                    numberOfDigits={6}
                    focusColor="#1877F2"
                    autoFocus={false}
                    hideStick={true}
                    placeholder="******"
                    blurOnFilled={true}
                    disabled={false}
                    type="numeric"
                    secureTextEntry={false}
                    focusStickBlinkingDuration={500}
                    onFocus={() => console.log("Focused")}
                    onBlur={() => console.log("Blurred")}
                    onTextChange={(text:string) => console.log(text)}
                    onFilled={(text:string) => console.log(`OTP is ${text}`)}
                    textInputProps={{
                        accessibilityLabel: "One-Time Password",
                    }}
                    textProps={{
                        accessibilityRole: "text",
                        accessibilityLabel: "OTP digit",
                        allowFontScaling: false,
                    }}
                />
            </View>
            <Text style={styles.resendOTPTextColor}>Didn't get OTP? <Text style={{...styles.resendOTPTextColor,color: "#1877F2",}}>Resend OTP</Text></Text>

            <TouchableOpacity style={styles.resetButtonCon} onPress={handleOTPSuccess}>
                <Text style={styles.resetButtonText}>Reset Password</Text>
            </TouchableOpacity>
        </View>
    )

}

export default OTPScreen

const styles = StyleSheet.create({
    resendOTPTextColor: {
        fontFamily: "Poppins-Regular",
        fontSize: responsiveFontSize(1.5),
        textAlign: "center",
    },
    resetButtonText: {
        fontFamily: "Poppins-Medium",
        fontSize: responsiveFontSize(1.8),
        color: "#FFFFFF",
        paddingVertical: responsiveFontSize(1.5),
    },
    resetButtonCon: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3461FD",
        borderRadius: responsiveWidth(1.5),
        width: "100%",
        marginTop: responsiveHeight(8),
    },
    otpNameStyles: {
        fontFamily: "Poppins-Regular",
        fontSize: responsiveFontSize(1.5),
        color: "#61677D",
        textAlign: "center",
    },
    otpText: {
        fontFamily: "Poppins-Bold",
        fontSize: responsiveFontSize(3.5),
        color: "#1877F2",
        textAlign: "center",
    },
    otpScreen:{
        paddingTop: responsiveHeight(5),
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: responsiveWidth(5),
        gap: responsiveHeight(1),
        marginTop: responsiveHeight(5),
    }
})