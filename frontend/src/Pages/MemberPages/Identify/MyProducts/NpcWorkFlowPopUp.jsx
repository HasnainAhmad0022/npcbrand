import React, { useEffect, useState } from "react";
import brandimage from "../../../../Images/brandimage.png";
import check from "../../../../Images/check.png";
import packaging from "../../../../Images/digitalLinks/packaging.png";
import qulaitymark from "../../../../Images/digitalLinks/qulaitymark.png";
import efficiency from "../../../../Images/digitalLinks/efficiency.png";
import safetyinformation from "../../../../Images/digitalLinks/safetyinformation.png";
import certificate from "../../../../Images/digitalLinks/certificate .png";
import cocconformity from "../../../../Images/digitalLinks/cocconformity.png";
import productcontents from "../../../../Images/digitalLinks/productcontents.png";
import storage from "../../../../Images/digitalLinks/storage.png";
import cert from "../../../../Images/digitalLinks/cert.png";
import haccp from "../../../../Images/digitalLinks/haccp.png";
import halal from "../../../../Images/digitalLinks/halal.png";
import { RxCrossCircled } from "react-icons/rx";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";

import newRequest, { newRequestnpc } from "../../../../utils/userRequest";

const NpcWorkFlowPopUp = ({ isVisible, setVisibility, data }) => {
  const [dqmsData, setDqmsDData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      if (data && data.barcode) {
        try {
          const response = await newRequestnpc.get(
            `/digitalLinks/getComplianceAndDqmsStatus?barcode=${data?.barcode}`
          );
          console.log(response.data);
          setDqmsDData(response.data);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchData();
  }, [data]);
  const handleClosePopUp = () => {
    setVisibility(false);
  };
  return (
    <div>
      {isVisible && (
        <div className="popup-overlay z-50">
          <div className="popup-container h-auto sm:w-[90%] w-full">
            <div
              className="w-full"
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <div className="flex justify-end w-full">
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={handleClosePopUp}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col items-center space-y-4 p-4 bg-gray-100">
                {/* Workflow Header */}
                <div className="flex items-center w-[80%] space-x-4">
                  <div className="bg-blue-600 text-white px-5 py-1 w-auto rounded-full">
                    GTIN
                  </div>
                  <div className="border-t-2 border-blue-600 w-[80%]"></div>
                  <div
                    className={`${
                      !dqmsData?.dqms.is_dqms_compliant
                        ? "bg-gray-500"
                        : "bg-blue-600"
                    } w-auto text-white px-5 py-1 rounded-full`}
                  >
                    DQMS
                  </div>

                  <div className="border-t-2  border-blue-600 w-[80%]"></div>
                  <div
                    className={`${
                      !dqmsData?.compliance.is_compliance
                        ? "bg-gray-500"
                        : "bg-blue-600"
                    } w-auto text-white px-5 py-1 rounded-full`}
                  >
                    COMPLIANCE
                  </div>
                </div>

                {/* Cards Container */}
                <div className="grid md:grid-cols-3 grid-cols-1 w-full gap-4">
                  {/* First Card */}
                  <div className="bg-white relative shadow-lg rounded-lg p-0 w-full border border-[#2C5DDA]">
                    <div className="flex items-center justify-between px-3 py-2">
                      <div>
                        {!data.barcode ||
                        !data.Origin ||
                        !data.countrySale ||
                        !data.unit ||
                        !data.gpc ||
                        !data.front_image ||
                        !data.BrandName ? (
                          <h3 className="text-lg font-bold text-[#ff3535]">
                            In-Complete Data
                          </h3>
                        ) : (
                          <h3 className="text-lg font-bold text-[#06C937]">
                            Complete Data
                          </h3>
                        )}
                      </div>
                      <div className="w-14 h-14 absolute top-6 right-8 flex items-center justify-center bg-white border-4 border-blue-700 rounded-full">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full">
                          {!data.barcode ||
                          !data.Origin ||
                          !data.countrySale ||
                          !data.unit ||
                          !data.gpc ||
                          !data.front_image ||
                          !data.BrandName ? (
                            <div className="flex items-center">
                              <RxCrossCircled className="w-10 h-10 text-red-600" />
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <img
                                src={check}
                                alt="Check Icon"
                                className="w-9 h-9"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 bg-[#DEE6F1] p-4">
                      <h4 className="text-lg font-sans font-semibold text-[#2C5DDA]">
                        Product ID
                      </h4>
                      <div className="flex items-center mt-2">
                        <div className="w-24 h-32 flex-shrink-0">
                          <img
                            src={imageLiveUrl(data?.front_image)}
                            alt="Product"
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="ml-6 flex-grow">
                          <p className="font-medium font-sans text-white bg-blue-900 px-2 rounded-t-md">
                            GTIN: {data.barcode}
                          </p>
                          <ul className="text-sm mt-2 space-y-2 rounded-lg">
                            <li className="flex justify-between items-center bg-white px-2">
                              <span>Brand name</span>
                              {data.BrandName ? (
                                <img
                                  src={check}
                                  alt="Check Icon"
                                  className="w-5 h-5"
                                />
                              ) : (
                                <RxCrossCircled className="w-5 h-5 text-red-600" />
                              )}
                            </li>
                            <li className="flex justify-between items-center bg-white px-2">
                              <span>Product description</span>
                              {data.HsDescription ? (
                                <img
                                  src={check}
                                  alt="Check Icon"
                                  className="w-5 h-5"
                                />
                              ) : (
                                <RxCrossCircled className="w-5 h-5 text-red-600" />
                              )}
                            </li>
                            <li className="flex justify-between items-center bg-white px-2">
                              <span>Product image URL</span>
                              {data.front_image ? (
                                <img
                                  src={check}
                                  alt="Check Icon"
                                  className="w-5 h-5"
                                />
                              ) : (
                                <RxCrossCircled className="w-5 h-5 text-red-600" />
                              )}
                            </li>
                            <li className="flex justify-between items-center bg-white px-2">
                              <span>Global product category</span>
                              {data.gpc ? (
                                <img
                                  src={check}
                                  alt="Check Icon"
                                  className="w-5 h-5"
                                />
                              ) : (
                                <RxCrossCircled className="w-5 h-5 text-red-600" />
                              )}
                            </li>
                            <li className="flex justify-between items-center bg-white px-2">
                              <span>Net content & unit </span>
                              {data.unit ? (
                                <img
                                  src={check}
                                  alt="Check Icon"
                                  className="w-5 h-5"
                                />
                              ) : (
                                <RxCrossCircled className="w-5 h-5 text-red-600" />
                              )}
                            </li>
                            <li className="flex justify-between items-center bg-white px-2">
                              <span>Country of sale</span>
                              {data.countrySale ? (
                                <img
                                  src={check}
                                  alt="Check Icon"
                                  className="w-5 h-5"
                                />
                              ) : (
                                <RxCrossCircled className="w-5 h-5 text-red-600" />
                              )}
                            </li>
                            <li className="flex justify-between items-center bg-white px-2">
                              <span>Country of origin</span>
                              {data.Origin ? (
                                <img
                                  src={check}
                                  alt="Check Icon"
                                  className="w-5 h-5"
                                />
                              ) : (
                                <RxCrossCircled className="w-5 h-5 text-red-600" />
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between px-6 py-3">
                      <span className="text-lg font-sans font-bold text-blue-800">
                        Status:
                      </span>
                      <span className="text-xl font-sans font-bold text-[#06C937]">
                        {!data.barcode ||
                        !data.Origin ||
                        !data.countrySale ||
                        !data.unit ||
                        !data.gpc ||
                        !data.front_image ||
                        !data.BrandName ? (
                          <div className="flex items-center">
                            <p className="text-red-600">VBG Non Compliant</p>
                            <RxCrossCircled className="w-5 h-5 text-red-600" />
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <p>VBG Compliant</p>
                            <img
                              src={check}
                              alt="Check Icon"
                              className="w-9 h-9"
                            />
                          </div>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Second Card */}
                  {/* <div> */}
                  <div className="bg-[#E9EBEE] shadow-lg rounded-lg p-3 w-full border border-blue-300">
                    <div className="grid grid-cols-3 sm:gap-7 gap-4">
                      {/* Row 1 */}
                      {dqmsData?.dqms?.packaging && (
                        <div className="flex flex-col justify-center items-center gap-2 transition-all hover:scale-90 cursor-pointer h-24 w-full bg-white rounded-lg shadow-xl">
                          <img
                            src={packaging}
                            alt="Compliance 1"
                            className="h-8 w-full object-contain"
                          />
                          <p className="text-secondary text-sm text-center font-sans">
                            Packaging
                          </p>
                        </div>
                      )}
                      {dqmsData?.dqms.qmark && (
                        <div className="flex flex-col justify-center items-center gap-2 transition-all hover:scale-90 cursor-pointer h-24 w-full bg-white rounded-lg shadow-xl">
                          <img
                            src={qulaitymark}
                            alt="Compliance 2"
                            className="h-8 w-full object-contain"
                          />
                          <p className="text-secondary text-sm text-center">
                            Quality Mark
                          </p>
                        </div>
                      )}
                      {dqmsData?.dqms.efficiency && (
                        <div className="flex flex-col justify-center items-center gap-2 transition-all hover:scale-90 cursor-pointer h-24 w-full bg-white rounded-lg shadow-xl">
                          <img
                            src={efficiency}
                            alt="Compliance 3"
                            className="h-8 w-full object-contain"
                          />
                          <p className="text-secondary text-sm text-center">
                            Efficiency
                          </p>
                        </div>
                      )}
                      {/* Row 2 */}
                      {dqmsData?.dqms.iecce && (
                        <div className="flex flex-col justify-center items-center gap-2 transition-all hover:scale-90 cursor-pointer h-24 w-full bg-white rounded-lg shadow-xl">
                          <img
                            src={safetyinformation}
                            alt="Compliance 4"
                            className="h-8 w-full object-contain"
                          />
                          <p className="text-secondary text-sm text-center">
                            Safety Information
                          </p>
                        </div>
                      )}
                      {dqmsData?.dqms.iecce && (
                        <div className="flex flex-col justify-center items-center gap-2 transition-all hover:scale-90 cursor-pointer h-24 w-full bg-white rounded-lg shadow-xl">
                          <img
                            src={certificate}
                            alt="Compliance 5"
                            className="h-8 w-full object-contain"
                          />
                          <p className="text-secondary text-sm text-center">
                            IECEE Certificate
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between px-3 py-3">
                      {!dqmsData?.dqms.is_dqms_compliant ? (
                        <>
                          <span className="text-xl font-sans font-bold text-red-600">
                            {dqmsData?.dqms.dqmsStatus}
                          </span>

                          <div className="w-9 h-9 flex items-center justify-center bg-red-600 rounded-full">
                            <svg
                              className="w-6 h-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="text-xl font-sans font-bold text-green-600">
                            {dqmsData?.dqms.dqmsStatus}
                          </span>
                          <img
                            src={check}
                            alt="Check Icon"
                            className="w-9 h-9"
                          />
                        </>
                      )}
                    </div>
                  </div>
                  {/* </div> */}

                  {/* Third Card */}
                  <div className="bg-[#E9EBEE] shadow-lg rounded-lg p-3 w-full border border-blue-300">
                    <div className="grid grid-cols-3 sm:gap-7 gap-4">
                      {/* Row 1 */}
                      {dqmsData?.compliance.packaging && (
                        <div className="flex flex-col justify-center items-center gap-2 transition-all hover:scale-90 cursor-pointer h-24 w-full bg-white rounded-lg shadow-xl">
                          <img
                            src={packaging}
                            alt="Compliance 1"
                            className="h-8 w-full object-contain"
                          />
                          <p className="text-secondary text-sm text-center font-sans">
                            Packaging
                          </p>
                        </div>
                      )}
                      {dqmsData?.compliance.foodProductSafety && (
                        <div className="flex flex-col justify-center items-center gap-2 transition-all hover:scale-90 cursor-pointer h-24 w-full bg-white rounded-lg shadow-xl">
                          <img
                            src={safetyinformation}
                            alt="Compliance 3"
                            className="h-8 w-full object-contain"
                          />
                          <p className="text-secondary text-sm text-center">
                            Safety Information
                          </p>
                        </div>
                      )}
                      {/* Row 2 */}

                      {dqmsData?.compliance.productContents && (
                        <div className="flex flex-col justify-center items-center gap-2 transition-all hover:scale-90 cursor-pointer h-24 w-full bg-white rounded-lg shadow-xl">
                          <img
                            src={productcontents}
                            alt="Compliance 4"
                            className="h-8 w-full object-contain"
                          />
                          <p className="text-secondary text-sm text-center">
                            Product Contents
                          </p>
                        </div>
                      )}
                      {dqmsData?.compliance.productStorage && (
                        <div className="flex flex-col justify-center items-center gap-2 transition-all hover:scale-90 cursor-pointer h-24 w-full bg-white rounded-lg shadow-xl">
                          <img
                            src={storage}
                            alt="Compliance 5"
                            className="h-8 w-full object-contain"
                          />
                          <p className="text-secondary text-sm text-center">
                            Storage
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 flex items-center justify-between px-3 py-3">
                      {/* <span className="text-lg font-sans font-bold text-blue-800">
                        NON
                      </span> */}
                      {!dqmsData?.compliance.is_compliance ? (
                        <>
                          <span className="text-xl font-sans font-bold text-red-600">
                            {dqmsData?.compliance.complianceStatus}
                          </span>
                          <div className="w-9 h-9 flex items-center justify-center bg-red-600 rounded-full">
                            <svg
                              className="w-6 h-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="text-xl font-sans font-bold text-green-600">
                            {dqmsData?.compliance.complianceStatus}
                          </span>
                          <img
                            src={check}
                            alt="Check Icon"
                            className="w-9 h-9"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NpcWorkFlowPopUp;