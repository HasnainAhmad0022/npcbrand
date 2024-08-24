// import React, { useState } from "react";
// import listrequst from "../../../../Images/listrequst.png";
// import { useNavigate } from "react-router-dom";
// import ProductDetails from "./ProductDetails";

// const ListOfRequests = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   // Sample data for requests
//   const requests = Array.from({ length: 30 }, (_, index) => ({
//     id: index + 12345,
//     name: `Request #${index + 12345}`,
//   }));

//   // Filter requests based on the search term
//   const filteredRequests = requests.filter((request) =>
//     request.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const [isMemberGpcPopUpVisible, setIsMemberGpcPopUpVisible] = useState(false);

//   const handleMemberGpcPopUp = () => {
//     setIsMemberGpcPopUpVisible(true);
//   };

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">
//       <div className="bg-white p-6 shadow-md">
//         <h2 className="text-xl font-sans font-semibold text-secondary mb-4">
//           List of Request
//         </h2>

//         {/* Search Bar */}
//         <div className="relative mb-6">
//           <div className="relative flex items-center border rounded shadow focus-within:ring focus-within:ring-blue-300 sm:w-80">
//             <input
//               type="text"
//               className="px-4 py-2 pr-10 rounded focus:outline-none w-full"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <div className="absolute right-3">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={2}
//                 stroke="currentColor"
//                 className="w-5 h-5 text-gray-500"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1117.65 6.65a7.5 7.5 0 01-5.3 10.1z"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Grid of Requests */}
//         <div className="grid 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
//           {filteredRequests.map((request) => (
//             <div
//               key={request.id}
//               // onClick={() => navigate(`/member/product-details`)}
//               onClick={handleMemberGpcPopUp}
//               className="flex flex-col items-center border border-[#71BAEF] rounded-lg p-4 shadow-xl hover:shadow-md transition-shadow duration-200"
//             >
//               <img
//                 src={listrequst}
//                 alt={request.name}
//                 className="w-36 h-36 mb-4 object-contain"
//               />
//               <p className="text-center font-normal font-sans text-secondary">
//                 {request.name}
//               </p>
//               <button className="flex items-center justify-center bg-primary2 font-sans text-white sm:px-10 px-2 py-1 mt-2 rounded hover:bg-orange-700 focus:outline-none">
//                 Approve
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {isMemberGpcPopUpVisible && (
//         <ProductDetails
//           isVisible={isMemberGpcPopUpVisible}
//           setVisibility={setIsMemberGpcPopUpVisible}
//         />
//       )}
//     </div>
//   );
// };

// export default ListOfRequests;



import React, { useContext, useEffect, useRef, useState } from "react";
import { allproductColumn, GtinColumn } from "../../../../utils/datatablesource";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { QRCodeSVG } from "qrcode.react";
import logo from "../../../../Images/gs1logowhite.png";
import { toast } from "react-toastify";
import Barcode from "react-barcode";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../components/Datatable/Datatable";
import newRequest, { newRequestnpc } from "../../../../utils/userRequest";
import { DataTableContext } from "../../../../Contexts/DataTableContext";
import { FcApproval } from "react-icons/fc";
import GppBadIcon from "@mui/icons-material/GppBad";
const ListOfRequests = () => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  // const memberDataString = sessionStorage.getItem('memberData');
  // const memberData = JSON.parse(memberDataString);
  // console.log(memberData);
  // const cartItemData = JSON.parse(memberData?.carts[0]?.cart_items);
  // console.log(cartItemData);
  const {
    rowSelectionModel,
    setRowSelectionModel,
    tableSelectedRows,
    setTableSelectedRows,
    tableSelectedExportRows,
    setTableSelectedExportRows,
  } = useContext(DataTableContext);

  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await newRequestnpc.get(`/master-data/getProductRequestsByNpcUserId/clzn50i2c0000jxzi8ou3jgmi`);
      console.log(response.data);
      setData(response?.data || []);
      setIsLoading(false)
    } catch (err) {
      console.log(err);
      setIsLoading(false)
    }
  };
  useEffect(() => {
    fetchData();
  }, [])


  const handleEdit = (row) => {
    console.log(row);
    navigate("/member/upate-gtin-product/" + row?.id);
    // navigate("/upate-gtin-product/" + row?.id);
  };

  const handleView = (row) => {
    console.log(row);
    navigate("/member/view-gtin-product/" + row?.id);
  };

  const handleDigitalUrlInfo = (row) => {
    sessionStorage.setItem("selectedGtinData", JSON.stringify(row));
    navigate("/member/digitalurl");
  };

  const handledropdown = async (row, action) => {
    const status = action === "approve" ? '1' : '0';
    try {
      const deleteResponse = await newRequest.put(
        `/master-data/updateProductRequestStatus/${row?.id}`,
        {
          brand_owner_user_id: "clznpd8et0005aa7vzs5kqu95",
          npc_user_id: row.npc_user_id,
          status: status,
          barcode: row.barcode,
        }
      );
      fetchData()
      toast.success(
        `${t(
          `The product has been ${action === "approve" ? "approved" : "rejected"
          } successfully`
        )}`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      );
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.error || "Error", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const handleRowClickInParent = (item) => {
    if (!item || item?.length === 0) {
      // setTableSelectedRows(data)
      setTableSelectedExportRows(item);
      setFilteredData(data);
      return;
    }

    const barcodes = item.map((row) => row.barcode);
    console.log(barcodes); // This will log an array of barcodes
    setTableSelectedRows(barcodes);
  };

  return (
    <div>
      {/* <SideNav> */}
      <div className={`p-0 h-full bg-dashboard-color min-h-screen`}>
        {/* <div>
          <DashboardRightHeader title={'GTIN'} />
        </div> */}

        <div className="flex justify-center items-center">
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">
              <div style={{ marginLeft: "-11px", marginRight: "-11px" }}>
                <DataTable
                  data={data}
                  title={"List Of Requests"}
                  columnsName={allproductColumn}
                  loading={isLoading}
                  secondaryColor="secondary"
                  handleRowClickInParent={handleRowClickInParent}
                  uniqueId="customerListId"
                  dropDownOptions={[
                    {
                      label: "Approved",
                      icon: (
                        <FcApproval
                          fontSize="small"
                          color="action"
                          size={20}
                          style={{ color: "rgb(37 99 235)" }}
                        />
                      ),
                      action: (row) => handledropdown(row, "approve"),
                    },
                    {
                      label: `${t("Reject")}`,
                      icon: (
                        <GppBadIcon
                          fontSize="small"
                          color="action"
                          style={{ color: "rgb(37 99 235)" }}
                        />
                      ),
                      action: (row) => handledropdown(row, "reject"),
                    },
                  ]}
                />
              </div>

              <div id="barcode">
                {tableSelectedRows?.map((barcode, index) => (
                  <div id="Qrcodeserails" className="hidden" key={index}>
                    <div id="header">
                      <div>
                        <img src={logo} id="imglogo" alt="" />
                      </div>
                    </div>
                    <div id="inside-BRCode">
                      <QRCodeSVG value={barcode} width="170" height="70" />
                    </div>
                    <div id="itemSerialNo">{/* {barcode} */}</div>
                  </div>
                ))}
              </div>

              {/* 2d Barcode */}
              <div id="2dbarcode">
                {tableSelectedRows?.map((barcode, index) => (
                  <div id="Qrcodeserails" className="hidden" key={index}>
                    <div id="header">
                      <div>
                        <img src={logo} id="imglogo" alt="" />
                      </div>
                    </div>
                    <div id="inside-BRCode">
                      <Barcode value={barcode} width={1.9} height={65} />
                    </div>
                    <div id="itemSerialNo">{/* {barcode} */}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </SideNav> */}
    </div>
  );
};

export default ListOfRequests;

