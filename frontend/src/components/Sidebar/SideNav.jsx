// import React, { useEffect } from "react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import Images from "../../Images/gs1logowhite.png";
// import { useNavigate } from "react-router-dom";
// import { RxHamburgerMenu } from "react-icons/rx";
// import validation from "../../Images/validation.png";
// import identify from "../../Images/identify.png";
// import capture from "../../Images/capture.png";
// import ListofRequest from "../../Images/ListofRequest.png";
// import GTINmanagement from "../../Images/GTINmanagement.png";
// import GLNmanagement from "../../Images/GLNmanagement.png";
// import digitalLink from "../../Images/digitalLink.png";
// import MySharedData from "../../Images/MySharedData.png";
// import verifiedbyGS1 from "../../Images/verifiedbyGS1.png";
// import MyNPCservices from "../../Images/MyNPCservices.png";
// import governance from "../../Images/governance.png";
// import logout from "../../Images/logout.png";
// import { useTranslation } from "react-i18next";

// function SideNav({ isOpen, toggleSideNav }) {
//   const { t, i18n } = useTranslation();
//   const [brandOwnerIdentify, setBrandOwnerIdentify] = useState(false);
//   const [brandCapture, setBrandCapture] = useState(false);
//   const [brandShare, setBrandShare] = useState(false);

//   const navigate = useNavigate();

//   const handleToggleMangeIdentify = () => {
//     setBrandOwnerIdentify(!brandOwnerIdentify);
//   };
//   const handleToggleCapture = () => {
//     setBrandCapture(!brandCapture);
//   };
//   const handleToggleMangeShare = () => {
//     setBrandShare(!brandShare);
//   };

  
//   return (
//     <>
//       {/* <DashboardHeader /> */}
//       <div className="bg-dashboard-color p-0 ">
//         {" "}
//         {/* lg:h-screen */}
//         <div className="body-content" x-data="{ open: true }">
//           <div className="relative lg:block navbar-menu">
//             <nav
//               className={`fixed top-0 transition-all bg-dashboard-color lg:mt-0 mt-16  bottom-0 flex flex-col shadow bg-primary-sidebar overflow-hidden z-50 ${
//                 isOpen ? "w-[300px]" : "w-0"
//               } ${i18n.language === "ar" ? "right-0" : "left-0"}`}
//               id="sidenav"
//             >
//               <div className="flex justify-center items-center w-full px-4 pt-3 pb-3 border-b border-gray-300 ">
//                 <Link to="/member/dashboard">
//                   <img
//                     src={Images}
//                     alt="logo"
//                     className="object-contain h-24"
//                   />
//                 </Link>
//               </div>

//               <div className="pb-6 mt-4 overflow-x-hidden overflow-y-auto">
//                 <ul className="mb-8 text-sm ">
//                   <li>
//                     <Link
//                       to="/member/dashboard"
//                       className={`flex items-center px-3 py-0 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 ${
//                         i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
//                       }`}
//                     >
//                       <span
//                         className={`drop-shadow-lg flex h-14 w-16 items-center justify-center rounded-lg bg-D2D180 bg-center text-center xl:p-2.5 ${
//                           i18n.language === "ar" ? "ml-2" : "mr-2 "
//                         }`}
//                       >
//                         <img
//                           src={validation}
//                           alt="logo"
//                           className="w-7 h-7 object-cover"
//                         />
//                       </span>
//                       <span className="font-sans font-medium text-base my-auto -ml-3">
//                         {t("Dashboard")}
//                       </span>
//                     </Link>
//                   </li>

//                   <li>
//                     <div
//                       className={`flex items-start px-6 py-2 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 cursor-pointer ${
//                         i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
//                       }`}
//                       onClick={handleToggleMangeIdentify}
//                     >
//                       <span
//                         className={`drop-shadow-lg mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-center text-center  ${
//                           i18n.language === "ar" ? "ml-2" : "mr-2"
//                         }`}
//                       >
//                         <img
//                           src={identify}
//                           alt="logo"
//                           className="w-7 h-7 object-cover"
//                         />
//                       </span>
//                       <span className="font-sans font-medium my-auto">
//                         {t("IDENTIFY")}
//                       </span>
//                       <span
//                         className={`inline-block  my-auto sidenav-arrow ${
//                           i18n.language === "ar" ? "mr-auto" : "ml-auto"
//                         }`}
//                       >
//                         {brandOwnerIdentify ? (
//                           <FaChevronUp />
//                         ) : (
//                           <FaChevronDown />
//                         )}
//                       </span>
//                     </div>
//                     {brandOwnerIdentify && (
//                       <div
//                         className={`transition border-gray-500 dropdown-section nested-menu ${
//                           i18n.language === "ar" ? "pr-3 mr-4" : "pl-3 ml-4"
//                         }`}
//                       >
//                         <ul className={`text-sm flex flex-col gap-3`}>
//                           <li>
//                             <Link
//                               // to="/admin/global-product-registry"
//                               className={`flex items-center py-2  text-gray-700 rounded hover:bg-gray-100 ${
//                                 i18n.language === "ar"
//                                   ? "pr-3 pl-4 justify-end"
//                                   : "pl-3 pr-4 justify-start"
//                               }`}
//                             >
//                               <div
//                                 className={`flex justify-center items-center gap-3 ${
//                                   i18n.language === "ar"
//                                     ? "flex-row-reverse"
//                                     : "flex-row"
//                                 }`}
//                               >
//                                 <img
//                                   src={ListofRequest}
//                                   alt="logo"
//                                   className="w-7 h-7 object-cover"
//                                 />
//                                 <span className="text-base font-sans font-medium truncate">
//                                   {t("List of Request")}
//                                 </span>
//                               </div>
//                             </Link>
//                           </li>
//                           <li>
//                             <Link
//                               // to="/admin/local-product-registry"
//                               className={`flex items-center py-2 text-gray-700 rounded hover:bg-gray-100 ${
//                                 i18n.language === "ar"
//                                   ? "pr-3 pl-4 justify-end"
//                                   : "pl-3 pr-4 justify-start"
//                               }`}
//                             >
//                               <div
//                                 className={`flex justify-center items-center gap-3 ${
//                                   i18n.language === "ar"
//                                     ? "flex-row-reverse"
//                                     : "flex-row"
//                                 }`}
//                               >
//                                 <img
//                                   src={validation}
//                                   alt="logo"
//                                   className="w-7 h-7 object-cover"
//                                 />
//                                 <span className="text-base font-sans font-medium truncate">
//                                   {t("None")}
//                                 </span>
//                               </div>
//                             </Link>
//                           </li>
//                         </ul>
//                       </div>
//                     )}
//                   </li>
//                   <li>
//                     <div
//                       className={`flex items-start px-6 py-2 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 cursor-pointer ${
//                         i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
//                       }`}
//                       onClick={handleToggleCapture}
//                     >
//                       <span
//                         className={`drop-shadow-lg mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-center text-center  ${
//                           i18n.language === "ar" ? "ml-2" : "mr-2"
//                         }`}
//                       >
//                         <img
//                           src={capture}
//                           alt="logo"
//                           className="w-7 h-7 object-cover"
//                         />
//                       </span>
//                       <span className="text-base font-sans font-medium my-auto">
//                         {t("CAPTURE")}
//                       </span>
//                       <span
//                         className={`inline-block  my-auto sidenav-arrow ${
//                           i18n.language === "ar" ? "mr-auto" : "ml-auto"
//                         }`}
//                       >
//                         {brandCapture ? <FaChevronUp /> : <FaChevronDown />}
//                       </span>
//                     </div>
//                     {brandCapture && (
//                       <div
//                         className={`transition border-gray-500 dropdown-section nested-menu ${
//                           i18n.language === "ar" ? "pr-7" : "pl-7"
//                         }`}
//                       >
//                         <ul className="text-sm flex flex-col gap-3">
//                           <li>
//                             <Link
//                               to="/member/gtin"
//                               className={`flex items-center py-2  text-gray-700 rounded hover:bg-gray-100 ${
//                                 i18n.language === "ar"
//                                   ? "pr-3 pl-4 justify-end"
//                                   : "pl-3 pr-4 justify-start"
//                               }`}
//                             >
//                               <div
//                                 className={`flex justify-center items-center gap-3 ${
//                                   i18n.language === "ar"
//                                     ? "flex-row-reverse"
//                                     : "flex-row"
//                                 }`}
//                               >
//                                 <img
//                                   src={GTINmanagement}
//                                   alt="logo"
//                                   className="w-7 h-7 object-cover"
//                                 />
//                                 <span
//                                   className={`text-base font-medium font-sans ${
//                                     i18n.language === "ar"
//                                       ? "text-end"
//                                       : "text-start"
//                                   }`}
//                                 >
//                                   {t("GTIN")}
//                                 </span>
//                               </div>
//                             </Link>
//                           </li>
//                           <li>
//                             <Link
//                               to="/member/gln"
//                               className={`flex items-center py-2 text-gray-700 rounded hover:bg-gray-100 ${
//                                 i18n.language === "ar"
//                                   ? "pr-3 pl-4 justify-end"
//                                   : "pl-3 pr-4 justify-start"
//                               }`}
//                             >
//                               <div
//                                 className={`flex justify-center items-center gap-3 ${
//                                   i18n.language === "ar"
//                                     ? "flex-row-reverse"
//                                     : "flex-row"
//                                 }`}
//                               >
//                                 <img
//                                   src={GLNmanagement}
//                                   alt="logo"
//                                   className="w-7 h-7 object-cover"
//                                 />
//                                 <span
//                                   className={`text-base font-medium font-sans ${
//                                     i18n.language === "ar"
//                                       ? "text-end"
//                                       : "text-start"
//                                   }`}
//                                 >
//                                   {t("GLN")}
//                                 </span>
//                               </div>
//                             </Link>
//                           </li>
//                           <li>
//                             <Link
//                               to="/member/digital-links"
//                               className={`flex items-center py-2  text-gray-700 rounded hover:bg-gray-100 ${
//                                 i18n.language === "ar"
//                                   ? "pr-3 pl-4 justify-end"
//                                   : "pl-3 pr-4 justify-start"
//                               }`}
//                             >
//                               <div
//                                 className={`flex justify-center items-center gap-3 ${
//                                   i18n.language === "ar"
//                                     ? "flex-row-reverse"
//                                     : "flex-row"
//                                 }`}
//                               >
//                                 <img
//                                   src={digitalLink}
//                                   alt="logo"
//                                   className="w-7 h-7 object-cover"
//                                 />
//                                 <span
//                                   className={`text-base font-medium font-sans ${
//                                     i18n.language === "ar"
//                                       ? "text-end"
//                                       : "text-start"
//                                   }`}
//                                 >
//                                   {t("Digital Links")}
//                                 </span>
//                               </div>
//                             </Link>
//                           </li>
//                         </ul>
//                       </div>
//                     )}

//                     <li>
//                       <div
//                         className={`flex items-start px-6 py-2 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 cursor-pointer ${
//                           i18n.language === "ar"
//                             ? "flex-row-reverse"
//                             : "flex-row"
//                         }`}
//                         onClick={handleToggleMangeShare}
//                       >
//                         <span
//                           className={`drop-shadow-lg mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-center text-center  ${
//                             i18n.language === "ar" ? "ml-2" : "mr-2"
//                           }`}
//                         >
//                           <img
//                             src={MySharedData}
//                             alt="logo"
//                             className="w-7 h-7 object-cover"
//                           />
//                         </span>
//                         <span className="text-base font-sans font-medium my-auto">
//                           {t("SHARE")}
//                         </span>
//                         <span
//                           className={`inline-block  my-auto sidenav-arrow ${
//                             i18n.language === "ar" ? "mr-auto" : "ml-auto"
//                           }`}
//                         >
//                           {brandShare ? <FaChevronUp /> : <FaChevronDown />}
//                         </span>
//                       </div>
//                       {brandShare && (
//                         <div
//                           className={`transition border-gray-500 dropdown-section nested-menu ${
//                             i18n.language === "ar" ? "pr-3 mr-3 " : "pl-3 ml-3 "
//                           }`}
//                         >
//                           <ul className={`text-sm flex flex-col gap-3`}>
//                             <li>
//                               <Link
//                                 // to="/member/Language/Dynamic"
//                                 className={`flex items-center py-2 text-gray-700 rounded hover:bg-gray-100 ${
//                                   i18n.language === "ar"
//                                     ? "pr-3 pl-4 justify-end"
//                                     : "pl-3 pr-4 justify-start"
//                                 }`}
//                               >
//                                 <div
//                                   className={`flex justify-center items-center gap-3 ${
//                                     i18n.language === "ar"
//                                       ? "flex-row-reverse"
//                                       : "flex-row"
//                                   }`}
//                                 >
//                                   <img
//                                     src={MySharedData}
//                                     alt="logo"
//                                     className="w-7 h-7 object-cover"
//                                   />
//                                   <span className="text-base font-medium font-sans">
//                                     {t("My Shared Data")}
//                                   </span>
//                                 </div>
//                               </Link>
//                             </li>
//                             <li>
//                               <Link
//                                 // to="/member/Language/Dynamic"
//                                 className={`flex items-center py-2 text-gray-700 rounded hover:bg-gray-100 ${
//                                   i18n.language === "ar"
//                                     ? "pr-3 pl-4 justify-end"
//                                     : "pl-3 pr-4 justify-start"
//                                 }`}
//                               >
//                                 <div
//                                   className={`flex justify-center items-center gap-3 ${
//                                     i18n.language === "ar"
//                                       ? "flex-row-reverse"
//                                       : "flex-row"
//                                   }`}
//                                 >
//                                   <img
//                                     src={verifiedbyGS1}
//                                     alt="logo"
//                                     className="w-7 h-7 object-cover"
//                                   />
//                                   <span className="text-base font-medium font-sans">
//                                     {t("Verified by GS1")}
//                                   </span>
//                                 </div>
//                               </Link>
//                             </li>
//                           </ul>
//                         </div>
//                       )}
//                     </li>

//                     <li>
//                       <Link
//                         to="/member/gln"
//                         className={`flex items-center py-0 text-gray-700 rounded hover:bg-gray-100 ${
//                           i18n.language === "ar"
//                             ? "pr-7 pl-7 justify-end"
//                             : "pl-7 pr-7 justify-start"
//                         }`}
//                       >
//                         <div
//                           className={`flex justify-center items-center h-14 gap-3 ${
//                             i18n.language === "ar"
//                               ? "flex-row-reverse"
//                               : "flex-row"
//                           }`}
//                         >
//                           <img
//                             src={MyNPCservices}
//                             alt="logo"
//                             className="w-7 h-7 object-cover"
//                           />
//                           <span
//                             className={`text-base font-medium font-sans ${
//                               i18n.language === "ar" ? "text-end" : "text-start"
//                             }`}
//                           >
//                             {t("My NPC Services")}
//                           </span>
//                         </div>
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         // to="/member/gln"
//                         className={`flex items-center py-0 text-gray-700 rounded hover:bg-gray-100 ${
//                           i18n.language === "ar"
//                             ? "pr-7 pl-7 justify-end"
//                             : "pl-7 pr-7 justify-start"
//                         }`}
//                       >
//                         <div
//                           className={`flex justify-center items-center h-14 gap-3 ${
//                             i18n.language === "ar"
//                               ? "flex-row-reverse"
//                               : "flex-row"
//                           }`}
//                         >
//                           <img
//                             src={governance}
//                             alt="logo"
//                             className="w-7 h-7 object-cover"
//                           />
//                           <span
//                             className={`text-base font-medium font-sans ${
//                               i18n.language === "ar" ? "text-end" : "text-start"
//                             }`}
//                           >
//                             {t("Data Governance")}
//                           </span>
//                         </div>
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         // to="/member/gln"
//                         className={`flex items-center py-0 text-gray-700 rounded hover:bg-gray-100 ${
//                           i18n.language === "ar"
//                             ? "pr-7 pl-7 justify-end"
//                             : "pl-7 pr-7 justify-start"
//                         }`}
//                       >
//                         <div
//                           className={`flex justify-center items-center h-14 gap-3 ${
//                             i18n.language === "ar"
//                               ? "flex-row-reverse"
//                               : "flex-row"
//                           }`}
//                         >
//                           <img
//                             src={validation}
//                             alt="logo"
//                             className="w-7 h-7 object-cover"
//                           />
//                           <span
//                             className={`text-base font-medium font-sans ${
//                               i18n.language === "ar" ? "text-end" : "text-start"
//                             }`}
//                           >
//                             {t("Terms and Conditions")}
//                           </span>
//                         </div>
//                       </Link>
//                     </li>
//                   </li>

//                   <li>
//                     <Link
//                       to="/"
//                       // className="flex items-center px-6 py-4 text-gray-700 group hover:text-gray-600 hover:bg-gray-100"
//                       className={`flex items-center px-3 py-0 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 ${
//                         i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
//                       }`}
//                     >
//                       <span
//                         className={`drop-shadow-lg flex h-16 w-16 items-center justify-center rounded-lg bg-D2D180 bg-center text-center xl:p-2.5 ${
//                           i18n.language === "ar" ? "ml-2" : "mr-2"
//                         }`}
//                       >
//                         <img
//                           src={logout}
//                           alt="logo"
//                           className="w-7 h-7 object-cover"
//                         />
//                       </span>
//                       <span className="text-base font-medium font-sans -ml-3">
//                         {t("Log-out")}
//                       </span>
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </nav>
//           </div>
//         </div>
//         {/* top nav */}
//         <div
//           className={`mx-auto transition-all content-wrapper ${
//             isOpen
//               ? `${i18n.language === "ar" ? "lg:mr-[300px]" : "lg:ml-[300px]"}`
//               : "lg:ml-0"
//           }`}
//           id="dash"
//         >
//           <section className="sticky top-0 z-20 px-3 py-0 bg-[#1F0567] shadow text-gray-100 lg:px-5">
//             <nav className="relative">
//               <div
//                 className={`flex items-center ${
//                   i18n.language === "ar" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <button onClick={toggleSideNav} className="px-2 py-3 ">
//                   <RxHamburgerMenu className="text-white h-auto w-6" />
//                 </button>
//                 <p className="text-white font-sans">{t("Brand Owner")}</p>
//               </div>
//             </nav>
//           </section>

//           {/* main content */}
//           {/* {children} */}
//         </div>
//       </div>
//     </>
//   );
// }

// export default SideNav;



import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Images from "../../Images/gs1logowhite.png";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import validation from "../../Images/validation.png";
import identify from "../../Images/identify.png";
import capture from "../../Images/capture.png";
import ListofRequest from "../../Images/ListofRequest.png";
import GTINmanagement from "../../Images/GTINmanagement.png";
import GLNmanagement from "../../Images/GLNmanagement.png";
import digitalLink from "../../Images/digitalLink.png";
import MySharedData from "../../Images/MySharedData.png";
import verifiedbyGS1 from "../../Images/verifiedbyGS1.png";
import MyNPCservices from "../../Images/MyNPCservices.png";
import governance from "../../Images/governance.png";
import logout from "../../Images/logout.png";
import ApiGuideicon from "../../Images/MyNPCservices.png";
function SideNav({ isOpen, toggleSideNav }) {
  const [brandOwnerIdentify, setBrandOwnerIdentify] = useState(false);
  const [brandCapture, setBrandCapture] = useState(false);
  const [brandShare, setBrandShare] = useState(false);

  const navigate = useNavigate();

  const handleToggleMangeIdentify = () => {
    setBrandOwnerIdentify(!brandOwnerIdentify);
  };
  const handleToggleCapture = () => {
    setBrandCapture(!brandCapture);
  };
  const handleToggleMangeShare = () => {
    setBrandShare(!brandShare);
  };

  return (
    <>
      <div className="bg-[#D0F2F3] p-0">
        <div className="body-content">
          <div className="relative lg:block navbar-menu">
            <nav
              className={`fixed top-0 transition-all bg-[#D0F2F3] lg:mt-0 mt-12 bottom-0 flex flex-col shadow bg-primary-sidebar overflow-hidden z-50 ${
                isOpen ? "w-[300px]" : "w-0"
              } left-0`}
              id="sidenav"
            >
              <div className="flex justify-center items-center w-full px-4 pt-3 pb-3 border-b border-gray-300">
                <Link to="/member/dashboard">
                  <img
                    src={Images}
                    alt="logo"
                    className="object-contain h-24"
                  />
                </Link>
              </div>

              <div className="pb-6 mt-4 overflow-x-hidden overflow-y-auto">
                <ul className="mb-8 text-sm">
                  <li>
                    <Link
                      to="/member/dashboard"
                      className="flex items-center px-3 py-0 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 flex-row"
                    >
                      <span className="drop-shadow-lg flex h-14 w-16 items-center justify-center rounded-lg bg-D2D180 bg-center text-center xl:p-2.5 mr-2">
                        <img
                          src={validation}
                          alt="logo"
                          className="w-7 h-7 object-cover"
                        />
                      </span>
                      <span className="font-sans font-medium text-base my-auto -ml-3">
                        Dashboard
                      </span>
                    </Link>
                  </li>

                  <li>
                    <div
                      className="flex items-start px-6 py-2 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 cursor-pointer flex-row"
                      onClick={handleToggleMangeIdentify}
                    >
                      <span className="drop-shadow-lg flex h-10 w-10 items-center justify-center rounded-lg bg-center text-center mr-2">
                        <img
                          src={identify}
                          alt="logo"
                          className="w-7 h-7 object-cover"
                        />
                      </span>
                      <span className="font-sans font-medium my-auto">
                        IDENTIFY
                      </span>
                      <span className="inline-block my-auto sidenav-arrow ml-auto">
                        {brandOwnerIdentify ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                    </div>
                    {brandOwnerIdentify && (
                      <div className="transition border-gray-500 dropdown-section nested-menu pl-3 ml-4">
                        <ul className="text-sm flex flex-col gap-3">
                          <li>
                            <Link
                              to={'/member/my-products'}
                              className="flex items-center py-2 text-gray-700 rounded hover:bg-gray-100 pl-3 pr-4 justify-start"
                            >
                              <div className="flex justify-center items-center gap-3 flex-row">
                                <img
                                  src={ListofRequest}
                                  alt="logo"
                                  className="w-7 h-7 object-cover"
                                />
                                <span className="text-base font-sans font-medium truncate">
                                  My Products
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={'/member/list-of-requests'}
                              className="flex items-center py-2 text-gray-700 rounded hover:bg-gray-100 pl-3 pr-4 justify-start"
                            >
                              <div className="flex justify-center items-center gap-3 flex-row">
                                <img
                                  src={ListofRequest}
                                  alt="logo"
                                  className="w-7 h-7 object-cover"
                                />
                                <span className="text-base font-sans font-medium truncate">
                                  List of Request
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="flex items-center py-2 text-gray-700 rounded hover:bg-gray-100 pl-3 pr-4 justify-start"
                            >
                              <div className="flex justify-center items-center gap-3 flex-row">
                                <img
                                  src={validation}
                                  alt="logo"
                                  className="w-7 h-7 object-cover"
                                />
                                <span className="text-base font-sans font-medium truncate">
                                  None
                                </span>
                              </div>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>

                  <li>
                    <div
                      className="flex items-start px-6 py-2 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 cursor-pointer flex-row"
                      onClick={handleToggleCapture}
                    >
                      <span className="drop-shadow-lg flex h-10 w-10 items-center justify-center rounded-lg bg-center text-center mr-2">
                        <img
                          src={capture}
                          alt="logo"
                          className="w-7 h-7 object-cover"
                        />
                      </span>
                      <span className="text-base font-sans font-medium my-auto">
                        CAPTURE
                      </span>
                      <span className="inline-block my-auto sidenav-arrow ml-auto">
                        {brandCapture ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </div>
                    {brandCapture && (
                      <div className="transition border-gray-500 dropdown-section nested-menu pl-7">
                        <ul className="text-sm flex flex-col gap-3">
                          <li>
                            <Link
                              to="/member/gtin"
                              className="flex items-center py-2 text-gray-700 rounded hover:bg-gray-100 pl-3 pr-4 justify-start"
                            >
                              <div className="flex justify-center items-center gap-3 flex-row">
                                <img
                                  src={GTINmanagement}
                                  alt="logo"
                                  className="w-7 h-7 object-cover"
                                />
                                <span className="text-base font-medium font-sans text-start">
                                  GTIN
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/member/gln"
                              className="flex items-center py-2 text-gray-700 rounded hover:bg-gray-100 pl-3 pr-4 justify-start"
                            >
                              <div className="flex justify-center items-center gap-3 flex-row">
                                <img
                                  src={GLNmanagement}
                                  alt="logo"
                                  className="w-7 h-7 object-cover"
                                />
                                <span className="text-base font-medium font-sans text-start">
                                  GLN
                                </span>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/member/digital-links"
                              className="flex items-center py-2 text-gray-700 rounded hover:bg-gray-100 pl-3 pr-4 justify-start"
                            >
                              <div className="flex justify-center items-center gap-3 flex-row">
                                <img
                                  src={digitalLink}
                                  alt="logo"
                                  className="w-7 h-7 object-cover"
                                />
                                <span className="text-base font-medium font-sans text-start">
                                  Digital Links
                                </span>
                              </div>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}

                    <li>
                      <div
                        className="flex items-start px-6 py-2 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 cursor-pointer flex-row"
                        onClick={handleToggleMangeShare}
                      >
                        <span className="drop-shadow-lg flex h-10 w-10 items-center justify-center rounded-lg bg-center text-center mr-2">
                          <img
                            src={MySharedData}
                            alt="logo"
                            className="w-7 h-7 object-cover"
                          />
                        </span>
                        <span className="text-base font-sans font-medium my-auto">
                          SHARE
                        </span>
                        <span className="inline-block my-auto sidenav-arrow ml-auto">
                          {brandShare ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                      </div>
                      {brandShare && (
                        <div className="transition border-gray-500 dropdown-section nested-menu pl-3 ml-3">
                          <ul className="text-sm flex flex-col gap-3">
                            <li>
                              <Link
                                className="flex items-center py-2 text-gray-700 rounded hover:bg-gray-100 pl-3 pr-4 justify-start"
                              >
                                <div className="flex justify-center items-center gap-3 flex-row">
                                  <img
                                    src={MySharedData}
                                    alt="logo"
                                    className="w-7 h-7 object-cover"
                                  />
                                  <span className="text-base font-medium font-sans">
                                    My Shared Data
                                  </span>
                                </div>
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="flex items-center py-2 text-gray-700 rounded hover:bg-gray-100 pl-3 pr-4 justify-start"
                              >
                                <div className="flex justify-center items-center gap-3 flex-row">
                                  <img
                                    src={verifiedbyGS1}
                                    alt="logo"
                                    className="w-7 h-7 object-cover"
                                  />
                                  <span className="text-base font-medium font-sans">
                                    Verified by GS1
                                  </span>
                                </div>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>

                    <li>
                      <Link
                        to="/member/gln"
                        className="flex items-center py-0 text-gray-700 rounded hover:bg-gray-100 pl-7 pr-7 justify-start"
                      >
                        <div className="flex justify-center items-center h-14 gap-3 flex-row">
                          <img
                            src={MyNPCservices}
                            alt="logo"
                            className="w-7 h-7 object-cover"
                          />
                          <span className="text-base font-medium font-sans text-start">
                            My NPC Services
                          </span>
                        </div>
                      </Link>
                    </li>
                      <li>
                      <Link
                        to="/member/ApiGuide"
                        className="flex items-center px-3 py-0 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 flex-row"
                      >
                        <span className="drop-shadow-lg flex h-14 w-16 items-center justify-center rounded-lg bg-D2D180 bg-center text-center xl:p-2.5 mr-2">
                          <img
                            src={ApiGuideicon}
                            alt="logo"
                            className="w-7 h-7 object-cover"
                          />
                        </span>
                        <span className="font-sans font-medium text-base my-auto -ml-3">
                          API Guide
                        </span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="flex items-center py-0 text-gray-700 rounded hover:bg-gray-100 pl-7 pr-7 justify-start"
                      >
                        <div className="flex justify-center items-center h-14 gap-3 flex-row">
                          <img
                            src={governance}
                            alt="logo"
                            className="w-7 h-7 object-cover"
                          />
                          <span className="text-base font-medium font-sans text-start">
                            Data Governance
                          </span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="flex items-center py-0 text-gray-700 rounded hover:bg-gray-100 pl-7 pr-7 justify-start"
                      >
                        <div className="flex justify-center items-center h-14 gap-3 flex-row">
                          <img
                            src={validation}
                            alt="logo"
                            className="w-7 h-7 object-cover"
                          />
                          <span className="text-base font-medium font-sans text-start">
                            Terms and Conditions
                          </span>
                        </div>
                      </Link>
                    </li>
                  </li>

                  <li>
                    <Link
                      to="/"
                      className="flex items-center px-3 py-0 text-gray-700 group hover:text-gray-600 hover:bg-gray-100 flex-row"
                    >
                      <span className="drop-shadow-lg flex h-16 w-16 items-center justify-center rounded-lg bg-D2D180 bg-center text-center xl:p-2.5 mr-2">
                        <img
                          src={logout}
                          alt="logo"
                          className="w-7 h-7 object-cover"
                        />
                      </span>
                      <span className="text-base font-medium font-sans -ml-3">
                        Log-out
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div
          className={`mx-auto transition-all content-wrapper ${
            isOpen ? "lg:ml-[300px]" : "lg:ml-0"
          }`}
          id="dash"
        >
          <section className="sticky top-0 z-20 px-3 py-0 bg-[#1F0567] shadow text-gray-100 lg:px-5">
            <nav className="relative">
              <div className="flex justify-between items-center flex-wrap">
              <div className="flex items-center justify-start">
                <button onClick={toggleSideNav} className="px-2 py-3">
                  <RxHamburgerMenu className="text-white h-auto w-6" />
                </button>
                <p className="text-white font-sans">Brand Owner</p>
              </div>
              <div className="flex justify-center items-center gap-3">
                <p className='text-white font-sans'>Company Name: UNIONAIRE</p>
                <img src={Images} className="h-8 w-auto object-contain" alt="" />
              </div>
              </div>
            </nav>
          </section>
        </div>
      </div>
    </>
  );
}

export default SideNav;
