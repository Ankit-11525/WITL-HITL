

import Image from "next/image";
import Header from "@/components/Header";
import HeroForm from "@/components/forms/HeroForm";
export default function Home() {
  return (
    <main >
      <section className=" pt-[10vh]  ">
        <div className="mb-8 max-w-md">
          <h1 className="text-6xl font-bold">
            Your one link <br/> for everything
          </h1>
          <h2 className="text-gray-500 mt-6">
            Share your links, social profiles, contact info and more on one page
          </h2>
        </div>
        <HeroForm/>

      </section>


    </main>
    
  );
}
