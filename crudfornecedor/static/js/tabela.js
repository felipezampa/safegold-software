$(document).ready(
    $(".sg-content").slideUp(0.0000001),
    $(".sg-content").slideDown(1000)        
);

$(document).ready(
    function exportPrint() {
        $(document).on("click", "#printExport", function () {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            var min = today.getMinutes();
            var hour = today.getHours();

            today = 'Relatório emitido em:  ' + dd + '/' + mm + '/' + yyyy + ' às: ' + hour + ':' + min;
            // Create an "li" node:
            const node = document.createElement("h5");
            // Create a text node:
            const textnode = document.createTextNode(today);

            // Append the text node to the "li" node:
            node.appendChild(textnode);

            // Append the "li" node to the list:
            document.getElementById("print-info").appendChild(node);
            window.print();
            document.getElementById("print-info").removeChild(node);
        });
    }
);
