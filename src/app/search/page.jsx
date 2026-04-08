import { Suspense } from "react";
import SearchPage from "../../components/Search/SearchPage";

export default function Search() {
  return (
    <Suspense fallback={<div style={{ padding: "60px", textAlign: "center" }}>Đang tải...</div>}>
      <SearchPage />
    </Suspense>
  );
}
