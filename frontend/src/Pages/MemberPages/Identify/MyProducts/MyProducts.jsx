import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import infoicon from "../../../../Images/infoicon.png";
import addtorequest from "../../../../Images/addtorequest.png";
import { FaPlus } from "react-icons/fa";
import ProductDetails from "./ProductDetails";
import NpcWorkFlowPopUp from "./NpcWorkFlowPopUp";
import { ImSpinner6 } from "react-icons/im";
import { newRequestnpc } from "../../../../utils/userRequest";
import { toast } from "react-toastify";
import axios from "axios";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";

const Products = () => {
  const [activeTab, setActiveTab] = useState("Standard Search");
  const [selectedWorkflowPopup, setSelectedWorkflowPopup] = useState(null);
  const [selectedMyProducts, setSelectedMyProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://gs1ksa.org:3091/api/products?user_id=3716`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiY2x0aXowN2tlMDAwMTEza24xOHIwcHE3NyIsImVtYWlsIjoiYWJkdWxtYWppZDFtMkBnbWFpbC5jb20iLCJpc19zdXBlcl9hZG1pbiI6MSwidXNlcm5hbWUiOiJBYmR1bCBNYWppZCIsInBlcm1pc3Npb25zIjpbIm1lbWJlcnMiLCJicmFuZHMiLCJndGluX2JhcmNvZGUiLCJnbG5fbG9jYXRpb24iLCJzc2NjIiwiZm9yZWlnbl9ndGluIiwicGF5bWVudF9zbGlwc19mb3JlaWduX2d0aW4iLCJvbGRfaW5hY3RpdmVfbWVtYmVycyIsImhlbHBfZGVzayIsInN0YWZmX2hlbHBfZGVzayIsInByb2R1Y3RfcGFja2FnaW5nIiwib3RoZXJfcHJvZHVjdHMiLCJjcl9udW1iZXIiXSwicm9sZXMiOlsiTWFya2V0aW5nIFN0YWZmIl0sImlhdCI6MTcyMzI3MTQ3OSwiZXhwIjoxNzMxMDQ3NDc5fQ.T0Fjd3ca4EFuzGwtpgTRhSieWgcDTBHzTsTwdC16-3A`,
          },
        }
      );
      console.log(response.data);
      // console.log(response.data);
      setData(response?.data || []);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error(err?.response?.data?.error || "Something went wrong");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const tabs = [
    { name: "Standard Search", icon: "" },
    { name: "AI Search", icon: "" },
  ];


  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://gs1ksa.org:3091/api/products/paginatedProducts?page=${currentPage}&pageSize=${pageSize}&user_id=3716`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiY2x0aXowN2tlMDAwMTEza24xOHIwcHE3NyIsImVtYWlsIjoiYWJkdWxtYWppZDFtMkBnbWFpbC5jb20iLCJpc19zdXBlcl9hZG1pbiI6MSwidXNlcm5hbWUiOiJBYmR1bCBNYWppZCIsInBlcm1pc3Npb25zIjpbIm1lbWJlcnMiLCJicmFuZHMiLCJndGluX2JhcmNvZGUiLCJnbG5fbG9jYXRpb24iLCJzc2NjIiwiZm9yZWlnbl9ndGluIiwicGF5bWVudF9zbGlwc19mb3JlaWduX2d0aW4iLCJvbGRfaW5hY3RpdmVfbWVtYmVycyIsImhlbHBfZGVzayIsInN0YWZmX2hlbHBfZGVzayIsInByb2R1Y3RfcGFja2FnaW5nIiwib3RoZXJfcHJvZHVjdHMiLCJjcl9udW1iZXIiXSwicm9sZXMiOlsiTWFya2V0aW5nIFN0YWZmIl0sImlhdCI6MTcyMzI3MTQ3OSwiZXhwIjoxNzMxMDQ3NDc5fQ.T0Fjd3ca4EFuzGwtpgTRhSieWgcDTBHzTsTwdC16-3A`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setRequests(data.products);
      const totalPages = Math.ceil(data.totalProducts / pageSize);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
      setRequests([]); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageInput = (e) => {
    const page = Number(e.target.value);
    if (!isNaN(page)) {
      handlePageChange(page);
    }
  };
  
    

  const cardfunction = (request)=>{
    console.log(request.barcode);
    
  try {
      const response = newRequestnpc.post("/master-data/createproductRequest", {
        brand_owner_user_id: "3716",
        npc_user_id: updateBrandData.user.id,
        status: "2",
        barcode: request.barcode,
      });
        toast.success(response?.data?.message || "Add to Request Successful");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login Failed");
      setLoading(false);
    }

  }

  console.log("data", data);
  const filteredRequests =
    data &&
    data.filter(
      (request) =>
        request.HSCODES?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        request.BrandName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

  const [isMyProductsPopUpVisible, setIsMyProductsPopUpVisible] =
    useState(false);
  const handleMyProductsPopUp = (data) => {
    setSelectedMyProducts(data);
    setIsMyProductsPopUpVisible(true);
  };

  const [isWorkFlowPopUpVisible, setIsWorkFlowPopUpVisible] = useState(false);
  const handleWorkFlowPopUp = (data) => {
    console.log("data", data);
    setSelectedWorkflowPopup(data);
    setIsWorkFlowPopUpVisible(true);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 shadow-md">
      <h2 className="text-xl font-sans font-semibold text-secondary mb-4">
          My Products
        </h2>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="relative flex items-center border rounded shadow focus-within:ring focus-within:ring-blue-300 sm:w-80">
            <input
              type="text"
              className="px-4 py-2 pr-10 rounded focus:outline-none w-full"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1117.65 6.65a7.5 7.5 0 01-5.3 10.1z"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <ImSpinner6 className="text-blue-500 text-4xl animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
              {requests
                .filter(
                  (request) =>
                    request.barcode
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    request.BrandName.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    )
                )
                .map((request) => (
                  <div
                  key={request.id}
                  className="flex flex-col border border-[#D1D5DB] rounded-lg p-2 shadow-lg hover:shadow-md transition-shadow duration-200"
                >
                  <div>
                  <p className="text-center font-normal font-sans text-white bg-[#100DA6]">
                    GTIN:{request.barcode}
                  </p>
                  <img
                    src={imageLiveUrl(request?.front_image)}
                    alt={request.BrandName}
                    className="w-full h-36 mb-4 object-contain self-center"
                  />
                  <p onClick={() => handleMyProductsPopUp(request)} className="text-center font-normal font-sans hover:cursor-pointer transform hover:scale-95 text-white text-sm bg-[#100DA6]">
                  {request.productnameenglish}
                  </p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <img 
                      src={infoicon} 
                      alt="Info" 
                      className="w-8 h-8 cursor-pointer" 
                      onClick={() => handleWorkFlowPopUp(request)}
                    />
                    <div className="flex items-center">
                      <div className="flex items-center bg-[#FFB484] rounded-l-full px-2 py-1">
                        <img src={addtorequest} alt="Info" className="w-6 h-5 cursor-pointer" />
                      </div>
                      <div className="bg-[#100DA6] rounded-r-full px-3 py-1 cursor-pointer" onClick={()=>cardfunction(request)}>
                        <FaPlus className="text-white" size={20} />
                      </div>
                    </div>
                  </div>
                </div>

                ))}
            </div>
          </>
        )}
        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
          >
            Previous
          </button>
          <div className="flex items-center space-x-2">
            <span>Page</span>
            <input
              type="number"
              value={currentPage}
              onChange={handlePageInput}
              className="w-16 px-2 py-1 border border-gray-300 rounded-lg"
              min="1"
              max={totalPages}
            />
            <span>of {totalPages}</span>
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>

      {isMyProductsPopUpVisible && (
        <ProductDetails
          isVisible={isMyProductsPopUpVisible}
          setVisibility={setIsMyProductsPopUpVisible}
          data={selectedMyProducts}
        />
      )}

      {isWorkFlowPopUpVisible && (
        <NpcWorkFlowPopUp
          isVisible={isWorkFlowPopUpVisible}
          setVisibility={setIsWorkFlowPopUpVisible}
          data={selectedWorkflowPopup}
        />
      )}
    </div>
  );
};

export default Products;
