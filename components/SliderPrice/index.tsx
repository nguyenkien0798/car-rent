/* eslint-disable @typescript-eslint/no-explicit-any */
import { Slider } from "@mui/material";
import { useSearchParams } from "next/navigation";

const SliderPrice = ({
  min,
  max,
  handleChangeCommited,
  defaultValue
}: {
  min?: number;
  max?: number;
  handleChangeCommited: (
    e: React.SyntheticEvent | Event,
    newValue: any
  ) => void;
  defaultValue: number
}) => {
  const searchParams = useSearchParams();
  const max_price = searchParams.get("max_price");

  return (
    <Slider
      sx={{
        "&.MuiSlider-root": {
          height: {md: "12px", xs: "8px"},
          color: "#3563E9",
        },
      }}
      defaultValue={max_price ? +max_price : defaultValue}
      step={1}
      min={min}
      max={max}
      valueLabelDisplay="auto"
      onChangeCommitted={(e, newValue) => handleChangeCommited(e, newValue)}
    />
  );
};

export default SliderPrice;
