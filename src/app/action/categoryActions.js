"use server";

import { getProductsByMainCategoryId } from "@/components/services/category.service";

export const fetchProductsByMainCategory = async (mainCategoryId) => {
  try {
    return await getProductsByMainCategoryId(mainCategoryId);
  } catch (error) {
    console.error("Error fetching category products:", error);
    throw error;
  }
};
