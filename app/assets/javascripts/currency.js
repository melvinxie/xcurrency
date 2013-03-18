var rates = {};
var base = 1;
var options = {
  'usd': true,
  'aud': false,
  'cad': false,
  'chf': false,
  'cny': false,
  'dkk': false,
  'eur': true,
  'gbp': false,
  'hkd': false,
  'jpy': true,
  'mxn': false,
  'nzd': false,
  'php': false,
  'sek': false,
  'sgd': false,
  'thb': false,
  'zar': false
};
function showHome() {
  $('#currencies li').hide();
  $.each(options, function(key, value) {
    if (value) {
      $('#' + key).show();
    }
  });
}
function showOptions() {
  $.each(options, function(key, value) {
    $('#' + key + '_chk').attr('checked', value).checkboxradio('refresh');
  });
}
function supportsHtml5Storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}
$(function() {
  if (supportsHtml5Storage()) {
    if (localStorage.base) {
      base = parseFloat(localStorage.base);
    }
    if (localStorage.rates) {
      rates = JSON.parse(localStorage.rates);
      $('#currencies input').each(function() {
        $(this).val(Math.round(base * rates[this.name] * 100) / 100);
      });
    }
    if (localStorage.options) {
      options = JSON.parse(localStorage.options);
    }
  }
  showHome();
  $('#home').live('pageshow', function() {
    showHome();
  });
  $('#options').live('pageshow', function() {
    showOptions();
  });
  $('#currencies input').focus(function() {
    $('#currencies input').each(function() {
      $(this).val('');
    });
  });
  $('#currencies input').keyup(function() {
    var from = this.name;
    var amount = parseFloat(this.value);
    if (isFinite(amount)) {
      base = amount / rates[from];
      localStorage.base = base;
    }
    $('#currencies input').each(function() {
      var to = this.name;
      if (from != to) {
        $(this).val(Math.round(base * rates[to] * 100) / 100);
      }
    });
  });
  $('#options input').change(function() {
    options[this.name] = this.checked;
    localStorage.options = JSON.stringify(options);
  });
  var jqxhr = $.ajax({
    url: 'http://query.yahooapis.com/v1/public/yql',
    dataType: 'jsonp',
    data: {
      q: 'select * from yahoo.finance.xchange where pair="USDAUD,USDCAD,USDCHF,USDCNY,USDDKK,USDEUR,USDGBP,USDHKD,USDJPY,USDMXN,USDNZD,USDPHP,USDSEK,USDSGD,USDTHB,USDZAR"',
      format: 'json',
      env: 'store://datatables.org/alltableswithkeys'
    }
  });
  jqxhr.success(function(data) {
    var items = data.query.results.rate;
    rates['usd'] = 1;
    for (var i = 0, l = items.length; i < l; i++){
      item = items[i];
      keyName = item.Name.substr(item.Name.length - 3).toLowerCase();
      rates[keyName] = +item.Rate;
    }
    $('#currencies input').each(function() {
      $(this).val(Math.round(base * rates[this.name] * 100) / 100);
    });
    if (supportsHtml5Storage()) {
      localStorage.rates = JSON.stringify(rates);
    }
  });
  $(window.applicationCache).bind("error", function() {
    alert("There was an error when loading the cache manifest.");
  });
});
