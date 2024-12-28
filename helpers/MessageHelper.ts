const ChromeExtensionHelper = () => {
  const sendMessageToBackground = (msg: string, payload: any) => {
    chrome.runtime.sendMessage(
      { type: msg, payload }, // Message object to send
      (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else {
          console.log("Response from background:", response);
        }
      }
    );
  };

  const sendMessageToActiveTab = (msg: string, payload: any) => {
    return new Promise<any>((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0 && tabs[0].id) {
          chrome.tabs.sendMessage(
            tabs[0].id,
            { type: msg, payload },
            (response) => {
              if (chrome.runtime.lastError) {
                console.error(
                  "Error sending message:",
                  chrome.runtime.lastError.message
                );
                reject();
              } else {
                resolve(response);
              }
            }
          );
        }
      });
    });
  };

  return { sendMessageToActiveTab, sendMessageToBackground };
};

export default ChromeExtensionHelper;
