import React from "react";
import { useTranslation } from "react-i18next";

const DashboardRightHeader = ({ title, member, gcp, subscriptionExpiry }) => {
  const { i18n } = useTranslation();

  return (
    <div>
      {/* Top Header Section */}
      <div className="flex justify-center items-center mb-4">
        <div
          className={`h-16 w-[95%] z-10 bg-white shadow-xl rounded-md flex items-center px-8 ${
            i18n.language === "ar" ? "justify-end" : "justify-start"
          } border border-secondary`}
        >
          <p className="text-blue-900 text-xl font-semibold">{title}</p>
        </div>
      </div>

      {/* Orange Information Bar */}
      <div className="flex justify-center items-center">
        <div
          className={`h-28 w-full bg-orange-600 rounded-md flex justify-between items-center shadow-xl -mt-10 px-10 py-3 ${
            i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <div className="text-white sm:text-xl text-lg font-sans font-semibold leading-tight pt-6">
            <p>GCP: {gcp}</p>
            <p>Member ID: {member}</p>
          </div>
          <div className="text-[#C3E2DC] text-right text-lg font-sans leading-tight pt-6">
            <p className="text-xl text-white">{subscriptionExpiry}</p>
            <p className="sm:text-lg text-xs">Your Subscription Will Expire On</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRightHeader;
