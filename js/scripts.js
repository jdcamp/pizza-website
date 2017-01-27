var Pizza = function() {
  this.price = 2;
  this.toppings = [];
  this.size = "";
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
return '<div class="panel panel-default">' +
          '<div class="panel-heading"><span class="clickable">'+ size + ' Pizza ' + this.price + '</span>' +
          '</div>'+
          '<div class="panel-body">' + orderStr +
          '</ul>' +
          '</div>'+
        '</div>'
      }

Pizza.prototype.addToPrice = function(price) {
  this.price += price;
}

var myOrder = new Order();

$(document).ready(function() {
  $("#add-pizza").click(function() {
    var currentPizza = new Pizza();
    $('.selected-toppings:checkbox:checked').each(function() {
      var toppingPrice = parseFloat(this.value);
      currentPizza.toppings.push(this.name);
      currentPizza.addToPrice(toppingPrice);
    })
    var sizePrice = parseInt(($('#size-select').find(":selected").val()));
    currentPizza.addToPrice(sizePrice);
    var sizeString = $('#size-select').find(":selected").text();
    myOrder.numberOfPizzas.push(currentPizza);
    myOrder.calculateTotalPrice();
    alert(currentPizza.price);
    $(".order-stream").append(currentPizza.appendStringFormat(sizeString));
    alert(myOrder.totalPrice);
  })
})

$(document).on('click','.panel-heading', function () {

  $(this).next('.panel-body').toggle();
})





// var p1 = new Pizza();
// var p2 = new Pizza();
//
// var o2 = new Order();
//
// o2.numberOfPizzas.push(p1);
// o2.numberOfPizzas.push(p2);
//
// alert(o2.calculateTotalPrice());
