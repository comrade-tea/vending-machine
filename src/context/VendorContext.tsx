import React, {createContext, useCallback, useEffect, useMemo, useState} from 'react'

import {ChangeCalculator} from '@/calculator/ChangeCalculator'
import {useProducts} from '@/hooks/useProducts.ts'

import type {IDenomination, TInsertedMoney} from '../models/Currency.ts';
import {Currency} from '../models/Currency.ts'
import type {IProduct} from '../models/Product.ts'
import {PurchaseStatus} from '../models/PurchaseStatus.ts'

interface IVendorContext {
    purchaseStatus: PurchaseStatus
    currentProduct?: IProduct | null
    productAmount: number
    insertedMoney: {
        total: number
        denominations: TInsertedMoney
    }
    insertMoney: (money: number) => void
    due: number
    change: IDenomination[]

    products: IProduct[]
    productsLoading: boolean
    isPaymentFailed: boolean

    processPayment: () => PurchaseStatus
    setPurchaseStatus: (status: PurchaseStatus) => void
    incrementProductAmount: () => void
    decrementProductAmount: () => void
    resetMachine: () => void
    selectProduct: (product: IProduct) => void
}

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
        // eslint-disable-next-line sonarjs/no-duplicate-string
        throw new Error('Function not implemented.')
    },
    setPurchaseStatus(): void {
        throw new Error('Function not implemented.')
    },
    insertMoney(): void {
        throw new Error('Function not implemented.')
    },
    incrementProductAmount(): void {
        throw new Error('Function not implemented.')
    },
    decrementProductAmount(): void {
        throw new Error('Function not implemented.')
    },
    resetMachine(): void {
        throw new Error('Function not implemented.')
    },
    selectProduct(): void {
        throw new Error('Function not implemented.')
    },
}

export const VendorContext = createContext<IVendorContext>(initialData)


const generateDenominations = (value: number, moneyInMachine: TInsertedMoney): TInsertedMoney => {
    const count = moneyInMachine.get(value)
    const updatedMap = new Map(moneyInMachine)

    if (count === undefined) {
        updatedMap.set(value, 1)
    } else {
        updatedMap.set(value, count + 1)
    }

    return updatedMap
}


export const MachineState = ({children}: {
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

    function setPurchaseStatus(status: PurchaseStatus) {
        setState(prev => ({...prev, purchaseStatus: status}))
    }

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
            }), [decrementProductAmount, incrementProductAmount, insertMoney, processPayment, products, productsLoading, resetMachine, selectProduct, change, currentProduct, due, insertedMoney, isPaymentFailed, productAmount, purchaseStatus])}
        >
            {children}
        </VendorContext.Provider>
    )
}
