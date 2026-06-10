import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalBackground from "@/components/GlobalBackground";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import SocialSidebar from "./components/SocialSidebar";

const App = () => (
  <BrowserRouter
    future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
  >
    <div className="relative min-h-screen overflow-x-hidden bg-[#f6f6f4] text-black">
      <GlobalBackground />
      <SocialSidebar />

      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
