import React, {createContext, useCallback, useEffect, useMemo, useState} from 'react'

import {ChangeCalculator} from '@/calculator/ChangeCalculator'
import type {IVendorContext} from "@/context/VendorContext.ts";
import {generateDenominations} from "@/context/VendorContext.ts";
import {errorFunc} from "@/helpers/utils.ts";
import {useProducts} from '@/hooks/useProducts.ts'

import {Currency} from '../models/Currency.ts'
import type {IProduct} from '../models/Product.ts'
import {PurchaseStatus} from '../models/PurchaseStatus.ts'


const initialData: IVendorContext = {
   products: [],
   productsLoading: true,
   purchaseStatus: PurchaseStatus.ChooseProduct,
   currentProduct: null,
   productAmount: 1,
   insertedMoney: {
      total: 0,
      denominations: new Map(),
   },
   due: 0,
   change: [],
   isPaymentFailed: false,

   processPayment(): PurchaseStatus {
      errorFunc()
      return PurchaseStatus.notImplemented
   },
   setPurchaseStatus(): void {
      errorFunc()
   },
   insertMoney(): void {
      errorFunc()
   },
   incrementProductAmount(): void {
      errorFunc()
   },
   decrementProductAmount(): void {
      errorFunc()
   },
   resetMachine(): void {
      errorFunc()
   },
   selectProduct(): void {
      errorFunc()
   },
}

export const VendorContext = createContext<IVendorContext>(initialData)

export const VendorState = ({children}: {
   children: React.ReactNode
}) => {
   const {products, loading: productsLoading, decrementItem} = useProducts()

   const [state, setState] = useState(initialData)
   const {purchaseStatus, currentProduct, productAmount, insertedMoney, due, change, isPaymentFailed} = state;

   const [calculator] = useState<ChangeCalculator>(
      new ChangeCalculator(
         Currency().multipliedAndSortedValues.map(item => ({value: item, count: 20}))
      )
   )

   const setPurchaseStatus = useCallback((status: PurchaseStatus) => {
      setState(prev => ({...prev, purchaseStatus: status}))
   }, [])

   const selectProduct = useCallback((product: IProduct) => {
      setState(prev => {
         const newProduct = currentProduct?.id !== product.id
         return {
            ...prev,
            currentProduct: newProduct ? product : null,
            purchaseStatus: newProduct ? PurchaseStatus.ChooseAmount : PurchaseStatus.ChooseProduct,
            productAmount: initialData.productAmount,
         }
      })
   }, [currentProduct?.id])

   const incrementProductAmount = useCallback(() => {
      if (productAmount === currentProduct?.amount) {
         return
      }

      setState(prev => ({
         ...prev,
         productAmount: prev.productAmount++,
      }))
   }, [currentProduct?.amount, productAmount])

   const decrementProductAmount = useCallback(() => {
      setState(prev => ({
         ...prev,
         productAmount: prev.productAmount === 1 ? prev.productAmount : productAmount - 1,
      }))
   }, [productAmount])


   const insertMoney = useCallback((money: number) => {
      setState(prev => ({
         ...prev,
         insertedMoney: {
            total: prev.insertedMoney.total + money,
            denominations: generateDenominations(money, prev.insertedMoney.denominations),
         },
      }))
   }, [])

   const processPayment = useCallback((): PurchaseStatus => {
      if (due > 0) {
         console.error(`Payment processing error: customer's due is positive ({due})`)
         return PurchaseStatus.ReturnMoney
      }

      if (due !== 0) {
         const requiredChange = Math.abs(due)
         const changeToGive = calculator.getChange(requiredChange)

         if (changeToGive === null || changeToGive.length === 0) {
            setState(prev => ({...prev, isPaymentFailed: true}))
            return PurchaseStatus.ReturnMoney
         }

         setState(prev => ({...prev, change: changeToGive}))
      }

      // handle successful purchase
      calculator.loadReceivedMoney(insertedMoney.denominations)

      if (currentProduct) {
         decrementItem(currentProduct, productAmount)
      }

      setState(prev => ({
         ...prev,
         insertedMoney: {total: 0, denominations: new Map()},
         isPaymentFailed: false,
         due: 0,
      }))

      return PurchaseStatus.Success
   }, [calculator, currentProduct, decrementItem, due, insertedMoney.denominations, productAmount])

   const resetMachine = useCallback(() => {
      if (insertedMoney.denominations.size > 0) {
         setState(prev => ({...prev, purchaseStatus: PurchaseStatus.ReturnMoney}))
      } else {
         setState(prev => ({...prev, purchaseStatus: PurchaseStatus.ChooseProduct}))
      }
   }, [insertedMoney.denominations.size])

   useEffect(() => {
      const productPrice = currentProduct?.price ?? 0
      const totalInsertedMoney = insertedMoney.total

      setState(prev => ({...prev, due: productPrice * productAmount - totalInsertedMoney}))
   }, [insertedMoney.total, productAmount, currentProduct])

   useEffect(() => {
      if (purchaseStatus === PurchaseStatus.ChooseProduct) {
         setState(initialData)
      }
   }, [purchaseStatus])

   return (
      <VendorContext.Provider
         value={useMemo(() => ({
            purchaseStatus,
            currentProduct,
            productAmount,
            insertedMoney,
            due,
            change,
            isPaymentFailed,

            processPayment,
            setPurchaseStatus,
            selectProduct,
            resetMachine,
            incrementProductAmount,
            decrementProductAmount,
            insertMoney,
            products,
            productsLoading,
         }), [purchaseStatus, currentProduct, productAmount, insertedMoney, due, change, isPaymentFailed, processPayment, setPurchaseStatus, selectProduct, resetMachine, incrementProductAmount, decrementProductAmount, insertMoney, products, productsLoading])}
      >
         {children}
      </VendorContext.Provider>
   )
}
