-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-04-2015 a las 17:53:18
-- Versión del servidor: 5.6.21
-- Versión de PHP: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `autorizacion2`
--
CREATE DATABASE IF NOT EXISTS `autorizacion2` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `autorizacion2`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autorizacion`
--

CREATE TABLE IF NOT EXISTS `autorizacion` (
`id` int(3) unsigned NOT NULL,
  `usuario` int(3) unsigned NOT NULL,
  `nacionalidad` char(1) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `cedula` int(8) unsigned NOT NULL,
  `fechaautorizacion` date NOT NULL,
  `horaentrada` time DEFAULT NULL,
  `tipoautorizacion` tinyint(3) unsigned NOT NULL,
  `motivoautorizacion` tinyint(1) NOT NULL,
  `horasalida` time DEFAULT NULL,
  `fecharegistro` datetime NOT NULL,
  `fechaestatus` datetime DEFAULT NULL,
  `placa` varchar(7) DEFAULT NULL,
  `contsalida` int(3) DEFAULT '0',
  `estatus` int(1) NOT NULL,
  `eliminado` int(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `autorizacion`
--

INSERT INTO `autorizacion` (`id`, `usuario`, `nacionalidad`, `cedula`, `fechaautorizacion`, `horaentrada`, `tipoautorizacion`, `motivoautorizacion`, `horasalida`, `fecharegistro`, `fechaestatus`, `placa`, `contsalida`, `estatus`, `eliminado`) VALUES
(1, 4, 'V', 202020, '2015-04-13', '10:00:00', 1, 3, '00:00:00', '2015-04-13 17:04:21', NULL, NULL, 0, 1, 0),
(2, 4, 'V', 18, '2015-04-13', '13:00:00', 1, 2, '00:00:00', '2015-04-13 17:04:40', NULL, NULL, 0, 1, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autorizacion`
--
ALTER TABLE `autorizacion`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autorizacion`
--
ALTER TABLE `autorizacion`
MODIFY `id` int(3) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
