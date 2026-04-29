"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { loadAoThunMeta } from "@/lib/aoThunMeta";
import toast from "react-hot-toast";
import { useCart } from "@/components/Cart/CartContext";

function StatusBadge({ statusKey, orderStatus }) {
    const s = orderStatus?.[statusKey] || orderStatus?.PENDING || {
        label: statusKey,
        color: "#6B7280",
    };
    return (
        <span
            className="font-bold px-3 py-1.5 rounded-2xl border border-gray-100 text-[11px] uppercase tracking-wider"
            style={{
                color: s.color,
                backgroundColor: `${s.color}30`
            }}
        >
            {s.label}
        </span>
    );
}

const fmt = (n) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

const fmtDate = (iso) => {
    if (!iso) return "N/A";
    const d = new Date(iso);
    return d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

function OrderDetail() {
    const { id } = useParams();
    const router = useRouter();
    const { dispatch } = useCart();

    const [order, setOrder] = useState(null);
    const [orderStatus, setOrderStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [cancelReason, setCancelReason] = useState("");
    const [showAddressSelector, setShowAddressSelector] = useState(false);
    const [selectedNewAddress, setSelectedNewAddress] = useState(null);
    const [userAddresses, setUserAddresses] = useState([]);
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [newAddrForm, setNewAddrForm] = useState({
        receiverName: "",
        phone: "",
        detail: "",
        province: "",
        district: "",
        ward: ""
    });
    const [otherReason, setOtherReason] = useState("");
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
    const [returnReason, setReturnReason] = useState("");
    const [returnDetail, setReturnDetail] = useState("");

    const returnReasons = [
        "Sản phẩm bị lỗi (rách, hỏng khóa, ra màu...)",
        "Sản phẩm không đúng với mô tả (sai mẫu, sai màu...)",
        "Gửi sai kích cỡ (Size) so với đơn đặt hàng",
        "Sản phẩm bị hư hỏng trong quá trình vận chuyển",
        "Thiếu hàng/phụ kiện đi kèm",
    ];

    useEffect(() => {
        fetch("https://provinces.open-api.vn/api/p/")
            .then(res => res.json())
            .then(data => setProvinces(data));
    }, []);

    useEffect(() => {
        const fetchUserAddresses = async () => {
            const loggedInUser = JSON.parse(localStorage.getItem("user"));
            if (!loggedInUser?.userId) return;

            try {
                const res = await fetch(`http://localhost:5000/users`);
                const allUsers = await res.json();

                const currentUser = allUsers.find(u => u.userId === loggedInUser.userId || u.id === loggedInUser.id);

                if (currentUser && currentUser.addresses) {
                    console.log("Danh sách địa chỉ đầy đủ:", currentUser.addresses);
                    setUserAddresses(currentUser.addresses);
                }
            } catch (error) {
                console.error("Lỗi khi tải danh sách địa chỉ:", error);
            }
        };

        fetchUserAddresses();
    }, [isAddingAddress]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const meta = await loadAoThunMeta();
                setOrderStatus(meta.ORDER_STATUS);
                const res = await fetch(`http://localhost:5000/api/orders/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setOrder(data);
                } else {
                    console.error("Không tìm thấy đơn hàng");
                }
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchAllData();
    }, [id]);
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser?.addresses) {
            setUserAddresses(loggedInUser.addresses);
        }
    }, []);

    if (loading) return <div className="text-center py-20 uppercase font-bold">Đang tải chi tiết đơn hàng...</div>;
    if (!order) return <div className="text-center py-20 italic text-gray-500">Không tìm thấy thông tin đơn hàng này.</div>;
    const flowSteps = orderStatus ? [
        { ...orderStatus.PENDING, dbKey: "Processing" },
        { ...orderStatus.CONFIRMED, dbKey: "Confirmed" },
        { ...orderStatus.PROCESSING, dbKey: "Packed" },
        { ...orderStatus.SHIPPING, dbKey: "Shipping" },
        { ...orderStatus.DELIVERED, dbKey: "Delivered" },
    ].filter(step => step.label) : [];

    const reasons = [
        "Tôi muốn thay đổi địa chỉ nhận hàng",
        "Tôi muốn thay đổi sản phẩm (size, màu sắc, số lượng...)",
        "Thủ tục thanh toán quá rắc rối",
        "Tôi tìm thấy chỗ khác giá rẻ hơn",
        "Tôi không còn nhu cầu mua nữa",
    ];

    const handleReorder = () => {
        try {
            if (!order || !order.items) {
                toast.error("Dữ liệu đơn hàng không hợp lệ");
                return;
            }

            order.items.forEach(item => {
                const p = item.product || item;

                dispatch({
                    type: "ADD_ITEM",
                    payload: {
                        product: {
                            ...p,
                            id: p.id || p._id,
                            price: p.price,
                            salePrice: p.salePrice || p.price
                        },
                        selectedSize: item.selectedSize || item.size || "M",
                        selectedColor: item.selectedColor || item.color || "Tiêu chuẩn",
                        quantity: item.quantity || 1
                    }
                });
            });

            toast.success("Đã thêm sản phẩm vào giỏ hàng!");
            router.push('/cart');
        } catch (error) {
            console.error("Lỗi mua lại:", error);
            toast.error("Không thể thực hiện mua lại");
        }
    };

    const handleRequestReturn = async () => {
        if (!returnReason) {
            toast.error("Vui lòng chọn lý do trả hàng");
            return;
        }
        const loadingToast = toast.loading("Đang gửi yêu cầu trả hàng...");
        try {
            const res = await fetch(`http://localhost:5000/api/orders/${order._id || id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status: "RETURNED",
                    returnInfo: {
                        reason: returnReason,
                        detail: returnDetail,
                        requestedAt: new Date().toISOString()
                    }
                }),
            });

            if (res.ok) {
                toast.success("Đã gửi yêu cầu trả hàng!", { id: loadingToast });
                setIsReturnModalOpen(false);
                setTimeout(() => window.location.reload(), 1000);
            }
        } catch (error) {
            toast.error("Lỗi kết nối server!", { id: loadingToast });
        }
    };

    const handleSaveNewAddress = async (e) => {
        e.preventDefault();
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (!loggedInUser) return;

        const addressData = {
            ...newAddrForm,
            id: "addr_" + Date.now(),
            isDefault: false
        };

        try {
            const res = await fetch(`http://localhost:5000/api/users/${loggedInUser.userId}/addresses`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(addressData),
            });

            if (res.ok) {
                toast.success("Đã thêm địa chỉ mới!");
                const updatedAddresses = [...userAddresses, addressData];
                setUserAddresses(updatedAddresses);
                setSelectedNewAddress(addressData);
                setIsAddingAddress(false);
            }
        } catch (error) {
            toast.error("Không thể lưu địa chỉ");
        }
    };
    const isCancellable = ["Processing", "PENDING", "CONFIRMED"].includes(order.status);
    const isReturnable = ["DELIVERED", "PAID"].includes(order.status);
    const isTerminal = ["CANCELLED", "RETURNED", "REFUNDED"].includes(order.status);
    const handleCancelOrder = async () => {
        if (!cancelReason) {
            toast.error("Vui lòng chọn lý do hủy đơn");
            return;
        }
        const loadingToast = toast.loading("Đang xử lý yêu cầu hủy đơn...");
        try {
            const payload = {
                status: "CANCELLED",
                cancelReason: cancelReason,
                newAddressId: cancelReason === reasons[0] ? selectedNewAddress?.id : null
            };

            const res = await fetch(`http://localhost:5000/api/orders/${order._id || id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                toast.success("Đã hủy đơn hàng thành công!", { id: loadingToast });
                setIsConfirmOpen(false);
                setTimeout(() => window.location.reload(), 1000);
            }
        } catch (error) {
            toast.error("Lỗi kết nối server!", { id: loadingToast });
        }
    };

    const handleUpdateAddressAndContinue = async () => {
        if (!selectedNewAddress) {
            toast.error("Vui lòng chọn hoặc thêm địa chỉ mới");
            return;
        }
        const loadingToast = toast.loading("Đang cập nhật địa chỉ...");
        try {
            const res = await fetch(`http://localhost:5000/api/orders/${order._id || id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    shippingInfo: {
                        ...order.shippingInfo,
                        fullName: selectedNewAddress.receiverName,
                        phone: selectedNewAddress.phone,
                        address: selectedNewAddress.detail,
                        ward: selectedNewAddress.ward,
                        district: selectedNewAddress.district,
                        city: selectedNewAddress.province
                    }
                }),
            });

            if (res.ok) {
                toast.success("Đã cập nhật địa chỉ thành công!", { id: loadingToast });
                setIsConfirmOpen(false);
                setTimeout(() => window.location.reload(), 1000);
            }
        } catch (error) {
            toast.error("Lỗi cập nhật địa chỉ", { id: loadingToast });
        }
    };

    const handleProvinceChange = (e) => {
        const pName = e.target.value;
        const pCode = provinces.find(p => p.name === pName)?.code;
        setNewAddrForm({ ...newAddrForm, province: pName, district: "", ward: "" });
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
        setNewAddrForm({ ...newAddrForm, district: dName, ward: "" });
        setWards([]);
        if (dCode) {
            fetch(`https://provinces.open-api.vn/api/d/${dCode}?depth=2`)
                .then(res => res.json())
                .then(data => setWards(data.wards || []));
        }
    };


    const currentStep = flowSteps.findIndex(
        (s) => s.dbKey?.toLowerCase() === order.status?.toLowerCase()
    );

    console.log("Current Step Index:", currentStep)

    return (
        <div className="bg-[#F8F9FA] min-h-screen py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden animate-fadeIn">

                {/* Nút Quay lại */}
                <div className="p-4 border-b border-gray-50">
                    <button
                        onClick={() => router.back()}
                        className="text-[11px] uppercase text-gray-400 hover:text-black transition-colors"
                    >
                        ← Quay lại đơn hàng của tôi
                    </button>
                </div>

                {/* Nội dung Order Detail */}
                <div className="p-8">
                    {/* Header: Mã đơn & Trạng thái */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold uppercase text-gray-800">
                                Đơn hàng: #{order.id || id}
                            </h1>
                            <p className="text-sm text-gray-400 mt-1">
                                Đặt lúc: {fmtDate(order.createdAt || order.orderDate)}
                            </p>
                        </div>
                        <StatusBadge statusKey={order.status} orderStatus={orderStatus} />
                    </div>

                    {/* Thanh Progress Tracker */}
                    {!isTerminal && (
                        <div className="flex justify-between items-center mb-16 px-4 relative mt-10">
                            <div className="absolute top-1/2 left-10 right-10 h-[2px] bg-gray-100 -translate-y-1/2 z-0"></div>

                            {flowSteps.map((step, idx) => {
                                const isDone = idx < currentStep;
                                const isActive = currentStep === idx;
                                return (
                                    <div key={idx} className="relative z-10 flex flex-col items-center flex-1">
                                        {idx > 0 && (
                                            <div
                                                className={`absolute top-1/2 right-[50%] w-full h-[2px] -translate-y-1/2 transition-all duration-700 z-10 ${idx <= currentStep ? "bg-black" : "bg-transparent"
                                                    }`}
                                            ></div>
                                        )}

                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] border-2 transition-all duration-500 ${isActive
                                            ? "bg-black border-black text-white scale-125 shadow-lg" // Bước hiện tại: To, Đen
                                            : isDone
                                                ? "bg-black border-black text-white" // Bước đã qua: Đen
                                                : "bg-white border-gray-200 text-gray-300" // Bước chưa tới: Mờ
                                            }`}>
                                            {isDone ? "✓" : idx + 1}
                                        </div>

                                        {/* Chữ */}
                                        <p className={`absolute -bottom-10 whitespace-nowrap text-[10px] uppercase transition-colors duration-500 ${isActive || isDone ? "text-black font-bold" : "text-gray-300"
                                            }`}>
                                            {step.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Danh sách sản phẩm */}
                    <div className="space-y-6 mb-10">
                        <p className="text-[15px] font-bold text-black border-b pb-2">Sản phẩm ({order.items?.length})</p>
                        {order.items?.map((item, idx) => (
                            <div key={idx} className="flex gap-6 items-center border-b border-gray-50 pb-6 last:border-0">
                                <div className="w-20 h-24 bg-gray-50 rounded-md overflow-hidden border border-gray-100 flex-shrink-0">
                                    <img src={item.product.image} alt={item.product.name} className="od-item-img" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[14px] uppercase leading-tight text-gray-800">{item.name || item.product?.name}</p>
                                    <p className="text-[11px] text-gray-400 mt-1">
                                        Phân loại: {item.selectedSize || item.size} / {item.selectedColor || item.color}
                                    </p>
                                    <p className="text-xs mt-2 text-gray-600">x{item.quantity}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-800">{fmt((item.price || item.product?.price) * item.quantity)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 p-6 rounded-md border border-gray-100">
                        <div className="space-y-2">
                            <p className="text-[15px] font-bold uppercase text-black border-b border-gray-200 pb-2 mb-3">Thông tin nhận hàng</p>
                            <p className="text-sm text-gray-700 font-medium">{order.shippingInfo?.fullName}</p>
                            <p className="text-sm text-gray-500">{order.shippingInfo?.phone}</p>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                {[order.shippingInfo?.address, order.shippingInfo?.ward, order.shippingInfo?.district, order.shippingInfo?.city].filter(Boolean).join(", ")}
                            </p>
                        </div>
                        <div className="space-y-3">
                            <p className="text-[15px] font-bold uppercase text-black border-b border-gray-200 pb-2 mb-3">Tóm tắt thanh toán</p>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400 uppercase text-[10px]">Tạm tính:</span>
                                <span className="text-gray-700">{fmt(order.subtotal || 0)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400 uppercase text-[10px]">Vận chuyển:</span>
                                <span className="text-gray-700">{order.shippingFee === 0 ? "Miễn phí" : fmt(order.shippingFee || 0)}</span>
                            </div>
                            <div className="flex justify-between text-lg pt-4 border-t border-gray-200 mt-4">
                                <span className="uppercase font-bold">Tổng cộng:</span>
                                <span className="text-red-600 font-medium">{fmt(order.total || 0)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-xs text-gray-400 italic">
                            {order.status === "Processing" && "* Bạn có thể hủy đơn hàng trước khi shop xác nhận."}
                            {order.status === "Delivered" && "* Vui lòng kiểm tra kỹ sản phẩm trước khi xác nhận đã nhận hàng."}
                        </div>

                        <div className="flex flex-wrap gap-3 justify-end">
                            {isCancellable && (
                                <button
                                    onClick={() => setIsConfirmOpen(true)}
                                    className="px-6 py-2.5 border border-red-500 text-red-500 text-[11px] font-bold uppercase hover:bg-red-50 transition-all rounded-sm"
                                >
                                    Hủy đơn hàng
                                </button>
                            )}

                            {isReturnable && (
                                <button
                                    onClick={() => setIsReturnModalOpen(true)} // Gắn sự kiện mở modal
                                    className="px-6 py-2.5 border border-gray-300 text-gray-600 text-[11px] font-bold uppercase hover:bg-gray-50 transition-all rounded-sm"
                                >
                                    Trả hàng / Hoàn tiền
                                </button>
                            )}

                            {order.status === "Shipping" && (
                                <button className="px-6 py-2.5 bg-black text-white text-[11px] font-bold uppercase hover:bg-gray-800 transition-all rounded-sm shadow-md">
                                    Đã nhận được hàng
                                </button>
                            )}

                            {(order.status === "Delivered" && !order.isRated) && (
                                <button className="px-6 py-2.5 bg-red-600 text-white text-[11px] font-bold uppercase hover:bg-red-700 transition-all rounded-sm shadow-md">
                                    Đánh giá sản phẩm
                                </button>
                            )}

                            {isTerminal && (
                                <button
                                    onClick={handleReorder}
                                    className="px-6 py-2.5 bg-black text-white text-[11px] font-bold uppercase hover:bg-gray-800 transition-all rounded-sm shadow-md"
                                >
                                    Mua lại
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isConfirmOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-sm shadow-2xl max-w-md w-full overflow-hidden animate-fadeIn">
                        {/* TIÊU ĐỀ THAY ĐỔI THEO MÀN HÌNH */}
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-center font-bold uppercase text-sm tracking-widest">
                                {isAddingAddress ? "Thêm địa chỉ giao hàng mới" : "Lý do hủy đơn"}
                            </h3>
                            <button onClick={() => { setIsConfirmOpen(false); setIsAddingAddress(false); }} className="text-gray-400 hover:text-black">✕</button>
                        </div>

                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                            {!isAddingAddress ? (
                                /* --- MÀN HÌNH 1: CHỌN LÝ DO --- */
                                <>
                                    <p className="text-[13px] text-gray-500 mb-4 bg-orange-50 p-3 border-l-4 border-orange-400">
                                        Lưu ý: Đơn hàng sẽ bị hủy ngay lập tức sau khi bạn xác nhận.
                                    </p>
                                    <div className="space-y-3">
                                        {reasons.map((r, index) => (
                                            <label key={index} className="flex items-center gap-3 p-3 border rounded-sm cursor-pointer hover:bg-gray-50 transition-all">
                                                <input
                                                    type="radio" name="reason" className="w-4 h-4 accent-black"
                                                    checked={cancelReason === r}
                                                    onChange={() => {
                                                        setCancelReason(r);
                                                        setShowAddressSelector(index === 0);
                                                    }}
                                                />
                                                <span className="text-sm text-gray-700">{r}</span>
                                            </label>
                                        ))}
                                        <label className="flex flex-col gap-2 p-3 border rounded-sm cursor-pointer hover:bg-gray-50">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio" name="reason" className="w-4 h-4 accent-black"
                                                    checked={cancelReason === "Khác"}
                                                    onChange={() => {
                                                        setCancelReason("Khác");
                                                        setShowAddressSelector(false);
                                                    }}
                                                />
                                                <span className="text-sm text-gray-700">Lý do khác</span>
                                            </div>
                                            {cancelReason === "Khác" && (
                                                <textarea
                                                    className="w-full border p-2 text-sm mt-2 outline-none focus:border-black"
                                                    placeholder="Nhập lý do của bạn..."
                                                    value={otherReason}
                                                    onChange={(e) => setOtherReason(e.target.value)}
                                                />
                                            )}
                                        </label>
                                    </div>

                                    {showAddressSelector && (
                                        <div className="mt-4 p-4 border border-dashed border-blue-200 bg-blue-50">
                                            <p className="text-[11px] font-bold text-blue-800 uppercase mb-2">Chọn địa chỉ nhận hàng chính xác:</p>
                                            <select
                                                className="w-full p-2 text-sm border-gray-200 outline-none bg-white rounded-sm"
                                                value={selectedNewAddress?.id || ""}
                                                onChange={(e) => setSelectedNewAddress(userAddresses.find(a => a.id === e.target.value))}
                                            >
                                                <option value="">-- Chọn một trong {userAddresses.length} địa chỉ của bạn --</option>
                                                {userAddresses.map((addr) => (
                                                    <option key={addr.id} value={addr.id}>
                                                        {addr.receiverName} - {addr.detail}, {addr.ward}, {addr.district}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={() => setIsAddingAddress(true)}
                                                className="mt-3 w-full py-2 border border-blue-600 text-blue-600 text-[10px] font-bold uppercase hover:bg-blue-600 hover:text-white transition-all"
                                            >
                                                + Thêm địa chỉ mới ngay tại đây
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                /* --- MÀN HÌNH 2: FORM NHẬP ĐỊA CHỈ TẠI CHỖ --- */
                                <form onSubmit={handleSaveNewAddress} className="space-y-4 animate-slideInRight">
                                    <input required placeholder="Họ và tên người nhận" className="w-full border-b p-2 text-sm outline-none focus:border-black"
                                        onChange={e => setNewAddrForm({ ...newAddrForm, receiverName: e.target.value })} />
                                    <input required placeholder="Số điện thoại" className="w-full border-b p-2 text-sm outline-none focus:border-black"
                                        onChange={e => setNewAddrForm({ ...newAddrForm, phone: e.target.value })} />
                                    <select required className="w-full border-b pb-2 text-sm outline-none bg-white"
                                        value={newAddrForm.province} onChange={handleProvinceChange}>
                                        <option value="">* Tỉnh / Thành phố</option>
                                        {provinces.map(p => <option key={p.code} value={p.name}>{p.name}</option>)}
                                    </select>

                                    <select required className="w-full border-b pb-2 text-sm outline-none bg-white disabled:opacity-50"
                                        disabled={!newAddrForm.province}
                                        value={newAddrForm.district} onChange={handleDistrictChange}>
                                        <option value="">* Quận / Huyện</option>
                                        {districts.map(d => <option key={d.code} value={d.name}>{d.name}</option>)}
                                    </select>

                                    <select required className="w-full border-b pb-2 text-sm outline-none bg-white disabled:opacity-50"
                                        disabled={!newAddrForm.district}
                                        value={newAddrForm.ward} onChange={e => setNewAddrForm({ ...newAddrForm, ward: e.target.value })}>
                                        <option value="">* Phường / Xã</option>
                                        {wards.map(w => <option key={w.code} value={w.name}>{w.name}</option>)}
                                    </select>
                                    <input required placeholder="Số nhà, tên đường..." className="w-full border-b p-2 text-sm outline-none focus:border-black"
                                        onChange={e => setNewAddrForm({ ...newAddrForm, detail: e.target.value })} />

                                    <div className="flex gap-3 pt-6">
                                        <button type="button" onClick={() => setIsAddingAddress(false)}
                                            className="flex-1 py-3 text-[11px] font-bold uppercase border border-black hover:bg-gray-50 transition-all">
                                            Quay lại
                                        </button>
                                        <button type="submit"
                                            className="flex-1 py-3 text-[11px] font-bold uppercase bg-blue-600 text-white hover:bg-blue-700 shadow-lg transition-all">
                                            Lưu địa chỉ
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {!isAddingAddress && (
                            <div className="p-4 bg-gray-50 flex gap-3 border-t">
                                <button onClick={() => setIsConfirmOpen(false)} className="flex-1 py-3 text-xs font-bold uppercase text-gray-500 hover:text-black">Hủy bỏ</button>
                                <button
                                    onClick={showAddressSelector ? handleUpdateAddressAndContinue : handleCancelOrder}
                                    disabled={!cancelReason || (cancelReason === "Khác" && !otherReason)}
                                    className={`flex-1 py-3 text-xs font-bold uppercase transition-all shadow-lg ${cancelReason ? "bg-black text-white hover:bg-red-600" : "bg-gray-300 text-white cursor-not-allowed"
                                        }`}
                                >
                                    {showAddressSelector ? "Cập nhật & Tiếp tục" : "Xác nhận hủy đơn"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {isReturnModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-left">
                    <div className="bg-white rounded-sm shadow-2xl max-w-md w-full overflow-hidden animate-fadeIn">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold uppercase text-sm tracking-widest text-red-600">Yêu cầu trả hàng / Hoàn tiền</h3>
                            <button onClick={() => setIsReturnModalOpen(false)} className="text-gray-400 hover:text-black">✕</button>
                        </div>

                        <div className="p-6 space-y-5">
                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block">Lý do trả hàng:</label>
                                <div className="space-y-2">
                                    {returnReasons.map((r, idx) => (
                                        <label key={idx} className="flex items-center gap-3 p-3 border rounded-sm cursor-pointer hover:bg-gray-50 transition-all border-gray-100">
                                            <input
                                                type="radio" name="returnReason" className="accent-black"
                                                checked={returnReason === r}
                                                onChange={() => setReturnReason(r)}
                                            />
                                            <span className="text-xs text-gray-700">{r}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block">Chi tiết lỗi (nếu có):</label>
                                <textarea
                                    className="w-full border border-gray-200 p-3 text-xs outline-none focus:border-black min-h-[80px] bg-gray-50/50"
                                    placeholder="Hãy mô tả rõ hơn về vấn đề bạn gặp phải..."
                                    value={returnDetail}
                                    onChange={(e) => setReturnDetail(e.target.value)}
                                />
                            </div>

                            <p className="text-[10px] text-gray-400 italic">
                                * Lưu ý: Shop sẽ liên hệ với bạn qua số điện thoại <b>{order.shippingInfo?.phone}</b> để xác nhận và hướng dẫn gửi lại hàng.
                            </p>
                        </div>

                        <div className="p-4 bg-gray-50 flex gap-3 border-t">
                            <button onClick={() => setIsReturnModalOpen(false)} className="flex-1 py-3 text-xs font-bold uppercase text-gray-500 hover:text-black">Hủy bỏ</button>
                            <button
                                onClick={handleRequestReturn}
                                disabled={!returnReason}
                                className={`flex-1 py-3 text-xs font-bold uppercase transition-all shadow-lg ${returnReason ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-300 text-white cursor-not-allowed"}`}
                            >
                                Gửi yêu cầu
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
}
export default OrderDetail;