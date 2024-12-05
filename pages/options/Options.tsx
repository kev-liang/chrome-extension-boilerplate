import React from "react";
import ReactDOM from "react-dom/client";
import "./options.css"; // Optional CSS for styling

function Options() {
  const handleClick = () => {
    alert("Button clicked!");
    chrome.runtime.openOptionsPage();
  };

  return (
    <div className="popup-container">
      <h1>My Chrome Extension</h1>
      <p>This is the popup content. Interact below:</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

// Render the Popup component into the root div
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Options />);
