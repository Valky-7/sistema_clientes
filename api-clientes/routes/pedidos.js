const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE: Inserir Pedido
router.post('/', async (req, res) => {
    const { cliente_id, status, valor_total } = req.body;

    if (!cliente_id || valor_total === undefined) {
        return res.status(400).json({
            mensagem: 'Cliente e valor total são obrigatórios.'
        });
    }

    try {
        const [result] = await db.execute(
            'INSERT INTO pedidos (cliente_id, status, valor_total) VALUES (?, ?, ?)',
            [cliente_id, status || 'pendente', valor_total]
        );

        res.status(201).json({
            id: result.insertId,
            cliente_id,
            status: status || 'pendente',
            valor_total
        });
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao cadastrar pedido.',
            detalhes: error.message
        });
    }
});

// READ: Listar todos
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM pedidos');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao buscar pedidos.',
            detalhes: error.message
        });
    }
});

// READ: Buscar por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.execute(
            'SELECT * FROM pedidos WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Pedido não encontrado.'
            });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao buscar pedido.',
            detalhes: error.message
        });
    }
});

// UPDATE Completo (PUT)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { cliente_id, status, valor_total } = req.body;

    if (!cliente_id || !status || valor_total === undefined) {
        return res.status(400).json({
            mensagem: 'Para atualização completa (PUT), informe: cliente_id, status e valor_total.'
        });
    }

    try {
        const [result] = await db.execute(
            'UPDATE pedidos SET cliente_id = ?, status = ?, valor_total = ? WHERE id = ?',
            [cliente_id, status, valor_total, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Pedido não encontrado.'
            });
        }

        res.status(200).json({
            mensagem: 'Pedido atualizado completamente com sucesso.'
        });
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao atualizar pedido.',
            detalhes: error.message
        });
    }
});

// UPDATE Parcial (PATCH)
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const campos = req.body;

    if (Object.keys(campos).length === 0) {
        return res.status(400).json({
            mensagem: 'Nenhum campo fornecido para atualização.'
        });
    }

    const setClauses = [];
    const queryParams = [];

    for (const [chave, valor] of Object.entries(campos)) {
        if (['cliente_id', 'status', 'valor_total'].includes(chave)) {
            setClauses.push(`${chave} = ?`);
            queryParams.push(valor);
        }
    }

    if (setClauses.length === 0) {
        return res.status(400).json({
            mensagem: 'Nenhum campo válido enviado.'
        });
    }

    queryParams.push(id);

    const sql = `UPDATE pedidos SET ${setClauses.join(', ')} WHERE id = ?`;

    try {
        const [result] = await db.execute(sql, queryParams);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Pedido não encontrado.'
            });
        }

        res.status(200).json({
            mensagem: 'Pedido atualizado parcialmente com sucesso.'
        });
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao atualizar parcialmente o pedido.',
            detalhes: error.message
        });
    }
});

// DELETE: Remover Pedido
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.execute(
            'DELETE FROM pedidos WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Pedido não encontrado.'
            });
        }

        res.status(200).json({
            mensagem: 'Pedido removido com sucesso.'
        });
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao remover pedido.',
            detalhes: error.message
        });
    }
});

module.exports = router;