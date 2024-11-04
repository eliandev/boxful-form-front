import { FormContainer } from "./components/form/FormContainer";
import { Header } from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <main className="max-w-screen-lg m-auto pt-12">
        <h1 className="text-3xl font-bold text-mainText">Crea una orden</h1>
        <p>
          Dale una ventaja competitiva a tu negocio con entregas el mismo día
          (Área Metropolitana) y el día siguiente a nivel nacional.
        </p>

        <section className="bg-white rounded-xl">
          <FormContainer />
        </section>
      </main>
    </>
  );
};

export default App;
