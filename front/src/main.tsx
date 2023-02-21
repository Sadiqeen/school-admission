import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routers from "./routes";
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import "./App.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={{ fontFamily: 'Bai Jamjuree' }} withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        <RouterProvider router={routers} />
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>
);