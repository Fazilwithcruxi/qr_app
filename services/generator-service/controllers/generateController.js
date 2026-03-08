const bwipjs = require('bwip-js');
const qrcode = require('qrcode');

exports.generateCode = async (req, res) => {
    const { type, text } = req.body;

    if (!type || !text) {
        return res.status(400).json({ error: 'Missing type or text' });
    }

    try {
        if (type === 'QR') {
            const buffer = await qrcode.toBuffer(text, { type: 'png' });
            res.set('Content-Type', 'image/png');
            res.send(buffer);
        } else if (type === 'BARCODE') {
            bwipjs.toBuffer({
                bcid: 'code128',
                text: text,
                scale: 3,
                height: 10,
                includetext: true,
                textxalign: 'center',
            }, (err, png) => {
                if (err) {
                    return res.status(500).json({ error: 'Barcode generation failed' });
                }
                res.set('Content-Type', 'image/png');
                res.send(png);
            });
        } else {
            res.status(400).json({ error: 'Invalid type. Use QR or BARCODE' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
