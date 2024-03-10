DROP TABLE IF EXISTS watchlists;
DROP TABLE IF EXISTS pisos;
DROP TABLE IF EXISTS usuarios;



CREATE TABLE pisos (
    id_piso int AUTO_INCREMENT,
    email_propietario varchar(255) NOT NULL,
    precio_mes decimal (6, 2) NOT NULL,
    titulo varchar(255) NOT NULL,
    descripcion varchar(255) DEFAULT NULL,
    num_habitaciones int NOT NULL,
    valoracion decimal(2,1) DEFAULT 2.5,
    num_votos int default 1,
    m_cuadrados int NOT NULL,
    fotos varchar(255) DEFAULT NULL,
    ubicacion varchar(550) NOT NULL,
    electrodomesticos varchar(500) NOT NULL,
    estancia_minima_dias int NOT NULL,
    maps_link varchar(255) NOT NULL,
    mascotas tinyint(1) DEFAULT 0,
    fumar tinyint(1) DEFAULT 0,
    parejas tinyint(1) DEFAULT 0,
    ascensor tinyint(1) DEFAULT 0,
    jardin tinyint(1) DEFAULT 0,
    terraza tinyint(1) DEFAULT 0,
    luz_incluida tinyint(1) DEFAULT 0,
    gas_incluido tinyint(1) DEFAULT 0,
    propietario_reside tinyint(1) DEFAULT 0,
    wifi tinyint(1) DEFAULT 0,
    verified tinyint(1) DEFAULT 0,
    reportes int DEFAULT 0,
    CONSTRAINT pk_pisos PRIMARY KEY(id_piso)
);

CREATE TABLE usuarios (
    email varchar(255),
    password varchar(255) NOT NULL,
    rol varchar(45) NOT NULL,
    nombre varchar(40) DEFAULT NULL,
    apellidos varchar(100) DEFAULT NULL,
    sexo varchar(10) DEFAULT NULL,
    anho_nacimiento int DEFAULT NULL,
    foto_perfil varchar(255) DEFAULT NULL,
    valoracion decimal(2,1) DEFAULT 2.5,
    num_votos int default 1,
    active tinyint(1) DEFAULT 0,
    verified tinyint(1) DEFAULT 0,
    hash varchar(255) DEFAULT NULL,
    id_piso_actual int DEFAULT NULL,
    fecha_ultima_estancia bigint DEFAULT NULL,
    fecha_ultimo_alquiler bigint DEFAULT NULL,
    reportes int DEFAULT 0,
    CONSTRAINT pk_usuarios PRIMARY KEY(email)
);

CREATE TABLE watchlists (
    id_watchlist int AUTO_INCREMENT,
    email_usuario varchar(255) NOT NULL,
    id_piso int NOT NULL,
    anotaciones varchar(500) NOT NULL,
    CONSTRAINT pk_id_watchlist PRIMARY KEY (id_watchlist),
    CONSTRAINT fk_usuarios FOREIGN KEY(email_usuario) REFERENCES usuarios(email),
    CONSTRAINT fk_pisos FOREIGN KEY(id_piso) REFERENCES pisos(id_piso)
);

ALTER TABLE usuarios ADD CONSTRAINT fk_id_piso_actual FOREIGN KEY(id_piso_actual) REFERENCES pisos(id_piso);
ALTER TABLE pisos ADD CONSTRAINT fk_email_propietario FOREIGN KEY(email_propietario) REFERENCES usuarios(email);