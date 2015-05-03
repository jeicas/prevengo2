<?php 
	$this->load->view('header');
	/*require_once('recaptchalib.php');
	$publickey = '6LcJAPUSAAAAACZ_vvBx46SqeL0eSQTh5JhkKcLC';
	echo recaptcha_get_html($publickey);*/
    echo '<script type="text/javascript" src="'.(base_url()).'js/myapp/view/Star.js"></script>';
	$this->load->view('footer'); 
?>