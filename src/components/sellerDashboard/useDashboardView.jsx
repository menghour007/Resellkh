// hooks/useDashboardView.js
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const useDashboardView = (
  initialData = { totalProducts: 0, paymentRecords: [] }
) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeView, setActiveView] = useState("default");

  // Effect to determine initial view based on URL param or data
  useEffect(() => {
    const viewParam = searchParams.get("view");

    if (viewParam === "orders") {
      // If 'view=orders' is in URL, check data to decide specific view
      if (initialData.paymentRecords.length === 0) {
        setActiveView("noOrdersSection"); // New state for no orders
      } else {
        setActiveView("newOrdersSection"); // Has orders
      }
    } else if (viewParam === "products") {
      // If 'view=products' is in URL, check data for products
      if (initialData.totalProducts === 0) {
        setActiveView("noProductsSection"); // New state for no products
      } else {
        setActiveView("productsListedSection"); // Has products
      }
    } else {
      // Default initial load logic without specific URL param
      if (initialData.totalProducts === 0) {
        setActiveView("noProductsSection"); // No products, show product creation CTA
      } else if (initialData.paymentRecords.length === 0) {
        setActiveView("noOrdersSection"); // No orders, show no order CTA
      } else {
        setActiveView("defaultSection"); // Everything looks good, show default
      }
    }
  }, [
    searchParams,
    initialData.totalProducts,
    initialData.paymentRecords.length,
  ]); // Dependencies for re-evaluation

  // Function to handle metric card clicks and update URL
  const handleMetricCardClick = (metricName) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    let newView = "defaultSection"; // Default fallback

    if (metricName === "newOrders") {
      current.set("view", "orders"); // Always set URL param for consistency
      if (initialData.paymentRecords.length === 0) {
        // Check data when "New Orders" is clicked
        newView = "noOrdersSection";
      } else {
        newView = "newOrdersSection";
      }
    } else if (metricName === "productsListed") {
      current.set("view", "products"); // Always set URL param
      if (initialData.totalProducts === 0) {
        // Check data when "Products Listed" is clicked
        newView = "noProductsSection";
      } else {
        newView = "productsListedSection";
      }
    } else {
      // For 'totalSales' or 'conversionRate'
      current.delete("view"); // Remove 'view' param
      newView = "defaultSection"; // Go to default view
    }

    setActiveView(newView); // Update internal state
    const query = current.toString();
    router.push(`?${query}`, { scroll: false }); // Update URL
  };

  return {
    activeView,
    handleMetricCardClick,
  };
};

export default useDashboardView;
