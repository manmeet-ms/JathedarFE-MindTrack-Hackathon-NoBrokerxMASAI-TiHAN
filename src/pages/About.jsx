import React from 'react'
import { usePageMeta } from "@/contexts/PageMetaContext";

const About = () => {
   const { setPageMeta } = usePageMeta();

  useEffect(() => {
    setPageMeta({title:'About',
subtitle:'Information on Purpose and Context of the App'
});
  }, []);
  
  return (
    <div>About</div>
  )
}

export default About