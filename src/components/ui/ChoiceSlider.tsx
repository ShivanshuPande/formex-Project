"use client"

import React from "react"
import { Slider } from "@/components/ui/slider"

interface ChoiceSliderProps {
  slider1: string
  slider2: string
  slider3: string
}

export default function ChoiceSlider({
  slider1,
  slider2,
  slider3,
}: ChoiceSliderProps) {
  const sliders = [slider1, slider2, slider3]

  return (
    <div className="m-2 pt-5 pb-10 w-90 flex flex-col items-center justify-center gap-4 rounded-3xl bg-neutral-900 border border-neutral-700">
      <div className="text-lg text-neutral-400 text-center">
        Dimensions
      </div>
      <div className="w-full flex flex-col gap-4 ">
        {sliders.map((label, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <span className="text-sm text-neutral-300 text-center">
              {label}
            </span>
            <Slider
              className="w-full max-w-xs [&_[data-slot=slider-range]]:bg-white"
              defaultValue={[25]}
              min={0}
              max={50}
            />
          </div>
        ))}
      </div>
    </div>
  )
}