import * as React from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Slide,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import * as yup from "yup";
import { login } from "../../services/authService";
import { useTheme } from "@mui/material/styles";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function LogIn() {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const theme = useTheme(); // Access theme for consistent styling

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const authForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .email("Please enter a valid email address")
        .required("Email address is required"),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await login(values.username, values.password)
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setSnackbar({
              open: true,
              message: "Login successful! Redirecting to your dashboard...",
              severity: "success",
            });
            setTimeout(() => {
              navigate("/dashboard");
              authForm.resetForm();
            }, 3000);
          });
      } catch (error) {
        console.error("Login error:", error);
        setSnackbar({
          open: true,
          message:
            error.response?.data?.message || "Invalid username or password. Please try again.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: theme.palette.text.primary }}>
          Sign In
        </Typography>
        <Box component="form" onSubmit={authForm.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={authForm.values.username}
            onChange={authForm.handleChange}
            onBlur={authForm.handleBlur}
            error={authForm.touched.username && Boolean(authForm.errors.username)}
            helperText={authForm.touched.username && authForm.errors.username}
            autoFocus
            sx={{ input: { color: theme.palette.text.primary } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={authForm.values.password}
            onChange={authForm.handleChange}
            onBlur={authForm.handleBlur}
            error={authForm.touched.password && Boolean(authForm.errors.password)}
            helperText={authForm.touched.password && authForm.errors.password}
            sx={{ input: { color: theme.palette.text.primary } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
            startIcon={loading ? <CircularProgress size="1rem" /> : null}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password" style={{ color: theme.palette.primary.main }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" style={{ color: theme.palette.primary.main }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={snackbar.open}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
