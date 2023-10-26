import axios, {AxiosError} from "axios";
import {IProduct} from "../models/Product.ts";
import {useEffect, useState} from "react";


export const useProducts = () => {
   const [products, setProducts] = useState<IProduct[]>([])
   const [loading, setLoading] = useState(false);


   async function fetchProducts(): Promise<void> {
      setLoading(true);
      
      try {
         const response = await axios.get<IProduct[]>("https://6532b0c5d80bd20280f5ebc8.mockapi.io/test")
         setProducts(response.data)
      } catch (error: AxiosError) {
         console.log(`Error: ${error.toString()}`)
      } finally {
         setLoading(false)
      }
   }

   function decrementItem(product: IProduct, amount: number): void {
      setProducts(products.map(item => (item.id === product.id ? { ...item, amount: item.amount - amount } : item)))
   }

   useEffect(() => {
      fetchProducts()
   }, [])

   return {products, loading, decrementItem}
}


