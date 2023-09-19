import {
  TextField,
  Typography,
  Grid,
  Link,
  Button,
  Box,
  Card,
  CardMedia,
} from "@mui/material";
 import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import PasswordInput from "../../components/PasswordInput";
import useAlert from "../../components/hooks/useAlert";
import useAuth from "../../components/hooks/useAuth";
import Container from "../../components/Container";
import useMediaQuery from "@mui/material/useMediaQuery";

import "./Signup.css";

function SignUp() {
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const isMobileOrTablet = useMediaQuery("(max-width: 960px)");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dateofbirth: "",
    address: "",
    colony: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phone: "",
    passwordConfirmation: "",
  });

  const { register } = useAuth();

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData?.name ||
      !formData?.email ||
      !formData?.password ||
      !formData?.passwordConfirmation ||
      !formData?.dateofbirth ||
      !formData?.address ||
      !formData?.colony ||
      !formData?.city ||
      !formData?.state ||
      !formData?.country ||
      !formData?.pincode ||
      !formData?.phone
    ) {
      setMessage({ type: "error", text: "All fields are mandatory!" });
      return;
    }

    const {
      name,
      email,
      password,
      passwordConfirmation,
      dateofbirth,
      address,
      colony,
      city,
      state,
      country,
      pincode,
      phone,
    } = formData;

    const emailPattern = /^\w+@gmail\.com$/;
    if (!emailPattern.test(email)) {
      setMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
      setMessage({
        type: "error",
        text: "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, and one number.",
      });
      return;
    }

    if (password !== passwordConfirmation) {
      setMessage({ type: "error", text: "Passwords must be the same!" });
      return;
    }

    try {
      await register({
        name,
        email,
        password,
        passwordConfirmation,
        dateofbirth,
        address,
        colony,
        city,
        state,
        country,
        pincode,
        phone,
      });

      await postDataToFirebase({
        name,
        email,
        password,
        passwordConfirmation,
        dateofbirth,
        address,
        colony,
        city,
        state,
        country,
        pincode,
        phone,
      });
      navigate("/profile", { state: { userData: formData } });

      setMessage({
        type: "success",
        text: "Registration successfully complete!",
      });
      navigate("/sign-in");
    } catch (error) {
      if (error.message) {
        setMessage({
          type: "error",
          text: error.message,
        });
        return;
      }
      setMessage({
        type: "error",
        text: "Error, try again in a few seconds!",
      });
    }
  }

  async function postDataToFirebase(data) {
    try {
      const res = await fetch(
        "https://pwa-app-2b96d-default-rtdb.firebaseio.com/Sign-up-form.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to store data in the database");
      }
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "Error storing data in the database",
      });
    }
  }

  const maxDate = "2023-12-31";

  return (
    <>
       
   <Grid container>

   {!isMobileOrTablet && (
 <Grid item xs={6} md={6} lg={6} style={{        display:'flex',
 justifyContent:'center',
 alignItems:'center'
}} > 
 
          <Card
            sx={{
              maxWidth: 700,
              minWidth: 300,
              display: { xs: "none", sm: "block" },
              boxShadow: "none",
              // border:'1px solid blue',
      
            }}
          >
            <CardMedia
              component="img"
              height="100%"
              image="./images2/typing2.gif"
              alt="Image"
            />
          </Card>
        </Grid>
           )}  
           
     <Grid item xs={12} md={6} lg={6} >
     <Card style={{ boxShadow: "none"  }}>
          <Form onSubmit={handleSubmit}  >
          
              <Typography
                sx={{
                  color: "green",
                }}
                variant="h4"
                component="h1"
                padding={5}
              >
                Create account
              </Typography>

      <Box style={{padding:10}}>

      <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6} md={6}>
                  <TextField
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.name}
                    InputProps={{
                      style: { backgroundColor: "white" },
                    }}
                  />{" "}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    onChange={handleInputChange}
                    value={formData.email}
                    InputProps={{
                      style: { backgroundColor: "white" },
                    }}
                  />{" "}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    name="password"
                    fullWidth
                    label="Password"
                    onChange={handleInputChange}
                    value={formData.password}
                    inputProps={{
                      style: { backgroundColor: "white" },
                    }}
                  />{" "}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    name="passwordConfirmation"
                    fullWidth
                    label="Confirm your password"
                    onChange={handleInputChange}
                    value={formData.passwordConfirmation}
                  />{" "}
                </Grid>

                <Grid item xs={6} md={6}>
                  <TextField
                    name="dateofbirth"
                    fullWidth
                    label="Date of birth"
                    type="date"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.dateofbirth}
                    inputProps={{
                      style: { backgroundColor: "white" },
                      max: maxDate,
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    name="address"
                    label="Address"
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.address}
                    inputProps={{
                      style: { backgroundColor: "white" },
                    }}
                  />{" "}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    name="colony"
                    label="Colony"
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.colony}
                    inputProps={{
                      style: { backgroundColor: "white" },
                    }}
                  />{" "}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    name="city"
                    label="City"
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.city}
                    inputProps={{
                      style: { backgroundColor: "white" },
                    }}
                  />{" "}
                </Grid>

                <Grid item xs={6} md={6}>
                  <TextField
                    name="state"
                    label="State"
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.state}
                    inputProps={{
                      style: { backgroundColor: "white" },
                    }}
                  />{" "}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    name="country"
                    label="Country"
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.country}
                    inputProps={{
                      style: { backgroundColor: "white" },
                    }}
                  />{" "}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    name="pincode"
                    label="Pin code"
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.pincode}
                    inputProps={{
                      style: { backgroundColor: "white" },
                    }}
                  />{" "}
                </Grid>
                <Grid item xs={6} md={6}>
                  <TextField
                    name="phone"
                    label="Phone No"
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.phone}
                    inputProps={{
                      style: { backgroundColor: "white" },
                    }}
                  />{" "}
                </Grid>
              </Grid>

      </Box>

              <Box style={{ padding: 10 }}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    backgroundColor: "green",
                    "&:hover": { backgroundColor: "#3CB371" },
                  }}
                >
                  Sign Up
                </Button>
              </Box>
              <Link
                component={RouterLink}
                to="/sign-in"
                sx={{ textDecoration: "none", color: "green" }}
              >
                <Typography variant="h6" padding={1}>
                  Already have an account ?
                </Typography>
              </Link>
          
          </Form>
        </Card>
     </Grid>
</Grid>


 

     </>
  );
}

export default SignUp;
