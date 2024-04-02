import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../store/slices/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import MusicCartIcon from "../../../assets/MusicCartIcon.svg";

const Register = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("*Name is required"),
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required"),
    password: Yup.string()
      .required("*Password is required")
      .min(6, "*Password must be at least 6 characters"),
    mobile: Yup.string()
      .required("*Mobile number is required")
      .matches(/^\d{10}$/, "*Invalid mobile number"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(register(values));
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
          <div className={styles.heading}>Create Account</div>
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Your Name</label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${styles.input} ${
                  formik.touched.password && formik.errors.password
                    ? styles.inputError
                    : ""
                }`}
              />
              {formik.touched.name && formik.errors.name && (
                <div className={styles.error}>{formik.errors.name}</div>
              )}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Mobile number</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${styles.input} ${
                  formik.touched.password && formik.errors.password
                    ? styles.inputError
                    : ""
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <div className={styles.error}>{formik.errors.email}</div>
              )}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Id</label>
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
              <label className={styles.label}>Password</label>
              <input
                type="text"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${styles.input} ${
                  formik.touched.password && formik.errors.password
                    ? styles.inputError
                    : ""
                }`}
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <div className={styles.error}>{formik.errors.mobile}</div>
              )}
            </div>
            <div className={styles.agreementText}>
              <span>By enrolling your mobile phone number, you consent to</span>
              <span>receive automated security notifications via text</span>
              <span>message from Musicart. Message and data rates may</span>
              <span>apply.</span>
            </div>
            <div className={styles.formGroup}>
              <button type="submit" className={styles.button}>
                Continue
              </button>
            </div>
            <div className={styles.terms}>
              <span>
                By continuing, you agree to Musicart privacy notice and
                conditions
              </span>
              <span> of use.</span>
            </div>
          </form>
        </div>
        <div className={styles.loginLink}>
          <span className={styles.haveAccountText}>
            Already have an account?
          </span>
          <div className={styles.login}>
            <Link to="/login" className={styles.signInLink}>
              <span>Sign in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
