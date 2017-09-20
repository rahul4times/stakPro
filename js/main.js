$(document).ready(function(){

  var symbol = document.getElementById('inputBox');
  var searchBtn = document.getElementById('searchBtn');
  var imgDiv = document.getElementById('companyLogo');
  var companyProfileDiv = document.getElementById('company-profile');
  var detailBoxDiv = document.getElementById('details');
  var logoDiv = document.getElementById('companyLogo');
  var currentPriceDiv = document.getElementById('currentPrice');

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

    // API call for logo starts here
    $.get(link + symbol.value + logo, function(data){

      var img = document.createElement('img');
      img.src = data.url;
      imgDiv.appendChild(img);
    }); // API call for logo ends here



    // setInterval function starts here to update current price
    var pricePara = document.createElement('p');
    setInterval(function(){
      // Current Price API call starts here
      $.get(link + symbol.value + price, function(currentPriceValue){

        //pricePara.innerHTML = 0;
        pricePara.innerHTML = '$' + currentPriceValue;
        currentPriceDiv.appendChild(pricePara);
        //console.log(pricePara);
      });

    }, 1000);
    // setInterval function ends here





    // API call for company Info starts here
    var para = document.createElement('p');
    $.get(link + symbol.value + company, function(companyInfo){


      para.innerHTML = 'Symbol: ' + companyInfo.symbol + '<br>' +
      'Company Name: ' + companyInfo.companyName + '<br>' +
      'Exchange: ' + companyInfo.exchange + '<br>' +
      'Industry: ' + companyInfo.industry + '<br>' +
      'Website: ' + companyInfo.website + '<br>' +
      'Description: ' + companyInfo.description + '<br>' +
      'CEO: ' + companyInfo.CEO;
      companyProfileDiv.appendChild(para);
    }); // API call for company info

    // API call for Detail Box starts here
    var detailPara = document.createElement('p');
    $.get(link + symbol.value + quote, function(companyDetails){


      detailPara.innerHTML = 'Symbol: ' + companyDetails.symbol + '<br>' +
        'Primary Exchange: ' + companyDetails.primaryExchange + '<br>' +
        'Calculation Price: ' + companyDetails.calculationPrice + '<br>' +
        'Real Time Price: ' + companyDetails.iexRealtimePrice + '<br>' +
        'Real Time Size: ' + companyDetails.iexRealtimeSize + '<br>' +
        'Last Updated: ' + companyDetails.iexLastUpdated + '<br>' +
        'Delayed Price: ' + companyDetails.delayedPrice + '<br>' +
        'Delayed Price Time : ' + companyDetails.delayedPriceTime + '<br>' +
        'Previous Close: ' + companyDetails.previousClose + '<br>' +
        'Change: ' + companyDetails.change + '<br>' +
        'Change Percent: ' + companyDetails.changePercent + '<br>' +
        'Market Percent: ' + companyDetails.iexMarketPercent + '<br>' +
        'Volume: ' + companyDetails.iexVolume + '<br>' +
        'Average Total Volume: ' + companyDetails.avgTotalVolume + '<br>' +
        'Bid Price: ' + companyDetails.iexBidPrice + '<br>' +
        'Bid Size: ' + companyDetails.iexBidSize + '<br>' +
        'Ask Price: ' + companyDetails.iexAskPrice + '<br>' +
        'Ask Size: ' + companyDetails.iexAskSize + '<br>' +
        'Market Capital: ' + companyDetails.marketCap + '<br>' +
        '52 Week High: ' + companyDetails.week52High + '<br>' +
        '52 Week Low: ' + companyDetails.week52Low;
      detailBoxDiv.appendChild(detailPara);

    }); // API call for Detail Box ends here






  }); // Search Button click event ends here






}); // jQuery ends here
