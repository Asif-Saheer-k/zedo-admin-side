import axios from "axios";
import React, { useEffect } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { logInAdmin } from "../../redux/slices/AdminData";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();
  const AdminDeatails = useSelector((state) => state.admindData.value);
  useEffect(() => {
    if (!AdminDeatails) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [AdminDeatails]);

  const onSubmit = async (datas) => {
    const email = datas.email;
    const password = datas.password;
    try {
          const { data } = await axios.post(
        "http://18.208.225.35/api/admin/login",
        {
          email,
          password,
        }
      );
      console.log(data);
     navigate('/')
      dispatch(logInAdmin(data));
    } catch (error) {
      swal("OOPS!", "Email And Password Incorrect!", "error");
    }
  };
  return (
    <section className="login_section">
      <div className="loginform">
        <h2>ADMIN LOGIN</h2>

        <form className="form_login" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            className="login_fields"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "invalid email address",
              },
            })}
            onKeyUp={() => {
              trigger("email");
            }}
            placeholder="Email"
            required
          />
          {errors.email ? (
            <div>
              <small className="text-danger">{errors.email.message}</small>
            </div>
          ) : (
            <label>Username</label>
          )}

          <br />
          <input
            type="password"
            className="login_fields"
            {...register("password", {
              required: "password is required",
              //   pattern: {
              //     value: /^[a-zA-Z]$/,
              //     message: "Invalid password address",
              //   },
            })}
            onKeyUp={() => {
              trigger("password");
            }}
          />
          {errors.password ? (
            <div>
              <small className="text-danger">{errors.password.message}</small>
            </div>
          ) : (
            <label>password</label>
          )}

          <br />

          <button type="submit" className="login_submit">
            LOGIN IN
          </button>
          <br />
        </form>
      </div>
    </section>
  );
}

export default Login;
