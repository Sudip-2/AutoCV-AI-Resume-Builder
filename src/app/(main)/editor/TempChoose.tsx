import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { LayoutTemplate } from "lucide-react";
import Image from "next/image";

interface TempChooseProps {
  template: string | undefined;
  onchange: (design: string) => void;
}

export default function TempChoose({ template, onchange }: TempChooseProps) {
  let templates = [
    { name: "default", img: "/default.png" },
    { name: "templateOne", img: "/templateOne.png" },
  ];
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          title="Color picker for resume"
          className="border-2"
        >
          <LayoutTemplate className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className="templateChooseScroll w-[240px] sm:w-[350px] h-[200px] overflow-hidden overflow-y-auto bg-black rounded-md p-3"
      >
        <div className="">
          {/* Normal templates */}
          <div className="gap-3 grid grid-cols-2 sm:grid-cols-3">
            {templates.map((temp, index) => {
              return (
                <div
                  className={cn(
                    "relative cursor-pointer",
                    template === temp.name && "text-blue-500"
                  )}
                  key={index}
                  onClick={() => onchange(temp.name)}
                >
                  <div
                    className={cn(
                      "relative cursor-pointer w-[100px] h-[151px]",
                      template === temp.name && "text-blue-500"
                    )}
                    key={index}
                    onClick={() => onchange(temp.name)}
                  >
                    <Image
                      src={temp.img}
                      alt={"template image"}
                      className="object-cover"
                      fill
                    />
                  </div>
                  <span className="text-xs line-clamp-1 my-1">{temp.name}</span>
                </div>
              );
            })}
          </div>
          {/* premium templates */}
          <h3 className="text-center">Premium templates</h3>
          <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 mt-2">
            {templates.map((temp, index) => {
              return (
                <div
                  className={cn(
                    "relative cursor-pointer",
                    template === temp.name && "text-blue-500"
                  )}
                  key={index}
                  onClick={() => onchange(temp.name)}
                >
                  <div
                    className={cn(
                      "relative cursor-pointer w-[100px] h-[151px]",
                      template === temp.name && "text-blue-500"
                    )}
                    key={index}
                    onClick={() => onchange(temp.name)}
                  >
                    <Image
                      src={temp.img}
                      alt={"template image"}
                      className="object-cover"
                      fill
                    />
                  </div>
                  <span className="text-xs line-clamp-1 my-1">{temp.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
