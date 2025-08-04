import { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, TextInput, Alert } from "react-native";
import { responsiveWidth, responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from 'react-native-toast-message';

interface IUserData {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}

interface IProps {
    navigation: {
        navigate: (stackName: string) => void
    }
}

const SignUp = (props: IProps) => {
    const [userData, setuserData] = useState<IUserData>({ name: '', email: '', password: '', confirmPassword: '' });
    const [errorMessage, setErrorMessage] = useState<string>()
    const [errorInput, setErrorInput] = useState<string>()
    const [isCheckboxtrue, setCheckboxtrue] = useState<boolean>()
    const [focusInput, setFocusInput] = useState({
        name: false,
        email: false,
        password: false,
        cPassword: false,
    })
    const [isSignUpScreen, setSignUPScreen] = useState<boolean>(true)
    const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false)
    const [iscPasswordVisible, setcPasswordVisible] = useState<boolean>(false)

    useEffect(() => {
       
    }, [userData.confirmPassword]);

    const checkerValidEmail = () => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const validEmail = regex.test(userData.email)
        console.log(validEmail, "validEmail<<<<<")
        return validEmail
    }

    const getUserName = (name: string) => {
        if (userData) {
            let updateUserData = { ...userData, name: name }
            setuserData(updateUserData)
        }
    }
    const getEmail = (text: string) => {
        if (userData) {
            let updateUserData = { ...userData, email: text }
            setuserData(updateUserData)
        }
    }
    const getUserPhonenumber = (text: string) => {
        if (userData) {
            let updateUserData = { ...userData, phonenumber: text }
            setuserData(updateUserData)
        }
    }
    const setInputFocus = (input: string) => {
        setFocusInput({
            name: false,
            email: false,
            password: false,
            cPassword: false,
            [input]: true
        })
    }

    const getPasswordText = (password: string) => {
        let data = { ...userData, password: password }
        setuserData(data)
    }
    const getconfirmPasswordText = (input: string) => {
        let updateData = { ...userData, confirmPassword: input }
        setuserData(updateData)
         if (userData.password !== input) {
            setErrorMessage("Confirm Password should match with Password")
            setErrorInput("confirmPassword")
        }else{
            setErrorMessage("")
            setErrorInput("")
        }
    }
    const showToastMessage = (message:string) => {
        Toast.show({
            type: 'info',
            text1: 'Signup Failed',
            text2: message,
            position:"bottom",
            visibilityTime:30000
        });
    }
    const handleCheckbox = () => {
        setCheckboxtrue(p => !p)
    }
    const handleScreen = () => {
        setSignUPScreen(p => !p)
    }
    const handlePasswordVisibility = () => {
        setPasswordVisible(p => !p)
    }
    const handleCPasswordVisibility = () => {
        setcPasswordVisible(p => !p)
    }
    const handleForgetPasswordScreen = () => {
        props.navigation.navigate("ForgetPassword")
    }
    const handleCreateAccount = async () => {
        setErrorMessage("")
        setErrorInput("")
        if (userData.name === "") {
            setErrorMessage("Please Enter Name")
            setErrorInput("name")
        } else if (userData.email === "") {
            setErrorMessage("Please Enter Email")
            setErrorInput("email")
        } else if (!checkerValidEmail()) {
            setErrorMessage("Please Enter Valid Email")
            setErrorInput("email")
        }
        else if (userData.password === "") {
            setErrorMessage("Please Enter Password")
            setErrorInput("password")
        } else if (userData.confirmPassword === "") {
            setErrorMessage("Please Enter Password")
            setErrorInput("confirmPassword")
        } else {
            try {
                const url = "http://192.168.29.231:5000/api/users/createuser"
                const addnewUser = {
                    name: userData?.name,
                    email: userData?.email,
                    password: userData?.password,
                    confirm_password: userData?.confirmPassword
                }
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(addnewUser)
                }
                const data = await fetch(url, options)
                const response = await data.json()
                if(response.message === "User Created Successfully"){
                    props.navigation.navigate("Home")
                }else{
                    showToastMessage(response.message)
                }
                console.log("CREATED USER>>>>>>",response)
            } catch (error: any) {
                console.log(error.message)
            }
        }
    }
    const handleLogin = () => {

    }
    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle={"dark-content"} />
            <KeyboardAwareScrollView enableOnAndroid={true} bounces={false} style={{ flex: 1 }}>
                <View style={styles.screenContainer}>
                    <Text style={styles.singupText}>{isSignUpScreen ? "Sign Up" : "Sing In"}</Text>
                    <Text style={styles.tagNameStyles}>It was popularised in the 1960s with the release of Letraset sheetscontaining Lorem Ipsum.</Text>
                    <View style={styles.rowContainer}>
                        <TouchableOpacity style={styles.container}>
                            <Entypo name="facebook" size={responsiveFontSize(2.5)} color="#1877F2" />
                            <Text style={styles.socialStyles}>Facebook</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.container}>
                            <Entypo name="google-" size={responsiveFontSize(2.5)} color="#1877F2" />
                            <Text style={styles.socialStyles}>Google</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.orContainer}>
                        <View style={styles.horizontalLine} />
                        <Text style={styles.orTextStyles}>Or</Text>
                        <View style={styles.horizontalLine} />
                    </View>
                    {isSignUpScreen && (
                        <View>
                            <View style={[styles.inputContainer, focusInput.name && { borderWidth: 1, borderColor: "#3461FD" }]}>
                                <TextInput
                                    value={userData?.name}
                                    placeholder="Name"
                                    placeholderTextColor={"#7C8BA0"}
                                    style={styles.inputTextStyle}
                                    onChangeText={getUserName}
                                    // onChangeText={(text) => setuserData({ ...userData, name: text })}
                                    onFocus={() => setInputFocus("name")}
                                />
                            </View>
                            {errorInput === "name" && <Text style={styles.errorMessageStyles}>{errorMessage}</Text>}
                        </View>
                    )}
                    <View>
                        <View style={[styles.inputContainer, focusInput.email && { borderWidth: 1, borderColor: "#3461FD" }]}>
                            <TextInput
                                value={userData.email}
                                placeholder="Email"
                                placeholderTextColor={"#7C8BA0"}
                                style={styles.inputTextStyle}
                                onChangeText={getEmail}
                                onFocus={() => setInputFocus("email")}
                            />
                        </View>
                        {errorInput === "email" && <Text style={styles.errorMessageStyles}>{errorMessage}</Text>}
                    </View>
                    <View>
                        <View style={[styles.inputContainer, focusInput.password && { borderWidth: 1, borderColor: "#3461FD" }]}>
                            <TextInput
                                value={userData?.password}
                                placeholder="Password"
                                placeholderTextColor={"#7C8BA0"}
                                style={styles.inputTextStyle}
                                onChangeText={getPasswordText}
                                onFocus={() => setInputFocus("password")}
                            />
                            <TouchableOpacity onPress={handlePasswordVisibility}>
                                <Feather name={isPasswordVisible ? "eye" : "eye-off"} color={"#7C8BA0"} size={responsiveFontSize(2)} />
                            </TouchableOpacity>
                        </View>
                        {errorInput === "password" && <Text style={styles.errorMessageStyles}>{errorMessage}</Text>}
                    </View>
                    {!isSignUpScreen && (
                        <Text onPress={handleForgetPasswordScreen} style={styles.forgetText}>Forget Passoword? </Text>
                    )}
                    {isSignUpScreen && (
                        <View>
                            <View style={[styles.inputContainer, focusInput.cPassword && { borderWidth: 1, borderColor: "#3461FD" }]}>
                                <TextInput
                                    value={userData?.confirmPassword}
                                    placeholder="Confirm Password"
                                    placeholderTextColor={"#7C8BA0"}
                                    style={styles.inputTextStyle}
                                    onChangeText={getconfirmPasswordText}
                                    onFocus={() => setInputFocus("cPassword")}
                                />
                                <TouchableOpacity onPress={handleCPasswordVisibility}>
                                    <Feather name={iscPasswordVisible ? "eye" : "eye-off"} color={"#7C8BA0"} size={responsiveFontSize(2)} />
                                </TouchableOpacity>
                            </View>
                            {errorInput === "confirmPassword" && (<Text style={styles.errorMessageStyles}>{errorMessage}</Text>)}
                        </View>
                    )}
                    {isSignUpScreen && (
                        <View style={styles.rowContainer2}>
                            <TouchableOpacity onPress={handleCheckbox}>
                                <View style={isCheckboxtrue ? styles.checkboxActive : styles.checkbox} />
                            </TouchableOpacity>
                            <Text style={styles.agreeTerms}>I'm agree to the <Text style={styles.termsAndPolicy}>terms of service</Text> and <Text style={styles.termsAndPolicy}>privacy policy</Text></Text>
                        </View>
                    )}
                    <TouchableOpacity style={styles.creaAccContainer} onPress={isSignUpScreen ? handleCreateAccount : handleLogin}>
                        <Text style={styles.createAccountText}>{isSignUpScreen ? "Create Account" : "Login"}</Text>
                    </TouchableOpacity>
                    {isSignUpScreen ? (
                        <Text style={styles.agreeTerms}>Do you have account? <Text onPress={handleScreen} style={styles.termsAndPolicy}>Sign In</Text></Text>
                    ) : (
                        <Text style={styles.agreeTerms}>Don't you have account? <Text onPress={handleScreen} style={styles.termsAndPolicy}>Sign Up</Text></Text>
                    )}
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    forgetText: {
        fontFamily: "Poppins-Medium",
        fontSize: responsiveFontSize(1.2),
        color: "#7C8BA0",
        paddingVertical: responsiveFontSize(1.5),
        alignSelf: "flex-end",
        marginVertical: responsiveHeight(-1)
    },
    errorMessageStyles: {
        fontFamily: "Poppins-Medium",
        fontSize: responsiveFontSize(1.2),
        color: "red",
    },
    creaAccContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3461FD",
        borderRadius: responsiveWidth(1.5),
        width: "100%",
        marginTop: responsiveHeight(8),
    },
    createAccountText: {
        fontFamily: "Poppins-Medium",
        fontSize: responsiveFontSize(1.8),
        color: "#FFFFFF",
        paddingVertical: responsiveFontSize(1.5),
    },
    termsAndPolicy: {
        fontFamily: "Poppins-Medium",
        fontSize: responsiveFontSize(1.5),
        color: "#3461FD",
    },
    agreeTerms: {
        fontFamily: "Poppins-Medium",
        fontSize: responsiveFontSize(1.5),
        color: "#3B4054",
    },
    checkbox: {
        height: responsiveHeight(2.5),
        width: responsiveHeight(2.5),
        borderRadius: responsiveHeight(0.5),
        borderWidth: 1,
        borderColor: "#3B4054",
        marginRight: responsiveWidth(3)
    },
    checkboxActive: {
        height: responsiveHeight(2.5),
        width: responsiveHeight(2.5),
        borderRadius: responsiveHeight(0.5),
        backgroundColor: "#3461FD",
        marginRight: responsiveWidth(3)
    },
    inputContainer: {
        backgroundColor: "#F5F9FE",
        width: "100%",
        borderRadius: responsiveFontSize(1),
        paddingHorizontal: responsiveWidth(5),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    orTextStyles: {
        fontFamily: "Poppins-Medium",
        fontSize: responsiveFontSize(1.5),
        color: "#262626",
    },
    horizontalLine: {
        height: 1,
        width: "38%",
        backgroundColor: "#E0E5EC",
    },
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between"
    },
    socialStyles: {
        fontFamily: "Poppins-Medium",
        fontSize: responsiveFontSize(1.5),
        color: "#61677D",
        marginLeft: responsiveWidth(2),
    },
    rowContainer2: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        width: "100%",
        marginVertical: responsiveHeight(2),
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F5F9FE",
        borderRadius: responsiveFontSize(1),
        width: "45%",
        height: responsiveHeight(6),
        justifyContent: "center",
    },
    inputTextStyle: {
        fontFamily: "Poppins-Medium",
        fontSize: responsiveFontSize(1.8),
        color: "#262626",
        paddingVertical: responsiveFontSize(2),
        width: "100%",
    },
    tagNameStyles: {
        fontFamily: "Poppins-Regular",
        fontSize: responsiveFontSize(1.5),
        color: "#61677D",
        textAlign: "center",
    },
    singupText: {
        fontFamily: "Poppins-Bold",
        fontSize: responsiveFontSize(3.5),
        color: "#1877F2",
    },
    screenContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: responsiveWidth(5),
        gap: responsiveHeight(1),
        marginTop: responsiveHeight(5),
    },
    mainContainer: {
        paddingTop: responsiveHeight(5),
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
}) 