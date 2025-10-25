import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { screenShake } from "../utils/screen-shake.utils";
import { usePageMeta } from "@/contexts/PageMetaContext";
import { useEffect } from 'react';

export const Route = createFileRoute('/beta')({
  component: RouteComponent,
})

function RouteComponent() {
  const { setPageMeta } = usePageMeta();
  
    useEffect(() => {
      setPageMeta({title:'Beta',
  subtitle:'Beta'
  });
    }, []);
  return    <>
       <section className="flex flex-wrap gap-4">
        <Link target="_blank" to="http://localhost:3000/api/auth/discord/login">
          <Button>Login with Discord</Button>
        </Link>
      </section>
    </>
}
