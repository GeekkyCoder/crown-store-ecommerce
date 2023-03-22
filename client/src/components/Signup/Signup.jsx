import { useFormik } from "formik";
import signUpSchema from "../../FormSchema/FormSchema";

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      alert(JSON.stringify(values, null, 2));
      action.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        className="border border-gray-200"
        id="userName"
        name="userName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.userName}
      />
      {formik.touched.userName && formik.errors.userName ? (
        <div className="text-red-500">{formik.errors.userName}</div>
      ) : null}

      <label htmlFor="email">Email Address</label>
      <input
        className="border border-gray-200"
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="text-red-500">{formik.errors.email}</div>
      ) : null}

      <input
        className="border border-gray-200"
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="text-red-500">{formik.errors.password}</div>
      ) : null}

      <input
        className="border border-gray-200"
        id="confrimPassword"
        name="confirmPassword"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirmPassword}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <div className="text-red-500">{formik.errors.confirmPassword}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUp;
