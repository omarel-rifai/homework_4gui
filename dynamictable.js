$(document).ready(function () {
    $('#tableForm').validate({
        rules: {
            minColumn: {
                required: true,
                number: true,
                min: -100,
                max: 100,
            },
            maxColumn: {
                required: true,
                number: true,
                min: -100,
                max: 100,
                greaterThan: '#minColumn',
            },
            minRow: {
                required: true,
                number: true,
                min: -100,
                max: 100,
            },
            maxRow: {
                required: true,
                number: true,
                min: -100,
                max: 100,
                greaterThan: '#minRow',
            },
        },
        messages: {
            minColumn: {
                required: "Please enter a minimum column value.",
                number: "Must be a valid number.",
                min: "Value must be at least -100.",
                max: "Value cannot exceed 100.",
            },
            maxColumn: {
                required: "Please enter a maximum column value.",
                number: "Must be a valid number.",
                min: "Value must be at least -100.",
                max: "Value cannot exceed 100.",
                greaterThan: "Must be greater than the minimum column value.",
            },
            minRow: {
                required: "Please enter a minimum row value.",
                number: "Must be a valid number.",
                min: "Value must be at least -100.",
                max: "Value cannot exceed 100.",
            },
            maxRow: {
                required: "Please enter a maximum row value.",
                number: "Must be a valid number.",
                min: "Value must be at least -100.",
                max: "Value cannot exceed 100.",
                greaterThan: "Must be greater than the minimum row value.",
            },
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        submitHandler: function (form) {
            var minCol = parseInt($('#minColumn').val());
            var maxCol = parseInt($('#maxColumn').val());
            var minRow = parseInt($('#minRow').val());
            var maxRow = parseInt($('#maxRow').val());

            var table = generateTable(minCol, maxCol, minRow, maxRow);
            $('#tableContainer').empty().append(table);
        },
    });

    $.validator.addMethod(
        "greaterThan",
        function (value, element, param) {
            return parseInt(value) > parseInt($(param).val());
        },
        "Must be greater than the corresponding minimum value."
    );
});

function generateTable(minCol, maxCol, minRow, maxRow) {
    var table = document.createElement('table');
    var thead = table.createTHead();
    var headerRow = thead.insertRow();
    var th = document.createElement('th');
    headerRow.appendChild(th);

    for (var col = minCol; col <= maxCol; col++) {
        var th = document.createElement('th');
        th.textContent = col;
        headerRow.appendChild(th);
    }

    for (var row = minRow; row <= maxRow; row++) {
        var tr = table.insertRow();
        var th = document.createElement('th');
        th.textContent = row;
        tr.appendChild(th);

        for (var col = minCol; col <= maxCol; col++) {
            var td = tr.insertCell();
            td.textContent = row * col;
        }
    }

    return table;
}
