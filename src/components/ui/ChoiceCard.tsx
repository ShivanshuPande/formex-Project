"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"

interface ChoiceCardProps {
  title: string
  button1: string
  button2: string
  button3: string
  button4: string
}

export default function ChoiceCard({
  title,
  button1,
  button2,
  button3,
  button4,
}: ChoiceCardProps) {
  const [selected, setSelected] = useState<number | null>(null)

  const buttons = [button1, button2, button3, button4]

  return (
    <div className="m-2 pt-8 pb-10 w-90 h-50 flex flex-col items-center justify-center gap-2 rounded-3xl bg-neutral-900 border-1 border-neutral-700">
      <div className="text-lg text-neutral-400 text-center px-4 pb-2">
        {title}
      </div>
      <div className="grid grid-cols-2  gap-6">
        {buttons.map((label, index) => {
          const isSelected = selected === index

          return (
            <Button
              key={index}
              variant="outline"
              className={`bg-neutral-700 w-30 h-12 text-white  rounded-xl border-1 transition-colors ${
                isSelected ? "border-neutral-400" : "border-neutral-700"
              }`}
              onClick={() => setSelected(index)}
            >
              {label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}