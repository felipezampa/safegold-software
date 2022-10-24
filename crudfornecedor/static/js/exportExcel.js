/*
function ExportToExcel(type, fn, dl) {
  var elt = document.getElementById("tbl_exporttable_to_xls");
  var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
  return dl
    ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
    : XLSX.writeFile(wb, fn || "MySheetName." + (type || "xlsx"));
}
*/


$(document).ready(function exportToExcel() {
	$(document).on("click", "#xlsxExport", function () {
		$("#fornecedor-table").table2excel({
			exclude: ".excludeExport",
			filename: "Tabela", // do include extension
			fileext: ".xls",
			preserveColors: false // set to true if you want background colors and font colors preserved
		});
	});
});

/*$(document).ready(function removeAction() {
	$("#xlsxExport").click(function () {
		let tableClone = $('#user-table').clone();
		tableClone
			.find(".excludeExport")
			.each(function () {
				$(this).remove();
			});
		$("body").html(tableClone);
	});
});

$(document).ready(function exportToExcel() {
	$(document).on("click", "#xlsxExport", function () {
		let table = document.getElementsByTagName("table"); // you can use document.getElementById('tableId') as well by providing id to the table tag
		TableToExcel.convert(table[0], { // html code may contain multiple tables so here we are refering to 1st table tag
			name: `Tabela.xlsx`, // Nome do arquivo que vai ser indicado na hora em que baixar
			sheet: {
				name: 'Planilha1' // Nome da planilha
			}
		});
	});
});

$(document).ready(function refreshPage() {
	$(document).on("click", "#xlsxExport", function () {
		setTimeout(location.reload.bind(location), 50);
	});
});
*/
