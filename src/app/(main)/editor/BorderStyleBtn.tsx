import { Button } from "@/components/ui/button";
import { Circle, Square, Squircle } from "lucide-react";

interface BorderStyleProps {
  borderStyle: string | undefined;
  onchange: (borderstyle: string) => void;
}

export const BorderStyles = {
  SQUARE: "square",
  CIRCLE: "circle",
  SQUIRCLE: "squircle",
};

const borderStyles = Object.values(BorderStyles);

const BorderStyleBtn = ({ borderStyle, onchange }: BorderStyleProps) => {
  function handleClick() {
    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    const nextIndex = (currentIndex + 1) % borderStyles.length;
    onchange(borderStyles[nextIndex]);
  }

  const Icon =
    borderStyle === "square"
      ? Square
      : borderStyle === "circle"
        ? Circle
        : Squircle;

  return (
    <Button
      variant="secondary"
      size="icon"
      title="Change border radius for resume"
      className="border-2"
      onClick={handleClick}
    >
      <Icon className="size-5" />
    </Button>
  );
};

export default BorderStyleBtn;
