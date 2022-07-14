import { GasType } from "../calculator/calculator";
import { Row } from "./Flex";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";

const Text = styled(Row)`
  font-size: 20px;
  align-self: center;
`;

export type GasRecommendationProps = Readonly<{
  score: number;
  gasType: GasType;
  rank: number;
  spacing: number;
}>;

export default function GasRecommendation({
  rank,
  gasType,
  score,
  spacing,
}: GasRecommendationProps) {
  console.log(spacing);
  return (
    <Grid item xs={spacing >= 1 ? Math.floor(spacing) : 1}>
      <Text>Type: {gasType}</Text>
      <Text>Rank: {rank}</Text>
      <Text>Miles Per Dollar: {score}</Text>
    </Grid>
  );
}
