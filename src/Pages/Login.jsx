import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, NavLink } from "react-router-dom";

export default function Login() {
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

      const useCredentials = await signInWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );

      console.log(useCredentials?.user);
      navTo("/");
    } catch (error) {
      console.log(error.message);
      alert("Email already in used");
    }
  }

  return (
    <div className="form-container">
		<div>
			<h1>Login Page</h1>
			<form onSubmit={submitForm}>
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
				<button type="submit">Login</button>
			</form>
			<NavLink to="/signup">Sign Up</NavLink>
		</div>
    </div>
  );
}
















































// import { useState } from "react";
// import { auth } from "../firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate, NavLink} from 'react-router-dom'

// function Login() {
//   const [details, setDetails] = useState({
//     email: "",
//     password: ""
//   });

//   const navTo = useNavigate()


//   function login(e) {
// 	e.preventDefault
//     signInWithEmailAndPassword(auth, details.email, details.password)
//       .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         // ...

// 		console.log(user)
		
// 		navTo('/')
//     })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
// 		console.log(errorCode)
// 		console.log(errorMessage)
//     });
//   }

//   function userInputs(e){
// 	setDetails(prev =>{
// 		return{
// 			...prev,
// 			[e.target.name]: e.target.value
// 		}
// 	})
//   }

//   return (
//     <div className="sign-uo-con">
// 		<h1>Login Page</h1>
//       <form onSubmit={login}>
//         <input type="email" placeholder="Email" value={details.email} name="email" onChange={userInputs}/>
//         <input type="password" placeholder="Password" value={details.password} name="password" onChange={userInputs}/>
// 		<button type="submit">Login</button>
// 		<NavLink to="/signup">Sign Up</NavLink>
//       </form>
//     </div>
//   );
// }

// export default Login;
