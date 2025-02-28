import React,{useState} from 'react'
import {Typography,Button,TextField} from "@mui/material";
import { authenticationController } from '@/api/auth';
import {COLORS} from "@/utils/colors";
const UserVerifyForm = ({setVerifiedData}) => {
   const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(null);
  
    const handleSendOtp = () => {
      if (email) {
        let payload={
          "email":email,
          "user_type": "USER"

         
      }
      
         authenticationController.signUpLoginViaEmail(payload).then((response)=>{
              //  console.log("Response in the email verification: ",response.data);
               setOtpSent(response.data);
         }).catch((error)=>{
             console.log("Error in email verification: ",error);
         })
      }
    };
  
    const handleVerifyOtp = () => {
      console.log(otpSent.data);
      let payload={
        reference_id:otpSent?.data?.reference_id,
        otp:otpSent?.data?.OTP
    }
      authenticationController.verifyEmailOtp(payload).then((response)=>{
        console.log("Response after the email and otp verification: ",response.data.data);
        if(response.statusText==="OK"){
          setVerifiedData(response.data.data);
          localStorage.setItem("access_token",response?.data?.data?.access_token)
        }
      })
    };

   
  
  return (
    <>
    <Typography variant="h6" sx={{ mb: "12px",fontWeight:600 }}>
   Verify Your Email
  </Typography>
  <form>
    <TextField
      fullWidth
      label="Email"
      variant="outlined"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      sx={{ mb: 2 }}
      type='email'
      
    />
    
    {(otpSent) ? (
      <>
      <Typography sx={{color:COLORS.GREEN}}>{otpSent?.message}</Typography>
        <TextField
          fullWidth
          label="Enter OTP"
          variant="outlined"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          sx={{ mb: 2, mt: 2 }}
          disabled={(otpSent)?false:true}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleVerifyOtp}
          disabled={!otp}
        >
          Verify OTP
        </Button>
      </>
    ) : (
    <Button
        variant="contained"
        sx={{width:"150px"}}
        onClick={handleSendOtp}
        disabled={!email}
      >
        Send OTP
      </Button>)}
  </form>
  </>
  )
}

export default UserVerifyForm