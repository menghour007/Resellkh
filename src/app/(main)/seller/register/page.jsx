"use client"; // This MUST be the very first line of the file.

import React, { useState } from "react";
import {
  Store,
  Building,
  CreditCard,
  Eye,
  EyeOff,
  Shield,
  CheckCircle,
  Users,
  Briefcase,
  Sparkles, // Import Sparkles icon for the LLM feature
} from "lucide-react";
import { toast } from "react-hot-toast"; // Import react-hot-toast
import { useRouter } from "next/navigation"; // Import useRouter for redirection

export default function SellerRegistrationForm() {
  const router = useRouter(); // Initialize useRouter

  const [formData, setFormData] = useState({
    // Business Information
    businessName: "",
    businessType: "individual", // Default to individual
    businessAddress: "",
    businessDescription: "",

    // Banking Information
    bankName: "",
    bankAccount: "",
    accountHolderName: "",

    // Additional Information
    expectedMonthlyRevenue: "",
    agreeToTerms: false,
  });

  const [showBankAccount, setShowBankAccount] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Start at Step 1 for Business Info
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submission loading
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false); // State for LLM generation loading

  const bankOptions = [
    "ABA Bank",
    "ACLEDA Bank",
    "Canadia Bank",
    "ANZ Royal Bank",
    "Maybank",
    "Foreign Trade Bank",
    "PRASAC",
    "Sathapana Bank",
    "Wing Bank",
    "Phillip Bank",
  ];

  // Define business type options with icons
  const businessTypeOptions = [
    { value: "individual", label: "Individual", icon: Store },
    { value: "company", label: "Company", icon: Building },
    { value: "partnership", label: "Partnership", icon: Users },
    { value: "corporation", label: "Corporation", icon: Briefcase },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBusinessTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      businessType: type,
      businessName: type === "individual" ? "" : prev.businessName, // Clear businessName if individual
    }));
  };

  // Helper function to parse expected revenue string to a number
  const parseExpectedRevenue = (revenueString) => {
    if (!revenueString) return 0;
    if (revenueString === "10000+") return 10000; // Use the lower bound for "10000+"
    const match = revenueString.match(/^(\d+)-/); // Extract the first number from the range
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    return 0; // Default or fallback
  };

  // ✨ Gemini API Integration: Generate Business Description Suggestion
  const generateBusinessDescriptionSuggestion = async () => {
    if (!formData.businessDescription.trim()) {
      toast.error("Please enter some text in the Business Description to get suggestions.", {
        duration: 3000,
        position: 'bottom-right',
      });
      return;
    }

    setIsGeneratingDescription(true);
    toast.loading("Generating description suggestion...", { id: "desc-gen" });

    const prompt = `Rewrite the following business description to be more professional, concise, and appealing. Keep it under 150 words.
    Original description: "${formData.businessDescription}"`;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = { contents: chatHistory };
    // FIX: Retrieve API key from environment variable
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
    if (!apiKey) {
      toast.error("Gemini API key is missing. Please configure NEXT_PUBLIC_GEMINI_API_KEY.", { id: "desc-gen" });
      setIsGeneratingDescription(false);
      return;
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const generatedText = result.candidates[0].content.parts[0].text;
        setFormData((prev) => ({ ...prev, businessDescription: generatedText }));
        toast.success("Description enhanced successfully!", { id: "desc-gen" });
      } else {
        console.error("Gemini API response error or unexpected structure:", result);
        toast.error(`Failed to generate description: ${result.error?.message || 'Unknown error'}`, { id: "desc-gen" });
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      toast.error("Error connecting to Gemini API. Please try again.", { id: "desc-gen" });
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for the final step before submission
    if (currentStep === 2) {
      if (!formData.bankName || !formData.accountHolderName || !formData.bankAccount) {
        toast.error("Please fill in all required banking information.", {
          duration: 3000,
          position: 'bottom-right',
        });
        return;
      }
      if (!formData.agreeToTerms) {
        toast.error("You must agree to the Terms of Service and Privacy Policy.", {
          duration: 3000,
          position: 'bottom-right',
        });
        return;
      }
    }

    setIsSubmitting(true); // Start loading state

    const userId = localStorage.getItem('userId');
    const authToken = localStorage.getItem('token');

    if (!userId || !authToken) {
      toast.error("Authentication data missing. Please log in again.", {
        duration: 5000,
        position: 'bottom-right',
      });
      setIsSubmitting(false);
      return;
    }

    const payload = {
      userId: parseInt(userId, 10),
      businessName: formData.businessType !== "individual" ? formData.businessName : "N/A",
      businessType: formData.businessType,
      businessAddress: formData.businessAddress,
      businessDescription: formData.businessDescription,
      expectedRevenue: parseExpectedRevenue(formData.expectedMonthlyRevenue),
      bankName: formData.bankName,
      bankAccountName: formData.accountHolderName,
      bankAccountNumber: formData.bankAccount,
      createAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`https://phil-whom-hide-lynn.trycloudflare.com/api/v1/sellers/user/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("API Response:", result);
        toast.success("Seller application submitted successfully!", {
          duration: 3000,
          position: 'bottom-right',
        });

        // --- IMPORTANT: Dispatch custom event to notify AuthNavbar ---
        // This is crucial for AuthNavbar to update its state immediately.
        window.dispatchEvent(new CustomEvent('profile-updated'));

        // Redirect to seller dashboard after successful registration
        router.push("/seller/dashboard");

      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        toast.error(`Submission failed: ${errorData.message || 'Unknown error'}`, {
          duration: 5000,
          position: 'bottom-right',
        });
      }
    } catch (error) {
      console.error("Network or unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.", {
        duration: 5000,
        position: 'bottom-right',
      });
    } finally {
      setIsSubmitting(false); // End loading state
    }
  };

  const nextStep = () => {
    // Basic validation before moving to next step
    if (currentStep === 1) {
      if (formData.businessType !== "individual" && !formData.businessName) {
        toast.error("Please enter your Business Name.", {
          duration: 3000,
          position: 'bottom-right',
        });
        return;
      }
      if (!formData.businessAddress || !formData.expectedMonthlyRevenue) {
        toast.error("Please fill in all required business information.", {
          duration: 3000,
          position: 'bottom-right',
        });
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 2));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4 shadow-md">
            <Store className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Become a Seller
          </h1>
          <p className="text-gray-600">
            Join thousands of sellers and start growing your business today
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2].map((step) => (
              <React.Fragment key={step}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    step <= currentStep
                      ? "bg-orange-500 text-white shadow-md"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step
                  )}
                </div>
                {step < 2 && (
                  <div
                    className={`flex-grow h-1 mx-2 rounded-full transition-all duration-300 ${
                      step < currentStep ? "bg-orange-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 font-medium">
            <span>Business Info</span>
            <span>Banking Info</span>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Step 1: Business Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Building className="w-6 h-6 text-orange-500" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Business Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Business Type Selection (Modernized) */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type *
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {businessTypeOptions.map((option) => {
                      const IconComponent = option.icon;
                      const isActive = formData.businessType === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button" // Important: type="button" to prevent form submission
                          onClick={() => handleBusinessTypeChange(option.value)}
                          className={`flex items-center px-4 py-2 rounded-lg border transition-all duration-200
                            ${isActive
                              ? "bg-orange-500 text-white border-orange-500 shadow-md"
                              : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-orange-300"
                            }`}
                        >
                          <IconComponent className="w-5 h-5 mr-2" />
                          <span className="font-medium">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Conditional Business Name Field */}
                {formData.businessType !== "individual" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 shadow-sm rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200"
                      placeholder="Your business name"
                      required={formData.businessType !== "individual"} // Required only if visible
                    />
                  </div>
                )}

                {/* Business Address */}
                <div className={formData.businessType === "individual" ? "md:col-span-2" : ""}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Address *
                  </label>
                  <input
                    type="text"
                    name="businessAddress"
                    value={formData.businessAddress}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 shadow-sm rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="Street address"
                    required
                  />
                </div>

                {/* Business Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Description
                  </label>
                  <div className="relative">
                    <textarea
                      name="businessDescription"
                      value={formData.businessDescription}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-50 shadow-sm rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 pr-12"
                      placeholder="Describe your business..."
                    />
                    <button
                      type="button"
                      onClick={generateBusinessDescriptionSuggestion}
                      disabled={isGeneratingDescription}
                      className="absolute bottom-2 right-2 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-md text-sm font-medium hover:bg-orange-200 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGeneratingDescription ? (
                        "Generating..."
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-1" /> Enhance
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Expected Monthly Revenue */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Monthly Revenue *
                  </label>
                  <select
                    name="expectedMonthlyRevenue"
                    value={formData.expectedMonthlyRevenue}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 shadow-sm rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200"
                    required
                  >
                    <option value="">Select revenue range</option>
                    <option value="0-500">$0 - $500</option>
                    <option value="500-2000">$500 - $2,000</option>
                    <option value="2000-5000">$2,000 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="10000+">$10,000+</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Banking Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-orange-500" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Banking Information
                </h2>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  Your banking information is encrypted and secure. This is
                  used for payment processing only.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name *
                  </label>
                  <select
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 shadow-sm rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200"
                    required
                  >
                    <option value="">Select your bank</option>
                    {bankOptions.map((bank) => (
                      <option key={bank} value={bank}>
                        {bank}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Holder Name *
                  </label>
                  <input
                    type="text"
                    name="accountHolderName"
                    value={formData.accountHolderName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 shadow-sm rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="Name on bank account"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Account Number *
                  </label>
                  <div className="relative">
                    <input
                      type={showBankAccount ? "text" : "password"}
                      name="bankAccount"
                      value={formData.bankAccount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 bg-gray-50 shadow-sm rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200"
                      placeholder="000-123456789"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowBankAccount(!showBankAccount)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showBankAccount ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter your bank account number (e.g., 000-123456789)
                  </p>
                </div>

                {/* Agree to Terms checkbox - kept here as a final confirmation */}
                <div className="md:col-span-2">
                  <label className="flex items-center text-sm text-gray-700">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mr-3 text-orange-500 focus:ring-orange-500 rounded"
                      required
                    />
                    <span>
                      I agree to the{" "}
                      <a href="#" className="text-orange-600 hover:underline font-medium">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-orange-600 hover:underline font-medium">
                        Privacy Policy
                      </a>{" "}
                      *
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Previous
              </button>
            )}

            {currentStep < 2 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={!formData.agreeToTerms || isSubmitting}
                className="ml-auto px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}