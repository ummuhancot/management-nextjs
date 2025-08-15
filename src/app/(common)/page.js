import ClientSide from "@/components/ClientSide";
import ServerSide from "@/components/ServerSide";
import { Slider } from "@/components/Slider";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <Slider />
      <ClientSide>
        {/* Client side component icersine, server side component
        children ile verilirse, bu durumda ServerSide client'ta render edilmez,
        beklendigi gibi server'da render edilir.

        ClientSide render edilmeden once ServerSide render edilir ve 
        ClientSide componentina children olarak ServerSide componenti verilir.
        */}
        <ServerSide />
      </ClientSide>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
        mollitia. Provident quo dicta saepe ut aliquid, debitis suscipit nobis.
        Minima eligendi atque cumque nihil dolore. Quis fuga nam ut assumenda.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
        mollitia. Provident quo dicta saepe ut aliquid, debitis suscipit nobis.
        Minima eligendi atque cumque nihil dolore. Quis fuga nam ut assumenda.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
        mollitia. Provident quo dicta saepe ut aliquid, debitis suscipit nobis.
        Minima eligendi atque cumque nihil dolore. Quis fuga nam ut assumenda.
      </p>
    </>
  );
};

export default page;
