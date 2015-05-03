<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Persona_model extends CI_Model{

    public function __construct(){
        parent::__construct();
    }

    public function insertPersona($arregloPersona){
        $this->db->insert('persona', $arregloPersona);
        return $id =mysql_insert_id();
    }

    public function obtenerPersona($cedula,$nacionalidad,$estatus){
        return $this->db->get_where('persona',array('cedula' => $cedula,'nacionalidad' => $nacionalidad, 'estatus'=>$estatus));
    }

    public function updatePersona($cedula,$nacionalidad,$arregloPersona){
        $this->db->where('cedula', $cedula);
        $this->db->where('nacionalidad',$nacionalidad);
        $this->db->update('persona',$arregloPersona);
    }

    public function getPersona($cedula,$nacionalidad){
        return $this->db->get_where('persona',array('cedula' => $cedula,'nacionalidad' => $nacionalidad));
    }
}