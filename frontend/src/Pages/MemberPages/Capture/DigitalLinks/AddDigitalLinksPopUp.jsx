import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiTrash } from "react-icons/fi";
import { AiFillFilePdf, AiFillFileWord } from "react-icons/ai";
import { newRequestnpc } from "../../../../utils/userRequest";
import { Button, CircularProgress } from "@mui/material";

const AddDigitalLinksPopUp = ({
  isVisible,
  setVisibility,
  activeTab,
  activeSubTab,
  selectedCard,
}) => {
  const [brandCertificate, setBrandCertificate] = useState([]);
  const [error, setError] = useState("");
  const [generateLoading, setGenerateLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Fields for Quality Mark
    barcode: selectedCard?.barcode,
    qualityMark: "",
    issuingAuthority: "",
    issueDate: "",
    expiryDate: "",
    status: "",
    scope: "",
    url: "",

    // Fields for IECEE Certificate
    certificateNumber: "", // For IECEE Certificate
    issuedBy: "", // For IECEE Certificate
    standardMet: "", // For IECEE Certificate

    // Fields for Efficiency Labels
    labelType: "", // For Efficiency Labels
    rating: "", // For Efficiency Labels
    validUntil: "", // For Efficiency Labels
    details: "", // For Efficiency Labels

    // Fields for Conformity Certificates
    certificateName: "", // For Conformity Certificates
    conformityIssuedBy: "", // For Conformity Certificates
    conformityStandardMet: "", // For Conformity Certificates
    conformityDetails: "", // For Conformity Certificates

    // Fields for Packaging
    Packagingtype: "", // For  Packaging
    weight: "", // For Packaging
    material: "", // For Packaging
    recyclable: "", // For Packaging
    biodegradable: "", // For Packaging
    color: "", // For Packaging
    labeling: "", // For Packaging

    // Fields for Safety Info
    batch_number: "", // For  Safety Info
    manufacture_date: "", // For Safety Info
    supplier_id: "", // For Safety Info
    inspection_date: "", // For Safety Info
    inspection_result: "", // For Safety Info
    issue_detected: "", // For Safety Info
    regulatory_compliance: "", // For Safety Info
    storage_conditions: "", // For Safety Info

    // Fields for Storage
    gln: "", // For Storage
    glnType: "", // For Storage
    quantity: "", // For Storage
    storageDate: "", // For Storage
    expirationDate: "", // For Storage
    batchNumber: "", // For Storage
    temperatureControlled: "", // For Storage
    minTemperature: "", // For Storage
    maxTemperature: "", // For Storage
    humidityControlled: "", // For Storage
    minHumidity: "", // For Storage
    maxHumidity: "", // For Storage
    specialHandling: "", // For Storage

    // Fields for Products Contents
    ingredientName: "", // Ingredient name
    ingredientType: "", // Ingredient type
    quantity: "", // Quantity
    unitOfMeasure: "", // Unit of measure
    source: "", // Source
    organic: false, // Organic status
    allergen: false, // Allergen status
    gmoStatus: "", // GMO status
    nutritionalInfo: "", // Nutritional info
    regulatoryCompliance: "", // Regulatory compliance
  });

  const handleCloseCreatePopup = () => {
    setVisibility(false);
  };

  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

  const onDrop = (acceptedFiles) => {
    const validFiles = acceptedFiles.filter((file) => file.size <= 500 * 1024);

    if (validFiles.length !== acceptedFiles.length) {
      setError("Some files exceed the 500KB size limit and were not added.");
    } else {
      setError("");
    }

    const filesWithPreview = validFiles.map((file) => {
      let preview;
      if (file.type.startsWith("image/")) {
        preview = URL.createObjectURL(file);
      } else if (file.type === "application/pdf") {
        preview = URL.createObjectURL(file); // To be shown in iframe
      } else if (
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        preview = URL.createObjectURL(file); // Placeholder or icon for Word files
      } else {
        preview = null;
      }
      return Object.assign(file, { preview });
    });

    setBrandCertificate((prevFiles) => [...prevFiles, ...filesWithPreview]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = brandCertificate.filter((_, i) => i !== index);
    setBrandCertificate(updatedFiles);

    if (selectedFileIndex === index && updatedFiles.length > 0) {
      setSelectedFileIndex(0);
    } else if (updatedFiles.length === 0) {
      setSelectedFileIndex(null);
    } else if (selectedFileIndex > index) {
      setSelectedFileIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleThumbnailClick = (index) => {
    setSelectedFileIndex(index);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept:
      "image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    multiple: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setGenerateLoading(true);
    const data = new FormData();

    // Common fields for all requests
    // data.append("scope", formData.scope || "Default Scope"); // Adjust default value as needed
    data.append("brand_owner_id", "3716"); // Replace with actual brand_owner_id
    data.append("last_modified_by", "3716"); // Replace with actual user id

    // Append files
    brandCertificate.forEach((file) => {
      data.append("images", file);
    });

    try {
      let response;
      if (activeTab === "Certification") {
        switch (activeSubTab) {
          case "Quality Mark":
            // Append fields specific to Quality Mark
            data.append("barcode", formData.barcode);
            data.append("quality_mark", formData.qualityMark);
            data.append("issuing_authority", formData.issuingAuthority);
            data.append("issue_date", formData.issueDate);
            data.append("expiry_date", formData.expiryDate);
            data.append("scope", formData.scope);
            data.append("status", formData.status);
            response = await newRequestnpc.post(
              "/digitalLinks/qualityMarks",
              data
            );
            break;
          case "IECEE Certificates":
            // Append fields specific to IECEE Certificates
            data.append("barcode", formData.barcode);
            data.append("certificate_number", formData.certificateNumber);
            data.append("issue_date", formData.issueDate);
            data.append("expiry_date", formData.expiryDate);
            data.append("issued_by", formData.issuedBy);
            data.append("scope", formData.scope);
            data.append("standard_met", formData.standardMet);
            data.append("status", formData.status);
            response = await newRequestnpc.post(
              "/digitalLinks/ieceeCertificates",
              data
            );
            break;
          case "Efficiency Labels":
            // Append fields specific to Efficiency Labels
            data.append("barcode", formData.barcode);
            data.append("label_type", formData.labelType);
            data.append("rating", formData.rating);
            data.append("issued_by", formData.issuedBy);
            data.append("issue_date", formData.issueDate);
            data.append("valid_until", formData.validUntil);
            data.append("scope", formData.scope);
            data.append("details", formData.details);
            response = await newRequestnpc.post(
              "/digitalLinks/efficiencyLabels",
              data
            );
            break;
          case "Conformity Certificates":
            // Append fields specific to Conformity Certificates
            data.append("barcode", formData.barcode);
            data.append("certificate_name", formData.certificateName);
            data.append("issued_by", formData.conformityIssuedBy);
            data.append("issue_date", formData.issueDate);
            data.append("expiry_date", formData.expiryDate);
            data.append("standard_met", formData.conformityStandardMet);
            // data.append("scope", formData.scope);
            data.append("details", formData.conformityDetails);
            response = await newRequestnpc.post(
              "/digitalLinks/productConformity",
              data
            );
            break;
          // Add cases for other sub-tabs as needed
          default:
            console.log("Sub-tab not recognized");
        }
      } else if (activeTab === "Packaging") {
        data.append("packaging_type", formData.Packagingtype);
        data.append("material", formData.material);
        data.append("barcode", formData.barcode);
        data.append("weight", formData.weight);
        data.append("recyclable", formData.recyclable);
        data.append("biodegradable", formData.biodegradable);
        data.append("color", formData.color);
        data.append("labeling", formData.labeling);
        response = await newRequestnpc.post("/digitalLinks/packagings", data);
      } else if (activeTab === "Safety Info") {
        data.append("barcode", formData.barcode);
        data.append("batch_number", formData.batch_number);
        data.append("manufacture_date", formData.manufacture_date);
        data.append("expiry_date", formData.expiryDate);
        data.append("supplier_id", formData.supplier_id);
        data.append("inspection_date", formData.inspection_date);
        data.append("inspection_result", formData.inspection_result);
        data.append("issue_detected", formData.issue_detected);
        data.append("regulatory_compliance", formData.regulatory_compliance);
        data.append("storage_conditions", formData.storage_conditions);
        response = await newRequestnpc.post(
          "/digitalLinks/foodProductSafeties",
          data
        );
      } else if (activeTab === "Storage") {
        // Append fields specific to Storage
        data.append("barcode", formData.barcode);
        data.append("gln", formData.barcode);
        data.append("gln_type", formData.glnType);
        data.append("quantity", formData.quantity);
        data.append("storage_date", formData.storageDate);
        data.append("expiration_date", formData.expirationDate);
        data.append("batch_number", formData.batchNumber);
        data.append("temperature_controlled", formData.temperatureControlled);
        if (formData.temperatureControlled === "true") {
          data.append("min_temperature", formData.minTemperature);
          data.append("max_temperature", formData.maxTemperature);
        }
        data.append("humidity_controlled", formData.humidityControlled);
        if (formData.humidityControlled === "true") {
          data.append("min_humidity", formData.minHumidity);
          data.append("max_humidity", formData.maxHumidity);
        }
        data.append("special_handling", formData.specialHandling);
        response = await newRequestnpc.post(
          "/digitalLinks/productStorage",
          data
        );
      } else if (activeTab === "Products Contents") {
        // Append fields specific to Products Contents
        data.append("barcode", formData.barcode);
        data.append("ingredient_name", formData.ingredientName);
        data.append("ingredient_type", formData.ingredientType);
        data.append("quantity", formData.quantity);
        data.append("unit_of_measure", formData.unitOfMeasure);
        data.append("source", formData.source);
        data.append("organic", formData.organic);
        data.append("allergen", formData.allergen);
        data.append("gmo_status", formData.gmoStatus);
        data.append("nutritional_info", formData.nutritionalInfo);
        data.append("regulatory_compliance", formData.regulatoryCompliance);
        response = await newRequestnpc.post(
          "/digitalLinks/productContents",
          data
        );
      }

      if (response?.status === 201) {
        toast.success("Data submitted successfully!");
        setGenerateLoading(false);
        handleCloseCreatePopup(); // Close the popup on success
      }
    } catch (error) {
      console.error("Error submitting data", error);
      setGenerateLoading(false);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Somthing went wrong"
      );
    }
  };

  const renderFormContent = () => {
    if (activeTab === "Certification") {
      switch (activeSubTab) {
        case "Quality Mark":
          return (
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 p-6">
              <div>
                <label className="block text-base font-sans font-medium text-secondary mb-1">
                  Quality Mark
                </label>
                <input
                  type="text"
                  name="qualityMark"
                  value={formData.qualityMark}
                  onChange={handleInputChange}
                  placeholder="Enter quality mark"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Issuing Authority
                </label>
                <input
                  type="text"
                  name="issuingAuthority"
                  value={formData.issuingAuthority}
                  onChange={handleInputChange}
                  placeholder="Enter issuing authority"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Issue Date
                </label>
                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Scope
                </label>
                <input
                  type="text"
                  name="scope"
                  value={formData.scope}
                  onChange={handleInputChange}
                  placeholder="Enter scope"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  URL
                </label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="Enter URL"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
            </div>
          );
        case "IECEE Certificates":
          return (
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 p-6">
              <div>
                <label className="block text-base font-sans font-medium text-secondary mb-1">
                  Certificate Number
                </label>
                <input
                  type="text"
                  name="certificateNumber"
                  value={formData.certificateNumber}
                  onChange={handleInputChange}
                  placeholder="Enter certificate number"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Issuing Date
                </label>
                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Issued By
                </label>
                <input
                  type="text"
                  name="issuedBy"
                  value={formData.issuedBy}
                  onChange={handleInputChange}
                  placeholder="Enter issued by"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Standard Met
                </label>
                <input
                  type="text"
                  name="standardMet"
                  value={formData.standardMet}
                  onChange={handleInputChange}
                  placeholder="Enter standard met"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Scope
                </label>
                <input
                  type="text"
                  name="scope"
                  value={formData.scope}
                  onChange={handleInputChange}
                  placeholder="Enter scope"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  URL
                </label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="Enter URL"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
            </div>
          );
        case "Efficiency Labels":
          return (
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 p-6">
              <div>
                <label className="block text-base font-sans font-medium text-secondary mb-1">
                  Label Type
                </label>
                <input
                  type="text"
                  name="labelType"
                  value={formData.labelType}
                  onChange={handleInputChange}
                  placeholder="Enter label type"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Rating
                </label>
                <input
                  type="text"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  placeholder="Enter rating"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Issued By
                </label>
                <input
                  type="text"
                  name="issuedBy"
                  value={formData.issuedBy}
                  onChange={handleInputChange}
                  placeholder="Enter issued by"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Issue Date
                </label>
                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Valid Until
                </label>
                <input
                  type="date"
                  name="validUntil"
                  value={formData.validUntil}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Scope
                </label>
                <input
                  type="text"
                  name="scope"
                  value={formData.scope}
                  onChange={handleInputChange}
                  placeholder="Enter scope"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Details
                </label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="Enter details"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  URL
                </label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="Enter URL"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
            </div>
          );
        case "Conformity Certificates":
          return (
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 p-6">
              <div>
                <label className="block text-base font-sans font-medium text-secondary mb-1">
                  Certificate Name
                </label>
                <input
                  type="text"
                  name="certificateName"
                  value={formData.certificateName}
                  onChange={handleInputChange}
                  placeholder="Enter certificate name"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Issued By
                </label>
                <input
                  type="text"
                  name="conformityIssuedBy"
                  value={formData.conformityIssuedBy}
                  onChange={handleInputChange}
                  placeholder="Enter issued by"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Issue Date
                </label>
                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Standard Met
                </label>
                <input
                  type="text"
                  name="conformityStandardMet"
                  value={formData.conformityStandardMet}
                  onChange={handleInputChange}
                  placeholder="Enter standard met"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Details
                </label>
                <textarea
                  name="conformityDetails"
                  value={formData.conformityDetails}
                  onChange={handleInputChange}
                  placeholder="Enter details"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  URL
                </label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="Enter URL"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
            </div>
          );
        default:
          return null;
      }
    } else {
      switch (activeTab) {
        case "Packaging":
          return (
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 p-6">
              <div>
                <label className="block text-base font-sans font-medium text-secondary mb-1">
                  Packaging Type
                </label>
                <input
                  type="text"
                  value={formData.Packagingtype}
                  onChange={handleInputChange}
                  placeholder="Enter packaging type"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Material
                </label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={handleInputChange}
                  placeholder="Enter material"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Weight
                </label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={handleInputChange}
                  placeholder="Enter weight"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Recyclable
                </label>
                <input
                  type="text"
                  value={formData.recyclable}
                  onChange={handleInputChange}
                  placeholder="Enter Recyclable"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Biodegradable
                </label>
                <input
                  type="text"
                  value={formData.biodegradable}
                  onChange={handleInputChange}
                  placeholder="Enter Biodegradable"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Color
                </label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="Enter color"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Labeling
                </label>
                <input
                  type="text"
                  value={formData.labeling}
                  onChange={handleInputChange}
                  placeholder="Enter Labeling"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  URL
                </label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="Enter URL"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
            </div>
          );
        case "Storage":
          return (
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 p-6">
              <div>
                <label className="block text-base font-sans font-medium text-secondary mb-1">
                  GLN
                </label>
                <input
                  type="text"
                  name="gln"
                  value={formData.gln}
                  onChange={handleInputChange}
                  placeholder="Enter GLN"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  GLN Type
                </label>
                <input
                  type="text"
                  name="glnType"
                  value={formData.glnType}
                  onChange={handleInputChange}
                  placeholder="Enter GLN Type (e.g., Distribution centre)"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter quantity"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Storage Date
                </label>
                <input
                  type="date"
                  name="storageDate"
                  value={formData.storageDate}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Expiration Date
                </label>
                <input
                  type="date"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Batch Number
                </label>
                <input
                  type="text"
                  name="batchNumber"
                  value={formData.batchNumber}
                  onChange={handleInputChange}
                  placeholder="Enter batch number"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Temperature Controlled
                </label>
                <select
                  name="temperatureControlled"
                  value={formData.temperatureControlled}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              {formData.temperatureControlled === "true" && (
                <>
                  <div>
                    <label className="block font-sans font-medium text-secondary mb-1">
                      Min Temperature (°C)
                    </label>
                    <input
                      type="number"
                      name="minTemperature"
                      value={formData.minTemperature}
                      onChange={handleInputChange}
                      placeholder="Enter minimum temperature"
                      className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                    />
                  </div>
                  <div>
                    <label className="block font-sans font-medium text-secondary mb-1">
                      Max Temperature (°C)
                    </label>
                    <input
                      type="number"
                      name="maxTemperature"
                      value={formData.maxTemperature}
                      onChange={handleInputChange}
                      placeholder="Enter maximum temperature"
                      className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                    />
                  </div>
                </>
              )}
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Humidity Controlled
                </label>
                <select
                  name="humidityControlled"
                  value={formData.humidityControlled}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                >
                  <option value="">Select</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              {formData.humidityControlled === "true" && (
                <>
                  <div>
                    <label className="block font-sans font-medium text-secondary mb-1">
                      Min Humidity (%)
                    </label>
                    <input
                      type="number"
                      name="minHumidity"
                      value={formData.minHumidity}
                      onChange={handleInputChange}
                      placeholder="Enter minimum humidity"
                      className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                    />
                  </div>
                  <div>
                    <label className="block font-sans font-medium text-secondary mb-1">
                      Max Humidity (%)
                    </label>
                    <input
                      type="number"
                      name="maxHumidity"
                      value={formData.maxHumidity}
                      onChange={handleInputChange}
                      placeholder="Enter maximum humidity"
                      className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                    />
                  </div>
                </>
              )}
              <div className="col-span-2">
                <label className="block font-sans font-medium text-secondary mb-1">
                  Special Handling Instructions
                </label>
                <textarea
                  name="specialHandling"
                  value={formData.specialHandling}
                  onChange={handleInputChange}
                  placeholder="Enter any special handling instructions"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  URL
                </label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="Enter URL"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
            </div>
          );
        case "Efficiency":
          return (
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 p-6">
              <div>
                <label className="block text-base font-sans font-medium text-secondary mb-1">
                  Label Type
                </label>
                <input
                  type="text"
                  placeholder="Enter label type"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Rating
                </label>
                <input
                  type="text"
                  placeholder="Enter rating"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Issued By
                </label>
                <input
                  type="text"
                  placeholder="Enter issued by"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Issue Date
                </label>
                <input
                  type="date"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  URL
                </label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="Enter URL"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
            </div>
          );
        case "Safety Info":
          return (
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 p-6">
              <div>
                <label className="block text-base font-sans font-medium text-secondary mb-1">
                  Batch Number
                </label>
                <input
                  name="batch_number"
                  type="text"
                  value={formData.batch_number}
                  onChange={handleInputChange}
                  placeholder="Enter batch number"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Manufacturing Date
                </label>
                <input
                  name="manufacture_date"
                  type="date"
                  value={formData.manufacture_date}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Expiry Date
                </label>
                <input
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Supplier ID
                </label>
                <input
                  name="supplier_id"
                  type="number"
                  value={formData.supplier_id}
                  onChange={handleInputChange}
                  placeholder="Enter supplier ID"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Inspection Date
                </label>
                <input
                  name="inspection_date"
                  type="date"
                  value={formData.inspection_date}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Issue Detected
                </label>
                <input
                  name="issue_detected"
                  type="text"
                  value={formData.issue_detected}
                  onChange={handleInputChange}
                  placeholder="Enter issue detected"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Inspection Result
                </label>
                <input
                  type="text"
                  name="inspection_result"
                  value={formData.inspection_result}
                  onChange={handleInputChange}
                  placeholder="Enter Inspection Result"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Regulatory Compliance
                </label>
                <input
                  type="text"
                  name="regulatory_compliance"
                  value={formData.regulatory_compliance}
                  onChange={handleInputChange}
                  placeholder="Enter  Regulatory Compliance"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>

              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Storage Conditions
                </label>
                <input
                  type="text"
                  name="storage_conditions"
                  value={formData.storage_conditions}
                  onChange={handleInputChange}
                  placeholder="Enter storage Conditions"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  URL
                </label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="Enter URL"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
            </div>
          );
        case "IECEE Certificate":
          return (
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 p-6">
              <div>
                <label className="block text-base font-sans font-medium text-secondary mb-1">
                  Certificate Number
                </label>
                <input
                  type="text"
                  placeholder="Enter certificate number"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Issuing Date
                </label>
                <input
                  type="date"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Issued By
                </label>
                <input
                  type="text"
                  placeholder="Enter issued by"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  URL
                </label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="Enter URL"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
            </div>
          );
        case "COC Conformity":
          return (
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 p-6">
              <div>
                <label className="block text-base font-sans font-medium text-secondary mb-1">
                  Certificate Name
                </label>
                <input
                  type="text"
                  placeholder="Enter certificate name"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Issuing Date
                </label>
                <input
                  type="date"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Issued By
                </label>
                <input
                  type="text"
                  placeholder="Enter issued by"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  URL
                </label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="Enter URL"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
            </div>
          );
        case "Products Contents":
          return (
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 p-6">
              <div>
                <label className="block text-base font-sans font-medium text-secondary mb-1">
                  Ingredient Name
                </label>
                <input
                  type="text"
                  name="ingredientName"
                  value={formData.ingredientName}
                  onChange={handleInputChange}
                  placeholder="Enter ingredient name"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Ingredient Type
                </label>
                <input
                  type="text"
                  name="ingredientType"
                  value={formData.ingredientType}
                  onChange={handleInputChange}
                  placeholder="Enter ingredient type"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter quantity"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Unit of Measure
                </label>
                <input
                  type="text"
                  name="unitOfMeasure"
                  value={formData.unitOfMeasure}
                  onChange={handleInputChange}
                  placeholder="Enter unit of measure"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Source
                </label>
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  placeholder="Enter source"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Organic
                </label>
                <select
                  name="organic"
                  value={formData.organic}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Allergen
                </label>
                <select
                  name="allergen"
                  value={formData.allergen}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  GMO Status
                </label>
                <input
                  type="text"
                  name="gmoStatus"
                  value={formData.gmoStatus}
                  onChange={handleInputChange}
                  placeholder="Enter GMO status"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Nutritional Info
                </label>
                <textarea
                  name="nutritionalInfo"
                  value={formData.nutritionalInfo}
                  onChange={handleInputChange}
                  placeholder="Enter nutritional info"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Regulatory Compliance
                </label>
                <input
                  type="text"
                  name="regulatoryCompliance"
                  value={formData.regulatoryCompliance}
                  onChange={handleInputChange}
                  placeholder="Enter regulatory compliance"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  URL
                </label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="Enter URL"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
            </div>
          );
        case "Storage":
          return (
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 p-6">
              <div>
                <label className="block text-base font-sans font-medium text-secondary mb-1">
                  GLN
                </label>
                <input
                  type="text"
                  placeholder="Enter GLN"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  GLN Type
                </label>
                <input
                  type="text"
                  placeholder="Enter GLN type"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Quantity
                </label>
                <input
                  type="text"
                  placeholder="Enter quantity"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  Storage Date
                </label>
                <input
                  type="date"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
              <div>
                <label className="block font-sans font-medium text-secondary mb-1">
                  URL
                </label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="Enter URL"
                  className="block w-full p-2 border border-blue-300 rounded-md shadow-[inset_0_3px_5px_rgba(0,0,0,0.1)]"
                />
              </div>
            </div>
          );
        default:
          return null;
      }
    }
  };

  return (
    <div>
      {isVisible && (
        <div className="popup-overlay z-50">
          <div className="popup-container h-auto sm:w-[80%] w-full">
            <div
              className="popup-form w-full"
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <div className="relative">
                <div className="fixed top-0 left-0 z-10 flex justify-between w-full px-3 bg-secondary">
                  <h2 className="text-white sm:text-xl text-lg font-body font-semibold">
                    Digital Links - {activeTab}{" "}
                    {activeSubTab && `- ${activeSubTab}`}
                  </h2>
                  <button
                    className="text-white hover:text-red-600 focus:outline-none"
                    onClick={handleCloseCreatePopup}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
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
              </div>

              <div className="p-4 w-full">
                {renderFormContent()}
                <div className="px-6">
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed border-teal-500 rounded-md p-6 text-center cursor-pointer hover:bg-teal-50"
                  >
                    <input {...getInputProps()} />
                    <FiUploadCloud className="mx-auto text-teal-500 text-4xl mb-2" />
                    <p className="text-teal-500 font-medium">
                      Drag & drop files here, or click to select files
                    </p>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                  </div>

                  {brandCertificate.length > 0 && (
                    <div className="mt-4 flex">
                      {/* Thumbnails */}
                      <div className="flex flex-col space-y-2">
                        {brandCertificate.map((file, index) => (
                          <div key={index} className="relative">
                            {file.type.startsWith("image/") ? (
                              <img
                                src={file.preview}
                                alt={file.name}
                                className={`w-16 h-16 rounded-md cursor-pointer border-2 ${
                                  selectedFileIndex === index
                                    ? "border-blue-500"
                                    : "border-transparent"
                                }`}
                                onClick={() => handleThumbnailClick(index)}
                              />
                            ) : file.type === "application/pdf" ? (
                              <AiFillFilePdf
                                className={`text-red-500 w-16 h-16 cursor-pointer border-2 ${
                                  selectedFileIndex === index
                                    ? "border-blue-500"
                                    : "border-transparent"
                                }`}
                                onClick={() => handleThumbnailClick(index)}
                              />
                            ) : (
                              <AiFillFileWord
                                className={`text-blue-500 w-16 h-16 cursor-pointer border-2 ${
                                  selectedFileIndex === index
                                    ? "border-blue-500"
                                    : "border-transparent"
                                }`}
                                onClick={() => handleThumbnailClick(index)}
                              />
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(index)}
                              className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                            >
                              <FiTrash />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Main Viewer */}
                      <div className="ml-8">
                        {brandCertificate[selectedFileIndex]?.type.startsWith(
                          "image/"
                        ) ? (
                          <img
                            src={brandCertificate[selectedFileIndex]?.preview}
                            alt={brandCertificate[selectedFileIndex]?.name}
                            className="w-96 h-auto rounded-md"
                          />
                        ) : brandCertificate[selectedFileIndex]?.type ===
                          "application/pdf" ? (
                          <iframe
                            src={brandCertificate[selectedFileIndex]?.preview}
                            title={brandCertificate[selectedFileIndex]?.name}
                            className="w-96 h-96 rounded-md"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-96 h-96 bg-gray-200 rounded-md">
                            <AiFillFileWord className="text-blue-500 w-32 h-32" />
                            <p className="text-gray-700 text-sm mt-4 text-center">
                              {brandCertificate[selectedFileIndex]?.name}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center w-full p-3">
                <button
                  onClick={handleCloseCreatePopup}
                  className="py-2 px-4 sm:px-16 bg-[#556055] text-white font-semibold rounded"
                >
                  Close
                </button>
                {/* <button
                  onClick={handleSubmit}
                  className="ml-2 py-2 px-4 sm:px-16 bg-primary2 text-white font-semibold rounded"
                >
                  Generate
                </button> */}
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#021F69", color: "#ffffff" }}
                  onClick={handleSubmit}
                  disabled={generateLoading}
                  className="ml-2 py-2 px-4 sm:px-16"
                  endIcon={
                    generateLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : null
                  }
                >
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDigitalLinksPopUp;
