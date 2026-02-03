"use client";

import Image from "next/image";
import Link from "next/link";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* CỘT 1: Logo + Info + Newsletter + Social */}
        <div className="footer-col footer-col-1">
          <div className="footer-logo">
            <Image
              src="/images/logo-icondenim.png"
              alt="ICONDENIM"
              width={180}
              height={44}
              priority
            />
          </div>

          <p>Tổng đài CSKH: <strong>0287 306 6660</strong></p>
          <p>Email: <strong>cskh@icondenim.com</strong></p>

          <div className="newsletter">
            <p className="newsletter-title">ĐĂNG KÝ NHẬN TIN</p>
            <div className="newsletter-box">
              <input type="email" placeholder="Email của bạn" />
              <button>Đăng ký</button>
            </div>
          </div>

          <div className="socials">
            <Image src="/images/icon-facebook.png" alt="Facebook" width={32} height={32}/>
            <Image src="/images/icon-zalo.png" alt="Zalo" width={32} height={32}/>
            <Image src="/images/icon-instagram.png" alt="Instagram" width={32} height={32}/>
            <Image src="/images/icon-youtube.png" alt="YouTube" width={32} height={32}/>
            <Image src="/images/icon-tiktok.png" alt="TikTok" width={32} height={32}/>
          </div>
        </div>

        {/* CỘT 2: Hỗ trợ khách hàng */}
        <div className="footer-col footer-col-2">
          <h4>HỖ TRỢ KHÁCH HÀNG</h4>
          <p>Chính sách đổi hàng và bảo hành</p>
          <p>Chính sách Membership</p>
          <p>Chính sách ưu đãi sinh nhật</p>
          <p>Chính sách bảo mật</p>
          <p>Chính sách giao hàng</p>
        </div>

        {/* CỘT 3: Hệ thống cửa hàng */}
        <div className="footer-col footer-col-3">
          <h4>HỆ THỐNG CỬA HÀNG (15 CH)</h4>
          <p>
            <strong>HỒ CHÍ MINH (13 CH)</strong><br />
            Tầng 2 Aeon Mall Bình Tân, Đường số 17A, P. Bình Trị Đông B
          </p>
          <p>
            <strong>HÀ NỘI</strong><br />
            Tầng 2 Aeon Mall Hà Đông, Dương Nội
          </p>
          <p>
            <strong>ĐỒNG NAI</strong><br />
            1357 Phạm Văn Thuận, Biên Hòa
          </p>
          <Link className="view-all" href="#">XEM TẤT CẢ CỬA HÀNG →</Link>
        </div>

        {/* CỘT 4: Phương thức thanh toán */}
        <div className="footer-col footer-col-4">
          <h4>PHƯƠNG THỨC THANH TOÁN</h4>
          <div className="payments">
            <span>VNPAY</span>
            <span>COD</span>
          </div>
          <div className="certs">
            <Image src="/images/bocongthuong.png" alt="Bộ Công Thương" width={120} height={50}/>
            <Image src="/images/dmca.png" alt="DMCA" width={120} height={50}/>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © Bản quyền thuộc về ICONDENIM
      </div>
    </footer>
  );
}
