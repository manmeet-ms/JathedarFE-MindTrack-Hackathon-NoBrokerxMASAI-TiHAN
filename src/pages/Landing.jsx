import React, { useEffect } from "react";
import { Hero3 } from "@/components/hero3.tsx";
import { Hero78 } from "@/components/hero78.tsx";
import { AppHeader } from "@/components/Header/AppHeader";
import { usePageMeta } from "@/contexts/PageMetaContext";

const Landing = () => {
const { setPageMeta } = usePageMeta();

  useEffect(() => {
    setPageMeta({title:'Landing'
,subtitle:''
});
  }, []);  
  return (
    <>
      <AppHeader />
      <main className="px-4">
        <Hero3 />
      </main>
    </>
  );
};

export default Landing;
