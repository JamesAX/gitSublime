var tableToExcel = (function() {
  if (window.ActiveXObject) {
    return function (table) {
      console.log (table);
      var curTbl = document.getElementById(table);
      var oXL = new ActiveXObject("Excel.Application");
      var oWB = oXL.Workbooks.Add();
      var oSheet = oWB.ActiveSheet;
      var Lenr = curTbl.rows.length;
      for (i = 0; i < Lenr; i++) {
        var Lenc = curTbl.rows(i).cells.length;
        for (j = 0; j < Lenc; j++) {
          oSheet.Cells(i + 1, j + 1).value = curTbl.rows(i).cells(j).innerText;
        }
      }
      oXL.Visible = true;
    }
  }
  
  else {
    var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
    var name = 'name';
    return function(table) {

      if (!table.nodeType) table = document.getElementById(table)
        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
//      window.location.href = uri + base64(format(template, ctx));
        excel = uri + base64(format(template, ctx));
        newWindow=window.open(excel, 'newDocument');
    };
  }
})();