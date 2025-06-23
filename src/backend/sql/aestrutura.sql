CREATE DATABASE IF NOT EXISTS plataforma_consultas CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
USE plataforma_consultas;

CREATE TABLE IF NOT EXISTS Pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(20) NOT NULL
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; 

CREATE TABLE IF NOT EXISTS Medicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    especialidade VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Consultas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT,
    medico_id INT,
    data_hora DATETIME NOT NULL,
    status ENUM('Agendada', 'Cancelada', 'Finalizada') NOT NULL DEFAULT 'Agendada',
    FOREIGN KEY (paciente_id) REFERENCES Pacientes(id) ON DELETE SET NULL,
    FOREIGN KEY (medico_id) REFERENCES Medicos(id) ON DELETE CASCADE
)CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;