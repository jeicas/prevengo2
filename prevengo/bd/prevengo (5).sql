-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-04-2015 a las 21:48:32
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad`
--

CREATE TABLE IF NOT EXISTS `actividad` (
`id` int(11) NOT NULL,
  `usuario` int(11) NOT NULL,
  `evento` int(11) NOT NULL,
  `actividad` int(11) DEFAULT NULL COMMENT 'Este campo indica si la actividad depende de otra para poder iniciarla. ',
  `descripcion` varchar(100) DEFAULT 'no tiene actividades registrado',
  `fecharegistro` date DEFAULT NULL,
  `fechaaviso` date DEFAULT NULL,
  `fechatope` date DEFAULT NULL,
  `estatus` int(1) DEFAULT NULL COMMENT '0-completado, 1-sin iniciar, 2-en ejecucion, 3-en revision , 4-cancelado, 5- expirado\n\npara el estatus 1: son actividades que tiene 1 avance con estatus 1.\n\npara el estatus 2: son actividades con al menos 1 avance tipo parcial-con estatus 0. \n\npara el estatus 3: son actividades con avances de tipo final- con estatus 0. '
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='plan de accion de un evento';

--
-- Volcado de datos para la tabla `actividad`
--

INSERT INTO `actividad` (`id`, `usuario`, `evento`, `actividad`, `descripcion`, `fecharegistro`, `fechaaviso`, `fechatope`, `estatus`) VALUES
(1, 1, 1, NULL, 'Elaborar Bases del Concurso', '2015-04-16', '2015-04-23', '2015-04-23', 0),
(2, 1, 2, NULL, 'Apertura del  Concurso', '2015-04-23', '2015-04-30', '2015-04-25', 3),
(3, 0, 2, NULL, 'Promocion del concurso', '2015-04-10', '2015-04-17', '2015-04-24', 0),
(4, 1, 1, NULL, 'Recepcion del ideas', '2015-04-10', '2015-04-17', '2015-04-30', 2);

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
(2, 'Colectivo', 1, 1),
(3, 'Sectorial', 1, 1),
(4, 'Multisectorial', 1, 1),
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
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8 COMMENT='son las actividades que se ejecutan de un plan de accion. ';

--
-- Volcado de datos para la tabla `avance`
--

INSERT INTO `avance` (`id`, `actividad`, `usuario`, `descripcion`, `fechaasignacion`, `fecharegistro`, `tipo`, `costo`, `estatus`) VALUES
(47, 1, 3, 'holaaaa', '2015-04-15', '2015-04-23', 1, 1, 0),
(48, 2, 2, 'Se aperturó el concurso', '2015-04-21', '2015-04-22', 0, 0, 0),
(49, 3, 1, 'Se elaboró reglamento final de bases', '2015-04-15', '2015-04-22', 0, 10, 0),
(50, 1, 3, '', '2015-04-15', '2015-04-23', 1, 2313, 1),
(51, 1, 3, 'fin', '2015-04-15', '2015-04-23', 0, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comisionado`
--

CREATE TABLE IF NOT EXISTS `comisionado` (
`evento` int(11) NOT NULL,
  `empleado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `estatus` int(1) DEFAULT NULL COMMENT '0-resuelto,1-pendiente,2-cancelado,3-expirado'
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `evento`
--

INSERT INTO `evento` (`id`, `agente`, `alcance`, `tipoevento`, `sector`, `usuario`, `titulo`, `descripcion`, `presupuesto`, `fecharegistro`, `fechatope`, `fechapreaviso`, `estatus`) VALUES
(1, 1, 1, 1, 1, 4, 'concurso de ideas "Política y Gestión"', 'Acto de propuesta ganadora del concurso de ideas "Política y Gestion"', 0, '2015-04-16', '2015-04-01', '2015-04-22', 1),
(2, 2, 3, 5, 3, 2, 'Caminata 10K', 'Caminata de 10 kilometros para motivar al personal a que cuide su estado de salud.', 0, '2015-04-15', '2015-04-23', '2015-04-21', 1),
(3, 1, 4, 6, 4, 1, 'Rendición de Crédito adicional 2014  salario ', 'no tiene descripcion', 100000, '2015-04-15', '2015-04-30', '2015-04-22', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lineamiento`
--

CREATE TABLE IF NOT EXISTS `lineamiento` (
`id` int(11) NOT NULL,
  `idevento` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `estatus` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(2, 'Plan Estrategico', 1, 1),
(3, 'Orden Superior', 1, 1),
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
 ADD PRIMARY KEY (`id`), ADD KEY `fk_actividad_evento1_idx` (`evento`), ADD KEY `fk_actividad_actividad1_idx` (`actividad`);

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
 ADD PRIMARY KEY (`evento`), ADD KEY `fk_evento_has_empleado_evento1_idx` (`evento`);

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_evento_agente_idx` (`agente`), ADD KEY `fk_evento_alcance1_idx` (`alcance`), ADD KEY `fk_evento_tipo_evento1_idx` (`tipoevento`), ADD KEY `fk_evento_sector1_idx` (`sector`);

--
-- Indices de la tabla `lineamiento`
--
ALTER TABLE `lineamiento`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_lineamiento_evento1_idx` (`idevento`);

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
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
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
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=52;
--
-- AUTO_INCREMENT de la tabla `comisionado`
--
ALTER TABLE `comisionado`
MODIFY `evento` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `evento`
--
ALTER TABLE `evento`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `lineamiento`
--
ALTER TABLE `lineamiento`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `reincidencia`
--
ALTER TABLE `reincidencia`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
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
ADD CONSTRAINT `fk_actividad_actividad1` FOREIGN KEY (`actividad`) REFERENCES `actividad` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
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
-- Filtros para la tabla `comisionado`
--
ALTER TABLE `comisionado`
ADD CONSTRAINT `fk_evento_has_empleado_evento1` FOREIGN KEY (`evento`) REFERENCES `evento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
ADD CONSTRAINT `fk_lineamiento_evento1` FOREIGN KEY (`idevento`) REFERENCES `evento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `reincidencia`
--
ALTER TABLE `reincidencia`
ADD CONSTRAINT `fk_reincidencia_evento1` FOREIGN KEY (`evento`) REFERENCES `evento` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
