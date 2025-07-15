import SellerProfileClient from "@/components/profile/SellerProfileClient";

export default async function SellerProfilePage({ params }) {
  // Await params itself (if it's async)
  const awaitedParams = await params;
  const sellerId = awaitedParams?.sellerId;

  if (!sellerId) {
    return <div className="p-4 text-red-500">Invalid profile ID</div>;
  }

  return <SellerProfileClient sellerId={sellerId} />;
}
