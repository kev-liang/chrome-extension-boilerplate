import GoogleRepo from "@/repo/GoogleRepo";
import { Button } from "@mui/material";

const GoogleLogin = () => {
  const googleRepo = GoogleRepo();

  const handleLoginClick = async () => {
    const authCode = await googleRepo.getAuthCode();
    console.log("AUTH CODE", authCode);
    const authToken = await googleRepo.getAuthTokenFromCode(authCode);
    console.log("AUTH TOKEN", authToken);
  };

  return <Button onClick={handleLoginClick}>Login</Button>;
};

export default GoogleLogin;
