import { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { FormTextField } from "../../components/inputs/FormTextField";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomButton } from "../../components/buttons/CustomButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { CustomModal } from "../../components/modals/CustomModal";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import { useNotification } from "../../contexts/NotificationContext";
import { useColorMode } from "../../contexts/ThemeContext";

export const Login = () => {
  const navigate = useNavigate();

  const notify = useNotification();

  const colorMode = useColorMode();

  const [showModal, setShowModal] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const handlePasswordToggle = () => {
    setShowPassword((showPass) => !showPass);
  };

  const commonError = "Field is required";

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(commonError),
    password: Yup.string().required(commonError),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = (data: any) => {
    setShowBackdrop(true);
    setTimeout(() => {
      console.log(data);
      setShowBackdrop(false);
      navigate("/control/dashboard");
    }, 1500);
  };

  const handleNavigateForgotPassword = () => {
    setShowModal(true);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CustomBackdrop showBackdrop={showBackdrop} />
      {/*<Box sx={{ position: "absolute", top: 0, right: 0, p: 3 }}>*/}
      {/*  <ThemeSwitch />*/}
      {/*</Box>*/}
      <video
        playsInline
        autoPlay
        muted
        loop
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src={require("../../assets/videos/bgV2.mp4")} />
      </video>
      <Grid
        container
        sx={{
          width: "680px",
          margin: "auto",
          backgroundColor: "background.default",
          borderRadius: "17px",
          overflow: "hidden",
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          p={3}
          className="login-card"
          sx={{ color: "#fff" }}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box width={{ sm: "50%", md: "100%" }}>
            <img
              src={require("../../assets/images/logo.png")}
              alt="logo-png"
              style={{ width: "100%" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} p={5}>
          <Typography
            fontSize={"x-large"}
            fontWeight={700}
            textAlign={"center"}
          >
            Welcome Back
          </Typography>
          <Typography textAlign={"center"} color={"text.secondary"}>
            Login to Continue
          </Typography>
          <Box display={"flex"} flexDirection={"column"} gap={3} mt={4}>
            <FormTextField
              id={"username"}
              register={register("username")}
              label={"Username"}
              disabled={false}
              required={true}
              helperText={
                errors?.username?.message
                  ? errors?.username?.message?.toString()
                  : ""
              }
              error={!!errors?.username?.message}
            />

            <Box>
              <FormTextField
                type={!showPassword ? "password" : "text"}
                id={"password"}
                register={register("password")}
                label={"Password"}
                disabled={false}
                required={true}
                helperText={
                  errors?.password?.message
                    ? errors?.password?.message?.toString()
                    : ""
                }
                error={!!errors?.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position={"end"}>
                      <IconButton size={"small"} onClick={handlePasswordToggle}>
                        {!showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Typography
                fontSize={"small"}
                textAlign={"end"}
                mt={1}
                sx={{ cursor: "pointer" }}
                onClick={handleNavigateForgotPassword}
              >
                Forgot Password?
              </Typography>
            </Box>
          </Box>
          <CustomButton
            sx={{ mt: 3 }}
            text={"Login"}
            variant={"contained"}
            type={"submit"}
            onClick={handleSubmit(handleLogin)}
            fullWidth={true}
          />
        </Grid>
      </Grid>
      <CustomModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        title={"Forgot Password"}
        body={<ForgotPasswordForm setShowModal={setShowModal} />}
      />
    </Box>
  );
};
