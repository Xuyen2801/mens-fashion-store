# 💼 HƯỚNG DẪN ĐÓNG GÓP (CONTRIBUTING GUIDELINES)

**Mens Fashion Store – React Project**

Cảm ơn bạn đã tham gia đóng góp vào dự án.  
Để đảm bảo code đồng nhất, dễ review và tránh xung đột trong nhóm, vui lòng tuân thủ các quy định sau.

## 🌿 1. Branch Rules
- Sử dụng định dạng: `feature/tên-chức-năng`

**Ví dụ:**
```
feature/product-card-ui
feature/cart-context
feature/checkout-page
```

---

## 📝 2. Commit Convention
Sử dụng prefix rõ ràng khi commit:

- `feat:` Thêm chức năng mới
- `fix:` Sửa lỗi
- `style:` Thay đổi giao diện hoặc CSS
- `refactor:` Tối ưu hoặc chỉnh sửa lại code
- `docs:` README hoặc tài liệu
- `chore:` Cấu hình, package, setup hệ thống

**Ví dụ:**
```
feat: add product grid component
fix: resolve cart total bug
style: update button hover effect
```

---

## 🔁 3. Pull Request Rules
Trước khi merge vào `develop`, đảm bảo:

- ✔ Code chạy không lỗi
- ✔ Không để console log thừa
- ✔ Đã test giao diện
- ✔ Đặt tên PR rõ ràng
- ✔ Có mô tả nội dung đã thực hiện

---

## 🎨 4. Code Style
- Dùng Function Component
- Dùng Arrow Function
- Tên component viết hoa (PascalCase)
- Mỗi component nằm trong 1 folder riêng
- CSS Module riêng cho từng component

---

## 📁 5. Folder Structure
Phải đặt đúng thư mục quy định:
- UI dùng chung → `components/common`
- Product → `components/product`
- Cart → `components/cart`
- Pages → `pages/...`

---

## 👥 6. Team Workflow
1. Pull code mới nhất từ `develop`
2. Tạo branch feature
3. Code + commit đúng chuẩn
4. Push branch lên GitHub
5. Tạo Pull Request
6. Leader review → merge

---

## ⚠️ 7. Important Rules
- ⛔ Không tự ý sửa code của người khác
- ⛔ Không thay đổi cấu trúc folder
- ⛔ Không push trực tiếp vào `develop` khi chưa được review

---

**Leader:** Hồ Thị Kim Xuyến  
**Mens Fashion Store Team** 💼