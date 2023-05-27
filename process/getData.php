<?php 
    include "connection.php";
    $type = $_GET['type'];

    if($type == 'mahasiswa'){
        $sql = "SELECT * FROM mahasiswa";
    } else if($type == 'matakuliah'){
        $sql = "SELECT * FROM matakuliah";
    } else if($type == 'dosen'){
        $sql = "SELECT * FROM dosen";
    }
    $process = mysqli_query($connection, $sql);
    if($process){
        $alldata = array();
        while($row = mysqli_fetch_assoc($process)){
            $alldata[] = $row;
        }
        echo json_encode($alldata);
    } else {
        echo 'gagal';
    }
?>