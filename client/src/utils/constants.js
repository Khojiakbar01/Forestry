import Home from "../pages/Home";
import About from "../pages/About";
import Documents from "../pages/Documents";
import InteractiveServices from "../pages/InteractiveServices";
import OpenDates from "../pages/OpenDates";
import PressCenter from "../pages/PressCenter";

export const routes = [
 
  {
    path: "/about",
    component: <About />,
    name: "biz haqimizda"
  },
  {
    path: "/document",
    component: <Documents />,
    name: "hujjatlar"
  },
  {
    path: "/interactive",
    component: <InteractiveServices />,
    name: "interaktiv hujjatlar"
  },
  {
    path: "/opendates",
    component: <OpenDates />,
    name: "ochiq malumotlar"
  },
  {
    path: "/presscenter",
    component: <PressCenter />,
    name: "matbuot markazi"
  },
];
