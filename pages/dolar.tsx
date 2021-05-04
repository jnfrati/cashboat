import { GetServerSideProps, NextPage } from "next";

interface Props {
  fecha: string;
  compra: string;
  venta: string;
}

const IndexPage: NextPage<Props> = (data) => {
  console.log(data);
  return (
    <main>
      <h1>Dolar Blue - ARS</h1>
      <p>
        <strong>Compra:</strong> ${data?.compra.toLocaleString()}
      </p>
      <p>
        <strong>Venta:</strong> ${data?.venta.toLocaleString()}
      </p>
    </main>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const response = await fetch("https://api-dolar-argentina.herokuapp.com/api/dolarblue");
  const dolarblueData: Props = await response.json();
  return {
    props: {
      ...dolarblueData,
    },
  };
};
