import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage for storing user data

// Import your logo image
import LogoImage from "../../assets/wfw_logo.png";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../utils/showToasts";
import { useDispatch, useSelector } from "react-redux";
import { SetAuth } from "../../store/Slices/AuthSlice";
import { LoginApi } from "../../httpRequest";

export default function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [ProcessLoading, setProcessLoading] = React.useState(false);
  const dispatch = useDispatch();
  const AuthState = useSelector((state) => state.AuthState);

  const handleLogin = async () => {
    setProcessLoading(true);
    let response;
    try {
      // console.log(AuthState.data);
      if (!email || !password) {
        showInfoToast("All fields are mandatory...");
      } else {
        response = await LoginApi({ email, password });
        console.log(response);
        if (!response.data?.success) {
          showErrorToast(response.data.error.msg);
        } else if (response.data?.success) {
          await AsyncStorage.setItem(
            "user",
            JSON.stringify(response.data.data.payload.user)
          );

          dispatch(SetAuth(response.data.data.payload.user));
          showSuccessToast(response.data.data.msg);
        }
      }
    } catch (error) {
      setProcessLoading(false);
      console.log("error:-----", error);
      //   alert(error.response.data.error.msg);
      // showErrorToast(error.response.data.error.msg);
    } finally {
      setProcessLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    // Implement forgot password logic here
    alert("Forgot Password clicked.");
  };

  const handleSignUp = () => {
    // Implement sign up logic here
    alert("Sign Up clicked.");
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={LogoImage} style={styles.logo} />

      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.titleDesc}>Sign In to your account!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={toggleShowPassword}
          style={styles.eyeIconContainer}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {ProcessLoading ? (
        <ActivityIndicator size="medium" color="#0000ff" /> // Adjust size and color as needed
      ) : (
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}

      {/* Forgot Password */}
      <TouchableOpacity
        onPress={handleForgotPassword}
        style={styles.forgotPasswordContainer}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign Up */}
      {/* <TouchableOpacity onPress={handleSignUp} style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "aliceblue",
  },
  logo: {
    width: 200, // Adjust width as needed
    height: 180, // Adjust height as needed
    marginBottom: 5,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  titleDesc: { fontSize: 20, marginBottom: 25 },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  eyeIconContainer: {
    position: "absolute",
    right: 10,
  },
  button: {
    backgroundColor: "#000",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  forgotPasswordContainer: {
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: "#000",
    textDecorationLine: "underline",
    fontSize: 18,
  },
  signUpContainer: {
    marginTop: 10,
  },
  signUpText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
});
