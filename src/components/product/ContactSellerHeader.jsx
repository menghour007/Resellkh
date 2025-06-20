// This component doesn't need 'use client' as it has no client-side interactions or hooks.

const ContactSellerHeader = () => {
  return (
    <div className="mt-[100px]">
    <div className="flex items-center gap-4 mb-6"> {/* Added some margin-bottom for spacing */}
      <h2 className="text-xl font-bold text-gray-900 flex-shrink-0">Contact the seller</h2>
      <div className="flex-grow border-t border-gray-300"></div> {/* This creates the horizontal line */}
    </div>
    </div>
  );
};

export default ContactSellerHeader;