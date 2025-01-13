$(document).ready(function() {
    // Event listener untuk tombol reset
    $(".btn-reset").click(function() {
        // Menghapus nilai semua input teks di dalam modal saat tombol reset ditekan
        $(this).closest('.modal-body').find('input[type="text"]').val('');
    });

    // Fungsi untuk validasi input angka
    function isValidNumber(value) {
        // Mengecek apakah nilai bukan NaN (Not a Number) dan tidak kosong
        return !isNaN(value) && value !== '';
    }

    // Fungsi untuk memformat angka menjadi format Rupiah
    function formatRupiah(number) {
        // Menggunakan fungsi toLocaleString untuk format sesuai dengan IDR (Rupiah)
        return number.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    }

    // Fungsi untuk memindahkan fokus ke input berikutnya
    function moveToNextInput(currentInput) {
        // Mencari elemen input berikutnya dalam urutan
        var nextInput = currentInput.next('input');
        if (nextInput.length) {
            // Jika elemen input berikutnya ditemukan, pindahkan fokus ke sana
            nextInput.focus();
        }
    }

    // Event listener untuk tombol "Hitung Gaji"
    $("#btnHitungGaji").click(function() {
        // Mendapatkan nilai dari input gaji pokok, tunjangan, dan bonus
        var gajiPokok = $("#gajiPokok").val();
        var tunjangan = $("#tunjangan").val();
        var bonus = $("#bonus").val();

        // Validasi: memastikan semua input adalah angka valid
        if (!isValidNumber(gajiPokok) || !isValidNumber(tunjangan) || !isValidNumber(bonus)) {
            // Menampilkan alert menggunakan SweetAlert jika input tidak valid
            Swal.fire('Harap masukkan nilai yang valid (hanya angka)!');
        } else {
            // Mengonversi nilai input menjadi angka
            gajiPokok = parseFloat(gajiPokok);
            tunjangan = parseFloat(tunjangan);
            bonus = parseFloat(bonus);
            
            // Menghitung total gaji
            var totalGaji = gajiPokok + tunjangan + bonus;

            // Menghitung pajak sebesar 10% dari total gaji
            var pajak = totalGaji * 0.10;
            var gajiSetelahPajak = totalGaji - pajak;

            // Memformat nilai gaji dan pajak dalam format Rupiah
            var totalGajiFormatted = formatRupiah(totalGaji);
            var pajakFormatted = formatRupiah(pajak);
            var gajiSetelahPajakFormatted = formatRupiah(gajiSetelahPajak);

            // Menampilkan hasil perhitungan dalam bentuk SweetAlert
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

    // Event listener untuk tombol "Hitung Grade"
    $("#btnHitungGrade").click(function() {
        // Mendapatkan nilai dari input nilai
        var nilai = $("#nilai").val();

        // Validasi: memastikan input adalah angka valid
        if (!isValidNumber(nilai)) {
            // Menampilkan alert menggunakan SweetAlert jika input tidak valid
            Swal.fire('Harap masukkan nilai yang valid (hanya angka)!');
        } else {
            // Mengonversi nilai input menjadi angka
            nilai = parseFloat(nilai);
            var grade = '';

            // Menentukan grade berdasarkan nilai
            if (nilai >= 85) grade = 'A'; // Grade A untuk nilai >= 85
            else if (nilai >= 70) grade = 'B'; // Grade B untuk nilai >= 70
            else if (nilai >= 50) grade = 'C'; // Grade C untuk nilai >= 50
            else grade = 'D'; // Grade D untuk nilai di bawah 50

            // Menampilkan hasil grade dalam bentuk SweetAlert
            Swal.fire({
                title: 'Grade Nilai',
                html: `<p>Nilai: ${nilai}</p><p>Grade: ${grade}</p>`,
                icon: 'success'
            });
        }
    });

    // Event listener untuk tombol "Hitung Rata-rata"
    $("#btnHitungRata").click(function() {
        // Mendapatkan nilai dari 5 input nilai
        var nilai1 = $("#nilai1").val();
        var nilai2 = $("#nilai2").val();
        var nilai3 = $("#nilai3").val();
        var nilai4 = $("#nilai4").val();
        var nilai5 = $("#nilai5").val();

        // Validasi: memastikan semua input adalah angka valid
        if (!isValidNumber(nilai1) || !isValidNumber(nilai2) || !isValidNumber(nilai3) || 
            !isValidNumber(nilai4) || !isValidNumber(nilai5)) {
            // Menampilkan alert menggunakan SweetAlert jika input tidak valid
            Swal.fire('Harap masukkan nilai yang valid (hanya angka)!');
        } else {
            // Mengonversi nilai input menjadi angka
            nilai1 = parseFloat(nilai1);
            nilai2 = parseFloat(nilai2);
            nilai3 = parseFloat(nilai3);
            nilai4 = parseFloat(nilai4);
            nilai5 = parseFloat(nilai5);

            // Menghitung total nilai dan rata-rata
            var totalNilai = nilai1 + nilai2 + nilai3 + nilai4 + nilai5;
            var rataRata = totalNilai / 5;

            // Menampilkan hasil rata-rata dalam bentuk SweetAlert
            Swal.fire({
                title: 'Rata-rata Nilai',
                html: `<p>Total Nilai: ${totalNilai}</p><p>Rata-rata Nilai: ${rataRata}</p>`,
                icon: 'success'
            });
        }
    });

    // Event handler untuk memindahkan fokus ke input berikutnya saat Enter ditekan
    $('input').on('keypress', function(e) {
        if (e.which == 13) { // Cek apakah tombol Enter ditekan
            moveToNextInput($(this)); // Pindahkan fokus ke input berikutnya
        }
    });

    // Event untuk menghitung otomatis jika semua input pada Studi Kasus 1 sudah terisi dan Enter ditekan
    $('#gajiPokok, #tunjangan, #bonus').on('keypress', function(e) {
        if (e.which == 13) {
            if ($('#gajiPokok').val() && $('#tunjangan').val() && $('#bonus').val()) {
                $("#btnHitungGaji").click(); // Klik tombol Hitung Gaji
            }
        }
    });

    // Event untuk menghitung grade otomatis jika Enter ditekan
    $('#nilai').on('keypress', function(e) {
        if (e.which == 13) {
            if ($('#nilai').val()) {
                $("#btnHitungGrade").click(); // Klik tombol Hitung Grade
            }
        }
    });

    // Event untuk menghitung rata-rata otomatis jika semua input sudah terisi dan Enter ditekan
    $('#nilai1, #nilai2, #nilai3, #nilai4, #nilai5').on('keypress', function(e) {
        if (e.which == 13) {
            if ($('#nilai1').val() && $('#nilai2').val() && $('#nilai3').val() && $('#nilai4').val() && $('#nilai5').val()) {
                $("#btnHitungRata").click(); // Klik tombol Hitung Rata-rata
            }
        }
    });

    // Event tambahan untuk fokus ke input berikutnya saat Enter ditekan di Studi Kasus 1
    $('#gajiPokok, #tunjangan, #bonus').on('keypress', function(e) {
        if (e.which == 13) {
            moveToNextInput($(this)); // Pindahkan fokus ke input berikutnya
        }
    });
});
