import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import MusicCartIcon from "../../../assets/MusicCartIcon.svg";
import styles from "./Login.module.css";
const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("*Email is required"),
    password: Yup.string().required("*Password is required"),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(login(values)).then((result) => {
        // If login failed, show alert message
        if (!result.payload.success) {
          alert("Invalid email or password.");
        }
      });
    },
  });

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.logoContainer}>
          <img src={MusicCartIcon} alt="MusicCart" className={styles.logo} />
          <span className={styles.brand}>Musicart</span>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.heading}>Sign in</div>

          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Enter your email or mobile number
              </label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${styles.input} ${
                  formik.touched.email && formik.errors.email
                    ? styles.inputError
                    : ""
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <div className={styles.error}>{formik.errors.email}</div>
              )}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${styles.input} ${
                  formik.touched.password && formik.errors.password
                    ? styles.inputError
                    : ""
                }`}
              />
              {formik.touched.password && formik.errors.password && (
                <div className={styles.error}>{formik.errors.password}</div>
              )}
            </div>
            <div className={styles.formGroup}>
              <button type="submit" className={styles.button}>
                Continue
              </button>
            </div>
          </form>
          <div className={styles.agreementText}>
            <span>
              By continuing, you agree to Musicart privacy notice and conditions
            </span>
            <span> of use.</span>
          </div>
        </div>
        <div className={styles.registerContainer}>
          <div className={styles.newUserText}>
            <div className={styles.line}></div>
            <div className={styles.registerText}>New to Musicart?</div>
            <div className={styles.line}></div>
          </div>
          <Link to="/register" className={styles.registerLink}>
            <div className={styles.registerButton}>
              Create your Musicart account
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
