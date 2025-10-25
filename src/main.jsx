// import Negatives from '@/pages/messages-notes/Negatives.jsx'
// import Positives from '@/pages/messages-notes/Positives.jsx'
 

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { PageMetaProvider } from "@/contexts/PageMetaContext.jsx";
 
import store from "@/store/store.js";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'

import "./index.css";

  
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
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

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <PageMetaProvider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster />
        </PageMetaProvider>
      </ThemeProvider>
    </Suspense>
  </Provider>
);

if ("serviceWorker" in navigator && "PushManager" in window) {
  window.addEventListener("load", async () => {
    try {
      const reg = await navigator.serviceWorker
        .register("/sw.js", { type: "module" })
        .then((reg) => console.log("Service worker registered", reg))
        .catch((err) => console.error("Service worker registration failed", err));
    } catch (err) {
      console.error("Service worker registration failed:", err);
    }
  });
}
