'use client';

import React from 'react';
import CheckoutItem from './CheckoutItem';

const CheckoutCart = ({ items, onRemove }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {items.map(item => (
          <CheckoutItem
            key={item.productId}
            item={item}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckoutCart;
