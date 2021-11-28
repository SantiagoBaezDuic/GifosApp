import "../styles.css";

export default function Display(props) {
  let { data, isFetched } = props;

  // redirección al gif en la página de giphy

  const redirect = (e) => {
    window.open(e.target.id, "_blank");
  };

  return (
    <div className="display">
      {isFetched ? (
        data.data.length === 0 ? (
          <div>
            <img
              src="https://media.giphy.com/media/UHAYP0FxJOmFBuOiC2/giphy.gif"
              alt=""
            />
            <p>No se encontraron GIFs</p>
          </div>
        ) : (
          <div className="gif-container">
            {data.data.map((object) => (
              <div key={object.slug} className="link">
                <img
                  onClick={redirect}
                  className="gif"
                  height="100%"
                  width="100%"
                  id={object.url}
                  src={object.images.original.url}
                  alt="failed to load gif"
                  key={object.slug}
                />
              </div>
            ))}
          </div>
        )
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
}
