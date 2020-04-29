import React, { Component } from "react";
import Login from "./Login";
import Identiter from "./Identiter";
import ListEnfant from "./ListEnfant";
import Journer from "./Journer";
import SideBar from "./SideBar.js";
import { DrawerNavigator } from "react-navigation";
const HomeScreenRouter = DrawerNavigator(
  {
    Login: { screen: Login },
    Identiter: { screen: Identiter },
    ListEnfant: { screen: ListEnfant },
    Journer: { screen: Journer },
    Aliments: { screen: Aliments},
    HistoriqueEvent: { screen: HistoriqueEvent},
    HistoriqueMedicale: { screen: HistoriqueMedicale},
    Message: { screen: Message},
    Planning: { screen: Planning},
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;