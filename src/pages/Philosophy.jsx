import React from 'react'
 import { usePageMeta } from "@/contexts/PageMetaContext";

const Philosophy = () => {
   const { setPageMeta } = usePageMeta();

  useEffect(() => {
    setPageMeta({title:'Philosophy',
subtitle:'Foundational Ideas and Principles od the App'
});
  }, []);
  return (
    
   <>
   
        ### Philosophy
**dsfkjhk**
    </>

    
  )
}

export default Philosophy