import { createRoot } from "react-dom/client";
import App from "./App";
import { Lenis } from "lenis/react";
import ProjectsProvider from "./context/projects.context";
import React from "react";
import { Loader } from "@react-three/drei";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Lenis root>
      <ProjectsProvider>
        <Loader containerStyles={{position:'fixed',top:0,left:0}} />
        <App />
      </ProjectsProvider>
    </Lenis>
  </React.StrictMode>
);
