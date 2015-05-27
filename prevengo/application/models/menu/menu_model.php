<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Menu_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function cargarMenu() {

        $query = $this->db->query("SELECT id,text as nombre, padre as padre
                                 FROM bdgenerica.menu where sistema=2 and padre!=''");
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



