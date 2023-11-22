import React from "react";

function ResponseBox({ response }) {
  // Create an object for dangerouslySetInnerHTML
  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <div>
      <div>Response:</div>
      {/* Use dangerouslySetInnerHTML to render the HTML */}
      <div dangerouslySetInnerHTML={createMarkup(response.data?.answer)} />
    </div>
  );
}

export default ResponseBox;
