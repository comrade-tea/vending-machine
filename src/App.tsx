import {CustomerCurrencyList} from "@/components/Customer/CustomerCurrencyList.tsx"
import {Footer} from "@/components/Default/Footer.tsx";
import {Display} from "@/components/Display/Display.tsx"
import {ProductsGrid} from "@/components/VendingMachine/ProductsGrid.tsx"

export const App = () => (
   <>
      <main className="my-[8vh]">
         <div className="container mx-auto px-2">
            <h1 className="text-4xl mb-14">Vending machine project</h1>

            <div className="grid grid-cols-12 gap-y-14 gap-x-6 xl:gap-x-10">
               <div className="col-span-full lg:col-span-7">
                  <h2 className="text-2xl mb-5 lg:mb-12">Products:</h2>
                  <ProductsGrid/>
               </div>

               <div className="col-span-full xs:col-span-8 lg:col-span-3">
                  <h2 className="text-2xl mb-5 lg:mb-12">Display:</h2>
                  <Display/>
               </div>

               <div className="col-span-full xs:col-span-4 lg:col-span-2">
                  <h2 className="text-2xl mb-5 lg:mb-12">Denominations:</h2>
                  <CustomerCurrencyList/>
               </div>
            </div>
         </div>
      </main>

      <Footer/>
   </>
)
