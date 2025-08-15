import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="text-center p-5">
      <Spinner animation="grow" size="lg" />
    </div>
  );
};
export default Loading;
