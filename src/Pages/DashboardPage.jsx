import { useContext } from "react";

// Contexts imports
import { SalesControlContext } from "../context/SalesControlContext";
import { SellFormContext } from "../context/SellFormContext";

import { useParams } from "react-router-dom";
import MenuDashboard from "../components/MenuDashboard";
import SellForm from "../components/SellForm";
import InfoCard from "../components/InfoCard";

// Icons imports
import plusIcon from "../assets/icons/dashboard-icons/plus.svg";
import cloudIcon from "../assets/icons/dashboard-icons/cloud.svg";
import shoppingCartIcon from "../assets/icons/dashboard-icons/shopping-cart.svg";
import returnIcon from "../assets/icons/dashboard-icons/return.svg";
import productsIcon from "../assets/icons/dashboard-icons/products.svg";
import moneyIcon from "../assets/icons/dashboard-icons/money.svg";
import TableSales from "../components/TableSales";

function RegisterPage() {
  // Contexts
  const { sellFormOpen, setSellFormOpen } = useContext(SellFormContext);
  const { sales } = useContext(SalesControlContext);

  // Params
  const { empresa } = useParams();

  const handleSellFormToggle = () => {
    setSellFormOpen((prevState) => !prevState);
  };

  return (
    <section className="h-screen w-full overflow-x-hidden">
      {sellFormOpen && <SellForm />}

      <div className="h-full w-full overflow-x-hidden flex px-3">
        <MenuDashboard />

        <main className="w-full overflow-hidden px-5 mt-6">
          <div className="flex justify-between items-center pt-3 pb-2 mb-3 border-b border-gray-300">
            <hgroup>
              <h1 className="text-2xl font-bold capitalize">
                Dashboard - {empresa}
              </h1>
              <h3 className="text-neutral-700">
                Administra facilmente las ventas de tu negocio.
              </h3>
            </hgroup>
            <div className=" flex gap-2 items-center">
              <button className="text-carbon-blue flex items-center gap-2 border border-carbon-blue px-4 py-2 rounded">
                <img className="h-6" src={cloudIcon} alt="download icon" />
                Descargar ventas
              </button>
              <button
                onClick={handleSellFormToggle}
                className="text-carbon-blue bg-green-500 px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center gap-2 font-semibold"
              >
                <img className="h-5" src={plusIcon} alt="plus Icon" />
                Añadir venta
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-8 my-8">
            <InfoCard
              src={shoppingCartIcon}
              qua={sales.length}
              label="Ventas en total"
            />
            <InfoCard
              src={returnIcon}
              qua={sales.length}
              label="Devoluciones en total"
            />
            <InfoCard
              src={productsIcon}
              qua={sales.length}
              label="Productos en total"
            />
            <InfoCard
              src={moneyIcon}
              qua={sales.length}
              label="Ganancias en total"
            />
          </div>
          <TableSales />
        </main>
      </div>
    </section>
  );
}

export default RegisterPage;
