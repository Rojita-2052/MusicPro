<?php

require_once '../config.php';

$valido['success']=array('success'=>false, 'mensaje'=>"");

if($_POST){
    $nombre=$_POST['nombre'];
    $apellido=$_POST['apellido'];
    $email=$_POST['email'];
    $telefono=$_POST['telefono'];
    $clave=md5($_POST['clave']);

    $sql="SELECT * FROM usuario WHERE email ='$email'";
    $resultado=$conn->query($sql);
    $cantidad=$resultado->num_rows;
    if($cantidad==0){
        $sqlInsertar= "INSERT INTO usuario VALUES(null,'$nombre','$apellido','$email', '$telefono', '$clave')";
        if($conn->query($sqlInsertar)===true){
            $valido['success']=true;
            $valido['mensaje']="Se guardo correctamente";
        }else{
            $valido['success']=false;
            $valido['mensaje']="ERROR: No se guardo";
        }

    }else{
        $valido['success']=false;
        $valido['mensaje']="El email de contacto ya se encuentra registrado";
    }

}else{
    $valido['success']=false;
    $valido['mensaje']="NO SE GUARDO";
}
echo json_encode($valido);

?>