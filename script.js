$(document).ready(() => {
    $(".btn-reset").click(function() {
        $(this).closest('.modal-body').find('input[type="text"], input[type="number"]').val('');
        $('#inputsRata').empty();
        $('.result-container').empty();
    });

    const isValidNumber = (value) => !isNaN(value) && value !== '';

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    };

    const moveToNextInput = (currentInput) => {
        const nextInput = currentInput.parent().next().find('input');
        if (nextInput.length) {
            nextInput.focus();
        } else {
            currentInput.closest('.modal-body').find('button').first().focus();
        }
    };

    const validateInput = (inputId, errorMessage) => {
        const value = $(`#${inputId}`).val();
        if (!isValidNumber(value)) {
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

    $("#btnHitungGaji").click(() => {
        if (!validateInput('gajiPokok', 'Harap masukkan Gaji Pokok yang valid!')) return;
        if (!validateInput('tunjangan', 'Harap masukkan Tunjangan yang valid!')) return;
        if (!validateInput('bonus', 'Harap masukkan Bonus yang valid!')) return;
        if (!validateInput('pajak', 'Harap masukkan Pajak yang valid!')) return;

        const gajiPokok = parseFloat($("#gajiPokok").val());
        const tunjangan = parseFloat($("#tunjangan").val());
        const bonus = parseFloat($("#bonus").val());
        const pajak = parseFloat($("#pajak").val());

        const totalGaji = gajiPokok + tunjangan + bonus;
        const pajakNominal = totalGaji * (pajak / 100);
        const gajiSetelahPajak = totalGaji - pajakNominal;

        const totalGajiFormatted = formatRupiah(totalGaji);
        const pajakFormatted = formatRupiah(pajakNominal);
        const gajiSetelahPajakFormatted = formatRupiah(gajiSetelahPajak);

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
    });

    $("#btnHitungGrade").click(() => {
        if (!validateInput('nilai', 'Harap masukkan Nilai yang valid!')) return;

        const nilai = parseFloat($("#nilai").val());
        let grade = '';
        let color = '';

        if (nilai >= 85) { grade = 'A'; color = 'text-success'; }
        else if (nilai >= 70) { grade = 'B'; color = 'text-primary'; }
        else if (nilai >= 50) { grade = 'C'; color = 'text-warning'; }
        else { grade = 'D'; color = 'text-danger'; }

        $("#hasilGrade").html(`
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Hasil Penentuan Grade</h5>
                    <p class="card-text">Nilai: ${nilai}</p>
                    <p class="card-text">Grade: <span class="fs-1 fw-bold ${color}">${grade}</span></p>
                </div>
            </div>
        `);
    });

    $("#jumlahNilai").on('change', function() {
        const jumlah = $(this).val();
        let inputsHtml = '';
        for (let i = 1; i <= jumlah; i++) {
            inputsHtml += `<div class="mb-2">
                <label for="nilai${i}" class="form-label">Nilai ${i}</label>
                <input type="text" id="nilai${i}" class="form-control nilai-input">
            </div>`;
        }
        $("#inputsRata").html(inputsHtml);
    });

    $("#btnHitungRata").click(() => {
        const inputs = $(".nilai-input");
        let total = 0;
        let count = 0;

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

        if (count === 0) {
            $("#hasilRata").html('<div class="alert alert-danger">Harap masukkan setidaknya satu nilai!</div>');
            return;
        }

        const rataRata = total / count;
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
    });

    $('#gajiPokok, #tunjangan, #bonus, #pajak').on('keypress', function(e) {
        if (e.which == 13) {
            moveToNextInput($(this));
        }
    });

    $('#nilai').on('keypress', function(e) {
        if (e.which == 13) {
            if ($('#nilai').val()) {
                $("#btnHitungGrade").click();
            }
        }
    });

    $(document).on('keypress', '.nilai-input', function(e) {
        if (e.which == 13) {
            moveToNextInput($(this));
        }
    });
});

