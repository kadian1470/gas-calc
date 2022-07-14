export type GasType = "87" | "89" | "93" | "E15" | "E85";

export type GasRequest = Readonly<{
  type: GasType;
  price: number;
  mpg: number;
}>;

export type GasValue = Readonly<{ price: number; mpg: number }>;

export type GasScore = Readonly<{ score: number; type: GasType }>;

export const calculateGasValue = (lookup: GasRequest[]) => {
  // const mpgBase = lookup[0].mpg;
  // const priceBase = lookup[0].price;
  // const result: GasRequest[] = [];
  // lookup.forEach((value, index) => {
  //   if (index === 0) {
  //     result.push({
  //       type: value.type,
  //       price: 1,
  //       mpg: 1,
  //     });
  //   } else {
  //     const mpgRatio = value.mpg / mpgBase;
  //     const breakEvenPrice = priceBase * (value.mpg / mpgBase);
  //     result.push({
  //       type: value.type,
  //       mpg: mpgRatio,
  //       price: value.price / breakEvenPrice,
  //     });
  //   }
  // });
  const result: GasScore[] = lookup.map((value) => {
    return {
      type: value.type,
      score: value.mpg / value.price,
    };
  });
  console.log(result);
  return result.sort((a, b) => {
    return b.score - a.score;
  });
};
