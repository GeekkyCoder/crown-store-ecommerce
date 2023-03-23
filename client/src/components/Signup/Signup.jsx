import { useFormik } from "formik";
import signUpSchema from "../../FormSchema/FormSchema";
import axios from "axios";
import  {useDispatch, useSelector } from "react-redux";
import {
  FETCH_USER_FAILED,
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
} from "../../store/user/user.actions";
import { currentUserSelector } from "../../store/user/user.selector";
import { nanoid } from 'nanoid'

const SignUp = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector)


  console.log(currentUser)

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values, action) => {
      dispatch(FETCH_USER_START());
      try {
        const userData = {
          id:nanoid(),
          userName:values.userName,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }
        const newUser = await axios.post("http://localhost:8000/user/signup", userData);
        const data = newUser.data;
        console.log(data)
        dispatch(FETCH_USER_SUCCESS(data));
      } catch (err) {
        dispatch(FETCH_USER_FAILED(err));
      }

      // action.resetForm();
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
