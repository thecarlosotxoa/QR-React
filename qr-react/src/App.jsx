import { useState, useRef, useEffect } from "react";
import React from "react";
import QRCode from "qrcode"; // Import the QRCode library

function App() {
  const [value, setValue] = useState("");
  const [imgSrc, setImgSrc] = useState(null); // State to hold the QR code image source
  const qrCanvasRef = useRef(null); // Ref to hold the QR code canvas

  // Handles generating the QR code
  const handler = (e) => {
    e.preventDefault();
    const inputValue = e.target[0].value;
    // Set the value state to the input value or null if it's empty
    setValue(inputValue.trim() ? inputValue : null);
  };

  // Generate the QR code when `value` changes
  useEffect(() => {
    if (value) {
      QRCode.toDataURL(value, { margin: 2, width: 256 }, (err, url) => {
        if (err) return console.error(err);
        setImgSrc(url); // Set the image source to the generated QR code URL
      });
    } else {
      // Clear the image source if value is empty
      setImgSrc(null);
    }
  }, [value]);

  return (
    <>
      <div className="w-full min-h-screen grid place-content-center bg-[#181818]">
        <div className="w-[23rem] p-7 space-y-4 text-slate-300">
          <h1 className="text-2xl font-semibold text-center text-slate-100">
            Generador de QR
          </h1>
          {/* Render the QR code as an image */}
          {imgSrc ? (
            <img
              ref={qrCanvasRef}
              src={imgSrc}
              alt="Generated QR Code"
              className="w-full h-auto max-w-full cursor-pointer border border-neutral-200 rounded-3xl bg-white p-4"
            />
          ) : (
            <div className="w-full h-[18rem] border border-neutral-200 rounded-3xl grid place-content-center bg-[#202020]">
              <span className="text-neutral-400"></span>
            </div>
          )}

          <form className="space-y-1" onSubmit={handler}>
            <div>
              <input
                className="bg-[#252525] rounded w-full p-2 focus:outline outline-neutral-300"
                placeholder="Transforme su texto en un código QR"
              />
            </div>
            <button className="w-full py-3 flex justify-center bg-[#252525] hover:bg-neutral-600 duration-200 rounded">
              Crear
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
