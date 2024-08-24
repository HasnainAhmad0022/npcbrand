import React, { useEffect } from 'react'
import { useTranslation } from "react-i18next";
import DashboardRightHeader from '../../../components/DashboardRightHeader/DashboardRightHeader';
import { FaBoxOpen } from 'react-icons/fa';
import chart1 from "../../../Images/chart1.png";
import chart2 from "../../../Images/chart2.png";

const BrandDashboard = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    // auto scroll to bottom
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 shadow-md">
        <div>
          <DashboardRightHeader title={"Dashboard"} gcp={"628100000113"} member={"10105"} subscriptionExpiry={"365d 19h 49m 31s"}/>
        </div>

        {/* Card Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">     
          {/* Card 1 */}
          <div className="bg-[#D4E1F1] p-4 rounded-lg shadow-md text-center">
            <div className="text-3xl font-semibold">10</div>
            <div className="text-base mt-1">Category C (1,000 Barcodes)</div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#71BAEF] p-4 rounded-lg shadow-md text-center">
            <div className="text-3xl font-semibold">1 to 999</div>
            <div className="text-base mt-1">Range of Barcodes</div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#F09767] p-4 rounded-lg shadow-md text-center">
            <div className="text-3xl font-semibold">0</div>
            <div className="text-base mt-1">Barcode Issued</div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#F6E441] p-4 rounded-lg shadow-md text-center">
            <div className="text-3xl font-semibold">1000</div>
            <div className="text-base mt-1">Barcodes Remaining</div>
          </div>

          {/* Card 5 */}
          <div className="bg-[#D4E1F1] p-4 rounded-lg shadow-md text-center">
            <div className="text-3xl font-semibold">30</div>
            <div className="text-base mt-1">GLN (30 Locations)</div>
          </div>

          {/* Card 6 */}
          <div className="bg-[#71BAEF] p-4 rounded-lg shadow-md text-center">
            <div className="text-3xl font-semibold">1 to 29</div>
            <div className="text-base mt-1">Range of Barcodes</div>
          </div>

          {/* Card 7 */}
          <div className="bg-[#F09767] p-4 rounded-lg shadow-md text-center">
            <div className="text-3xl font-semibold">1</div>
            <div className="text-base mt-1">Barcodes Issued</div>
          </div>

          {/* Card 8 */}
          <div className="bg-[#F6E441] p-4 rounded-lg shadow-md text-center">
            <div className="text-3xl font-semibold">29</div>
            <div className="text-base mt-1">Barcodes Remaining</div>
          </div>
        </div>

        <div className="mt-8 border border-gray-200 shadow-lg rounded-md py-2">
          <div className="flex items-center px-6">
            <FaBoxOpen className="text-lg mr-2" />
            <h2 className="text-2xl">Member Products</h2>
          </div>
        </div>

        {/* Chart Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            {/* Chart 1 */}
            <div className="bg-white border border-gray-300 p-2 rounded-md">
              <img src={chart1} alt="GTIN and GLN Chart" className="w-full h-auto" />
            </div>

            {/* Chart 2 */}
            <div className="bg-white border border-gray-300 p-2 rounded-md">
              <img src={chart2} alt="Barcode Issued and Remaining Chart" className="w-full h-auto" />
            </div>
          </div>

      </div>
    </div>
  )
}

export default BrandDashboard