$(document).ready(function() {
    // Validasi keypress untuk input angka
    $('#gajiPokok, #tunjangan, #bonus, #nilai, #nilaiInput').on('keypress', function(e) {
        if (e.which < 48 || e.which > 57) { // 48-57 adalah kode karakter untuk angka 0-9
            e.preventDefault(); // Mencegah input selain angka
        }
    });

    // Studi Kasus 1: Hitung Gaji Karyawan
    $('#btnHitungGaji').click(function() {
        let gajiPokok = $('#gajiPokok').val();
        let tunjangan = $('#tunjangan').val();
        let bonus = $('#bonus').val();

        // Validasi apakah input kosong atau bukan angka
        if (gajiPokok === "" || tunjangan === "" || bonus === "") {
            Swal.fire('Error', 'Semua inputan harus diisi!', 'error');
            return;
        }

        gajiPokok = parseFloat(gajiPokok);
        tunjangan = parseFloat(tunjangan);
        bonus = parseFloat(bonus);

        if (isNaN(gajiPokok) || isNaN(tunjangan) || isNaN(bonus)) {
            Swal.fire('Error', 'Inputan harus berupa angka!', 'error');
            return;
        }

        let gajiKotor = gajiPokok + tunjangan + bonus;
        let pajak = gajiKotor * 0.1;
        let gajiBersih = gajiKotor - pajak;

        $('#hasilGaji').html(`<p>Gaji Kotor: Rp ${gajiKotor.toLocaleString()}</p>
                              <p>Pajak: Rp ${pajak.toLocaleString()}</p>
                              <p>Gaji Bersih: Rp ${gajiBersih.toLocaleString()}</p>`);
    });

    // Reset Gaji
    $('#btnResetGaji').click(function() {
        $('#gajiPokok').val('');
        $('#tunjangan').val('');
        $('#bonus').val('');
        $('#hasilGaji').html('');
    });

    // Studi Kasus 2: Hitung Grade Nilai Mahasiswa
    $('#btnHitungGrade').click(function() {
        let nilai = $('#nilai').val();

        // Validasi apakah input kosong atau bukan angka
        if (nilai === "") {
            Swal.fire('Error', 'Input nilai harus diisi!', 'error');
            return;
        }

        nilai = parseFloat(nilai);

        if (isNaN(nilai)) {
            Swal.fire('Error', 'Inputan harus berupa angka!', 'error');
            return;
        }

        let grade;
        if (nilai >= 85) {
            grade = 'A';
        } else if (nilai >= 70) {
            grade = 'B';
        } else if (nilai >= 60) {
            grade = 'C';
        } else if (nilai >= 40) {
            grade = 'D';
        } else {
            grade = 'E';
        }

        $('#hasilGrade').html(`<p>Nilai: ${nilai}</p>
                               <p>Grade: ${grade}</p>`);
    });

    // Reset Grade
    $('#btnResetGrade').click(function() {
        $('#nilai').val('');
        $('#hasilGrade').html('');
    });

    // Studi Kasus 3: Hitung Rata-rata Nilai UAS
    $('#btnHitungRataRata').click(function() {
        let nilaiInput = $('#nilaiInput').val();

        // Validasi apakah input kosong
        if (nilaiInput === "") {
            Swal.fire('Error', 'Input nilai harus diisi!', 'error');
            return;
        }

        // Mengonversi inputan nilai yang dipisahkan koma menjadi array
        let nilaiArray = nilaiInput.split(',').map(function(item) {
            return parseFloat(item.trim());
        });

        // Validasi apakah semua nilai adalah angka
        for (let i = 0; i < nilaiArray.length; i++) {
            if (isNaN(nilaiArray[i])) {
                Swal.fire('Error', 'Semua nilai harus berupa angka!', 'error');
                return;
            }
        }

        let totalNilai = nilaiArray.reduce(function(acc, curr) {
            return acc + curr;
        }, 0);

        let rataRata = totalNilai / nilaiArray.length;

        $('#hasilRataRata').html(`<p>Total Nilai: ${totalNilai}</p>
                                  <p>Rata-rata: ${rataRata.toFixed(2)}</p>`);
    });

    // Reset Rata-rata
    $('#btnResetRataRata').click(function() {
        $('#nilaiInput').val('');
        $('#hasilRataRata').html('');
    });
});
