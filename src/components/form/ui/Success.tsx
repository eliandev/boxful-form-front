export const Success = ({ data }) => {
  return (
    <article className="mt-10 p-5">
      <h2 className="text-center text-6xl text-succes font-bold mb-5 mt-12">
        ¡Gracias por tu orden, {data.name}!
      </h2>
      <p className="text-center text-3xl mb-5">
        Tu información ha sido enviada con éxito.
      </p>
      <p className="text-center text-2xl mb-12">
        Te enviaré los detalles al correo: {data.email}
      </p>
    </article>
  );
};
