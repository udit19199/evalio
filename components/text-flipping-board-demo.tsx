import { TextFlippingBoard } from "@/components/ui/text-flipping-board";

type TextFlippingBoardDemoProps = {
  text?: string;
};

export default function TextFlippingBoardDemo({
  text = "WHAT DO YOU WANT TO LEARN NEXT",
}: TextFlippingBoardDemoProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        EVALIO
      </h1>
      <TextFlippingBoard text={text} className="w-full max-w-4xl" />
    </div>
  );
}
