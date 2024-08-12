import AuthForm from "../components/AuthForm";
import { redirect, json } from "react-router-dom";
import { saveToken } from "../util/auth";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const action = async ({ request }) => {
  const requestData = await request.formData();

  const authData = {
    email: requestData.get("email"),
    password: requestData.get("password"),
  };

  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const mode = searchParams.get("mode") ?? "login";

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    return json("Can't authenticate", {
      status: 500,
    });
  }

  const responseData = await response.json(); 

  const token = responseData.token;
  saveToken(token);

  return redirect("/");
};

