-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-05-2015 a las 16:07:29
-- Versión del servidor: 5.6.21
-- Versión de PHP: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `prevengo`
--
CREATE DATABASE IF NOT EXISTS `prevengo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `prevengo`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad`
--

CREATE TABLE IF NOT EXISTS `actividad` (
`id` int(11) NOT NULL,
  `usuario` int(11) NOT NULL,
  `evento` int(11) NOT NULL,
  `actividadepende` int(11) DEFAULT NULL COMMENT 'Este campo indica si la actividad depende de otra para poder iniciarla. ',
  `descripcion` varchar(100) DEFAULT 'no tiene actividades registrado',
  `fecharegistro` date DEFAULT NULL,
  `fechaaviso` date DEFAULT NULL,
  `fechatope` date DEFAULT NULL,
  `observacion` varchar(100) NOT NULL DEFAULT 'no tiene observaciones',
  `estatus` int(1) DEFAULT NULL COMMENT '0-completado, 1-sin iniciar, 2-en ejecucion, 3-en revision , 4-cancelado, 5- expirado\n\npara el estatus 1: son actividades que tiene 1 avance con estatus 1.\n\npara el estatus 2: son actividades con al menos 1 avance tipo parcial-con estatus 0. \n\npara el estatus 3: son actividades con avances de tipo final- con estatus 0. '
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COMMENT='plan de accion de un evento';

--
-- Volcado de datos para la tabla `actividad`
--

INSERT INTO `actividad` (`id`, `usuario`, `evento`, `actividadepende`, `descripcion`, `fecharegistro`, `fechaaviso`, `fechatope`, `observacion`, `estatus`) VALUES
(1, 3, 1, NULL, 'Elaborar Bases del Concurso', '2015-04-16', '2015-04-23', '2015-04-23', 'no tiene observaciones', 0),
(2, 1, 2, NULL, 'Apertura del  Concurso', '2015-04-23', '2015-04-30', '2015-04-25', 'no tiene observaciones', 2),
(3, 0, 2, NULL, 'Promocion del concurso', '2015-04-10', '2015-04-17', '2015-04-24', 'no tiene observaciones', 0),
(4, 3, 1, NULL, 'Recepcion del ideas', '2015-04-10', '2015-04-17', '2015-04-30', 'no tiene observaciones', 2),
(5, 3, 1, NULL, 'sdf', '2015-04-28', '0000-00-00', '0000-00-00', 'no tiene observaciones', 1),
(6, 3, 1, NULL, 'sdf', '2015-04-28', '0000-00-00', '0000-00-00', 'no tiene observaciones', 1),
(7, 3, 1, NULL, 'hola', '2015-04-28', '0000-00-00', '0000-00-00', 'no tiene observaciones', 1),
(8, 3, 1, NULL, 'nuevo', '2015-04-28', '0000-00-00', '2015-04-28', 'no tiene observaciones', 1),
(9, 1, 9, NULL, 'sdf', '2015-04-28', '0000-00-00', '2015-04-30', 'no tiene observaciones', 1),
(10, 1, 8, 4, 'gooog', '2015-04-29', '2015-05-01', '2015-04-29', 'no tiene observaciones', 1),
(11, 3, 1, NULL, '', '2015-04-29', '2015-04-29', '2015-04-29', 'no tiene observaciones', 1),
(12, 3, 1, NULL, '', '2015-04-29', '2015-04-29', '2015-04-29', 'no tiene observaciones', 1),
(13, 3, 1, NULL, 'goooolkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', '2015-04-29', '2015-04-29', '2015-04-29', 'no tiene observaciones', 1),
(14, 3, 1, NULL, 'ggggg', '2015-04-29', '2015-04-29', '2015-04-29', 'no tiene observaciones', 1),
(15, 3, 1, NULL, 'asdsaasdas', '2015-04-29', '2015-04-29', '2015-04-29', 'no tiene observaciones', 1),
(16, 3, 1, 15, 'sdasdasdsad', '2015-04-29', '2015-04-29', '2015-04-29', 'no tiene observaciones', 1),
(17, 3, 1, 2, 'dasdasdasdasd', '2015-04-29', '2015-04-29', '2015-04-29', 'no tiene observaciones', 1),
(18, 3, 1, 2, 'ggggggggg', '2015-04-29', '2015-04-29', '2015-04-29', 'no tiene observaciones', 1),
(21, 1, 2, 2, 'dffffffffffff', '2015-04-29', '2015-04-29', '2015-04-29', 'no tiene observaciones', 1),
(23, 1, 2, NULL, 'dasdasdasdasd', '2015-04-29', '2015-04-29', '2015-04-29', 'no tiene observaciones', 1),
(24, 1, 2, 23, 'sdfsdfsdfsdf', '2015-04-29', '2015-04-30', '2015-04-29', 'no tiene observaciones', 1),
(25, 1, 3, NULL, 'Hola', '2015-04-29', '2015-04-29', '2015-04-29', 'no tiene observaciones', 1),
(26, 1, 3, 25, 'cggxgxgxcg', '2015-04-29', '2015-05-01', '2015-04-29', 'no tiene observaciones', 1),
(32, 1, 3, NULL, 'hhhhhhhhhh', '2015-04-30', '2015-04-30', '2015-04-30', 'no tiene observaciones', 1),
(33, 1, 3, 25, 'hhjjiiii', '2015-04-30', '2015-04-30', '2015-04-30', 'no tiene observaciones', 1),
(34, 1, 3, 26, 'hoooooo', '2015-04-30', '2015-04-30', '2015-04-30', 'no tiene observaciones', 1),
(35, 1, 3, 25, 'hoooouiououi', '2015-04-30', '2015-04-30', '2015-04-30', 'no tiene observaciones', 1),
(36, 1, 3, 35, 'hgfhgfhgfhfgh', '2015-04-30', '2015-04-30', '2015-04-30', 'no tiene observaciones', 1),
(37, 1, 3, NULL, 'sdaasdasdasdas', '2015-04-30', '2015-04-30', '2015-04-30', 'no tiene observaciones', 1),
(38, 1, 2, 21, 'lololololo', '2015-05-04', '2015-05-27', '2015-05-12', 'no tiene observaciones', 1),
(39, 1, 2, 38, 'gggfgdfgdfg', '2015-05-04', '2015-05-04', '2015-05-04', 'no tiene observaciones', 1),
(40, 3, 1, 4, 'bvngfh', '2015-05-04', '2015-05-04', '2015-05-04', 'no tiene observaciones', 1),
(41, 1, 2, 39, 'fhgfhfghgfhgfh', '2015-05-05', '2015-05-05', '2015-05-05', 'no tiene observaciones', 1),
(43, 2, 7, NULL, 'no tiene actividades registrado', NULL, NULL, NULL, 'no tiene observaciones', 1),
(44, 2, 7, NULL, 'no tiene actividades registrado', NULL, NULL, NULL, 'no tiene observaciones', 1),
(45, 3, 6, NULL, 'no tiene actividades registrado', NULL, NULL, NULL, 'no tiene observaciones', 1),
(46, 3, 10, NULL, 'no tiene actividades registrado', NULL, NULL, NULL, 'no tiene observaciones', 1),
(47, 2, 13, NULL, 'no tiene actividades registrado', NULL, NULL, NULL, 'no tiene observaciones', 1),
(48, 7, 11, NULL, 'no tiene actividades registrado', NULL, NULL, NULL, 'no tiene observaciones', 1),
(49, 1, 8, 10, 'gdfgdfgdfgdf', '2015-05-07', '2015-05-07', '2015-05-07', 'no tiene observaciones', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agente`
--

CREATE TABLE IF NOT EXISTS `agente` (
`id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `estatus` int(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `agente`
--

INSERT INTO `agente` (`id`, `nombre`, `estatus`) VALUES
(1, 'Oficina de Personal', 1),
(2, 'Oficina de planificación y presupuesto', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alcance`
--

CREATE TABLE IF NOT EXISTS `alcance` (
`id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `valor` int(11) NOT NULL,
  `estatus` int(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `alcance`
--

INSERT INTO `alcance` (`id`, `nombre`, `valor`, `estatus`) VALUES
(1, 'Individual', 1, 1),
(2, 'Colectivo', 2, 1),
(3, 'Sectorial', 1, 1),
(4, 'Multisectorial', 4, 1),
(5, 'General', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anexo`
--

CREATE TABLE IF NOT EXISTS `anexo` (
`id` int(11) NOT NULL,
  `avance` int(11) DEFAULT NULL,
  `reincidencia` int(11) DEFAULT NULL,
  `direccion` varchar(45) NOT NULL DEFAULT 'no tiene anexo asociado' COMMENT 'contiene la direccion donde esta alojado el archivo. ',
  `tipoarchivo` varchar(45) NOT NULL DEFAULT 's/e' COMMENT 'aca se guarda la extension del tipo de archivo que esta subiendo.',
  `estatus` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avance`
--

CREATE TABLE IF NOT EXISTS `avance` (
`id` int(11) NOT NULL,
  `actividad` int(11) NOT NULL,
  `usuario` int(11) NOT NULL,
  `descripcion` varchar(200) NOT NULL DEFAULT 'no tiene avances registrados',
  `fechaasignacion` date NOT NULL,
  `fecharegistro` date NOT NULL,
  `tipo` int(11) NOT NULL DEFAULT '2' COMMENT '0-final,1-parcial, 2-sin tipo',
  `costo` float NOT NULL DEFAULT '0' COMMENT 'Es el gasto que se realizo para la ejecucion del avance. \nAl acumular todos los costos de los avances de las actividades del evento el valor debe ser menor io igual ( <= ) al presupuesto del evento. ',
  `estatus` int(1) NOT NULL COMMENT '0-completada, 1-sin iniciar, 2- cancelada, 3-expirada.'
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8 COMMENT='son las actividades que se ejecutan de un plan de accion. ';

--
-- Volcado de datos para la tabla `avance`
--

INSERT INTO `avance` (`id`, `actividad`, `usuario`, `descripcion`, `fechaasignacion`, `fecharegistro`, `tipo`, `costo`, `estatus`) VALUES
(47, 1, 3, 'nuevo avance ', '2015-04-21', '2015-04-30', 0, 0, 0),
(48, 2, 2, 'Se aperturó el concurso', '2015-04-21', '2015-04-22', 0, 0, 1),
(49, 3, 1, 'Se elaboró reglamento final de bases', '2015-04-15', '2015-04-22', 0, 10, 0),
(50, 1, 3, '', '2015-04-23', '2015-04-23', 1, 2313, 1),
(51, 2, 3, 'nuevo avance', '2015-04-21', '2015-04-30', 1, 0, 0),
(52, 1, 2, 'dasd', '2015-04-15', '2015-04-24', 0, 12, 3),
(53, 1, 1, '32', '2015-04-15', '2015-04-24', 0, 3, 0),
(54, 38, 1, 'no tiene avances registrados', '0000-00-00', '0000-00-00', 2, 0, 1),
(55, 23, 2, 'no tiene avances registrados', '2015-05-05', '0000-00-00', 2, 0, 1),
(56, 8, 2, 'no tiene avances registrados', '2015-05-05', '0000-00-00', 2, 0, 1),
(57, 7, 3, 'no tiene avances registrados', '2015-05-05', '0000-00-00', 2, 0, 1),
(58, 7, 1, 'no tiene avances registrados', '2015-05-05', '0000-00-00', 2, 0, 1),
(59, 39, 3, 'no tiene avances registrados', '2015-05-05', '0000-00-00', 2, 0, 1),
(60, 24, 3, 'no tiene avances registrados', '2015-05-05', '0000-00-00', 2, 0, 1),
(61, 49, 7, 'no tiene avances registrados', '2015-05-07', '0000-00-00', 2, 0, 1),
(62, 49, 2, 'no tiene avances registrados', '2015-05-07', '0000-00-00', 2, 0, 1),
(63, 49, 4, 'no tiene avances registrados', '2015-05-07', '0000-00-00', 2, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comisionado`
--

CREATE TABLE IF NOT EXISTS `comisionado` (
`id` int(11) NOT NULL,
  `evento` int(11) NOT NULL,
  `empleado` int(11) DEFAULT NULL,
  `estatus` int(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comisionado`
--

INSERT INTO `comisionado` (`id`, `evento`, `empleado`, `estatus`) VALUES
(1, 15, 2, 1),
(2, 15, 9, 1),
(3, 15, 6, 1),
(4, 14, 9, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE IF NOT EXISTS `evento` (
`id` int(11) NOT NULL,
  `agente` int(11) NOT NULL,
  `alcance` int(11) NOT NULL,
  `tipoevento` int(11) NOT NULL,
  `sector` int(11) NOT NULL,
  `usuario` int(11) DEFAULT NULL,
  `titulo` varchar(45) NOT NULL,
  `descripcion` varchar(100) DEFAULT 'no tiene descripcion',
  `presupuesto` float DEFAULT '0' COMMENT 'Es el monto que se dispone para la ejecución del evento. ',
  `fecharegistro` date DEFAULT NULL,
  `fechatope` date DEFAULT NULL,
  `fechapreaviso` date DEFAULT NULL,
  `observacion` varchar(100) NOT NULL DEFAULT '''no posee observaciones''',
  `estatus` int(1) DEFAULT NULL COMMENT '0-resuelto,1-pendiente,2-cancelado,3-expirado'
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `evento`
--

INSERT INTO `evento` (`id`, `agente`, `alcance`, `tipoevento`, `sector`, `usuario`, `titulo`, `descripcion`, `presupuesto`, `fecharegistro`, `fechatope`, `fechapreaviso`, `observacion`, `estatus`) VALUES
(1, 1, 1, 1, 1, 4, 'concurso de ideas "Política y Gestión"', 'Acto de propuesta ganadora del concurso de ideas "Política y Gestion"', 0, '2015-04-16', '2015-04-01', '2015-04-22', 'fgdfgdf', 3),
(2, 2, 3, 5, 3, 2, 'Caminata 10K', 'Caminata de 10 kilometros para motivar al personal a que cuide su estado de salud.', 0, '2015-04-15', '2015-04-23', '2015-04-21', '''no posee observaciones''', 0),
(3, 1, 4, 6, 4, 1, 'Rendición de Crédito adicional 2014  salario ', 'no tiene descripcion', 100000, '2015-04-15', '2015-04-30', '2015-04-22', 'gfhf', 3),
(5, 2, 1, 2, 2, 1, 'evento', 'NEW', 1, '2015-05-05', '2015-05-26', '2015-05-25', 'sdasdas', 3),
(6, 2, 2, 4, 4, 1, 'nueeeeee', 'nuevo', 12, '2015-05-05', '2015-05-27', '2015-05-25', 'fsdfsd', 2),
(7, 1, 4, 3, 4, 1, 'vebe', '', 1, '2015-05-05', '2015-05-26', '2015-05-25', '''no posee observaciones''', 1),
(8, 2, 2, 3, 2, 1, 'Eventoooooooooooooo', 'nuevoooooo', 23, '2015-05-05', '2015-05-26', '2015-05-24', '''no posee observaciones''', 2),
(9, 2, 1, 2, 2, 1, 'dgdfg', 'dfgdfg', 345, '2015-05-05', '2015-05-26', '2015-05-24', 'fsdfsds', 3),
(10, 2, 2, 2, 2, 1, 'Even', 'asdasd', 1, '2015-05-06', '2015-05-27', '2015-05-31', '''no posee observaciones''', 1),
(11, 2, 1, 2, 2, 1, 'Borrar la base de datos', 'sdasdasdsad', 12, '2015-05-06', '2015-05-27', '2015-05-26', '''no posee observaciones''', 1),
(12, 1, 1, 1, 2, 1, 'programar esro', 'asdasdasdasd', 123, '2015-05-06', '2015-05-10', '2015-05-17', 'sdfsdfds', 3),
(13, 2, 1, 6, 1, 1, 'arreglar ', 'zcxczx', 1, '2015-05-07', '2015-05-26', '2015-05-24', 'sdfs', 3),
(14, 2, 1, 2, 2, 1, 'sdfsdf', 'sdf', 0, '2015-05-07', '2015-05-25', '2015-05-31', '''no posee observaciones''', 1),
(15, 2, 4, 2, 3, 1, 'dgfdfg', '', 0, '2015-05-07', '2015-05-20', '2015-05-26', '''no posee observaciones''', 1),
(16, 2, 2, 2, 2, 1, 'fremberling', '', 1, '2015-05-07', '2015-05-28', '2015-05-26', '''no posee observaciones''', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lineamiento`
--

CREATE TABLE IF NOT EXISTS `lineamiento` (
`id` int(11) NOT NULL,
  `evento` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `estatus` int(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `lineamiento`
--

INSERT INTO `lineamiento` (`id`, `evento`, `fecha`, `descripcion`, `estatus`) VALUES
(3, 3, '2015-05-07', 'dfsd', 1),
(4, 2, '2015-05-07', 'gdfg', 0),
(5, 2, '2015-05-07', 'lineamiento 2', 1),
(6, 2, '2015-05-07', 'bienvenido', 1),
(7, 2, '2015-05-07', 'neub', 0),
(8, 2, '2015-05-07', 'lineamiento 3', 1),
(9, 15, '2015-05-07', 'sdfsdf', 1),
(10, 16, '2015-05-07', 'lineamiento 3', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reincidencia`
--

CREATE TABLE IF NOT EXISTS `reincidencia` (
`id` int(11) NOT NULL,
  `evento` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `costo` float DEFAULT '0',
  `estatus` int(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `reincidencia`
--

INSERT INTO `reincidencia` (`id`, `evento`, `descripcion`, `fecha`, `costo`, `estatus`) VALUES
(1, 1, 'gfdg', '2015-05-19', 0, 1),
(2, 3, 'fsdf', '2015-05-13', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sector`
--

CREATE TABLE IF NOT EXISTS `sector` (
`id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `estatus` int(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `sector`
--

INSERT INTO `sector` (`id`, `nombre`, `estatus`) VALUES
(1, 'Educacion', 1),
(2, 'Salud', 1),
(3, 'Seguridad', 1),
(4, 'Administrativo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoevento`
--

CREATE TABLE IF NOT EXISTS `tipoevento` (
`id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `valor` int(11) NOT NULL,
  `estatus` int(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipoevento`
--

INSERT INTO `tipoevento` (`id`, `nombre`, `valor`, `estatus`) VALUES
(1, 'POA', 1, 1),
(2, 'Plan Estrategico', 2, 1),
(3, 'Orden Superior', 3, 1),
(4, 'Requerimiento Externo', 1, 1),
(5, 'Requerimiento Interno', 1, 1),
(6, 'Reclamo', 1, 1),
(7, 'Acuerdo', 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividad`
--
ALTER TABLE `actividad`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_actividad_evento1_idx` (`evento`), ADD KEY `fk_actividad_actividad1_idx` (`actividadepende`);

--
-- Indices de la tabla `agente`
--
ALTER TABLE `agente`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `alcance`
--
ALTER TABLE `alcance`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `anexo`
--
ALTER TABLE `anexo`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_anexo_reincidencia1_idx` (`reincidencia`), ADD KEY `fk_anexo_avance1_idx` (`avance`);

--
-- Indices de la tabla `avance`
--
ALTER TABLE `avance`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_avance_actividad1_idx` (`actividad`);

--
-- Indices de la tabla `comisionado`
--
ALTER TABLE `comisionado`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_evento_has_empleado_evento1_idx` (`evento`), ADD KEY `evento` (`evento`), ADD KEY `evento_2` (`evento`);

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_evento_agente_idx` (`agente`), ADD KEY `fk_evento_alcance1_idx` (`alcance`), ADD KEY `fk_evento_tipo_evento1_idx` (`tipoevento`), ADD KEY `fk_evento_sector1_idx` (`sector`);

--
-- Indices de la tabla `lineamiento`
--
ALTER TABLE `lineamiento`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_lineamiento_evento1_idx` (`evento`);

--
-- Indices de la tabla `reincidencia`
--
ALTER TABLE `reincidencia`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_reincidencia_evento1_idx` (`evento`);

--
-- Indices de la tabla `sector`
--
ALTER TABLE `sector`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipoevento`
--
ALTER TABLE `tipoevento`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividad`
--
ALTER TABLE `actividad`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=50;
--
-- AUTO_INCREMENT de la tabla `agente`
--
ALTER TABLE `agente`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `alcance`
--
ALTER TABLE `alcance`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `anexo`
--
ALTER TABLE `anexo`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `avance`
--
ALTER TABLE `avance`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=64;
--
-- AUTO_INCREMENT de la tabla `comisionado`
--
ALTER TABLE `comisionado`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `evento`
--
ALTER TABLE `evento`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT de la tabla `lineamiento`
--
ALTER TABLE `lineamiento`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `reincidencia`
--
ALTER TABLE `reincidencia`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `sector`
--
ALTER TABLE `sector`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `tipoevento`
--
ALTER TABLE `tipoevento`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividad`
--
ALTER TABLE `actividad`
ADD CONSTRAINT `fk_actividad_evento1` FOREIGN KEY (`evento`) REFERENCES `evento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `anexo`
--
ALTER TABLE `anexo`
ADD CONSTRAINT `fk_anexo_avance1` FOREIGN KEY (`avance`) REFERENCES `avance` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_anexo_reincidencia1` FOREIGN KEY (`reincidencia`) REFERENCES `reincidencia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `avance`
--
ALTER TABLE `avance`
ADD CONSTRAINT `fk_avance_actividad1` FOREIGN KEY (`actividad`) REFERENCES `actividad` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `evento`
--
ALTER TABLE `evento`
ADD CONSTRAINT `fk_evento_agente` FOREIGN KEY (`agente`) REFERENCES `agente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_evento_alcance1` FOREIGN KEY (`alcance`) REFERENCES `alcance` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_evento_sector1` FOREIGN KEY (`sector`) REFERENCES `sector` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_evento_tipo_evento1` FOREIGN KEY (`tipoevento`) REFERENCES `tipoevento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `lineamiento`
--
ALTER TABLE `lineamiento`
ADD CONSTRAINT `lineamiento_ibfk_1` FOREIGN KEY (`evento`) REFERENCES `evento` (`id`);

--
-- Filtros para la tabla `reincidencia`
--
ALTER TABLE `reincidencia`
ADD CONSTRAINT `fk_reincidencia_evento1` FOREIGN KEY (`evento`) REFERENCES `evento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
