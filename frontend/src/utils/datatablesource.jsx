import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import imageLiveUrl from '../utils/urlConverter/imageLiveUrl';
import QRCode from 'qrcode.react';
import { backendNpcUrl, baseUrl } from './config';
import { useGridApiContext } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const QRCodeCell = props => {
  const url = `https://gs1ksa.org/?gtin=${props.value}`;
  return <QRCode value={url} size={40} />;
};

function ImageEditInputCell(props) {
  const { id, field, fieldUpdated, value, mode } = props;
  const apiRef = useGridApiContext();

  const handleFileChange = (event) => {
    const file = event.target?.files?.[0];

    if (!file) {
      apiRef.current.setEditCellValue({
        id,
        field: fieldUpdated,
        value: false,
      });
      return;
    }

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageValue = reader.result;
        apiRef.current.setEditCellValue({
          id,
          field: fieldUpdated,
          value: true,
        });
        apiRef.current.setEditCellValue({
          id,
          field,
          value: { file, dataURL: imageValue, isUpdate: true },
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRef = (element) => {
    if (element) {
      const input = element.querySelector('input[type="file"]');
      input?.focus();
    }
  };

  if (mode === "edit") {
    return (
      <Box sx={{ display: "flex", alignItems: "center", pr: 2 }}>
        <input
          ref={handleRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </Box>
    );
  }

  console.log("Value");
  console.log(value);
}

const renderImageEditInputCell = (params) => {
  const { field, fieldUpdated } = params;
  return (
    <ImageEditInputCell {...params} mode="edit" fieldUpdated={fieldUpdated} />
  );
};

const GTINCell = params => {
  const style = {
    backgroundColor: 'rgb(21 128 61)',
    color: 'white',
    borderRadius: '30px',
    padding: '2px 5px',
  };
  return <div style={style}>{params.value}</div>;
};

export const InventorySuppliersDataColumn = [
  {
    field: 'id',
    headerName: 'ID',
    width: 180,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'NAME',
    width: 180,
    editable: true,
  },
  {
    field: 'date',
    headerName: 'DATE',
    width: 180,
    editable: true,
  },

  {
    field: 'complete_name',
    headerName: 'Complete Name',
    width: 180,
    editable: true,
  },
  {
    field: 'lang',
    headerName: 'Language',
    width: 180,
    editable: true,
  },
  {
    field: 'tz',
    headerName: 'Timezone',
    width: 180,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 180,
    editable: true,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    width: 180,
    editable: true,
  },
  {
    field: 'mobile',
    headerName: 'Mobile',
    width: 180,
    editable: true,
  },
  {
    field: 'is_company',
    headerName: 'Is Company',
    width: 180,
    editable: true,
  },
  {
    field: 'industry_id',
    headerName: 'Industry ID',
    width: 180,
    editable: true,
  },
  {
    field: 'company_type',
    headerName: 'Company Type',
    width: 180,
    editable: true,
  },
];

export const productDataColumn = [
  // {
  //   field: "id",
  //   headerName: "ID",
  //   width: 180,
  //   editable: true,
  // },
  {
    field: "packaging_type",
    headerName: "Packaging Type",
    width: 180,
    editable: true,
  },
  {
    field: "material",
    headerName: "Material",
    width: 180,
    editable: true,
  },

  {
    field: "weight",
    headerName: "weight",
    width: 180,
    editable: true,
  },
  {
    field: "recyclable",
    headerName: "Recyclable",
    width: 180,
    editable: true,
  },
  {
    field: "biodegradable",
    headerName: "Biodegradable",
    width: 180,
    editable: true,
  },
  {
    field: "color",
    headerName: "color",
    width: 180,
    editable: true,
  },
  {
    field: "labeling",
    headerName: "labeling",
    width: 180,
    editable: true,
  },
  // {
  //   field: "brand_owner_id",
  //   headerName: "Brand Owner ID",
  //   width: 180,
  //   editable: true,
  // },
];

export const foodProductSafetiesDataColumn = [
  // {
  //   field: "id",
  //   headerName: "ID",
  //   width: 180,
  //   editable: true,
  // },
  {
    field: "batch_number",
    headerName: "Batch Number",
    width: 180,
    editable: true,
  },
  {
    field: "supplier_id",
    headerName: "Supplier ID",
    width: 180,
    editable: true,
  },

  {
    field: "inspection_result",
    headerName: "Inspection Result",
    width: 180,
    editable: true,
  },
  {
    field: "issue_detected",
    headerName: "Issue Detected",
    width: 180,
    editable: true,
  },
  {
    field: "regulatory_compliance",
    headerName: "Regulatory Compliance",
    width: 180,
    editable: true,
  },
  {
    field: "storage_conditions",
    headerName: "Storage Conditions",
    width: 180,
    editable: true,
  },
  {
    field: "manufacture_date",
    headerName: "Manufacture Date",
    width: 180,
    editable: true,
    type: "dateTime",
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    },
  },

  {
    field: "expiry_date",
    headerName: "Expiry date",
    width: 180,
    editable: true,
  },

  {
    field: "inspection_date",
    headerName: "Inspection Date",
    width: 180,
    editable: true,
    type: "dateTime",
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    },
  },
];



export const GtinColumn = [
  // {
  //   field: "product_id",
  //   headerName: "Product ID",
  //   width: 100,
  // },
  {
    field: "productnameenglish",
    headerName: 'Product Name English',
    width: 180,
  },
  {
    field: "productnamearabic",
    headerName: 'Product Name Arabic',
    width: 180,
  },
  {
    field: "BrandName",
    headerName: 'Brand Name English',
    width: 180,
  },
  {
    field: "BrandNameAr",
    headerName: 'Brand Name Arabic',
    width: 180,
  },
  {
    field: 'certificate',
    headerName: 'Certificate',
    width: 120,
    renderCell: (params) => {
      const productId = params.row.id; // Assuming id is the productId
      const onClickIcon = () => {
        // Call the API when icon is clicked
        window.open(`${baseUrl}/products/getGtinCertificate/${productId}?selectedLanguage=${selectedLanguage}`, "_blank");
      };

      return (
        <InsertDriveFileIcon
          style={{
            color: "black",
            width: "40px",
            height: "40px",
            cursor: "pointer",
          }}
          onClick={onClickIcon}
        />
      );
    },
  },
  {
    field: "qrcode",
    headerName: 'QRCode',
    renderCell: (params) => <QRCodeCell value={params.row.barcode} />,
    // width: 50, // Adjust this width as needed
  },
  {
    field: "barcode",
    headerName: 'Barcode',
    renderCell: GTINCell,
    width: 150,
  },
  {
    field: "front_image",
    headerName: 'Back Photo',
    width: 180,
    editable: true,
    renderCell: (params) => (
      <img
        src={imageLiveUrl(params.row.front_image)}
        // src={backendUrl + "/" + params.row.address_image}
        alt="address_image"
        style={{
          width: '90%',
          height: '90%',
          objectFit: 'contain',
          cursor: 'pointer'
        }}
        onClick={() => {
          window.open(imageLiveUrl(params.row.front_image), '_blank', 'width=400,height=300,top=0,left=0');
        }}
      />
    )
  },
  {
    field: "back_image",
    headerName: 'Back Photo',
    width: 180,
    editable: true,
    renderCell: (params) => (
      <img
        src={imageLiveUrl(params.row.back_image)}
        // src={backendUrl + "/" + params.row.address_image}
        alt="address_image"
        style={{
          width: '90%',
          height: '90%',
          objectFit: 'contain',
          cursor: 'pointer'
        }}
        onClick={() => {
          window.open(imageLiveUrl(params.row.back_image), '_blank', 'width=400,height=300,top=0,left=0');
        }}
      />
    )
  },
  {
    field: "image_1",
    headerName: 'Optional Image 1',
    width: 180,
    editable: true,
    renderCell: (params) => (
      <img
        src={imageLiveUrl(params.row.image_1)}
        // src={backendUrl + "/" + params.row.address_image}
        alt="address_image"
        style={{
          width: '90%',
          height: '90%',
          objectFit: 'contain',
          cursor: 'pointer'
        }}
        onClick={() => {
          window.open(imageLiveUrl(params.row.image_1), '_blank', 'width=400,height=300,top=0,left=0');
        }}
      />
    )
  },
  {
    field: "image_2",
    headerName: 'Optional Image 2',
    width: 180,
    editable: true,
    renderCell: (params) => (
      <img
        src={imageLiveUrl(params.row.image_2)}
        // src={backendUrl + "/" + params.row.address_image}
        alt="address_image"
        style={{
          width: '90%',
          height: '90%',
          objectFit: 'contain',
          cursor: 'pointer'
        }}
        onClick={() => {
          window.open(imageLiveUrl(params.row.image_2), '_blank', 'width=400,height=300,top=0,left=0');
        }}
      />
    )
  },
  {
    field: "image_3",
    headerName: 'Optional Image 3',
    width: 180,
    editable: true,
    renderCell: (params) => (
      <img
        src={imageLiveUrl(params.row.image_3)}
        // src={backendUrl + "/" + params.row.address_image}
        alt="address_image"
        style={{
          width: '90%',
          height: '90%',
          objectFit: 'contain',
          cursor: 'pointer'
        }}
        onClick={() => {
          window.open(imageLiveUrl(params.row.image_3), '_blank', 'width=400,height=300,top=0,left=0');
        }}
      />
    )
  },
  // {
  //   field: "product_url",
  //   headerName: "Product URL",
  //   width: 180,
  //   renderCell: (params) => {
  //     let url = params.value;
  //     if (!url.startsWith('http://') && !url.startsWith('https://')) {
  //       url = 'http://' + url;
  //     }
  //     return (
  //       <a href={url} target="_blank" rel="noopener noreferrer">
  //         {params.value}
  //       </a>
  //     );
  //   },
  // },
  {
    field: "product_url",
    headerName: 'Product URL',
    width: 180,
    renderCell: (params) => {
      let url = params.value;
      if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
      }
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      );
    },
  },

  {
    field: 'ProductType',
    headerName: 'Product Type',
    width: 180,
  },
  {
    field: 'Origin',
    headerName: 'Origin',
    width: 180,
  },
  {
    field: 'PackagingType',
    headerName: 'Packaging Type',
    width: 180,
  },
  {
    field: 'unit',
    headerName: 'Unit',
    width: 180,
  },
  {
    field: 'size',
    headerName: 'Size',
    width: 180,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 120,
  // },
];

export const GlnColumn = (t, i18n) => {
  const columns = [
    {
      field: 'product_id',
      headerName: t('Product ID'),
      width: 180,
    },
    {
      field: 'gcpGLNID',
      headerName: t('GCP GLN ID'),
      width: 180,
    },
    {
      field: 'locationNameEn',
      headerName: t('LOCATION NAME EN'),
      width: 180,
    },
    {
      field: 'locationNameAr',
      headerName: t('LOCATION NAME AR'),
      width: 150,
    },

    {
      field: 'GLNBarcodeNumber',
      headerName: t('GLN Barcode Number'),
      width: 180,
    },
    // {
    //   field: 'status',
    //   headerName: t('Status'),
    //   width: 180,
    // },
    {
      field: 'status',
      headerName: t('Status'),
      width: 180,
      renderCell: params => (
        <div
          style={{
            padding: '5px',
            paddingLeft: '5px',
            paddingRight: '5px',
            borderRadius: '10px',
            border: '2px solid',
            borderColor: params.row.status === 'active' ? 'green' : 'red',
            color: params.row.status === 'active' ? 'green' : 'red',
          }}
        >
          {params.row.status}
        </div>
      )
    },
  ];

  if (i18n && i18n.language === 'ar') {
    columns.reverse();
  }
  return columns;
};

export const ViewSsccColumn = (t, i18n) => {
  const columns = [
    {
      field: 'sscc_id',
      headerName: t('SSCC ID'),
      width: 180,
    },
    {
      field: 'sscc_type',
      headerName: t('Type'),
      width: 180,
    },
    {
      field: 'SSCCBarcodeNumber',
      headerName: t('SSCC Barcode Number'),
      width: 280,
    },
  ];

  if (i18n && i18n.language === 'ar') {
    columns.reverse();
  }
  return columns;
};


export const memberActivityReportColumn = (t, i18n) => [
  {
    field: 'subject',
    headerName: t('Subject'),
    width: 380,
  },
  {
    field: 'company_name_eng',
    headerName: t('Company Name English'),
    width: 180,
  },
  {
    field: 'company_name_arabic',
    headerName: t('Company Name Arabic'),
    width: 180,
  },
  {
    field: 'other_products',
    headerName: t('Other Products'),
    width: 180,
  },
  {
    field: 'memberID',
    headerName: t('Member ID'),
    width: 180,
  },
  {
    field: 'email',
    headerName: t('Email'),
    width: 180,
  },
  {
    field: 'mobile',
    headerName: t('Mobile'),
    width: 180,
  },
  {
    field: 'companyID',
    headerName: t('Company ID'),
    width: 180,
  },
  {
    field: 'contactPerson',
    headerName: t('Contact Person'),
    width: 180,
  },
  {
    field: 'status',
    headerName: t('Status'),
    width: 180,
    renderCell: params => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '5px',
          paddingRight: '5px',
          borderRadius: '10px',
          border: '2px solid',
          borderColor: params.row.status === 'active' ? 'green' : 'red',
          color: params.row.status === 'active' ? 'green' : 'red',
        }}
      >
        {params.row.status}
      </div>
    ),
  },
  {
    field: 'transaction_id',
    headerName: t('Transaction ID'),
    width: 180,
  },
  {
    field: 'membership_category',
    headerName: t('Membership Category'),
    width: 180,
  },
  {
    field: 'city',
    headerName: t('City'),
    width: 180,
  },
  {
    field: 'state',
    headerName: t('State'),
    width: 180,
  },
  {
    field: 'country',
    headerName: t('Country'),
    width: 180,
  },
  {
    field: 'created_at',
    headerName: t('Created At'),
    width: 180,

    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },
  {
    field: 'updated_at',
    headerName: t('Updated At'),
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    }
  },



];



export const gtinReportsColumns = (t, i18n) => [
  {
    field: 'reporter_email',
    headerName: t("Reporter"),
    width: 180,
  },
  {
    field: 'report_barcode',
    headerName: t("Barcode"),
    width: 180,
  },
  {
    field: 'report_comment',
    headerName: t("Comment"),
    width: 180,
  },
  {
    field: 'report_status',
    headerName: t('Status'),
    width: 120,
    renderCell: params => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderRadius: '20px',
          border: '2px solid',
          borderColor: params.row.report_status === 1 ? 'green' : 'red',
          color: params.row.report_status === 1 ? 'green' : 'red',
        }}
      >
        {params.row.report_status === 1 ? 'completed' : 'pending'}
      </div>
    ),
  },
  {
    field: "created_at",
    headerName: t("Date"),
    width: 180,
    type: "dateTime",
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    },
  },
  {
    field: 'report_action',
    headerName: t("Reporter Action"),
    width: 180,
  },
  {
    field: "report_images",
    headerName: t("Report Image"),
    width: 180,
    editable: true,
    renderCell: (params) => (
      <img
        src={imageLiveUrl(params.row.report_images)}
        // src={backendUrl + "/" + params.row.address_image}
        alt="address_image"
        style={{
          width: '90%',
          height: '90%',
          objectFit: 'contain',
          cursor: 'pointer'
        }}
        onClick={() => {
          window.open(imageLiveUrl(params.row.report_images), '_blank', 'width=400,height=300,top=0,left=0');
        }}
      />
    )
  },


];


export const allproductColumn = [
  {
    field: "brand_owner_user_id",
    headerName: "Brand owner User ID",
    width: 180,
  },
  {
    field: "npc_user_id",
    headerName: "NPC User ID",
    width: 180,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => {
      const status = params.row.status;
      let padding, text;

      if (status == "1") {
        padding = "2px";
        text = "Approved";
      } else if (status == "2") {
        padding = "5px";
        text = "Pending";
      } else {
        padding = "5px";
        text = "Rejected";
      }

      return (
        <div
          style={{
            padding: padding,
            paddingLeft: padding,
            paddingRight: padding,
            borderRadius: "20px",
            border: "2px solid",
            borderColor:
              status === "1" ? "green" : status === "2" ? "orange" : "red",
            color: status === "1" ? "green" : status === "2" ? "orange" : "red",
          }}
        >
          {text}
        </div>
      );
    },
  },
  {
    field: "barcode",
    headerName: "Barcode",
    width: 180,
  },
  {
    field: "created_at",
    headerName: "Created At",
    width: 180,

    type: "dateTime",
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    },
  },
  {
    field: "updated_at",
    headerName: "Updated At",
    width: 180,
    type: "dateTime",
    valueGetter: (params) => {
      // Convert the string date to a Date object
      return params.value ? new Date(params.value) : null;
    },
  },
];


export const qualityMarkColumn = [
  {
    field: 'brand_owner_id',
    headerName: 'Brand Owner ID',
    width: 120,
  },
  {
    field: 'issuing_authority',
    headerName: 'Issuing Authority',
    width: 120,
  },
  {
    field: 'last_modified_by',
    headerName: 'Last Modified By',
    width: 120,
  },
  {
    field: 'scope',
    headerName: 'Scope',
    width: 180,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: params => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderRadius: '20px',
          border: '2px solid',
          borderColor: params.row.status === "Active" ? 'green' : 'red',
          color: params.row.status === "Active" ? 'green' : 'red',
        }}
      >
        {params.row.status === "Active" ? 'Active' : 'InActive'}
      </div>
    ),
  },
  {
    field: "created_at",
    headerName: "Created At",
    width: 180,
    type: "dateTime",
    valueGetter: (params) => {
      return params.value ? new Date(params.value) : null;
    },
  },
  {
    field: "expiry_date",
    headerName: "Expiry Date",
    width: 180,
    type: "dateTime",
    valueGetter: (params) => {
      return params.value ? new Date(params.value) : null;
    },
  },
  {
    field: 'quality_mark',
    headerName: 'Quality Mark',
    width: 120,
  },
  {
    field: 'images',
    headerName: 'Images',
    width: 180,
    renderCell: (params) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        {Array.isArray(params.value) && params.value.length > 0 ? (
          params.value.map((image, index) => {
            const onClickIcon = () => {
              window.open(imageLiveUrl(image, backendNpcUrl));
            };

            return (
              <InsertDriveFileIcon
                key={index}
                style={{
                  color: "black",
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                }}
                onClick={onClickIcon}
              />
            );
          })
        ) : (
          <span>No images</span>
        )}
      </div>
    ),
  },
];



export const efficiencyLabelsColumn = [
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: params => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderRadius: '20px',
          border: '2px solid',
          borderColor: params.row.status === "Active" ? 'green' : 'red',
          color: params.row.status === "Active" ? 'green' : 'red',
        }}
      >
        {params.row.status === "Active" ? 'Active' : 'InActive'}
      </div>
    ),
  },
  {
    field: 'barcode',
    headerName: 'Barcode',
    width: 150,
  },
  {
    field: 'label_type',
    headerName: 'Label Type',
    width: 150,
  },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 100,
  },
  {
    field: 'issued_by',
    headerName: 'Issued By',
    width: 200,
  },
  {
    field: 'issue_date',
    headerName: 'Issue Date',
    width: 150,
    type: 'dateTime',
    valueGetter: (params) => params.value ? new Date(params.value) : null,
  },
  {
    field: 'valid_until',
    headerName: 'Valid Until',
    width: 150,
    type: 'dateTime',
    valueGetter: (params) => params.value ? new Date(params.value) : null,
  },
  {
    field: 'scope',
    headerName: 'Scope',
    width: 180,
  },
  {
    field: 'details',
    headerName: 'Details',
    width: 250,
  },
  {
    field: 'brand_owner_id',
    headerName: 'Brand Owner ID',
    width: 150,
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => params.value ? new Date(params.value) : null,
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => params.value ? new Date(params.value) : null,
  },
  {
    field: 'last_modified_by',
    headerName: 'Last Modified By',
    width: 150,
  },
  {
    field: 'images',
    headerName: 'Images',
    width: 180,
    renderCell: (params) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        {Array.isArray(params.value) && params.value.length > 0 ? (
          params.value.map((image, index) => {
            const onClickIcon = () => {
              window.open(imageLiveUrl(image, backendNpcUrl));
            };

            return (
              <InsertDriveFileIcon
                key={index}
                style={{
                  color: "black",
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                }}
                onClick={onClickIcon}
              />
            );
          })
        ) : (
          <span>No images</span>
        )}
      </div>
    ),
  },
];



export const productConformitiesColumn = [
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: params => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderRadius: '20px',
          border: '2px solid',
          borderColor: params.row.status === "Active" ? 'green' : 'red',
          color: params.row.status === "Active" ? 'green' : 'red',
        }}
      >
        {params.row.status === "Active" ? 'Active' : 'InActive'}
      </div>
    ),
  },
  {
    field: 'barcode',
    headerName: 'Barcode',
    width: 150,
  },
  {
    field: 'certificate_name',
    headerName: 'Certificate Name',
    width: 150,
  },
  {
    field: 'issued_by',
    headerName: 'Issued By',
    width: 200,
  },
  {
    field: 'issue_date',
    headerName: 'Issue Date',
    width: 150,
    type: 'dateTime',
    valueGetter: (params) => params.value ? new Date(params.value) : null,
  },
  {
    field: 'expiry_date',
    headerName: 'Expiry Date',
    width: 150,
    type: 'dateTime',
    valueGetter: (params) => params.value ? new Date(params.value) : null,
  },
  {
    field: 'standard_met',
    headerName: 'Standard Met',
    width: 200,
  },
  {
    field: 'details',
    headerName: 'Details',
    width: 250,
  },
  {
    field: 'brand_owner_id',
    headerName: 'Brand Owner ID',
    width: 150,
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => params.value ? new Date(params.value) : null,
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => params.value ? new Date(params.value) : null,
  },
  {
    field: 'last_modified_by',
    headerName: 'Last Modified By',
    width: 150,
  },
  {
    field: 'images',
    headerName: 'Images',
    width: 180,
    renderCell: (params) => {
      let images = [];
      
      try {
        // Attempt to parse the images JSON string
        if (params.value) {
          images = JSON.parse(params.value);
          
          // Validate that the parsed value is indeed an array
          if (!Array.isArray(images)) {
            throw new Error('Parsed value is not an array');
          }
        }
      } catch (error) {
        console.error('Error handling images:', error);
        images = []; // Ensure images is an empty array if parsing fails
      }

      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {images.length > 0 ? (
            images.map((image, index) => {
              const onClickIcon = () => {
                window.open(imageLiveUrl(image, backendNpcUrl));
              };

              return (
                <InsertDriveFileIcon
                  key={index}
                  style={{
                    color: "black",
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                  }}
                  onClick={onClickIcon}
                />
              );
            })
          ) : (
            <span>No images</span>
          )}
        </div>
      );
    },
  },
];



export const ieceeCertificatesColumn = [
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: params => (
      <div
        style={{
          padding: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderRadius: '20px',
          border: '2px solid',
          borderColor: params.row.status === "Active" ? 'green' : 'red',
          color: params.row.status === "Active" ? 'green' : 'red',
        }}
      >
        {params.row.status === "Active" ? 'Active' : 'InActive'}
      </div>
    ),
  },
  {
    field: 'barcode',
    headerName: 'Barcode',
    width: 150,
  },
  {
    field: 'certificate_name',
    headerName: 'Certificate Name',
    width: 150,
  },
  {
    field: 'issued_by',
    headerName: 'Issued By',
    width: 200,
  },
  {
    field: 'issue_date',
    headerName: 'Issue Date',
    width: 150,
    type: 'dateTime',
    valueGetter: (params) => params.value ? new Date(params.value) : null,
  },
  {
    field: 'expiry_date',
    headerName: 'Expiry Date',
    width: 150,
    type: 'dateTime',
    valueGetter: (params) => params.value ? new Date(params.value) : null,
  },
  {
    field: 'standard_met',
    headerName: 'Standard Met',
    width: 200,
  },
  {
    field: 'details',
    headerName: 'Details',
    width: 250,
  },
  {
    field: 'brand_owner_id',
    headerName: 'Brand Owner ID',
    width: 150,
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => params.value ? new Date(params.value) : null,
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,
    type: 'dateTime',
    valueGetter: (params) => params.value ? new Date(params.value) : null,
  },
  {
    field: 'last_modified_by',
    headerName: 'Last Modified By',
    width: 150,
  },
  {
    field: 'images',
    headerName: 'Images',
    width: 180,
    renderCell: (params) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        {Array.isArray(params.value) && params.value.length > 0 ? (
          params.value.map((image, index) => {
            const onClickIcon = () => {
              window.open(imageLiveUrl(image, backendNpcUrl));
            };

            return (
              <InsertDriveFileIcon
                key={index}
                style={{
                  color: "black",
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                }}
                onClick={onClickIcon}
              />
            );
          })
        ) : (
          <span>No images</span>
        )}
      </div>
    ),
  },
];



export const productsContentsDataColumns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 180,
    editable: true,
  },
  {
    field: 'barcode',
    headerName: 'Barcode',
    width: 180,
    editable: true,
  },
  {
    field: 'certificate_name',
    headerName: 'Certificate Name',
    width: 180,
    editable: true,
  },
  {
    field: 'details',
    headerName: 'Details',
    width: 200,
    editable: true,
  },
  {
    field: 'issue_date',
    headerName: 'Issue Date',
    width: 180,
    editable: true,
    type: 'date', // Assuming you're using a grid that supports date types
  },
  {
    field: 'expiry_date',
    headerName: 'Expiry Date',
    width: 180,
    editable: true,
    type: 'date',
  },
  {
    field: 'issued_by',
    headerName: 'Issued By',
    width: 180,
    editable: true,
  },
  {
    field: 'standard_met',
    headerName: 'Standard Met',
    width: 180,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 180,
    editable: true,
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 180,
    editable: false,
    type: 'dateTime', // Assuming you're using a grid that supports dateTime types
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 180,
    editable: false,
    type: 'dateTime',
  },
  {
    field: 'brand_owner_id',
    headerName: 'Brand Owner ID',
    width: 180,
    editable: true,
  },
  {
    field: 'last_modified_by',
    headerName: 'Last Modified By',
    width: 180,
    editable: true,
  },
];



export const storageDataColumn = [
  {
    field: "barcode",
    headerName: "Barcode",
    width: 180,
    editable: true,
  },
  {
    field: "brand_owner_id",
    headerName: "Brand Owner ID",
    width: 180,
    editable: true,
  },
  {
    field: "quality_mark",
    headerName: "Quality Mark",
    width: 180,
    editable: true,
  },
  {
    field: "issuing_authority",
    headerName: "Issuing Authority",
    width: 180,
    editable: true,
  },
  {
    field: "issue_date",
    headerName: "Issue Date",
    width: 180,
    editable: true,
    type: "dateTime",
    valueGetter: (params) => {
      return params.value ? new Date(params.value) : null;
    },
  },
  {
    field: "expiry_date",
    headerName: "Expiry Date",
    width: 180,
    editable: true,
    type: "dateTime",
    valueGetter: (params) => {
      return params.value ? new Date(params.value) : null;
    },
  },
  {
    field: "scope",
    headerName: "Scope",
    width: 180,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 180,
    editable: true,
  },
  {
    field: "created_at",
    headerName: "Created At",
    width: 180,
    editable: false,
    type: "dateTime",
    valueGetter: (params) => {
      return params.value ? new Date(params.value) : null;
    },
  },
  {
    field: "updated_at",
    headerName: "Updated At",
    width: 180,
    editable: false,
    type: "dateTime",
    valueGetter: (params) => {
      return params.value ? new Date(params.value) : null;
    },
  },
  {
    field: "batch_number",
    headerName: "Batch Number",
    width: 180,
    editable: true,
  },
  {
    field: "supplier_id",
    headerName: "Supplier ID",
    width: 180,
    editable: true,
  },
  {
    field: "inspection_result",
    headerName: "Inspection Result",
    width: 180,
    editable: true,
  },
  {
    field: "issue_detected",
    headerName: "Issue Detected",
    width: 180,
    editable: true,
  },
  {
    field: "regulatory_compliance",
    headerName: "Regulatory Compliance",
    width: 180,
    editable: true,
  },
  {
    field: "storage_conditions",
    headerName: "Storage Conditions",
    width: 180,
    editable: true,
  },
  {
    field: "manufacture_date",
    headerName: "Manufacture Date",
    width: 180,
    editable: true,
    type: "dateTime",
    valueGetter: (params) => {
      return params.value ? new Date(params.value) : null;
    },
  },
  {
    field: "inspection_date",
    headerName: "Inspection Date",
    width: 180,
    editable: true,
    type: "dateTime",
    valueGetter: (params) => {
      return params.value ? new Date(params.value) : null;
    },
  },
];
