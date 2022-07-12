import { GasType } from "../calculator/calculator";
import StarIcon from "@mui/icons-material/Star";
import { Row } from "./Flex";
import styled from "@emotion/styled";

const Text = styled(Row)`
  font-size: 20px;
  align-self: center;
`;

export type GasRecommendationProps = Readonly<{
  ranking: number;
  gasType: GasType;
}>;
const getColor = (rank: number) => {
  if (rank > 1) return "success";
  if (rank === 1) return "action";
  return "disabled";
};
export default function GasRecommendation({
  ranking,
  gasType,
}: GasRecommendationProps) {
  return (
    <Row>
      <StarIcon fontSize="large" color={getColor(ranking)} />
      <Text>{gasType}</Text>
    </Row>
  );
}
