import ReactDOM from "react-dom/client";
import "./popup.css"; // Optional CSS for styling
import MessageHelper from "../../helpers/MessageHelper";
import CONSTS from "../../helpers/consts";

function Popup() {
  const messageHelper = MessageHelper();
  const openOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  const sendMessage = () => {
    messageHelper.sendMessageToActiveTab(CONSTS.SET_THUMBAIL, null);
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
