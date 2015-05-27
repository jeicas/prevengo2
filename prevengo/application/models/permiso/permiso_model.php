<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Permiso_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function cargarMenuConPermiso($id) {

        $query = $this->db->query("SELECT id, text as nombre, padre as padre 
                                    FROM bdgenerica.menu 
                                    inner join  bdgenerica.permiso on  bdgenerica.menu.id= bdgenerica.permiso.menu
                                    where   bdgenerica.menu.padre!='' and bdgenerica.menu.sistema=2 and bdgenerica.permiso.tipousuario=$id");
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
    
     public function guardarPermiso($data) {
        return $this->db->insert('bdgenerica.permiso', $data);
    }
    
    
     public function buscarPadre($id, $tipUs) {

        $query = $this->db->query("SELECT menu
                                   FROM bdgenerica.permiso where menu=$id and tipousuario=$tipUs");
         return $query;
     }

}// fin de la clase



