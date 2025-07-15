"use client"; 

import React, { useState, useEffect } from "react";
import {
  Store, Building, CreditCard, Eye, EyeOff, Shield, CheckCircle, Users, Briefcase, Edit,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

// --- HELPER FUNCTIONS ---
const mapRevenueToOptionValue = (revenue) => {
  if (revenue < 500) return "0-500";
  if (revenue < 2000) return "500-2000";
  if (revenue < 5000) return "2000-5000";
  if (revenue < 10000) return "5000-10000";
  return "10000+";
};

const parseRevenueFromOption = (revenueString) => {
  if (!revenueString) return 0;
  if (revenueString.includes('+')) return 10000;
  const match = revenueString.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

// --- COMPONENT ---
export default function SellerEditForm() {
  const router = useRouter(); 

  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "individual",
    businessAddress: "",
    businessDescription: "",
    bankName: "",
    bankAccount: "",
    accountHolderName: "",
    expectedMonthlyRevenue: "",
    agreeToTerms: true,
  });

  const [sellerId, setSellerId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBankAccount, setShowBankAccount] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bankOptions = [
    "ABA Bank", "ACLEDA Bank", "Canadia Bank", "ANZ Royal Bank", "Maybank",
    "Foreign Trade Bank", "PRASAC", "Sathapana Bank", "Wing Bank", "Phillip Bank",
  ];

  const businessTypeOptions = [
    { value: "individual", label: "Individual", icon: Store },
    { value: "company", label: "Company", icon: Building },
    { value: "partnership", label: "Partnership", icon: Users },
    { value: "corporation", label: "Corporation", icon: Briefcase },
  ];

  useEffect(() => {
    const fetchSellerData = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if (!userId || !token) {
        toast.error("You must be logged in to edit your profile.");
        router.push('/login');
        return;
      }
      try {
        const response = await fetch(`https://phil-whom-hide-lynn.trycloudflare.com/api/v1/sellers/user/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) { throw new Error("Could not find your seller information."); }
        const result = await response.json();
        const sellerData = result.payload;
        if (sellerData) {
          setFormData({
            businessName: sellerData.businessName || "",
            businessType: sellerData.businessType || "individual",
            businessAddress: sellerData.businessAddress || "",
            businessDescription: sellerData.businessDescription || "",
            bankName: sellerData.bankName || "",
            bankAccount: sellerData.bankAccountNumber || "",
            accountHolderName: sellerData.bankAccountName || "",
            expectedMonthlyRevenue: mapRevenueToOptionValue(sellerData.expectedRevenue),
            agreeToTerms: true,
          });
          setSellerId(sellerData.sellerId);
        }
      } catch (error) {
        toast.error(error.message);
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSellerData();
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleBusinessTypeChange = (type) => {
    setFormData((prev) => ({ ...prev, businessType: type }));
  };
  
  const handleSubmit = async (e) => {
    // This function will now only be called by the "Save Changes" button
    e.preventDefault(); 
    if (!sellerId) return toast.error("Cannot update: Seller ID is missing.");
    
    setIsSubmitting(true);
    const authToken = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const payload = {
      userId: parseInt(userId, 10),
      businessName: formData.businessType !== "individual" ? formData.businessName : "N/A",
      businessType: formData.businessType,
      businessAddress: formData.businessAddress,
      businessDescription: formData.businessDescription,
      expectedRevenue: parseRevenueFromOption(formData.expectedMonthlyRevenue),
      bankName: formData.bankName,
      bankAccountName: formData.accountHolderName,
      bankAccountNumber: formData.bankAccount,
    };
    
    try {
      const response = await fetch(`https://phil-whom-hide-lynn.trycloudflare.com/api/v1/sellers/${sellerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        toast.success("Seller profile updated successfully!");
        router.push("/seller/dashboard");
      } else {
        const errorData = await response.json();
        toast.error(`Update failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep(2);
  const prevStep = () => setCurrentStep(1);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg animate-pulse">Loading your seller profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4 shadow-md"><Edit className="w-8 h-8 text-white" /></div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Seller Profile</h1>
          <p className="text-gray-600">Keep your business and banking information up to date.</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">{[1, 2].map(step => (<React.Fragment key={step}><div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${step <= currentStep ? "bg-orange-500 text-white" : "bg-gray-200"}`}>{step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}</div>{step < 2 && <div className={`flex-grow h-1 mx-2 rounded-full ${step < currentStep ? "bg-orange-500" : "bg-gray-200"}`} />}</React.Fragment>))}</div>
          <div className="flex justify-between text-xs text-gray-500 font-medium"><span>Business Info</span><span>Banking Info</span></div>
        </div>

        {/* FIX: The onSubmit handler is removed from the <form> tag to prevent accidental submission. */}
        <form onSubmit={(e) => e.preventDefault()} className="bg-white rounded-2xl shadow-xl p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6"><Building className="w-6 h-6 text-orange-500" /><h2 className="text-xl font-semibold">Business Information</h2></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Business Type *</label><div className="flex flex-wrap gap-3">{businessTypeOptions.map(({ value, label, icon: Icon }) => (<button key={value} type="button" onClick={() => handleBusinessTypeChange(value)} className={`flex items-center px-4 py-2 rounded-lg border ${formData.businessType === value ? "bg-orange-500 text-white" : "bg-gray-50 hover:bg-gray-100"}`}><Icon className="w-5 h-5 mr-2" /><span>{label}</span></button>))}</div></div>
                {formData.businessType !== "individual" && (<div><label className="block text-sm font-medium mb-2">Business Name *</label><input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-50 rounded-lg"/></div>)}
                <div className={formData.businessType === "individual" ? "md:col-span-2" : ""}><label className="block text-sm font-medium mb-2">Business Address *</label><input type="text" name="businessAddress" value={formData.businessAddress} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-50 rounded-lg"/></div>
                <div className="md:col-span-2"><label className="block text-sm font-medium mb-2">Business Description</label><textarea name="businessDescription" value={formData.businessDescription} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 bg-gray-50 rounded-lg" /></div>
                <div className="md:col-span-2"><label className="block text-sm font-medium mb-2">Expected Monthly Revenue *</label><select name="expectedMonthlyRevenue" value={formData.expectedMonthlyRevenue} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-50 rounded-lg"><option value="0-500">$0 - $500</option><option value="500-2000">$500 - $2,000</option><option value="2000-5000">$2,000 - $5,000</option><option value="5000-10000">$5,000 - $10,000</option><option value="10000+">$10,000+</option></select></div>
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6"><CreditCard className="w-6 h-6 text-orange-500" /><h2 className="text-xl font-semibold">Banking Information</h2></div>
              <div className="bg-blue-50 border p-4 rounded-lg flex items-start gap-3"><Shield className="w-5 h-5 text-blue-600 mt-0.5" /><p className="text-sm text-blue-800">Your banking info is secure.</p></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium mb-2">Bank Name *</label><select name="bankName" value={formData.bankName} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-50 rounded-lg">{bankOptions.map(b => <option key={b} value={b}>{b}</option>)}</select></div>
                <div><label className="block text-sm font-medium mb-2">Account Holder Name *</label><input type="text" name="accountHolderName" value={formData.accountHolderName} onChange={handleInputChange} required className="w-full px-4 py-3 bg-gray-50 rounded-lg"/></div>
                <div className="md:col-span-2"><label className="block text-sm font-medium mb-2">Bank Account Number *</label><div className="relative"><input type={showBankAccount ? "text" : "password"} name="bankAccount" value={formData.bankAccount} onChange={handleInputChange} required className="w-full px-4 py-3 pr-12 bg-gray-50 rounded-lg" /><button type="button" onClick={() => setShowBankAccount(!showBankAccount)} className="absolute right-3 top-1/2 -translate-y-1/2">{showBankAccount ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}</button></div></div>
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <button type="button" onClick={prevStep} className={`px-6 py-3 border rounded-lg hover:bg-gray-50 ${currentStep === 1 ? 'invisible' : ''}`}>Previous</button>
            
            {currentStep < 2 
                ? <button type="button" onClick={nextStep} className="ml-auto px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Next Step</button> 
                // FIX: This button now explicitly calls handleSubmit on click
                : <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="ml-auto px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50">
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
            }
          </div>
        </form>
      </div>
    </div>
  );
}