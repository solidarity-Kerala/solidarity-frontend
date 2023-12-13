import React, { useEffect } from "react";
import { putData } from "../../../../../backend/api";
import { useNavigate } from "react-router-dom";

function Restore({ openData }) {
  const navigate = useNavigate();

  console.log({ openData });

  useEffect(() => {
    // Make your API call or any other logic here
    putData({ _id: openData?.data?._id }, "user/user-deletion").then(() => {
      // After the API call is complete, navigate back to the previous page
      navigate(0); // This navigates back one step in the history
    });
  }, [openData?.data?._id, navigate]);
  return (
    <>
      <div>Restore</div>
    </>
  );
}

export default Restore;
