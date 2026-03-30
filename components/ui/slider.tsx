"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-4 w-full grow overflow-hidden border-4 border-black bg-black">
      <SliderPrimitive.Range className="absolute h-full bg-[#ffde59]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block size-6 cursor-pointer border-4 border-black bg-white shadow-[2px_2px_0px_#000] transition-all hover:shadow-[3px_3px_0px_#000] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#4d79ff] disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
