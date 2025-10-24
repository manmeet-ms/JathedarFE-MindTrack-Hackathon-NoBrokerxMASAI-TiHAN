// import Negatives from '@/pages/messages-notes/Negatives.jsx'
// import Positives from '@/pages/messages-notes/Positives.jsx'
import Login from "@/components/Auth/Login.jsx";
import { ViolationsLogsFull } from "@/components/ViolationLogs.jsx";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { PageMetaProvider } from "@/contexts/PageMetaContext.jsx";
import Agreement from "@/pages/Agreement.jsx";
import Beta from "@/pages/Beta.jsx";
import Chronos from "@/pages/Chronos.jsx";
import Dashboard from "@/pages/Dashboard.jsx";
import Settings from "@/pages/Settings.jsx";
import Urges from "@/pages/Urges.jsx";
import store from "@/store/store.js";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./index.css";
import About from "./pages/About.jsx";
import Analytics from "./pages/Analytics.jsx";
import Contact from "./pages/Contact.jsx";
import HourlyCheckInTimeline from "./pages/HourlyCheckInTimeline.jsx";
import Landing from "./pages/Landing.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import NotFound404 from "./pages/NotFound404.jsx";
import Philosophy from "./pages/Philosophy.jsx";


//  logger("console.logomport.meta.env);

// console.log(
// VITE_BACKEND_URL = ${import.meta.env.VITE_BACKEND_URL.slice(0, 15)},
// MONGO_URI = ${import.meta.env.MONGO_URI.slice(0, 15)},
// VITE_DISCORD_WEBHOOK_URL = ${import.meta.env.VITE_DISCORD_WEBHOOK_URL.slice(0, 15)},
// `);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "settings", element: <Settings /> },
      { path: "agreement", element: <Agreement /> },
      { path: "chronos", element: <Chronos /> },
      { path: "violations", element: <ViolationsLogsFull /> },
      { path: "analytics", element: <Analytics /> },
      { path: "urges", element: <Urges /> },
      { path: "timeline", element: <HourlyCheckInTimeline /> },

      { path: "leaderboard", element: <Leaderboard /> },
      { path: "beta", element: <Beta /> },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Philosophy />,
  },
  {
    path: "philosophy",
    element: <Philosophy />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "landing",
    element: <Landing />,
  },
  { path: "*", element: <NotFound404 /> },
]);

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
