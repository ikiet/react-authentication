import { redirect } from "react-router-dom";
import { removeToken } from "../util/auth"

export const action = () => {
  removeToken();
  return redirect("/");
}
