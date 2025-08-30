// File: src/App.jsx
//
// QR generator with responsive preview, PNG download link, and clean UI.
// - Generates a PNG QR code client-side with `qrcode`.
// - Displays a responsive image inside a bordered container.
// - Provides a small text link under the image to download the QR.
// - English UI with controlled input, live updates, error handling.

import { useState, useEffect } from "react";
import QRCode from "qrcode";

function App() {
  // Controlled input: user text
  const [input, setInput] = useState("");
  // Data URL for the generated QR PNG
  const [qrDataUrl, setQrDataUrl] = useState(null);
  // UX state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Fixed pixel size for generated PNG
  const QR_PX = 256;

  // Handle form submit (optional convenience; generation happens live as well)
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    setErrorMsg("");
    if (!trimmed) {
      setQrDataUrl(null);
      setErrorMsg("Please enter text to generate a QR code.");
      return;
    }
  };

  // Generate QR whenever input changes
  useEffect(() => {
    const val = input.trim();
    if (!val) {
      setQrDataUrl(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setErrorMsg("");

    QRCode.toDataURL(val, { margin: 2, width: QR_PX })
      .then((url) => {
        if (!cancelled) setQrDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) {
          setQrDataUrl(null);
          setErrorMsg("Failed to generate the QR code.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [input]);

  return (
    <div className="w-full min-h-screen grid place-content-center bg-[#181818]">
      <div className="w-[23rem] p-7 space-y-4 text-slate-300">
        <h1 className="text-2xl font-semibold text-center text-slate-100">
          QR Generator
        </h1>

        {/* QR preview area */}
        <div className="w-full min-h-[18rem] border border-neutral-200 rounded-3xl grid place-content-center bg-[#202020] p-4">
          {loading && <span className="text-neutral-400">Generating…</span>}

          {!loading && qrDataUrl && (
            <div className="flex flex-col items-center space-y-2">
              <img
                src={qrDataUrl}
                alt="Generated QR code"
                className="w-full h-auto max-w-full rounded-2xl bg-white p-4"
              />
              {/* Small subtle download link */}
              <a
                href={qrDataUrl}
                download="qr.png"
                className="text-sm text-blue-400 hover:underline"
              >
                Download PNG
              </a>
            </div>
          )}

          {!loading && !qrDataUrl && (
            <span className="text-neutral-400">Your QR will appear here</span>
          )}
        </div>

        {/* Controls */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Text input */}
          <input
            className="bg-[#252525] rounded w-full p-2 focus:outline outline-neutral-300"
            placeholder="Type text to turn into a QR code"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Submit button */}
          <button className="w-full py-3 flex justify-center bg-[#252525] hover:bg-neutral-600 duration-200 rounded">
            Create
          </button>

          {/* Error message */}
          {errorMsg && <p className="text-red-400 text-sm pt-1">{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
}

export default App;
