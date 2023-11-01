import {FaGithub, FaList} from "react-icons/fa";

export const Footer = () => (
   <footer className="bg-gray-800 text-white py-5 px-2 text-sm md:text-base">
      <div className="container mx-auto flex gap-x-10 gap-y-4 flex-col xs:flex-row">
         <a className="flex items-center transition-colors hover:text-red-500"
            href="https://github.com/comrade-tea/vending-machine" target="_blank" rel="noreferrer">
            <FaGithub size={24}/>
            <span className="ml-4">sources</span>
         </a>
         <a className="flex items-center transition-colors hover:text-red-500" href="https://comrade-tea.github.io/"
            target="_blank" rel="noreferrer">
            <FaList size={22}/>
            <span className="ml-4">other projects</span>
         </a>

         <div className="xs:ml-auto">made by comrade-tea</div>
      </div>
   </footer>
)
