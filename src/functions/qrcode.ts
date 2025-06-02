import QRCode from 'qrcode';

export async function generateQRCode({ data, size }: { data: string; size?: number }): Promise<string> {
    try {
        const qr = await QRCode.toDataURL(data, {
            width: size || 256,
            margin: 2,
            color: {
                dark: "#000",
                light: "#fff"
            }
        });
        return qr;
    } catch (err) {
        console.error("Error generating QR code:", err);
        throw new Error("Failed to generate QR code");
    }
}