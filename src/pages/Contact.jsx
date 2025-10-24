import React from 'react'
import { usePageMeta } from "@/contexts/PageMetaContext";

const Contact = () => {
  
    const { setPageMeta } = usePageMeta();

  useEffect(() => {
    setPageMeta({title:'Contact',
subtitle:'Communication and Support Information'
});
  }, []);
 
  return (
    <div>Contact</div>
  )
}

export default Contact