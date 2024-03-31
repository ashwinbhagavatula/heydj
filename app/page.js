import { Major_Mono_Display } from "next/font/google" 

const major = Major_Mono_Display({subsets:["latin"], variable:'--font-major', weight:'400'});


export default function Home() {
  return (
      <main className="h-full">
        <div className="landing-screen">
          <h1 className={`${major.className} text-5xl md:text-7xl text-accent flex justify-center items-center mx-auto mt-32 md:mt-20`}>HeyDJ</h1>
          <h2 className="flex justify-center items-center mx-auto text-white text-2xl font-semibold mt-24 md:mt-12 px-10 text-center">Never feel disconnected from the crowd again </h2>
          <div className="flex flex-col gap-10 text-white text-lg my-32 px-4">
            <div className="flex md:gap-10 gap-4 justify-center items-center mx-auto">
              <div className="bg-red-400 w-20 h-20 rounded-3xl"></div>
              <p className="max-w-xs">Create a music queue to know your crowd’s favourites</p>
            </div>
            <div className="flex md:gap-10 gap-4 justify-center items-center mx-auto">
              <div className="bg-green-400 w-20 h-20 rounded-3xl"></div>
              <p className="max-w-xs">Create a music queue to know your crowd’s favourites</p>
            </div>
            <div className="flex md:gap-10 gap-4 justify-center items-center mx-auto">
              <div className="bg-blue-400 w-20 h-20 rounded-3xl"></div>
              <p className="max-w-xs">Create a music queue to know your crowd’s favourites</p>
            </div>
          </div>
        </div>

      </main>
  );
}
