import { useContext, useEffect } from "react";

// context imports
import { SaleFormContext } from "../context/SaleFormContext";
import { SearchProductContext } from "../context/SearchProductContext";
import { WidthMobileContext } from "../context/WidthMobileContext";

// hooks imports
import useFilterSales from "../hooks/useFilterSales";
import useGetTotals from "../hooks/useGetTotals";

// params imports
import { useParams } from "react-router-dom";

// components imports
import InfoCard from "../components/InfoCard";
import SaleForm from "../components/SaleForm";
import PrinterButton from "../components/PrinterButton";
import FiltersSection from "./FiltersSection";
import LoadingModule from "../components/LoadingModule";
import ErrorModule from "./ErrorModule";

// icons imports
import plusIcon from "../assets/icons/dashboard-icons/plus.svg";
import cloudIcon from "../assets/icons/dashboard-icons/cloud.svg";
import shoppingCartIcon from "../assets/icons/dashboard-icons/shopping-cart.svg";
import returnIcon from "../assets/icons/dashboard-icons/return.svg";
import productsIcon from "../assets/icons/dashboard-icons/products.svg";
import moneyIcon from "../assets/icons/dashboard-icons/money.svg";
import lensIcon from "../assets/icons/dashboard-icons/lens.svg";
import pencilIcon from "../assets/icons/dashboard-icons/pencil.svg";

function SalesDashboardView() {
  // Contexts
  const { saleFormOpen, setSaleFormOpen } = useContext(SaleFormContext);
  const { searchProduct, setSearchProduct } = useContext(SearchProductContext);
  const { width, setWidth } = useContext(WidthMobileContext);

  //hooks
  const { filteredSales, loadingData, error } = useFilterSales();
  const { handleCountReturnSales, handleCountProducts, handleCountProfit } =
    useGetTotals();

  // Params
  const { empresa } = useParams();

  // Handle sales status
  const handleStatus = (status) => {
    return status ? "Exitosa" : "Devolución";
  };

  useEffect(() => {
    if (width > 768) {
      setWidth(true);
    } else {
      setWidth(false);
    }
  }, []);

  const headers = [
    "#",
    "Producto",
    "Precio Unitario",
    "Cantidad",
    "Estado",
    "Opciones",
  ];

  if (loadingData) {
    return <LoadingModule />;
  }

  if (error) {
    return <ErrorModule msg={error} />;
  }

  const handleSaleFormToggle = () => {
    setSaleFormOpen((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSearchProduct = (searchValue) => {
    setSearchProduct(searchValue);
    console.log(searchProduct);
  };

  return (
    <div className="overflow-y-hidden ">
      <main className="px-5 mt-3">
        <div className="overflow-hidden"> {saleFormOpen && <SaleForm />} </div>
        <div className="flex justify-between items-center pt-3 pb-2 mb-3 border-b border-gray-300">
          <hgroup>
            <h1 className="text-2xl font-bold capitalize">
              Dashboard - {empresa}
            </h1>
            <h3 className="text-neutral-700">
              Administra facilmente las ventas de tu negocio.
            </h3>
          </hgroup>
          <div className="flex gap-2 items-center">
            <button
              className={
                width
                  ? "text-carbon-blue flex items-center gap-2 outline outline-1 outline-carbon-blue px-4 py-2 rounded h-10"
                  : "text-carbon-blue flex items-center gap-2 outline outline-1 outline-carbon-blue px-4 py-2 rounded"
              }
            >
              <img className="h-6" src={cloudIcon} alt="download icon" />
              {width ? "" : "Descargar ventas"}
            </button>
            <button
              onClick={handleSaleFormToggle}
              className={
                width
                  ? "text-carbon-blue bg-green-500 px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center gap-2 font-semibold h-10"
                  : "text-carbon-blue bg-green-500 px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center gap-2 font-semibold"
              }
            >
              <img className="h-5" src={plusIcon} alt="plus Icon" />
              {width ? "" : "Añadir venta"}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-8 my-8 h-auto max-md:gap-4">
          <InfoCard
            src={shoppingCartIcon}
            qua={filteredSales.length}
            label="Ventas en total"
          />
          <InfoCard
            src={returnIcon}
            qua={handleCountReturnSales(filteredSales)}
            label="Devoluciones en total"
          />
          <InfoCard
            src={productsIcon}
            qua={handleCountProducts(filteredSales)}
            label="Productos en total"
          />
          <InfoCard
            src={moneyIcon}
            qua={handleCountProfit(filteredSales)}
            label="Ganancias en total"
          />
        </div>

        <header className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Todas las ventas</h2>
          <div className="flex items-center gap-2">
            <form
              onSubmit={handleSubmit}
              className="flex gap-2 border border-gray-300 py-1 px-2 rounded cursor-pointer"
            >
              <label htmlFor="search-sale" className="cursor-pointer">
                <img
                  className="h-6"
                  src={lensIcon}
                  alt="lens icon"
                  draggable="false"
                />
              </label>
              <input
                className="outline-none"
                type="text"
                name="search-sale"
                id="search-sale"
                placeholder="Buscar producto..."
                onChange={(e) => handleSearchProduct(e.target.value)}
              />
            </form>
            <FiltersSection />
          </div>
        </header>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-gray-200 border border-gray-300 mb-5 overflow-x-auto">
            <thead className="bg-gray-100">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-gray-200">
              {filteredSales.map((sale, index) => (
                <tr
                  className="border border-gray-300 overflow-hidden text-center"
                  key={sale.id}
                >
                  <td className="px-5 py-2 text-center">{index + 1}</td>
                  <td className="px-5 py-2 text-center">{sale.producto}</td>
                  <td className="px-5 py-2 whitespace-nowrap">{sale.precio}</td>
                  <td className="px-5 py-2 whitespace-nowrap">
                    {sale.cantidad}
                  </td>
                  <td className="px-5 py-2">
                    <div
                      className={`h-full rounded-lg ${
                        sale.estado ? "bg-green-300" : "bg-purple-300"
                      }`}
                    >
                      <p className="text-carbon-blue font-semibold">
                        {handleStatus(sale.estado)}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-2 flex justify-center items-center">
                    <button className="border border-gray-300 mr-2">
                      <img className="h-8" src={pencilIcon} alt="pencil icon" />
                    </button>
                    <PrinterButton venta={sale} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default SalesDashboardView;
