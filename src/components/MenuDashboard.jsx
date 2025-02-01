// Contexts imports
import { useContext, useState, useEffect } from "react";
import { DashboardViewContext } from "../context/DashboardViewContext";
import { WidthMobileContext } from "../context/WidthMobileContext";

// Icons imports
import menuIcon from "../assets/icons/dashboard-icons/menu.png";
import closeIcon from "../assets/icons/dashboard-icons/close.png";

import reportIcon from "../assets/icons/dashboard-icons/report.png";
import salesIcon from "../assets/icons/dashboard-icons/sales.png";
import queriesIcon from "../assets/icons/dashboard-icons/query.png";
import settingsIcon from "../assets/icons/dashboard-icons/settings.png";
import logoutIcon from "../assets/icons/dashboard-icons/logout.png";

function MenuDashboard() {
  //contexts
  const { setDashboardView } = useContext(DashboardViewContext);
  const { width, setWidth } = useContext(WidthMobileContext);

  //states
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      let screenWidth = window.innerWidth;

      if (screenWidth <= 768) {
        setWidth(true);
      } else {
        setWidth(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const sections = [
    { label: "Ventas", img: salesIcon },
    { label: "Reportes", img: reportIcon },
    { label: "Consultas", img: queriesIcon },
    { label: "Configuracion", img: settingsIcon },
  ];

  const handleSectionView = (nameSection) => {
    return setDashboardView(nameSection);
  };

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <>
      <div
        className={
          width && menu
            ? "hidden"
            : "max-md:h-full max-md:bg-black max-md:bg-opacity-75 max-md:w-screen max-md:absolute"
        }
        onClick={handleMenu}
      ></div>

      <section
        className={width ? "relative h-8 ml-5 mt-5 overflow-hidden" : "hidden"}
      >
        <div className="absolute">
          <img
            className="h-8 cursor-pointer"
            src={menu ? menuIcon : closeIcon}
            onClick={handleMenu}
            alt="Menu icon"
          />
        </div>
      </section>

      <header
        className={
          width && menu
            ? "hidden"
            : "h-full w-60 fixed top-0 left-0 z-[100] bg-gray-100 border-r border-gray-300 max-md:absolute max-md:z-30"
        }
      >
        <div className="h-full w-full flex flex-col justify-between">
          <nav className="h-full flex flex-col justify-between bg-gray-100 text-white p-4 max-md:w-64 max-md:bg-gray-100">
            <section>
              <div className="text-lg font-semibold">
                <div className="mt-2 mb-5">
                  <h1 className="text-2xl font-bold text-carbon-blue text-center uppercase">
                    Surf Data
                  </h1>
                </div>
                {sections.map((section) => (
                  <div
                    key={section.label}
                    className="p-2 flex items-center gap-2 mb-1 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSectionView(section.label)}
                  >
                    <img src={section.img} alt={section.img + " icon"} />
                    <p className="text-carbon-blue">{section.label}</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <a href="https://surfdata.online">
                <div className="flex items-center gap-2 hover:bg-red-100 p-2 cursor-pointer">
                  <img src={logoutIcon} alt="Log Out Icon" />
                  <p className="text-red-500 text-lg font-semibold">
                    Cerrar sesión
                  </p>
                </div>
              </a>
            </section>
          </nav>
        </div>
      </header>
    </>
  );
}

export default MenuDashboard;
