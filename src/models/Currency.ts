export interface IDenomination {
   value: number;
   count: number;
}

export type TDenomination = Map<number, IDenomination>;

interface ICurrencyList {
   values: number[]
   symbols: {
      integer: "$"
      decimal: "¢"
   }
}

const initialData: ICurrencyList = {
   values: [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 50, 100],
   symbols: {
      integer: "$",
      decimal: "¢"
   }
}

export const MULTIPLIER = 1 / Math.min(...initialData.values)

export const Currency = (data: ICurrencyList = initialData, multiplier: number = MULTIPLIER) => {
   const values = [...data.values].sort((a, b) => a - b) 
   // const multiplier = 1 / values[0]
   
   const formatView = (value: number): string => {
      if (value >= 1)
         return `${value}${data.symbols.integer}`
      
      return `${value * multiplier}${data.symbols.decimal}`
   }
   const getList = (): Array<[string, number]> => {
      return values.map(value => [formatView(value), value * multiplier])
   }
   
   return {getList}
}
