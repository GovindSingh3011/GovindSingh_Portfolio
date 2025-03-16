// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./CustomAlert.css";

// const CustomAlert = (message, type) => {
//   const alertContainer = document.createElement("div");
//   alertContainer.className = `custom-alert ${type}`;

//   const closeAlert = () => {
//     alertContainer.remove();
//   };

//   const alertContent = (
//     <div className="custom-alert-content">
//       <h3>{type === "success" ? "Message Sent Successfully" : "Error"}</h3>
//       <p>{message}</p>
//       <button onClick={closeAlert}>Close</button>
//     </div>
//   );

//   const root = ReactDOM.createRoot(alertContainer);
//   root.render(alertContent);
//   document.body.appendChild(alertContainer);

//   // 
// };

// export default CustomAlert;


import React from "react";
import ReactDOM from "react-dom/client";
import "./CustomAlert.css";

const CustomAlert = (message, type) => {
  const alertContainer = document.createElement("div");
  alertContainer.className = `custom-alert ${type}`;

  const closeAlert = () => {
    alertContainer.remove();
  };

  const alertContent = (
    <div className="custom-alert-content">
      <div className="alert-header">
        <h3>{type === "success" ? "Message Sent Successfully" : "Error"}</h3>
      </div>
      <div className={`alert-body ${type}`}>
        <p>{message}</p>
      </div>
      <button className="close-btn" onClick={closeAlert}>Close</button>
    </div>
  );

  const root = ReactDOM.createRoot(alertContainer);
  root.render(alertContent);
  document.body.appendChild(alertContainer);
  setTimeout(closeAlert, 8000);
};

export default CustomAlert;
