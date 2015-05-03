-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-04-2015 a las 22:26:21
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
`idactividad` int(11) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `idevento` int(11) NOT NULL,
  `depende_idactividad` int(11) DEFAULT NULL COMMENT 'Este campo indica si la actividad depende de otra para poder iniciarla. ',
  `descripcion` varchar(100) DEFAULT 'no tiene actividades registrado',
  `fecharegistro` date DEFAULT '0000-00-00',
  `fechaaviso` date DEFAULT '0000-00-00',
  `fechatope` date DEFAULT '0000-00-00',
  `estatus` int(1) DEFAULT NULL COMMENT '0-completado, 1-sin iniciar, 2-en ejecución, 3-en revisión , 4-cancelado, 5- expirado 6-completado y expirado. Para el estatus 1: son actividades que tiene 1 avance con estatus 1.para el estatus 2: son actividades con al menos 1 avance tipo parcial-con estatus 0. para el estatus 3: son actividades con avances de tipo final- con estatus 0. '
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='plan de accion de un evento';

--
-- Volcado de datos para la tabla `actividad`
--

INSERT INTO `actividad` (`idactividad`, `idusuario`, `idevento`, `depende_idactividad`, `descripcion`, `fecharegistro`, `fechaaviso`, `fechatope`, `estatus`) VALUES
(1, 1, 1, NULL, 'Elaborar Bases del Concurso', '2015-04-16', '2015-04-23', '2015-04-23', 2),
(2, 1, 2, NULL, 'Apertura del  Concurso', '2015-04-23', '2015-04-30', '2015-04-25', 2),
(3, 0, 1, NULL, 'Promocion del concurso', '2015-04-10', '2015-04-17', '2015-04-24', 2),
(4, 1, 1, NULL, 'Recepcion del ideas', '2015-04-10', '2015-04-17', '2015-04-30', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agente`
--

CREATE TABLE IF NOT EXISTS `agente` (
`idagente` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `estatus` int(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `agente`
--

INSERT INTO `agente` (`idagente`, `nombre`, `estatus`) VALUES
(1, 'Oficina de Personal', 1),
(2, 'Oficina de planificación y presupuesto', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alcance`
--

CREATE TABLE IF NOT EXISTS `alcance` (
`idalcance` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `valor` int(11) NOT NULL,
  `estatus` int(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `alcance`
--

INSERT INTO `alcance` (`idalcance`, `nombre`, `valor`, `estatus`) VALUES
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
`idanexo` int(11) NOT NULL,
  `avance_idavance` int(11) DEFAULT NULL,
  `reincidencia_idreincidencia` int(11) DEFAULT NULL,
  `direccion` varchar(45) NOT NULL DEFAULT 'no tiene anexo asociado' COMMENT 'contiene la direccion donde esta alojado el archivo. ',
  `tipoarchivo` varchar(45) NOT NULL DEFAULT 's/e' COMMENT 'aca se guarda la extension del tipo de archivo que esta subiendo.',
  `estatus` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avance`
--

CREATE TABLE IF NOT EXISTS `avance` (
`idavance` int(11) NOT NULL,
  `idactividad` int(11) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `descripcion` varchar(200) NOT NULL DEFAULT 'no tiene avances registrados',
  `fechaasignacion` date NOT NULL DEFAULT '0000-00-00',
  `fecharegistro` date NOT NULL DEFAULT '0000-00-00',
  `tipo` int(11) NOT NULL DEFAULT '2' COMMENT '0-final,1-parcial, 2-sin tipo',
  `costo` float NOT NULL DEFAULT '0' COMMENT 'Es el gasto que se realizo para la ejecucion del avance. \nAl acumular todos los costos de los avances de las actividades del evento el valor debe ser menor io igual ( <= ) al presupuesto del evento. ',
  `estatus` int(1) NOT NULL COMMENT '0-completada, 1-sin iniciar, 2- cancelada, 3-rechazada 4-completada y expirada.'
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COMMENT='son las actividades que se ejecutan de un plan de accion. ';

--
-- Volcado de datos para la tabla `avance`
--

INSERT INTO `avance` (`idavance`, `idactividad`, `idusuario`, `descripcion`, `fechaasignacion`, `fecharegistro`, `tipo`, `costo`, `estatus`) VALUES
(1, 1, 3, 'Se elaboró borrador inicial de bases', '2015-04-22', '2015-04-30', 1, 0, 0),
(2, 2, 3, 'avanza', '2015-04-23', '2015-04-20', 1, 1, 0),
(3, 1, 3, 'ggg', '2015-04-16', '2015-04-16', 0, 1, 0),
(4, 1, 3, 'asss', '2015-04-16', '2015-04-16', 1, 1, 0),
(5, 1, 3, 'asd', '2015-04-16', '2015-04-16', 1, 12, 0),
(6, 1, 3, 'sdf', '2015-04-16', '2015-04-16', 1, 23, 0),
(7, 1, 3, 'a', '2015-04-17', '2015-04-17', 1, 21, 4),
(8, 2, 2, 'a', '2015-04-22', '2015-04-17', 1, 1, 0),
(9, 1, 1, 'a', '2015-04-22', '2015-04-20', 1, 1, 0),
(10, 1, 3, 'zsd', '2015-04-22', '2015-04-20', 1, 2, 0),
(11, 1, 1, 'a', '2015-04-22', '2015-04-20', 1, 12, 0),
(12, 2, 1, 'aasssss', '2015-04-23', '2015-04-20', 1, 12, 0),
(13, 1, 3, 'a', '2015-04-22', '2015-04-20', 1, 1, 0),
(14, 3, 3, 'Nuevo', '2015-04-19', '2015-04-20', 1, 1, 0),
(15, 3, 3, '213', '2015-04-19', '2015-04-20', 1, 123123, 0),
(16, 3, 3, 'asa', '2015-04-19', '2015-04-20', 1, 1, 0),
(17, 2, 3, 'sad', '2015-04-23', '2015-04-20', 0, 12, 0),
(18, 3, 3, 'Publicidad en los diferentes medios de comunicacion', '2015-04-19', '2015-04-21', 1, 1, 0),
(19, 3, 3, 'Publicidad en los medios de comunicacion', '2015-04-19', '2015-04-21', 1, 1000, 0),
(20, 3, 3, 'Publicidad en los medios de comunicacion', '2015-04-19', '2015-04-21', 1, 1000, 0),
(21, 3, 3, 'bbh', '2015-04-19', '2015-04-21', 1, 121212, 0),
(22, 3, 3, 'qweqwe', '2015-04-19', '2015-04-21', 1, 1111, 0),
(23, 1, 3, 'dsfsdf', '2015-04-22', '2015-04-21', 0, 231312, 0),
(24, 2, 3, 'dsfsdf', '2015-04-23', '2015-04-21', 0, 231312, 0),
(25, 2, 3, 'dsfsdf', '2015-04-23', '2015-04-21', 0, 231312, 0),
(26, 1, 3, 'cvbcvb', '2015-04-22', '2015-04-21', 0, 12312, 0),
(27, 1, 3, 'A', '2015-04-22', '2015-04-21', 0, 2313, 0),
(28, 2, 3, 'A', '2015-04-23', '2015-04-21', 0, 2313, 0),
(29, 1, 3, 'sdfsdf', '2015-04-22', '2015-04-21', 0, 21, 0),
(30, 1, 3, 'sdfsdf', '2015-04-22', '2015-04-21', 0, 21, 0),
(31, 2, 3, 'sdfsdf', '2015-04-23', '2015-04-21', 0, 21, 0),
(32, 1, 3, 'asd', '2015-04-22', '2015-04-21', 0, 1, 0),
(33, 1, 3, 'asd', '2015-04-22', '2015-04-21', 1, 2, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comisionado`
--

CREATE TABLE IF NOT EXISTS `comisionado` (
`idevento` int(11) NOT NULL,
  `idempleado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE IF NOT EXISTS `evento` (
`idevento` int(11) NOT NULL,
  `idagente` int(11) NOT NULL,
  `idalcance` int(11) NOT NULL,
  `idtipoevento` int(11) NOT NULL,
  `idsector` int(11) NOT NULL,
  `idusuario` int(11) DEFAULT NULL,
  `titulo` varchar(45) NOT NULL,
  `descripcion` varchar(100) DEFAULT 'no tiene descripcion',
  `presupuesto` float DEFAULT '0' COMMENT 'Es el monto que se dispone para la ejecución del evento. ',
  `fecharegistro` date DEFAULT '0000-00-00',
  `fechatope` date DEFAULT '0000-00-00',
  `fechapreaviso` date DEFAULT '0000-00-00',
  `estatus` int(1) DEFAULT NULL COMMENT '0-resuelto,1-pendiente,2- en ejecucion,  3-cancelado, 4-expirado'
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `evento`
--

INSERT INTO `evento` (`idevento`, `idagente`, `idalcance`, `idtipoevento`, `idsector`, `idusuario`, `titulo`, `descripcion`, `presupuesto`, `fecharegistro`, `fechatope`, `fechapreaviso`, `estatus`) VALUES
(1, 1, 1, 1, 1, 4, 'concurso de ideas "Política y Gestión"', 'Acto de propuesta ganadora del concurso de ideas "Política y Gestion"', 0, '2015-04-16', '2015-04-01', '2015-04-22', 1),
(2, 2, 3, 5, 3, 2, 'Caminata 10K', 'Caminata de 10 kilometros para motivar al personal a que cuide su estado de salud.', 0, '2015-04-15', '2015-04-23', '2015-04-21', 1),
(3, 1, 4, 6, 4, 1, 'Rendición de Crédito adicional 2014  salario ', 'no tiene descripcion', 100000, '2015-04-15', '2015-04-30', '2015-04-22', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lineamiento`
--

CREATE TABLE IF NOT EXISTS `lineamiento` (
`idlineamiento` int(11) NOT NULL,
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
`idreincidencia` int(11) NOT NULL,
  `idevento` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `costo` float DEFAULT '0',
  `estatus` int(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `reincidencia`
--

INSERT INTO `reincidencia` (`idreincidencia`, `idevento`, `descripcion`, `fecha`, `costo`, `estatus`) VALUES
(1, 1, 'MArcha', '2015-04-30', 0, 1),
(2, 1, 'Fueron a Conapdi', '2015-04-30', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sector`
--

CREATE TABLE IF NOT EXISTS `sector` (
`idsector` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `estatus` int(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `sector`
--

INSERT INTO `sector` (`idsector`, `nombre`, `estatus`) VALUES
(1, 'Educacion', 1),
(2, 'Salud', 1),
(3, 'Seguridad', 1),
(4, 'Administrativo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_evento`
--

CREATE TABLE IF NOT EXISTS `tipo_evento` (
`idtipo_evento` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `valor` int(11) NOT NULL,
  `estatus` int(1) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_evento`
--

INSERT INTO `tipo_evento` (`idtipo_evento`, `nombre`, `valor`, `estatus`) VALUES
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
 ADD PRIMARY KEY (`idactividad`), ADD KEY `fk_actividad_evento1_idx` (`idevento`), ADD KEY `fk_actividad_actividad1_idx` (`depende_idactividad`);

--
-- Indices de la tabla `agente`
--
ALTER TABLE `agente`
 ADD PRIMARY KEY (`idagente`);

--
-- Indices de la tabla `alcance`
--
ALTER TABLE `alcance`
 ADD PRIMARY KEY (`idalcance`);

--
-- Indices de la tabla `anexo`
--
ALTER TABLE `anexo`
 ADD PRIMARY KEY (`idanexo`), ADD KEY `fk_anexo_reincidencia1_idx` (`reincidencia_idreincidencia`), ADD KEY `fk_anexo_avance1_idx` (`avance_idavance`);

--
-- Indices de la tabla `avance`
--
ALTER TABLE `avance`
 ADD PRIMARY KEY (`idavance`), ADD KEY `fk_avance_actividad1_idx` (`idactividad`);

--
-- Indices de la tabla `comisionado`
--
ALTER TABLE `comisionado`
 ADD PRIMARY KEY (`idevento`), ADD KEY `fk_evento_has_empleado_evento1_idx` (`idevento`);

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
 ADD PRIMARY KEY (`idevento`), ADD KEY `fk_evento_agente_idx` (`idagente`), ADD KEY `fk_evento_alcance1_idx` (`idalcance`), ADD KEY `fk_evento_tipo_evento1_idx` (`idtipoevento`), ADD KEY `fk_evento_sector1_idx` (`idsector`);

--
-- Indices de la tabla `lineamiento`
--
ALTER TABLE `lineamiento`
 ADD PRIMARY KEY (`idlineamiento`), ADD KEY `fk_lineamiento_evento1_idx` (`idevento`);

--
-- Indices de la tabla `reincidencia`
--
ALTER TABLE `reincidencia`
 ADD PRIMARY KEY (`idreincidencia`), ADD KEY `fk_reincidencia_evento1_idx` (`idevento`);

--
-- Indices de la tabla `sector`
--
ALTER TABLE `sector`
 ADD PRIMARY KEY (`idsector`);

--
-- Indices de la tabla `tipo_evento`
--
ALTER TABLE `tipo_evento`
 ADD PRIMARY KEY (`idtipo_evento`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividad`
--
ALTER TABLE `actividad`
MODIFY `idactividad` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `agente`
--
ALTER TABLE `agente`
MODIFY `idagente` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `alcance`
--
ALTER TABLE `alcance`
MODIFY `idalcance` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `anexo`
--
ALTER TABLE `anexo`
MODIFY `idanexo` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `avance`
--
ALTER TABLE `avance`
MODIFY `idavance` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT de la tabla `comisionado`
--
ALTER TABLE `comisionado`
MODIFY `idevento` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `evento`
--
ALTER TABLE `evento`
MODIFY `idevento` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `lineamiento`
--
ALTER TABLE `lineamiento`
MODIFY `idlineamiento` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `reincidencia`
--
ALTER TABLE `reincidencia`
MODIFY `idreincidencia` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `sector`
--
ALTER TABLE `sector`
MODIFY `idsector` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `tipo_evento`
--
ALTER TABLE `tipo_evento`
MODIFY `idtipo_evento` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividad`
--
ALTER TABLE `actividad`
ADD CONSTRAINT `fk_actividad_actividad1` FOREIGN KEY (`depende_idactividad`) REFERENCES `actividad` (`idactividad`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_actividad_evento1` FOREIGN KEY (`idevento`) REFERENCES `evento` (`idevento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `anexo`
--
ALTER TABLE `anexo`
ADD CONSTRAINT `fk_anexo_avance1` FOREIGN KEY (`avance_idavance`) REFERENCES `avance` (`idavance`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_anexo_reincidencia1` FOREIGN KEY (`reincidencia_idreincidencia`) REFERENCES `reincidencia` (`idreincidencia`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `avance`
--
ALTER TABLE `avance`
ADD CONSTRAINT `fk_avance_actividad1` FOREIGN KEY (`idactividad`) REFERENCES `actividad` (`idactividad`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `comisionado`
--
ALTER TABLE `comisionado`
ADD CONSTRAINT `fk_evento_has_empleado_evento1` FOREIGN KEY (`idevento`) REFERENCES `evento` (`idevento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `evento`
--
ALTER TABLE `evento`
ADD CONSTRAINT `fk_evento_agente` FOREIGN KEY (`idagente`) REFERENCES `agente` (`idagente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_evento_alcance1` FOREIGN KEY (`idalcance`) REFERENCES `alcance` (`idalcance`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_evento_sector1` FOREIGN KEY (`idsector`) REFERENCES `sector` (`idsector`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_evento_tipo_evento1` FOREIGN KEY (`idtipoevento`) REFERENCES `tipo_evento` (`idtipo_evento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `lineamiento`
--
ALTER TABLE `lineamiento`
ADD CONSTRAINT `fk_lineamiento_evento1` FOREIGN KEY (`idevento`) REFERENCES `evento` (`idevento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `reincidencia`
--
ALTER TABLE `reincidencia`
ADD CONSTRAINT `fk_reincidencia_evento1` FOREIGN KEY (`idevento`) REFERENCES `evento` (`idevento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
