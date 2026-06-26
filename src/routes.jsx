import { createBrowserRouter } from "react-router-dom";

import Home            from "./pages/Home/Home";
import About           from "./pages/About/About";
import Blog            from "./pages/Blog/Blog";
import BlogPost        from "./pages/BlogPost/BlogPost";
import Contact         from "./pages/Contact/Contact";
import Products        from "./pages/Products/Products";
import EastmanPage     from "./pages/Products/EastmanPage";
import BrandPage       from "./pages/Products/BrandPage";
import SolarCalculator from "./pages/SolarCalculator/SolarCalculator";

const router = createBrowserRouter([
    { path: "/",                  element: <Home />            },
    { path: "/about",             element: <About />           },
    { path: "/blog",              element: <Blog />            },
    { path: "/blog/:slug",        element: <BlogPost />        },
    { path: "/contact",           element: <Contact />         },
    { path: "/products",          element: <Products />        },
    { path: "/products/eastman",  element: <EastmanPage />    },
    { path: "/products/:brand",   element: <BrandPage />      },
    { path: "/solar-calculator",  element: <SolarCalculator /> },
]);

export default router;
