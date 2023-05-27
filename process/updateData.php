<?php 
    include "connection.php";
    $type = $_GET['type'];
    $id = $_GET['ID'];

    if($type == 'mahasiswa'){
        $nama = $_GET['Nama'];
        $nim = $_GET['NIM'];
        $pstudi = $_GET['Program_Studi'];
        $sql = "UPDATE mahasiswa SET Nama='$nama', NIM='$nim', Program_Studi='$pstudi' WHERE ID=$id";
    } else if($type == 'matakuliah'){
        $namamatkul = $_GET['nama'];
        $kodematkul = $_GET['kode'];
        $deskripsi = $_GET['deskripsi'];
        $sql = "UPDATE matakuliah SET Nama='$namamatkul', Kode_Matakuliah='$kodematkul', Deskripsi='$deskripsi' WHERE ID=$id";
    } else if($type == 'dosen'){
        $nama = $_GET['nama'];
        $nidn = $_GET['nidn'];
        $jenjang = $_GET['jenjang'];
        $sql = "UPDATE dosen SET Nama='$nama', NIDN='$nidn', Jenjang_Pendidikan='$jenjang' WHERE ID=$id";
    }
    $process = mysqli_query($connection, $sql);
    if($process){
        echo 'berhasil';
    } else {
        echo 'gagal';
    }
?>