// import { Button } from "@/components/ui/button"
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
//   } from "@/components/ui/dialog"
// import { useNavigate } from "@tanstack/react-router";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { toast } from "sonner";
// const ProtectedLayout = ({ children }) => {
//   const { user } = useSelector((state) => state.auth);
// const [modalState, setModalState] = useState(false)
//   // Show toast and redirect only if user is not logged in
//   useEffect(() => {
//     if (!user) {
//       toast("You have to be logged in to do that action");
//       setModalState(true)
//     }
//   }, [user]);
//   // Only render children if user is logged in
//   return user ? <>{children}</> : <>
//   <h1 className="capitalize text-[10rem] leading-24 font-extrabold " >You have to be logged in to do that ation </h1>
// <Dialog >
//   <DialogTrigger>Open</DialogTrigger>
//   <DialogContent>
//     <DialogHeader>
//       <DialogTitle>You have to be logged in to do that ation</DialogTitle>
//       <DialogDescription>
//         <Button>Login</Button>
//         <Button variant="secondary">Signup</Button>
//       </DialogDescription>
//     </DialogHeader>
//   </DialogContent>
// </Dialog>
//   </>;
// };
// export default ProtectedLayout;
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export const ProtectedLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Show toast and redirect only if user is not logged in
  const pathname = useLocation().pathname; // useLocation().pathname if React Router

  useEffect(() => {
    if (!user) {
      toast.error("You have to be logged in to do that action");
      // toast.warning("You have to be logged in to do that action");
      console.log(pathname);

      navigate({ to: "/auth/login" });
    } else if (user !== null && pathname === "/auth/login") {
      console.log(pathname, user !== null && pathname === "/auth/login");
      toast.success("You are already logged in. Navigating Home");

      navigate({ to: "/" }); 
    }
  }, [user, navigate,pathname]);   

  // Only render children if user is logged in
  return user ? <>{children}</> : null;
};

export default ProtectedLayout;

// import { Navigate, useNavigate } from "@tanstack/react-router";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { toast } from "sonner";

// const ProtectedLayout = ({ children }) => {
//   const { user } = useSelector((state) => state.auth);
//   console.log(user);
//     const navigate = useNavigate();

// useEffect(() => {
//     if (!user) {
//       toast("You have to be logged in to do that action");
//       navigate({ to: "/auth/login" });
//     }
//   }, [user, navigate]);

//   return <>{!user ? navigate({to:"/auth/login"}): children}</>;
// };

// export default ProtectedLayout;
