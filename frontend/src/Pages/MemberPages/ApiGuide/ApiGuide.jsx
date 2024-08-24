import React, { useEffect ,useState} from "react";
import { FaBoxOpen } from "react-icons/fa";
import DashboardRightHeader from "../../../components/DashboardRightHeader/DashboardRightHeader";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const ApiGuide = () => {
  useEffect(() => {
    // auto scroll to bottom
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(true); // State to track toggle button status

  const handleToggle = () =>
  {
    setIsChecked(!isChecked);
  };

  const apiList = [
    { name: "Search GPC for Codification", endpoint: `api/gpc/searchGpcForCodification?gpc=10008163` },
    { name: "Get GTIN Product Details", endpoint: "/foreignGtin/getGtinProductDetailsFromLocalDb?barcode=6287043940133" },
    { name: "Search Licenses", endpoint: "/license/search?licenseeName=Oil&countryCode=SA&countryFullName=saudi%20arabia" },
    { name: "Get Digital Links", endpoint: "/digitalLinks?identificationKeyType=gtin&identificationKey=6281000004036" }
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) =>
  {
    setSearchTerm(event.target.value);
  };

  // Filtered API list based on search term
  const filteredApiList = apiList.filter((api) =>
    api.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (row) =>
  {
    console.log(row);
    navigate("/member/api-helpdesk");
    localStorage.setItem('apihelpdesck', row)
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 shadow-md">
        <div>
          <DashboardRightHeader
            title={"Dashboard"}
            gcp={"628100000113"}
            member={"10105"}
            subscriptionExpiry={"365d 19h 49m 31s"}
          />
        </div>

        {/* Navbar */}
        <div className="flex justify-start items-center gap-6 p-4">
          {/* Search Input */}
          <div className="font-body sm:text-base text-sm flex flex-col gap-0 border rounded shadow focus-within:ring focus-within:ring-blue-300">
            <input
              type="text"
              id="fields1"
              //   className="border-1 w-40 bg-gray-100 rounded-sm border-[#8E9CAB] p-2"
              className="px-4 py-2 pr-10 rounded focus:outline-none w-full"
              placeholder="Search Operations"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Toggle Button */}
          <label className="flex items-center me-5 cursor-pointer gap-3">
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Group By Tag
            </span>
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isChecked}
              onChange={handleToggle}
            />
            <div
              className={`relative w-11 h-6 rounded-full ${
                isChecked ? "bg-green-600" : "bg-gray-200"
              } dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600`}
            ></div>
          </label>
        </div>

        {/* Table Content */}
        <div class="flex flex-col">
          <div class="overflow-x-auto overflow-y-auto sm:mx-6 lg:-mx-4">
            <div class="min-w-full py-2 sm:px-6 lg:px-8">
              <div class="mb-6">
                <table class="min-w-full text-sm font-light">
                  <thead class="border-b-2 text-black font-body font-semibold dark:border-neutral-500">
                    <tr>
                      <th scope="col" class=" px-6 py-4  text-start">
                        Name
                      </th>
                      <th scope="col" class=" px-6 py-4  text-start">
                        Description
                      </th>
                      <th scope="col" class=" px-6 py-4  text-center">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApiList.map((api, index) => (
                      <tr
                        class="border-b font-body dark:border-neutral-500"
                        key={index}
                      >
                        <td class="text-gray-700 px-6 py-4 text-start">{api.name}</td>
                        <td class=" px-6 py-4 text-start">
                          GS1 Registry Platform API-v3 is a RESTful API which is
                          used to interact with the GS1 Registry Platform.
                        </td>
                        <td class="px-6 py-4 cursor-pointer text-center">
                          <button onClick={() => handleEdit(api)}>REST</button>{" "}
                        </td>
                      </tr>
                    ))}

                    {/* <tr class="border-b font-body dark:border-neutral-500">
                      <td class="text-primary px-6 py-4">
                        GS1 Registry Platform API-v3
                      </td>
                      <td class=" px-6 py-4">
                        GS1 Registry Platform API-v3 is a RESTful API which is
                        used to interact with the GS1 Registry Platform.
                      </td>
                      <td class="px-6 py-4">REST</td>
                    </tr>
                    <tr class="border-b font-body dark:border-neutral-500">
                      <td class="text-primary px-6 py-4">
                        GS1 Registry Platform API-v3
                      </td>
                      <td class=" px-6 py-4">
                        GS1 Registry Platform API-v3 is a RESTful API which is
                        used to interact with the GS1 Registry Platform.
                      </td>
                      <td class="px-6 py-4">REST</td>
                    </tr>
                    <tr class="border-b font-body dark:border-neutral-500">
                      <td class="text-primary px-6 py-4">
                        GS1 Registry Platform API-v3
                      </td>
                      <td class=" px-6 py-4">
                        GS1 Registry Platform API-v3 is a RESTful API which is
                        used to interact with the GS1 Registry Platform.
                      </td>
                      <td class="px-6 py-4">REST</td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiGuide;
