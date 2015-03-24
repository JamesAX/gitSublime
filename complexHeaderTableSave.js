//jQuery.sap.declare("huawei.cmes.util.commons.Formatters");
jQuery.sap.declare("huawei.cmes.fragment.quality.Report");
jQuery.sap.require("huawei.cmes.util.services.Provider");
jQuery.sap.require("huawei.cmes.util.services.Proxy");
jQuery.sap.require("huawei.cmes.util.services.Http");

var FORMATTER = huawei.cmes.util.commons.Formatters;
var PROXY = huawei.cmes.util.services.Proxy;
var QUALITY_SERVICE = huawei.cmes.util.services.Provider.QualityService;
var HTTP = huawei.cmes.util.http;

/**
 * Create the overlay to show the report in quality page
 * in the overlay, with a table
 * the table headers are specially customized
 */
sap.ui.jsfragment("huawei.cmes.fragment.quality.Report", {
  createContent: function (oController) {
    var that = this;

    /** @type {string} [Report data url] */
    var reportUrl = PROXY.XsjsProxy(QUALITY_SERVICE.getKPIReport) +
      '?Year=2014';

    /** @type {jQuery.sap.resources} [The i18n document] */
    var sLocale = localStorage.getItem('LANG-KEY') || '';
    var oBundle = jQuery.sap.resources({
      url: "i18n/messageBundle.properties",
      locale: sLocale
    });
    /** @type {jQuery.sap.resources} [Put the i18n into sap namespace] */
    sap.oBundle = oBundle;

    /** @type {Controller} [put this in that] */
    var that = this;

    /**
     * Handle the data returned from the server
     * @param  {Array} oData [Data returned from server]
     * @param  {JSONModel} model [Model to be set data]
     * trigger listeners
     * @return {[type]}       [undefined]
     */
    var reportModelHandler = function (oData, model) {
      var data = that.addSeqNo(oData);

      sap.reportTable = that.getTableString(data);
    };

    /** Start the Ajax data fetching */
    HTTP.ajaxGet(reportUrl, '', reportModelHandler);

    sap.ui.getCore().byId('__xmlview0--report-button').attachPress(function () {
      $('#overlay-container-openNew').remove();
      $('#overlay-container-content').append(
        '<iFrame id="report-iframe"></iFrame>');
      var myIFrame = document.getElementById('report-iframe');
      myIFrame = (myIFrame.contentWindow) ? myIFrame.contentWindow : (
        myIFrame.contentDocument.document) ? myIFrame.contentDocument.document :
        myIFrame.contentDocument;
      myIFrame.document.open();
      myIFrame.document.write(sap.reportTable);

    });

    /** @type {sap.ui.ux3.OverlayContainer} [Create the overlay] */
    var oOverlayContainer = new sap.ui.ux3.OverlayContainer(
      'overlay-container');
    /** Put the table box in the overlay */
    //    oOverlayContainer.addContent(tableBox);

    /** Return the overlay */
    return oOverlayContainer;

  },

  /**
   * Insert NO in to the array
   * @param data {Array}
   * @returns {Array}
   */
  addSeqNo: function (data) {
    var dataWithSeq = data;
    dataWithSeq = dataWithSeq.map(function (oData, index) {
      oData['NO'] = index;
      return oData;
    });

    return dataWithSeq;

  },

  /**
   * [Map 1,2 to 泛网络,终端]
   * @param  {string} dataText [code]
   * @return {string}          [Text]
   */
  productNameFormatter: function (dataText) {
    switch (dataText) {
    case '0':
      return '泛网络';
    case '1':
      return '终端';
    default:
      return '';
    }
  },


  getTableString: function (data) {
    var that = this;
    
    var tableString =
      '<html><head><link rel="stylesheet" type="text/css"' +
      ' href="quality/css/dataTable.css"><link rel="stylesheet" type="text/css" ' +
      'href="quality/css/fixColumn.css"></head><body>' + 
      '<button class="save-report-button" onclick="tableToExcel (\'tableToDL\');">' + 
      'Save Table</button><table id="tableToShow" class=' +
      '"stripe row-border order-column dataTable" cellspacing="0" width="100%">';
    var tableStringToDL = '<div style="display:none"><table id="tableToDL" class="stripe row-border order-column dataTable" cellspacing="0" width="100%">';
    
    var monthHeaders = [];
    for (var month in data[0]) {
      if (month.indexOf('MONTH_') !== -1) {
        monthHeaders.push(month);
      }
    }

    /** HEADER HEADER HEADER HEADER HEADER HEADER HEADER HEADER */
    
    /** BEGIN BEGIN BEGIN BEGIN BEGIN */
    /**	Start Header Building*/
    var HeaderString = '<thead><tr><th rowspan="2">' + sap.oBundle.getText('KPI_TYPE') + '</th>' +
      '<th rowspan="2">' + sap.oBundle.getText('KPI_NAME') + '</th>' +
      '<th rowspan="2">' + sap.oBundle.getText('UNIT') + '</th>' +
      '<th rowspan="2">' + sap.oBundle.getText('NO') + '</th>' +
      '<th colspan="' + monthHeaders.length + '">' + sap.oBundle.getText('MONTHS') + '</th>' +
      '<th colspan="' + 3 + '">' + sap.oBundle.getText('ADD_UP') + '</th>' +
      '<th colspan="' + 3 + '">' + sap.oBundle.getText('TARGET') +
      '</th></tr><tr>';

    //Months headers From 1 to N
    var monthsHeaderString = '';
    monthHeaders.forEach(function (monthHeader) {
    	monthsHeaderString += '<th>' + sap.oBundle.getText(monthHeader) + '</th>';
    });
    HeaderString += monthsHeaderString;
    
    //累计值，目标值 header
    var addUpTargetHeaders = '';
    addUpTargetHeaders += '<th>' + sap.oBundle.getText('ADD_UP_VALUE') + '</th>';
    addUpTargetHeaders += '<th>' + sap.oBundle.getText('ADD_UP_TARGET_STATUS') + '</th>';
    addUpTargetHeaders += '<th>' + sap.oBundle.getText('ADD_UP_FILL_RATIO') + '</th>';
    addUpTargetHeaders += '<th>' + sap.oBundle.getText('BASE_LINE') + '</th>';
    addUpTargetHeaders += '<th>' + sap.oBundle.getText('TARGET_VALUE') + '</th>';
    addUpTargetHeaders += '<th>' + sap.oBundle.getText('CHALLENGE_VALUE') + '</th>';
    
    HeaderString += addUpTargetHeaders;

    HeaderString += '</tr></thead>';
    /** END END END END END END END */
    /** ####### GOT "HeaderString" AS HEADER STRING TO SHOW ON PAGE */
    

    /** BEGIN BEGIN BEGIN BEGIN BEGIN */
    /** Header String For Download */
    //Row 1
    var HeaderStringToDL = '<thead><tr><th>' + sap.oBundle.getText('KPI_TYPE') + '</th>' +
    '<th>' + sap.oBundle.getText('KPI_NAME') + '</th>' +
    '<th>' + sap.oBundle.getText('UNIT') + '</th>' +
    '<th>' + sap.oBundle.getText('NO') + '</th>';
    
    var addMonthHeadersToDLString = function (monthHeader, index) {
    	if(index === 0) {
    		HeaderStringToDL += '<th>' + sap.oBundle.getText('MONTHS') + '</th>';
    	} else {
    		HeaderStringToDL += '<th></th>';
    	}
    };
    
    monthHeaders.forEach(addMonthHeadersToDLString);

    HeaderStringToDL += '<th>' + sap.oBundle.getText('ADD_UP') + '</th>' + '<th></th>' + '<th></th>';
    HeaderStringToDL += '<th>' + sap.oBundle.getText('TARGET') + '</th>' + '<th></th>' + '<th></th>';

    HeaderStringToDL += '</tr><tr>';
    
    //Row 2
    HeaderStringToDL += '<th></th><th></th><th></th><th></th>';
    HeaderStringToDL += monthsHeaderString;
    HeaderStringToDL += addUpTargetHeaders;
    
    HeaderStringToDL += '</tr></thead>';
    
    /** END END END END END END END */
    /** ####### GOT "HeaderString" AS HEADER STRING FOR DOWNLOAD */
    
    tableString += HeaderString;
    tableStringToDL += HeaderStringToDL;
    /** HEADER HEADER HEADER HEADER HEADER HEADER HEADER HEADER */
    
    
    var tbodyString = '<tbody>';
    //body start
    data.forEach(function (eachData) {
      var unit = eachData['UNIT'] === 'PCS' ? sap.oBundle.getText('PCS_Q') : eachData['UNIT'];
      tbodyString += '<tr>';
      tbodyString += '<td>' + that.productNameFormatter(eachData['KPI_TYPE']) + '</td>';
      tbodyString += '<td>' + FORMATTER.kpiNameFormatter(eachData['KPI_NAME']) + '</td>';
      tbodyString += '<td>' + unit + '</td>';
      tbodyString += '<td>' + eachData['NO'] + '</td>';

      monthHeaders.forEach(function (monthHeader) {
        tbodyString += '<td>' + eachData[monthHeader] + '</td>';
      });

      var achievedClass = 'achieved-td';
      if(eachData['ADD_UP_TARGET_STATUS'] === '未达成') {
    	  achievedClass = 'not-achieved-td';
      }
      tbodyString += '<td>' + eachData['ADD_UP_VALUE'] + '</td>';
      tbodyString += '<td class="' + achievedClass + '">' + eachData['ADD_UP_TARGET_STATUS'] + '</td>';
      tbodyString += '<td>' + eachData['ADD_UP_FILL_RATIO'] + '</td>';
      tbodyString += '<td>' + eachData['BASE_LINE'] + '</td>';
      tbodyString += '<td>' + eachData['TARGET_VALUE'] + '</td>';
      tbodyString += '<td>' + eachData['CHALLENGE_VALUE'] + '</td>';
      tbodyString += '</tr>';
    });

    tbodyString += '</tbody>';

    tableString += tbodyString + '</table>';
    tableStringToDL += tbodyString + '</table></div>';

    tableString += tableStringToDL +
      '</body><script type="text/javascript" language="javascript" src="lib/jquery.js"></script>' +
      '<script type="text/javascript" language="javascript" src="lib/dataTable.js"></script>' +
      '<script type="text/javascript" language="javascript" src="lib/fixColumn.js"></script>' +
      '<script type="text/javascript" language="javascript" src="lib/tableToXls.js"></script>';

    tableString +=
      '<script>var table = $("#tableToShow").DataTable({scrollY: "500px",scrollX: true,' +
      'scrollCollapse: true,paging: true});new $.fn.dataTable.FixedColumns' +
      '(table, {leftColumns: 4});</script>';

    tableString += '</html>';
    
//    console.log(tableString);

    return tableString;
  }

});
