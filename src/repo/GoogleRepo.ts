import consts from "@/helpers/consts";
import config from "../helpers/config";
import { createAxiosInstance } from "../repo/AxiosFactory";

const GoogleRepo = () => {
  const axios = createAxiosInstance();

  const getAuthUrl = () => {
    const redirectUri = `https://${chrome.runtime.id}.chromiumapp.org/google`;

    const scopes = ["profile", "email"];
    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.searchParams.append("client_id", consts.GOOGLE_CLIENT_ID);
    url.searchParams.append("response_type", "code");
    url.searchParams.append("redirect_uri", redirectUri);
    url.searchParams.append("scope", scopes.join(" "));

    console.log("GOOGLE REDIRECT", url.toString());
    return url.toString();
  };

  const getUserInfo = (accessToken: string) => {
    fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((userInfo) => {
        console.log("User Info:", userInfo);
        // Handle the authenticated user (e.g., save their info)
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  };

  // Get auth code with Google OAuth 2.0 web application type
  const getAuthCode = () => {
    return new Promise<string>((resolve, reject) => {
      chrome.identity.launchWebAuthFlow(
        {
          url: getAuthUrl(),
          interactive: true,
        },
        (redirectUrl) => {
          if (chrome.runtime.lastError) {
            console.error(
              "Error during authentication:",
              chrome.runtime.lastError.message
            );
            reject();
          }

          if (redirectUrl) {
            const params = new URL(redirectUrl).searchParams;
            const authCode = params.get("code");
            console.log("Auth code:", authCode);

            if (authCode) {
              resolve(authCode);
            } else {
              reject("No auth code received.");
            }
          }
        }
      );
    });
  };

  const getAuthTokenFromCode = async (code: string) => {
    const url = `${config.REACT_APP_BACKEND_URL}/auth/google/code`;
    const body = JSON.stringify({ code });
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.post(url, body, { headers });
      return res;
    } catch (err) {
      console.error("Error getting auth token:", err);
    }
  };

  return { getAuthCode, getUserInfo, getAuthTokenFromCode };
};

export default GoogleRepo;
