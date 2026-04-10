import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const { phone, otp } = await request.json();

    const response = await axios.get(`https://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V2/`, {
      params: {
        Phone: phone,
        Content: `Ma OTP cua ban la: ${otp}`,
        ApiKey: process.env.NEXT_PUBLIC_ESMS_API_KEY,
        SecretKey: process.env.NEXT_PUBLIC_ESMS_SECRET_KEY,
        SmsType: 2
      }
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi Server" }, { status: 500 });
  }
}