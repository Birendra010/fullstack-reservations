import { Divider } from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

const Register = () => {

   const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInput = (e) =>{

    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const senddata = async (data) => {
    try {
      const res = await fetch("http://localhost:8800/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.status === 'false' || !result) {
        toast.error("Invalid Details 👎!", {
          position: "top-center",
        });
      } else {
        reset();
        toast.success("Registration Successfully done 😃!", {
          position: "top-center",
        });
         navigate("/login");
      }
    } catch (error) {
      console.log("frontend side error" + error.message);
    }
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_form">
          <form method="POST" onSubmit={handleSubmit(senddata)}>
            <h1>Create account</h1>
            <div className="form_data">
              <label htmlFor="name">username</label>
              <input
                type="text"
                name="username"
                onChange={handleInput}
                id="name"
                {...register("username", {
                  required: "username is required!",
                })}
              />
              {errors.username && <span>{errors.username.message}</span>}
            </div>
            <div className="form_data">
              <label htmlFor="email">email</label>
              <input
                type="email"
                name="email"
                onChange={handleInput}
                id="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^([A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6})+$/,
                    message: "please enter valid email",
                  },

                  required: "email is required!",
                })}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div className="form_data">
              <label htmlFor="phone">phone number</label>
              <input
                type="number"
                name="phone"
                onChange={handleInput}
                id="phone"
                {...register("phone", {
                  pattern: {
                    value: /^[6-9][0-9]{9}$/,
                    message: "please enter valid phone number",
                  },
                  required: "phone is required",
                })}
              />
              {errors.phone && <span>{errors.phone.message}</span>}
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleInput}
                id="password"
                {...register("password", {
                  minLength: { value: 6, message: "password minLength  is 6" },
                  required: "password field is required",
                })}
                placeholder="At least 6 characters"
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>

            <button type="submit" className="signin_btn">
              Continue
            </button>

            <Divider />

            <div className="signin_info">
              <p>Already have an account?</p>
              <NavLink to="/login">Sign in</NavLink>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Register;
