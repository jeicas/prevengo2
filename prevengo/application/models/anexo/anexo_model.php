

<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Anexo_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function guardarAnexo($data) {
           
          $config['upload_path'] = './imagen/foto';
          $config['allowed_types'] = 'gif|jpg|png';
          $this->load->library('upload', $config);
         
          $nombrefoto     = "_Anex".$data['reincidencia'];
      
          $fotoType       =$data['tipoarchivo']; 
          $fotoTmp_name   = $data['direccion'];
        
          move_uploaded_file($fotoTmp_name,'empleados/'.$nombrefoto);
        
        return $this->db->insert('anexo', $data);
    }
   

}//fin de la clase


