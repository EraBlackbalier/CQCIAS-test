SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS persona (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    primer_apellido VARCHAR(100) NOT NULL,
    segundo_apellido VARCHAR(100) NULL,
    telefono VARCHAR(10) NOT NULL,
    estatus VARCHAR(1) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT chk_persona_estatus CHECK (estatus IN ('A', 'I')),
    CONSTRAINT chk_persona_telefono CHECK (CHAR_LENGTH(telefono) = 10)
);

INSERT INTO persona
    (id, nombre, primer_apellido, segundo_apellido, telefono, estatus)
SELECT
    id,
    SUBSTRING_INDEX(nombre, ' ', 1),
    SUBSTRING_INDEX(nombre, ' ', -1),
    NULL,
    LEFT(telefono, 10),
    IF(activo, 'A', 'I')
FROM personas
ON DUPLICATE KEY UPDATE
    nombre = VALUES(nombre),
    primer_apellido = VALUES(primer_apellido),
    segundo_apellido = VALUES(segundo_apellido),
    telefono = VALUES(telefono),
    estatus = VALUES(estatus);

DROP TABLE personas;
