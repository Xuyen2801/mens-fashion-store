Tại src/app tạo 1 folder [tên trang] chứa file page.tsx 
    vd: Home/page.tsx
    => file này để gọi component
import từ components
    vd: import Home from "../../components/Home/Home";

Tại src/components tạo folder [tên trang] chứa các file file component 
    vd Home/
        button.jsx
        banner.jsx....

src/app/layout.tsx là phần bao cho toàn bộ các trang web ( header/ footer)
src/app/page.tsx trang gốc mặc định khi chạy http://localhost:3000 
Để chạy các trang khác sửa đường dần thành http://localhost:3000/[tên trang]
    vd http://localhost:3000/Home

CSS trong src/style tạo folder=[tên trang] chứa các file .css

Thư viện icon: https://ionic.io/ionicons
cách dùng 
    import: import { IoCartOutline } from "react-icons/io5"; // cả trong components và cả page.tsx
    gọi trong lớp components : <IoCartOutline/>



