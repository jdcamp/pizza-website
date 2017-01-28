var Pizza = function() {
  this.price = 0;
  this.toppings = [];
}

var Order = function() {
  this.numberOfPizzas = [];
  this.totalPrice = 0;
}
Order.prototype.calculateTotalPrice = function() {
  var orderPrice = 0
  for (var i = 0; i < this.numberOfPizzas.length; i++) {
    orderPrice += this.numberOfPizzas[i].price;
  }
  this.totalPrice = orderPrice;
}

Pizza.prototype.appendStringFormat = function(size) {
  var orderStr = "<ul>"
  for (var i = 0; i< this.toppings.length; i++){
    orderStr = orderStr + "<li>" +this.toppings[i] + "</li>"
  }
  if(this.toppings.length === 0) {
    orderStr = "<li>Plain Cheese</li>"
  }
  return '<div class="panel panel-default">' +
          '<div class="panel-heading"><span class="clickable">'+ size + ' Pizza $' + this.price + '</span>' +
          '</div>'+
          '<div class="panel-body">' + orderStr +
          '</ul>' +
          '</div>'+
        '</div>'
      }

Pizza.prototype.addToPrice = function(price) {
  this.price += price;
}


$(document).ready(function() {
  var myOrder = new Order();
  $("#add-pizza").click(function() {
    var currentPizza = new Pizza();
    $('.selected-toppings:checkbox:checked').each(function() {
      var toppingPrice = parseFloat(this.value);
      currentPizza.toppings.push(this.name);
      currentPizza.addToPrice(toppingPrice);
      $(this).prop('checked', false);
    })
    var sizePrice = parseInt(($('#size-select').find(":selected").val()));
    currentPizza.addToPrice(sizePrice);
    var sizeString = $('#size-select').find(":selected").text();
    myOrder.numberOfPizzas.push(currentPizza);
    myOrder.calculateTotalPrice();
    $(".order-stream").append(currentPizza.appendStringFormat(sizeString));
    $(".total-price").text(myOrder.totalPrice);
    $("#order-container").show();

  })
  $("#submit-order").click(function() {
    $("#order-selection").hide();
    $("#order-confirmation").show();
  });
});

$(document).on('click','.panel-heading', function () {
  $(this).next('.panel-body').toggle();
})
