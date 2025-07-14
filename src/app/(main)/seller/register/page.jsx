"use client";

import { useState } from "react";
import {
  Store,
  Building,
  CreditCard,
  Eye,
  EyeOff,
  Shield,
  CheckCircle,
} from "lucide-react";

export default function SellerRegistrationForm() {
  const [formData, setFormData] = useState({
    // Business Information
    businessName: "",
    businessType: "individual",
    businessAddress: "",
    // Removed businessCity and businessPostalCode
    businessDescription: "",

    // Banking Information
    bankName: "",
    bankAccount: "",
    accountHolderName: "",

    // Additional Information
    expectedMonthlyRevenue: "",
    agreeToTerms: false, // Retained as it's typically a final agreement
  });

  const [showBankAccount, setShowBankAccount] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Start at Step 1 for Business Info

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const nextStep = () => {
    // Only two steps: 1 (Business) and 2 (Banking)
    setCurrentStep((prev) => Math.min(prev + 1, 2));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4">
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
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step
                  )}
                </div>
                {step < 2 && ( // Only show connecting line between step 1 and 2
                  <div
                    className={`w-full h-1 mx-2 ${
                      step < currentStep ? "bg-orange-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Your business name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type *
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="individual">Individual</option>
                    <option value="company">Company</option>
                    <option value="partnership">Partnership</option>
                    <option value="corporation">Corporation</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Address *
                  </label>
                  <input
                    type="text"
                    name="businessAddress"
                    value={formData.businessAddress}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Street address"
                    required
                  />
                </div>

                {/* City and Postal Code fields removed */}

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Description
                  </label>
                  <textarea
                    name="businessDescription"
                    value={formData.businessDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Describe your business..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Monthly Revenue
                  </label>
                  <select
                    name="expectedMonthlyRevenue"
                    value={formData.expectedMonthlyRevenue}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <p className="text-sm text-blue-800">
                    Your banking information is encrypted and secure. This is
                    used for payment processing only.
                  </p>
                </div>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mr-3 text-orange-500 focus:ring-orange-500"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the{" "}
                      <a href="#" className="text-orange-600 hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-orange-600 hover:underline">
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
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            )}

            {currentStep < 2 ? ( // Only one "Next Step" button to go from Business to Banking
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={!formData.agreeToTerms}
                className="ml-auto px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
