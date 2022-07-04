import { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QrCode = () => {
  const [url, setUrl] = useState('');
  const qrRef = useRef();
  const downloadQRCode = (e) => {
    e.preventDefault();
    const canvas = qrRef.current.querySelector('canvas');
    const image = canvas.toDataURL('image/png');
    const anchor = document.createElement('a');
    anchor.href = image;
    anchor.download = 'qr-code.png';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl('');
  };
  const qrCodeEncoder = (e) => {
    setUrl(e.target.value);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={300}
      bgColor="#00ff00"
      level="H"
    />
  );
  return (
    <div className="qrcode__container">
      <div ref={qrRef}>{qrcode}</div>
      <div className="input__group">
        <form htmlFor onSubmit={downloadQRCode}>
          <label>Enter URL
          <input
            type="text"
            value={url}
            onChange={qrCodeEncoder}
            placeholder="Enter your URL here"
          />
        </label>
          <button type="submit" disabled={!url}>
            Download QR code
          </button>
        </form>
      </div>
    </div>
  );
};

export default QrCode;
