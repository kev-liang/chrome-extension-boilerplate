console.log("background");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background:", message);

  // Check the message type
  if (message.type === "greet") {
    sendResponse({ reply: "Hello from the background script!" });
  } else {
    sendResponse({ reply: "Unknown message type" });
  }

  // Return true to indicate you want to send an asynchronous response
  return true;
});
