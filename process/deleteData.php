<?php 
    include "connection.php";
    $type = $_GET['type'];
    $id = $_GET['id'];

    if($type == 'mahasiswa'){
        $sql = "DELETE FROM mahasiswa WHERE ID = '$id'";
    } else if($type == 'matakuliah'){
        $sql = "DELETE FROM matakuliah WHERE ID = '$id'";
    } else if($type == 'dosen'){
        $sql = "DELETE FROM dosen WHERE ID = '$id'";
    }
    $process = mysqli_query($connection, $sql);
    if($process){
        echo 'berhasil';
    } else {
        echo 'gagal';
    }
?>