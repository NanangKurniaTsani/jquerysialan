$(document).ready(() => {
    // Fungsi untuk mereset input dan hasil
    $(".btn-reset").click(function() {
        $(this).closest('.modal-body').find('input[type="text"], input[type="number"]').val('');
        $('#inputsRata').empty();
        $('.result-container').empty();
    });

    // Fungsi untuk memeriksa apakah input adalah angka yang valid
    const isValidNumber = (value) => !isNaN(value) && value !== '';

    // Fungsi untuk memformat angka menjadi format Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    };

    // Fungsi untuk berpindah ke input berikutnya
    const moveToNextInput = (currentInput) => {
        const nextInput = currentInput.parent().next().find('input');
        if (nextInput.length) {
            nextInput.focus();
        } else {
            const firstInput = currentInput.closest('.modal-body').find('input').first();
            firstInput.focus();
        }
    };

    // Fungsi untuk memvalidasi input
    const validateInput = (inputId, errorMessage, maxValue = Infinity) => {
        const value = $(`#${inputId}`).val();
        // Tambahan validasi untuk input kosong
        if (value === '') {
            $(`#${inputId}`).addClass('is-invalid');
            $(`#${inputId}`).next('.invalid-feedback').remove();
            $(`#${inputId}`).after(`<div class="invalid-feedback">Input tidak boleh kosong!</div>`);
            $(`#${inputId}`).focus();
            return false;
        }
        if (!isValidNumber(value) || parseFloat(value) > maxValue) {
            $(`#${inputId}`).addClass('is-invalid');
            $(`#${inputId}`).next('.invalid-feedback').remove();
            $(`#${inputId}`).after(`<div class="invalid-feedback">${errorMessage}</div>`);
            $(`#${inputId}`).focus();
            return false;
        }
        $(`#${inputId}`).removeClass('is-invalid');
        $(`#${inputId}`).next('.invalid-feedback').remove();
        return true;
    };

    // Fungsi untuk menghitung gaji
    const hitungGaji = () => {
        // Langkah 1: Validasi semua input
        if (!validateInput('gajiPokok', 'Harap masukkan Gaji Pokok yang valid!')) return;
        if (!validateInput('tunjangan', 'Harap masukkan Tunjangan yang valid!')) return;
        if (!validateInput('bonus', 'Harap masukkan Bonus yang valid!')) return;
        if (!validateInput('pajak', 'Harap masukkan Pajak yang valid!')) return;

        // Langkah 2: Ambil nilai dari input
        const gajiPokok = parseFloat($("#gajiPokok").val());
        const tunjangan = parseFloat($("#tunjangan").val());
        const bonus = parseFloat($("#bonus").val());
        const pajak = parseFloat($("#pajak").val());

        // Langkah 3: Hitung gaji
        const totalGaji = gajiPokok + tunjangan + bonus;
        const pajakNominal = totalGaji * (pajak / 100);
        const gajiSetelahPajak = totalGaji - pajakNominal;

        // Langkah 4: Format hasil perhitungan
        const totalGajiFormatted = formatRupiah(totalGaji);
        const pajakFormatted = formatRupiah(pajakNominal);
        const gajiSetelahPajakFormatted = formatRupiah(gajiSetelahPajak);

        // Langkah 5: Tampilkan hasil
        $("#hasilGaji").html(`
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Hasil Perhitungan Gaji</h5>
                    <table class="table table-bordered">
                        <tr>
                            <th>Total Gaji</th>
                            <td>${totalGajiFormatted}</td>
                        </tr>
                        <tr>
                            <th>Pajak (${pajak}%)</th>
                            <td>${pajakFormatted}</td>
                        </tr>
                        <tr>
                            <th>Gaji Setelah Pajak</th>
                            <td>${gajiSetelahPajakFormatted}</td>
                        </tr>
                    </table>
                </div>
            </div>
        `);
    };

    // Event listener untuk tombol Hitung Gaji
    $("#btnHitungGaji").click(hitungGaji);

    // Fungsi untuk menghitung grade
    const hitungGrade = () => {
        // Langkah 1: Validasi input nilai (0-100)
        if (!validateInput('nilai', 'Harap masukkan Nilai yang valid (0-100)!', 100)) return;

        // Langkah 2: Ambil nilai dari input
        const nilai = parseFloat($("#nilai").val());
        let grade = '';
        let color = '';

        // Langkah 3: Tentukan grade dan warna
        if (nilai >= 85) { grade = 'A'; color = 'text-success'; }
        else if (nilai >= 70) { grade = 'B'; color = 'text-primary'; }
        else if (nilai >= 50) { grade = 'C'; color = 'text-warning'; }
        else { grade = 'D'; color = 'text-danger'; }

        // Langkah 4: Tampilkan hasil
        $("#hasilGrade").html(`
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Hasil Penentuan Grade</h5>
                    <p class="card-text">Nilai: ${nilai}</p>
                    <p class="card-text">Grade: <span class="fs-1 fw-bold ${color}">${grade}</span></p>
                </div>
            </div>
        `);
    };

    // Event listener untuk tombol Hitung Grade
    $("#btnHitungGrade").click(hitungGrade);

    // Event listener untuk mengubah jumlah input nilai rata-rata
    $("#jumlahNilai").on('change', function() {
        const jumlah = $(this).val();
        let inputsHtml = '';
        // Buat input sesuai jumlah yang diinginkan
        for (let i = 1; i <= jumlah; i++) {
            inputsHtml += `<div class="mb-2">
                <label for="nilai${i}" class="form-label">Nilai ${i}</label>
                <input type="text" id="nilai${i}" class="form-control nilai-input">
            </div>`;
        }
        $("#inputsRata").html(inputsHtml);
        if (jumlah > 0) {
            $("#inputsRata input:first").focus();
        }
    });

    // Fungsi untuk menghitung rata-rata
    const hitungRataRata = () => {
        const inputs = $(".nilai-input");
        let total = 0;
        let count = 0;

        // Langkah 1: Validasi dan hitung total nilai
        for (let i = 0; i < inputs.length; i++) {
            const nilai = $(inputs[i]).val();
            if (!isValidNumber(nilai)) {
                $(inputs[i]).addClass('is-invalid');
                $(inputs[i]).next('.invalid-feedback').remove();
                $(inputs[i]).after(`<div class="invalid-feedback">Harap masukkan nilai yang valid!</div>`);
                $(inputs[i]).focus();
                return;
            }
            $(inputs[i]).removeClass('is-invalid');
            $(inputs[i]).next('.invalid-feedback').remove();
            total += parseFloat(nilai);
            count++;
        }

        // Langkah 2: Periksa apakah ada nilai yang dimasukkan
        if (count === 0) {
            $("#hasilRata").html('<div class="alert alert-danger">Harap masukkan setidaknya satu nilai!</div>');
            return;
        }

        // Langkah 3: Hitung rata-rata
        const rataRata = total / count;

        // Langkah 4: Tampilkan hasil
        $("#hasilRata").html(`
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Hasil Perhitungan Rata-rata</h5>
                    <table class="table table-bordered">
                        <tr>
                            <th>Total Nilai</th>
                            <td>${total}</td>
                        </tr>
                        <tr>
                            <th>Jumlah Nilai</th>
                            <td>${count}</td>
                        </tr>
                        <tr>
                            <th>Rata-rata Nilai</th>
                            <td>${rataRata.toFixed(2)}</td>
                        </tr>
                    </table>
                </div>
            </div>
        `);
    };

    // Event listener untuk tombol Hitung Rata-rata
    $("#btnHitungRata").click(hitungRataRata);

    // Event listener untuk tombol Enter pada input gaji
    $('#gajiPokok, #tunjangan, #bonus').on('keypress', function(e) {
        if (e.which == 13) {
            // Validasi input sebelum pindah ke input berikutnya
            if (validateInput($(this).attr('id'), 'Harap masukkan nilai yang valid!')) {
                moveToNextInput($(this));
            }
        }
    });

    // Event listener untuk tombol Enter pada input pajak
    $('#pajak').on('keypress', function(e) {
        if (e.which == 13) {
            // Validasi input sebelum menghitung gaji
            if (validateInput($(this).attr('id'), 'Harap masukkan nilai yang valid!')) {
                hitungGaji();
            }
        }
    });

    // Event listener untuk tombol Enter pada input nilai (Studi Kasus 2)
    $('#nilai').on('keypress', function(e) {
        if (e.which == 13) {
            // Validasi input sebelum menghitung grade
            if (validateInput($(this).attr('id'), 'Harap masukkan Nilai yang valid (0-100)!', 100)) {
                hitungGrade();
            }
        }
    });

    // Event listener untuk tombol Enter pada input nilai rata-rata
    $(document).on('keypress', '.nilai-input', function(e) {
        if (e.which == 13) {
            // Validasi input sebelum pindah ke input berikutnya atau menghitung rata-rata
            if (validateInput($(this).attr('id'), 'Harap masukkan nilai yang valid!')) {
                const inputs = $(".nilai-input");
                const currentIndex = inputs.index(this);
                if (currentIndex === inputs.length - 1) {
                    hitungRataRata();
                } else {
                    moveToNextInput($(this));
                }
            }
        }
    });
});

