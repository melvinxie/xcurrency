var rates;
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
    if (value) {
      $('#' + key + '_opt').val('on');
    } else {
      $('#' + key + '_opt').val('off');
    }
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
      $('input').each(function() {
        $(this).val(Math.round(base * rates[this.name] * 100) / 100);
      });
    }
    if (localStorage.options) {
      options = JSON.parse(localStorage.options);
    }
  }
  showHome();
  $.getJSON('/rates', function(data) {
    rates = data;
    $('input').each(function() {
      $(this).val(Math.round(base * rates[this.name] * 100) / 100);
    });
    if (supportsHtml5Storage()) {
      localStorage.rates = JSON.stringify(rates);
    }
  });
  showOptions();
  $('#home').live('pageshow', function() {
    showHome();
  });
  $('#options').live('pageshow', function() {
    showOptions();
  });
  $('input').focus(function() {
    $('input').each(function() {
      $(this).val('');
    });
  });
  $('input').keyup(function() {
    var from = this.name;
    var amount = parseFloat(this.value);
    if (isFinite(amount)) {
      base = amount / rates[from];
      localStorage.base = base;
    }
    $('input').each(function() {
      var to = this.name;
      if (from != to) {
        $(this).val(Math.round(base * rates[to] * 100) / 100);
      }
    });
  });
  $('select').change(function() {
    if (this.value == 'on') {
      options[this.name] = true;
    } else {
      options[this.name] = false;
    }
    localStorage.options = JSON.stringify(options);
  });
});
