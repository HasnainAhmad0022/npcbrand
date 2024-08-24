export const parametersCodification = [
  { name: "gpc", type: "string", description: "The GPC code to search for" },
];
export const parametersDelete = [
  {
    name: "ID",
    type: "string",
    description: "The ID of the item to be delete",
  },
];
export const parametersProductDetails = [
  { name: "barcode", type: "Number", description: "Get GTIN Product Details" },
];
export const parametersSearchLicenses = [
  { name: "licenseeName", type: "string", description: "licensee Name" },
  { name: "countryCode", type: "string", description: "country Code" },
  { name: "countryFullName", type: "string", description: "country Full Name" },
];
export const parametersDigitalLink = [
  {
    name: "identificationKeyType",
    type: "string",
    description: "identification Key Type",
  },
  {
    name: "identificationKey",
    type: "string",
    description: "identification Key ",
  },
];
export const parametersHscode = [
  {
    name: "text",
    type: "string",
    description: "sematic Search Api For Hscode Text",
  },
  {
    name: "tableName",
    type: "string",
    description: "sematic Search Api For Hscode tableName",
  },
];
export const parametersCreateTicket = [
  { name: "title", type: "string", description: "Title HelpDesk" },
  {
    name: "description",
    type: "string",
    description: "Description Title HelpDesk",
  },
  { name: "document", type: "file", description: "Document Title HelpDesk" },
  { name: "email", type: "email", description: "Email Title HelpDesk" },
  { name: "user_id", type: "string", description: "User ID Title HelpDesk" },
  { name: "status", type: "number", description: "StatusTitle HelpDesk" },
];
export const parametersUpdataticket = [
  { name: "title", type: "string", description: "Title HelpDesk" },
  {
    name: "description",
    type: "string",
    description: "Description Title HelpDesk",
  },
  { name: "document", type: "file", description: "Document Title HelpDesk" },
  { name: "email", type: "email", description: "Email Title HelpDesk" },
  { name: "user_id", type: "string", description: "User ID Title HelpDesk" },
  { name: "status", type: "number", description: "StatusTitle HelpDesk" },
];
export const parametersadduserguidepdf = [
  { name: "title", type: "string", description: "Title Of the Pdf" },
  { name: "pdf", type: "file", description: "Document" },
  { name: "addedBy", type: "number", description: "Added By pdf" },
  { name: "status", type: "number", description: "Status of the pdf" },
];
export const parametersupdatauserguidepdf = [
  { name: "title", type: "string", description: "Title Of the Pdf" },
  { name: "pdf", type: "file", description: "Document" },
  { name: "addedBy", type: "number", description: "Added By pdf" },
  { name: "status", type: "number", description: "Status of the pdf" },
];
export const parametersadduserguidevideo = [
  { name: "title", type: "string", description: "Title Of the video" },
  { name: "video", type: "file", description: "Document" },
  { name: "addedBy", type: "number", description: "Added By video" },
  { name: "status", type: "number", description: "Status of the video" },
];
export const parametersupdatauserguidevideo = [
  { name: "title", type: "string", description: "Title Of the video" },
  { name: "video", type: "file", description: "Document" },
  { name: "addedBy", type: "number", description: "Added By video" },
  { name: "status", type: "number", description: "Status of the video" },
];
