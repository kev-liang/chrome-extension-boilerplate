import ReactDOM from "react-dom/client";
import "./popup.css"; // Optional CSS for styling

function Popup() {
  const openOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  const sendMessage = () => {
    chrome.runtime.sendMessage(
      { type: "greet" }, // Message object to send
      (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else {
          console.log("Response from background:", response);
        }
      }
    );
  };

  return (
    <div className="popup-container">
      <h1>My Chrome Extension</h1>
      <p>This is the popup content. Interact below:</p>
      <button onClick={openOptions}>Open Options</button>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

// Render the Popup component into the root div
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Popup />);
