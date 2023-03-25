import { useFormik } from "formik";
import {signUpSchema} from "../../FormSchema/FormSchema";
import { createUserWithDocument,createUserAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Signin from "../Signin/Signin";

const SignUp = () => {

  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values, action) => {
      try {
        const { user } = await createUserAuthWithEmailAndPassword(
          values.email,
          values.password
        );
        await createUserWithDocument(user, { displayName: values.displayName });
      } catch (err) {
        console.log(`error: ${err}`);
      }
      action.resetForm();
    },
  });

  return (
    <>
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">User Name</label>
      <input
        className="border border-gray-200"
        id="displayName"
        name="displayName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.displayName}
      />
      {formik.touched.displayName && formik.errors.displayName ? (
        <div className="text-red-500">{formik.errors.displayName}</div>
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
    <Signin/>
  </>
  );
};

export default SignUp;
