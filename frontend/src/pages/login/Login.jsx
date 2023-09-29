// import { useContext, useState } from "react";
// import "./login.css";
// import { AuthContext } from "../../context/AuthContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     username: undefined,
//     password: undefined,
//   });
//   const {loading, error, dispatch } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   const handleClick = async (e) => {
//     e.preventDefault();
//     dispatch({ type: "LOGIN_START" });
//     try {
//       const res = await axios.post(
//         "https://booking-api-pbc2.onrender.com/api/auth/login",
//         credentials
//       );
//       dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
//       navigate("/");
//     } catch (err) {
//       dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
//     }
//   };
//   return (
//     <div className="login">
//       <div className="lContainer">
//         <input
//           type="text"
//           placeholder="username"
//           id="username"
//           onChange={handleChange}
//           className="lInput"
//         />
//         <input
//           type="password"
//           placeholder="password"
//           id="password"
//           onChange={handleChange}
//           className="lInput"
//         />
//         <button disabled={loading} onClick={handleClick} className="lButton">
//           Login
//         </button>
//         {error && <span>{error.message}</span>}
//       </div>
//     </div>
//   );
// };

// export default Login;





import "./login.css";
import  { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
// import { Logincontext } from "../context/Contextprovider";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { account, setAccount } = useContext(AuthContext);

  const [logdata, setData] = useState({
    email: "",
    password: "",
  });

  // console.log(data);

  const adddata = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);

    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const senddata = async (e) => {
    e.preventDefault();

    const { email, password } = logdata;
    // console.log(email);
    try {
      const res = await fetch("http://localhost:8800/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      // console.log(data);

      if (res.status === 400 || !data) {
        console.log("invalid details");
        toast.error("Invalid Details 👎!", {
          position: "top-center",
        });
      } else {
        setAccount(data);
        setData({ ...logdata, email: "", password: "" });
        toast.success("Login Successfully done 😃!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log("login page ka error" + error.message);
    }
  };

  return (
    <section>
      <div className="sign_container">
        {/* <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="signupimg" />
        </div> */}
        <div className="sign_form">
          <form method="POST">
            <h1>Sign-In</h1>

            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={adddata}
                value={logdata.email}
                id="email"
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={adddata}
                value={logdata.password}
                id="password"
                placeholder="At least 6 characters"
              />
            </div>
            <button type="submit" className="signin_btn" onClick={senddata}>
              Continue
            </button>
          </form>
          <ToastContainer />
        </div>
        <div className="create_accountinfo">
          <p>New to Booking App ? </p>
          <button>
            {" "}
            <NavLink to="/register">Create your Account</NavLink>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;