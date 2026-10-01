CREATE DATABASE IF NOT EXISTS sistema_clientes;
USE sistema_clientes;

CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

USE sistema_clientes;

CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    estoque INT DEFAULT 0,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    perfil ENUM('admin', 'operador') DEFAULT 'operador',
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pendente', 'pago', 'cancelado') DEFAULT 'pendente',
    valor_total DECIMAL(10, 2) DEFAULT 0.00,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS itens_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS produtos (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 descricao TEXT,
 preco DECIMAL(10, 2) NOT NULL,
 estoque INT DEFAULT 0,
 status ENUM('ativo', 'inativo') DEFAULT 'ativo',
 criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from produtos;

INSERT INTO usuarios (nome, email, senha, perfil, status) VALUES
('Administrador', 'admin@sistema.com', 'admin123', 'admin', 'ativo'),
('João Pereira', 'joao@sistema.com', 'joao123', 'operador', 'ativo'),
('Fernanda Lima', 'fernanda@sistema.com', 'fernanda123', 'operador', 'ativo'),
('Rafael Martins', 'rafael@sistema.com', 'rafael123', 'operador', 'ativo'),
('Beatriz Almeida', 'beatriz@sistema.com', 'beatriz123', 'operador', 'ativo');

select * from usuarios;

INSERT INTO pedidos (cliente_id, status, valor_total) VALUES
(2, 'pendente', 299.80),
(3, 'pago', 899.90),
(4, 'cancelado', 349.90),
(5, 'pago', 249.90);

select * from pedidos;

INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES
(6, 1, 1, 3299.90),
(7, 2, 2, 149.90),
(8, 3, 1, 899.90),
(9, 4, 1, 349.90);

select * from itens_pedido;