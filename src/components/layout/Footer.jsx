"use client";

import "../../styles/Product/footer.css";
import Image from "next/image";
import Link from "next/link"; // Thêm dòng này
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Footer() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleNewsLetterAction = () => {
    const user = localStorage.getItem("user");

    if (user) {
      router.push("/account");
    } else {
      router.push(`/login?email=${encodeURIComponent(email)}`);
    }
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* CỘT 1 */}
        <div className="footer-col col-1">
          <Image
            src="/images/footer/logo-icondeim.png"
            alt="ICONDENIM"
            width={180}
            height={44}
            className="footer-logo"
          />

          <p>
            Tổng đài CSKH: <strong>02873066660</strong>
          </p>
          <p>Email: cskh@icondenim.com</p>

          <div className="newsletter">
            <p className="newsletter-title">ĐĂNG KÝ NHẬN TIN</p>
            <p className="newsletter-desc">
              Hãy là người đầu tiên nhận khuyến mãi lớn!
            </p>

            <div className="newsletter-box">
              <input
                type="email"
                placeholder="Email của bạn"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleNewsLetterAction}>ĐĂNG KÝ</button>
            </div>
          </div>

          <div className="socials">
            <Image
              src="/images/footer/icon-facebook.png"
              alt=""
              width={28}
              height={28}
            />
            <Image
              src="/images/footer/icon-zalo.png"
              alt=""
              width={28}
              height={28}
            />
            <Image
              src="/images/footer/icon-instagram.png"
              alt=""
              width={28}
              height={28}
            />
            <Image
              src="/images/footer/icon-youtube.png"
              alt=""
              width={28}
              height={28}
            />
            <Image
              src="/images/footer/icon-tiktok.png"
              alt=""
              width={28}
              height={28}
            />
          </div>
        </div>

        {/* CỘT 2 */}
        <div className="footer-col">
          <h4>HỖ TRỢ KHÁCH HÀNG</h4>
          <p>Chính sách đổi hàng và bảo hành</p>
          <p>Chính sách Membership</p>
          <p>Chính sách ưu đãi sinh nhật</p>
          <p>Chính sách bảo mật</p>
          <p>Chính sách giao hàng</p>
        </div>

        {/* CỘT 3 */}
        <div className="footer-col">
          {/* Bọc Link quanh thẻ h4 để click được */}
          <Link
            href="/he-thong-cua-hang"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h4 className="cursor-pointer hover:text-blue-600 transition-colors">
              HỆ THỐNG CỬA HÀNG (15 CH)
            </h4>
          </Link>

          <p>
            <strong>HỒ CHÍ MINH (13 CH)</strong>
            <br />
            Tầng 2 Aeon Mall Bình Tân, Đường số 17A, P. Bình Trị Đông, Bình Tân
          </p>

          <p>
            <strong>HÀ NỘI</strong>
            <br />
            Tầng 2 Aeon Mall Hà Đông, Dương Nội, Hà Đông
          </p>

          <p>
            <strong>ĐỒNG NAI</strong>
            <br />
            1357 Phạm Văn Thuận, Phường Biên Hòa
          </p>

          {/* Thay thẻ <a> cũ bằng thẻ <Link> */}
          <Link
            href="/he-thong-cua-hang"
            className="view-all block mt-4 cursor-pointer hover:text-blue-600"
          >
            XEM TẤT CẢ CỬA HÀNG
          </Link>
        </div>

        {/* CỘT 4 */}
        <div className="footer-col">
          <h4>PHƯƠNG THỨC THANH TOÁN</h4>

          <div className="payments">
            <span>VNPAY</span>
            <span>COD</span>
          </div>

          <div className="certs">
            <Image
              src="/images/footer/bocongthuong.png"
              alt=""
              width={140}
              height={52}
            />
            <Image
              src="/images/footer/dmca.png"
              alt=""
              width={140}
              height={52}
            />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © Bản quyền thuộc về <span>ICONDENIM</span>
      </div>
    </footer>
  );
}
