import { AlertContext } from "../../context/alert";

function Alert({ children }) {
  return (
    <AlertContext.Provider>
      <div>{children}</div>
    </AlertContext.Provider>
  );
}

function Title() {
  return <h2></h2>;
}

function Body() {
  return <p></p>;
}

function Button() {
  return <button></button>;
}
