import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, fullName } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "khavy05092005@gmail.com", 
        pass: "dmgndsnbceqhmngn", 
      },
    });

    const mailOptions = {
      from: '"ICON DENIM STORE" <icondenim@gmail.com>',
      to: email, 
      subject: "🎉 Đăng ký tài khoản thành công!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #000;">Chào mừng ${fullName} đến với ICON DENIM!</h2>
          <p>Tài khoản của bạn đã được tạo thành công với email: <strong>${email}</strong>.</p>
          <p>Cảm ơn bạn đã tin tưởng và đồng hành cùng chúng tôi. Hãy bắt đầu khám phá những bộ sưu tập thời trang nam mới nhất nhé.</p>
          <br/>
          <p>Trân trọng,</p>
          <p><strong>Đội ngũ ICON DENIM</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Gửi email thành công!" }, { status: 200 });
  } catch (error) {
    console.error("Lỗi gửi mail:", error);
    return NextResponse.json({ error: "Không thể gửi email" }, { status: 500 });
  }
}