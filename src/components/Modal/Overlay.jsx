export default function Overlay({ open , zIndex }) {
    return (
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${zIndex} 
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      ></div>
    );
  }