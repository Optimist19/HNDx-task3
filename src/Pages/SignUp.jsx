import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, NavLink } from "react-router-dom";

export default function SignUp() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  });

  const navTo = useNavigate();

  function userInputs(e) {
    setUserDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  }

  // console.log(userDetails)

  async function submitForm(e) {
    e.preventDefault();

    try {
      // const auth = getAuth();

      const useCredentials = await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );

      console.log(useCredentials?.user);
      navTo("/login");
    } catch (error) {
      console.log(error.message);
      alert("Email already in used");
    }
  }

  return (
    <div className="form-container">
		<div>
			<form onSubmit={submitForm}>
				<h1>Sign Up</h1>
				<input
				type="email"
				placeholder="Email"
				value={userDetails.email}
				name="email"
				onChange={userInputs}
				/>
				<input
				type="password"
				placeholder="Password"
				value={userDetails.password}
				name="password"
				onChange={userInputs}
				/>
				<button type="submit">Sign Up</button>
			</form>
			<NavLink to="/login">Login</NavLink>
		</div>
    </div>
  );
}
