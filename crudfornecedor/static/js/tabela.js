$(document).ready(
    $(".sg-content").slideUp(0.0000001),
    $(".sg-content").slideDown(1000)        
);


$(document).ready(
    function exportPrint() {
        $(document).on("click", "#printExport", function () {
            window.print();
        });
    }
);
