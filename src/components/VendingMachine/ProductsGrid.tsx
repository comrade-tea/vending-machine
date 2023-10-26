import {useContext} from "react";
import {useProducts} from "@/hooks/useProducts.ts";
import {ProductItem} from "@/components/VendingMachine/ProductItem.tsx";
import {MachineContext} from "@/context/MachineContext.tsx";

export const ProductsGrid = () => {
   const {products, loading} = useProducts()
   const {currentProduct, selectProduct, productAmount} = useContext(MachineContext);

   if (loading)
      return <div>Loading..</div>

   if (!loading && products?.length === 0)
      return <div>There are no products</div>
   

   return (
      <>
         {/*<button className="border border-green-400" onClick={() => decrementItem(products[1])}>descrement</button>*/}

         <ul className="grid grid-cols-3 gap-4">
            {products.map(product => {
                  const isSelected = product.id === currentProduct?.id;

                  return (
                     <li className="flex" key={product.id}>
                        <ProductItem product={product}
                                     selected={isSelected}
                                     productAmount={productAmount}
                                     handleSelect={selectProduct}
                        />
                     </li>
                  );
               }
            )}
         </ul>
      </>
   )
}
