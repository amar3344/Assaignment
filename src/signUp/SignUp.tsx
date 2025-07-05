import { useState } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, TextInput } from "react-native";
import { responsiveWidth, responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";
import Entypo from "react-native-vector-icons/Entypo";

interface IUserData {
    name:string,
    email:string,
    phonenumber:string,
    password:string,
    confirmPassword:string,
}

const SignUp = () => {
    const [userData,setuserData] = useState<IUserData>()
    const [errorMessage,setErrorMessage] = useState<string>()
    const [isCheckboxtrue,setCheckboxtrue] = useState<boolean>()

    const getUserName = (name:string) =>{
        if(userData?.name){
            let updateUserData = {...userData,name:name}
            setuserData(updateUserData)
        }
    }
    const getEmailOrPhonenumber = (input:string) =>{
        let isMail = input.includes("@")
        if(isMail && userData?.email){
            let updateData = {...userData,email:input}
            setuserData(updateData)
        }else if (userData?.phonenumber){
            let updateData = {...userData,phonenumber:input}
            setuserData(updateData)
        }
    }
    const getPasswordText = (password:string) =>{
        if(userData?.password){
            let data = {...userData,password:password}
            setuserData(data)
        }
    }
    const getconfirmPasswordText = (input:string) =>{
        if(userData?.confirmPassword){
            let updateData = {...userData,confirmPassword:input}
            setuserData(updateData)
        }
        if(userData?.password !== userData?.confirmPassword){
            setErrorMessage("Confirm Password should match with Password")
        }
    }
    const handleCheckbox = () =>{
        setCheckboxtrue(p => !p)
    }
    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle={"dark-content"} />
            <View style={styles.screenContainer}>
                <Text style={styles.singupText}>SignUp</Text>
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
                <View style={styles.inputContainer}>
                    <TextInput
                        value={userData?.name}
                        placeholder="Name"
                        placeholderTextColor={"#7C8BA0"}
                        style={styles.inputTextStyle}
                        onChangeText={getUserName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={userData?.email}
                        placeholder="Email/Phonenumber"
                        placeholderTextColor={"#7C8BA0"}
                        style={styles.inputTextStyle}
                        onChangeText={getEmailOrPhonenumber}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={userData?.password}
                        placeholder="Password"
                        placeholderTextColor={"#7C8BA0"}
                        style={styles.inputTextStyle}
                        onChangeText={getPasswordText}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={userData?.password}
                        placeholder="Confirm Password"
                        placeholderTextColor={"#7C8BA0"}
                        style={styles.inputTextStyle}
                        onChangeText={getconfirmPasswordText}
                    />
                </View>
                <Text style={styles.errorMessageStyles}>{errorMessage}</Text>
                <View style={styles.rowContainer2}>
                    <TouchableOpacity onPress={handleCheckbox}>
                        <View style={isCheckboxtrue ? styles.checkboxActive : styles.checkbox}/>
                    </TouchableOpacity>
                    <Text style={styles.agreeTerms}>I'm agree to the <Text style={styles.termsAndPolicy}>terms of service</Text> and <Text style={styles.termsAndPolicy}>privacy policy</Text></Text>
                </View>
                <TouchableOpacity style={styles.creaAccContainer}>
                    <Text style={styles.createAccountText}>Create Account</Text>
                </TouchableOpacity>
                <Text style={styles.agreeTerms}>Do you have account? <Text style={styles.termsAndPolicy}>Sign In</Text></Text>
            </View>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    errorMessageStyles:{
        fontFamily: "Poppins-Medium",
        fontSize: responsiveFontSize(1.2),
        color: "red",
    },
    creaAccContainer:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#3461FD",
        borderRadius:responsiveWidth(1.5),
        width:"100%",
        marginTop:responsiveHeight(8),
    },
    createAccountText:{
        fontFamily: "Poppins-Medium",
        fontSize: responsiveFontSize(1.8),
        color: "#FFFFFF",
        paddingVertical:responsiveFontSize(1.5),
    },
    termsAndPolicy:{
        fontFamily: "Poppins-Medium",
        fontSize: responsiveFontSize(1.5),
        color: "#3461FD",
    },
    agreeTerms:{
        fontFamily: "Poppins-Medium",
        fontSize: responsiveFontSize(1.5),
        color: "#3B4054",
    },
    checkbox:{
        height:responsiveHeight(2.5),
        width:responsiveHeight(2.5),
        borderRadius:responsiveHeight(0.5),
        borderWidth:1,
        borderColor:"#3B4054",
        marginRight:responsiveWidth(3)
    },
    checkboxActive:{
        height:responsiveHeight(2.5),
        width:responsiveHeight(2.5),
        borderRadius:responsiveHeight(0.5),
        backgroundColor:"#3461FD",
        marginRight:responsiveWidth(3)
    },
    inputContainer: {
        backgroundColor: "#F5F9FE",
        width: "100%",
        borderRadius: responsiveFontSize(1),
        paddingHorizontal: responsiveWidth(5),
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
    },
    tagNameStyles: {
        fontFamily: "Poppins-Regular",
        fontSize: responsiveFontSize(1.5),
        color: "#61677D",
        textAlign: "center",
    },
    singupText: {
        fontFamily: "Poppins-Bold",
        fontSize: responsiveFontSize(2.5),
        color: "#1877F2",
    },
    screenContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: responsiveWidth(5),
        gap: responsiveHeight(2),
        marginTop:responsiveHeight(10),
    },
    mainContainer: {
        paddingTop: responsiveHeight(5),
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
})