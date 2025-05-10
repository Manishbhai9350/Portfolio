import { createRoot } from "react-dom/client";
import App from "./App";
import { Lenis } from "lenis/react";
import ProjectsProvider from "./context/projects.context";
import React from "react";

createRoot(document.getElementById("root")).render(
  <>
    <Lenis root>
      <ProjectsProvider>
        <App />
      </ProjectsProvider>
    </Lenis>
  </>
);
