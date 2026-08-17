SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS personas (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id)
);

INSERT IGNORE INTO personas (id, nombre, telefono, activo) VALUES
    (1, 'Ana López', '5551234567', TRUE),
    (2, 'Carlos Pérez', '5557654321', TRUE),
    (3, 'María García', '5559876543', FALSE);
