import Header from "./Header";
import Footer from "./Footer";
import SearchDrug from "./SearchDrug";
export default function Home() {
  return (
    <div className="relative">
      <SearchDrug />
      <Footer />
    </div>
  );
}
