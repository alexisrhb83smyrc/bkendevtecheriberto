-- tabla de entradas
CREATE TABLE entradas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  producto VARCHAR(255) NOT NULL,
  cantidad INT NOT NULL,
  fecha DATE NOT NULL
);

-- tabla de salidas
CREATE TABLE salidas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  producto VARCHAR(255) NOT NULL,
  cantidad INT NOT NULL,
  fecha DATE NOT NULL
);

-- tabla de inventario
CREATE TABLE inventario (
  id INT PRIMARY KEY AUTO_INCREMENT,
  producto VARCHAR(255) NOT NULL,
  cantidad INT NOT NULL
);


-- vista para el inventario
CREATE VIEW vista_inventario AS
SELECT producto, SUM(cantidad) AS cantidad_total
FROM entradas
GROUP BY producto
UNION ALL
SELECT producto, -SUM(cantidad) AS cantidad_total
FROM salidas
GROUP BY producto;
node



-- Procedimiento almacenado para registrar entradasuna entrada
registrar_entradaDELIMITER //
CREATE PROCEDURE registrar_entrada(IN producto VARCHAR(255), IN cantidad INT, IN fecha DATE)entradasentradassalidasinventario
BEGIN
  INSERT INTO entradas (producto, cantidad, fecha) VALUES (producto, cantidad, fecha);
  UPDATE inventario SET cantidad = cantidad + @cantidad WHERE producto = @producto;
END //
DELIMITER ;