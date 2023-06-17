<?php

require_once '../config.php';
$valido['success']=array('success'=>false, 'mensaje'=>"", ' nombre'=>"");
if($_POST){
    $email=$_POST['email'];
    $clave=md5($_POST['clave']);

    $sql="SELECT * FROM usuario WHERE email ='$email'";
    $resultado=$conn->query($sql);
    $cantidad=$resultado->num_rows;
    if($cantidad>0){
            $row=$resultado->fetch_array();
            $valido['success']=true;
            $valido['mensaje']="Bienvenido a MusicPRO".$row['nombre'];
            $valido['nombre']=$row['nombre'];
        }else{
        $valido['success']=false;
        $valido['mensaje']="El email no se encuentra registrado";
    }

}else{
    $valido['success']=false;
    $valido['mensaje']="NO SE GUARDO";
}
echo json_encode($valido);

?>