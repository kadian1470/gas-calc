import { debounce } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { GasRequest, GasType } from "../calculator/calculator";
import { Row } from "./Flex";

const fuelTypes = ["87", "89", "93", "E15", "E85"];

export type GasInputProps = Readonly<{
  onGasTypeChange: (priorGasType: GasType, gasType: GasType) => void;
  onPriceOrMpgChange: (request: GasRequest) => void;
  initGasType: GasType;
}>;

export default function GasInput({
  onGasTypeChange,
  onPriceOrMpgChange,
  initGasType,
}: GasInputProps) {
  const [gasType, setGasType] = useState<GasType>(initGasType);
  const [price, setPrice] = useState<string | null>("");
  const [mpg, setMpg] = useState<string | null>("");
  useEffect(
    () =>
      debounce((): void => {
        if (price && gasType && mpg) {
          onPriceOrMpgChange({
            type: gasType,
            price: Number(price),
            mpg: Number(mpg),
          });
        }
      }, 400),
    [price, gasType, mpg, onPriceOrMpgChange]
  );

  return (
    <Row>
      <Autocomplete
        className="flex-1"
        onChange={(event: any, newValue: string | null) => {
          if (newValue) {
            onGasTypeChange(gasType, newValue as GasType);
            setGasType(newValue as GasType);
          }
        }}
        value={gasType}
        disablePortal
        options={fuelTypes}
        renderInput={(params) => <TextField {...params} label="Gas type" />}
      />
      <TextField
        className="flex-1"
        label="Price per Gallon"
        variant="outlined"
        value={price}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPrice(event.target.value);
        }}
      />
      <TextField
        className="flex-1"
        label="MPG"
        variant="outlined"
        value={mpg}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMpg(event.target.value);
        }}
      />
    </Row>
  );
}
