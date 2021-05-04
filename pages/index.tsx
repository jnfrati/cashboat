/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
// import useSWR from "swr";
import fetcher from "../utils/fetcher";

const BackgroundSyle =
  "relative bg-green-300 h-screen flex flex-col items-center justify-center dolar-background z-10";
const HeaderStyle = "text-center";
const TitleSyle = "text-7xl font-bold";
const SubTitleSyle = "mt-2 text-3xl";
const ContentStyle = "w-1/3";
const FormStyle = "flex flex-col p-12 text-center";
const InputStyle = "m-2 py-2 px-4 h-12 rounded-full outline-none focus:shadow-md";
const SelectStyle = "m-2 py-2 px-4 h-12 rounded-full outline-none focus:shadow-md";
const TotalStyle = "text-5xl text-white mt-8 mb-2";
const FooterStyle = "absolute bottom-4 hover:text-gray-600";

interface IProps {
  localbitcoins: {
    [x: string]: any;
  };
  localbitcoinsfees: {
    [x: string]: any;
  };
  bitcoin: {
    [x: string]: any;
  };
  dolar: {
    [x: string]: any;
  };
}

const IndexPage = (props: IProps): React.ReactElement => {
  const [dolarBlue, setDolarBlue] = useState(null);
  const [priceBTCARS, setPriceBTCARS] = useState(null);
  const [feePAYBTC, setFeePAYBTC] = useState(null);
  const [pricePAYBTC, setPricePAYBTC] = useState(null);
  const [amount, setAmount] = useState(undefined);
  const [P2PSite, setP2PSite] = useState("localbitcoins");
  const [exchangeSite, setExchangeSite] = useState("satoshitango");
  const [total, setTotal] = useState(null);

  // const dolar = useSWR("https://api-dolar-argentina.herokuapp.com/api/dolarblue", fetcher, {
  //   initialData: props.dolar,
  //   refreshInterval: 0,
  // });

  // const satoshiTangoBTCARS = useSWR("https://api.satoshitango.com/v2/ticker", fetcher, {
  //   initialData: props.bitcoin,
  //   refreshInterval: 0,
  // });

  // const localBitcoinsFees = useSWR("https://localbitcoins.com/api/fees/", fetcher, {
  //   initialData: props.localbitcoinsfees,
  //   refreshInterval: 0,
  // });

  // const localBitcoinsPAYBTC = useSWR(
  //   "https://localbitcoins.com/buy-bitcoins-online/payoneer/.json",
  //   fetcher,
  //   {
  //     initialData: props.localbitcoins,
  //     refreshInterval: 0,
  //   }
  // );

  useEffect(() => setDolarBlue(props.dolar.compra), [props.dolar]);

  useEffect(() => setPriceBTCARS(props.bitcoin.data.venta.arsbtc * 0.99 /* 1% FEE */), [
    props.bitcoin,
  ]);

  useEffect(() => setFeePAYBTC(props.localbitcoinsfees.data.outgoing_fee), [
    props.localbitcoinsfees,
  ]);

  useEffect(() => {
    setPricePAYBTC(() =>
      Number(
        props.localbitcoins.data.ad_list.find(
          (ad) => ad.data.min_amount < 2 < ad.data.max_amount_available
        )?.data.temp_price_usd
      )
    );
  }, [props.localbitcoins]);

  useEffect(() => {
    setTotal(amount ? (amount / pricePAYBTC - feePAYBTC) * priceBTCARS : 0);
  }, [amount, P2PSite, pricePAYBTC, priceBTCARS, feePAYBTC]);

  return (
    <div className={BackgroundSyle}>
      <header className={HeaderStyle}>
        <h1 className={TitleSyle}>CashBoat</h1>
        <h2 className={SubTitleSyle}>Offshore USD to ARS</h2>
        {/* {isValidating && <strong>Loading</strong>} */}
      </header>
      <main className={ContentStyle}>
        <div className={FormStyle}>
          <input
            className={InputStyle}
            placeholder="USD amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            className={SelectStyle}
            placeholder="Seleccione el servicio P2P"
            defaultValue={P2PSite}
            onBlur={(e) => setP2PSite(e.target.value)}
          >
            <option value="localbitcoins">LocalBitcoins</option>
            <option value="2">2</option>
          </select>
          <select
            className={SelectStyle}
            placeholder="Seleccione el Exchange"
            defaultValue={exchangeSite}
            onBlur={(e) => setExchangeSite(e.target.value)}
          >
            <option value="satoshitango">SatoshiTango</option>
          </select>
          <span className={TotalStyle}>
            {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(total)}
          </span>
          <span>
            Dolar blue:{" "}
            {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(
              amount * dolarBlue
            )}
          </span>
        </div>
      </main>
      <span className={FooterStyle}>
        <a href="https://github.com/francomd/cashboat" target="_blank" rel="noreferrer">
          CashBoat v0.0.1 - GitHub
        </a>
      </span>
    </div>
  );
};

export default IndexPage;

export const getServerSideProps = async (): Promise<{ props: IProps }> => {
  const payoneerLocalBitcoins: Record<string, any> = await fetcher(
    "https://localbitcoins.com/buy-bitcoins-online/payoneer/.json"
  );
  const localBitcoinsFees: Record<string, any> = await fetcher(
    "https://localbitcoins.com/api/fees/"
  );
  const bitcoinSatoshi: Record<string, any> = await fetcher(
    "https://api.satoshitango.com/v2/ticker"
  );
  const dolarBlue: Record<string, any> = await fetcher(
    "https://api-dolar-argentina.herokuapp.com/api/dolarblue"
  );
  return {
    props: {
      localbitcoins: {
        ...payoneerLocalBitcoins,
      },
      localbitcoinsfees: {
        ...localBitcoinsFees,
      },
      bitcoin: { ...bitcoinSatoshi },
      dolar: { ...dolarBlue },
    },
  };
};
