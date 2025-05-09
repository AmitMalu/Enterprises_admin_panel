import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuState {
  activeMenu: string;
  activeSubMenu: string | null;
  openedMenu: string | null;
}

const initialState: MenuState = {
  activeMenu: "Dashboard", //to track Currently active Top Menu
  activeSubMenu: null, //to track Currently active Sub Menu
  openedMenu: "Dashboard", //to open/close top Menu
};

const menuReducer = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setActiveMenu(state, action: PayloadAction<string>) {
      state.activeMenu = action.payload;
      state.openedMenu =
        state.openedMenu === action.payload ? "" : action.payload;
    },
    setActiveSubMenu(state, action: PayloadAction<string | null>) {
      state.activeSubMenu = action.payload;
    },
  },
});

export const { setActiveMenu, setActiveSubMenu } = menuReducer.actions;
export default menuReducer.reducer;
