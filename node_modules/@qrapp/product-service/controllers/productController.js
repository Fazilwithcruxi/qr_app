const db = require('../db');

exports.createProduct = async (req, res) => {
    const { name, description, content, type } = req.body;
    const { tenant_id, id: user_id } = req.user;

    if (!name || !content || !type) {
        return res.status(400).json({ error: 'Missing Required Fields' });
    }

    try {
        const result = await db.query(
            'INSERT INTO products (tenant_id, name, description, content, type, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [tenant_id, name, description, content, type, user_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProducts = async (req, res) => {
    const { tenant_id } = req.user;
    try {
        const result = await db.query(
            'SELECT products.*, users.email as creator_email FROM products LEFT JOIN users ON products.created_by = users.id WHERE products.tenant_id = $1 ORDER BY products.created_at DESC',
            [tenant_id]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    const { tenant_id } = req.user;

    try {
        const result = await db.query(
            'DELETE FROM products WHERE id = $1 AND tenant_id = $2 RETURNING id',
            [id, tenant_id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Not found or not applicable' });
        res.json({ success: true, deletedId: id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Proxies to generator-service
exports.generateCode = async (req, res) => {
    const { id } = req.params;
    const { tenant_id } = req.user;

    try {
        const productRes = await db.query('SELECT type, content FROM products WHERE id = $1 AND tenant_id = $2', [id, tenant_id]);
        if (productRes.rows.length === 0) return res.status(404).json({ error: 'Product not found' });

        const product = productRes.rows[0];

        const generatorUrl = process.env.GENERATOR_URL || 'http://localhost:4003/generate';
        const response = await fetch(generatorUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: product.type.toUpperCase(), text: product.content })
        });

        if (!response.ok) throw new Error('Generation failed up-stream');

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        res.set('Content-Type', 'image/png');
        res.send(buffer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
