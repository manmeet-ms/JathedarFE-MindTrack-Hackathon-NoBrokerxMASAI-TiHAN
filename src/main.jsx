// import Negatives from '@/pages/messages-notes/Negatives.jsx'
// import Positives from '@/pages/messages-notes/Positives.jsx'
 

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { PageMetaProvider } from "@/contexts/PageMetaContext.jsx";
 
import store from "@/store/store.js";
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { Suspense, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import { routeTree } from './routeTree.gen.ts';

import NotFound from "./components/NotFound.jsx";
import "./index.css";
import { fetchUser } from "./store/authSlice.js";

  
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultNotFoundComponent:NotFound
})

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       { index: true, element: <Dashboard /> },
//       { path: "settings", element: <Settings /> },
//       { path: "agreement", element: <Agreement /> },
//       { path: "chronos", element: <Chronos /> },
//       { path: "violations", element: <ViolationsLogsFull /> },
//       { path: "analytics", element: <Analytics /> },
//       { path: "urges", element: <Urges /> },
//       { path: "timeline", element: <HourlyCheckInTimeline /> },

//       { path: "leaderboard", element: <Leaderboard /> },
//       { path: "beta", element: <Beta /> },
//     ],
//   },
//   {
//     path: "login",
//     element: <Login />,
//   },
//   {
//     path: "register",
//     element: <Philosophy />,
//   },
//   {
//     path: "philosophy",
//     element: <Philosophy />,
//   },
//   {
//     path: "about",
//     element: <About />,
//   },
//   {
//     path: "contact",
//     element: <Contact />,
//   },
//   {
//     path: "landing",
//     element: <Landing />,
//   },
//   { path: "*", element: <NotFound404 /> },
// ]);
function AppInit() {
  const dispatch = useDispatch();
  // run auth check once on app init
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <PageMetaProvider>
          <RouterProvider router={router}></RouterProvider>
           <AppInit />
          <Toaster />
        </PageMetaProvider>
      </ThemeProvider>
    </Suspense>
  </Provider>
);

if ("serviceWorker" in navigator && "PushManager" in window) {
  window.addEventListener("load", async () => {
    try {
        await navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("Service worker registered", reg))
        .catch((err) => console.error("Service worker registration failed", err));
    } catch (err) {
      console.error("Service worker registration failed:", err);
    }
  });
}
