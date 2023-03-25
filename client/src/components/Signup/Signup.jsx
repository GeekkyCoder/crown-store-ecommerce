import { useFormik } from "formik";
import { signUpSchema } from "../../FormSchema/FormSchema";
import {
  createUserWithDocument,
  createUserAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { Link } from "react-router-dom";

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
      <div className="flex mt-8 h-screen justify-center items-center font-mono ">
        <form
          className="flex w-[50%] flex-col border-2 border-gray-100 p-2 bg-white shadow-lg  justify-center"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="uppercase font-mono font-bold my-5 text-xl text-center">
            Dont have an account ? sign up here
          </h1>
          <input
            className="border-2 border-sky-300 w-[80%] my-2 ml-10 rounded-md p-2 font-mono"
            id="displayName"
            name="displayName"
            type="text"
            placeholder="eg:Faraz"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.displayName}
          />
          <p className="ml-10">
            {formik.touched.displayName && formik.errors.displayName ? (
              <div className="text-red-500">{formik.errors.displayName}</div>
            ) : null}
          </p>

          <input
            className="border-2 border-sky-300 w-[80%] my-2 ml-10 rounded-md p-2 font-mono"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="faraz@gmail.com"
          />
          <p className="ml-10">{formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}
</p>
          <input
            className="border-2 border-sky-300 w-[80%] my-2 ml-10 rounded-md p-2 font-mono"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="password"
          />
          <p className="ml-10">{formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}
          </p>

          <input
            className="border-2 border-sky-300 w-[80%] my-2 ml-10 rounded-md p-2 font-mono"
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

          <div className="flex items-center"> 
            <button
            type="submit"
              className=" ml-10 uppercase tracking-wide font-bold bg-black text-white font-mono p-2 rounded-md  my-5 hover:bg-white hover:text-black hover:scale[1.1] border-2 border-black w-[200px] mr-8"
  
            >
              Signup
            </button>
            <p className="flex justify-between items-center">
              already have an account ? 
               <Link to={"/login"}>login </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
