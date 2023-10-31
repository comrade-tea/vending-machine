import type {IDenomination, TInsertedMoney} from "@/models/Currency.ts";
import type {IProduct} from "@/models/Product.ts";
import type {PurchaseStatus} from "@/models/PurchaseStatus.ts";

export const generateDenominations = (value: number, moneyInMachine: TInsertedMoney): TInsertedMoney => {
    const count = moneyInMachine.get(value)
    const updatedMap = new Map(moneyInMachine)

    if (count === undefined) {
        updatedMap.set(value, 1)
    } else {
        updatedMap.set(value, count + 1)
    }

    return updatedMap
}

export interface IVendorContext {
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
