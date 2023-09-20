import React, { useEffect, useState } from "react";
import { getData, postData } from "../../../../../../backend/api";
import {
  buttonStyle,
  containerStyle,
  formStyle,
  inputStyle,
  rowStyle,
  selectStyle,
} from "./styles";
import axios from "axios";

function AppointmentMenu() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    center: "",
    dietitian: "",
    slot: "",
  });
  const [dietitian, setDietitian] = useState();
  const [dietCenter, setDietcenter] = useState();
  const [avialSlots, setAvailSlots] = useState();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log({ value });
    if (formData?.center && formData?.dietitian) {
      const response = await getData(
        {
          userType: "6471b34d9fb2b29fe0458878",
          center: formData?.center,
          dietitian: formData?.dietitian,
          bookingDate: value,
        },
        "day-slot/avail-slot"
      );
      setAvailSlots(response?.data);
    }
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Do something with the form data, e.g., send it to an API
    console.log(formData);
    // await postData({ formData }, "appointment");
    await axios.post(`${process.env.REACT_APP_API}appointment`, formData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dietCenter = await getData({}, "diet-centre-branch/select");
        setDietcenter(dietCenter?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log({ formData });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(
          {
            userType: "6471b34d9fb2b29fe0458878",
            center: formData?.center,
          },
          "user/select-dietitian"
        );
        setDietitian(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [formData?.center]);

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
            name="center"
            value={formData.center}
            onChange={handleDropdownChange}
            style={{ ...selectStyle, marginRight: "10px" }}
          >
            <option value="">Center</option>
            {dietCenter?.length &&
              dietCenter?.map((value) => (
                <option value={value?.id}>{value?.value}</option>
              ))}
          </select>
          <select
            id="selectedOption2"
            name="dietitian"
            value={formData.dietitian}
            onChange={handleDropdownChange}
            style={selectStyle}
          >
            <option value="">Dietitian</option>
            {dietitian?.length &&
              dietitian?.map((value) => (
                <option value={value?.id}>{value?.value}</option>
              ))}
          </select>
        </div>
        <div style={rowStyle}>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Email"
            style={inputStyle}
          />
          <select
            id="slot"
            name="slot"
            value={formData.slot}
            onChange={handleDropdownChange}
            style={{ ...inputStyle, width: "100%" }}
          >
            <option value="">Slot</option>

            {avialSlots?.length &&
              avialSlots?.map((value) => (
                <option value={value?.id}>{value?.value}</option>
              ))}
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
