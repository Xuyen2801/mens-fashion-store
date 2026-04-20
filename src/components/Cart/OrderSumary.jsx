import { useEffect, useState, useCallback } from "react";
import { useCart } from "../../components/Cart/CartContext";
import { loadAoThunMeta } from "../../lib/aoThunMeta";
import toast from "react-hot-toast";

const fmt = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

export default function OrderSummary({ onCheckout }) {
  const { state, dispatch } = useCart();
  const [shippingMethods, setShippingMethods] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [tempShipVoucher, setTempShipVoucher] = useState(null);
  const [tempProdVoucher, setTempProdVoucher] = useState(null);
  const [voucherCodeInput, setVoucherCodeInput] = useState("");

  const selectedItemKeys = Array.isArray(state.selectedItemKeys) ? state.selectedItemKeys : [];
  const selectedItems = state.items.filter((item) => selectedItemKeys.includes(item.key));
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + (item.product.salePrice ?? item.product.price) * item.quantity,
    0
  );

  const findBestDoubleVouchers = useCallback((voucherList, currentSubtotal) => {
    const eligible = voucherList.filter(v => currentSubtotal >= v.minSubtotal);
    const bestShip = eligible
      .filter(v => v.category === 'shipping')
      .reduce((prev, curr) => (curr.value > (prev?.value || 0) ? curr : prev), null);
    const bestProd = eligible
      .filter(v => v.category !== 'shipping')
      .reduce((prev, curr) => {
        const getVal = (v) => v.type === 'percent' ? (currentSubtotal * v.value) / 100 : v.value;
        const prevVal = prev ? (prev.type === 'percent' ? (currentSubtotal * prev.value) / 100 : prev.value) : 0;
        return getVal(curr) > prevVal ? curr : prev;
      }, null);
    return { bestShip, bestProd };
  }, []);

  const handleApplyVoucherCode = () => {
    if (!voucherCodeInput.trim()) {
      toast.error("Vui lòng nhập mã voucher");
      return;
    }

    // Tìm voucher trong danh sách dựa trên code (không phân biệt hoa thường)
    const foundVoucher = vouchers.find(
      (v) => v.code.toUpperCase() === voucherCodeInput.trim().toUpperCase()
    );

    if (foundVoucher) {
      const isDisabled = subtotal < foundVoucher.minSubtotal;

      if (isDisabled) {
        toast.error(`Mã này yêu cầu đơn hàng tối thiểu ${fmt(foundVoucher.minSubtotal)}`);
        return;
      }

      // Nếu tìm thấy và đủ điều kiện, thực hiện "tick" dựa trên category
      if (foundVoucher.category === 'shipping') {
        setTempShipVoucher(foundVoucher);
        toast.success("Đã tìm thấy và chọn mã Freeship");
      } else {
        setTempProdVoucher(foundVoucher);
        toast.success("Đã tìm thấy và chọn mã Giảm giá");
      }

      // Xóa nội dung ô nhập sau khi áp dụng thành công
      setVoucherCodeInput("");
    } else {
      toast.error("Mã voucher không tồn tại hoặc đã hết hạn");
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/vouchers")
      .then((res) => res.json())
      .then((data) => {
        setVouchers(data);
        // Tự động áp dụng cặp tốt nhất nếu chưa chọn mã nào
        if (!state.appliedShipVoucher && !state.appliedProdVoucher && data.length > 0) {
          const { bestShip, bestProd } = findBestDoubleVouchers(data, subtotal);
          if (bestShip) dispatch({ type: "SET_SHIP_VOUCHER", payload: bestShip });
          if (bestProd) dispatch({ type: "SET_PROD_VOUCHER", payload: bestProd });
        }
      });
  }, [subtotal, findBestDoubleVouchers, dispatch, state.appliedShipVoucher, state.appliedProdVoucher]);

  // ✨ Đồng bộ lựa chọn hiện tại khi mở Modal
  useEffect(() => {
    if (isVoucherModalOpen) {
      setTempShipVoucher(state.appliedShipVoucher);
      setTempProdVoucher(state.appliedProdVoucher);
    }
  }, [isVoucherModalOpen, state.appliedShipVoucher, state.appliedProdVoucher]);

  useEffect(() => {
    loadAoThunMeta().then(({ shippingMethods }) => {
      setShippingMethods(shippingMethods);
      if (!state.shippingMethod && shippingMethods.length > 0) {
        dispatch({ type: "SET_SHIPPING", payload: shippingMethods[0].id });
      }
    });
  }, [dispatch, state.shippingMethod]);

  // ✨ Xác nhận chọn cả 2 mã
  const handleConfirmVoucher = () => {
    dispatch({ type: "SET_SHIP_VOUCHER", payload: tempShipVoucher });
    dispatch({ type: "SET_PROD_VOUCHER", payload: tempProdVoucher });
    toast.success("Đã cập nhật mã giảm giá thành công");
    setIsVoucherModalOpen(false);
  };

  const selectedShipping = shippingMethods.find((s) => s.id === state.shippingMethod) || shippingMethods[0] || { price: 0, name: "" };

  // ✨ Tính toán giảm giá tổng hợp
  let prodDiscount = 0;
  let shipDiscount = 0;
  let shippingFee = selectedShipping.price;

  if (state.appliedProdVoucher) {
    const v = state.appliedProdVoucher;
    prodDiscount = v.type === "percent" ? Math.round((subtotal * v.value) / 100) : Math.min(v.value, subtotal);
  }
  if (state.appliedShipVoucher) {
    shipDiscount = Math.min(state.appliedShipVoucher.value, shippingFee);
  }

  const total = subtotal - prodDiscount + (shippingFee - shipDiscount);

  return (
    <div className="order-summary">
      <h3 className="summary-title">Tóm tắt đơn hàng</h3>
      <p className="summary-selected-note">Đang thanh toán {selectedItems.length} sản phẩm đã chọn</p>

      {/* Shipping method */}
      <div className="summary-section">
        <p className="section-label">Phương thức vận chuyển</p>
        <div className="shipping-options">
          {shippingMethods.map((sm) => (
            <label key={sm.id} className={`shipping-opt ${state.shippingMethod === sm.id ? "active" : ""}`}>
              <input
                type="radio"
                name="shipping"
                value={sm.id}
                checked={state.shippingMethod === sm.id}
                onChange={() => dispatch({ type: "SET_SHIPPING", payload: sm.id })}
              />
              <span className="ship-info">
                <span className="ship-name">{sm.name}</span>
                <span className="ship-desc">{sm.description}</span>
              </span>
              <span className="ship-price">{sm.price === 0 ? "Miễn phí" : fmt(sm.price)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Voucher */}
      <div className="summary-section">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <img src="/icon/voucher.png" alt="Voucher" className="w-5 h-5 object-contain" />
            <p className="section-label mb-0 uppercase font-bold text-[11px] text-gray-700">Voucher của Shop</p>
          </div>
          {(state.appliedShipVoucher || state.appliedProdVoucher) && (
            <button onClick={() => setIsVoucherModalOpen(true)} className="text-[11px] text-blue-600 font-bold hover:underline">Thay đổi</button>
          )}
        </div>

        <div className="space-y-2">
          {state.appliedShipVoucher && (
            <div className="flex justify-between items-center bg-teal-50 border border-teal-100 p-2.5 rounded shadow-sm">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-teal-600 uppercase">Freeship: {state.appliedShipVoucher.code}</span>
              </div>
              <button onClick={() => dispatch({ type: "REMOVE_SHIP_VOUCHER" })} className="text-gray-400 hover:text-red-500">✕</button>
            </div>
          )}
          {state.appliedProdVoucher && (
            <div className="flex justify-between items-center bg-orange-50 border border-orange-100 p-2.5 rounded shadow-sm">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-orange-600 uppercase">Giảm giá: {state.appliedProdVoucher.code}</span>
              </div>
              <button onClick={() => dispatch({ type: "REMOVE_PROD_VOUCHER" })} className="text-gray-400 hover:text-red-500">✕</button>
            </div>
          )}
          {!state.appliedShipVoucher && !state.appliedProdVoucher && (
            <div onClick={() => setIsVoucherModalOpen(true)} className="cursor-pointer border border-dashed border-gray-300 p-3 rounded text-center text-gray-400 text-[12px] bg-gray-50/30">
              Nhấp để nhận mã giảm giá và Freeship
            </div>
          )}
        </div>
      </div>

      {/* Note & Totals */}
      <div className="summary-section">
        <textarea className="order-note" placeholder="Ghi chú đơn hàng..." value={state.note} onChange={(e) => dispatch({ type: "SET_NOTE", payload: e.target.value })} rows={2} />
      </div>

      <div className="summary-totals">
        <div className="total-row"><span>Tạm tính</span><span>{fmt(subtotal)}</span></div>
        <div className="total-row">
          <span>Vận chuyển</span>
          <span>{shipDiscount > 0 ? <><strike className="text-gray-400 mr-2">{fmt(shippingFee)}</strike>{fmt(shippingFee - shipDiscount)}</> : fmt(shippingFee)}</span>
        </div>
        {prodDiscount > 0 && <div className="total-row text-orange-600"><span>Giảm giá</span><span>−{fmt(prodDiscount)}</span></div>}
        <div className="total-row grand-total"><span>Tổng cộng</span><span className="text-xl text-[#ee4d2d]">{fmt(total)}</span></div>
      </div>

      <button className="checkout-btn w-full mt-4" onClick={onCheckout} disabled={!selectedItems.length}>Tiến hành thanh toán</button>

      {/* 🎫 MODAL (GIỮ NGUYÊN CSS CỦA BẠN) */}
      {isVoucherModalOpen && (
        <div className="fixed inset-0 z-[9999] flex justify-center bg-black/50 backdrop-blur-[2px]">
          <div className="absolute inset-0" onClick={() => setIsVoucherModalOpen(false)}></div>

          <div className="relative bg-white w-full max-w-[520px] rounded-sm shadow-2xl flex flex-col overflow-hidden self-center mx-4"
            style={{
              marginTop: '140px', // ✨ Tăng từ 160px lên 240px để đẩy modal xuống thấp
              height: '70vh',
              maxHeight: '600px'
            }}>{/* ✨ Giảm chiều dài modal xuống 65vh */}

            <div className="p-5 bg-white border-b flex justify-between items-center flex-shrink-0">
              <h3 className="text-[20px] font-bold text-gray-800 uppercase" style={{ margin: "10px" }}>Chọn Voucher</h3>
              <button onClick={() => setIsVoucherModalOpen(false)} className="text-gray-400 text-2xl hover:text-black">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto bg-[#f5f5f5] custom-scrollbar p-4">
              <div className="flex gap-3 mb-5 bg-[#f8f8f8] p-4 rounded-sm border border-gray-100 items-center" style={{margin:"10px"}}>
                <span className="text-[14px] text-gray-600 whitespace-nowrap font-bold">Mã Voucher</span>
                <input
                  type="text"
                  placeholder="Mã Voucher của bạn"
                  value={voucherCodeInput}
                  onChange={(e) => setVoucherCodeInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyVoucherCode()} // Nhấn Enter cũng áp dụng được
                  className="flex-1 border border-gray-300 p-2 text-[14px] outline-none focus:border-orange-500 rounded-sm uppercase"
                />
                <button
                  onClick={handleApplyVoucherCode}
                  disabled={!voucherCodeInput.trim()}
                  className={`px-6 py-2 text-[14px] font-bold rounded-sm border transition-all ${voucherCodeInput.trim()
                      ? "bg-white border-orange-500 text-orange-500 hover:bg-orange-50 active:scale-95"
                      : "bg-[#f0f0f0] text-gray-400 cursor-not-allowed"
                    }`}
                >
                  ÁP DỤNG
                </button>
              </div>

              {/* NHÓM 1: MÃ VẬN CHUYỂN */}
              <div className="mb-6" style={{ margin: "10px" }}>
                <h4 className="text-[15px] text-gray-800 mb-1 font-bold">Mã Miễn Phí Vận Chuyển</h4>
                <p className="text-[13px] text-gray-500 mb-4">Có thể chọn 1 Voucher</p>
                <div className="space-y-3">
                  {vouchers.filter(v => v.category === 'shipping').map(vc => (
                    <VoucherItem
                      style={{ margin: "10px" }}
                      key={vc.code} vc={vc}
                      isSelected={tempShipVoucher?.code === vc.code}
                      subtotal={subtotal}
                      onSelect={() => setTempShipVoucher(tempShipVoucher?.code === vc.code ? null : vc)}
                    />
                  ))}
                </div>
              </div>

              {/* NHÓM 2: MÃ GIẢM GIÁ SẢN PHẨM */}
              <div className="mb-6" style={{ margin: "10px" }}>
                <h4 className="text-[15px] font-bold text-gray-800 mb-1">Mã Giảm Giá / Hoàn Xu</h4>
                <p className="text-[13px] text-gray-500 mb-4">Có thể chọn 1 Voucher</p>
                <div className="space-y-3">
                  {vouchers.filter(v => v.category !== 'shipping').map(vc => (
                    <VoucherItem
                      key={vc.code} vc={vc}
                      isSelected={tempProdVoucher?.code === vc.code}
                      subtotal={subtotal}
                      onSelect={() => setTempProdVoucher(tempProdVoucher?.code === vc.code ? null : vc)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t flex justify-end gap-3 flex-shrink-0" style={{ margin: "10px" }}>
              <button onClick={() => setIsVoucherModalOpen(false)} className="px-10 py-2 border border-gray-200 text-gray-600 uppercase text-[14px] rounded-sm"
                style={{
                  padding: '10px 40px',
                  margin: '0 10px',
                  marginTop: '10px',
                  borderRadius: '4px',
                  border: 'none',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>Trở lại</button>
              <button onClick={handleConfirmVoucher} className="px-10 py-2 bg-[#ee4d2d] text-white font-medium uppercase text-[14px] rounded-sm"
                style={{
                  padding: '10px 40px',
                  margin: '0 10px',
                  marginTop: '10px',
                  borderRadius: '4px',
                  border: 'none',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>Đồng ý</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VoucherItem({ vc, isSelected, onSelect, subtotal }) {
  const isDisabled = subtotal < vc.minSubtotal;
  const isShip = vc.category === 'shipping';

  return (
    <div
      className={`group flex bg-white border rounded-sm shadow-sm relative overflow-hidden transition-all 
        ${isDisabled ? 'opacity-60' : 'cursor-pointer'} 
        ${isShip ? 'hover:border-[#00bfa5]' : 'hover:border-[#ee4d2d]'} 
        ${isSelected ? (isShip ? 'border-[#00bfa5] ring-1 ring-[#00bfa5]' : 'border-[#ee4d2d] ring-1 ring-[#ee4d2d]') : ''}`}
      onClick={() => !isDisabled && onSelect()}
      style={{ borderLeft: 'none', margin: '10px' }}
    >
      {/* Cột màu bên trái */}
      <div className={`w-[110px] flex flex-col items-center justify-center text-white relative flex-shrink-0 ${isShip ? 'bg-[#00bfa5]' : 'bg-[#ee4d2d]'}`}>
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-around py-1 h-full">
          {[...Array(8)].map((_, i) => <div key={i} className="w-1 h-2 bg-[#f5f5f5] rounded-r-full" style={{ marginLeft: '-1px' }} />)}
        </div>
        <div className="text-center px-1">
          <span className="text-[11px] font-bold block leading-tight">{isShip ? 'FREE SHIP' : 'GIẢM GIÁ'}</span>
          <div className="text-[32px] my-1">🎟️</div>
        </div>
      </div>

      {/* Nội dung Ticket */}
      <div className="flex-1 p-3 min-w-0 pr-12 flex flex-col justify-center">
        <p className="font-medium text-[14px] text-gray-800 line-clamp-2 leading-tight mb-1">{vc.description}</p>
        <div className="space-y-1">
          <div className={`inline-block px-1 border text-[10px] rounded-sm ${isShip ? 'border-[#00bfa5] text-[#00bfa5]' : 'border-orange-500 text-orange-500'}`}>Dành cho đơn từ {fmt(vc.minSubtotal)}</div>
          <p className="text-[12px] text-gray-400">HSD: {new Date(vc.expiryDate).toLocaleDateString('vi-VN')}</p>
        </div>
        {isDisabled && <p className="text-[11px] text-[#ee4d2d] mt-1 italic">Mua thêm {fmt(vc.minSubtotal - subtotal)} để áp dụng</p>}
      </div>

      {/* Radio Circle */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? (isShip ? 'bg-[#00bfa5] border-[#00bfa5]' : 'bg-[#ee4d2d] border-[#ee4d2d]') : 'border-gray-300'}`}>
          {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
        </div>
      </div>
    </div>
  );
}