import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import "./App.css";
import {
  calculateGasValue,
  GasRequest,
  GasScore,
  GasType,
} from "./calculator/calculator";
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
  const [gasRequests, setGasRequests] = useState<GasRequest[]>([]);
  const [gasTypes, setGasTypes] = useState<GasType[]>(["E85", "87"]);
  const [calculatedValue, setCalculatedValue] = useState<GasScore[]>();
  const onChange = (request: GasRequest) => {
    let found = false;
    const newValue = gasRequests.map((currentValue) => {
      if (currentValue.type === request.type) {
        found = true;
        return request;
      }
      return currentValue;
    });
    if (!found) {
      newValue.push(request);
    }
    setGasRequests(newValue);
  };

  const onGasTypeChange = (priorType: GasType, newValue: GasType) => {
    setGasRequests(
      gasRequests.map((value) => {
        if (value.type === priorType) {
          return { ...value, type: newValue };
        }
        return value;
      })
    );
  };

  const handleCalculate = () => {
    setCalculatedValue(calculateGasValue(gasRequests));
  };

  return (
    <MainLayout>
      {gasTypes.map((input) => {
        return (
          <GasInput
            key={input}
            initGasType={input}
            onPriceOrMpgChange={onChange}
            onGasTypeChange={onGasTypeChange}
          />
        );
      })}
      <Button variant="outlined" onClick={handleCalculate}>
        Calculate
      </Button>
      <Grid container spacing={2}>
        {calculatedValue?.map((value, index) => {
          return (
            <GasRecommendation
              key={value.type}
              rank={index + 1}
              score={value.score}
              gasType={value.type}
              spacing={12 / calculatedValue.length}
            />
          );
        })}
      </Grid>
    </MainLayout>
  );
}
