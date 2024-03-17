import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import DateTimePicker from "@react-native-community/datetimepicker";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import { collection, addDoc } from "firebase/firestore";
import db from "../../Firebase";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };
  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS == "android") {
        toggleDatePicker();
        setDateOfBirth(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // FOR SECURING THE PASSWORD
  const saltRounds = "$2b$10$3bCFQrcSPwZVXvP5mp4xIu";
  const bcrypt = require("bcryptjs");

  const handleSignup = async () => {
    console.log("Email that will be passed: " + email);
    // Check if any required field is empty

    if (
      !firstName ||
      !lastName ||
      !contactNo ||
      !email ||
      !password ||
      !confirmPassword ||
      !dateOfBirth
    ) {
      alert("Please fill in all required fields.");
      return; // Exit the function if any required field is empty
    }

    // check if password && confirmPassword is the same
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please make sure your passwords match.");
      return; // Exit the function if passwords do not match
    }

    try {
      // Secure the password using Hash
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Add user data to Firestore
      const userRef = await addDoc(collection(db, "users"), {
        firstName: firstName,
        lastName: lastName,
        contactNo: contactNo,
        dateOfBirth: dateOfBirth,
        email: email,
        password: hashedPassword,
      });

      console.log("User added to Firestore with ID:", userRef.id);

      // If adding user data to Firestore is successful, create user account in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User registered:", user.email);
    } catch (error) {
      // Handle specific error cases
      if (error.code === "auth/invalid-email") {
        alert("Invalid email address. Please enter a valid email.");
      } else {
        // Handle other errors
        console.error("Signup error:", error);
        alert(error.message);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/images/apply3.jpg")}
            style={{ height: 300, width: 600 }}
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Register
        </Text>

        <InputField
          label={"First name"}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />

        <InputField
          label={"Last name"}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />

        <InputField
          label={"Contact No"}
          icon={
            <Ionicons
              name="call"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={contactNo}
          onChangeText={(text) => setContactNo(text)}
        />

        {/* D A T E  P I C K E R  */}
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
          />
        )}

        {!showPicker && (
          <Pressable onPress={toggleDatePicker}>
            <InputField
              label={"Date of Birth"}
              editable={false}
              icon={
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color="#666"
                  style={{ marginRight: 5 }}
                />
              }
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
            />
          </Pressable>
        )}

        <InputField
          label={"Email"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />

        <InputField
          label={"Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={password}
          onChangeText={(text) => setPassword(text)}
          inputType="password"
        />

        <InputField
          label={"Confirm Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />

        {/* <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TouchableOpacity onPress={openDatePicker}>
            <Text style={{ color: "#666", marginLeft: 5, marginTop: 5 }}>
              {dobLabel}
            </Text>
          </TouchableOpacity>
        </View> */}

        <CustomButton label={"Register"} onPress={handleSignup} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
