import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnalyticsConsentToast } from "./components/AnalyticsConsentToast";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Privacy } from "./pages/Privacy";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AnalyticsConsentToast />
    </BrowserRouter>
  );
}

export default App;
