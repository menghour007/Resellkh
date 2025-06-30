'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createProduct } from '@/components/services/sell.service';

export async function listItemAction(prevState, formData) {
  const result = await createProduct(formData);

  if (result.success) {
    revalidatePath('/');
    revalidatePath('/profile/seller'); 
    
    redirect('/profile/seller');
  } else {
    return { message: result.error || 'An unexpected error occurred.' };
  }
}