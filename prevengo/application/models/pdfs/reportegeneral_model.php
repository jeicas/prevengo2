<?php 
class ReporteGeneral_model extends CI_Model{
	function __construct(){
		parent::__construct();
	}
	function getlistadogeneral($usuario){
		$sql= "SELECT DATE_FORMAT(autorizacion.fechaautorizacion,'%d-%m-%Y') as fechaautorizacion,persona.cedula,persona.nombre,persona.apellido,departamento.nombre as departamento,
			CASE autorizacion.motivoautorizacion WHEN 1 THEN 'Personal'  WHEN 2 THEN 'Laboral' WHEN 3 THEN 'Medico'
			WHEN 4 THEN 'Estudio' WHEN 5 THEN 'Sindical'  END as motivoautorizacion,
			CASE autorizacion.tipoautorizacion   WHEN 1 THEN 'Entrada'  
			WHEN 2 THEN 'Salida' WHEN 3 THEN 'Salida con retorno' 
			WHEN 4 THEN 'Salida de vehiculo'  WHEN 5 THEN 'Personal de guardia' 
			WHEN 6 THEN 'Personal mensajero'  WHEN 7 THEN 'Permanencia del personal' END as tipoautorizacion
	 	    FROM empleado
	 	    INNER JOIN persona on empleado.cedula=persona.cedula and persona.nacionalidad=empleado.nacionalidad
	 	    INNER JOIN departamento on empleado.departamento=departamento.id
	 	    LEFT JOIN tiponomina ON empleado.tiponomina=tiponomina.id
	 	    LEFT JOIN cargo ON empleado.cargo=cargo.id
	 	    INNER JOIN autorizacion ON empleado.cedula=autorizacion.cedula,usuario
	 	    WHERE  empleado.estatus=1
			AND autorizacion.usuario = usuario.id
			AND autorizacion.usuario='$usuario'
			GROUP BY autorizacion.motivoautorizacion,autorizacion.tipoautorizacion,empleado.cedula  ORDER BY empleado.departamento,persona.nombre, autorizacion.fechaautorizacion"; 
    	return 	$query = $this->db->query($sql, array($usuario));
	}	
//---------------------------Funciones que utilizo Resumen General---------------------------
	function getlistadogeneraldosdos($departamento){
		$sql= "SELECT departamento.id, departamento.nombre,  
			autorizacion.motivoautorizacion, 
			autorizacion.tipoautorizacion, 
			autorizacion.usuario,
			IF(autorizacion.motivoautorizacion='1',count(autorizacion.motivoautorizacion),'0') as Personal,
			IF(autorizacion.motivoautorizacion='2',count(autorizacion.motivoautorizacion),'0') as Laboral,
			IF(autorizacion.motivoautorizacion='3',count(autorizacion.motivoautorizacion),'0') as Medico,
			IF(autorizacion.motivoautorizacion='4',count(autorizacion.motivoautorizacion),'0') as Estudio,
			IF(autorizacion.motivoautorizacion='5',count(autorizacion.motivoautorizacion),'0') as Sindical
	 	    FROM empleado
	 	    INNER JOIN persona on empleado.cedula=persona.cedula and persona.nacionalidad=empleado.nacionalidad
	 	    INNER JOIN departamento on empleado.departamento=departamento.id
	 	    LEFT JOIN tiponomina ON empleado.tiponomina=tiponomina.id
	 	    LEFT JOIN cargo ON empleado.cargo=cargo.id
	 	    INNER JOIN autorizacion ON empleado.cedula=autorizacion.cedula,usuario
	 	    WHERE  empleado.estatus=1
	 	   	AND empleado.departamento $departamento
			AND autorizacion.usuario = usuario.id
			GROUP BY autorizacion.motivoautorizacion ORDER BY empleado.departamento,persona.nombre";
    	return $query = $this->db->query($sql, array($departamento));         
	}	
	function getdptotres($departamento){
		$sql= "	SELECT  distinct(departamento.id) as departamento,departamento.nombre 
			FROM empleado
			INNER JOIN persona on empleado.cedula=persona.cedula and persona.nacionalidad=empleado.nacionalidad
			LEFT JOIN departamento on empleado.departamento=departamento.id
			LEFT JOIN tiponomina ON empleado.tiponomina=tiponomina.id
			LEFT JOIN cargo ON empleado.cargo=cargo.id
			INNER JOIN autorizacion ON empleado.cedula=autorizacion.cedula
			WHERE  empleado.estatus=1
			AND empleado.departamento $departamento
            AND departamento.id $departamento or departamento.dependencia $departamento
			GROUP BY autorizacion.motivoautorizacion,empleado.cedula  ORDER BY empleado.departamento,persona.nombre";
		return $query = $this->db->query($sql, array($departamento));
	}
	function getdptotresdos($departamento){
		$sql= "	SELECT  distinct(departamento.id) as departamento,departamento.nombre 
			FROM empleado
			INNER JOIN persona on empleado.cedula=persona.cedula and persona.nacionalidad=empleado.nacionalidad
			LEFT JOIN departamento on empleado.departamento=departamento.id
			LEFT JOIN tiponomina ON empleado.tiponomina=tiponomina.id
			LEFT JOIN cargo ON empleado.cargo=cargo.id
			INNER JOIN autorizacion ON empleado.cedula=autorizacion.cedula
			WHERE  empleado.estatus=1
			AND empleado.departamento=$departamento
            AND departamento.id=$departamento or departamento.dependencia=$departamento
			GROUP BY autorizacion.motivoautorizacion,empleado.cedula  ORDER BY empleado.departamento,persona.nombre";
		return $query = $this->db->query($sql, array($departamento));
	}
	function getlistadogenerall($usuario){
		$sql= "SELECT departamento.id, departamento.nombre,  
			departamento.nombre AS departamento,
			autorizacion.motivoautorizacion,			
			autorizacion.tipoautorizacion, 
			autorizacion.usuario,
			IF(autorizacion.motivoautorizacion='1',count(autorizacion.motivoautorizacion),'0') as Personal,
			IF(autorizacion.motivoautorizacion='2',count(autorizacion.motivoautorizacion),'0') as Laboral,
			IF(autorizacion.motivoautorizacion='3',count(autorizacion.motivoautorizacion),'0') as Medico,
			IF(autorizacion.motivoautorizacion='4',count(autorizacion.motivoautorizacion),'0') as Estudio,
			IF(autorizacion.motivoautorizacion='5',count(autorizacion.motivoautorizacion),'0') as Sindical
	 	    FROM empleado
	 	    INNER JOIN persona on empleado.cedula=persona.cedula and persona.nacionalidad=empleado.nacionalidad
	 	    INNER JOIN departamento on empleado.departamento=departamento.id
	 	    LEFT JOIN tiponomina ON empleado.tiponomina=tiponomina.id
	 	    LEFT JOIN cargo ON empleado.cargo=cargo.id
	 	    INNER JOIN autorizacion ON empleado.cedula=autorizacion.cedula,usuario
	 	    WHERE  empleado.estatus=1
			AND autorizacion.usuario = usuario.id
			AND autorizacion.usuario='$usuario'
			group by autorizacion.motivoautorizacion,departamento.nombre order by departamento.nombre"; 
    	return 	$query = $this->db->query($sql, array($usuario));
	}
	function gettotalempeladosafinanzas($departamento){
		$sql= "SELECT distinct COUNT(empleado.cedula) as total,empleado.departamento
			FROM empleado 
            LEFT JOIN departamento ON empleado.departamento=departamento.id 
			WHERE  departamento.id=$departamento OR departamento.dependencia=$departamento 
			GROUP BY empleado.departamento ORDER BY empleado.departamento"; 
    	return $query = $this->db->query($sql, array($departamento));
	}
	function gettotalPermisosafinanzas($parametro1){
		$sql= "SELECT count(autorizacion.id) as permisos,departamento.nombre
			FROM empleado
	 	    INNER JOIN persona on empleado.cedula=persona.cedula and persona.nacionalidad=empleado.nacionalidad
	 	    LEFT JOIN departamento on empleado.departamento=departamento.id
	 	    INNER JOIN autorizacion ON empleado.cedula=autorizacion.cedula
			WHERE  persona.cedula=empleado.cedula
			AND departamento.id='$parametro1' OR departamento.dependencia='$parametro1' GROUP BY  departamento.id, departamento.dependencia,departamento.nombre ORDER BY departamento.nombre"; 
    	return $query = $this->db->query($sql, array($parametro1));
	}
	function getlistadogeneraldos($departamento){
		$sql= "SELECT departamento.id, departamento.nombre,  
			autorizacion.motivoautorizacion, 
			autorizacion.tipoautorizacion, 
			autorizacion.usuario,
			IF(autorizacion.motivoautorizacion='1',count(autorizacion.motivoautorizacion),'0') as Personal,
			IF(autorizacion.motivoautorizacion='2',count(autorizacion.motivoautorizacion),'0') as Laboral,
			IF(autorizacion.motivoautorizacion='3',count(autorizacion.motivoautorizacion),'0') as Medico,
			IF(autorizacion.motivoautorizacion='4',count(autorizacion.motivoautorizacion),'0') as Estudio,
			IF(autorizacion.motivoautorizacion='5',count(autorizacion.motivoautorizacion),'0') as Sindical
	 	    FROM empleado
	 	    INNER JOIN persona on empleado.cedula=persona.cedula and persona.nacionalidad=empleado.nacionalidad
	 	    INNER JOIN departamento on empleado.departamento=departamento.id
	 	    LEFT JOIN tiponomina ON empleado.tiponomina=tiponomina.id
	 	    LEFT JOIN cargo ON empleado.cargo=cargo.id
	 	    INNER JOIN autorizacion ON empleado.cedula=autorizacion.cedula,usuario
	 	    WHERE  empleado.estatus=1
	 	   	AND empleado.departamento =$departamento
			AND autorizacion.usuario = usuario.id
			GROUP BY autorizacion.motivoautorizacion ORDER BY empleado.departamento,persona.nombre";
    	return $query = $this->db->query($sql, array($departamento));         
	}
    function getlistadogeneraldostres($departamento){
		$sql= "SELECT departamento.id, departamento.nombre,  
			autorizacion.motivoautorizacion, 
			autorizacion.tipoautorizacion, 
			autorizacion.usuario,
			IF(autorizacion.motivoautorizacion='1',count(autorizacion.motivoautorizacion),'0') as Personal,
			IF(autorizacion.motivoautorizacion='2',count(autorizacion.motivoautorizacion),'0') as Laboral,
			IF(autorizacion.motivoautorizacion='3',count(autorizacion.motivoautorizacion),'0') as Medico,
			IF(autorizacion.motivoautorizacion='4',count(autorizacion.motivoautorizacion),'0') as Estudio,
			IF(autorizacion.motivoautorizacion='5',count(autorizacion.motivoautorizacion),'0') as Sindical
	 	    FROM empleado
	 	    INNER JOIN persona on empleado.cedula=persona.cedula and persona.nacionalidad=empleado.nacionalidad
	 	    INNER JOIN departamento on empleado.departamento=departamento.id
	 	    LEFT JOIN tiponomina ON empleado.tiponomina=tiponomina.id
	 	    LEFT JOIN cargo ON empleado.cargo=cargo.id
	 	    INNER JOIN autorizacion ON empleado.cedula=autorizacion.cedula,usuario
	 	    WHERE  empleado.estatus=1
	 	   	AND empleado.departamento='$departamento'
			AND autorizacion.usuario = usuario.id
			GROUP BY autorizacion.motivoautorizacion ORDER BY empleado.departamento,persona.nombre";
    	return $query = $this->db->query($sql, array($departamento));         
	}	
	function gettotalempelados($departamento){
		$sql= "SELECT COUNT(empleado.cedula) as total,empleado.departamento
			FROM empleado
			LEFT JOIN departamento ON empleado.departamento=departamento.id 
			WHERE  departamento.id=$departamento group by empleado.departamento"; 
    	return $query = $this->db->query($sql, array($departamento));
	}
	function gettotalPermisos($departamento){
		$sql= "SELECT count(autorizacion.id) as permisos 
			FROM empleado
	 	    INNER JOIN persona on empleado.cedula=persona.cedula and persona.nacionalidad=empleado.nacionalidad
	 	    INNER JOIN departamento on empleado.departamento=departamento.id
	 	    INNER JOIN autorizacion ON empleado.cedula=autorizacion.cedula
			WHERE  persona.cedula=empleado.cedula
			AND departamento.id='$departamento' group by empleado.departamento"; 
    	return $query = $this->db->query($sql, array($departamento));
	}

    function getempleado(){
	    $query = $this->db->query("  SELECT empleado.cedula as cedula,persona.nombre as nombre,persona.apellido as apellido
		    FROM empleado
		    INNER JOIN persona on empleado.cedula=persona.cedula and persona.nacionalidad=empleado.nacionalidad
		    INNER JOIN departamento on empleado.departamento=departamento.id
		    LEFT JOIN tiponomina ON empleado.tiponomina=tiponomina.id
		    LEFT JOIN cargo ON empleado.cargo=cargo.id
		    INNER JOIN autorizacion ON empleado.autorizacion=autorizacion.id
		    WHERE  empleado.estatus=1");
	    return $query;
	}
	function getsalidasempleados($nacionalidad,$cedula,$nombre,$apellido,$usuario){
		$sql= "SELECT empleado.cedula,autorizacion.id,autorizacion.usuario,persona.nombre,persona.apellido,departamento.id as departamento,
			IF(autorizacion.motivoautorizacion='1' ,count(autorizacion.motivoautorizacion),'0') as Personal,
			IF(autorizacion.motivoautorizacion='2' ,count(autorizacion.motivoautorizacion),'0') as Laboral,
			IF(autorizacion.motivoautorizacion='3' ,count(autorizacion.motivoautorizacion),'0') as Medico,
			IF(autorizacion.motivoautorizacion='4' ,count(autorizacion.motivoautorizacion),'0') as Estudio,
			IF(autorizacion.motivoautorizacion='5' ,count(autorizacion.motivoautorizacion),'0') as Sindical
		    FROM empleado
		    INNER JOIN persona on empleado.cedula=persona.cedula and persona.nacionalidad=empleado.nacionalidad
		    INNER JOIN departamento on empleado.departamento=departamento.id
		    LEFT JOIN tiponomina ON empleado.tiponomina=tiponomina.id
		    LEFT JOIN cargo ON empleado.cargo=cargo.id
		    INNER JOIN autorizacion ON empleado.cedula=autorizacion.cedula
		    WHERE  empleado.estatus=1
	    	AND persona.nacionalidad $nacionalidad
	    	AND autorizacion.usuario='$usuario'
	        AND persona.cedula $cedula
	        AND persona.nombre $nombre
			AND persona.apellido $apellido
			GROUP BY autorizacion.motivoautorizacion,empleado.cedula  ORDER BY empleado.departamento,persona.nombre"; 
	    return $query = $this->db->query($sql, array($nacionalidad,$cedula,$nombre,$apellido,$usuario));    	
	}
	function getsalidasempleadosdos($nacionalidad,$cedula,$nombre,$apellido,$departamento){
		$sql= "SELECT  empleado.cedula,autorizacion.cedula,persona.nombre,persona.apellido,autorizacion.id, autorizacion.motivoautorizacion,departamento.id as departamento,
			IF(autorizacion.motivoautorizacion='1' ,count(autorizacion.motivoautorizacion),'0') as Personal,
			IF(autorizacion.motivoautorizacion='2' ,count(autorizacion.motivoautorizacion),'0') as Laboral,
			IF(autorizacion.motivoautorizacion='3' ,count(autorizacion.motivoautorizacion),'0') as Medico,
			IF(autorizacion.motivoautorizacion='4' ,count(autorizacion.motivoautorizacion),'0') as Estudio,
			IF(autorizacion.motivoautorizacion='5' ,count(autorizacion.motivoautorizacion),'0') as Sindical
			FROM empleado
			INNER JOIN persona on empleado.cedula=persona.cedula and persona.nacionalidad=empleado.nacionalidad
			INNER JOIN departamento on empleado.departamento=departamento.id
			LEFT JOIN tiponomina ON empleado.tiponomina=tiponomina.id
			LEFT JOIN cargo ON empleado.cargo=cargo.id
			INNER JOIN autorizacion ON empleado.cedula=autorizacion.cedula
			WHERE  empleado.estatus=1
			AND persona.nacionalidad $nacionalidad
			AND persona.cedula $cedula
			AND persona.nombre $nombre
			AND persona.apellido $apellido
			AND empleado.departamento= '$departamento'
			GROUP BY autorizacion.motivoautorizacion,empleado.cedula  ORDER BY empleado.departamento,persona.nombre"; 
		return $query = $this->db->query($sql, array($nacionalidad,$cedula,$nombre,$apellido,$departamento));
	}
	function getdptoempleados($nacionalidad,$cedula,$nombre,$apellido,$usuario){
		$sql= "SELECT  distinct(departamento.id) as departamento,departamento.nombre 
			FROM empleado
			INNER JOIN persona on empleado.cedula=persona.cedula and persona.nacionalidad=empleado.nacionalidad
			INNER JOIN departamento on empleado.departamento=departamento.id
			LEFT JOIN tiponomina ON empleado.tiponomina=tiponomina.id
			LEFT JOIN cargo ON empleado.cargo=cargo.id
			INNER JOIN autorizacion ON empleado.cedula=autorizacion.cedula
			WHERE  empleado.estatus=1
			AND persona.nacionalidad $nacionalidad
			AND persona.cedula $cedula
			AND persona.nombre $nombre
			AND persona.apellido $apellido
	    	AND autorizacion.usuario='$usuario'
			GROUP BY autorizacion.motivoautorizacion,empleado.cedula  ORDER BY empleado.departamento,persona.nombre";
		return $query = $this->db->query($sql, array($nacionalidad,$cedula,$nombre,$apellido,$usuario));
	}
	function getdptoempleadosdos($nacionalidad,$cedula,$nombre,$apellido,$departamento){
		$sql= "SELECT  distinct(departamento.id) as departamento,departamento.nombre 
			FROM empleado
			INNER JOIN persona on empleado.cedula=persona.cedula and persona.nacionalidad=empleado.nacionalidad
			INNER JOIN departamento on empleado.departamento=departamento.id
			LEFT JOIN tiponomina ON empleado.tiponomina=tiponomina.id
			LEFT JOIN cargo ON empleado.cargo=cargo.id
			INNER JOIN autorizacion ON empleado.cedula=autorizacion.cedula
			WHERE  empleado.estatus=1
			AND persona.nacionalidad $nacionalidad
			AND persona.cedula $cedula
			AND persona.nombre $nombre
			AND persona.apellido $apellido
			AND empleado.departamento $departamento
			GROUP BY autorizacion.motivoautorizacion,empleado.cedula  ORDER BY empleado.departamento,persona.nombre";
		return $query = $this->db->query($sql, array($nacionalidad,$cedula,$nombre,$apellido,$departamento));
	}
	function getdpto($departamento){
		$sql= "SELECT  distinct(departamento.id) as departamento,departamento.nombre 
			FROM empleado
			INNER JOIN persona on empleado.cedula=persona.cedula and persona.nacionalidad=empleado.nacionalidad
			INNER JOIN departamento on empleado.departamento=departamento.id
			LEFT JOIN tiponomina ON empleado.tiponomina=tiponomina.id
			LEFT JOIN cargo ON empleado.cargo=cargo.id
			INNER JOIN autorizacion ON empleado.cedula=autorizacion.cedula
			WHERE  empleado.estatus=1
			AND empleado.departamento $departamento
			GROUP BY autorizacion.motivoautorizacion,empleado.cedula  ORDER BY empleado.departamento,persona.nombre";
		return $query = $this->db->query($sql, array($departamento));
	}
	function getdptodos($departamento,$desde,$hasta){
		$sql= "SELECT  distinct(departamento.id) as departamento,departamento.nombre 
			FROM empleado
			INNER JOIN persona on empleado.cedula=persona.cedula and persona.nacionalidad=empleado.nacionalidad
			INNER JOIN departamento on empleado.departamento=departamento.id
			LEFT JOIN tiponomina ON empleado.tiponomina=tiponomina.id
			LEFT JOIN cargo ON empleado.cargo=cargo.id
			INNER JOIN autorizacion ON empleado.cedula=autorizacion.cedula AND autorizacion.fechaautorizacion BETWEEN '$desde' AND '$hasta'
			WHERE  empleado.estatus=1
			AND empleado.departamento $departamento
			GROUP BY autorizacion.motivoautorizacion,empleado.cedula  ORDER BY empleado.departamento,persona.nombre";
		return $query = $this->db->query($sql, array($departamento,$desde,$hasta));
	}
	function getlistadogeneraltrestres($departamento){
		$sql= "SELECT departamento.id, departamento.nombre,  
			autorizacion.motivoautorizacion, 
			autorizacion.tipoautorizacion, 
			autorizacion.usuario,
			IF(autorizacion.motivoautorizacion='1',count(autorizacion.motivoautorizacion),'0') as Personal,
			IF(autorizacion.motivoautorizacion='2',count(autorizacion.motivoautorizacion),'0') as Laboral,
			IF(autorizacion.motivoautorizacion='3',count(autorizacion.motivoautorizacion),'0') as Medico,
			IF(autorizacion.motivoautorizacion='4',count(autorizacion.motivoautorizacion),'0') as Estudio,
			IF(autorizacion.motivoautorizacion='5',count(autorizacion.motivoautorizacion),'0') as Sindical
	 	    FROM empleado
	 	    INNER JOIN persona on empleado.cedula=persona.cedula and persona.nacionalidad=empleado.nacionalidad
	 	    LEFT JOIN departamento on empleado.departamento=departamento.id
	 	    LEFT JOIN tiponomina ON empleado.tiponomina=tiponomina.id
	 	    LEFT JOIN cargo ON empleado.cargo=cargo.id
	 	    INNER JOIN autorizacion ON empleado.cedula=autorizacion.cedula,usuario
	 	    WHERE  empleado.estatus=1
	 	   	AND empleado.departamento =$departamento
            AND departamento.id=$departamento
            OR departamento.dependencia=$departamento
			AND autorizacion.usuario = usuario.id
				group by autorizacion.motivoautorizacion,departamento.nombre order by departamento.nombre";
    	return $query = $this->db->query($sql, array($departamento));         
	}
	function getlistadogeneraltres($departamento){
		$sql= "SELECT departamento.id, departamento.nombre,  
			autorizacion.motivoautorizacion, 
			autorizacion.tipoautorizacion, 
			autorizacion.usuario,
			IF(autorizacion.motivoautorizacion='1',count(autorizacion.motivoautorizacion),'0') as Personal,
			IF(autorizacion.motivoautorizacion='2',count(autorizacion.motivoautorizacion),'0') as Laboral,
			IF(autorizacion.motivoautorizacion='3',count(autorizacion.motivoautorizacion),'0') as Medico,
			IF(autorizacion.motivoautorizacion='4',count(autorizacion.motivoautorizacion),'0') as Estudio,
			IF(autorizacion.motivoautorizacion='5',count(autorizacion.motivoautorizacion),'0') as Sindical
	 	    FROM empleado
	 	    INNER JOIN persona on empleado.cedula=persona.cedula and persona.nacionalidad=empleado.nacionalidad
	 	    LEFT JOIN departamento on empleado.departamento=departamento.id
	 	    LEFT JOIN tiponomina ON empleado.tiponomina=tiponomina.id
	 	    LEFT JOIN cargo ON empleado.cargo=cargo.id
	 	    INNER JOIN autorizacion ON empleado.cedula=autorizacion.cedula,usuario
	 	    WHERE  empleado.estatus=1
	 	   	AND departamento.id='$departamento' 
            OR departamento.dependencia='$departamento' 
			AND autorizacion.usuario = usuario.id
			GROUP BY autorizacion.motivoautorizacion ORDER BY empleado.departamento,persona.nombre";
    	return $query = $this->db->query($sql, array($departamento));         
	}
//----------------------------------------------------------------------------------------------------------------------------------------
	function getpermisodos($motivoautorizacion,$tipoautorizacion,$usuario,$desde,$hasta){
 		$sql="SELECT DATE_FORMAT(autorizacion.fechaautorizacion,'%d-%m-%Y') as fechaautorizacion,persona.cedula,persona.nombre,persona.apellido,departamento.nombre as departamento,
			CASE autorizacion.motivoautorizacion WHEN 1 THEN 'Personal'  WHEN 2 THEN 'Laboral' WHEN 3 THEN 'Medico'
			WHEN 4 THEN 'Estudio' WHEN 5 THEN 'Sindical'  END as motivoautorizacion,
			CASE autorizacion.tipoautorizacion   WHEN 1 THEN 'Entrada'  
			WHEN 2 THEN 'Salida' WHEN 3 THEN 'Salida con retorno' 
			WHEN 4 THEN 'Salida de vehiculo'  WHEN 5 THEN 'Personal de guardia' 
			WHEN 6 THEN 'Personal mensajero'  WHEN 7 THEN 'Permanencia del personal' END as tipoautorizacion
			FROM autorizacion
			INNER JOIN empleado ON autorizacion.nacionalidad=empleado.nacionalidad
			AND autorizacion.cedula=empleado.cedula
			AND autorizacion.motivoautorizacion $motivoautorizacion
			AND autorizacion.tipoautorizacion $tipoautorizacion
			AND autorizacion.usuario= '$usuario'
			AND autorizacion.fechaautorizacion BETWEEN '$desde' AND '$hasta'
			INNER JOIN persona on empleado.nacionalidad=persona.nacionalidad AND empleado.cedula=persona.cedula   
			INNER JOIN departamento on empleado.departamento=departamento.id
			INNER JOIN usuario on autorizacion.usuario=usuario.id GROUP BY autorizacion.motivoautorizacion,autorizacion.tipoautorizacion,empleado.cedula  ORDER BY empleado.departamento,persona.nombre, autorizacion.fechaautorizacion";
    	return $query = $this->db->query($sql, array($motivoautorizacion,$tipoautorizacion,$usuario,$desde,$hasta));
	}	
	function getpermiso($motivoautorizacion,$tipoautorizacion,$desde,$hasta,$departamento){
 		$sql= "SELECT DATE_FORMAT(autorizacion.fechaautorizacion,'%d-%m-%Y') as fechaautorizacion, persona.cedula,persona.nombre,persona.apellido,departamento.nombre as departamento,
			CASE autorizacion.motivoautorizacion WHEN 1 THEN 'Personal'  WHEN 2 THEN 'Laboral' WHEN 3 THEN 'Medico'
			WHEN 4 THEN 'Estudio' WHEN 5 THEN 'Sindical'  END as motivoautorizacion,
			CASE autorizacion.tipoautorizacion   WHEN 1 THEN 'Entrada'  
			WHEN 2 THEN 'Salida' WHEN 3 THEN 'Salida con retorno' 
			WHEN 4 THEN 'Salida de vehiculo'  WHEN 5 THEN 'Personal de guardia' 
			WHEN 6 THEN 'Personal mensajero'  WHEN 7 THEN 'Permanencia del personal' END as tipoautorizacion
			FROM autorizacion
			INNER JOIN empleado ON autorizacion.nacionalidad=empleado.nacionalidad
			AND autorizacion.cedula=empleado.cedula
			AND autorizacion.motivoautorizacion $motivoautorizacion
			AND autorizacion.tipoautorizacion $tipoautorizacion
			AND autorizacion.fechaautorizacion BETWEEN '$desde' AND '$hasta'
			INNER JOIN persona on empleado.nacionalidad=persona.nacionalidad AND empleado.cedula=persona.cedula   
			INNER JOIN departamento on empleado.departamento=departamento.id AND empleado.departamento ='$departamento'
			INNER JOIN usuario on autorizacion.usuario=usuario.id GROUP BY autorizacion.motivoautorizacion,autorizacion.tipoautorizacion,empleado.cedula  ORDER BY empleado.departamento,persona.nombre, autorizacion.fechaautorizacion"; 
    	return $query = $this->db->query($sql, array($motivoautorizacion,$tipoautorizacion,$desde,$hasta,$departamento));
	}
	function getpermisos($motivoautorizacion,$tipoautorizacion,$desde,$hasta,$departamento){
 		$sql= "SELECT DATE_FORMAT(autorizacion.fechaautorizacion,'%d-%m-%Y') as fechaautorizacion, persona.cedula,persona.nombre,persona.apellido,departamento.nombre as departamento,
			CASE autorizacion.motivoautorizacion WHEN 1 THEN 'Personal'  WHEN 2 THEN 'Laboral' WHEN 3 THEN 'Medico'
			WHEN 4 THEN 'Estudio' WHEN 5 THEN 'Sindical'  END as motivoautorizacion,
			CASE autorizacion.tipoautorizacion   WHEN 1 THEN 'Entrada'  
			WHEN 2 THEN 'Salida' WHEN 3 THEN 'Salida con retorno' 
			WHEN 4 THEN 'Salida de vehiculo'  WHEN 5 THEN 'Personal de guardia' 
			WHEN 6 THEN 'Personal mensajero'  WHEN 7 THEN 'Permanencia del personal' END as tipoautorizacion
			FROM autorizacion
			INNER JOIN empleado ON autorizacion.nacionalidad=empleado.nacionalidad
			AND autorizacion.cedula=empleado.cedula
			AND autorizacion.motivoautorizacion $motivoautorizacion
			AND autorizacion.tipoautorizacion $tipoautorizacion
			AND autorizacion.fechaautorizacion BETWEEN '$desde' AND '$hasta'
			INNER JOIN persona on empleado.nacionalidad=persona.nacionalidad AND empleado.cedula=persona.cedula   
			INNER JOIN departamento on empleado.departamento=departamento.id AND empleado.departamento $departamento
			INNER JOIN usuario on autorizacion.usuario=usuario.id GROUP BY autorizacion.motivoautorizacion,autorizacion.tipoautorizacion,empleado.cedula  ORDER BY empleado.departamento,persona.nombre, autorizacion.fechaautorizacion"; 
    	return $query = $this->db->query($sql, array($motivoautorizacion,$tipoautorizacion,$desde,$hasta,$departamento));
	}
	public function getdivision($division){
		$query = $this->db->query("SELECT distinct autorizacion.*, departamento.id as division,departamento.nombre as nombredivision
			FROM departamento,empleado,autorizacion,usuario
			WHERE empleado.departamento=departamento.id 
			AND autorizacion.usuario=usuario.id
			AND usuario.cedula=empleado.cedula
			AND autorizacion.usuario='$division'");
		return $query;
	}
}