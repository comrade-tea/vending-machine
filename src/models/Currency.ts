export interface IDenomination {
    value: number
    count: number
}

export type TInsertedMoney = Map<number /* value*/, number /* count*/>

interface ICurrencyList {
    values: number[]
    symbols: {
        integer: string
        decimal: string
    }
}

export const initialCurrency: ICurrencyList = {
    values: [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 50, 100],
    symbols: {
        integer: "$",
        decimal: "¢",
    },
}

export const MULTIPLIER = 1 / Math.min(...initialCurrency.values)

export const currencyView = (value: number): string => {
    if (value >= MULTIPLIER) {
        return `${value / MULTIPLIER}${initialCurrency.symbols.integer}`
    }

    return `${value}${initialCurrency.symbols.decimal}`
}

export const Currency = (data: ICurrencyList = initialCurrency) => {
    const multipliedAndSortedValues = Array
        .from(data.values, item => item * MULTIPLIER)
        .sort((a, b) => a - b)

    const viewList: Array<[string, number]> = multipliedAndSortedValues.map(value => [
        currencyView(value),
        value,
    ])

    return {multipliedAndSortedValues, viewList}
}

export function getSortedIndex(sortedDenominations: IDenomination[], value: number): number {
    let low = 0
    let high = sortedDenominations.length

    while (low < high) {
        const mid: number = (low + high) >>> 1
        if (sortedDenominations[mid].value > value) {
            low = mid + 1
        } else {
            high = mid
        }
    }

    return low
}

export function sortAndSquashByValue(denominations: IDenomination[]) {
    denominations.sort((a, b) => b.value - a.value)

    if (denominations.length < 2) {
        return // nothing to squash
    }

    const squashedDenominations: IDenomination[] = [denominations[0]]

    for (let idx = 1; idx < denominations.length; ++idx) {
        const current = denominations[idx]
        const previous = squashedDenominations[squashedDenominations.length - 1]

        if (current.value === previous.value) {
            previous.count += current.count
        } else {
            squashedDenominations.push(current)
        }
    }

    denominations.length = 0
    denominations.push(...squashedDenominations)
}
