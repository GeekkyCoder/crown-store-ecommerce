(self.webpackChunkclient=self.webpackChunkclient||[]).push([[585],{3332:function(e,r,a){"use strict";a(2791);r.Z=a.p+"static/media/crown.207ae289b221bfaca0108507f9bb2f85.svg"},492:function(e,r,a){"use strict";a.d(r,{J:function(){return l},d:function(){return d}});var s=a(6727),t=s.object,n=s.string,o=s.ref,l=(s.number,t({displayName:n().min(2).max(20).required("plz provide your username"),email:n().email().required("plz provide your email address"),password:n().min(6).max(8).required(),confirmPassword:n().oneOf([o("password")])})),d=t({email:n().email().required("plz provide your email address"),password:n().required()})},5585:function(e,r,a){"use strict";a.r(r);var s=a(4165),t=a(5861),n=a(5705),o=a(9434),l=a(7689),d=a(1087),i=a(492),u=a(7412),c=a(3332),p=a(1243),m=a(184);r.default=function(){var e=(0,o.I0)(),r=(0,l.s0)(),a=(0,n.TA)({initialValues:{email:"",password:""},validationSchema:i.d,onSubmit:function(){var a=(0,t.Z)((0,s.Z)().mark((function a(t,n){var o,l;return(0,s.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,p.Z.post("http://localhost:8000/auth/login",{email:t.email,password:t.password});case 3:o=a.sent,l=o.data,e((0,u.FETCH_USER_SUCCESS)(l)),r("/shop"),a.next=19;break;case 9:a.prev=9,a.t0=a.catch(0),a.t1=a.t0.code,a.next="auth/user-not-found"===a.t1?14:"auth/wrong-password"===a.t1?16:18;break;case 14:return alert("user does not exist plz sign up first"),a.abrupt("break",19);case 16:return alert("wrong password"),a.abrupt("break",19);case 18:console.log(a.t0);case 19:n.resetForm();case 20:case"end":return a.stop()}}),a,null,[[0,9]])})));return function(e,r){return a.apply(this,arguments)}}()});return(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)("div",{className:"flex font-sans flex-col  w-[90%] md:w-[35%] justify-between items-center mx-auto border-2 border-gray-200 p-4 shadow-lg rounded-sm mt-10 text-sm",children:[(0,m.jsx)("div",{className:"logo",children:(0,m.jsx)("img",{src:c.Z,alt:"crown-logo"})}),(0,m.jsx)("h1",{className:"font-sans  font-bold uppercase text-xs md:text-2xl tracking-wide leading-3 my-10",children:"Sign in to your account"}),(0,m.jsxs)("form",{className:"flex  w-full flex-col items-center ",onSubmit:a.handleSubmit,children:[(0,m.jsx)("input",{className:"border-2 border-sky-200 w-full p-2 my-2 rounded-md font-mono placeholder-gray-600",id:"email",name:"email",type:"email",placeholder:"email",onChange:a.handleChange,onBlur:a.handleBlur,value:a.values.email}),a.touched.email&&a.errors.email?(0,m.jsx)("div",{className:"text-red-700 uppercase font-bold",children:a.errors.email}):null,(0,m.jsx)("input",{className:"border-2 border-sky-200 w-full p-2 my-2 rounded-md font-mono focus:border-black placeholder-gray-600",id:"password",name:"password",type:"password",placeholder:"password",onChange:a.handleChange,onBlur:a.handleBlur,value:a.values.password}),a.touched.password&&a.errors.password?(0,m.jsx)("div",{className:"text-red-700 uppercase font-bold",children:a.errors.password}):null,(0,m.jsxs)("p",{className:"font-sans  mt-5 font-bold text-gray-800 uppercase",children:["dont have an account ?",(0,m.jsx)(d.rU,{className:"ml-2 text-orange-500 hover:text-gray-700 ",to:"/auth",children:"sign up"})]}),(0,m.jsx)("button",{className:"bg-black mt-5 text-white border-2 border-gray-400 hover:bg-white hover:text-black p-2 rounded-md font-sans uppercase font-bold w-[80%] md:w-[50%] transition-colors  ease-in duration-75 ",type:"submit",children:"sign in"})]})]})})}},7412:function(e,r,a){var s=a(6641);e.exports={FETCH_USER_START:function(){return{type:s.SET_USER_START}},FETCH_USER_SUCCESS:function(e){return{type:s.SET_USER_SUCCESS,payload:e}},FETCH_USER_FAILED:function(e){return{type:s.SET_USER_FAILED,payload:e}},SET_USER_LOGOUT:function(){return{type:s.SET_USER_LOGOUT}}}}}]);
//# sourceMappingURL=585.7aa3f4a5.chunk.js.map