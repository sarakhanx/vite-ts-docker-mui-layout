import api from "../services/authUserApi"
import { Grid, TextField, Button, Box, Container, Typography, Checkbox, FormControlLabel, Link } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

const Login = () => {

  const navigate = useNavigate()

  // useForm hook
  const { register, handleSubmit, formState: { errors } } = useForm()

  
  // onSubmit function
  const onSubmit = (data: any) => {
      // Call API
    // Payload
    const authData = {
      "identifier": data.username,
      "password": data.password
    }

    api.authLogin(authData).then((response: any) => {
      if(response.status === 200){
        console.log('login successfully')
        localStorage.setItem('token',response.data.jwt)
        navigate('/backend/dashboard')
      }else if (response.status === 400){
        console.log('not found user')
      }else{
        console.log("unknow problem occured in server side please open ticket")
      }
    }).catch((error) => {
      console.log(error)
    })
  }




  return (
    <>
      <Container component="main" maxWidth="xs">

        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h5" variant="h5">
            Sign in
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>

            <TextField
              margin="normal"
              fullWidth
              autoFocus
              label="Username"
              type="text"
              variant="outlined"
              {...register("username", { required: true, minLength: 5 })}
              error={errors.username ? true : false}
              helperText={errors.username ? "Username is required" : ""}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              {...register("password", { required: true })}
              error={errors.password ? true : false}
              helperText={errors.password ? "Password is required" : ""}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />


            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="info"
              sx={{ mt: 3, mb: 3 }}
            >
              Submit
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

          </Box>
        </Box>

      </Container >
    </>
  )
}

export default Login