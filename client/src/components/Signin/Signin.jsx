import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../FormSchema/FormSchema";
import { FETCH_USER_SUCCESS } from "../../store/user/user.actions";
import { signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import crownIcon from "../../Assets/crown.svg";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, action) => {
      try {
        const { user } = await signInUserWithEmailAndPassword(
          values.email,
          values.password
        );
        dispatch(FETCH_USER_SUCCESS(user));
        navigate("/shop");
      } catch (err) {
        switch (err.code) {
          case "auth/user-not-found":
            alert(`user does not exist plz sign up first`);
            break;
          case "auth/wrong-password":
            alert("wrong password");
            break;
          default:
            console.log(err);
        }
      }
      action.resetForm();
    },
  });

  return (
    <>
      <div className="flex font-sans flex-col mt-12 w-[35%] justify-between items-center mx-auto border-2 border-gray-500 p-4 shadow-lg rounded-md">
        <div className="logo">
          <img src={crownIcon} alt="crown-logo" />
        </div>
        <h1 className="font-sans  font-bold uppercase text-2xl tracking-wide leading-3 my-10">
          Sign in to your account
        </h1>
        <form
          className="flex w-full flex-col items-center "
          onSubmit={formik.handleSubmit}
        >
          <input
            className="border-2 border-sky-200 w-full p-2 my-2 rounded-md font-mono placeholder-gray-600"
            id="email"
            name="email"
            type="email"
            placeholder="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}

          <input
            className="border-2 border-sky-200 w-full p-2 my-2 rounded-md font-mono focus:border-black placeholder-gray-600"
            id="password"
            name="password"
            type="password"
            placeholder="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}
          <p className="font-sans  mt-5 font-bold text-gray-800">
            dont have an account ?
            <Link
              className="ml-2 text-orange-500 hover:text-gray-700"
              to="/auth"
            >
              sign up
            </Link>
          </p>
          <button
            className="bg-black mt-5 text-white border-2 border-gray-400 hover:bg-white hover:text-black p-2 rounded-md font-sans uppercase font-bold w-[50%] transition-colors  ease-in duration-75 "
            type="submit"
          >
            sign in
          </button>
        </form>
      </div>
    </>
  );
};

export default Signin;
