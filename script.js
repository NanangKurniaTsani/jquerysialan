$(document).ready(function() {
    // Validasi keypress untuk input angka
    $('#gajiPokok, #tunjangan, #bonus, #nilaiUjian, #nilai1, #nilai2, #nilai3, #nilai4, #nilai5').on('keypress', function(e) {
        if (e.which < 48 || e.which > 57) { // 48-57 adalah kode karakter untuk angka 0-9
            e.preventDefault(); // Mencegah input selain angka
        }
    });

    // Studi Kasus 1: Hitung Gaji Karyawan
    $('#btnHitungGaji').click(function() {
        let gajiPokok = $('#gajiPokok').val();
        let tunjangan = $('#tunjangan').val();
        let bonus = $('#bonus').val();

        // Validasi input kosong
        if (gajiPokok === "" || tunjangan === "" || bonus === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Semua field harus diisi!',
            });
            return;
        }

        // Validasi angka
        if (isNaN(gajiPokok) || isNaN(tunjangan) || isNaN(bonus)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Masukkan hanya angka!',
            });
            return;
        }

        // Hitung Gaji Kotor, Pajak, dan Gaji Bersih
        let gajiKotor = parseInt(gajiPokok) + parseInt(tunjangan) + parseInt(bonus);
        let pajak = gajiKotor * 0.1; // Pajak 10%
        let gajiBersih = gajiKotor - pajak;

        // Tampilkan hasil
        $('#hasilGaji').html(`
            <h5>Hasil Perhitungan:</h5>
            <p>Gaji Kotor: Rp ${gajiKotor.toLocaleString()}</p>
            <p>Pajak (10%): Rp ${pajak.toLocaleString()}</p>
            <p>Gaji Bersih: Rp ${gajiBersih.toLocaleString()}</p>
        `);
    });

    // Reset input form Gaji
    $('#btnResetGaji').click(function() {
        $('#gajiPokok').val('');
        $('#tunjangan').val('');
        $('#bonus').val('');
        $('#hasilGaji').html('');
    });

    // Studi Kasus 2: Tentukan Grade
    $('#btnTentukanGrade').click(function() {
        let nilaiUjian = $('#nilaiUjian').val();

        // Validasi input kosong
        if (nilaiUjian === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Nilai Ujian harus diisi!',
            });
            return;
        }

        // Validasi angka
        if (isNaN(nilaiUjian)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Masukkan hanya angka!',
            });
            return;
        }

        // Tentukan Grade
        let grade;
        if (nilaiUjian >= 85) {
            grade = 'A';
        } else if (nilaiUjian >= 70) {
            grade = 'B';
        } else if (nilaiUjian >= 60) {
            grade = 'C';
        } else if (nilaiUjian >= 40) {
            grade = 'D';
        } else {
            grade = 'E';
        }

        // Tampilkan hasil
        $('#hasilGrade').html(`
            <h5>Hasil Penentuan Grade:</h5>
            <p>Grade: ${grade}</p>
        `);
    });

    // Reset input form Grade
    $('#btnResetGrade').click(function() {
        $('#nilaiUjian').val('');
        $('#hasilGrade').html('');
    });

    // Studi Kasus 3: Hitung Rata-rata Nilai
    $('#btnHitungRata').click(function() {
        let nilai1 = $('#nilai1').val();
        let nilai2 = $('#nilai2').val();
        let nilai3 = $('#nilai3').val();
        let nilai4 = $('#nilai4').val();
        let nilai5 = $('#nilai5').val();

        // Validasi input kosong
        if (nilai1 === "" || nilai2 === "" || nilai3 === "" || nilai4 === "" || nilai5 === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Semua nilai harus diisi!',
            });
            return;
        }

        // Validasi angka
        if (isNaN(nilai1) || isNaN(nilai2) || isNaN(nilai3) || isNaN(nilai4) || isNaN(nilai5)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Masukkan hanya angka!',
            });
            return;
        }

        // Hitung rata-rata
        let totalNilai = parseInt(nilai1) + parseInt(nilai2) + parseInt(nilai3) + parseInt(nilai4) + parseInt(nilai5);
        let rataRata = totalNilai / 5;

        // Tampilkan hasil
        $('#hasilRata').html(`
            <h5>Hasil Rata-rata:</h5>
            <p>Rata-rata Nilai: ${rataRata}</p>
        `);
    });

    // Reset input form Rata-rata
    $('#btnResetRata').click(function() {
        $('#nilai1').val('');
        $('#nilai2').val('');
        $('#nilai3').val('');
        $('#nilai4').val('');
        $('#nilai5').val('');
        $('#hasilRata').html('');
    });
});
