import React, { useEffect, useState } from "react";
import DataTable from "../../../../components/Datatable/Datatable";
import {
  efficiencyLabelsColumn,
  foodProductSafetiesDataColumn,
  ieceeCertificatesColumn,
  InventorySuppliersDataColumn,
  productConformitiesColumn,
  productDataColumn,
  productsContentsDataColumns,
  qualityMarkColumn,
  storageDataColumn,
} from "../../../../utils/datatablesource";
import brandimage from "../../../../Images/brandimage.png";
import infoicon from "../../../../Images/infoicon.png";
import AddDigitalLinksPopUp from "./AddDigitalLinksPopUp";
import { ImSpinner6 } from "react-icons/im";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { newRequestnpc } from "../../../../utils/userRequest";
import { toast } from "react-toastify";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";

const DigitalLinks = () => {
  const [activeTab, setActiveTab] = useState("Products Contents");
  const [activeSubTab, setActiveSubTab] = useState("Quality Mark");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [headerBtnLoading, setHeaderBtnLoading] = useState(false);

  const tabs = [
    { name: "Products Contents", icon: "ℹ️" },
    { name: "Nutritional", icon: "" },
    { name: "Allergen", icon: "" },
    { name: "Certification", icon: "" },
    { name: "Storage", icon: "" },
    { name: "Ingredients", icon: "" },
    { name: "Logistics", icon: "" },
    { name: "Retail", icon: "" },
    { name: "Safety Info", icon: "" },
    { name: "Recipes & Tips", icon: "" },
    { name: "Services", icon: "" },
    { name: "Packaging", icon: "" },
  ];

  const certificationSubTabs = [
    { name: "Quality Mark" },
    { name: "Efficiency Labels" },
    { name: "Conformity Certificates" },
    { name: "IECEE Certificates" },
  ];

  const [isAddDigitalLinksPopUpVisible, setIsAddDigitalLinksPopUpVisible] =
    useState(false);
  const handleAddDigitalLinksPopUp = () => {
    setIsAddDigitalLinksPopUpVisible(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [totalPages, setTotalPages] = useState(1);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
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
      console.log(data);
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

  const handleRowClickInParent = (item) => {
    if (!item || item?.length === 0) {
      // setTableSelectedRows(data)
      return;
    }
  };

  const [selectedCard, setSelectedCard] = useState(null); // State to store the selected card
  const handleCardClick = (request) => {
    setSelectedCard(request);
  };

  // State to hold data for each tab and sub-tab
  const [productContentsData, setProductContentsData] = useState([]);
  const [nutritionalData, setNutritionalData] = useState([]);
  const [allergenData, setAllergenData] = useState([]);
  const [qualityMarkData, setQualityMarkData] = useState([]);
  const [efficiencyLabelsData, setEfficiencyLabelsData] = useState([]);
  const [ieceeCertificatesData, setIeceeCertificatesData] = useState([]);
  const [productConformityData, setProductConformityData] = useState([]);
  const [PackagingData, setPackagingData] = useState([]);
  const [SafetyInfoData, setSafetyInfoData] = useState([]);
  const [storageData, setStorageData] = useState([]);

  // Fetch data based on the active tab and sub-tab
  const fetchDataForTab = async () => {
    setIsLoading(true);
    let url = "";

    if (activeTab === "Products Contents") {
      url = `/digitalLinks/productContents?barcode=${selectedCard?.barcode}`;
    } else if (activeTab === "Nutritional") {
      url = `/digitalLinks/efficiencyLabels?barcode=${selectedCard?.barcode}&page=1&pageSize=10`;
    } else if (activeTab === "Allergen") {
      url = `/digitalLinks/productConformity?barcode=${selectedCard?.barcode}&page=1&pageSize=10`;
    } else if (activeTab === "Certification") {
      switch (activeSubTab) {
        case "Quality Mark":
          url = `/digitalLinks/qualityMarks?barcode=${selectedCard?.barcode}&page=1&pageSize=10`;
          break;
        case "Efficiency Labels":
          url = `/digitalLinks/efficiencyLabels?barcode=${selectedCard?.barcode}&page=1&pageSize=10`;
          break;
        case "IECEE Certificates":
          url = `/digitalLinks/ieceeCertificates?barcode=${selectedCard?.barcode}`;
          break;
        case "Conformity Certificates":
          url = `/digitalLinks/productConformity?barcode=${selectedCard?.barcode}&page=1&pageSize=10`;
          break;
        default:
          break;
      }
    } else if (activeTab === "Packaging") {
      url = `/digitalLinks/packagings?page=1&pageSize=10&barcode=${selectedCard?.barcode}`;
    } else if (activeTab === "Safety Info") {
      url = `/digitalLinks/foodProductSafeties?page=1&pageSize=10&barcode=${selectedCard?.barcode}`;
    } else if (activeTab === "Storage") {
      url = `/digitalLinks/foodProductSafeties?page=1&pageSize=10&barcode=${selectedCard?.barcode}`;
    } 

    try {
      const response = await newRequestnpc.get(url);
      const data = response.data; // Adjust this based on your response structure
      // Update the state based on the tab/sub-tab
      if (activeTab === "Products Contents") {
        setProductContentsData(data.productContent);
      } else if (activeTab === "Nutritional") {
        setNutritionalData(data.items);
      } else if (activeTab === "Allergen") {
        setAllergenData(data.items);
      } else if (activeTab === "Certification") {
        switch (activeSubTab) {
          case "Quality Mark":
            setQualityMarkData(data.qualityMarks);
            break;
          case "Efficiency Labels":
            setEfficiencyLabelsData(data.efficiencyLabels);
            break;
          case "IECEE Certificates":
            setIeceeCertificatesData(data.ieceeCertificates);
            break;
          case "Conformity Certificates":
            setProductConformityData(data.productConformities);
            break;
          default:
            break;
        }
      } else if (activeTab === "Packaging") {
        setPackagingData(data.packagings);
        
      } else if (activeTab === "Safety Info") {
        setSafetyInfoData(data.foodProductSafeties);
      } else if (activeTab === "Storage") {
        setStorageData(data.productStorage);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataForTab(); // Fetch data when tab or sub-tab changes
    
  }, [activeTab, activeSubTab]);

  const handleDelete = async (id) => {
    let url = "";
    if (activeTab === "Products Contents") {
      url = `/digitalLinks/productContents/${id}`;
    } else if (activeTab === "Nutritional") {
      url = `/digitalLinks/efficiencyLabels/${id}`;
    } else if (activeTab === "Allergen") {
      url = `/digitalLinks/productConformity/${id}`;
    } else if (activeTab === "Certification") {
      switch (activeSubTab) {
        case "Quality Mark":
          url = `/digitalLinks/qualityMarks/${id}`;
          break;
        case "Efficiency Labels":
          url = `/digitalLinks/efficiencyLabels/${id}`;
          break;
        case "IECEE Certificates":
          url = `/digitalLinks/ieceeCertificates/${id}`;
          break;
        case "Conformity Certificates":
          url = `/digitalLinks/productConformity/${id}`;
          break;
        default:
          break;
      }
    } else if (activeTab === "Packaging") {
      url = `/digitalLinks/packagings/${id}`;
    } else if (activeTab === "Safety Info") {
      url = `/digitalLinks/foodProductSafeties/${id}`;
    } else if (activeTab === "Storage") {
      url = `/digitallinks/productStorage/${id}`;
    }

    try {
      await newRequestnpc.delete(url);
      // Filter the data to remove the deleted item
      if (activeTab === "Products Contents") {
        setProductContentsData((prev) => prev.filter((item) => item.id !== id));
      } else if (activeTab === "Nutritional") {
        setNutritionalData((prev) => prev.filter((item) => item.id !== id));
      } else if (activeTab === "Allergen") {
        setAllergenData((prev) => prev.filter((item) => item.id !== id));
      } else if (activeTab === "Certification") {
        switch (activeSubTab) {
          case "Quality Mark":
            setQualityMarkData((prev) => prev.filter((item) => item.id !== id));
            break;
          case "Efficiency Labels":
            setEfficiencyLabelsData((prev) =>
              prev.filter((item) => item.id !== id)
            );
            break;
          case "IECEE Certificates":
            setIeceeCertificatesData((prev) =>
              prev.filter((item) => item.id !== id)
            );
            break;
          case "Conformity Certificates":
            setProductConformityData((prev) =>
              prev.filter((item) => item.id !== id)
            );
            break;
          default:
            break;
        }
      } else if (activeTab === "Packaging") {
        setPackagingData((prev) => prev.filter((item) => item.id !== id));
      } else if (activeTab === "Safety Info") {
        setSafetyInfoData((prev) => prev.filter((item) => item.id !== id));
      } else if (activeTab === "Storage") {
        setStorageData((prev) => prev.filter((item) => item.id !== id));
      } 

      toast.success("Item deleted successfully");
    } catch (error) {
      console.log("Error deleting item:", error);
      toast.error("Failed to delete item");
    }
  };

  // Render DataGrid based on active tab and sub-tab
  const renderDataGrid = () => {
    const commonOptions = [
      // {
      //   label: "Edit",
      //   icon: (
      //     <EditIcon
      //       fontSize="small"
      //       color="action"
      //       style={{ color: "rgb(37 99 235)" }}
      //     />
      //   ),
      // action: handleEdit
      // },
      {
        label: "Delete",
        icon: <DeleteIcon fontSize="small" style={{ color: "#FF0032" }} />,
        action: (rowData) => handleDelete(rowData.id), // Call handleDelete with the row ID
      },
    ];

    if (activeTab === "Products Contents") {
      return (
        <DataTable
          data={productContentsData}
          columnsName={productsContentsDataColumns}
          loading={isLoading}
          secondaryColor="secondary"
          uniqueId="customerListId"
          checkboxSelection="disabled"
          handleRowClickInParent={handleRowClickInParent}
          dropDownOptions={commonOptions}
        />
      );
    } else if (activeTab === "Nutritional") {
      return (
        <DataTable
          data={data}
          columnsName={InventorySuppliersDataColumn}
          loading={isLoading}
          secondaryColor="secondary"
          uniqueId="customerListId"
          checkboxSelection="disabled"
          handleRowClickInParent={handleRowClickInParent}
          dropDownOptions={commonOptions}
        />
      );
    } else if (activeTab === "Allergen") {
      return (
        <DataTable
          data={data}
          columnsName={InventorySuppliersDataColumn}
          loading={isLoading}
          secondaryColor="secondary"
          uniqueId="customerListId"
          checkboxSelection="disabled"
          handleRowClickInParent={handleRowClickInParent}
          dropDownOptions={commonOptions}
        />
      );
    } else if (activeTab === "Certification") {
      switch (activeSubTab) {
        case "Quality Mark":
          return (
            <DataTable
              data={qualityMarkData}
              columnsName={qualityMarkColumn}
              loading={isLoading}
              secondaryColor="secondary"
              uniqueId="customerListId"
              checkboxSelection="disabled"
              handleRowClickInParent={handleRowClickInParent}
              dropDownOptions={commonOptions}
            />
          );
        case "Efficiency Labels":
          return (
            <DataTable
              data={efficiencyLabelsData}
              columnsName={efficiencyLabelsColumn}
              loading={isLoading}
              secondaryColor="secondary"
              uniqueId="customerListId"
              checkboxSelection="disabled"
              handleRowClickInParent={handleRowClickInParent}
              dropDownOptions={commonOptions}
            />
          );
        case "IECEE Certificates":
          return (
            <DataTable
              data={ieceeCertificatesData}
              columnsName={ieceeCertificatesColumn}
              loading={isLoading}
              secondaryColor="secondary"
              uniqueId="customerListId"
              checkboxSelection="disabled"
              handleRowClickInParent={handleRowClickInParent}
              dropDownOptions={commonOptions}
            />
          );
        case "Conformity Certificates":
          return (
            <DataTable
              data={productConformityData}
              columnsName={productConformitiesColumn}
              loading={isLoading}
              secondaryColor="secondary"
              uniqueId="customerListId"
              checkboxSelection="disabled"
              handleRowClickInParent={handleRowClickInParent}
              dropDownOptions={commonOptions}
            />
          );
        default:
          return null;
      }
    } else if (activeTab === "Packaging") {
      return (
        <DataTable
          data={PackagingData}
          columnsName={productDataColumn}
          loading={isLoading}
          secondaryColor="secondary"
          uniqueId="customerListId"
          checkboxSelection="disabled"
          handleRowClickInParent={handleRowClickInParent}
          dropDownOptions={commonOptions}
        />
      );
    } else if (activeTab === "Safety Info") {
      return (
        <DataTable
          data={SafetyInfoData}
          columnsName={foodProductSafetiesDataColumn}
          loading={isLoading}
          secondaryColor="secondary"
          uniqueId="customerListId"
          checkboxSelection="disabled"
          handleRowClickInParent={handleRowClickInParent}
          dropDownOptions={commonOptions}
        />
      );
    } else if (activeTab === "Storage") {
      return (
        <DataTable
          data={storageData}
          columnsName={storageDataColumn}
          loading={isLoading}
          secondaryColor="secondary"
          uniqueId="customerListId"
          checkboxSelection="disabled"
          handleRowClickInParent={handleRowClickInParent}
          dropDownOptions={commonOptions}
        />
      );
    }
    
  };

  return (
    <div className="mx-auto p-4 bg-[#DDF3F6]">
      <div className="flex items-center flex-wrap gap-3">
        <h2 className="text-xl font-sans font-semibold text-secondary mb-6">
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
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <ImSpinner6 className="text-blue-500 text-4xl animate-spin" />
        </div>
      ) : (
        <div className="grid 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
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
                onClick={() => handleCardClick(request)} // Card click handler
                className={`relative flex flex-col items-center border border-[#71BAEF] rounded-lg p-2 shadow-xl hover:cursor-pointer transition-shadow duration-200 ${
                  selectedCard?.id === request.id ? "bg-gray-200" : "bg-white"
                }`}
              >
                {/* Info Icon */}
                <div className="absolute top-8 right-2">
                  <img src={infoicon} alt="Info Icon" className="w-10 h-10" />
                </div>
                <p className="text-center font-normal font-sans text-secondary">
                  GTIN: {request.barcode}
                </p>
                <img
                  src={imageLiveUrl(request?.front_image)}
                  alt={request.productnameenglish}
                  className="w-36 h-36 mb-4 object-contain"
                />
                <p className="text-center font-normal font-sans text-secondary">
                  {request.productnameenglish}
                </p>
              </div>
            ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-secondary text-white font-sans rounded-md hover:bg-primary2"
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
          className="px-4 py-2 bg-secondary text-white font-sans rounded-md hover:bg-primary2"
        >
          Next
        </button>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto mt-3">
        <div className="flex justify-start items-center">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center justify-center text-xs py-3 px-3 font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.name
                  ? "bg-[#5523E4] text-white shadow-lg relative z-10"
                  : "bg-[#D4E1F1] text-gray-600 hover:bg-gray-300"
              }`}
              style={{
                clipPath:
                  activeTab === tab.name
                    ? "polygon(0% 0%, 90% 0%, 95% 100%, 5% 100%, 10% 10%)"
                    : "polygon(10% 0%, 90% 0%, 95% 100%, 5% 100%)",
                width: "150px",
                height: activeTab === tab.name ? "50px" : "40px",
                marginLeft: activeTab === tab.name ? "0px" : "-15px",
              }}
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Sub-Tabs for Certification */}
        {activeTab === "Certification" && (
          <div className="flex justify-start items-center mt-2 ml-4">
            {certificationSubTabs.map((subTab) => (
              <button
                key={subTab.name}
                onClick={() => setActiveSubTab(subTab.name)}
                className={`text-xs py-2 px-4 font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeSubTab === subTab.name
                    ? "bg-[#5523E4] text-white shadow-lg"
                    : "bg-[#D4E1F1] text-gray-600 hover:bg-gray-300"
                }`}
                style={{
                  borderRadius: "4px",
                  marginRight: "10px",
                }}
              >
                {subTab.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pt-0 min-h-screen">
        <div className="bg-white p-3 shadow-md border-t-[20px] border-primary2 rounded-md">
          {/* title and Gtin company name */}
          <div className="flex justify-between items-center flex-wrap gap-1">
            <div>
              <p className="text-secondary font-sans text-lg font-semibold">
                {activeTab === "Certification"
                  ? `${activeTab} - ${activeSubTab}`
                  : activeTab}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button className="py-2 px-4 bg-secondary text-white font-sans font-medium rounded-sm shadow-lg">
                GTIN: {selectedCard ? selectedCard.barcode : ""}
              </button>
              <button className="py-2 px-4 bg-secondary text-white font-sans font-medium rounded-sm shadow-lg">
                {selectedCard ? selectedCard.productnameenglish : ""}
              </button>
            </div>
            <div>
              <button className="py-2 px-4 bg-secondary text-white font-sans font-medium rounded-sm shadow-lg">
                Add to request
              </button>
            </div>
          </div>
          <div style={{ marginLeft: "-11px", marginRight: "-11px" }}>
            {renderDataGrid()}
          </div>

          {/* Digital Link Button */}
          <div className="-mt-3 px-2">
            <button
              onClick={handleAddDigitalLinksPopUp}
              className="py-2 sm:px-10 px-2 bg-secondary text-white font-sans font-medium rounded-sm shadow-lg"
            >
              Add Digital Links
            </button>
          </div>
        </div>
      </div>

      {isAddDigitalLinksPopUpVisible && (
        <AddDigitalLinksPopUp
          isVisible={isAddDigitalLinksPopUpVisible}
          setVisibility={setIsAddDigitalLinksPopUpVisible}
          activeTab={activeTab}
          activeSubTab={activeSubTab}
          selectedCard={selectedCard}
        />
      )}
    </div>
  );
};

export default DigitalLinks;