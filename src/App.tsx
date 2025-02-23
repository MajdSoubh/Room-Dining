import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import Categories from "./pages/Categories";
import MainLayout from "./layouts/MainLayout";
import ItemsList from "./pages/ItemsList";
import Home from "./pages/Home";
import "./assets/styles/app.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route
                  path="/categories/:category-id"
                  element={<ItemsList />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
