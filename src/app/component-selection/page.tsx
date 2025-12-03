  import ComponentCard from "../components/ui/componentCard";
  import { FlipWords } from "../components/ui/TextContainer";

  export default function Page() {
    return <main className="text-white min-h-screen bg-black relative overflow-hidden"> 
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <div
            className="w-full h-full opacity-45"
            style={{
              backgroundImage: [
                "radial-gradient(circle at center, rgba(94,234,212,0.35) 1px, transparent 1px)",
                "linear-gradient(rgba(15,23,42,0.35) 1px, transparent 1px)",
                "linear-gradient(90deg, rgba(15,23,42,0.35) 1px, transparent 1px)",
              ].join(", "),
              backgroundSize: "24px 24px, 120px 120px, 120px 120px",
              backgroundPosition: "0 0, 0 0, 0 0",
            }}
          />
        </div>
    <div className="flex flex-col items-center  h-screen">

      <div className="m-40 ">
        <span className="text-5xl flex items-center">Select Your Component<br></br></span>
        <span className="flex items-center justify-center text-center pt-3 text-2xl">Get your own{""}<FlipWords words={["parameters" , "dimension" , "types"]}/>to life</span>
      </div>
      <div className="flex flex-row items-center justify-around  w-350 z-10">
        <ComponentCard src="/assets/Screw.png" name="Screw" meta="Screw" href="/"/>
        <ComponentCard src="/assets/washer.png" name="washer" meta="Washer" href="/"/>
        <ComponentCard src="/assets/Bolt.png" name="Bolt" meta="Bolt" href="/"/>
        <ComponentCard src="/assets/Nut.png" name="Nut" meta="Nut" href="/"/>
      </div>

    
    </div>;
    </main>
  }