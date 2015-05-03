<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Camara {
	
	var $nombreFoto;

	public function __construct(){
		$ruta="empleados";
		if (file_exists("empleados")){ 
			$this->nombreFoto = $ruta.'/'."_DSC".$_GET['nacionalidad'].$_GET['cedula'].".jpg";
    	}else{ 
    		mkdir("empleados");
    		$this->nombreFoto = $ruta.'/'."_DSC".$_GET['nacionalidad'].$_GET['cedula'].".jpg";
      	}
	}
	public function guardarFoto(){
		$result = file_put_contents( $this->nombreFoto, file_get_contents('php://input') );
		if (!$result) {
			print "ERROR: Failed to write data to $this->nombreFoto, check permissions\n";
			exit();
		}
		$url = 'http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) . '/' . $this->nombreFoto;
		print "$url\n";
		return file_get_contents('php://input');
		//echo json_encode(mkdir("empleados"));
	}
}