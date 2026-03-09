import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FirstGrove from "./pages/FirstGrove";
import HowItTends from "./pages/HowItTends";
import GuidedArrival from "./pages/GuidedArrival";
import GuidedTendingSession from "./pages/GuidedTendingSession";
import QuietArrival from "./pages/QuietArrival";
import StewardshipOnboarding from "./pages/StewardshipOnboarding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/first-grove" element={<FirstGrove />} />
          <Route path="/how-it-tends" element={<HowItTends />} />
          <Route path="/guided-tending/arrival" element={<GuidedArrival />} />
          <Route path="/guided-tending/session" element={<GuidedTendingSession />} />
          <Route path="/quiet-tending/arrival" element={<QuietArrival />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
