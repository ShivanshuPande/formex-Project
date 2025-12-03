// SearchBox.tsx
"use client";

import { Input } from "@/components/ui/input"; // shadcn Input
import { Button } from "@/components/ui/button"; // shadcn Button (optional)
import { Paperclip, Globe, ArrowUp, CircleDashed } from "lucide-react"; // or any icon lib

export default function SearchBox() {
  return (
    <div className="max-w-[720px] mx-4">
      {/* outer rounded container */}
      <div className="rounded-xl border border-neutral-700 bg-[#0b0b0b] p-3">
        {/* top row: 'Add context' pill */}
        <div className="flex items-start gap-3">
          <button
            type="button"
            className="px-3 py-1 rounded-full bg-neutral-800 text-sm text-neutral-300 hover:bg-neutral-700"
          >
            <span className="inline-flex items-center gap-2">
              <CircleDashed className="w-4 h-4" />
              Added context
            </span>
          </button>
        </div>

        {/* main input area */}
        <div className="mt-3 flex items-center gap-3">
          {/* input - make it full width */}
          <div className="flex-1">
            {/* Use shadcn Input or a plain input */}
            <Input
              placeholder="Ask, search, or make anything..."
              className="bg-transparent text-neutral-200 placeholder:text-neutral-400 border-none focus:ring-0"
            />
          </div>

          {/* paperclip icon */}
          <button
            type="button"
            aria-label="attach"
            className="p-2 rounded-md hover:bg-neutral-800/40"
          >
            <Paperclip className="w-5 h-5 text-neutral-400" />
          </button>
        </div>

        {/* footer row: left helpers + right send button */}
        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-3 text-neutral-400">
            {/* Auto badge */}
            <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-neutral-900 text-neutral-300">
              Auto
            </div>

            {/* All Sources with globe icon */}
            <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-neutral-900 text-neutral-300">
              <Globe className="w-4 h-4" />
              All Sources
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="w-10 h-10 rounded-full bg-white/6 flex items-center justify-center hover:scale-[1.03] transition"
              aria-label="send"
            >
              <ArrowUp className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
