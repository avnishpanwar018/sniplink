import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';

/**
 * Renders a QR code for a given URL with a download button.
 * Uses SVG rendering for crisp display at any size.
 */
export default function QrCode({ url, size = 180 }) {
  const handleDownload = () => {
    // Get the SVG element and convert to a downloadable PNG
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = size * 2;
    canvas.height = size * 2;

    img.onload = () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const link = document.createElement('a');
      link.download = 'sniplink-qr-code.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="p-4 bg-white rounded-2xl shadow-sm">
        <QRCodeSVG
          id="qr-code-svg"
          value={url}
          size={size}
          level="H"
          marginSize={2}
          fgColor="#1e1b4b"
          bgColor="#ffffff"
        />
      </div>
      <button
        id="download-qr-button"
        onClick={handleDownload}
        className="btn-secondary text-xs"
      >
        <Download className="w-3.5 h-3.5" />
        Download QR
      </button>
    </div>
  );
}
