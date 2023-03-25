import { useSelector } from "react-redux";
import { currentUserSelector } from "../../store/user/user.selector";
import Signin from "../Signin/Signin";
import SignUp from "../Signup/Signup";

const Auth = () => {
  const currentUser = useSelector(currentUserSelector);

  console.log(currentUser);

  return (
    <>
        {!currentUser ?
         <SignUp /> :
         <Signin />}
    </>
  );
};

export default Auth;
