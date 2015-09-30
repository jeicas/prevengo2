-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-05-2015 a las 14:40:47
-- Versión del servidor: 5.6.21
-- Versión de PHP: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;


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
  `estatus` int(1) DEFAULT NULL COMMENT '0-completado, 1-sin iniciar, 2-en ejecucion, 3-en revision , 4-cancelado, 5- expirado; para el estatus 1: son actividades que tiene 1 avance con estatus 1.para el estatus 2: son actividades con al menos 1 avance tipo parcial-con estatus 0. para el estatus 3: son actividades con avances de tipo final- con estatus 0. '
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='plan de accion de un evento';

--
-- Volcado de datos para la tabla `actividad`
--

INSERT INTO `actividad` (`id`, `usuario`, `evento`, `actividadepende`, `descripcion`, `fecharegistro`, `fechaaviso`, `fechatope`, `observacion`, `estatus`) VALUES
(1, 2, 1, NULL, 'plan 1', '2015-05-21', '2015-05-28', '2015-05-29', 'no tiene observaciones', 0),
(2, 2, 1, 1, 'plan 2', '2015-05-21', '2015-05-21', '2015-05-21', 'no tiene observaciones', 3),
(3, 2, 1, NULL, 'plan 3', '2015-05-21', '2015-05-21', '2015-05-21', 'no tiene observaciones', 2),
(4, 2, 1, 1, 'plan 4', '2015-05-21', '2015-05-21', '2015-05-21', 'no tiene observaciones', 3),
(5, 2, 1, 3, 'plan 5', '2015-05-21', '2015-05-21', '2015-05-21', 'no tiene observaciones', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agente`
--

CREATE TABLE IF NOT EXISTS `agente` (
`id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `estatus` int(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `agente`
--

INSERT INTO `agente` (`id`, `nombre`, `estatus`) VALUES
(1, 'Oficina de Personal', 1),
(2, 'Oficina de planificación y presupuesto', 1),
(3, 'nuevo agente', 1),
(4, 'nuevo', 1),
(5, 'nuevo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alcance`
--

CREATE TABLE IF NOT EXISTS `alcance` (
`id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `valor` int(11) NOT NULL,
  `estatus` int(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `alcance`
--

INSERT INTO `alcance` (`id`, `nombre`, `valor`, `estatus`) VALUES
(1, 'Individual', 1, 1),
(2, 'Colectivo', 2, 1),
(3, 'Sectorial', 1, 1),
(4, 'Multisectorial', 4, 1),
(5, 'General', 1, 1),
(6, 'v', 0, 1),
(7, 'qw', 2, 1);

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
  `observacion` varchar(100) NOT NULL DEFAULT 'no tiene observaciones',
  `estatus` int(1) NOT NULL COMMENT '0-completada, 1-sin iniciar, 2- cancelada, 3-expirada.'
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='son las actividades que se ejecutan de un plan de accion. ';

--
-- Volcado de datos para la tabla `avance`
--

INSERT INTO `avance` (`id`, `actividad`, `usuario`, `descripcion`, `fechaasignacion`, `fecharegistro`, `tipo`, `costo`, `observacion`, `estatus`) VALUES
(1, 1, 3, 'no tiene avances registrados', '2015-05-21', '0000-00-00', 2, 0, 'no tiene observaciones', 1),
(2, 1, 2, 'avance 1', '2015-05-21', '2015-05-21', 1, 0, 'no tiene observaciones', 0),
(3, 2, 2, 'avance final', '2015-05-21', '2015-05-21', 0, 0, 'porque no me gusta', 3),
(4, 3, 3, 'avance 5', '2015-05-21', '2015-05-21', 1, 0, 'no tiene observaciones', 0),
(5, 5, 3, 'no tiene avances registrados', '2015-05-21', '0000-00-00', 2, 0, 'no tiene observaciones', 1),
(6, 1, 2, 'avance 2', '2015-05-21', '2015-05-21', 1, 0, 'no tiene observaciones', 0),
(7, 1, 3, 'avance 3', '2015-05-21', '2015-05-21', 0, 0, 'no tiene observaciones', 0),
(8, 4, 3, 'nuevo avance', '2015-05-21', '2015-05-21', 0, 0, 'no tiene observaciones', 0),
(9, 2, 2, 'nuevo avance final', '2015-05-21', '2015-05-21', 0, 0, 'no tiene observaciones', 0),
(10, 3, 3, 'nuevo avance', '2015-05-21', '2015-05-21', 1, 0, 'no tiene observaciones', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comisionado`
--

CREATE TABLE IF NOT EXISTS `comisionado` (
`id` int(11) NOT NULL,
  `evento` int(11) NOT NULL,
  `empleado` int(11) DEFAULT NULL,
  `estatus` int(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comisionado`
--

INSERT INTO `comisionado` (`id`, `evento`, `empleado`, `estatus`) VALUES
(1, 1, 8, 1),
(2, 1, 9, 1),
(3, 1, 6, 1);

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
  `estatus` int(1) DEFAULT NULL COMMENT '0-resuelto,1-pendiente,2-cancelado,3-expirado, 4-sinplandeaccion'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `evento`
--

INSERT INTO `evento` (`id`, `agente`, `alcance`, `tipoevento`, `sector`, `usuario`, `titulo`, `descripcion`, `presupuesto`, `fecharegistro`, `fechatope`, `fechapreaviso`, `observacion`, `estatus`) VALUES
(1, 2, 3, 5, 4, 1, 'Nuevo Evento', 'Evento con prueba de todo', 0, '2015-05-21', '2015-05-25', '2015-05-31', '''no posee observaciones''', 2);

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `lineamiento`
--

INSERT INTO `lineamiento` (`id`, `evento`, `fecha`, `descripcion`, `estatus`) VALUES
(1, 1, '2015-05-21', 'Lineamiento 1', 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sector`
--

CREATE TABLE IF NOT EXISTS `sector` (
`id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `estatus` int(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `sector`
--

INSERT INTO `sector` (`id`, `nombre`, `estatus`) VALUES
(1, 'Educacion', 1),
(2, 'Salud', 1),
(3, 'Seguridad', 1),
(4, 'Administrativo', 1),
(5, 'v', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoevento`
--

CREATE TABLE IF NOT EXISTS `tipoevento` (
`id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `valor` int(11) NOT NULL,
  `estatus` int(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipoevento`
--

INSERT INTO `tipoevento` (`id`, `nombre`, `valor`, `estatus`) VALUES
(1, 'POA', 1, 1),
(2, 'Plan Estrategico', 5, 1),
(3, 'Orden Superior', 3, 1),
(4, 'Requerimiento Externo', 1, 1),
(5, 'Requerimiento Interno', 1, 1),
(6, 'Reclamo', 1, 1),
(7, 'Acuerdo', 1, 1),
(8, 'nuevo', 1, 1),
(9, 'tipo3', 790, 1);

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
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `agente`
--
ALTER TABLE `agente`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `alcance`
--
ALTER TABLE `alcance`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `anexo`
--
ALTER TABLE `anexo`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `avance`
--
ALTER TABLE `avance`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `comisionado`
--
ALTER TABLE `comisionado`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `evento`
--
ALTER TABLE `evento`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `lineamiento`
--
ALTER TABLE `lineamiento`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `reincidencia`
--
ALTER TABLE `reincidencia`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `sector`
--
ALTER TABLE `sector`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `tipoevento`
--
ALTER TABLE `tipoevento`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `evento`
--
ALTER TABLE `evento`
ADD CONSTRAINT `fk_evento_agente` FOREIGN KEY (`agente`) REFERENCES `agente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_evento_alcance1` FOREIGN KEY (`alcance`) REFERENCES `alcance` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_evento_sector1` FOREIGN KEY (`sector`) REFERENCES `sector` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_evento_tipo_evento1` FOREIGN KEY (`tipoevento`) REFERENCES `tipoevento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
