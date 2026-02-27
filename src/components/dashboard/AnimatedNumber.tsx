import { useEffect, useState } from "react";

interface Props {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export default function AnimatedNumber({
  value,
  duration = 800,
  prefix = "",
  suffix = "",
}: Props) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;

      if (start >= value) {
        setDisplay(value);
        clearInterval(counter);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
