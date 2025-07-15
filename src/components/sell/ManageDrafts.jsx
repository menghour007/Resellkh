'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import DraftCard from './DraftCard';
import { useSession } from 'next-auth/react';

export default function ManageDrafts() {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchDrafts = async () => {
      if (status === 'authenticated' && session?.user?.id && session?.accessToken) {
        try {
          setLoading(true);
          setError(null);

          const token = session.accessToken;
          const userId = session.user.id;

          const res = await axios.get(
            `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/products/drafts/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
              },
            }
          );

          // Handle successful response
          if (res.data) {
            // If payload is null or undefined, treat as empty array
            const draftsData = res.data.payload || [];
            const activeDrafts = draftsData.filter(d => d && d.productStatus === "DRAFT");
            setDrafts(activeDrafts);
            
            // Don't set error if payload is null/empty - this is a valid case
          } else {
            // Only set error if the response structure is completely invalid
            setError('Invalid response structure from server');
          }
        } catch (err) {
          console.error('Fetch drafts error:', err);
          // Only show error for actual errors, not for empty responses
          if (err.response?.status !== 404 && err.response?.status !== 200) {
            setError(
              err.response?.data?.message ||
              err.message ||
              'Failed to load drafts. Please try again.'
            );
          }
        } finally {
          setLoading(false);
        }
      } else if (status === 'loading') {
        setLoading(true);
        setError(null);
      } else {
        setLoading(false);
        setError('You must be logged in to manage drafts.');
        setDrafts([]);
      }
    };

    fetchDrafts();
  }, [session, status]);

  if (loading) {
    return (
      <section className="p-4">
        <p className="text-gray-600">Loading drafts...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="p-4">
        <p className="text-red-600 font-semibold">{error}</p>
      </section>
    );
  }

  return (
    <section className="p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[17px] font-semibold">Manage Drafts</p>
      </div>
      
      {drafts.length === 0 ? (
        <p className="text-gray-600">You don't have any drafts saved yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {drafts.map((draft) => (
            <DraftCard key={draft.draftId} draft={draft} />
          ))}
        </div>
      )}
    </section>
  );
}