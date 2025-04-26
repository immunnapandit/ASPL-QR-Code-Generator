import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeGenerator() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef(null);

  const generateQRData = () => {
    return [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${name};;;`,
      `FN:${name}`,
      `TEL;TYPE=CELL:${phoneNumber}`,
      `EMAIL;TYPE=INTERNET:${email}`,
      "END:VCARD"
    ].join("\r\n");
  };

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "contact-qr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md">
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-6">Contact QR Code Generator</h1>

        <input
          type="text"
          placeholder="Enter Name"
          className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Enter Phone Number"
          className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email Address"
          className="w-full p-3 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-3 mb-4"
          onClick={() => setShowQR(true)}
        >
          Generate QR Code
        </button>

        {showQR && phoneNumber && name && email && (
          <div className="flex flex-col items-center" ref={qrRef}>
            <QRCodeCanvas
              value={generateQRData()}
              size={200}
              level="H"
              includeMargin={true}
            />
            <button
              className="mt-4 bg-green-500 hover:bg-green-600 text-white rounded-xl p-3"
              onClick={downloadQRCode}
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
