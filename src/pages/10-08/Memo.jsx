import { memo } from "react";

const Memo = ({ counter }) => {
  console.log("childern rendered");
  return (
    <>
      <h1>Children Component : {counter}</h1>
    </>
  );
};

export default memo(Memo);
