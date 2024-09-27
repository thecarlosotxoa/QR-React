import { useState } from "react";
import React from "react";
import QRCode from "react-qr-code";

function App() {
  const [value, setValue] = useState(null);

  const handler = (e) => {
    e.preventDefault();
    setValue(e.target[0].value);
  }

  return (
    <>
      <div className="w-full min-h-screen grid place-content-center bg-[#181818]">
        <div className="w-[23rem] p-7 space-y-8 text-slate-300">
          
          {
            value?
            <QRCode value={value} style={{ height: 'auto', maxWidth: '100%', width: '100%' }}/>:
            <div className="w-full h-[18rem] border border-neutral-200 rounded-3xl grid place-content-center bg-[#202020]">
            <span>QR code</span>
          </div>
          }
          <form className="space-y-5" onSubmit={handler}>
            <div>
              <input
                className="bg-[#252525] rounded w-full p-2 focus:outline outline-neutral-300"
                placeholder="Tranforme su texto en un código QR"
              ></input>
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
