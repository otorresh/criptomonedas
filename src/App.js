import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import imagen from "./cryptomonedas.png";
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  font-size: 50px;
  font-weight: 700;
  text-align: left;
  color: #fff;
  margin-top: 80px;
  margin-bottom: 50px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  const [moneda, guardarMoneda] = useState("");
  const [criptomoneda, guardarCriptomoneda] = useState("");
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      // Evitamos la ejecución la primera vez
      if (moneda === "") return;

      // Consultar la API
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      // Mostrar spinner
      guardarCargando(true);

      // Ocultar el spinner y mostrar el resultado
      setTimeout(() => {
        // Cambiar el estado de cargando
        guardarCargando(false);

        // Guardar cotización
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 2500);
    };

    cotizarCriptomoneda();
  }, [moneda, criptomoneda]);

  // Mostrar spinner o resultado
  const componente = cargando ? (
    <Spinner />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="Imagen cripto" />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
