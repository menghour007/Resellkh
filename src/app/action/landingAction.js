
import { getRecommendedProducts } from '@/components/services/landing.service';

export const fetchRecommendedProducts = async () => {
  return await getRecommendedProducts();
};