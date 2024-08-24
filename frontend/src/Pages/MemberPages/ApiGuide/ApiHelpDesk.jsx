import React, { useState, useEffect } from "react";
import DashboardRightHeader from "../../../components/DashboardRightHeader/DashboardRightHeader";
import { useTranslation } from "react-i18next";
import { RiMenu3Line } from "react-icons/ri";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import {
  parametersCodification,
  parametersCreateTicket,
  parametersDelete,
  parametersDigitalLink,
  parametersHscode,
  parametersProductDetails,
  parametersSearchLicenses,
  parametersUpdataticket,
  parametersadduserguidepdf,
  parametersadduserguidevideo,
  parametersupdatauserguidepdf,
  parametersupdatauserguidevideo,
} from "./Parametersdata";
import newRequest from "../../../utils/userRequest";
import { baseUrl, vectorEmbeddingUrl } from "../../../utils/config";

const ApiHelpDesk = () => {
  const { t, i18n } = useTranslation();
  const [isChecked, setIsChecked] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [data, setData] = useState([]);
  const [deletdaatashow, setdeletdaatashow] = useState("");
  const [postputshowdata, setpostputshowdata] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [statusapi, setstatusapi] = useState("");
  const [showTryItBox, setShowTryItBox] = useState(false);
  const [gpc, setgpc] = useState("10008163");
  const [deletidvalue, setdeletidvalue] = useState(`{id}`);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [rows, setRows] = useState([{}]);
  const [rowsfile, setRowsfile] = useState([]);
  const [error, seterror] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputChange = (param, value) => {
    setInputValues((prevState) => ({
      ...prevState,
      [param]: value,
    }));
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const getTextColor = (text) => {
    if (text === "DELETE" || text === "Del" || text === "Delete") {
      return "red";
    } else if (text === "PUT" || text === "Put") {
      return "#3b54f5";
    } else if (text === "POST" || text === "Post") {
      return "rgb(173, 122, 3)";
    } else {
      return "rgb(0, 127, 49)"; // Default color for "GET"
    }
  };

  const apiList = [
    {
      name: "Search GPC for Codification",
      endpoint: `/gpc/searchGpcForCodification?gpc=10008163`,
      method: "GET",
      parameters: ["gpc"],
      paramenterdata: parametersCodification,
    },
    {
      name: "Get GTIN Product Details",
      endpoint: "/foreignGtin/getGtinProductDetails?barcode=6287025650043",
      method: "GET",
      parameters: ["barcode"],
      paramenterdata: parametersProductDetails,
    },
    {
      name: "Search Licenses",
      endpoint:
        "/license/search?licenseeName=Oil&countryCode=SA&countryFullName=saudi%20arabia",
      method: "GET",
      parameters: ["licenseeName", "countryCode", "countryFullName"],
      paramenterdata: parametersSearchLicenses,
    },
    {
      name: "Get Digital Links",
      endpoint:
        "/digitalLinks?identificationKeyType=gtin&identificationKey=6281000004036",
      method: "GET",
      parameters: ["identificationKeyType", "identificationKey"],
      paramenterdata: parametersDigitalLink,
    },
    {
      name: "semantic Search Api For Hscode",
      endpoint: "/findSimilarRecords?text=bird&tableName=hs_codes",
      method: "GET",
      parameters: ["text", "tableName"],
      paramenterdata: parametersHscode,
    },
  ];

  const filteredApiList = apiList.filter(
    (api) =>
      api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      api.method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [activeTab, setActiveTab] = useState(apiList[0]);
  const [getapiserach, setgetapiserach] = useState(
    `${baseUrl}${apiList[0].endpoint}`
  ); // Initialize getapiserach with the endpoint of the first item in apiList
  const handleTabClick = async (api) => {
    setActiveTab(api);
    setData([]);
    setdeletdaatashow([]);
    setpostputshowdata([]);
    setRowsfile([]);
    setdeletidvalue("");
    setIsLoading(false);
    seterror("");
    setgetapiserach(`${activeTab.endpoint}`);
    // setRows([])
    try {
      const response = await axios.get(`${activeTab.endpoint}`);
      setApiResponse(response);
      console.log(response.data);
      setstatusapi(response);
    } catch (error) {
      console.error("Error fetching API data:", error.message);
      setstatusapi(error.response);
    }
  };

  useEffect(() => {
    if (activeTab) {
      handleTabClick(activeTab);
    }
  }, [activeTab]);

  const handleTryItClick = () => {
    setShowTryItBox(!showTryItBox);
    setpostputshowdata("");
    setData([]);
  };

  const handleAddRow = () => {
    setRows([...rows, { key: "", value: "" }]);
  };
  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };
  const handleInputChangepostput = (index, key, value) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [key]: value };
    setRows(newRows);
  };
  // FIle section
  const handleAddRowfile = () => {
    setRowsfile([...rowsfile, { key: "", value: "" }]);
  };
  const handleDeleteRowfile = (index) => {
    const newRows = [...rowsfile];
    newRows.splice(index, 1);
    setRowsfile(newRows);
  };
  const handleInputChangepostputfile = (index, key, value) => {
    const newRows = [...rowsfile];
    newRows[index] = { ...newRows[index], [key]: value };
    setRowsfile(newRows);
  };
  const handleAddCompany = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (activeTab.method === "GET") {
        if (activeTab.name === "semantic Search Api For Hscode") {
          axios
            .get(`${vectorEmbeddingUrl}${getapiserach}`)
            .then((response) => {
              console.log(`the ${vectorEmbeddingUrl}${getapiserach}`);
              const responseData = response.data;
              setData(responseData || []);
              setIsLoading(false);
              seterror("");
            })
            .catch((error) => {
              seterror(error?.response?.data?.error || "");
              console.log(`the ${vectorEmbeddingUrl}${getapiserach}`);
              setData([]);
              setIsLoading(false);
            });
        } else {
          newRequest
            .get(getapiserach)
            .then((response) => {
              const responseData = response.data;
              setData(responseData || []);
              setIsLoading(false);
              seterror("");
            })
            .catch((error) => {
              seterror(error?.response?.data?.error || "");
              console.log(error?.response?.data?.error);
              console.log(error);
              setData([]);
              setIsLoading(false);
            });
        }
      } else if (activeTab.method === "Delete") {
        newRequest
          .delete(`${activeTab.endpoint}${deletidvalue}`)
          .then((response) => {
            const responseData = response?.data?.message;
            setdeletdaatashow(responseData);
            setIsLoading(false);
            toast.success(
              response?.data?.message ||
                `${t("has been")} ${t("deleted Successfully")}.`,
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
          })
          .catch((error) => {
            setIsLoading(false);
            setdeletdaatashow(error?.response?.data?.error);
            toast.error(
              error?.response?.data?.error || `${t("Something went wrong")}`,
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
          });
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const handleAddCompanypost = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const allRows = [...rows, ...rowsfile];
      const formData = new FormData();
      const requestData = {};
      rows.forEach((row, index) => {
        requestData[row.key] = row.value;
      });
      if (activeTab.method === "Post") {
        if (rowsfile.length === 0) {
          newRequest
            .post(`${activeTab.endpoint}`, requestData)
            .then((response) => {
              setpostputshowdata(response.data);
              setIsLoading(false);
              toast.success(
                response?.data?.message || `${t("Add")} ${t("Successfully")}.`,
                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                }
              );
            })
            .catch((error) => {
              setpostputshowdata(error?.response);
              setIsLoading(false);
              toast.error(
                error?.response?.data?.error || `${t("Something went wrong")}`,
                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                }
              );
            });
        } else {
          allRows.forEach((row, index) => {
            formData.append(row.key, row.value);
          });
          const response = newRequest
            .post(`${activeTab.endpoint}`, formData)
            .then((response) => {
              setpostputshowdata(response.data);
              setIsLoading(false);
              toast.success(
                response?.data?.message || `${t("Add")} ${t("Successfully")}.`,
                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                }
              );
            })
            .catch((error) => {
              setIsLoading(false);
              setpostputshowdata(error?.response?.data.error);
              toast.error(
                error?.response?.data?.error || `${t("Something went wrong")}`,
                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                }
              );
            });
        }
      } else {
        if (rowsfile.length === 0) {
          const response = newRequest
            .put(`${activeTab.endpoint}${deletidvalue},requestData`)
            .then((response) => {
              console.log(response.data);
              setpostputshowdata(response.data);

              setIsLoading(false);
              toast.success(
                response?.data?.message || `${t("Add")} ${t("Successfully")}.`,
                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                }
              );
            })
            .catch((error) => {
              setIsLoading(false);
              setpostputshowdata(error?.response?.data?.error);
              toast.error(
                error?.response?.data?.error || `${t("Something went wrong")}`,
                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                }
              );
            });
        } else {
          allRows.forEach((row, index) => {
            formData.append(row.key, row.value);
          });
          const response = newRequest
            .put(`${activeTab.endpoint}${deletidvalue}`, formData)
            .then((response) => {
              setIsLoading(false);
              setpostputshowdata(response.data);
              toast.success(
                response?.data?.message || `${t("Add")} ${t("Successfully")}.`,
                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                }
              );
            })
            .catch((error) => {
              setIsLoading(false);
              setpostputshowdata(error?.response?.data?.error);
              toast.error(
                error?.response?.data?.error || `${t("Something went wrong")}`,
                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                }
              );
            });
          // setData(response || []);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 shadow-md">
        <DashboardRightHeader
          title={"Dashboard"}
          gcp={"628100000113"}
          member={"10105"}
          subscriptionExpiry={"365d 19h 49m 31s"}
        />

        {/* Main Container */}
        <div
          className={`relative flex gap-3 ${
            i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <div className="sm:hidden z-50">
            <RiMenu3Line
              className="text-gray-600 cursor-pointer absolute top-4 right-4"
              size={24}
              onClick={toggleSidebar}
            />
          </div>
          {/* Sidebar */}
          <div
            className={`h-full  flex flex-col gap-1 sm:block ${
              showSidebar ? "block" : "hidden"
            } ${i18n.language === "ar" ? "w-90" : "w-80"}`}
          >
            <div className={`flex items-center gap-1 pt-4 `}>
              {/* Search Input */}
              <div className="font-body gap-0 border rounded shadow focus-within:ring focus-within:ring-blue-300">
                <input
                  type="text"
                  id="fields1"
                  //   className="border-1 w-40 bg-gray-100 rounded-sm border-[#8E9CAB] p-2"
                  className="px-4 py-2 pr-10 rounded focus:outline-none w-full"
                  placeholder={t("Search Operations")}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              {/* Toggle Button */}
              <label className="flex items-center cursor-pointer gap-3">
                <span className="text-xs font-medium whitespace-nowrap text-gray-900 dark:text-gray-300">
                  {t("Group By Tag")}
                </span>
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isChecked}
                  onChange={handleToggle}
                />
                <div
                  className={`relative w-10 h-6 rounded-full ${
                    isChecked ? "bg-green-600" : "bg-gray-400"
                  } dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600`}
                ></div>
              </label>
            </div>

            {/* Sidebar Items */}
            <div className="flex flex-col gap-2 ml-4 mb-6 mt-5">
              {/* <div
                className="flex items-center gap-3"
                onClick={() => handleTabClick("product-Infomation")}
              >
                <h2
                  className=" w-10 font-body font-semibold"
                  style={{ color: getTextColor("GET") }}
                >
                  GET
                </h2>
                <p className="font-body font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis">
                  Check Links
                </p>
              </div> */}
              {filteredApiList.map((api, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 cursor-pointer ${
                    api === activeTab ? "text-red-500" : "text-black"
                  }`}
                  onClick={() => handleTabClick(api)}
                >
                  <h2
                    className=" w-10 font-body font-semibold me-3"
                    style={{ color: getTextColor(api.method) }}
                  >
                    {api.method}
                  </h2>
                  <p className="font-body font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {api.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="p-2 sm:p-2 lg:p-4 w-full">
            {activeTab && (
              <div>
                <h2
                  className={`sm:text-2xl text-lg font-body text-secondary ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                >
                  {activeTab.name}
                </h2>
                <p
                  className={`text-sm font-body text-secondary mt-4 ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                >
                  This is the high performance API that should only be used for
                  production data coming from your internal system and
                  Activite-Grade tools
                </p>

                <div className="space-y-3">
                  <div
                    className={`flex justify-between ${
                      i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <h2 className="sm:text-2xl text-lg font-body text-secondary mt-8">
                      {t("Check Links")}
                    </h2>
                    <button
                      // onClick={() => navigate('/member/member-add-foreign')}
                      onClick={handleTryItClick}
                      className="rounded-full bg-primary font-body px-5 py-3 mt-7 me-3 text-sm mb-1 text-white transition duration-200 hover:bg-secondary"
                    >
                      {t("Try it")}
                    </button>
                  </div>

                  <p
                    className={`text-sm font-body text-secondary  ${
                      i18n.language === "ar" ? "text-end" : "text-start"
                    }`}
                  >
                    Data OUT – Get all Links for a particular GS1 Key (GTIN,
                    GLN, GIAI etc.) if they are associated to GS1 Keys derived
                    from licences assigned to your MO. This endpoint is for
                    MO-INTERNAL USE ONLY. It shall enable MOs to check the Links
                    they have registered in the GRP.
                  </p>

                  <div
                    className={`space-x-2 flex ${
                      i18n.language === "ar" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <button className="bg-gray-200 px-2 py-1 border border-black">
                      {t("data-out")}
                    </button>
                    <button className="bg-gray-200 px-2 py-1 border border-black">
                      {t("Links")}
                    </button>
                  </div>
                </div>

                <div
                  className={`space-y-3 ${
                    i18n.language === "ar" ? "text-end" : "text-start"
                  }`}
                >
                  <h2 className="sm:text-2xl text-lg font-body text-secondary mt-8">
                    {t("Request")}
                  </h2>
                  <p className="text-sm font-body text-secondary overflow-x-auto">
                    <span
                      className="text-green-500 font-semibold me-2"
                      style={{ color: getTextColor(activeTab.method) }}
                    >
                      {activeTab.method}
                    </span>
                    {/* {activeTab.endpoint} */}
                    {activeTab.name === "semantic Search Api For Hscode"
                      ? vectorEmbeddingUrl
                      : baseUrl}
                    {activeTab.endpoint}
                  </p>
                  <h2 className="sm:text-2xl text-lg font-body text-secondary mt-8">
                    {t("Status")}
                  </h2>
                  <p className="text-sm font-body text-secondary">
                    {statusapi && (
                      <div>
                        <p>
                          {statusapi.status} {statusapi.statusText}{" "}
                        </p>
                      </div>
                    )}
                  </p>
                  <h2 className="sm:text-2xl text-lg font-body text-secondary mt-8">
                    {t("Request Parameter")}
                  </h2>
                </div>
              </div>
            )}

            {/* Table Content */}
            <div class="flex flex-col">
              <div class="overflow-x-auto overflow-y-auto sm:mx-6 lg:-mx-4">
                <div class="min-w-full py-2 sm:px-6 lg:px-8">
                  <div class="mb-6">
                    <table class="min-w-full text-center text-sm font-light">
                      <thead className="border-b-2 text-black font-body font-semibold dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            {t("Name")}
                          </th>
                          <th scope="col" className="px-6 py-4">
                            In
                          </th>
                          <th scope="col" className="px-6 py-4">
                            {t("Required")}
                          </th>
                          <th scope="col" className="px-6 py-4">
                            {t("Type")}
                          </th>
                          <th scope="col" className="px-6 py-4">
                            {t("Description")}
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {activeTab.paramenterdata &&
                        activeTab.paramenterdata.length > 0 ? (
                          activeTab.paramenterdata.map((item, index) => (
                            <tr
                              className="border-b font-body dark:border-neutral-500"
                              key={index}
                            >
                              <td className="px-6 py-4">{item?.name}</td>
                              <td className="px-6 py-4">{t("template")}</td>
                              <td className="px-6 py-4">
                                {t("Required")}
                              </td>{" "}
                              {/* Add the required value if available */}
                              <td className="px-6 py-4">{item.type || ""}</td>
                              <td className="px-6 py-4">
                                {item.description || ""}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="px-6 py-4" colSpan="5">
                              {t("No Parameter available")}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {showTryItBox && (
              <>
                <div
                  className={`fixed top-10  h-full bg-gray-50 w-full lg:w-1/2 border-l border-gray-300 z-50 ${
                    i18n.language === "ar" ? "left-0" : "right-0"
                  }`}
                >
                  <div
                    className={`w-full ${
                      i18n.language === "ar" ? "text-end" : "text-start"
                    }`}
                  >
                    <button
                      onClick={handleTryItClick}
                      className={`rounded-full bg-primary font-body px-5 text-sm mb-3 text-white transition duration-200 hover:bg-secondary ${
                        i18n.language === "ar" ? "text-end" : "text-start"
                      }`}
                    >
                      {t("Back")}
                    </button>
                  </div>
                  <div className="p-6 h-full overflow-y-auto">
                    <p className="text-sm font-body text-secondary">
                      <span className="text-green-500 font-semibold me-2">
                        {activeTab.method}
                      </span>
                      {/* {baseUrl}
                      {activeTab.endpoint} */}
                      {activeTab.name === "semantic Search Api For Hscode"
                        ? vectorEmbeddingUrl
                        : baseUrl}
                      {activeTab.endpoint}
                    </p>

                    {["GET", "Delete"].includes(activeTab.method) && (
                      <form
                        className="w-full mx-auto "
                        onSubmit={handleAddCompany}
                      >
                        {activeTab.method === "GET" ? (
                          <div className="flex flex-row w-full mt-10">
                            <p className="text-green-500 font-bold me-2 border py-2 px-3 my-auto rounded">
                              {activeTab.method}
                            </p>
                            <input
                              type="text"
                              // id={param}
                              className={`border w-full bg-gray-100 rounded-sm border-[#8E9CAB] px-3 gap-2 py-1`}
                              value={getapiserach}
                              onChange={(e) => {
                                setgetapiserach(e.target.value);
                              }}
                            />
                          </div>
                        ) : null}
                        <h2
                          className={`sm:text-2xl text-lg font-body text-secondary mt-8 ${
                            i18n.language === "ar" ? "text-end" : "text-start"
                          }`}
                        >
                          {t("Parameters")}
                        </h2>
                        {Array.isArray(activeTab.parameters) &&
                          activeTab.parameters.map((param, index) => (
                            <div
                              className={`flex my-auto flex-row sm:gap-3 gap-3 ${
                                i18n.language === "ar"
                                  ? "justify-end"
                                  : "justify-start"
                              }`}
                              key={index}
                            >
                              <p
                                className="font-body font-semibold  mt-5"
                                style={{ minWidth: "180px" }}
                              >
                                {param}
                              </p>
                              {activeTab.method === "Delete" && index === 0 ? (
                                <input
                                  type="text"
                                  id={`key-${index}`}
                                  className={`border-1 w-40 mx-5 bg-gray-100 rounded-sm border-[#8E9CAB] px-3 gap-2 py-1 mt-5 ${
                                    i18n.language === "ar"
                                      ? "text-end"
                                      : "text-start"
                                  }`}
                                  required
                                  value={deletidvalue}
                                  onChange={(e) => {
                                    setdeletidvalue(e.target.value);
                                    console.log(e.target.value);
                                  }}
                                  placeholder={`${t("Enter")} ${t("ID")}`}
                                />
                              ) : null}
                            </div>
                          ))}

                        <center>
                          <button
                            type="submit"
                            className="bg-secondary px-8 py-2 text-white font-semibold text-sm rounded-sm p-2 mt-10 hover:bg-primary transition duration-200 "
                          >
                            {isLoading ? "Loading..." : `${t("Send")}`}
                          </button>
                        </center>
                      </form>
                    )}
                    {["Post", "Put"].includes(activeTab.method) && (
                      <form
                        className="w-full mx-auto "
                        onSubmit={handleAddCompanypost}
                      >
                        {Array.isArray(activeTab.parameters) &&
                          activeTab.parameters.map((param, index) => (
                            <div>
                              <h2 className="sm:text-2xl text-lg font-body text-secondary mt-8">
                                {t("Parameters")}
                              </h2>
                              <div
                                className="flex my-auto flex-row sm:gap-3 gap-3"
                                style={{ width: "87%" }}
                              >
                                {activeTab.method === "Put" && (
                                  <>
                                    <p
                                      className="font-body font-semibold mt-5 gap-1"
                                      style={{ minWidth: "150px" }}
                                    >
                                      {param} :
                                    </p>
                                    <input
                                      type="text"
                                      id={`key-${index}`}
                                      className={`border-1 bg-gray-100  rounded-sm border-[#8E9CAB] px-3 gap-2 py-1 mt-5 mb-10 ${
                                        i18n.language === "ar"
                                          ? "text-end"
                                          : "text-start"
                                      }`}
                                      required
                                      value={deletidvalue}
                                      onChange={(e) => {
                                        setdeletidvalue(e.target.value);
                                      }}
                                      placeholder={`${t("Enter")} ${t("ID")}`}
                                    />
                                  </>
                                )}
                              </div>

                              {rows.map((row, index) => (
                                <div
                                  key={index}
                                  className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:mt-0 mt-4"
                                >
                                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                                    <label
                                      htmlFor={`key-${index}`}
                                      className={`text-secondary font-semibold  ${
                                        i18n.language === "ar"
                                          ? "text-end"
                                          : "text-start"
                                      }`}
                                    >
                                      {t("Key")}
                                    </label>
                                    <input
                                      type="text"
                                      id={`key-${index}`}
                                      required
                                      placeholder={`${t("Enter")} ${t("Key")}`}
                                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-1 mb-3 ${
                                        i18n.language === "ar"
                                          ? "text-end"
                                          : "text-start"
                                      }`}
                                      value={row.key}
                                      onChange={(e) =>
                                        handleInputChangepostput(
                                          index,
                                          "key",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>

                                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                                    <label
                                      htmlFor={`value-${index}`}
                                      className={`text-secondary font-semibold  ${
                                        i18n.language === "ar"
                                          ? "text-end"
                                          : "text-start"
                                      }`}
                                    >
                                      {t("Value")}
                                    </label>
                                    <input
                                      type="text"
                                      id={`value-${index}`}
                                      required
                                      placeholder={`${t("Enter")} ${t(
                                        "value"
                                      )}`}
                                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                                        i18n.language === "ar"
                                          ? "text-end"
                                          : "text-start"
                                      }`}
                                      value={row.value}
                                      onChange={(e) =>
                                        handleInputChangepostput(
                                          index,
                                          "value",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <button
                                    onClick={() => handleDeleteRow(index)}
                                    className="rounded-full bg-primary font-body my-auto py-2 px-5 text-sm  text-white transition duration-200 hover:bg-secondary"
                                  >
                                    {t("Delete")}
                                  </button>
                                </div>
                              ))}

                              <button
                                onClick={handleAddRow}
                                className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary mx-3 mt-4"
                              >
                                {" "}
                                <i className="fas fa-plus mr-2"></i> {t("Add")}
                              </button>

                              {rowsfile.map((row, index) => (
                                <div
                                  key={index}
                                  className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:mt-0 mt-4"
                                >
                                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                                    <label
                                      htmlFor={`key-${index}`}
                                      className={`text-secondary font-semibold  ${
                                        i18n.language === "ar"
                                          ? "text-end"
                                          : "text-start"
                                      }`}
                                    >
                                      {t("Key")}
                                    </label>
                                    <input
                                      type="text"
                                      id={`key-${index}`}
                                      required
                                      placeholder={`${t("Enter")} ${t("Key")}`}
                                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-1 mb-3 ${
                                        i18n.language === "ar"
                                          ? "text-end"
                                          : "text-start"
                                      }`}
                                      value={row.key}
                                      onChange={(e) =>
                                        handleInputChangepostputfile(
                                          index,
                                          "key",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>

                                  <div className="w-full font-body sm:text-base text-sm flex flex-col gap-1">
                                    <label
                                      htmlFor={`value-${index}`}
                                      className={`text-secondary font-semibold  ${
                                        i18n.language === "ar"
                                          ? "text-end"
                                          : "text-start"
                                      }`}
                                    >
                                      {t("Value")}
                                    </label>
                                    <input
                                      type="file"
                                      id={`value-${index}`}
                                      required
                                      placeholder={`${t("Enter")} ${t(
                                        "value"
                                      )}`}
                                      className={`border-1 w-full rounded-sm border-[#8E9CAB] p-2 mb-3 ${
                                        i18n.language === "ar"
                                          ? "text-end"
                                          : "text-start"
                                      }`}
                                      // value={row.value}
                                      onChange={(e) =>
                                        handleInputChangepostputfile(
                                          index,
                                          "value",
                                          e.target.files[0]
                                        )
                                      }
                                    />
                                  </div>
                                  <button
                                    onClick={() => handleDeleteRowfile(index)}
                                    className="rounded-full bg-primary font-body my-auto py-2 px-5 text-sm  text-white transition duration-200 hover:bg-secondary"
                                  >
                                    {t("Delete")}
                                  </button>
                                </div>
                              ))}

                              <button
                                onClick={handleAddRowfile}
                                className="rounded-full bg-secondary font-body px-5 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-primary"
                              >
                                <i className="fas fa-plus mr-2"></i> {t("File")}
                              </button>
                            </div>
                          ))}
                        <center>
                          <button
                            type="submit"
                            className="bg-secondary px-8 py-2 text-white font-semibold text-sm rounded-sm p-2 mt-10 hover:bg-primary transition duration-200 "
                          >
                            {/* {t("Sand")} */}
                            {isLoading ? "Loading..." : "Sand"}
                          </button>
                        </center>
                      </form>
                    )}

                    {activeTab.method === "GET" && (
                      <div>
                        {error ? (
                          <div className="mt-4 border p-4 my-10">{error}</div>
                        ) : (
                          <div>
                            {activeTab.name ===
                            "semantic Search Api For Hscode" ? (
                              <div className="mt-4 border p-4 my-10">
                                {data.map((item, index) => (
                                  <pre
                                    style={{ whiteSpace: "pre-wrap" }}
                                    key={index}
                                  >
                                    {JSON.stringify(item, null, 2)}
                                  </pre>
                                ))}
                              </div>
                            ) : (
                              <div className="mt-4 border p-4 my-10 w-100">
                                {activeTab.name ===
                                  "Search GPC for Codification" ||
                                activeTab.name === "Search Licenses" ||
                                activeTab.name ===
                                  "Get GTIN Product Details" ? (
                                  <pre style={{ whiteSpace: "pre-wrap" }}>
                                    {JSON.stringify(data, null, 2)}
                                  </pre>
                                ) : (
                                  Object.entries(data).map(([key, value]) => (
                                    <div key={key}>
                                      <strong>{key}: </strong>{" "}
                                      {typeof value === "object"
                                        ? JSON.stringify(value)
                                        : value}
                                    </div>
                                  ))
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab.method === "Delete" && (
                      <div className="mt-4 border p-4 my-10">
                        {/* Render delete data here */}
                        {deletdaatashow}
                      </div>
                    )}

                    {(activeTab.method === "Post" ||
                      activeTab.method === "Put") && (
                      <div className="mt-4 border p-4 my-10">
                        {Object.entries(postputshowdata).map(([key, value]) => (
                          <div key={key}>
                            <strong>{key}: </strong>{" "}
                            {typeof value === "object"
                              ? JSON.stringify(value)
                              : value}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiHelpDesk;
