import { useFormik } from "formik";
import { loginSchema } from "../../FormSchema/FormSchema";
import { signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { useSelector, useDispatch } from "react-redux";
import { currentUserSelector } from "../../store/user/user.selector";
import {
  FETCH_USER_FAILED,
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
} from "../../store/user/user.actions";

const Signin = () => {
  const currentUser = useSelector(currentUserSelector);
  const dispatch = useDispatch();

  console.log(currentUser);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, action) => {
      dispatch(FETCH_USER_START());
      try {
        const { user } = await signInUserWithEmailAndPassword(
          values.email,
          values.password
        );
        dispatch(FETCH_USER_SUCCESS(user));
      } catch (err) {
        switch (err.code) {
          case "auth/user-not-found":
            alert(`user does not exist plz sign up first`);
            break;
          case "auth/wrong-password":
            alert("wrong password");
            break;
          default:
            dispatch(FETCH_USER_FAILED(err));
            console.log(err);
        }
      }
      action.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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

      <button type="submit">sign in</button>
    </form>
  );
};

export default Signin;
