import React, {createContext, useEffect, useState} from "react";
import {IProduct} from "../models/Product.ts";
import {PurchaseStatus} from "../models/PurchaseStatus.ts";
import {IDenomination, MULTIPLIER, TDenomination} from "../models/Currency.ts";


interface IMachineContext {
   purchaseStatus: PurchaseStatus
   currentProduct?: IProduct | null
   productAmount: number
   insertedMoney: {
      total: number
      denominations: TDenomination
   }
   insertMoney: (money: number) => void
   due: number | null
   change: IDenomination[]

   nextStep: () => void
   incrementProductAmount: () => void
   decrementProductAmount: () => void
   resetMachine: () => void
   selectProduct: (product: IProduct) => void
}

const initialData: IMachineContext = {
   purchaseStatus: PurchaseStatus.choosingProduct,
   currentProduct: null,
   productAmount: 1,
   insertedMoney: {
      total: 0,
      denominations: new Map()
   },
   due: null,
   change: [],
   insertMoney: function (money: number): void {
      throw new Error("Function not implemented.");
   },
   nextStep: function (): void {
      throw new Error("Function not implemented.");
   },
   incrementProductAmount: function (): void {
      throw new Error("Function not implemented.");
   },
   decrementProductAmount: function (): void {
      throw new Error("Function not implemented.");
   },
   resetMachine: function (): void {
      throw new Error("Function not implemented.");
   },
   selectProduct: function (product: IProduct): void {
      throw new Error("Function not implemented.");
   }
}

// ↓ контекст имеет 2 основых поля Provider & Consumer, какие данные предоставляются для внутренних компонентов
export const MachineContext = createContext<IMachineContext>(initialData)

// MachineState обертка для хранение локал стейтов 
export const MachineState = ({children}: { children: React.ReactNode }) => {
   const [state, setState] = useState(initialData);

   function nextStep() {
      let nextStatus: PurchaseStatus;

      if (state.purchaseStatus === PurchaseStatus.purchaseCompleted)
         nextStatus = PurchaseStatus.choosingProduct
      else
         nextStatus = state.purchaseStatus + 1

      setState(prev => ({...prev, purchaseStatus: nextStatus}))
   }

   function selectProduct (product: IProduct) {
      setState(prev => {
         const newProduct = state?.currentProduct?.id !== product.id;
         return ({
            ...prev,
            currentProduct: newProduct ? product : null,
            purchaseStatus: newProduct ? PurchaseStatus.choosingAmountOfProduct : PurchaseStatus.choosingProduct,
            productAmount: initialData.productAmount,
         });
      })
   }

   function incrementProductAmount() {
      if (state.productAmount === state.currentProduct?.amount)
         return

      setState(prev => ({
         ...prev,
         productAmount: prev.productAmount++
      }))
   }

   function decrementProductAmount() {
      if (state.productAmount === 1)
         return

      setState(prev => {
         return ({
            ...prev,
            productAmount: prev.productAmount - 1
         });
      })
   }

   // const generateDenominations = (money: number, prevState: IDenomination[]): IDenomination[] => {
   //    const matchingIndex = prevState.findIndex((item) => item.value === money);
   //   
   //    if (matchingIndex === -1) {
   //       return [...prevState, {value: money, count: 1}];
   //    }
   //
   //    const updatedArray = [...prevState];
   //    updatedArray[matchingIndex] = {
   //       ...updatedArray[matchingIndex],
   //       count: updatedArray[matchingIndex].count + 1,
   //    };
   //
   //    return updatedArray;
   // }

   const generateDenominations = (money: number, prevState: TDenomination): TDenomination => {
      if (prevState.has(money)) {
         const updatedDenomination = prevState.get(money);
         if (updatedDenomination) {
            const updatedMap = new Map(prevState);
            updatedMap.set(money, {
               value: updatedDenomination.value,
               count: updatedDenomination.count + 1,
            });
            return updatedMap;
         }
      } else {
         const newDenomination: IDenomination = {value: money, count: 1};
         const updatedMap = new Map(prevState);
         updatedMap.set(money, newDenomination);
         return updatedMap;
      }

      return prevState;
   };


   function insertMoney(money: number) {
      const formattedDenomination = money / MULTIPLIER;
      
      setState(prev => {
         return ({
            ...prev,
            insertedMoney: {
               total: prev.insertedMoney.total + money,
               denominations: generateDenominations(formattedDenomination, prev.insertedMoney.denominations)
            },
         });
      })
   }

   function resetMachine() {
      setState((prev => ({...prev, purchaseStatus: PurchaseStatus.choosingProduct})))
   }
   
   useEffect(() => {
      console.log("----", state.insertedMoney.denominations)
   }, [state.insertedMoney.denominations]);

   useEffect(() => {
      setState(prev => {
         const productPrice = prev.currentProduct?.price;
         const totalInsertedMoney = state.insertedMoney.total;
         const productAmount = prev.productAmount;

         return ({
               ...prev,
               due: productPrice ? (productPrice * 100 * productAmount) - totalInsertedMoney : null
            }
         );
      })
   }, [state.insertedMoney.total, state.productAmount, state.currentProduct]);
   
   
   useEffect(() => {
      if (PurchaseStatus.choosingProduct === state.purchaseStatus) {
         setState(initialData)
      }

      if (PurchaseStatus.purchaseCompleted === state.purchaseStatus) {
         // CALC_CHANGE(state.insertedMoney.denominations)
         console.info("calc change here and set result to state.change")
         // setState(prev => ({...prev}))
         
         // -- also reduce product total "amount" in useProducts?
      }
   }, [state.purchaseStatus]);


   return (
      <MachineContext.Provider value={{
         purchaseStatus: state.purchaseStatus,
         currentProduct: state.currentProduct,
         productAmount: state.productAmount,
         insertedMoney: state.insertedMoney,
         due: state.due,
         change: state.change,

         selectProduct,
         nextStep,
         resetMachine,
         incrementProductAmount,
         decrementProductAmount,
         insertMoney,
      }}
      >
         {children}
      </MachineContext.Provider>
   )
}
