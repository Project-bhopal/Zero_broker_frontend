import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google"
const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

export default function GoogleAuth() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <CustomGoogleLogin />
    </GoogleOAuthProvider>
  );
}

function CustomGoogleLogin() {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Token:", tokenResponse);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <button className="ud-btn btn-white" type="button" onClick={()=>{login()}}>
        <i className="fab fa-google" /> Continue Google
    </button>
  );
}
