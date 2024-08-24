import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import image1 from "../../../../Images/productsdetails/image1.png";
import image2 from "../../../../Images/productsdetails/image2.png";
import image3 from "../../../../Images/productsdetails/image3.png";
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
import image4 from "../../../../Images/productsdetails/image4.png";
import effiencyImage from "../../../../Images/efficiency.png";
import "./ProductDetails.css";
import imageLiveUrl from "../../../../utils/urlConverter/imageLiveUrl";
import Barcode from "react-barcode";
import { QRCodeSVG } from "qrcode.react";
import newRequest, { newRequestnpc } from "../../../../utils/userRequest";

const ProductDetails = ({ isVisible, setVisibility, data }) => {
  console.log("data", data);
  const { t, i18n } = useTranslation();

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

  // List of images
  const images = [
    { src: imageLiveUrl(data.front_image) || image1, alt: "Shoe 1" },
    { src: imageLiveUrl(data.back_image) || image2, alt: "Shoe 2" },
    { src: imageLiveUrl(data.image_1) || image3, alt: "Shoe 3" },
    { src: imageLiveUrl(data.image_2) || image4, alt: "Shoe 4" },
    { src: imageLiveUrl(data.image_3) || image1, alt: "Shoe 4" },
  ];

  // State to store the index of the currently selected image
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Handler to change the main image
  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const closePopUp = () => {
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
                  onClick={closePopUp}
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
              {/* Top Header Section */}
              <div className="flex justify-center items-center mb-4 mt-4">
                <div
                  className={`h-24 w-[92%] z-10 bg-secondary text-white flex flex-col justify-center items-start shadow-xl rounded-md px-8 ${
                    i18n.language === "ar" ? "justify-end" : "justify-start"
                  } border border-secondary`}
                >
                  <p className="text-lg font-sans font-semibold">
                    Complete Data
                  </p>
                  <p className="font-sans text-base">
                    This number is registered to company: :{" "}
                    {data?.productnameenglish}
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <div
                  className={`h-auto w-[97%] bg-[#DDF3F6] rounded-md flex flex-col shadow-xl -mt-10 sm:px-10 px-4 py-8`}
                >
                  <form className="flex flex-col gap-4">
                    {/* Product Name */}
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <label className="flex flex-col w-full md:w-[48%] mb-4 md:mb-0 text-secondary">
                        <span className="ml-1 mb-2">
                          {" "}
                          Product Name [English]
                        </span>
                        <input
                          type="text"
                          placeholder="Enter Product Name[English]"
                          value={data?.productnameenglish}
                          disabled
                          className="p-2 pl-4 border rounded-full bg-white text-secondary placeholder:text-secondary"
                        />
                      </label>
                      <label className="flex flex-col w-full md:w-[48%] mb-4 md:mb-0">
                        <span className="ml-1 mb-2">
                          {" "}
                          Product Name [Arabic]{" "}
                        </span>
                        <input
                          type="text"
                          placeholder="Enter Product Name[Arabic]"
                          value={data?.productnamearabic}
                          disabled
                          className="p-2 pl-4 border rounded-full bg-white text-secondary placeholder:text-secondary"
                        />
                      </label>
                    </div>

                    {/* Brand Name and GPC */}
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <label className="flex flex-col w-full md:w-[48%] mb-4 md:mb-0">
                        <span className="ml-1 mb-2">
                          {" "}
                          Brand Name [English / Arabic]{" "}
                        </span>
                        <input
                          type="text"
                          placeholder="Enter Brand Name[English / Arabic]"
                          value={`${data?.BrandName} , ${data?.BrandNameAr}`}
                          disabled
                          className="p-2 pl-4 border rounded-full bg-white text-secondary placeholder:text-secondary"
                        />
                      </label>
                      <div className="flex flex-col w-full md:w-[48%]">
                        <div className="flex items-center gap-4">
                          <span className="text-gray-700 font-medium ml-1">
                            GPC (Global Product Classification)
                          </span>
                          <label className="flex items-center gap-1">
                            <input type="checkbox" className="form-checkbox " />
                            <span>Add GPC by myself</span>
                          </label>
                        </div>
                        <div className="flex items-center gap-2 w-full mt-2">
                          <input
                            type="text"
                            placeholder="Enter GPC"
                            value={data?.gpc}
                            disabled
                            className="p-2 pl-4 border rounded-full w-full bg-white text-secondary placeholder:text-secondary"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Unit Code and Size */}
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <label className="flex flex-col w-full md:w-[48%] mb-4 md:mb-0">
                        <span className="ml-1 mb-2"> Unit Code </span>
                        <input
                          type="text"
                          placeholder="Enter unit code"
                          value={data?.unit}
                          disabled
                          className="p-2 border rounded-full bg-white text-secondary placeholder:text-secondary"
                        />
                      </label>
                      <label className="flex flex-col w-full md:w-[48%] mb-4 md:mb-0">
                        <span className="ml-1 mb-2"> Size </span>
                        <input
                          type="text"
                          placeholder="Enter size"
                          value={data?.size}
                          disabled
                          className="p-2 border rounded-full bg-white text-secondary placeholder:text-secondary"
                        />
                      </label>
                    </div>

                    {/* Origin and Country of Sale */}
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <label className="flex flex-col w-full md:w-[48%] mb-4 md:mb-0">
                        <span className="ml-1 mb-2"> Origin </span>
                        <input
                          type="text"
                          placeholder="Enter origin"
                          value={data?.Origin}
                          disabled
                          className="p-2 border rounded-full bg-white text-secondary placeholder:text-secondary"
                        />
                      </label>
                      <label className="flex flex-col w-full md:w-[48%] mb-4 md:mb-0">
                        <span className="ml-1 mb-2"> Country of Sale </span>
                        <input
                          type="text"
                          placeholder="Enter country of sale"
                          value={data?.countrySale}
                          disabled
                          className="p-2 border rounded-full bg-white text-secondary placeholder:text-secondary"
                        />
                      </label>
                    </div>
                  </form>
                </div>
              </div>

              {/* Second Content */}
              <div className="flex justify-center items-center">
                <div className="h-auto w-[97%] bg-[#DDF3F6] rounded-md flex flex-col shadow-xl mt-6 mb-6 sm:px-10 px-4 py-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <form className="flex flex-col gap-6">
                        {/* Product Description Language and Product Type */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <label className="flex flex-col">
                            <span className="ml-1 mb-2">
                              Product Description Language
                            </span>
                            <input
                              type="text"
                              placeholder="Enter Product Description Language"
                              value={data?.HsDescription}
                              disabled
                              className="p-2 border rounded-full bg-white text-secondary placeholder:text-secondary"
                            />
                          </label>
                          <label className="flex flex-col">
                            <span className="ml-1 mb-2">Product Type</span>
                            <input
                              type="text"
                              placeholder="Enter Product Type"
                              value={data?.ProductType}
                              disabled
                              className="p-2 border rounded-full bg-white text-secondary placeholder:text-secondary"
                            />
                          </label>
                        </div>

                        {/* Package Type and Product URL */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <label className="flex flex-col">
                            <span className="ml-1 mb-2">Package Type</span>
                            <input
                              type="text"
                              placeholder="Enter Package Type"
                              value={data?.PackagingType}
                              disabled
                              className="p-2 border rounded-full bg-white text-secondary placeholder:text-secondary"
                            />
                          </label>
                          <label className="flex flex-col">
                            <span className="ml-1 mb-2">Product URL</span>
                            <input
                              type="url"
                              placeholder="Enter URL"
                              value={data?.product_url}
                              disabled
                              className="p-2 border rounded-full bg-white text-secondary placeholder:text-secondary"
                            />
                          </label>
                        </div>

                        {/* HS-Code */}
                        <div className="flex flex-col">
                          <label className="flex flex-col">
                            <span className="ml-1 mb-2">HS-Code</span>
                            <input
                              type="text"
                              placeholder="Enter HS-Code"
                              value={data?.HSCODES}
                              disabled
                              className="p-2 border rounded-full bg-white text-secondary placeholder:text-secondary"
                            />
                          </label>
                          <label className="flex items-center gap-1 mt-2">
                            <input type="checkbox" className="form-checkbox" />
                            <span>Add HS-Code by myself</span>
                          </label>
                        </div>

                        {/* Description */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <label className="flex flex-col">
                            <span className="ml-1 mb-2">
                              Description [English]
                            </span>
                            <input
                              placeholder="Automatic"
                              value={data?.details_page}
                              disabled
                              className="p-2 pl-4 border rounded-full bg-white text-secondary placeholder:text-secondary"
                            />
                          </label>
                          <label className="flex flex-col">
                            <span className="ml-1 mb-2">
                              Description [Arabic]
                            </span>
                            <input
                              placeholder="Automatic"
                              value={data?.details_page_ar}
                              disabled
                              className="p-2 pl-4 border rounded-full bg-white text-secondary placeholder:text-secondary"
                            />
                          </label>
                        </div>
                      </form>
                    </div>

                    <div className="grid grid-cols-[1fr_2fr] gap-5">
                      <div className="grid grid-cols-1 gap-4">
                        {dqmsData?.compliance.packaging && (
                          <div className="bg-white shadow-lg w-40 h-12 flex justify-center items-center rounded-lg overflow-hidden">
                            <img
                              src={packaging}
                              alt={`Image1`}
                              className="object-contain h-full"
                            />
                          </div>
                        )}
                        {dqmsData?.dqms.qmark && (
                          <div className="bg-white shadow-lg w-40 h-12 flex justify-center items-center rounded-lg overflow-hidden">
                            <img
                              src={qulaitymark}
                              alt={`Image 2`}
                              className="object-contain h-full"
                            />
                          </div>
                        )}

                        {dqmsData?.dqms.iecce && (
                          <div className="bg-white shadow-lg w-40 h-12 flex justify-center items-center rounded-lg overflow-hidden">
                            <img
                              src={halal}
                              alt={`Image 3`}
                              className="object-contain h-full"
                            />
                          </div>
                        )}
                        {dqmsData?.dqms.efficiency && (
                          <div className="bg-white shadow-lg w-40 h-12 flex justify-center items-center rounded-lg overflow-hidden">
                            <img
                              src={efficiency}
                              alt={`Image 3 `}
                              className="object-contain h-full"
                            />
                          </div>
                        )}

                        {/* <div className="bg-white shadow-lg w-40 h-12 flex justify-center items-center rounded-lg overflow-hidden">
                          <img
                            src={cocconformity}
                            alt={`Imagen 4`}
                            className="object-contain h-full"
                          />
                        </div> */}
                        {dqmsData?.compliance.foodProductSafety && (
                          <div className="bg-white shadow-lg w-40 h-12 flex justify-center items-center rounded-lg overflow-hidden">
                            <img
                              src={safetyinformation}
                              alt={`Image 5`}
                              className="object-contain h-full"
                            />
                          </div>
                        )}
                        {dqmsData?.compliance.productStorage && (
                          <div className="bg-white shadow-lg w-40 h-12 flex justify-center items-center rounded-lg overflow-hidden">
                            <img
                              src={storage}
                              alt={`Image 6`}
                              className="object-contain h-full"
                            />
                          </div>
                        )}
                        {dqmsData?.compliance.productContents && (
                          <div className="bg-white shadow-lg w-40 h-12 flex justify-center items-center rounded-lg overflow-hidden">
                            <img
                              src={productcontents}
                              alt={`Image 7`}
                              className="object-contain h-full"
                            />
                          </div>
                        )}
                      </div>

                      <img
                        src={effiencyImage}
                        alt="Efficiency image"
                        className="object-contain min-h-96 w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbnil Images */}
              <div className="flex justify-center items-center">
                <div
                  className={`h-auto w-[97%] bg-[#DDF3F6] rounded-md flex flex-col md:flex-row shadow-xl mb-6 p-10`}
                >
                  <div className="flex flex-col w-full">
                    {/* Title */}
                    <h2 className="text-blue-900 font-semibold mb-4">
                      Insert & Select Image of the Item
                    </h2>

                    {/* Image Gallery */}
                    <div className="flex">
                      {/* Thumbnails */}
                      <div className="flex flex-col space-y-2">
                        {images.map((image, index) => (
                          <img
                            key={index}
                            src={image.src}
                            alt={image.alt}
                            className={`w-16 h-16 rounded-md cursor-pointer border-2 ${
                              selectedImageIndex === index
                                ? "border-blue-500"
                                : "border-transparent"
                            }`}
                            onClick={() => handleThumbnailClick(index)}
                          />
                        ))}
                      </div>

                      {/* Main Image */}
                      <div className="ml-8">
                        <img
                          src={images[selectedImageIndex].src}
                          alt={images[selectedImageIndex].alt}
                          className="w-96 h-auto rounded-md"
                        />
                      </div>
                    </div>
                  </div>

                  {/* QR Code and Barcode */}
                  <div className="flex flex-col justify-end w-full items-center ml-10 mb-10">
                    <Barcode
                      value={data?.barcode}
                      format="EAN13"
                      width={2.5}
                      height={75}
                    />
                    <QRCodeSVG
                      value={data?.barcode}
                      width="190"
                      height="180"
                      className="mt-6"
                    />
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

export default ProductDetails;