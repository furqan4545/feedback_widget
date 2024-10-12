import { useState } from "react";

import "./App.css";
import { Widget } from "@/components/Widget";

function App() {
  return (
    <>
      <div>
        <Widget projectId={1} />
      </div>
    </>
  );
}

export default App;
