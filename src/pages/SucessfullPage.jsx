import React, { useState } from "react";
import Sucessfull from "../components/sucessfull/Sucessfull";
import Footer from "../components/Footer/Footer";
function SucessfullPage() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Sucessfull />
      <Footer count={count} />
    </>
  );
}

export default SucessfullPage;
