<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class TipoUsuario_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function cargarTipoUsuario() {

        $query = $this->db->query("SELECT * 
                                 FROM bdgenerica.tipousuario where estatus=1");
        $resultado = array();
        $resultdb = array();
        if ($query->num_rows() > 0) {
            foreach ($query->result() as $row) {
                $resultado[] = $row;
            }
            return $resultado;
            $query->free - result();
        }
    }

}// fin de la clase



