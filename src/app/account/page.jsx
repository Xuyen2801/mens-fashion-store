"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiCreditCard, FiBox, FiTruck, FiStar } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import toast from "react-hot-toast";
import { useCart } from "../../components/Cart/CartContext";

export default function AccountPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderFilter, setOrderFilter] = useState("all")

  const handleOpenAddModal = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (addr) => {
    setEditingAddress(addr);
    setIsModalOpen(true);
  };

  const heightOptions = Array.from({ length: 121 }, (_, i) => 100 + i);
  const weightOptions = Array.from({ length: 121 }, (_, i) => 30 + i);
  const bodyOptions = Array.from({ length: 101 }, (_, i) => 50 + i);

  const [measurements, setMeasurements] = useState({
    height: "", weight: "", chest: "", butt: "", waist: ""
  });

  useEffect(() => {
    if (user && user.measurements) {
      setMeasurements(user.measurements);
    }
  }, [user]);

  useEffect(() => {
    if (user?.userId) {
      fetch(`http://localhost:5000/api/orders/user/${user.userId}`)
        .then(res => res.json())
        .then(data => setOrders(data))
        .catch(err => console.error("Lỗi lấy đơn hàng:", err));
    }
  }, [user]);

  const orderStatuses = [
    { id: "all", label: "Tất cả đơn hàng" },
    { id: "Processing", label: "Chờ xử lý" },
    { id: "Confirmed", label: "Chờ lấy hàng" },
    { id: "Shipping", label: "Đang giao" },
    { id: "Delivered", label: "Đã giao hàng" },
    { id: "Cancelled", label: "Đã hủy" },
    { id: "Returned", label: "Trả lại" },
  ];

  const getCountByStatus = (statusKey) => {
    if (!orders) return 0;
    return orders.filter(order => order.status?.toLowerCase() === statusKey.toLowerCase()).length;
  };

  const orderSummaryIcons = [
    {
      id: "Processing",
      label: "Chờ xác nhận",
      icon: <FiCreditCard />,
      count: getCountByStatus("Processing")
    },
    {
      id: "Confirmed",
      label: "Chờ lấy hàng",
      icon: <FiBox />,
      count: getCountByStatus("Confirmed")
    },
    {
      id: "Shipping",
      label: "Đang giao",
      icon: <FiTruck />,
      count: getCountByStatus("Shipping")
    },
    {
      id: "NotRated",
      label: "Đánh giá",
      icon: <FiStar />,
      count: getCountByStatus("Delivered")
    },
  ];

  const handleSaveMeasurements = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${user.userId}/measurements`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(measurements)
      });

      if (res.ok) {
        toast.success("Đã cập nhật chỉ số cơ thể thành công!");
        const updatedUser = { ...user, measurements };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (err) {
      toast.error("Lỗi khi lưu thông tin đo lường");
    }
  };

  const saveAddress = async (addrData) => {
    const isEdit = !!editingAddress;
    const url = isEdit
      ? `http://localhost:5000/api/users/${user.userId}/addresses/${editingAddress.id}`
      : `http://localhost:5000/api/users/${user.userId}/addresses`;

    try {
      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addrData)
      });

      if (res.ok) {
        let updatedList = addresses;

        if (addrData.isDefault) {
          updatedList = addresses.map(a => ({ ...a, isDefault: false }));
        }

        if (isEdit) {
          updatedList = updatedList.map(a => a.id === editingAddress.id ? { ...addrData, id: a.id } : a);
        } else {
          updatedList = [...updatedList, { ...addrData, id: "addr_" + Date.now() }];
        }

        setAddresses(updatedList);
        const updatedUser = { ...user, addresses: updatedList };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        toast.success(isEdit ? "Đã cập nhật địa chỉ!" : "Đã thêm địa chỉ mới!");
        setIsModalOpen(false);
      }
    } catch (err) {
      toast.error("Lỗi xử lý dữ liệu");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const loggedInUser = localStorage.getItem("user");
      if (!loggedInUser) {
        router.push("/login");
        return;
      }

      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser);
      setAddresses(parsedUser.addresses || []);

      try {
        const res = await fetch(`http://localhost:5000/users`);
        if (res.ok) {
          const allUsers = await res.json();
          const currentUser = allUsers.find(u => u.userId === parsedUser.userId);
          if (currentUser) {
            setUser(currentUser);
            setAddresses(currentUser.addresses || []);
            localStorage.setItem("user", JSON.stringify(currentUser));
          }
        }
      } catch (err) {
        console.error("Không thể cập nhật dữ liệu mới nhất từ server");
      }
    };

    fetchUserData();
  }, [router]);

  const handleAddAddress = async () => {
    const newAddr = {
      id: "addr_" + Date.now(), 
      receiverName: user.fullName,
      phone: user.phone || "0xxxxxxxxx",
      address: "Số nhà, tên đường...",
      city: "Hồ Chí Minh",
      isDefault: addresses.length === 0 
    };

    try {
      const res = await fetch(`http://localhost:5000/api/users/${user.userId}/addresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAddr)
      });

      if (res.ok) {
        const updatedList = [...addresses, newAddr];
        setAddresses(updatedList);
      
        const updatedUser = { ...user, addresses: updatedList };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        toast.success("Đã thêm địa chỉ mới!");
      }
    } catch (err) {
      toast.error("Không thể kết nối server");
    }
  };

  const handleDeleteAddress = (addrId) => {
    toast((t) => (
      <div className="flex flex-col gap-3 min-w-[250px]">
        <div className="flex items-start gap-3">
          <span className="text-xl">🗑️</span>
          <div>
            <p className="font-bold text-sm text-gray-800">Xác nhận xóa địa chỉ?</p>
            <p className="text-xs text-gray-500">Hành động này không thể hoàn tác.</p>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t pt-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 text-xs font-semibold text-gray-500 hover:text-black transition-colors"
          >
            HỦY
          </button>

          <button
            onClick={async () => {
              toast.dismiss(t.id);
              await executeDelete(addrId);
            }}
            className="bg-black text-white px-4 py-1.5 rounded-sm text-xs font-bold hover:bg-red-600 transition-all uppercase tracking-wider"
          >
            XÓA NGAY
          </button>
        </div>
      </div>
    ), {
      duration: 2000,
      position: "top-center",
      style: {
        borderRadius: '8px',
        background: '#fff',
        color: '#333',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #f3f4f6'
      },
    });
  };

  const executeDelete = async (addrId) => {
    const loadingToast = toast.loading("Đang xóa...");
    try {
      const res = await fetch(`http://localhost:5000/api/users/${user.userId}/addresses/${addrId}`, {
        method: "DELETE"
      });

      if (res.ok) {
        const filtered = addresses.filter(a => a.id !== addrId);
        setAddresses(filtered);

        const updatedUser = { ...user, addresses: filtered };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);

        toast.success("Đã xóa địa chỉ thành công!", { id: loadingToast });
      } else {
        toast.error("Không thể xóa. Vui lòng thử lại!", { id: loadingToast });
      }
    } catch (err) {
      toast.error("Lỗi kết nối Server!", { id: loadingToast });
    }
  };

  const saveNewAddress = async (newAddr) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${user.userId}/addresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAddr)
      });

      if (res.ok) {
        const updatedList = [...addresses, newAddr];
        setAddresses(updatedList);
        const updatedUser = { ...user, addresses: updatedList };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);

        toast.success("Đã lưu địa chỉ mới!");
        setIsModalOpen(false);
      }
    } catch (err) {
      toast.error("Lỗi lưu dữ liệu");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("dusk_cart_v2");

    toast.success("Đã đăng xuất thành công!", {
    });

    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  if (!user) return <div className="text-center mt-20">Đang tải thông tin...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-[#F8F9FA] min-h-screen">
      <div className="bg-gray-100 py-3 px-4 rounded-md text-[13px] text-gray-500 mb-6">
        Trang chủ <span className="mx-2">/</span> <span className="text-gray-800">Thông tin của tôi</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <h2 className="font-bold text-lg mb-6 text-gray-800">Trung tâm cá nhân</h2>

          <div className="mb-6">
            <h3 className="font-bold text-[15px] mb-3 flex items-center gap-2">
              <span className="w-3 h-[2px] bg-black block"></span> Tài khoản của tôi
            </h3>
            <ul className="pl-5 space-y-3 text-[14px] text-gray-500">
              <li
                onClick={() => setActiveTab("info")}
                className={`cursor-pointer transition-all ${activeTab === "info" ? "font-bold text-black" : "text-gray-500 hover:text-black"}`}
              >
                Thông tin của tôi
              </li>
              <li
                onClick={() => setActiveTab("address")}
                className={`cursor-pointer transition-all ${activeTab === "address" ? "font-bold text-black" : "text-gray-500 hover:text-black"}`}
              >
                Sổ địa chỉ
              </li>
              <li
                onClick={() => setActiveTab("doluong")}
                className={`cursor-pointer transition-all ${activeTab === "doluong" ? "font-bold text-black" : "text-gray-500 hover:text-black"}`}
              >
                Đo lường của tôi
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-[15px] mb-3 flex items-center gap-2">
              <span className="w-3 h-[2px] bg-black block"></span> Trạng thái đơn hàng
            </h3>
            <ul className="pl-5 space-y-3 text-[14px] text-gray-500">
              <li
                onClick={() => { setActiveTab("orders"); setOrderFilter("all"); }}
                className={`cursor-pointer ${activeTab === "orders" && orderFilter === "all" ? "text-black font-bold" : "text-gray-500"}`}
              >
                Tất cả các đơn hàng
              </li>
              <li
                onClick={() => { setActiveTab("orders"); setOrderFilter("Processing"); }}
                className={`cursor-pointer ${orderFilter === "Processing" ? "text-black font-bold" : "text-gray-500"}`}
              >
                Đơn hàng xử lý
              </li>
              <li
                onClick={() => { setActiveTab("orders"); setOrderFilter("Confirmed"); }}
                className={`cursor-pointer transition-all ${activeTab === "orders" && orderFilter === "Confirmed" ? "text-black font-bold" : "hover:text-black"}`}
              >
                Đơn hàng chờ lấy hàng
              </li>

              <li
                onClick={() => { setActiveTab("orders"); setOrderFilter("Shipping"); }}
                className={`cursor-pointer transition-all ${activeTab === "orders" && orderFilter === "Shipping" ? "text-black font-bold" : "hover:text-black"}`}
              >
                Đơn hàng đang giao
              </li>

              <li
                onClick={() => { setActiveTab("orders"); setOrderFilter("Delivered"); }}
                className={`cursor-pointer transition-all ${activeTab === "orders" && orderFilter === "Delivered" ? "text-black font-bold" : "hover:text-black"}`}
              >
                Đơn hàng đã giao
              </li>

              <li
                onClick={() => { setActiveTab("orders"); setOrderFilter("Cancelled"); }}
                className={`cursor-pointer transition-all ${activeTab === "orders" && orderFilter === "Cancelled" ? "text-black font-bold" : "hover:text-black"}`}
              >
                Đơn hàng đã hủy
              </li>

              <li
                onClick={() => { setActiveTab("orders"); setOrderFilter("Returned"); }}
                className={`cursor-pointer transition-all ${activeTab === "orders" && orderFilter === "Returned" ? "text-black font-bold" : "hover:text-black"}`}
              >
                Đơn hàng trả lại
              </li>
            </ul>
          </div>

          <button
            onClick={handleLogout}
            className="font-bold text-[15px] text-black hover:text-red-600 transition-colors"
          >
            Đăng xuất
          </button>
        </div>

        <div className="flex-1">
          {activeTab === "info" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white p-8 rounded-md shadow-sm border border-gray-100">
                <h1 className="text-2xl font-bold mb-6">Chào, {user.fullName}</h1>
                <div className="flex gap-10">
                  <div className="text-center"><p className="text-xl font-bold">0</p><p className="text-gray-500 text-sm">Voucher</p></div>
                  <div className="text-center"><FaCrown className="text-yellow-500 mx-auto" /><p className="text-gray-500 text-sm">Member</p></div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <h2 className="font-bold mb-6 border-b pb-4">Đơn hàng của tôi</h2>
                <div className="flex justify-around">
                  {orderSummaryIcons.map((item, index) => (
                    <div
                      key={index}
                      className="text-center cursor-pointer group relative"
                      onClick={() => { setActiveTab("orders"); setOrderFilter(item.id); }}
                    >
                      <div className="relative inline-block">
                        <span className="text-2xl mx-auto mb-1 block transition-transform group-hover:scale-110">
                          {item.icon}
                        </span>

                        {item.count > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                            {item.count > 9 ? "9+" : item.count}
                          </span>
                        )}
                      </div>
                      <p className="text-xs mt-1 text-gray-500 group-hover:text-black font-medium">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === "address" && (
            <div className="bg-white p-8 rounded-md shadow-sm border border-gray-100 animate-fadeIn">
              <h2 className="text-2xl font-bold text-center mb-8 uppercase tracking-tighter">Sổ địa chỉ của tôi</h2>

              <div className="flex justify-center mb-10">
                <button
                  onClick={handleOpenAddModal}
                  className="border-2 border-black px-10 py-3 font-bold text-sm hover:bg-black hover:text-white transition-all uppercase tracking-widest"
                >
                  + Thêm địa chỉ mới
                </button>
                <AddressModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onSave={saveAddress}
                  user={user}
                  initialData={editingAddress}
                />
              </div>

              <div className="grid grid-cols-1 gap-6">
                {addresses.length === 0 ? (
                  <p className="text-center text-gray-400 italic">Bạn chưa có địa chỉ nào.</p>
                ) : (
                  addresses.map((addr) => (
                    <div key={addr.id} className="border border-gray-200 p-6 relative flex justify-between items-start group hover:border-black transition-all">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-repeat-y" style={{ backgroundImage: 'linear-gradient(to bottom, #ff4d4d 50%, #4d79ff 50%)', backgroundSize: '100% 20px' }}></div>

                      <div className="space-y-2">
                        <p className="font-bold text-gray-800 tracking-wide">{addr.receiverName}</p>
                        <p className="text-gray-400 font-medium">{addr.phone.replace(/.(?=.{4})/g, 'x')}</p>
                        <p className="text-gray-600 text-sm">
                          {[addr.detail, addr.ward, addr.district, addr.province]
                            .filter(item => item && item.trim() !== "") // Chỉ lấy những trường có dữ liệu
                            .join(", ") || "Chưa cập nhật địa chỉ chi tiết"}
                        </p>

                        {addr.isDefault && (
                          <span className="inline-block mt-2 text-[10px] font-bold text-green-600 border border-green-600 px-2 py-0.5 uppercase">
                            Địa chỉ mặc định
                          </span>
                        )}
                      </div>

                      <div className="flex gap-4 text-[12px] font-bold uppercase tracking-tighter">
                        <button onClick={() => handleDeleteAddress(addr.id)} className="text-gray-400 hover:text-red-600 transition-colors">Xóa</button>
                        <button onClick={() => handleOpenEditModal(addr)} className="text-gray-400 hover:text-black transition-colors underline underline-offset-4">Chỉnh sửa</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "doluong" && (
            <div className="bg-white p-10 rounded-md shadow-sm border border-gray-100 animate-fadeIn min-h-[600px]">
              <div className="flex flex-col md:flex-row gap-10">

                <div className="md:w-1/3 flex flex-col items-center">
                  <img
                    src="/images/account/doluong-men.png"
                    alt="Body Guide"
                    className="max-h-[450px] object-contain mb-4"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-[32px] font-bold text-gray-800 uppercase leading-none mb-10 text-right md:text-left">
                    Đo lường của tôi
                  </h2>

                  <div className="space-y-8">
                    <section>
                      <h3 className="text-[18px] font-bold uppercase tracking-tight mb-3">
                        Các chỉ số đo của bạn
                      </h3>
                      <p className="text-gray-500 text-[14px] leading-relaxed mb-8">
                        Các thông tin về chiều cao, cân nặng và các chỉ số cơ thể khác của bạn được cập nhật tại đây có thể giúp bạn lựa chọn size phù hợp với thông số đo sản phẩm mà chúng tôi cung cấp.
                      </p>

                      <div className="grid grid-cols-2 gap-x-12 gap-y-8 border-t pt-8">
                        <Dropdown
                          field="Chiều cao"
                          value={measurements.height}
                          options={heightOptions}
                          unit="cm"
                          onChange={(val) => setMeasurements({ ...measurements, height: val })}
                        />
                        <Dropdown
                          field="Cân nặng"
                          value={measurements.weight}
                          options={weightOptions}
                          unit="kg"
                          onChange={(val) => setMeasurements({ ...measurements, weight: val })}
                        />
                        <Dropdown
                          field="Ngực"
                          value={measurements.chest}
                          options={bodyOptions}
                          unit="cm"
                          onChange={(val) => setMeasurements({ ...measurements, chest: val })}
                        />
                        <Dropdown
                          field="Mông"
                          value={measurements.butt}
                          options={bodyOptions}
                          unit="cm"
                          onChange={(val) => setMeasurements({ ...measurements, butt: val })}
                        />
                        <Dropdown
                          field="Eo"
                          value={measurements.waist}
                          options={bodyOptions}
                          unit="cm"
                          onChange={(val) => setMeasurements({ ...measurements, waist: val })}
                        />
                      </div>
                    </section>

                    <div className="pt-10">
                      <button
                        onClick={handleSaveMeasurements}
                        className="w-full md:w-[300px] bg-[#1a1a1a] text-white py-4 font-bold uppercase tracking-widest hover:bg-black transition-all"
                      >
                        Xác nhận
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "orders" && (
            <div className="bg-white p-8 rounded-md shadow-sm border border-gray-100 animate-fadeIn min-h-[500px]">
              <h2 className="text-[28px] font-bold text-center mb-8 uppercase">Đơn hàng của tôi</h2>

              <div className="flex flex-wrap justify-center gap-6 border-b pb-4 mb-8">
                {orderStatuses.map((status) => (
                  <button
                    key={status.id}
                    onClick={() => setOrderFilter(status.id)}
                    className={`text-[14px] font-bold uppercase transition-all pb-2 border-b-2 ${orderFilter === status.id ? "border-black text-black" : "border-transparent text-gray-400"
                      }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {orders
                  .filter(order => {
                    const status = order.status?.toUpperCase();
                    const filter = orderFilter?.toUpperCase();

                    if (filter === "ALL") return true;

                    if (filter === "NOTRATED") return status === "DELIVERED" && !order.isRated;
                    if (filter === "RATED") return status === "DELIVERED" && order.isRated;

                    return status === filter;
                  })
                  .length === 0 ? (
                  <p className="text-center text-gray-400 italic py-10">Bạn chưa có đơn hàng nào ở trạng thái này.</p>
                ) : (
                  orders
                    .filter(order => {
                      const status = order.status?.toUpperCase();
                      const filter = orderFilter?.toUpperCase();
                      if (filter === "ALL") return true;
                      if (filter === "NOTRATED") return status === "DELIVERED" && !order.isRated;
                      if (filter === "RATED") return status === "DELIVERED" && order.isRated;
                      return status === filter;
                    })
                    .map((order) => (
                      <div key={order._id} className="border border-gray-200 p-6 mb-4 hover:shadow-md transition-all bg-white relative">
                        <div className="flex justify-between items-center border-b pb-4 mb-4">
                          <div>
                            <p className="text-[13px] font-bold text-gray-800">
                              MÃ ĐƠN HÀNG: <span className="text-blue-600">#{order.id || order._id.slice(-8).toUpperCase()}</span>
                            </p>
                            <p className="text-[12px] text-gray-400 tracking-tighter">
                              Ngày đặt: {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                            </p>
                          </div>

                          <span className={`px-3 py-1 text-[11px] font-bold uppercase border rounded-md ${order.status?.toUpperCase() === "PROCESSING" || order.status?.toUpperCase() === "PENDING" ? "text-orange-500 border-orange-500 bg-orange-50" :
                            order.status?.toUpperCase() === "CONFIRMED" ? "text-blue-500 border-blue-500 bg-blue-50" :
                              order.status?.toUpperCase() === "SHIPPING" ? "text-purple-500 border-purple-500 bg-purple-50" :
                                order.status?.toUpperCase() === "DELIVERED" ? "text-green-500 border-green-500 bg-green-50" :
                                  order.status?.toUpperCase() === "CANCELLED" ? "text-red-500 border-red-500 bg-red-100" :
                                    order.status?.toUpperCase() === "RETURNED" ? "text-gray-600 border-gray-600 bg-gray-200" :
                                      "text-gray-500 border-gray-300 bg-gray-50"
                            }`}>
                            {
                              order.status?.toUpperCase() === "PROCESSING" || order.status?.toUpperCase() === "PENDING" ? "Chờ xử lý" :
                                order.status?.toUpperCase() === "CONFIRMED" ? "Đã xác nhận" :
                                  order.status?.toUpperCase() === "SHIPPING" ? "Đang giao hàng" :
                                    order.status?.toUpperCase() === "DELIVERED" ? "Đã giao hàng" :
                                      order.status?.toUpperCase() === "CANCELLED" ? "Đã hủy" :
                                        order.status?.toUpperCase() === "RETURNED" ? "Trả hàng" :
                                          order.status
                            }
                          </span>
                        </div>

                        <div className="space-y-4 mb-6">
                          {order.items && order.items.map((item, idx) => {
                            const p = item.product || item;
                            const isDelivered = order.status?.toUpperCase() === "DELIVERED";
                            return (
                              <div key={idx} className="flex items-center gap-4">
                                <div className="w-16 h-20 bg-gray-100 flex-shrink-0">
                                  <img src={item.product.image} alt={item.product.name} className="od-item-img" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-bold text-gray-800 uppercase leading-tight">{item.name || p.name}</p>
                                  <p className="text-xs text-gray-500 mt-1">Phân loại: {item.selectedSize} · {item.selectedColor}</p>
                                  <p className="text-sm font-bold mt-1 text-black">
                                    {((p.salePrice ?? p.price) * item.quantity).toLocaleString()}₫
                                  </p>
                                </div>

                                {isDelivered && (
                                  <div className="text-right">
                                    <button
                                      onClick={() => {
                                        addToCart(
                                          p,
                                          item.selectedSize || item.size,
                                          item.selectedColor || item.color,
                                          item.quantity || 1
                                        );
                                        router.push('/cart');
                                      }}
                                      className="text-[10px] font-bold uppercase border border-black px-3 py-1.5 hover:bg-black hover:text-white transition-all rounded-sm"
                                    >
                                      Mua lại món này
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex justify-between items-end border-t pt-4">
                          <div>
                            <p className="text-[12px] text-gray-500 uppercase font-bold mb-1">Tổng tiền thanh toán:</p>
                            <p className="text-xl font-extrabold text-red-600 tracking-tight">
                              {order.total?.toLocaleString() || order.totalPrice?.toLocaleString()}₫
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              const idToNav = order._id || order.id;
                              router.push(`/account/orders/${idToNav}`);
                            }}
                            className="bg-black text-white px-6 py-2 text-[12px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-md"
                          >
                            Xem chi tiết
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AddressModal({ isOpen, onClose, onSave, user, initialData }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    phone: "",
    detail: "",
    province: "",
    district: "",
    ward: "",
    isDefault: false
  });

  useEffect(() => {
    if (isOpen && initialData) {
      const names = initialData.receiverName.split(" ");
      const lastName = names[0] || "";
      const firstName = names.slice(1).join(" ") || "";

      setFormData({
        lastName: lastName,
        firstName: firstName,
        phone: initialData.phone || "",
        detail: initialData.detail || "",
        province: initialData.province || "",
        district: initialData.district || "",
        ward: initialData.ward || "",
        isDefault: initialData.isDefault || false
      });
    } else if (isOpen && !initialData) {
      setFormData({
        lastName: "", firstName: "", phone: "",
        detail: "", province: "", district: "", ward: "",
        isDefault: false
      });
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    if (isOpen && initialData?.province) {
      const provinceCode = provinces.find(p => p.name === initialData.province)?.code;
      if (provinceCode) {
        fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
          .then(res => res.json())
          .then(data => {
            setDistricts(data.districts || []);
          });
      }
    }
  }, [isOpen, initialData, provinces]);

  useEffect(() => {
    if (isOpen && initialData?.district && districts.length > 0) {
      const districtCode = districts.find(d => d.name === initialData.district)?.code;
      if (districtCode) {
        fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
          .then(res => res.json())
          .then(data => {
            setWards(data.wards || []);
          });
      }
    }
  }, [isOpen, initialData?.district, districts]);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then(res => res.json())
      .then(data => setProvinces(data));
  }, []);

  const handleProvinceChange = (e) => {
    const pName = e.target.value;
    const pCode = provinces.find(p => p.name === pName)?.code;

    setFormData({
      ...formData,
      province: pName,
      district: "",
      ward: ""
    });
    setDistricts([]);
    setWards([]);

    if (pCode) {
      fetch(`https://provinces.open-api.vn/api/p/${pCode}?depth=2`)
        .then(res => res.json())
        .then(data => setDistricts(data.districts || []));
    }
  };

  const handleDistrictChange = (e) => {
    const dName = e.target.value;
    const dCode = districts.find(d => d.name === dName)?.code;

    setFormData({ ...formData, district: dName, ward: "" });
    setWards([]);

    if (dCode) {
      fetch(`https://provinces.open-api.vn/api/d/${dCode}?depth=2`)
        .then(res => res.json())
        .then(data => setWards(data.wards || []));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAddr = {
      id: initialData?.id || "addr_" + Date.now(),
      receiverName: `${formData.lastName} ${formData.firstName}`.trim(),
      phone: formData.phone,
      detail: formData.detail,
      province: formData.province,
      district: formData.district,
      ward: formData.ward,
      isDefault: formData.isDefault
    };
    onSave(newAddr);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-black/40 font-sans">
      <div className="bg-white w-full max-w-2xl rounded-sm relative p-8 shadow-2xl">
        {/* Nút đóng X */}
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl font-light">✕</button>

        <h2 className="text-xl font-bold mb-6 uppercase tracking-tight">Địa chỉ giao hàng</h2>
        <hr className="mb-6" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input required placeholder="*Họ" className="border p-3 w-full outline-none focus:border-black" value={formData.lastName}
              onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
            <input required placeholder="*Tên" className="border p-3 w-full outline-none focus:border-black" value={formData.firstName}
              onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
          </div>

          <div className="flex border items-center">
            <span className="px-4 border-r bg-gray-50 text-sm font-bold">VN +84</span>
            <input required placeholder="*Số điện thoại" className="p-3 flex-1 outline-none"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })} />
          </div>

          <input required placeholder="Địa chỉ chi tiết" className="border p-3 w-full outline-none focus:border-black"
            value={formData.detail}
            onChange={e => setFormData({ ...formData, detail: e.target.value })} />

          <div className="space-y-4">

            <select required className="border p-3 w-full text-gray-800 outline-none"
              value={formData.province}
              onChange={handleProvinceChange}
            >
              <option value="">*Tỉnh / Thành phố</option>
              {provinces.map(p => <option key={p.code} value={p.name}>{p.name}</option>)}
            </select>

            <select required className="border p-3 w-full text-gray-800 outline-none disabled:bg-gray-50"
              value={formData.district}
              onChange={handleDistrictChange}
              disabled={districts.length === 0}
            >
              <option value="">*Quận / Huyện</option>
              {districts.map(d => <option key={d.code} value={d.name}>{d.name}</option>)}
            </select>

            <select
              required
              className="border p-3 w-full text-gray-800 outline-none disabled:bg-gray-50"
              value={formData.ward}
              onChange={e => setFormData({ ...formData, ward: e.target.value })}
              disabled={!formData.district}
            >
              <option value="">*Phường / Xã</option>
              {wards.map(w => <option key={w.code} value={w.name}>{w.name}</option>)}
            </select>
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-2">
            <input type="checkbox" className="w-4 h-4 accent-black"
              checked={formData.isDefault}
              onChange={e => setFormData({ ...formData, isDefault: e.target.checked })} />
            <span className="text-sm font-medium">Đặt địa chỉ mặc định</span>
          </label>

          <div className="flex justify-center pt-6">
            <button type="submit" className="bg-[#222] text-white px-20 py-3 font-bold hover:bg-black transition-all">
              LƯU
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Dropdown({ field, value, options, unit, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[14px] font-bold text-gray-800">{field}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-gray-200 py-2 text-[14px] text-gray-600 outline-none focus:border-black bg-transparent transition-colors appearance-none"
        style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.7em top 50%', backgroundSize: '0.65em auto' }}
      >
        <option value="">Vui lòng chọn</option>
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt} {unit}
          </option>
        ))}
      </select>
    </div>
  );
}
