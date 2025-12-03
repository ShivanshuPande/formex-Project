"use client"
import { Button } from "@/components/ui/button";
import ChoiceCard from "@/components/ui/ChoiceCard";
import ChoiceSlider from "@/components/ui/ChoiceSlider";

export default function Page(){
    return (
        <div className="bg-black grid grid-cols-24 h-screen ">
            <div className="col-span-5 pt-1 z-10">
                <ChoiceCard title="Choose Head" button1="Flat" button2="Pan" button3="Hex" button4="Socket"/>
                <ChoiceCard title="Choose Thread" button1="Wood" button2="Machine" button3="Sheet Metal" button4="Tek Screw"/>
                <ChoiceCard title="Choose Drive" button1="Phillips" button2="Slotted" button3="Allen" button4="Torx"/>
                <ChoiceSlider slider1="Overall Length" slider2="Thread Length" slider3="Pitch"/>
                <Button key={"Generate"} variant="outline" className={"ml-2 w-90 rounded-2xl text-xl text-white h-15 bg-neutral-900 border-neutral-700"} onClick={()=>{alert("Your parameteric 3D model is now being Built")}} >
                    Generate</Button>
            </div>

            {/* MINIMAL changes: add `relative overflow-hidden` so absolute background is confined here */}
            <div className="col-span-13 relative overflow-hidden flex flex-col-reverse">
                <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
                    <div
                    className="w-full h-full opacity-100"   /* lowered opacity so content is visible */
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

                 {/* Make this positioned so z-10 is honored and it appears above the dotted layer */}
                 
                    <div className="flex flex-row items-center justify-center">
                        <Button className="w-60 h-14 mb-4 bg-neutral-900 z-10" >Download STL<svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
                        </svg></Button>
                    </div>
                 
            </div>

            <div className="col-span-6 bg-blue-300 z-10"></div>

        </div>
    )
}
