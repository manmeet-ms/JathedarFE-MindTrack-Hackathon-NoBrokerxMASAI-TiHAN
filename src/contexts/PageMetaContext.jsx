import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";
import { APP_NAME } from "../../shared/appVariables.shared";

const PageMetaContext = createContext();

export function PageMetaProvider({ children }) {
  const [meta, setMeta] = useState({ title: "Jathedar - Home", subtitle: `${dayjs().format('DD MMM, YYYY HH:mm a')}` });

  // Also update document.title
  const setPageMeta = ({ title, subtitle }) => {
    setMeta({ title, subtitle });
    if (title) document.title = `${APP_NAME} - ${title}`;
  };

  return (
    <PageMetaContext.Provider value={{ meta, setPageMeta }}>
      {children}
    </PageMetaContext.Provider>
  );
}

export function usePageMeta() {
  return useContext(PageMetaContext);
}