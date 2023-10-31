import axios from 'axios'
import {useEffect, useState} from 'react'

import {currencyView, MULTIPLIER} from '@/models/Currency.ts'

import type {IProduct} from '../models/Product.ts'

export const useProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(false)

    const fetchProducts = async (): Promise<void> => {
        setLoading(true)

        try {
            const response = await axios.get<IProduct[]>(
                'https://6532b0c5d80bd20280f5ebc8.mockapi.io/test'
            )
            setProducts(
                response.data.map(item => {
                    const multipliedPrice = item.price * MULTIPLIER

                    return {
                        ...item,
                        price: multipliedPrice,
                        priceView: currencyView(multipliedPrice),
                    }
                })
            )
        } catch (error: unknown) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    function decrementItem(product: IProduct, amount: number): void {
        setProducts(
            products.map(item =>
                item.id === product.id ? {...item, amount: item.amount - amount} : item
            )
        )
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return {products, loading, decrementItem}
}
