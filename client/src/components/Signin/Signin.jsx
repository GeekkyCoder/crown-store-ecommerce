import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../FormSchema/FormSchema";
import { FETCH_USER_SUCCESS } from "../../store/user/user.actions";
import crownIcon from "../../Assets/crown.svg";
import axios from "axios";

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
         const {data} = await axios.post('http://localhost:8000/auth/login',{
           email:values.email,
           password:values.password
         })
        dispatch(FETCH_USER_SUCCESS(data));
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
      <div className="flex font-sans flex-col  w-[90%] md:w-[35%] justify-between items-center mx-auto border-2 border-gray-200 p-4 shadow-lg rounded-sm mt-10 text-sm">
        <div className="logo">
          <img src={crownIcon} alt="crown-logo" />
        </div>
        <h1 className="font-sans  font-bold uppercase text-xs md:text-2xl tracking-wide leading-3 my-10">
          Sign in to your account
        </h1>
        <form
          className="flex  w-full flex-col items-center "
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
            <div className="text-red-700 uppercase font-bold">{formik.errors.email}</div>
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
            <div className="text-red-700 uppercase font-bold">{formik.errors.password}</div>
          ) : null}
          <p className="font-sans  mt-5 font-bold text-gray-800 uppercase">
            dont have an account ?
            <Link
              className="ml-2 text-orange-500 hover:text-gray-700 "
              to="/auth"
            >
              sign up
            </Link>
          </p>
          <button
            className="bg-black mt-5 text-white border-2 border-gray-400 hover:bg-white hover:text-black p-2 rounded-md font-sans uppercase font-bold w-[80%] md:w-[50%] transition-colors  ease-in duration-75 "
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
