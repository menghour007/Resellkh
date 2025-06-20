'use client'; // This component uses client-side hooks (useState) and event handlers

import { useState } from 'react';
import Image from 'next/image';

const ReviewFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0); // State for selected star rating
  const [reviewText, setReviewText] = useState(''); // State for review text area

  // Handle star click
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you'd send this data to an API
    console.log('Submitting Review:', { rating, reviewText });
    onSubmit({ rating, reviewText }); // Call the onSubmit prop
    setRating(0); // Reset form
    setReviewText(''); // Reset form
    onClose(); // Close the modal
  };

  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto relative p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
          aria-label="Close review form"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* User Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
            <Image
              src="/Product-Detail-Image/Sonita.png" // Placeholder avatar for the user writing the review
              alt="User avatar: Him Sonita"
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-lg">Him Sonita</h4>
            <p className="text-gray-600 text-sm">Consumer</p>
          </div>
        </div>

        {/* Star Rating Input */}
        <div className="flex space-x-1 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              className="text-gray-300 hover:text-orange-500 transition-colors"
              aria-label={`Rate ${star} stars`}
            >
              <svg
                className={`w-8 h-8 ${rating >= star ? 'text-orange-500' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.817 1.48-8.279L.001 9.306l8.332-1.151L12 .587z" />
              </svg>
            </button>
          ))}
        </div>

        {/* Review Text Area */}
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 text-base"
            rows="6"
            placeholder="Share details of your own experience at this place."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-800 rounded-full hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
           type="submit"
            className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
          >
            Post
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewFormModal;