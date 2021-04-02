interface Data {
  gcm: string;
  variable: string;
  fromYear: number;
  toYear: number;
}

interface MonthlyData extends Data {
  monthVals: number[];
}

interface AnnualData extends Data {
  annualData: number[];
}

export interface ClimateData extends Data {
  monthVals: number[];
  annualData: number;
}

export const getPrecipData = async (
  start: number,
  end: number,
  country: string
): Promise<ClimateData> => {
  const monthlyResponse = await fetch(
    `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/mavg/pr/${start}/${end}/${country}`
  );

  const monthlyData: MonthlyData = ((
    await monthlyResponse
  ).json() as unknown) as MonthlyData;

  const annualResponse = await fetch(
    `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/annualavg/pr/${start}/${end}/${country}`
  );

  const annualData: AnnualData = ((
    await annualResponse
  ).json() as unknown) as AnnualData;

  return {
    ...monthlyData,
    annualData: annualData.annualData[0],
  };
};