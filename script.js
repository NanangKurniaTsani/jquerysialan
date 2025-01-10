$(document).ready(function() {
    // Menambahkan event listener untuk tombol reset
    $(".btn-reset").click(function() {
        // Reset semua input di dalam modal
        $(this).closest('.modal-body').find('input[type="text"]').val('');
    });

    // Validasi input hanya angka
    function isValidNumber(value) {
        return !isNaN(value) && value !== '';
    }

    // Format Rupiah
    function formatRupiah(number) {
        return number.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    }

    // Fungsi untuk berpindah ke input berikutnya saat menekan Enter
    function moveToNextInput(currentInput) {
        var nextInput = currentInput.next('input');
        if (nextInput.length) {
            nextInput.focus();
        }
    }

    // Hitung Gaji
    $("#btnHitungGaji").click(function() {
        var gajiPokok = $("#gajiPokok").val();
        var tunjangan = $("#tunjangan").val();
        var bonus = $("#bonus").val();

        // Validasi apakah semua input adalah angka
        if (!isValidNumber(gajiPokok) || !isValidNumber(tunjangan) || !isValidNumber(bonus)) {
            Swal.fire('Harap masukkan nilai yang valid (hanya angka)!'); // Alert jika input tidak valid
        } else {
            gajiPokok = parseFloat(gajiPokok);
            tunjangan = parseFloat(tunjangan);
            bonus = parseFloat(bonus);
            
            // Hitung total gaji
            var totalGaji = gajiPokok + tunjangan + bonus;

            // Hitung pajak 10%
            var pajak = totalGaji * 0.10;
            var gajiSetelahPajak = totalGaji - pajak;

            // Format gaji dan pajak dalam format Rupiah
            var totalGajiFormatted = formatRupiah(totalGaji);
            var pajakFormatted = formatRupiah(pajak);
            var gajiSetelahPajakFormatted = formatRupiah(gajiSetelahPajak);

            Swal.fire({
                title: 'Perhitungan Gaji',
                html: `
                    <p>Total Gaji: ${totalGajiFormatted}</p>
                    <p>Pajak (10%): ${pajakFormatted}</p>
                    <p>Gaji Setelah Pajak: ${gajiSetelahPajakFormatted}</p>
                `,
                icon: 'success'
            });
        }
    });

    // Hitung Grade
    $("#btnHitungGrade").click(function() {
        var nilai = $("#nilai").val();

        // Validasi apakah input adalah angka
        if (!isValidNumber(nilai)) {
            Swal.fire('Harap masukkan nilai yang valid (hanya angka)!'); // Alert jika input tidak valid
        } else {
            nilai = parseFloat(nilai);
            var grade = '';
            if (nilai >= 85) grade = 'A';
            else if (nilai >= 70) grade = 'B';
            else if (nilai >= 50) grade = 'C';
            else grade = 'D';

            Swal.fire({
                title: 'Grade Nilai',
                html: `<p>Nilai: ${nilai}</p><p>Grade: ${grade}</p>`,
                icon: 'success'
            });
        }
    });

    // Hitung Rata-rata Nilai
    $("#btnHitungRata").click(function() {
        var nilai1 = $("#nilai1").val();
        var nilai2 = $("#nilai2").val();
        var nilai3 = $("#nilai3").val();
        var nilai4 = $("#nilai4").val();
        var nilai5 = $("#nilai5").val();

        // Validasi apakah semua input adalah angka
        if (!isValidNumber(nilai1) || !isValidNumber(nilai2) || !isValidNumber(nilai3) || 
            !isValidNumber(nilai4) || !isValidNumber(nilai5)) {
            Swal.fire('Harap masukkan nilai yang valid (hanya angka)!'); // Alert jika input tidak valid
        } else {
            nilai1 = parseFloat(nilai1);
            nilai2 = parseFloat(nilai2);
            nilai3 = parseFloat(nilai3);
            nilai4 = parseFloat(nilai4);
            nilai5 = parseFloat(nilai5);

            var totalNilai = nilai1 + nilai2 + nilai3 + nilai4 + nilai5;
            var rataRata = totalNilai / 5;

            Swal.fire({
                title: 'Rata-rata Nilai',
                html: `<p>Total Nilai: ${totalNilai}</p><p>Rata-rata Nilai: ${rataRata}</p>`,
                icon: 'success'
            });
        }
    });

    // Event untuk berpindah input saat menekan Enter
    $('input').on('keypress', function(e) {
        if (e.which == 13) { // Cek jika tombol Enter ditekan
            moveToNextInput($(this)); // Pindah ke input berikutnya
        }
    });

    // Hitung otomatis jika semua input pada Studi Kasus sudah terisi dan Enter ditekan
    $('#gajiPokok, #tunjangan, #bonus').on('keypress', function(e) {
        if (e.which == 13) {
            if ($('#gajiPokok').val() && $('#tunjangan').val() && $('#bonus').val()) {
                $("#btnHitungGaji").click(); // Klik tombol Hitung Gaji jika semua input sudah terisi
            }
        }
    });

    $('#nilai').on('keypress', function(e) {
        if (e.which == 13) {
            if ($('#nilai').val()) {
                $("#btnHitungGrade").click(); // Klik tombol Hitung Grade jika input sudah terisi
            }
        }
    });

    $('#nilai1, #nilai2, #nilai3, #nilai4, #nilai5').on('keypress', function(e) {
        if (e.which == 13) {
            if ($('#nilai1').val() && $('#nilai2').val() && $('#nilai3').val() && $('#nilai4').val() && $('#nilai5').val()) {
                $("#btnHitungRata").click(); // Klik tombol Hitung Rata-rata jika semua input sudah terisi
            }
        }
    });

    // Pastikan bahwa saat input pertama pada Studi Kasus 1 diisi, tombol enter akan fokus ke input berikutnya
    $('#gajiPokok').on('keypress', function(e) {
        if (e.which == 13) {
            if ($('#gajiPokok').val()) {
                moveToNextInput($(this)); // Pindah ke input berikutnya
            }
        }
    });

    $('#tunjangan').on('keypress', function(e) {
        if (e.which == 13) {
            if ($('#tunjangan').val()) {
                moveToNextInput($(this)); // Pindah ke input berikutnya
            }
        }
    });

    $('#bonus').on('keypress', function(e) {
        if (e.which == 13) {
            if ($('#bonus').val()) {
                $("#btnHitungGaji").click(); // Klik tombol Hitung Gaji jika input sudah terisi
            }
        }
    });
});
