type APIResponse = MonthlyData[] | AnnualData[];

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

interface CompleteData extends Data {
  monthVals: number[];
  annualData: number;
}

export interface ClimateData {
  precipData: CompleteData;
  tempData: CompleteData;
}

const getData = async (
  interval: string,
  type: string,
  start: number,
  end: number,
  country: string
): Promise<APIResponse> => {
  const response = await fetch(
    `http://climatedataapi.worldbank.org/climateweb/rest/v1/country/${interval}/${type}/${start}/${end}/${country}`
  );

  const data: APIResponse = ((await (
    await response
  ).json()) as unknown) as APIResponse;

  return data;
};

export const getClimateData = async (
  start: number,
  end: number,
  country: string
): Promise<ClimateData> => {
  const monthlyPrecip: MonthlyData[] = 
    await getData('mavg', 'pr', 1980, 1999, 'usa') as MonthlyData[];
  const annualPrecip: AnnualData[] = 
    await getData('annualavg', 'pr', 1980, 1999, 'usa') as AnnualData[];
  
  const precipData: CompleteData = {
    ...monthlyPrecip[0],
    annualData: annualPrecip[0].annualData[0],
  };

  const monthlyTemp: MonthlyData[] = 
    await getData('mavg', 'tas', 1980, 1999, 'usa') as MonthlyData[];
  const annualTemp: AnnualData[] = 
    await getData('annualavg', 'tas', 1980, 1999, 'usa') as AnnualData[];
  
  const tempData: CompleteData = {
    ...monthlyTemp[0],
    annualData: annualTemp[0].annualData[0],
  }

  return { precipData, tempData };
};
