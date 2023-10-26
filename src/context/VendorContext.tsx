import React, {createContext, useEffect, useState} from "react";
import {IProduct} from "../models/Product.ts";
import {PurchaseStatus} from "../models/PurchaseStatus.ts";
import {Currency, IDenomination, TInsertedMoney} from "../models/Currency.ts";
import {useProducts} from "@/hooks/useProducts.ts";
import {ChangeCalculator} from "@/calculator/ChangeCalculator";


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
        denominations: new Map()
    },
    due: 0,
    change: [],
    isPaymentFailed: false,

    processPayment: function (): PurchaseStatus {
        throw new Error("Function not implemented.");
    },
    setPurchaseStatus: function (): void {
        throw new Error("Function not implemented.");
    },
    insertMoney: function (): void {
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
    selectProduct: function (): void {
        throw new Error("Function not implemented.");
    }
}

export const VendorContext = createContext<IVendorContext>(initialData)


export const MachineState = ({children}: {
    children: React.ReactNode
}) => {
    const [state, setState] = useState(initialData);
    const {products, loading: productsLoading, decrementItem} = useProducts()
    const [calculator] = useState<ChangeCalculator>(new ChangeCalculator(
        Currency().multipliedAndSortedValues
            .map(item => ({value: item, count: 20}))))

    function setPurchaseStatus(status: PurchaseStatus) {
        setState(prev => ({...prev, purchaseStatus: status}))
    }

    function selectProduct(product: IProduct) {
        setState(prev => {
            const newProduct = state?.currentProduct?.id !== product.id;
            return ({
                ...prev,
                currentProduct: newProduct ? product : null,
                purchaseStatus: newProduct ? PurchaseStatus.ChooseAmount : PurchaseStatus.ChooseProduct,
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

    const generateDenominations = (value: number, insertedMoney: TInsertedMoney): TInsertedMoney => {
        const count = insertedMoney.get(value);
        const updatedMap = new Map(insertedMoney);

        if (count) {
            updatedMap.set(value, count + 1);
        } else {
            updatedMap.set(value, 1);
        }

        return updatedMap;
    };


    function insertMoney(money: number) {
        setState(prev => {
            return ({
                ...prev,
                insertedMoney: {
                    total: prev.insertedMoney.total + money,

                    denominations: generateDenominations(money, prev.insertedMoney.denominations)
                },
            });
        })
    }

    function processPayment(): PurchaseStatus {
        if (state.due > 0) {
            console.error(`Payment processing error: customer's due is positive ({state.due})`)
            return PurchaseStatus.ReturnMoney
        }

        if (state.due !== 0) {
            const requiredChange = Math.abs(state.due)
            const change = calculator.getChange(requiredChange)

            if (!change?.length) {
                setState(prev => ({...prev, isPaymentFailed: true}))
                return PurchaseStatus.ReturnMoney
            }

            setState(prev => ({...prev, change: change}))
        }

        // handle successful purchase
        calculator.loadReceivedMoney(state.insertedMoney.denominations)

        if (state.currentProduct) {
            decrementItem(state.currentProduct, state.productAmount)
        }

        setState(prev => ({
            ...prev,
            insertedMoney: {total: 0, denominations: new Map()},
            isPaymentFailed: false,
            due: 0,

        }))

        return PurchaseStatus.Success;
    }

    function resetMachine() {
        if (state.insertedMoney.denominations.size > 0)
            setState((prev => ({...prev, purchaseStatus: PurchaseStatus.ReturnMoney})))
        else
            setState((prev => ({...prev, purchaseStatus: PurchaseStatus.ChooseProduct})))
    }

    useEffect(() => {
        // setState(prev => {
        //     const productPrice = prev.currentProduct?.price;
        //     const totalInsertedMoney = state.insertedMoney.total;
        //     const productAmount = prev.productAmount;
        //
        //     if (!productPrice) return {...prev, due: null}
        //
        //     return ({
        //         ...prev,
        //         due: (productPrice * productAmount) - totalInsertedMoney
        //     });
        // })
        const productPrice = state.currentProduct?.price ?? 0;
        const totalInsertedMoney = state.insertedMoney.total;
        const productAmount = state.productAmount;

        setState({...state, due: (productPrice * productAmount) - totalInsertedMoney});
        
    }, [state.insertedMoney.total, state.productAmount, state.currentProduct]);


    useEffect(() => {
        switch (state.purchaseStatus) {
            case PurchaseStatus.ChooseProduct:
                setState(initialData)
                break;
        }

    }, [state.purchaseStatus]);


    return (
        <VendorContext.Provider value={{
            purchaseStatus: state.purchaseStatus,
            currentProduct: state.currentProduct,
            productAmount: state.productAmount,
            insertedMoney: state.insertedMoney,
            due: state.due,
            change: state.change,
            isPaymentFailed: state.isPaymentFailed,

            processPayment,
            setPurchaseStatus,
            selectProduct,
            resetMachine,
            incrementProductAmount,
            decrementProductAmount,
            insertMoney,
            products,
            productsLoading,
        }}
        >
            {children}
        </VendorContext.Provider>
    )
}
