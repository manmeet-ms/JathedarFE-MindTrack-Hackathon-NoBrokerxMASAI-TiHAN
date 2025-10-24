import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getRandomQuoteSrv } from "../services/philosopher-quote.service.js";

import { useEffect, useState } from "react";
import { DotIcon } from "lucide-react";

export const PhilosophyQuoteCard = () => {
  const [randomQuote, setRandomQuote] = useState({
    _id: "68a5f37930a157584651168f",
    philosopher: {
      name: "📡 Foucault",
      iconUrl:
        "https://monoskop.org/images/thumb/8/8a/Michel_Foucault_late_1950s.jpg/350px-Michel_Foucault_late_1950s.jpg",
      coverUrl: "",
      qualities: ["surveillance", "control"],
    },
    quotes: [
      // "Knowledge is not for knowing: knowledge is for cutting.",
      // "Where there is power, there is resistance.",
      // "The soul is the prison of the body.",
      // "Visibility is a trap.",
      // "The judges of normality are present everywhere.",
      // "Freedom is the ontological condition of ethics.",
      // "Do not ask who I am and do not ask me to remain the same.",
      "People know what they do; frequently they know why they do what they do; but what they don’t know is what what they do does.",
      "Power is not an institution, and not a structure; neither is it a certain strength we are endowed with; it is the name that one attributes to a complex strategical situation in a particular society.",
      // "The individual is the product of power."
    ],
    __v: 0,
  });
  const fetchRandom = async () => {
    await getRandomQuoteSrv().then((res) => setRandomQuote(res.data[0]));
  };

  useEffect(() => {
    fetchRandom();
  }, []);
  // console.log("fetchRandom randomQuote ", randomQuote);

  // const randomQuote =
  //   quoteDataFe[Math.floor(Math.random() * quoteDataFe.length)];
  return (
    <>
      <Card>
        <CardHeader>
          <section className="flex items-center justify-start gap-2">
            {" "}
            <img className="grayscale size-12 rounded-full object-cover object-center" src={randomQuote?.philosopher?.iconUrl} alt={randomQuote?.philosopher?.name} />
            
            <div className="flex flex-col gap-2">
              <CardTitle>

                {randomQuote?.philosopher?.name || "Philosopher"}
                </CardTitle>
              <CardDescription className="text- accent-foreground opacity-60" >
                 {randomQuote?.philosopher.qualities
            ? randomQuote.philosopher.qualities.map((u, idx) => (
                <span
                  key={idx}
                  className={`rounded-full text-sm font-medium capitalize`}>
                  {u}               {idx+1<randomQuote.philosopher.qualities.length  && <DotIcon className="-mx-1 opacity-50 inline-flex"/>}
                  
                </span>
              ))
            : null}
              </CardDescription>
            </div>
          </section>
        </CardHeader>
        {/* <Separator /> */}
        <CardContent>
          <p className="text-md -mt-3 font-mono tracking-tight italic">
            
            {randomQuote?.quotes[
              Math.floor(Math.random() * randomQuote.quotes.length)
            ] || "Quotes"}
            
          </p>
        </CardContent>
        {/* <CardFooter>
          {randomQuote?.philosopher.qualities
            ? randomQuote.philosopher.qualities.map((u, idx) => (
                <span
                  key={idx}
                  className={`bg-primary/10 text-primary mr-1 rounded-full px-3 py-1 text-sm font-medium capitalize`}>
                  {u}
                  
                </span>
              ))
            : null}
        </CardFooter> */}
      </Card>
    </>
  );
};
