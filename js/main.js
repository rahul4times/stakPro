$(document).ready(function(){

  var symbol = document.getElementById('inputBox');
  var searchBtn = document.getElementById('searchBtn');
  var imgDiv = document.getElementById('companyLogo');
  var companyProfileDiv = document.getElementById('company-profile');
  var quoteDetailDiv = document.getElementById('quote-details');
  var logoDiv = document.getElementById('companyLogo');
  var currentPriceDiv = document.getElementById('currentPrice');
  var statsDiv = document.getElementById('stats');


  // API request starts here
  var link = "https://api.iextrading.com/1.0/stock/";
  var logo = '/logo';
  var price = '/price'
  var quote = '/quote';
  var company = '/company';
  var financials = '/financials';
  var earnings = '/earnings';
  var chart = '/chart';
  var keyStats = '/stats';
  var news = '/news';
  var delayedQuote = '/delayed-quote';





  searchBtn.addEventListener('click',function(){

    //onClick scrolling page to result
    window.scrollBy(0, 700);

    // API call for logo starts here
    $.get(link + symbol.value + logo, function(data){
      $(imgDiv).empty();
      var img = document.createElement('img');
      img.src = data.url;
      imgDiv.appendChild(img);
    }); // API call for logo ends here



    // setInterval function starts here to update current price
    var pricePara = document.createElement('p');
    setInterval(function(){
      // Current Price API call starts here
      $.get(link + symbol.value + price, function(currentPriceValue){
        $(currentPriceDiv).empty();
        pricePara.innerHTML = '$' + currentPriceValue;
        currentPriceDiv.appendChild(pricePara);
        //console.log(pricePara);
      });

    }, 1000);
    // setInterval function ends here

    // ----------------------------------------------------------------//

    // Labels for Quote
    var quoteDetailSymbol = ['Symbol:','Primary Exchange:','Calculation Price:','Real Time Price:','Real Time Size:','Last Updated:','Delayed Price:','Delayed Price Time:','Previous Close:','Change:',
      'Change Percent:','Market Percent:','Volume:','Average Total Volume:','Bid Price:','Bid Size:','Ask Price:','Ask Size:','Market Capital:','52 Week High:','52 Week Low:'];

    // Empty array for quote value
    var quoteDetailvalue = [];

    // Creating table
    var quoteDetailTable = document.createElement('table');

    // API call for Detail Box starts here
    var detailPara = document.createElement('p');
    $.get(link + symbol.value + quote, function(quoteInfo){

      $(quoteDetailDiv).empty();

      // Pushing api value in quoteDetailvalue
      for(let key in quoteInfo){
        quoteDetailvalue.push(quoteInfo[key]);
      }

      // Creating table tr and td to display data

      for(let i=0; i<quoteDetailSymbol.length; i++){

        var quoteDetailRow = document.createElement('tr');
        var quoteDetailTdSymbol = document.createElement('td');
        quoteDetailTdSymbol.className = 'symbolColumn';

        var quoteDetailTdValue = document.createElement('td');
        quoteDetailTdValue.className = 'valueColumn';

        quoteDetailTdSymbol.innerHTML = quoteDetailSymbol[i];
        quoteDetailTdValue.innerHTML = quoteDetailvalue[i];
        quoteDetailRow.appendChild(quoteDetailTdSymbol);
        quoteDetailRow.appendChild(quoteDetailTdValue);
        quoteDetailTable.appendChild(quoteDetailRow);
      }

      quoteDetailDiv.appendChild(quoteDetailTable);


    }); // API call for Detail Box ends here

    // ----------------------------------------------------------------//

    // API call for Company starts here
    var companyProfileTable = document.createElement('table');
    // Label for company tab
    var companyProfileLabel = ['Symbol:','Company Name:','Exchange:',
      'Industry:','Website:','Description:','CEO:'];
    // Data from API will go in this empty array
    var companyProfileData = [];


    $.get(link + symbol.value + company, function(companyInfo){

      $(companyProfileDiv).empty();

      // Data from API goes in companyProfileData
      for(let key in companyInfo){
        companyProfileData.push(companyInfo[key]);
      }


        for(let i=0; i<companyProfileLabel.length; i++){

          var companyProfileTableRow = document.createElement('tr');
          var companyProfileTableDataSymbol = document.createElement('td');
          companyProfileTableDataSymbol.className = 'symbolColumn';

          var companyProfileTableDataValue = document.createElement('td');
          companyProfileTableDataValue.className = 'valueColumn';

          companyProfileTableDataSymbol.innerHTML = companyProfileLabel[i];
          companyProfileTableDataValue.innerHTML = companyProfileData[i];
          companyProfileTableRow.appendChild(companyProfileTableDataSymbol);
          companyProfileTableRow.appendChild(companyProfileTableDataValue);
          companyProfileTable.appendChild(companyProfileTableRow);

        }
        companyProfileDiv.appendChild(companyProfileTable);
    }); // API call for Company ends here



    // Key stats api call starts here
    var statsLabel = ['Company Name: ','Market Capital: ','Beta: ','Week 52 High:','Week 52 Low:','Week 52 Change:','Short Interest:','Short Date:','Dividend Rate:','Dividend Yield:','Ex Dividend Date:','Latest EPS:','Latest EPS Date:','Shares Outstanding:','Float:','Return On Equity:','Consensus EPS:','Number Of Estimates:','Symbol:','EBITDA:',
    'Revenue:','Gross Profit:','Cash:','Debt:','Trailing 12 Mon EPS:','Revenue Per Share:','Revenue Per Employee:','PE Ratio High:', 'PE Ratio Low:'];

    // Empty array
    var statsData = [];

    // Creating table for statsInfo
    var statsTable = document.createElement('table');

    $.get(link + symbol.value + keyStats, function(statsInfo){

      // Pushing in statsData from API
      for(let key in statsInfo){
        statsData.push(statsInfo[key]);
      }

      // Displaying data

      for(let i=0; i<statsLabel.length; i++){
        var statsRow = document.createElement('tr');
        var statsTdSymbol = document.createElement('td');
        statsTdSymbol.className = 'symbolColumn';
        var statsTdValue = document.createElement('td');
        statsTdValue.className = 'valueColumn';

        statsTdSymbol.innerHTML = statsLabel[i];
        statsTdValue.innerHTML = statsData[i];
        statsRow.appendChild(statsTdSymbol);
        statsRow.appendChild(statsTdValue);
        statsTable.appendChild(statsRow);
      }
      statsDiv.appendChild(statsTable);


    });






  }); // Search Button click event ends here






}); // jQuery ends here
