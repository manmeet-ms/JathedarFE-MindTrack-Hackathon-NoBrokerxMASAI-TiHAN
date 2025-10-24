import React from 'react'
import { usePageMeta } from "@/contexts/PageMetaContext";

const Settings = () => {
   const { setPageMeta } = usePageMeta();

  useEffect(() => {
    setPageMeta({title:'Settings',
subtitle:'Configuration and User Preferences'});
  }, []);
  
  return (
    <div>Settings</div>
  )
}

export default Settings