import { searchByImage, searchByText } from '@/components/services/result.service';

export async function fetchScanResults(imgSrc) {
  try {
    const results = await searchByImage(imgSrc);
    return results;
  } catch (error) {
    console.error('Failed to fetch scan results:', error);
    return [];
  }
}

export async function fetchSearchResults(query) {
  try {
    const results = await searchByText(query);
    return results;
  } catch (error) {
    console.error('Failed to fetch search results:', error);
    return [];
  }
}