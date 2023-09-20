import React, { useState } from "react";

function AppointmentMenu() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    selectedOption: "Option 1", // Default selected option
  });

  const containerStyle = {
    width: "80%",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    paddingBottom: "30px",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
  };
  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    outline: "none",
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  };

  const selectStyle = {
    flex: "1",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    outline: "none",
    width: "45%", // Adjust the width of each select
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "18px",
    cursor: "pointer",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDropdownChange = (e) => {
    setFormData({
      ...formData,
      selectedOption: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data, e.g., send it to an API
    console.log(formData);
  };

  return (
    <div style={containerStyle}>
      <h2
        style={{ fontSize: "24px", marginBottom: "20px", textAlign: "center" }}
      >
        Appointment Menu
      </h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={rowStyle}>
          <select
            id="selectedOption1"
            name="selectedOption"
            value={formData.selectedOption}
            onChange={handleDropdownChange}
            style={{ ...selectStyle, marginRight: "10px" }}
          >
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
          <select
            id="selectedOption2"
            name="selectedOption"
            value={formData.selectedOption}
            onChange={handleDropdownChange}
            style={selectStyle}
          >
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
        </div>
        <div style={rowStyle}>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            style={inputStyle}
          />
          <select
            id="selectedOption"
            name="selectedOption"
            value={formData.selectedOption}
            onChange={handleDropdownChange}
            style={{ ...inputStyle, width: "100%" }}
          >
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
        </div>
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AppointmentMenu;
