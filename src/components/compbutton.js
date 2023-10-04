export default function QButton({ onclick, children }) {
  return (
    <button onClick={onclick} className="btn btn-danger px-3  text-white">
      {children}
    </button>
  );
}
