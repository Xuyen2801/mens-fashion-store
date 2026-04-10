import axios from 'axios';
import { auth } from './firebase-config'; 
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtpLogic = async (phoneNumber) => {
  const mode = import.meta.env.VITE_OTP_MODE;

  if (mode === 'DEVELOPMENT') {
    const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
    return await signInWithPhoneNumber(auth, phoneNumber, verifier);
  } else {
    const otp = generateOTP();
    localStorage.setItem('otp_real', otp); 

    await axios.get(`https://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V2/`, {
      params: {
        Phone: phoneNumber,
        Content: `Ma OTP cua ban la ${otp}`,
        ApiKey: import.meta.env.VITE_ESMS_API_KEY,
        SecretKey: import.meta.env.VITE_ESMS_SECRET_KEY,
        SmsType: 2
      }
    });
    return { type: 'API_REAL' };
  }
};