const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE: Inserir Item do Pedido
router.post('/', async (req, res) => {
    const { pedido_id, produto_id, quantidade, preco_unitario } = req.body;

    if (!pedido_id || !produto_id || !quantidade || preco_unitario === undefined) {
        return res.status(400).json({
            mensagem: 'Pedido, produto, quantidade e preço unitário são obrigatórios.'
        });
    }

    try {
        const [result] = await db.execute(
            'INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)',
            [pedido_id, produto_id, quantidade, preco_unitario]
        );

        res.status(201).json({
            id: result.insertId,
            pedido_id,
            produto_id,
            quantidade,
            preco_unitario
        });
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao cadastrar item do pedido.',
            detalhes: error.message
        });
    }
});

// READ: Listar todos
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM itens_pedido');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao buscar itens do pedido.',
            detalhes: error.message
        });
    }
});

// READ: Buscar por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.execute(
            'SELECT * FROM itens_pedido WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Item do pedido não encontrado.'
            });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao buscar item do pedido.',
            detalhes: error.message
        });
    }
});

// UPDATE Completo (PUT)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { pedido_id, produto_id, quantidade, preco_unitario } = req.body;

    if (!pedido_id || !produto_id || !quantidade || preco_unitario === undefined) {
        return res.status(400).json({
            mensagem: 'Para atualização completa (PUT), informe: pedido_id, produto_id, quantidade e preco_unitario.'
        });
    }

    try {
        const [result] = await db.execute(
            'UPDATE itens_pedido SET pedido_id = ?, produto_id = ?, quantidade = ?, preco_unitario = ? WHERE id = ?',
            [pedido_id, produto_id, quantidade, preco_unitario, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Item do pedido não encontrado.'
            });
        }

        res.status(200).json({
            mensagem: 'Item do pedido atualizado completamente com sucesso.'
        });
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao atualizar item do pedido.',
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
        if (['pedido_id', 'produto_id', 'quantidade', 'preco_unitario'].includes(chave)) {
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

    const sql = `UPDATE itens_pedido SET ${setClauses.join(', ')} WHERE id = ?`;

    try {
        const [result] = await db.execute(sql, queryParams);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Item do pedido não encontrado.'
            });
        }

        res.status(200).json({
            mensagem: 'Item do pedido atualizado parcialmente com sucesso.'
        });
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao atualizar parcialmente o item do pedido.',
            detalhes: error.message
        });
    }
});

// DELETE: Remover Item do Pedido
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.execute(
            'DELETE FROM itens_pedido WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Item do pedido não encontrado.'
            });
        }

        res.status(200).json({
            mensagem: 'Item do pedido removido com sucesso.'
        });
    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao remover item do pedido.',
            detalhes: error.message
        });
    }
});

module.exports = router;