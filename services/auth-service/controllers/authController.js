const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

exports.register = async (req, res) => {
    const { email, password, tenantName } = req.body;

    if (!email || !password || !tenantName) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    try {
        const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) return res.status(400).json({ error: 'Email in use' });

        await db.query('BEGIN');
        const tenantRes = await db.query('INSERT INTO tenants (name) VALUES ($1) RETURNING id', [tenantName]);
        const tenantId = tenantRes.rows[0].id;

        const hash = await bcrypt.hash(password, 10);
        const userRes = await db.query(
            'INSERT INTO users (tenant_id, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, email, role, tenant_id',
            [tenantId, email, hash, 'ADMIN']
        );
        await db.query('COMMIT');

        const user = userRes.rows[0];
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, tenant_id: user.tenant_id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({ user, token });
    } catch (error) {
        await db.query('ROLLBACK');
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

        const user = result.rows[0];
        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, tenant_id: user.tenant_id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ user: { id: user.id, email: user.email, role: user.role, tenant_id: user.tenant_id }, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    const { email, password, role } = req.body;
    const creatorRole = req.user.role;
    const tenant_id = req.user.tenant_id;

    if (creatorRole === 'MANAGER' && role !== 'USER') {
        return res.status(403).json({ error: 'Managers can only create USER roles' });
    }
    if (!['ADMIN', 'MANAGER', 'USER'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role' });
    }

    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

    try {
        const hash = await bcrypt.hash(password, 10);
        const userRes = await db.query(
            'INSERT INTO users (tenant_id, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, email, role, tenant_id',
            [tenant_id, email, hash, role]
        );
        res.status(201).json({ user: userRes.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const tenant_id = req.user.tenant_id;
        const result = await db.query('SELECT id, email, role, created_at FROM users WHERE tenant_id = $1 ORDER BY created_at DESC', [tenant_id]);
        res.json({ users: result.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.me = async (req, res) => {
    res.json({ user: req.user });
};
