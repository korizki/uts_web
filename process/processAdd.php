<?php 
    include "connection.php";
    $type = $_GET['type'];
    
    if($type == 'mahasiswa'){
        $nama = $_GET['Nama'];
        $nim = $_GET['NIM'];
        $pstudi = $_GET['Program_Studi'];
        $sql = "INSERT INTO mahasiswa (Nama, NIM, Program_Studi) VALUES ('$nama','$nim','$pstudi')";
    } else if($type == 'matakuliah'){
        $namamatkul = $_GET['nama'];
        $kodematkul = $_GET['kode'];
        $deskripsi = $_GET['deskripsi'];
        $sql = "INSERT INTO matakuliah (Nama, Kode_Matakuliah, Deskripsi) VALUES ('$namamatkul','$kodematkul','$deskripsi')";
    } else if($type == 'dosen'){
        $nama = $_GET['nama'];
        $nidn = $_GET['nidn'];
        $jenjang = $_GET['jenjang'];
        $sql = "INSERT INTO dosen (Nama, NIDN, Jenjang_Pendidikan) VALUES ('$nama','$nidn','$jenjang')";
    }
    $process = mysqli_query($connection, $sql);
    if($process){
        echo 'berhasil';
    } else {
        echo 'gagal';
    }
?>