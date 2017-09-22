$(document).ready(function() {

  // Eastern Time Clock Starts Here
  function convertToServerTimeZone() {
    //EST
    offset = -4.0
    //offset = -5.0  // Day light saving time
    clientDate = new Date();
    utc = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000);
    serverDate = new Date(utc + (3600000 * offset));
    document.getElementById("easternClock").innerHTML = serverDate.toLocaleString();


    if (clientDate.getHours() > 6 && clientDate.getHours() < 13) {
      document.getElementById('marketStatus').innerHTML = "Market is open";
    } else {
      document.getElementById('marketStatus').innerHTML = "Market is close";
    }


  }

  setInterval(convertToServerTimeZone, 1000);

  // Eastern Time Clock Ends here

  var marketOpen = document.getElementById('easternClock');





  var symbol = document.getElementById('inputBox');
  // onload focus on inputBox
  symbol.focus();

  var searchBtn = document.getElementById('searchBtn');
  var imgDiv = document.getElementById('companyLogo');
  var companyProfileDiv = document.getElementById('company-profile');
  var quoteDetailDiv = document.getElementById('quote-details');
  var logoDiv = document.getElementById('companyLogo');
  var currentPriceDiv = document.getElementById('currentPrice');
  var statsDiv = document.getElementById('stats');
  var newsDiv = document.getElementById('news-details');
  var financialDiv = document.getElementById('financial-details');
  var earningsDiv = document.getElementById('earnings-details');
  var delayedQuoteDiv = document.getElementById('delayedQuote-details');



  // API links starts here
  var link = "https://api.iextrading.com/1.0/stock/";
  var logo = '/logo';
  var price = '/price'
  var quote = '/quote';
  var company = '/company';
  var finance = '/financials';
  var earnings = '/earnings';
  var chart = '/chart';
  var keyStats = '/stats';
  var news = '/news';
  var delayedQuote = '/delayed-quote';


  // Click event on search button
  searchBtn.addEventListener('click', function() {
    //onClick scrolling page to result
    window.scrollBy(0, 900);
    stakProRequest();

  }); // Click event ends here

  // Keypress event on Enter Key starts here
  $(document).keypress(function(e) {
    if (e.which == 13) {
      //onClick scrolling page to result
      window.scrollBy(0, 900);
      stakProRequest();
    }
  }); // Keypress event on Enter Key ends here

  // Function stakProRequest() starts here. This is main function
  function stakProRequest() {

    // API call for logo starts here
    $.get(link + symbol.value + logo, function(data) {
      $(imgDiv).empty();
      var img = document.createElement('img');
      img.src = data.url;
      imgDiv.appendChild(img);
    }); // API call for logo ends here

    // ---------------------------------------------------------------- //

    // setInterval function starts here to update current price
    var pricePara = document.createElement('p');
    setInterval(function() {
      // Current Price API call starts here
      $.get(link + symbol.value + price, function(currentPriceValue) {
        $(currentPriceDiv).empty();
        pricePara.innerHTML = '$' + currentPriceValue;
        //console.log(pricePara);
        currentPriceDiv.appendChild(pricePara);
        //console.log(pricePara);
      });

    }, 2000);
    // setInterval function ends here

    // ----------------------------------------------------------------//

    // Labels for Quote
    var quoteDetailSymbol = ['Symbol:', 'Primary Exchange:', 'Calculation Price:', 'Real Time Price:', 'Real Time Size:', 'Last Updated:', 'Delayed Price:', 'Delayed Price Time:', 'Previous Close:', 'Change:',
      'Change Percent:', 'Market Percent:', 'Volume:', 'Average Total Volume:', 'Bid Price:', 'Bid Size:', 'Ask Price:', 'Ask Size:', 'Market Capital:', '52 Week High:', '52 Week Low:'
    ];

    // Empty array for quote value
    var quoteDetailvalue = [];

    // Creating table
    var quoteDetailTable = document.createElement('table');

    // API call for Detail Box starts here
    var detailPara = document.createElement('p');
    $.get(link + symbol.value + quote, function(quoteInfo) {

      $(quoteDetailDiv).empty();

      // Pushing api value in quoteDetailvalue
      for (let key in quoteInfo) {
        quoteDetailvalue.push(quoteInfo[key]);
      }

      // Creating table tr and td to display data

      for (let i = 0; i < quoteDetailSymbol.length; i++) {

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
    var companyProfileLabel = ['Symbol:', 'Company Name:', 'Exchange:',
      'Industry:', 'Website:', 'Description:', 'CEO:'
    ];
    // Data from API will go in this empty array
    var companyProfileData = [];


    $.get(link + symbol.value + company, function(companyInfo) {

      $(companyProfileDiv).empty();

      // Data from API goes in companyProfileData
      for (let key in companyInfo) {
        companyProfileData.push(companyInfo[key]);
      }


      for (let i = 0; i < companyProfileLabel.length; i++) {

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

    //----------------------------------------------------------------//

    // Key Stats api call starts here

    var statsLabel = ['Company Name: ', 'Market Capital: ', 'Beta: ', 'Week 52 High:', 'Week 52 Low:', 'Week 52 Change:', 'Short Interest:', 'Short Date:', 'Dividend Rate:', 'Dividend Yield:', 'Ex Dividend Date:', 'Latest EPS:', 'Latest EPS Date:', 'Shares Outstanding:', 'Float:', 'Return On Equity:', 'Consensus EPS:', 'Number Of Estimates:', 'Symbol:', 'EBITDA:',
      'Revenue:', 'Gross Profit:', 'Cash:', 'Debt:', 'Trailing 12 Mon EPS:', 'Revenue Per Share:', 'Revenue Per Employee:', 'PE Ratio High:', 'PE Ratio Low:'
    ];

    // Empty array to store data
    var statsData = [];

    // Creating table for statsInfo
    var statsTable = document.createElement('table');

    $.get(link + symbol.value + keyStats, function(statsInfo) {

      $(statsDiv).empty();

      // Pushing in statsData from API
      for (let key in statsInfo) {
        statsData.push(statsInfo[key]);
      }

      // Displaying data

      for (let i = 0; i < statsLabel.length; i++) {
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


    }); // Key Stats api call ends here


    // ----------------------------------------------------------- //

    // API call for News starts here

    // Labels
    var newsLabel = ['Date and Time:', 'Headline:', 'Source:', 'URL:', 'Summary:', 'Related:'];

    // Empty array to store data
    var newsData = [];

    // News API call starts here
    $.get(link + symbol.value + news, function(newsInfo) {

      $(newsDiv).empty();

      // First for loop
      for (let i = 0; i < newsInfo.length; i++) {

        // Creating table
        var newsTable = document.createElement('table');

        // Displaying data
        for (let i = 0; i < newsLabel.length; i++) {


          // Pushing data in newsData
          for (let key in newsInfo[i]) {

            newsData.push(newsInfo[i][key]);
            //console.log(newsInfo[i][key]);
          }

          var newsRow = document.createElement('tr');
          var newsTdLabel = document.createElement('td');
          newsTdLabel.className = 'symbolColumn';

          var newsTdValue = document.createElement('td');
          newsTdValue.className = 'valueColumn';

          newsTdLabel.innerHTML = newsLabel[i];
          newsTdValue.innerHTML = newsData[i];

          newsRow.appendChild(newsTdLabel);
          newsRow.appendChild(newsTdValue);
          newsTable.appendChild(newsRow);
          newsDiv.appendChild(newsTable);

        } // second for loop ends here

        // Creating Horizontal Line
        var newsHorizontaLine = document.createElement('hr');
        newsDiv.appendChild(newsHorizontaLine);

      } // first for loop ends here
    }); // News API call ends here

    // ----------------------------------------------------------------- //

    // Financials Tab starts here

    // Creating lables here
    var financialsLabel = ['Report Date:', 'Gross Profit:', 'Cost of Revenue:', 'Operating Revenue:', 'Total Revenue:', 'Operating Income:', 'Net Income:',
      'Research and Development:', 'Operating Expense:', 'Current Assets:', 'Total Assets:', 'Total Liablities:', 'Current Cash:', 'Current Debt:', 'Total Cash:', 'Total Debt:', 'Shareholder Equity:',
      'Cash Change:', 'Cash Flow:', 'Operating Gains Losses'
    ];

    // creating empty array to store data from api
    var financialsData = [];

    // API call for Financials tab starts here
    $.get(link + symbol.value + finance, function(financialInfo) {

      $(financialDiv).empty();

      // First for loop starts here
      for (let i = 0; i < financialInfo.financials.length; i++) {

        // creating table
        var financialTable = document.createElement('table');

        // Second for loop starts here
        for (let i = 0; i < financialInfo.financials.length; i++) {
          for (let key in financialInfo.financials[i]) {
            financialsData.push(financialInfo.financials[i][key]);
          } // for in loop ends here
        } // Second for loop ends here


        // Third for loop starts here
        for (let i = 0; i < financialsLabel.length; i++) {

          var financialRow = document.createElement('tr');
          var financialTdLabel = document.createElement('td');
          financialTdLabel.className = 'symbolColumn';

          var financialTdValue = document.createElement('td');
          financialTdValue.className = 'valueColumn';

          financialTdLabel.innerHTML = financialsLabel[i];
          financialTdValue.innerHTML = financialsData[i];

          financialRow.appendChild(financialTdLabel);
          financialRow.appendChild(financialTdValue);

          financialTable.appendChild(financialRow);

        } // second for loop ends here

        financialDiv.appendChild(financialTable);
        var financialHorizontaLine = document.createElement('hr');
        financialDiv.appendChild(financialHorizontaLine);

      } // first for loop ends here

    }); // API call for Financials ends here

    // --------------------------------------------------------------- //

    // Earnings Tab starts here
    var earningsLable = ['Actual EPS:', 'Consensus EPS:', 'Estimated EPS:', 'Announce Time:', 'Number Of Estimates:', 'EPS Surprise Dollar:', 'EPS Report Date:', 'Fiscal Period:', 'Fiscal End Date:'];

    // Creating empty array to store data
    var earningsData = [];

    // Earnings api call starts here
    $.get(link + symbol.value + earnings, function(earningsInfo) {

      $(earningsDiv).empty();

      // First for loop starts here
      for (let i = 0; i < earningsInfo.earnings.length; i++) {

        var earningsTable = document.createElement('table');

        // Pushing data in earningsData
        // Second for loop starts here
        for (let i = 0; i < earningsInfo.earnings.length; i++) {
          for (let key in earningsInfo.earnings[i]) {
            earningsData.push(earningsInfo.earnings[i][key]);
          } // for in loop ends here
        } // Second for loop ends here

        // Displaying data
        // Third loop starts here
        for (let i = 0; i < earningsLable.length; i++) {
          var earningsRow = document.createElement('tr');
          var earningsTdLabel = document.createElement('td');
          earningsTdLabel.className = 'symbolColumn';

          var earningsTdValue = document.createElement('td');
          earningsTdValue.className = 'valueColumn';

          earningsTdLabel.innerHTML = earningsLable[i];
          earningsTdValue.innerHTML = earningsData[i];

          earningsRow.appendChild(earningsTdLabel);
          earningsRow.appendChild(earningsTdValue);

          earningsTable.appendChild(earningsRow);

        } // Third loop ends here

        earningsDiv.appendChild(earningsTable);
        var earningsHorizontaLine = document.createElement('hr');
        earningsDiv.appendChild(earningsHorizontaLine);

      } // First for loop ends here

    }); // Earnings API call ends here

    // --------------------------------------------------------------------- //

    // Delayed Quote Starts here

    // Creating labels here
    var delayedQuoteLables = ['Symbol:', 'Delayed Price:', 'Delayed Size:', 'Delayed Price Time:', 'Processed Time:'];

    // Creating empty array to store data from API
    var delayedQuoteData = [];

    $.get(link + symbol.value + delayedQuote, function(delayedQuoteInfo) {

      $(delayedQuoteDiv).empty();

      // Pushing data in delayedQuoteData
      // for in loop starts here
      for (let key in delayedQuoteInfo) {
        delayedQuoteData.push(delayedQuoteInfo[key]);
      } // for in loop ends here

      // Creating table here
      var delayedQuoteTable = document.createElement('table');

      // First for loop starts here
      for (let i = 0; i < delayedQuoteLables.length; i++) {
        var delayedQuoteRow = document.createElement('tr');

        var delayedQuoteTdLabel = document.createElement('td');
        delayedQuoteTdLabel.className = 'symbolColumn';

        var delayedQuoteTdValue = document.createElement('td');
        delayedQuoteTdValue.className = 'valueColumn';

        delayedQuoteTdLabel.innerHTML = delayedQuoteLables[i];
        delayedQuoteTdValue.innerHTML = delayedQuoteData[i];

        delayedQuoteRow.appendChild(delayedQuoteTdLabel);
        delayedQuoteRow.appendChild(delayedQuoteTdValue);

        delayedQuoteTable.appendChild(delayedQuoteRow);

      } // First for loop ends here

      delayedQuoteDiv.appendChild(delayedQuoteTable);

    }); // Delayed Quote API call ends here


    // ------------------- Chart Starts Here ---------------------------  //

    // Storing dates in array
    var dateArray = [
      '2017-08-31', '2017-09-01', '2017-09-05', '2017-09-06', '2017-09-07',
      '2017-09-08', '2017-09-11', '2017-09-12', '2017-09-13', '2017-09-14',
      '2017-09-15', '2017-09-18', '2017-09-19', '2017-09-20'
    ];

    // API call for charts start here
    let timeArray = [];
    $.get(link + symbol.value + chart, function(chartInfo) {

      for (let i = 0; i < chartInfo.length; i++) {

        for (let j = 0; j < dateArray.length; j++) {
          if (chartInfo[i].date === dateArray[j]) {
            timeArray.push(chartInfo[i].open);
          }
        }
      }
    });
    // API call for charts end here

    //console.log(timeArray);

    // Chart starts here

    // Chart ends here




  } // Function stakProRequest() ends here


}); // jQuery ends here
