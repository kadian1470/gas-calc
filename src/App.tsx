import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { useState } from "react";
import "./App.css";
import {
  calculateGasValue,
  GasRequest,
  GasType,
} from "./calculator/calculator";
import { Row } from "./components/Flex";
import GasInput from "./components/GasInput";
import GasRecommendation from "./components/GasRecommendation";

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 10px;
  margin-right: 10px;
  gap: 10px;
`;

export default function App() {
  const [gasInputs, setGasInputs] = useState<GasRequest[]>([]);
  const [calculatedValue, setCalculatedValue] = useState<GasRequest[]>();
  const onChange = (request: GasRequest) => {
    let found = false;
    const newValue = gasInputs.map((currentValue) => {
      if (currentValue.type === request.type) {
        found = true;
        return request;
      }
      return currentValue;
    });
    if (!found) {
      newValue.push(request);
    }
    setGasInputs(newValue);
  };

  const onGasTypeChange = (priorType: GasType, newValue: GasType) => {
    setGasInputs(
      gasInputs.map((value) => {
        if (value.type === priorType) {
          return { ...value, type: newValue };
        }
        return value;
      })
    );
  };

  const handleCalculate = () => {
    setCalculatedValue(calculateGasValue(gasInputs));
  };

  return (
    <MainLayout>
      <GasInput
        initGasType={"87"}
        onPriceOrMpgChange={onChange}
        onGasTypeChange={onGasTypeChange}
      />
      <GasInput
        initGasType={"89"}
        onPriceOrMpgChange={onChange}
        onGasTypeChange={onGasTypeChange}
      />
      <GasInput
        initGasType={"93"}
        onPriceOrMpgChange={onChange}
        onGasTypeChange={onGasTypeChange}
      />
      <Button variant="outlined" onClick={handleCalculate}>
        Calculate
      </Button>
      <Row>
        {calculatedValue?.map((value) => {
          return (
            <GasRecommendation
              key={value.type}
              ranking={value.price}
              gasType={value.type}
            />
          );
        })}
      </Row>
    </MainLayout>
  );
}
