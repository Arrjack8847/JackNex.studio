import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import GlobalBackground from "@/components/GlobalBackground";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import SocialSidebar from "./components/SocialSidebar";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setShowBackground(window.innerWidth >= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative min-h-screen overflow-hidden bg-[#f6f6f4] text-black">
          {showBackground && <GlobalBackground />}
          <SocialSidebar />

          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
);

export default App;
