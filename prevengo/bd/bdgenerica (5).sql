-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-04-2015 a las 22:24:58
-- Versión del servidor: 5.6.21
-- Versión de PHP: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `bdgenerica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargo`
--

CREATE TABLE IF NOT EXISTS `cargo` (
`id` int(3) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `nivel` int(3) NOT NULL DEFAULT '0',
  `estatus` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cargo`
--

INSERT INTO `cargo` (`id`, `nombre`, `nivel`, `estatus`) VALUES
(1, 'ADMINISTRADOR II', 1, 1),
(2, 'ANALIST. DE ORG. Y SISTEMAS II', 2, 1),
(3, 'ANALIST. DE PROC. DE DATOS III', 2, 1),
(4, 'ANALISTA DE ORG. Y SISTEMAS I', 1, 1),
(5, 'ANALISTA DE PROC. DE DATOS I', 1, 1),
(6, 'ANALISTA DE PROC. DE DATOS II', 1, 1),
(7, 'ASEADORA', 1, 1),
(8, 'ASISTENT. ADMINISTRATIVO III', 1, 1),
(9, 'ASISTENTE ADMINISTRATIVO I', 1, 1),
(10, 'ASISTENTE ADMINISTRATIVO IV', 1, 1),
(11, 'AUXILIAR DE OFICINA', 1, 1),
(12, 'AUXILIAR DE SERV G.', 1, 1),
(13, 'CHOFER', 1, 1),
(14, 'CHOFER ADMINISTRATIVO', 1, 1),
(15, 'CONTADOR I', 1, 1),
(16, 'CONTRATADO', 1, 1),
(17, 'COORDINADOR EJECUTIVO', 1, 1),
(18, 'ESPEC. EN INFORMATICA I', 1, 1),
(19, 'JEFE DE DIVISION', 1, 1),
(20, 'JEFE DE INFORMATICA II', 1, 1),
(21, 'JEFE DE OFICINA', 1, 1),
(22, 'OPERADOR DE EQU. COMPUT. I', 1, 1),
(23, 'OPERADOR DE EQU. COMPUT. III', 1, 1),
(24, 'PROGRAMADOR III', 1, 1),
(25, 'PROGRAMADOR IV', 1, 1),
(26, 'REVISOR DE CONTRALORIA I', 1, 1),
(27, 'SECRETARIA EJECUTIVA III', 1, 1),
(28, 'SECRETARIA I ', 1, 1),
(29, 'SECRETARIA III', 1, 1),
(30, 'TECNICO EN REPAR. Y MANT. I', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dependencia`
--

CREATE TABLE IF NOT EXISTS `dependencia` (
`id` int(3) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `correodepartamento` varchar(100) NOT NULL,
  `clave` varchar(100) NOT NULL,
  `dependencia` int(3) DEFAULT NULL,
  `nro_niveles` int(3) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `dependencia`
--

INSERT INTO `dependencia` (`id`, `nombre`, `correodepartamento`, `clave`, `dependencia`, `nro_niveles`) VALUES
(1, 'Informatica', 'informaticagobernacion@gmail.com', '1234', NULL, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `division`
--

CREATE TABLE IF NOT EXISTS `division` (
`id` int(3) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `dependencia` int(3) NOT NULL,
  `division` int(3) DEFAULT NULL COMMENT 'Las claves primarias que no son obligatorias tienen NULL como valor por defecto'
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `division`
--

INSERT INTO `division` (`id`, `nombre`, `dependencia`, `division`) VALUES
(4, 'Desarrollo', 1, NULL),
(5, 'Hardware y redes', 1, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE IF NOT EXISTS `empleado` (
`id` int(3) NOT NULL,
  `cedula` int(10) NOT NULL,
  `nacionalidad` char(1) NOT NULL,
  `fechaingreso` date NOT NULL,
  `division` int(3) DEFAULT NULL COMMENT 'Las claves primarias que no son obligatorias tienen NULL como valor por defecto',
  `horario` int(3) DEFAULT NULL COMMENT 'Las claves primarias que no son obligatorias tienen NULL como valor por defecto',
  `tiponomina` int(3) NOT NULL,
  `cargo` int(3) NOT NULL,
  `ente` int(3) DEFAULT NULL COMMENT 'Las claves primarias que no son obligatorias tienen NULL como valor por defecto',
  `estatus` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COMMENT='empleados que herada de persona';

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`id`, `cedula`, `nacionalidad`, `fechaingreso`, `division`, `horario`, `tiponomina`, `cargo`, `ente`, `estatus`) VALUES
(2, 23364399, 'V', '2015-03-26', 4, NULL, 2, 1, NULL, 1),
(5, 18, 'V', '2015-04-06', 5, NULL, 1, 3, NULL, 1),
(6, 202020, 'V', '2013-01-08', 5, NULL, 2, 11, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ente`
--

CREATE TABLE IF NOT EXISTS `ente` (
`id` int(3) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `tipo` char(1) NOT NULL,
  `parroquia` int(3) NOT NULL,
  `direccion` text NOT NULL,
  `correoente` varchar(45) NOT NULL,
  `clave` varchar(45) NOT NULL,
  `codigo` varchar(4) NOT NULL,
  `telefonoente` int(7) NOT NULL,
  `faxente` int(7) DEFAULT '0',
  `estatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE IF NOT EXISTS `estado` (
  `id` int(3) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`id`, `nombre`) VALUES
(1, 'DISTRITO CAPITAL'),
(2, 'ANZOÁTEGUI'),
(3, 'APURE'),
(4, 'ARAGUA'),
(5, 'BARINAS'),
(6, 'BOLÍVAR'),
(7, 'CARABOBO'),
(8, 'COJEDES'),
(9, 'FALCÓN'),
(10, 'GUÁRICO'),
(11, 'LARA'),
(12, 'MÉRIDA'),
(13, 'MIRANDA'),
(14, 'MONAGAS'),
(15, 'NUEVA ESPARTA'),
(16, 'PORTUGUESA'),
(17, 'SUCRE'),
(18, 'TÁCHIRA'),
(19, 'TRUJILLO'),
(20, 'YARACUY'),
(21, 'ZULIA'),
(22, 'AMAZONAS'),
(23, 'DELTA AMACURO'),
(24, 'VARGAS'),
(99, 'EMBAJADA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE IF NOT EXISTS `horario` (
`id` int(3) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `horaentrada` time NOT NULL,
  `horasalida` time NOT NULL,
  `tiempoalmuerzo` time NOT NULL,
  `horarioespecial` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `institucion`
--

CREATE TABLE IF NOT EXISTS `institucion` (
`id` int(3) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `siglas` varchar(45) NOT NULL,
  `estatus` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `institucion`
--

INSERT INTO `institucion` (`id`, `nombre`, `siglas`, `estatus`) VALUES
(1, 'GOBERNACION DEL ESTADO LARA', 'GEL', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu`
--

CREATE TABLE IF NOT EXISTS `menu` (
`id` int(3) NOT NULL,
  `text` text NOT NULL,
  `iconCls` varchar(45) NOT NULL,
  `className` varchar(200) DEFAULT NULL COMMENT 'Alias de la vista',
  `controller` varchar(200) DEFAULT NULL,
  `padre` int(11) DEFAULT NULL COMMENT 'clave foranea a padre'
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `menu`
--

INSERT INTO `menu` (`id`, `text`, `iconCls`, `className`, `controller`, `padre`) VALUES
(1, 'Registros Básicos', '', NULL, '', NULL),
(2, 'Eventos', '', NULL, '', NULL),
(3, 'Reportes', '', NULL, '', NULL),
(4, 'Sesión', '', NULL, '', NULL),
(5, 'Usuario', 'registro1', 'usuario', 'registrar.UsuarioController', 1),
(6, 'Registrar Evento', 'registro1', 'evento', 'registrar.EventoController', 2),
(7, 'Registrar Lineamientos', 'registro1', 'autorizados', 'consultar.AutorizadosController', 2),
(8, 'Registrar Comisionados', 'registro1', 'empleado', 'registrar.EmpleadoController', 2),
(9, 'Cambio de clave', 'registro1', 'contrasena', 'registrar.ContrasenaController', 4),
(10, 'Cerrar sesión', 'registro1', NULL, 'login.SalirController', 4),
(11, 'Asignar Responsables', 'registro1', 'consultarautorizados', 'consultar.ConsultarAutorizadosController', 2),
(12, 'Registrar Reincidencias', 'registro1', 'procesadas', 'consultar.ProcesadosController', 2),
(13, 'Listados', 'registro1', 'reportegen', 'reportes.Reportegeneral', 3),
(14, 'Plan de Acción', '', NULL, NULL, NULL),
(15, 'Avances', '', NULL, NULL, NULL),
(16, 'Registrar Actividad', 'registro1', NULL, NULL, 14),
(17, 'Asignar Ejecutor', 'registro1', NULL, NULL, 14),
(18, 'Evaluar Avances', 'registro1', 'listaAvanceFinal', 'consultar.AvanceListaController', 14),
(19, 'Consultar Avances', 'registro1', 'gridConsultarAvances', 'consultar.AvanceListaController', 14),
(20, 'Consultar Eventos', 'registro1', '', '', 3),
(21, 'Registrar Avance', 'registro1', 'avance', 'avance.AvanceController', 15),
(22, 'Avances ', 'registro1', 'gridListaAvance', 'avance.AvanceController', 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipio`
--

CREATE TABLE IF NOT EXISTS `municipio` (
`id` int(3) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `estado` int(3) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `municipio`
--

INSERT INTO `municipio` (`id`, `nombre`, `estado`) VALUES
(1, 'Iribarren', 11),
(2, 'Palavecinos', 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivel`
--

CREATE TABLE IF NOT EXISTS `nivel` (
`id` int(3) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `estatus` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `nivel`
--

INSERT INTO `nivel` (`id`, `nombre`, `estatus`) VALUES
(1, 'Jefe', 1),
(2, 'empleado', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parroquia`
--

CREATE TABLE IF NOT EXISTS `parroquia` (
`id` int(3) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `municipio` int(3) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `parroquia`
--

INSERT INTO `parroquia` (`id`, `nombre`, `municipio`) VALUES
(8, 'El cujji', 1),
(9, 'Juan de Villegas', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE IF NOT EXISTS `permiso` (
  `tipousuario` int(3) NOT NULL,
  `menu` int(3) NOT NULL,
  `observacion` varchar(400) DEFAULT 'No posee descripcion'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `permiso`
--

INSERT INTO `permiso` (`tipousuario`, `menu`, `observacion`) VALUES
(1, 1, 'No posee descripcion'),
(1, 2, 'No posee descripcion'),
(1, 3, 'No posee descripcion'),
(1, 4, 'No posee descripcion'),
(1, 5, 'No posee descripcion'),
(1, 6, 'No posee descripcion'),
(1, 7, 'No posee descripcion'),
(1, 8, 'No posee descripcion'),
(1, 9, 'No posee descripcion'),
(1, 10, 'No posee descripcion'),
(1, 11, 'No posee descripcion'),
(1, 12, 'No posee descripcion'),
(1, 13, 'No posee descripcion'),
(2, 2, 'No posee descripcion'),
(2, 3, 'No posee descripcion'),
(2, 4, 'No posee descripcion'),
(2, 10, 'No posee descripcion'),
(2, 14, 'No posee descripcion'),
(2, 15, 'No posee descripcion'),
(2, 16, 'No posee descripcion'),
(2, 17, 'No posee descripcion'),
(2, 18, 'No posee descripcion'),
(2, 19, 'No posee descripcion'),
(2, 20, 'No posee descripcion'),
(2, 21, 'No posee descripcion'),
(3, 4, 'No posee descripcion'),
(3, 10, 'No posee descripcion'),
(3, 15, 'No posee descripcion'),
(3, 21, 'No posee descripcion'),
(3, 22, 'No posee descripcion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE IF NOT EXISTS `persona` (
  `cedula` int(8) NOT NULL,
  `nacionalidad` char(1) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `apellido` varchar(25) NOT NULL,
  `direccion` text NOT NULL,
  `telefono1` int(11) NOT NULL,
  `telefono2` int(11) DEFAULT '0',
  `correo` varchar(25) NOT NULL,
  `fechanacimiento` date NOT NULL,
  `edocivil` char(1) NOT NULL,
  `sexo` char(1) NOT NULL,
  `nrohijos` int(2) NOT NULL,
  `foto` text,
  `profesion` int(2) NOT NULL,
  `parroquia` int(3) DEFAULT '0' COMMENT 'Las claves primarias que no son obligatorias tienen 0 como valor por defecto',
  `estatus` tinyint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla Generica de Persona';

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`cedula`, `nacionalidad`, `nombre`, `apellido`, `direccion`, `telefono1`, `telefono2`, `correo`, `fechanacimiento`, `edocivil`, `sexo`, `nrohijos`, `foto`, `profesion`, `parroquia`, `estatus`) VALUES
(18, 'V', 'Carolkis', 'Linares', 'El tocuyo', 412, NULL, 'kalinares@gmail.com', '2015-03-30', 'S', 'F', 0, '0484.jpg', 2, 9, 1),
(202020, 'V', 'DFFD', 'DFFDFD', '', 2147483647, 0, 'DFFD@WKJDIKSD.COM', '1990-09-25', 'S', '1', 2, '0481.jpg', 2, 8, 1),
(202021, 'V', 'SDDS', 'SDD', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(1270286, 'V', 'CIRCUNSCISION', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(1279790, 'V', 'RAMON', 'CORONEL', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(2070711, 'V', 'DIDIO', 'MOSQUERA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(2199259, 'V', 'MARCIAL', 'ESCALONA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(2233585, 'V', 'JESUS', 'RATTIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(2475868, 'V', 'MARIA', 'MACUALO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(2594501, 'V', 'AURORA', 'SALDIVIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(2992040, 'V', 'ORLANDO', 'GIMENEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(3080841, 'V', 'IRAIDES', 'HERNANDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(3084292, 'V', 'JUAN', 'DIAZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(3314107, 'V', 'JOSE', 'GARCIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(3323960, 'V', 'NELSON', 'TIMAURE', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(3540760, 'V', 'PEDRO', 'ALMAO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(3542009, 'V', 'JESUS', 'GARCIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(3586686, 'V', 'SIMON', 'UGUETO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(3634999, 'V', 'ARTENIO', 'MARQUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(3707386, 'V', 'ROBER', 'ALVARADO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(3759838, 'V', 'PASTOR', 'BLANCO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(3856232, 'V', 'NANCY', 'DAZA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(3864630, 'V', 'CARMEN', 'RIVERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(3864789, 'V', 'ROSA', 'ALEJOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(3875578, 'V', 'JUAN', 'GALLARDO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(3875584, 'V', 'NELIDA', 'MENDOZA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(3948442, 'V', 'JESUS', 'MELENDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(3948519, 'V', 'FILONIDA', 'SUAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(3963948, 'V', 'VICTOR', 'GALINDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(3965019, 'V', 'GLORIA', 'ARROYO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(3965917, 'V', 'LUIS', 'GONZALEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4065408, 'V', 'EMMA', 'FREITEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4069398, 'V', 'GLORIA', 'MARIN', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4072748, 'V', 'BRIGIDA', 'ARAUJO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4191845, 'V', 'ELBA', 'SALAZAR', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4192610, 'V', 'ANGEL', 'VILLEGAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4259783, 'V', 'JUANA', 'SALAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4344361, 'V', 'LUIS', 'ACOSTA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4373478, 'V', 'GUSTAVO', 'LUNA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4376420, 'V', 'YANY', 'DELGADO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4379940, 'V', 'ADDA', 'CORDERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4383077, 'V', 'YUVILIA', 'DIAZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4383788, 'V', 'ALIDA', 'ESCOBAR', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4385136, 'V', 'JORGE', 'MENDOZA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4385441, 'V', 'ITALO', 'ORTIZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4385986, 'V', 'MARIA', 'SALAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4387057, 'V', 'LILIAM', 'GUEDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4413332, 'V', 'YUDY', 'ARROYO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4417325, 'V', 'GERARDO', 'MENDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4439741, 'V', 'MARIA', 'SALON', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4479123, 'V', 'RAFAEL', 'MATA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4645504, 'V', 'ANTONIO', 'CHIRINOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4679962, 'V', 'JOSE', 'GARCIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4721193, 'V', 'PEDRO', 'PEREIRA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4721301, 'V', 'JOSE', 'COLMENAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4722338, 'V', 'FANNY', 'ALVARADO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4725084, 'V', 'JOSE', 'QUINTERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4728050, 'V', 'ZOA', 'TORREALBA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4729612, 'V', 'MEIBA', 'YEPEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4730416, 'V', 'ALEJANDRO', 'PI', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4731339, 'V', 'ALCIDES', 'BURGOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4731878, 'V', 'PETRA', 'AMARO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4733520, 'V', 'ZAMIR', 'TORREALBA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4738450, 'V', 'JOSE', 'AGUERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4739399, 'V', 'BENARDINO', 'JIMENEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4739839, 'V', 'YDELIA', 'CHIRINOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4810640, 'V', 'JOSE', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4850226, 'V', 'CARMEN', 'SIVIRA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(4991249, 'V', 'BALMIRO', 'CHAVEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5222341, 'V', 'GERARDO', 'PULEO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5239955, 'V', 'FRANCISCO', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5240842, 'V', 'EDILU', 'PI', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5242848, 'V', 'BRIGIDO', 'MARTINEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5243030, 'V', 'GAUDY', 'VASQUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5247687, 'V', 'CARLOS', 'VILLALONGA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5252130, 'V', 'HERMES', 'MARCHAN', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5252238, 'V', 'GLORIA', 'CASTILLO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5252461, 'V', 'DANIEL', 'ALVAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5254682, 'V', 'JULIO', 'ESCALONA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5255847, 'V', 'MARIA', 'YEPEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5256068, 'V', 'CARLOS', 'GIMENEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5258559, 'V', 'LUIS', 'YEPEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5286786, 'V', 'RUBEN', 'VENTURA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5315454, 'V', 'MARCO', 'FERNANDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5321114, 'V', 'MORENO', 'ISABEL', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5321382, 'V', 'VICTALIA', 'ADJUNTA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5322588, 'V', 'LERIS', 'VERDE', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5405796, 'V', 'ALFONSO', 'RAMIREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5408523, 'V', 'VICTOR', 'ROJAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5568280, 'V', 'CESAR', 'HERNANDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5593391, 'V', 'LOURDES', 'GUIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5721888, 'V', 'RAFAEL', 'CHIRINOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5751098, 'V', 'YOLIMA', 'QUERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5852518, 'V', 'DANIEL', 'ORDO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5920512, 'V', 'LUIS', 'MELENDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5924312, 'V', 'BELKIS', 'MELENDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(5970075, 'V', 'JORGE', 'QUIJADA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6012357, 'V', 'ZULAY', 'GALINDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6104986, 'V', 'WILLIAMS', 'PEREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6129831, 'V', 'JOSE', 'RAMIREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6244944, 'V', 'HAIDEE', 'MALPICA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6250116, 'V', 'CALIXTO', 'CADENAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6252218, 'V', 'EDDY', 'RANGEL', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6252578, 'V', 'MIRIAM', 'AGELVIS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6260068, 'V', 'MARBELIS', 'SUAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6342740, 'V', 'LOURDES', 'ROJAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6470104, 'V', 'NELSY', 'MARCANO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6483864, 'V', 'ALBERTO', 'MENDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6506191, 'V', 'LIZBETH', 'MENDOZA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6527438, 'V', 'FERNANDO', 'RAMOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6534832, 'V', 'MAGDA', 'GUERRA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6552993, 'V', 'FLOR', 'QUINTERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6573174, 'V', 'LIBIA', 'ZERPA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6573994, 'V', 'EGILDA', 'ALVARADO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6575265, 'V', 'SENAIRA', 'ARRICECHE', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6707898, 'V', 'CARMEN', 'SERRANO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6717769, 'V', 'JOSE', 'FUENTES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6791456, 'V', 'MARINA', 'LOPEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6886654, 'V', 'LAURA', 'CHACON', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(6906114, 'V', 'ARGIMIRO', 'VELIZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7006460, 'V', 'JOSE', 'HERNANDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7045123, 'V', 'ELEAZAR', 'CARRILLO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7051068, 'V', 'MIRIAN', 'CALDERA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7097371, 'V', 'TRINA', 'HERNANDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7222622, 'V', 'ROY', 'AMARO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7257136, 'V', 'JOSEFINA', 'GARNIER', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7300676, 'V', 'FRANCISCO', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7300937, 'V', 'GIOVANNY', 'SALAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7302249, 'V', 'ARGENIS', 'DELIMA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7304257, 'V', 'MARIA', 'DIAZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7305914, 'V', 'MARY', 'MARTINEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7306155, 'V', 'NORBERTO', 'VALIENTE', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7306361, 'V', 'CARLOS', 'ALVAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7308167, 'V', 'ANA', 'PERDOMO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7308488, 'V', 'OMAR', 'MARQUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7310887, 'V', 'MANUEL', 'DELGADO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7312708, 'V', 'LUIS', 'PEROZO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7312917, 'V', 'CARMEN', 'SANCHEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7313156, 'V', 'CARLOS', 'FIGUEROA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7313909, 'V', 'LISBETH', 'QUINTERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7316642, 'V', 'HUMBERTO', 'LOYO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7317134, 'V', 'GUSTAVO', 'FREITEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7317359, 'V', 'SAUL', 'CRESPO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7317486, 'V', 'GUSTAVO', 'ECHEVERRIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7317794, 'V', 'ANGELES', 'CARMONA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7318532, 'V', 'FREDDY', 'LINAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7319495, 'V', 'MILDRED', 'PEREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7319723, 'V', 'JOSE', 'GUTIERREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7320447, 'V', 'MORAIMA', 'OSAL', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7320932, 'V', 'ROY', 'MARIN', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7321020, 'V', 'SONIA', 'TORRES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7321190, 'V', 'EDEN', 'PALENCIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7321520, 'V', 'CARMEN', 'ALMAO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7323066, 'V', 'ANA', 'TONA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7323185, 'V', 'SANDRA', 'MARTINEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7323426, 'V', 'HECTOR', 'MIRANDA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7323711, 'V', 'LEONORE', 'VON', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7324181, 'V', 'AYOLEIDA', 'ZAMBRANO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7329681, 'V', 'ELIZABETH', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7330783, 'V', 'MARLENE', 'MELENDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7330898, 'V', 'ALFREDO', 'SOTO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7333727, 'V', 'JOSE', 'GRANADOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7333729, 'V', 'MARIA', 'CHAVEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7333942, 'V', 'LIGIA', 'GRANDA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7336295, 'V', 'MARIA', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7347567, 'V', 'JOSE', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7347713, 'V', 'JUAN', 'SPOLISINO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7347889, 'V', 'DORIS', 'MENDOZA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7348273, 'V', 'RUBEN', 'LEVY', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7352237, 'V', 'NORA', 'GRANADOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7352273, 'V', 'EDGAR', 'SANCHEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7352316, 'V', 'CESAR', 'REYES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7352740, 'V', 'NELSON', 'PE', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7354047, 'V', 'ANGELA', 'LINAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7354854, 'V', 'ENRIQUE', 'ROJAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7355540, 'V', 'ELIDE', 'GOMEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7356408, 'V', 'CARLOS', 'PRIMERA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7357136, 'V', 'DELFINA', 'TOVAR', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7358725, 'V', 'NARCISO', 'CASTILLO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7359350, 'V', 'OMAIRA', 'SIERRA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7360312, 'V', 'EDGAR', 'PEREIRA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7361320, 'V', 'VILMA', 'HERNANDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7362973, 'V', 'RAMON', 'GIL', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7363148, 'V', 'DEYANIRA', 'SOSA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7363297, 'V', 'CARLOS', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7363824, 'V', 'OLMEDA', 'GUANIPA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7364625, 'V', 'ANGEL', 'ALVAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7364960, 'V', 'PEDRO', 'DUIN', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7365339, 'V', 'GLADYS', 'GUERRERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7365420, 'V', 'COROMOTO', 'ZAMBRANO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7365526, 'V', 'NANCY', 'FREITEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7367139, 'V', 'HECTOR', 'JUAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7368056, 'V', 'MARISABEL', 'SANCHEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7369402, 'V', 'MARIO', 'SANTOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7370227, 'V', 'MAGALY', 'BRICE', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7370528, 'V', 'NELSON', 'ROJAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7371568, 'V', 'JUAN', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7372099, 'V', 'FRANCISCO', 'ESCALONA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7372428, 'V', 'INGRID', 'COLMENAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7373882, 'V', 'JOSE', 'ORTIZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7375923, 'V', 'JOSE', 'CASTILLO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7376774, 'V', 'ARIADNE', 'JUAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7376860, 'V', 'ROSA', 'COLMENAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7376911, 'V', 'ENZO', 'PRESENZA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7377234, 'V', 'YAGUA', 'WALTER', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7377420, 'V', 'SORAIDA', 'QUIROZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7378777, 'V', 'JACQUELINE', 'SUAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7380644, 'V', 'VILMA', 'GIMENEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7380863, 'V', 'ANDRES', 'ROMERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7382421, 'V', 'OMAIRA', 'TORRES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7382616, 'V', 'AURA', 'PEREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7384627, 'V', 'THAYS', 'PEREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7386638, 'V', 'JASMIN', 'CRESPO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7388527, 'V', 'MARIBEL', 'PEROZO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7389030, 'V', 'PEDRO', 'GARCIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7389660, 'V', 'DANIEL', 'LINAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7391803, 'V', 'ANA', 'CORTEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7393043, 'V', 'JOSE', 'MUJICA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7393242, 'V', 'SANDRA', 'GRANADO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7393828, 'V', 'MARINA', 'SOTO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7394039, 'V', 'JOSE', 'REINOSO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7394303, 'V', 'JACQUELINE', 'ROJAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7396264, 'V', 'ANGEL', 'AMARO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7397035, 'V', 'ERWIN', 'DE', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7397186, 'V', 'YELITZA', 'NIETO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7397465, 'V', 'RODRIGUEZ', 'CARMELO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7398824, 'V', 'BEISY', 'CASTILLO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7399722, 'V', 'DOUGLAS', 'CASTILLO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7399820, 'V', 'ANA', 'GOMEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7401332, 'V', 'YINI', 'CASTILLO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7402205, 'V', 'BEATRIZ', 'ESCALONA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7402930, 'V', 'NELLY', 'MONTILLA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7403086, 'V', 'PEDRO', 'VIRGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7404907, 'V', 'MARIA', 'ROMAN', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7405061, 'V', 'CARLOS', 'ZABALETA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7405509, 'V', 'ISBELDA', 'GIL', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7406226, 'V', 'JAIME', 'GONZALEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7406700, 'V', 'YANETH', 'VARGAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7408289, 'V', 'DORYS', 'SALAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7410947, 'V', 'EMILIA', 'TAMAYO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7411348, 'V', 'FRANCYS', 'MELENDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7412335, 'V', 'LEODEGARIO', 'RONDON', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7413296, 'V', 'GENARA', 'TORREALBA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7413417, 'V', 'HECTOR', 'CORONADO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7413579, 'V', 'YAMILEX', 'BOQUILLON', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7414695, 'V', 'IMNA', 'ANDRADE', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7414728, 'V', 'JUAN', 'PI', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7417445, 'V', 'ANA', 'PEREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7417565, 'V', 'DAISY', 'LOVERA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7418671, 'V', 'ENDER', 'RUIZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7419263, 'V', 'MARIA', 'GONZALEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7419425, 'V', 'MARY', 'JIMENEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7419526, 'V', 'EVA', 'ROJAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7419760, 'V', 'BLADIMIR', 'CUICAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7420617, 'V', 'LISSETTE', 'ARMAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7421044, 'V', 'MIRIAN', 'PEREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7421076, 'V', 'YSABELYS', 'PARRA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7421359, 'V', 'LEONEL', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7421836, 'V', 'JOSE', 'ALVARADO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7422536, 'V', 'ROSA', 'RIVERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7423637, 'V', 'ZULMA', 'GIMENEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7425017, 'V', 'JOSE', 'MENDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7425559, 'V', 'LEONOR', 'GARCIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7426070, 'V', 'PABLO', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7426434, 'V', 'MARIA', 'MENDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7428542, 'V', 'YOLANDA', 'MELEDENZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7430106, 'V', 'YOLEIDA', 'DURAN', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7431165, 'V', 'SAMIR', 'SANCHEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7432333, 'V', 'DIXA', 'AGUILAR', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7432931, 'V', 'LINDA', 'BARRETO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7432995, 'V', 'LEONARDO', 'CASTELLANO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7433092, 'V', 'YAMILET', 'SUAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7433356, 'V', 'ANA', 'ANGULO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7434123, 'V', 'FRANCIS', 'CORTEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7434426, 'V', 'MILANYELA', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7436123, 'V', 'SERAFINA', 'SILVA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7436379, 'V', 'ROSA', 'ALVARADO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7436771, 'V', 'JOHEL', 'JIMENEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7437266, 'V', 'ELISA', 'MARTINEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7437329, 'V', 'YARELIS', 'ALVAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7437449, 'V', 'ANGEL', 'VALERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7437597, 'V', 'CAREN', 'FERNANDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7437727, 'V', 'FLOR', 'BELLO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7440193, 'V', 'LUIS', 'BOZA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7440538, 'V', 'LISBETH', 'MENDOZA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7440625, 'V', 'ROSA', 'MUJICA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7441230, 'V', 'CARMEN', 'CORDERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7441437, 'V', 'JUAN', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7441668, 'V', 'NELSON', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7442239, 'V', 'WILILLIS', 'ALVAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7442929, 'V', 'JENNY', 'SANCHEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7443594, 'V', 'LUIS', 'ALVARADO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7445522, 'V', 'ZAIMAR', 'HERNANDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7445552, 'V', 'BLANCA', 'PEREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7445872, 'V', 'MARIO', 'PERDIGON', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7447089, 'V', 'SOLIRIS', 'ORELLANA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7447429, 'V', 'CARMEN', 'GONZALEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7447442, 'V', 'AYARAIS', 'MORENO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7448069, 'V', 'MARIA', 'GUTIERREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7448847, 'V', 'MILAGROS', 'VARGAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7450855, 'V', 'FANNY', 'PERDOMO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7451633, 'V', 'OBDULIO', 'LUCENA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7457034, 'V', 'FREDDY', 'ANGULO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7457321, 'V', 'BELKYS', 'FERNANDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7460548, 'V', 'MIRIAM', 'PEREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7460906, 'V', 'NILDA', 'SEQUERA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7462096, 'V', 'JOSE', 'FLORES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7464461, 'V', 'ANDREA', 'CASTILLO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7468435, 'V', 'ZOLAIDA', 'PASTRAN', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7468698, 'V', 'LEONARDO', 'RUIZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7469547, 'V', 'EDGAR', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7474039, 'V', 'LAURA', 'CHIRINOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7498063, 'V', 'LIZANIA', 'RIVAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7507075, 'V', 'MIGUEL', 'ARAUJO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7515318, 'V', 'WLADIMIR', 'ORELLANA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7547971, 'V', 'VICTOR', 'MOLLETONE', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7554393, 'V', 'CARMEN', 'MARTINEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7555801, 'V', 'NELSON', 'COLMENARES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7576438, 'V', 'CESAR', 'AWAIS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7582519, 'V', 'CARMEN', 'AVENDAñO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7585215, 'V', 'DANIEL', 'VARGAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7588982, 'V', 'ZORAIDA', 'NU', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7661735, 'V', 'ELIZABETH', 'MENDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7857106, 'V', 'MARIA', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7858384, 'V', 'MARLENE', 'COLINA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7869083, 'V', 'MARIA', 'MAS Y RUBI', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7879881, 'V', 'ZORAIDA', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7917068, 'V', 'MARIANGELA', 'FIGUEIRA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7918475, 'V', 'JIMMY', 'DIAZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7942560, 'V', 'ALICIA', 'LOPEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7980769, 'V', 'BEATRIZ', 'TOVAR', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7985354, 'V', 'YONNY', 'GARCIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7987086, 'V', 'JOSE', 'GOMEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7989486, 'V', 'LUIS', 'DA SILVA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(7996635, 'V', 'JOSIAS', 'CENTENO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(8056804, 'V', 'PEDRO', 'FIGUEROA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(8062998, 'V', 'JOSE', 'LINAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(8069387, 'V', 'ALBA', 'COLMENAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(8096162, 'V', 'AURA', 'ALVIAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(8179775, 'V', 'MARIA', 'GUTIERREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(8190678, 'V', 'JORGE', 'CERPA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(8445190, 'V', 'CESAR', 'QUIJADA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(8511555, 'V', 'FLONILDE', 'CARRILLO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(8659574, 'V', 'JOSE', 'HEREDIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(8671684, 'V', 'LUIS', 'MONTOYA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(8816984, 'V', 'DURBAN', 'FLORES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(8926651, 'V', 'ROSIRYS', 'QUIJADA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(8994314, 'V', 'PEDRO', 'PARADAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9115142, 'V', 'CARMEN', 'LUJANO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9116018, 'V', 'SAMARIS', 'GIMENEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9118056, 'V', 'ALEXIS', 'CORDERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9118580, 'V', 'RAFAEL', 'AGUILAR', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9169512, 'V', 'CARMEN', 'CHOURIO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9179412, 'V', 'NORIS', 'PATIARROY', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9228779, 'V', 'MARIA', 'PIZANO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9259972, 'V', 'ENDER', 'AVILA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9318308, 'V', 'GRISEL', 'GONZALEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9377942, 'V', 'ANTONIO', 'ABREU', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9434597, 'V', 'ROSA', 'SOTO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9540477, 'V', 'MARIA', 'SAAVEDRA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9540938, 'V', 'SALVADOR', 'CAMMARATA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9541900, 'V', 'YANETH', 'CAMACARO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9543427, 'V', 'WILLIAM', 'RIVERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9544189, 'V', 'NERY', 'COLMENAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9544776, 'V', 'IVAN', 'PARGAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9544898, 'V', 'ANTONIA', 'RIVAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9545527, 'V', 'NORMA', 'VASQUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9545566, 'V', 'LUIS', 'LUQUE', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9545955, 'V', 'DIGME', 'GIMENEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9546770, 'V', 'MARY', 'ARRIECHE', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1);
INSERT INTO `persona` (`cedula`, `nacionalidad`, `nombre`, `apellido`, `direccion`, `telefono1`, `telefono2`, `correo`, `fechanacimiento`, `edocivil`, `sexo`, `nrohijos`, `foto`, `profesion`, `parroquia`, `estatus`) VALUES
(9547031, 'V', 'ELAYNE', 'TORRES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9552346, 'V', 'DORYS', 'NAVAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9552751, 'V', 'MARITZA', 'CAMACARO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9554220, 'V', 'NORKYS', 'ORTEGA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9554412, 'V', 'RAFAEL', 'LOYO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9554873, 'V', 'JESUS', 'RIERA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9557472, 'V', 'MARLENE', 'LUCENA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9558268, 'V', 'MARIA', 'MENDOZA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9558523, 'V', 'WILMA', 'RIVAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9565331, 'V', 'CARMEN', 'SANCHEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9579818, 'V', 'RAMONA', 'BATISTA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9601864, 'V', 'YSABEL', 'NIETO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9601961, 'V', 'GERARD', 'PEREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9602824, 'V', 'ADRIANA', 'GARCIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9603506, 'V', 'NAYLETH', 'ALVARADO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9605155, 'V', 'PETRA', 'ALMAO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9605402, 'V', 'LISBETH', 'BRIZON', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9605665, 'V', 'JORGE', 'VAZQUES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9606569, 'V', 'YADIRA', 'PEREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9606956, 'V', 'YELITZA', 'AREVALO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9609893, 'V', 'GREGORIA', 'ARRIECHE', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9610338, 'V', 'GRISELDA', 'SIVIRA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9611424, 'V', 'YOLANDA', 'RIVERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9611468, 'V', 'COROMOTO', 'ESCOBAR', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9612417, 'V', 'ISMAR', 'MEDINA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9613830, 'V', 'FRANKLIN', 'SEQUERA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9613989, 'V', 'CARLOS', 'GOMEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9614306, 'V', 'LISETT', 'GARCIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9615160, 'V', 'HEBELL', 'LOPEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9615366, 'V', 'ALIRIO', 'PEREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9615800, 'V', 'CARMEN', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9616055, 'V', 'GREGORIA', 'CASTRO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9616603, 'V', 'EURIDICE', 'MONTERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9618580, 'V', 'RUDIS', 'MENDOZA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9619843, 'V', 'ANGEL', 'RANGEL', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9620418, 'V', 'NAYLET', 'ALVAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9621084, 'V', 'ZULLY', 'ALVAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9622024, 'V', 'KATHIUSKA', 'TORREALBA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9622124, 'V', 'FRANCISCO', 'OSAL', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9622361, 'V', 'YESENIA', 'FREITEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9623356, 'V', 'LISBETH', 'MONTILLA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9623795, 'V', 'GUSTAVO', 'CORDERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9625745, 'V', 'ROSANNA', 'MARQUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9626739, 'V', 'MAGDELYS', 'GUTIERREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9629674, 'V', 'ALTAGRACIA', 'DIAZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9635151, 'V', 'NORELY', 'MARQUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(9848915, 'V', 'NORKYS', 'SUAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10009966, 'V', 'RAMONA', 'GARCIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10051304, 'V', 'MARLENI', 'VALERA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10125915, 'V', 'ENMA', 'GIL', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10369426, 'V', 'LINO', 'ARAUJO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10370628, 'V', 'ADRIANA', 'GOMEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10371537, 'V', 'ERNESTO', 'MARCANO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10375276, 'V', 'ADDISON', 'CORDERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10400924, 'V', 'ZAHILLA', 'MUSA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10478067, 'V', 'ELENA', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10549460, 'V', 'JOEL', 'CAMPO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10558901, 'V', 'ROGER', 'JIMENEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10604174, 'V', 'WILMER', 'GOTOPO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10705391, 'V', 'HUGO', 'ARNAEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10761777, 'V', 'CARMEN', 'PEREIRA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10767689, 'V', 'NELLYS', 'GONZALEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10770085, 'V', 'WENDY', 'TORREALBA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10770945, 'V', 'SOLANGE', 'RIVAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10771255, 'V', 'FERNIC', 'TONA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10772807, 'V', 'CECILIA', 'CORDERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10773881, 'V', 'DEISY', 'MORENO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10775567, 'V', 'YAROLYS', 'YARAURE', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10777481, 'V', 'NANCY', 'PASTRAN', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10777580, 'V', 'MARIEMIRA', 'DURAN', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10778168, 'V', 'SELENNY', 'GONZALEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10779953, 'V', 'MORELBIS', 'PI', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10797612, 'V', 'MERLYS', 'GIFFARD', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10841439, 'V', 'MILDRED', 'MOGOLLON', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10841521, 'V', 'MARIA', 'RIVERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10842474, 'V', 'SOCORRO', 'BARRIOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10845713, 'V', 'KATY', 'CAPITANIO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10846378, 'V', 'GERSON', 'PACHECO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10846638, 'V', 'ARNALDO', 'NIETO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10847116, 'V', 'ALEXANDER', 'LOPEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10847579, 'V', 'HEIDEE', 'DIAZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10849011, 'V', 'ALFONZO', 'VASQUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10855184, 'V', 'GUSTAVO', 'PIRELA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10855264, 'V', 'MIRELYS', 'PETIT', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10860960, 'V', 'ARLINES', 'LINAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10900524, 'V', 'FRANCIS', 'PRIETO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10955865, 'V', 'YULMI', 'RAMOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10957644, 'V', 'DAYAN', 'JIMENEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10959559, 'V', 'CELIA', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(10962119, 'V', 'NAUDY', 'GIMENEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11049033, 'V', 'JOHNNY', 'GARCIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11056276, 'V', 'JUAN', 'TORTOZA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11056626, 'V', 'MIGUEL', 'TORTOZA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11063361, 'V', 'DENYS', 'CA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11201851, 'V', 'EDINSON', 'NIEVES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11238812, 'V', 'CARMEN', 'JIMENEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11238868, 'V', 'KATIUSKA', 'GARCIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11260596, 'V', 'LILISBETH', 'MEDINA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11261051, 'V', 'YESELAINA', 'CONDE', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11261121, 'V', 'CARMEN', 'SIVIRA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11261273, 'V', 'CARMEN', 'LUQUE', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11261540, 'V', 'ALIETTYS', 'CARIDAD', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11262085, 'V', 'MARILYN', 'RAMOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11262295, 'V', 'MARIELBA', 'QUERALES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11262383, 'V', 'JOSE', 'URE', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11262473, 'V', 'OLGA', 'GARCIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11263211, 'V', 'ELISETH', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11265398, 'V', 'LIZMAR', 'OLLARVES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11266289, 'V', 'ROMAN', 'MONTESINOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11266426, 'V', 'BELKYS', 'MOGOLLON', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11266649, 'V', 'XIOMARA', 'ALBARRAN', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11267437, 'V', 'GARCIA', 'JUAN', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11268051, 'V', 'RICHARD', 'PARADA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11268290, 'V', 'LESVI', 'RUIZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11268785, 'V', 'LOLIMAR', 'SANCHEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11268932, 'V', 'GILBA', 'GUTIERREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11374985, 'V', 'HERENIA', 'MORA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11425637, 'V', 'NAHYANDU', 'COLMENAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11426146, 'V', 'RICHARD', 'CASANOVA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11426518, 'V', 'CARLOS', 'HERRERA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11426863, 'V', 'TOVAR', 'ELIZABETH', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11431195, 'V', 'GRACIELA', 'CALLES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11432076, 'V', 'LOPEZ', 'LILIBETH', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11432112, 'V', 'JOSE', 'SUAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11432296, 'V', 'JOSE', 'DURAN', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11432572, 'V', 'JUAN', 'PRIMERA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11432927, 'V', 'ANNY', 'VARGAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11433259, 'V', 'YALEIZA', 'GOYO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11433448, 'V', 'ELISMER', 'ORTEGA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11433515, 'V', 'GILBERTO', 'AGUERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11451442, 'V', 'MARIO', 'DABOIN', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11540710, 'V', 'YLSEN', 'CAMPINS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11582882, 'V', 'IROMA', 'GIL', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11588375, 'V', 'YADIRA', 'PEREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11593801, 'V', 'GUSTAVO', 'AGUERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11594286, 'V', 'YURAIMA', 'GUTIERREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11594631, 'V', 'MAXLENIN', 'GUEVARA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11595549, 'V', 'ANA', 'CRESPO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11595749, 'V', 'EMPERATRIZ', 'MARTINEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11597089, 'V', 'HUMBERTO', 'PACHECO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11597197, 'V', 'ALEXANDRA', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11598610, 'V', 'REINALDO', 'JUAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11694787, 'V', 'MARIA', 'PEREIRA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11697338, 'V', 'CARLOS', 'OROPEZA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11697576, 'V', 'EVELIN', 'CHAVEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11786123, 'V', 'ORLANDO', 'RIVERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11786724, 'V', 'IBRAHIM', 'RANGEL', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11787860, 'V', 'IVONNE', 'MUJICA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11791284, 'V', 'MARIA', 'QUIROZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11878944, 'V', 'YURYAMA', 'PI', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11879666, 'V', 'JENNY', 'OVIEDO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11880556, 'V', 'GLEDYS', 'RIVERO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11881309, 'V', 'EVELIO', 'ECHEVERRIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11883164, 'V', 'GUSTAVO', 'LINARES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(11883852, 'V', 'ALVARO', 'GIMENEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12019369, 'V', 'LUIS', 'ALVAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12020564, 'V', 'FELIPE', 'ROJAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12021466, 'V', 'YAMIL', 'SILVA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12022871, 'V', 'LILA', 'CARRILLO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12024756, 'V', 'DENNY', 'CAMPOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12025447, 'V', 'DEILY', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12025687, 'V', 'FRANCY', 'HERRERA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12026252, 'V', 'DINORAH', 'GIL', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12026355, 'V', 'JACQUELINE', 'GUTIERREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12027843, 'V', 'GLENDY', 'SANCHEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12238854, 'V', 'ROSALLY', 'GIL', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12242233, 'V', 'ANIBAL', 'QUEVEDO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12246647, 'V', 'ANA', 'FERNANDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12247865, 'V', 'YAJAIRA', 'PEROZO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12248437, 'V', 'RITA', 'QUIROZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12250459, 'V', 'ANA', 'ANIJA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12262879, 'V', 'LUIS', 'GOMEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12283380, 'V', 'MARIA', 'JAIMES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12333442, 'V', 'BARAZARTE', 'YAHIBETH', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12365874, 'V', 'fddfaf', 'zsfzsfa', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12370997, 'V', 'GILBERTO', 'CARRASCO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12385165, 'V', 'FRANKLIN', 'GAMEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12386418, 'V', 'YAMILETH', 'TORREALBA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12432766, 'V', 'MAIYELITZA', 'TONA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12433435, 'V', 'YULITZA', 'CRESPO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12434694, 'V', 'ENDERSON', 'LOPEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12436185, 'V', 'EDUARDO', 'SANCHEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12456645, 'V', 'ENDER', 'DOMINGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12534407, 'V', 'HENRI', 'VALLADARES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12535869, 'V', 'SOLYELI', 'HERNANDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12592198, 'V', 'JOSE', 'SILVA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12698527, 'V', 'AMARILIS', 'HEREDIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12700835, 'V', 'ELIZABETH', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12701669, 'V', 'DANNYS', 'CASTELLANO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12701930, 'V', 'YAMILETH', 'FREITEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12703304, 'V', 'EDUAR', 'DURAN', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12704204, 'V', 'GEILER', 'MELENDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12707498, 'V', 'LORENA', 'LISCANO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12710492, 'V', 'JUAN', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12724632, 'V', 'HILBERT', 'ARAUJO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12849891, 'V', 'ANA', 'ALMAO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12850481, 'V', 'CAROLINA', 'PEREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12922321, 'V', 'PEDRO', 'PEREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12934935, 'V', 'TIBISAY', 'PINEDA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(12944688, 'V', 'FABIOLA', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13034399, 'V', 'GERALDIN', 'RUIZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13034988, 'V', 'DESIREE', 'ALVAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13035863, 'V', 'FANMILETH', 'GUTIEREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13036917, 'V', 'WALTER', 'VELIZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13083288, 'V', 'LEYNIS', 'RAMOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13083463, 'V', 'MARIA', 'BECERRA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13083838, 'V', 'YOSBELLY', 'GRANT', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13084070, 'V', 'ALEXANDER', 'VIDOZA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13084949, 'V', 'ELIEZER', 'PADRON', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13085677, 'V', 'GEOGLEOLA', 'TORREALBA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13187316, 'V', 'YUSMAIRA', 'GIMENEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13189767, 'V', 'EDWAL', 'CAMACHO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13266174, 'V', 'NADIA', 'PALACIOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13267030, 'V', 'YOHANNY', 'CAMEJO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13269306, 'V', 'GRISELIDYS', 'MENDOZA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13269353, 'V', 'ZOLIBEL', 'PEREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13344385, 'V', 'JUDITH', 'GIL', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13407526, 'V', 'KARINA', 'DE', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13407895, 'V', 'YOLIMAR', 'TORRES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13408421, 'V', 'GIOVANNI', 'LUCENA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13436466, 'V', 'DARWIN', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13464247, 'V', 'YUBIRIS', 'FREITEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13464941, 'V', 'DESIRRE', 'PERDOMO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13504767, 'V', 'ERIKA', 'BRIZUELA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13509802, 'V', 'DEIBIS', 'CASTELLANO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13509903, 'V', 'SAYEIRA', 'MOSQUERA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13510432, 'V', 'ALEXANDREI', 'SANCHEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13510640, 'V', 'INES', 'FREYTEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13510963, 'V', 'DZELKO', 'BARISA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13543163, 'V', 'ROSANGEL', 'PEREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13567075, 'V', 'HAROLD', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13587631, 'V', 'TRINOMIGUEL', 'URBINA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13603288, 'V', 'JHONNY', 'GODOY', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13603669, 'V', 'JUAN', 'LEAL', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13603797, 'V', 'NEISY', 'LUCENA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13643997, 'V', 'ANGELICA', 'DURAN', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13644222, 'V', 'ANGELICA', 'RAUCH', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13644701, 'V', 'FRANCYS', 'OCHOA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13651035, 'V', 'DEIBIS', 'LINARES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13651328, 'V', 'HIDALGO', 'LEON', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13651348, 'V', 'RINA', 'PANGOURELIS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13652355, 'V', 'FRANCIS', 'CRESPO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13738094, 'V', 'ILIANA', 'LINARES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13749302, 'V', 'MARIA', 'GARCIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13774186, 'V', 'ISABEL', 'PINEDA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13775272, 'V', 'NAYILUZ', 'CADEVILLA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13775502, 'V', 'KATTY', 'VASQUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13787109, 'V', 'PABLO', 'ALVAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13842884, 'V', 'MARIELIS', 'GOYO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13855751, 'V', 'CECILIA', 'GARCIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13885386, 'V', 'MILEIDY', 'FREITEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13921251, 'V', 'LEONOR', 'FREITEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13921367, 'V', 'GERMAN', 'RAMOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13922567, 'V', 'MANUEL', 'ROJAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13922807, 'V', 'NELLY', 'REYES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13922824, 'V', 'OSWALDO', 'MONTILLA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13932236, 'V', 'MARIANNA', 'BARRADAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13950833, 'V', 'MARIANELLA', 'RAMOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13985341, 'V', 'JOSE', 'PEREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13990559, 'V', 'RODRIGUEZ', 'IRIS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13991017, 'V', 'MARIA', 'TROCONIS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(13991961, 'V', 'RANDY', 'GUTIERREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14031336, 'V', 'JEIETTE', 'MENDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14031531, 'V', 'WILFREDO', 'CASTRO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14059953, 'V', 'MARYELI', 'UZCATEGUI', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14093506, 'V', 'JHONS', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14094498, 'V', 'YALIZ', 'CARRILLO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14159092, 'V', 'BELIZ', 'DEL', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14159272, 'V', 'SANDRA', 'ACOSTA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14159592, 'V', 'JENNY', 'GARCIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14160485, 'V', 'DANIEL', 'DIAZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14160874, 'V', 'LENNY', 'QUEVEDO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14175381, 'V', 'MARIA', 'PEREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14176638, 'V', 'WILFRANK', 'TUA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14176718, 'V', 'JOHANNA', 'ALDANA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14270218, 'V', 'WILLIAM', 'ONTIVEROS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14335188, 'V', 'ENDER', 'RAMOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14335933, 'V', 'BLANCA', 'ALVAREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14399034, 'V', 'ANA', 'ARRIECHE', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14404452, 'V', 'MANUEL', 'TERAN', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14405922, 'V', 'ROSANYELI', 'MENDOZA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14442205, 'V', 'JORSOLY', 'SILVA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14482759, 'V', 'KELLY', 'CAPITANIO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14483001, 'V', 'WALTHER', 'MONTES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14526175, 'V', 'MARIANA', 'VI', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14590066, 'V', 'FRANCYS', 'PEREIRA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14590607, 'V', 'ADRIANA', 'DUDAMEL', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14648117, 'V', 'RAISY', 'MORENO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14648261, 'V', 'ARELIS', 'GOMEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14649821, 'V', 'JHOSMAR', 'MENDOZA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14649930, 'V', 'ZEIMAR', 'SANCHEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14663995, 'V', 'MANUEL', 'QUI', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14696461, 'V', 'MAYRA', 'RIVAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14696766, 'V', 'SILVA', 'DANYS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14749819, 'V', 'JUAN', 'TORREALBA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14750215, 'V', 'CARMEN', 'TORRES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14750459, 'V', 'MARELBIS', 'ACOSTA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14877408, 'V', 'NADDIEL', 'MELENDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14877470, 'V', 'YELITZA', 'SEQUERA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14877800, 'V', 'SANDRA', 'ZARUMA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14877983, 'V', 'GEOBEL', 'HUGGINS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14878735, 'V', 'GERARDO', 'FIGUEROA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14879820, 'V', 'ROSALBA', 'RODRIGUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14880193, 'V', 'ISMAEL', 'ANSELMI', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14938233, 'V', 'ALFREDO', 'LEAL', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14938812, 'V', 'SONEL', 'LEAL', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14978117, 'V', 'DANMILETH', 'QUERALES', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14978350, 'V', 'YULIMAR', 'MOGOLLON', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(14998789, 'V', 'ZULEIMA', 'VARGAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15003710, 'V', 'ALBERTO', 'RAMIREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15004575, 'V', 'LUIS', 'LUGO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15004630, 'V', 'JOSE', 'HERNANDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15070089, 'V', 'TATIANA', 'ESCALONA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15093005, 'V', 'GERSON', 'LOPEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15109807, 'V', 'LUIS', 'PINTO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15170064, 'V', 'MARIA', 'MEDINA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15170401, 'V', 'YBEIMMI', 'SAAVEDRA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15171453, 'V', 'CARMEN', 'RICO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15176394, 'V', 'SHEYLA', 'PALACIOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15177209, 'V', 'YULMERY', 'VARGAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15177692, 'V', 'RIVAS', 'MARIANT', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15228145, 'V', 'JOHANA', 'MELENDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15228923, 'V', 'PATRICIA', 'SOTO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15229624, 'V', 'NAIBE', 'JIMENEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15229923, 'V', 'DIRMARY', 'SILVA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15230063, 'V', 'VICTORIA', 'NI', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15230483, 'V', 'MARIA', 'TORREALBA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15264713, 'V', 'OMAR', 'MONTILLA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15265025, 'V', 'ROBERT', 'MARTINEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15265768, 'V', 'RAMON', 'FONSECA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15305400, 'V', 'LUZ', 'YAJURE', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15305516, 'V', 'JEAN', 'SALDIVIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15305532, 'V', 'ANGELA', 'BARRIOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15307258, 'V', 'MAIRA', 'ESCOBAR', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15332858, 'V', 'JANETTE', 'HERNANDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15351874, 'V', 'YBRAIN', 'ACEVEDO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15352424, 'V', 'CESAR', 'SALAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15352601, 'V', 'YOSMARY', 'LUQUEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15381056, 'V', 'MARIA', 'RONDON', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15412800, 'V', 'YINMY', 'MELENDEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15421112, 'V', 'AICHER', 'ALVARADO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15424710, 'V', 'LUISANA', 'MENDOZA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15424838, 'V', 'DOUMAR', 'GIMENEZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15424890, 'V', 'YAMILETH', 'MARCHAN', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15425928, 'V', 'MARISOL', 'PEREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15445485, 'V', 'MARIA', 'TONA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15446429, 'V', 'MILAGROS', 'MATOS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15446503, 'V', 'ELSY', 'OVIEDO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15448017, 'V', 'DAVID', 'FERRER', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15448288, 'V', 'JOFFREY', 'GUTIERREZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15448303, 'V', 'MARIA', 'PE', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15483594, 'V', 'MARCO', 'GARCIA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15579104, 'V', 'CRUZ', 'ALMAO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15580789, 'V', 'MIREYA', 'RIERA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15581400, 'V', 'JHOAN', 'ULACIO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15597223, 'V', 'KRISHNA', 'ORTIZ', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15598406, 'V', 'VIRGINIA', 'CONTRERAS', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15599152, 'V', 'MARTHA', 'DURAN', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15599282, 'V', 'REINA', 'VALERA', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15607276, 'V', 'YOLEIMA', 'CASTILLO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(15666234, 'V', 'ARGENIS', 'ALVARADO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(20236529, 'V', 'Alexi', 'Barreto', 'El cuji sector la playa av las palmas calle 8B nro 8', 2147483647, NULL, 'alexizavarce@gmail.com', '1990-01-12', 'S', 'M', 0, 'gsdgfsdf', 2, 8, 1),
(23364399, 'V', 'JOSEFINA', 'ARROYO', 'El CUJI', 414111, NULL, 'gobernacion@gmail.com', '2015-04-07', 'S', 'M', 2, '3123123123', 2, 8, 1),
(96028243, 'V', 'Fremberling', 'Ramos', 'El CUJI', 414111, NULL, 'fremberlingr@gmail.com', '2015-04-07', '1', '2', 2, '3123123123', 2, 8, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `piso`
--

CREATE TABLE IF NOT EXISTS `piso` (
`id` int(3) NOT NULL,
  `piso` int(2) NOT NULL COMMENT 'Este es el numero de piso',
  `observacion` varchar(200) DEFAULT 'No posee Observacion',
  `institucion` int(3) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `piso`
--

INSERT INTO `piso` (`id`, `piso`, `observacion`, `institucion`) VALUES
(1, 5, 'Informatica', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `piso_dependencia`
--

CREATE TABLE IF NOT EXISTS `piso_dependencia` (
  `piso` int(11) NOT NULL,
  `dependencia` int(11) NOT NULL,
  `observacion` varchar(200) DEFAULT 'No posee observacion'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `piso_dependencia`
--

INSERT INTO `piso_dependencia` (`piso`, `dependencia`, `observacion`) VALUES
(1, 1, 'No posee observacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesion`
--

CREATE TABLE IF NOT EXISTS `profesion` (
`id` int(3) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `estatus` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `profesion`
--

INSERT INTO `profesion` (`id`, `nombre`, `estatus`) VALUES
(1, 'Desempleado', 1),
(2, 'Ingeniero en Informatica', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiponomina`
--

CREATE TABLE IF NOT EXISTS `tiponomina` (
`id` int(3) NOT NULL,
  `nombre` varchar(60) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tiponomina`
--

INSERT INTO `tiponomina` (`id`, `nombre`) VALUES
(1, 'EJECUTIVA'),
(2, 'FIJA'),
(3, 'CONTRATADA'),
(4, 'EDUCACION');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipousuario`
--

CREATE TABLE IF NOT EXISTS `tipousuario` (
`id` int(3) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `estatus` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipousuario`
--

INSERT INTO `tipousuario` (`id`, `nombre`, `estatus`) VALUES
(1, 'Administrador', 1),
(2, 'Empleado', 1),
(3, 'Operador Tipo 2', 1),
(4, 'Operador Tipo I', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
`id` int(3) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `cedula` int(10) NOT NULL,
  `nacionalidad` char(1) NOT NULL,
  `clave` varchar(35) NOT NULL,
  `tipousuario` int(3) NOT NULL,
  `claveautorisada` varchar(45) DEFAULT NULL,
  `clavenoautorisada` varchar(45) DEFAULT NULL,
  `estatus` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COMMENT='Usuario que hereda de persona';

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `usuario`, `cedula`, `nacionalidad`, `clave`, `tipousuario`, `claveautorisada`, `clavenoautorisada`, `estatus`) VALUES
(1, 'Administrador', 23364399, 'V', 'e10adc3949ba59abbe56e057f20f883e', 1, NULL, NULL, 1),
(2, 'Responsable', 202020, 'V', 'e10adc3949ba59abbe56e057f20f883e', 2, NULL, NULL, 1),
(3, 'Ejecutor', 18, 'V', 'e10adc3949ba59abbe56e057f20f883e', 3, NULL, NULL, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cargo`
--
ALTER TABLE `cargo`
 ADD PRIMARY KEY (`id`), ADD KEY `nivel` (`nivel`);

--
-- Indices de la tabla `dependencia`
--
ALTER TABLE `dependencia`
 ADD PRIMARY KEY (`id`), ADD KEY `dependencia` (`dependencia`);

--
-- Indices de la tabla `division`
--
ALTER TABLE `division`
 ADD PRIMARY KEY (`id`), ADD KEY `division` (`division`), ADD KEY `dependencia` (`dependencia`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
 ADD PRIMARY KEY (`id`), ADD KEY `division` (`division`), ADD KEY `cargo` (`cargo`), ADD KEY `persona` (`cedula`), ADD KEY `horario` (`horario`), ADD KEY `tiponomina` (`tiponomina`), ADD KEY `ente` (`ente`);

--
-- Indices de la tabla `ente`
--
ALTER TABLE `ente`
 ADD PRIMARY KEY (`id`), ADD KEY `parroquia` (`parroquia`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `institucion`
--
ALTER TABLE `institucion`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `menu`
--
ALTER TABLE `menu`
 ADD PRIMARY KEY (`id`), ADD KEY `padre` (`padre`);

--
-- Indices de la tabla `municipio`
--
ALTER TABLE `municipio`
 ADD PRIMARY KEY (`id`), ADD KEY `estado` (`estado`);

--
-- Indices de la tabla `nivel`
--
ALTER TABLE `nivel`
 ADD PRIMARY KEY (`id`), ADD KEY `departamento` (`estatus`);

--
-- Indices de la tabla `parroquia`
--
ALTER TABLE `parroquia`
 ADD PRIMARY KEY (`id`), ADD KEY `minicipio` (`municipio`);

--
-- Indices de la tabla `permiso`
--
ALTER TABLE `permiso`
 ADD PRIMARY KEY (`tipousuario`,`menu`), ADD KEY `menu` (`menu`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
 ADD PRIMARY KEY (`cedula`) COMMENT 'clave foranea cedula', ADD KEY `foranea a profesion` (`profesion`), ADD KEY `parroquia` (`parroquia`), ADD KEY `nacionalidad` (`nacionalidad`);

--
-- Indices de la tabla `piso`
--
ALTER TABLE `piso`
 ADD PRIMARY KEY (`id`), ADD KEY `institucion` (`institucion`);

--
-- Indices de la tabla `piso_dependencia`
--
ALTER TABLE `piso_dependencia`
 ADD PRIMARY KEY (`piso`,`dependencia`), ADD KEY `dependencia` (`dependencia`);

--
-- Indices de la tabla `profesion`
--
ALTER TABLE `profesion`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tiponomina`
--
ALTER TABLE `tiponomina`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipousuario`
--
ALTER TABLE `tipousuario`
 ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
 ADD PRIMARY KEY (`id`), ADD KEY `tipousuario` (`tipousuario`) COMMENT 'clave foranea con tipousuario', ADD KEY `cedula` (`cedula`), ADD KEY `nacionalidad` (`nacionalidad`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargo`
--
ALTER TABLE `cargo`
MODIFY `id` int(3) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT de la tabla `dependencia`
--
ALTER TABLE `dependencia`
MODIFY `id` int(3) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `division`
--
ALTER TABLE `division`
MODIFY `id` int(3) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
MODIFY `id` int(3) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `ente`
--
ALTER TABLE `ente`
MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `horario`
--
ALTER TABLE `horario`
MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `institucion`
--
ALTER TABLE `institucion`
MODIFY `id` int(3) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `menu`
--
ALTER TABLE `menu`
MODIFY `id` int(3) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT de la tabla `municipio`
--
ALTER TABLE `municipio`
MODIFY `id` int(3) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `nivel`
--
ALTER TABLE `nivel`
MODIFY `id` int(3) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `parroquia`
--
ALTER TABLE `parroquia`
MODIFY `id` int(3) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `piso`
--
ALTER TABLE `piso`
MODIFY `id` int(3) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `profesion`
--
ALTER TABLE `profesion`
MODIFY `id` int(3) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `tiponomina`
--
ALTER TABLE `tiponomina`
MODIFY `id` int(3) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `tipousuario`
--
ALTER TABLE `tipousuario`
MODIFY `id` int(3) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
MODIFY `id` int(3) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cargo`
--
ALTER TABLE `cargo`
ADD CONSTRAINT `cargo_ibfk_1` FOREIGN KEY (`nivel`) REFERENCES `nivel` (`id`);

--
-- Filtros para la tabla `dependencia`
--
ALTER TABLE `dependencia`
ADD CONSTRAINT `dependencia_ibfk_2` FOREIGN KEY (`dependencia`) REFERENCES `dependencia` (`id`);

--
-- Filtros para la tabla `division`
--
ALTER TABLE `division`
ADD CONSTRAINT `division_ibfk_1` FOREIGN KEY (`division`) REFERENCES `division` (`id`),
ADD CONSTRAINT `division_ibfk_2` FOREIGN KEY (`dependencia`) REFERENCES `dependencia` (`id`);

--
-- Filtros para la tabla `empleado`
--
ALTER TABLE `empleado`
ADD CONSTRAINT `empleado_ibfk_2` FOREIGN KEY (`cargo`) REFERENCES `cargo` (`id`),
ADD CONSTRAINT `empleado_ibfk_4` FOREIGN KEY (`ente`) REFERENCES `ente` (`id`),
ADD CONSTRAINT `empleado_ibfk_5` FOREIGN KEY (`tiponomina`) REFERENCES `tiponomina` (`id`),
ADD CONSTRAINT `empleado_ibfk_6` FOREIGN KEY (`horario`) REFERENCES `horario` (`id`),
ADD CONSTRAINT `empleado_ibfk_7` FOREIGN KEY (`cedula`) REFERENCES `persona` (`cedula`),
ADD CONSTRAINT `empleado_ibfk_8` FOREIGN KEY (`division`) REFERENCES `division` (`id`);

--
-- Filtros para la tabla `ente`
--
ALTER TABLE `ente`
ADD CONSTRAINT `ente_ibfk_1` FOREIGN KEY (`parroquia`) REFERENCES `parroquia` (`id`);

--
-- Filtros para la tabla `menu`
--
ALTER TABLE `menu`
ADD CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`padre`) REFERENCES `menu` (`id`);

--
-- Filtros para la tabla `municipio`
--
ALTER TABLE `municipio`
ADD CONSTRAINT `municipio_ibfk_1` FOREIGN KEY (`estado`) REFERENCES `estado` (`id`);

--
-- Filtros para la tabla `parroquia`
--
ALTER TABLE `parroquia`
ADD CONSTRAINT `parroquia_ibfk_1` FOREIGN KEY (`municipio`) REFERENCES `municipio` (`id`);

--
-- Filtros para la tabla `permiso`
--
ALTER TABLE `permiso`
ADD CONSTRAINT `permiso_ibfk_1` FOREIGN KEY (`tipousuario`) REFERENCES `tipousuario` (`id`),
ADD CONSTRAINT `permiso_ibfk_2` FOREIGN KEY (`menu`) REFERENCES `menu` (`id`);

--
-- Filtros para la tabla `persona`
--
ALTER TABLE `persona`
ADD CONSTRAINT `persona_ibfk_1` FOREIGN KEY (`profesion`) REFERENCES `profesion` (`id`),
ADD CONSTRAINT `persona_ibfk_2` FOREIGN KEY (`parroquia`) REFERENCES `parroquia` (`id`);

--
-- Filtros para la tabla `piso`
--
ALTER TABLE `piso`
ADD CONSTRAINT `piso_ibfk_1` FOREIGN KEY (`institucion`) REFERENCES `institucion` (`id`);

--
-- Filtros para la tabla `piso_dependencia`
--
ALTER TABLE `piso_dependencia`
ADD CONSTRAINT `piso_dependencia_ibfk_1` FOREIGN KEY (`piso`) REFERENCES `piso` (`id`),
ADD CONSTRAINT `piso_dependencia_ibfk_2` FOREIGN KEY (`dependencia`) REFERENCES `dependencia` (`id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`tipousuario`) REFERENCES `tipousuario` (`id`),
ADD CONSTRAINT `usuario_ibfk_3` FOREIGN KEY (`cedula`) REFERENCES `persona` (`cedula`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
