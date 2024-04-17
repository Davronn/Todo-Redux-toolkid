import React from "react";
import { Provider } from "react-redux";
import Todolist from "./components/Todolist";
import store from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <Todolist />
    </Provider>
  );
}

export default App;
