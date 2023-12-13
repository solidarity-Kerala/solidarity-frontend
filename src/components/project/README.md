// Input type: Text
{
  // Type of input field, in this case, a text input
  type: "text",
  // Placeholder text displayed in the input field
  placeholder: "arrivalTime",
  // Name attribute of the input field (corresponds to the database attribute name)
  name: "arrivalTime",
  // Validation rules for the input field (e.g., "time" validation)
  validation: "time",
  // Default value for the input field
  default: "10:00",
  // Label text for the input field
  label: "arrivalTime",
  // Indicates whether the input field is required
  required: true,
  // Indicates whether the input field should be displayed in the view mode
  view: true,
  // Indicates whether the input field should be displayed in the add mode
  add: true,
  // Indicates whether the input field should be displayed in the update mode
  update: true,
},
{
  // Input type: Text
  type: "text",
  placeholder: "email",
  name: "email",
  validation: "email",
  default: "",
  label: "email",
  // Minimum length of the input field (optional)
  minimum: 5,
  // Maximum length of the input field (optional)
  maximum: 40,
  required: true,
},
{
  // Input type: Password
  type: "password",
  placeholder: "password",
  name: "password",
  validation: "password",
  default: "",
  label: "password",
  minimum: 6,
  maximum: 16,
  required: true,
},
{
  // Select input with options loaded from a CSV file
  type: "select",
  placeholder: "arrivalDay",
  name: "arrivalDay",
  validation: "",
  default: "",
  label: "arrivalDay",
  required: true,
  view: true,
  add: true,
  update: true,
  apiType: "CSV", // Specifies the data source type as CSV
  selectApi: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday", // CSV data values
},
{
  // Select input with options loaded from JSON data
  type: "select",
  placeholder: "arrivalPadding",
  name: "arrivalPadding",
  validation: "",
  default: "",
  label: "arrivalPadding",
  required: true,
  view: true,
  add: true,
  update: true,
  filter: false,
  apiType: "JSON", // Specifies the data source type as JSON
  selectApi: [
    // JSON data values
    { value: "30 minutes", id: 30 },
    { value: "60 minutes", id: 60 },
    { value: "120 minutes", id: 120 },
    { value: "180 minutes", id: 180 },
    { value: "240 minutes", id: 240 },
    { value: "300 minutes", id: 300 },
  ],
},
{
  // Select input with options loaded from an API
  type: "select",
  placeholder: "shift",
  name: "shift",
  validation: "",
  default: "",
  label: "shift",
  required: true,
  view: true,
  add: true,
  update: true,
  apiType: "API", // Specifies the data source type as an API
  selectApi: "shift/select", // API URL slug for loading options
}
