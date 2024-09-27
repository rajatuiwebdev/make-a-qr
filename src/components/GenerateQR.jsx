import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import BaseQR from '../assets/base-qr.png'
function GenerateQR() {
  const [qrData, setQrData] = useState('');
  const [qrImage, setQrImage] = useState('');
  useEffect(() => {
    setQrImage(BaseQR);
  }, []);
  const handleInputChange = (event) => {
    setQrData(event.target.value);
  };
  const generateQR = async () => {
    if (!qrData) {
      alert('Please enter data to generate a QR code.');
      return;
    }

    try {
      const dataURL = await QRCode.toDataURL(qrData, {
        width: 300,
        height: 300,
        color: '#000000',
        background: '#ffffff',
      });

      setQrImage(dataURL);
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('An error occurred while generating the QR code. Please try again.');
    }
  };

  const downloadQR = () => {
    if (!qrImage) {
      alert('Please generate a QR code first.');
      return;
    }

    const link = document.createElement('a');
    link.href = qrImage;
    link.download = 'qr-code.png';
    link.click();
  };

  return (
    <div className="body-main">
      <h4 className="body-main-title">Make a QR</h4>
      {BaseQR && <img src={qrImage} alt="qr_image" className="body-main-image" width={300} height={300} />}
      <input type="text" value={qrData} onChange={handleInputChange} placeholder="Write anything" />
      <div className="button-grid">
        <button type="button" onClick={generateQR}>Generate</button>
        <button type="button" onClick={downloadQR} disabled={!qrImage}>Download</button>
      </div>
    </div>
  );
}

export default GenerateQR;