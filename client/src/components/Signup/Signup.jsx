import { useFormik } from "formik";
import { signUpSchema } from "../../FormSchema/FormSchema";
import {
  createUserWithDocument,
  createUserAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { Link } from "react-router-dom";
import crownIcon from "../../Assets/crown.svg";

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
      <div className="flex  font-sans flex-col mt-12 w-[35%] justify-between items-center mx-auto border-2 border-gray-500 p-2 shadow-lg rounded-md ">
        <form
          className="flex w-full flex-col items-center"
          onSubmit={formik.handleSubmit}
        >
          <div className="">
            <img src={crownIcon} alt="crown-logo" />
          </div>
          <h1 className="font-sans  font-bold uppercase text-xl tracking-wide leading-3 my-5">
            Dont have an account ?
          </h1>
          <p className="uppercase text-gray-500 font-bold text-xl mb-5">
            sign up
          </p>
          <input
            className="border-2 border-sky-200 w-full p-2 my-2 rounded-md font-mono placeholder-gray-600"
            id="displayName"
            name="displayName"
            type="text"
            placeholder="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.displayName}
          />
          <p>
            {formik.touched.displayName && formik.errors.displayName ? (
              <div className="text-red-500">{formik.errors.displayName}</div>
            ) : null}
          </p>

          <input
            className="border-2 border-sky-200 w-full p-2 my-2 rounded-md font-mono placeholder-gray-600"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="email"
          />
          <p className="ml-10">
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </p>
          <input
            className="border-2 border-sky-200 w-full p-2 my-2 rounded-md font-mono placeholder-gray-600"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="password"
          />
          <p>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </p>

          <input
            className="border-2 border-sky-200 w-full p-2 my-2 rounded-md font-mono placeholder-gray-600 text-sm"
            id="confrimPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            placeholder="confirm password"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-red-500">{formik.errors.confirmPassword}</div>
          ) : null}

          <p className="font-sans  mt-5 font-bold text-gray-800">
            already have an account ?
            <Link
              className="ml-2 text-orange-500 hover:text-gray-700"
              to={"/signin"}
            >
              login{" "}
            </Link>
          </p>
          <button
            type="submit"
            className=" uppercase tracking-wide font-bold bg-black text-white font-mono p-2 rounded-md  my-5 hover:bg-white hover:text-black hover:scale[1.1] border-2 border-black w-[200px] "
          >
            Signup
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
