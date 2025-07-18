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
  isDisabledBool: boolean;
}

export default function TempChoose({
  template,
  onchange,
  isDisabledBool,
}: TempChooseProps) {
  const templates = [
    { name: "default", img: "/default.png", title: "Default" },
    { name: "templateOne", img: "/templateOne.png", title: "Template 1" },
  ];
  const premiumTemplates = [
    { name: "templateTwo", img: "/premiumOne.png", title: "Premium 1" },
  ];
  const isDisabled = isDisabledBool; // Replace with actual logic to determine if the button should be disabled
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
        className="templateChooseScroll w-[240px] sm:w-[350px] h-[200px] overflow-hidden dark:bg-black overflow-y-auto rounded-md p-3"
      >
        <div className="">
          {/* Normal templates */}
          <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 ">
            {templates.map((temp, index) => {
              return (
                <div
                  className={cn(
                    "relative cursor-pointer shadow-md",
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
                  <span className="text-xs line-clamp-1 my-1">
                    {temp.title}
                  </span>
                </div>
              );
            })}
          </div>
          {/* premium templates */}
          <h3 className="text-center mt-0.5">Premium templates</h3>
          <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 mt-2">
            {premiumTemplates.map((temp, index) => {
              return (
                <div
                  className={cn(
                    "relative cursor-pointer shadow-md",
                    template === temp.name && "text-blue-500"
                  )}
                  key={index}
                  onClick={() => (isDisabled ? null : onchange(temp.name))}
                >
                  <div
                    className={cn(
                      "relative cursor-pointer w-[100px] h-[151px]",
                      template === temp.name && "text-blue-500"
                    )}
                    key={index}
                    onClick={() => (isDisabled ? null : onchange(temp.name))}
                  >
                    <Image
                      src={isDisabled ? "/hazyBlur.jpg" : temp.img}
                      alt={"template image"}
                      className="object-cover"
                      fill
                    />
                  </div>
                  <span className="text-xs line-clamp-1 my-1">
                    {temp.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
