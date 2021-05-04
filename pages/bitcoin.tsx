import { GetServerSideProps, NextPage } from "next";

type Venta = {
  usdbtc: number;
  arsbtc: number;
  eurbtc: number;
};

type Compra = {
  usdbtc: number;
  arsbtc: number;
  eurbtc: number;
};

interface Props {
  data: {
    date: string;
    venta: Venta;
    compra: Compra;
  };
}

const IndexPage: NextPage<Props> = ({ data }) => {
  console.log(data);
  return (
    <main>
      <h1>SatoshiTango: Sell Bitcoin</h1>
      <p>
        <strong>USDT:</strong> ${data.venta.usdbtc.toLocaleString()}
      </p>
      <p>
        <strong>ARS:</strong> ${data.venta.usdbtc.toLocaleString()}
      </p>
    </main>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const response = await fetch("https://api.satoshitango.com/v2/ticker");
  const satoshitangoData: Props = await response.json();
  return {
    props: satoshitangoData,
  };
};
