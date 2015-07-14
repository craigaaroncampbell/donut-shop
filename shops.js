function DonutShop(storeId, minCust, maxCust, avgDonutsPerCust){
  this.hours = 11;
  this.donutHourArray = [];

  this.storeId = storeId;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgDonutsPerCust = avgDonutsPerCust;
}


DonutShop.prototype.render = function(){
  this.calculateDonutsToday();
  var row = document.createElement('tr');
  var storeName = document.createElement('th');
  storeName.textContent = this.storeId;
  row.appendChild(storeName);


  for (var i = 0; i < this.hours ; i++){
   var tableData = document.createElement('td');
   tableData.textContent =  this.donutHourArray[i];
   row.appendChild(tableData);
  }

  var totalDonuts = document.createElement("td");
  totalDonuts.textContent = this.donutsToday;
  row.appendChild(totalDonuts);

  return row;
};

var main = document.getElementById("data"); //this is a <tr> tag

DonutShop.prototype.calculateDonutsThisHour = function() {
  for (var i = 0; i < this.hours; i++){
    this.customersThisHour =  Math.round(Math.random() * (this.maxCust - this.minCust) + this.minCust);

    this.donutsThisHour = Math.round(this.customersThisHour * this.avgDonutsPerCust);

    this.donutHourArray.push(this.donutsThisHour);
  }

  //donuts each hour are now stored in an array

};

DonutShop.prototype.calculateDonutsToday = function() {
  //start with 0 donuts and add up all the hourly donut totals
  this.donutsToday = 0;
  this.calculateDonutsThisHour(); //gets donuts this hour function's array

  for (var i = 0; i < this.hours; i++){
  this.donutsToday += this.donutHourArray[i];
  }
  //
};

DonutShop.prototype.changeHours = function(hrs){
  this.hours = hrs;  // change the hours at any given store as needed
};

var downtown = new DonutShop("Downtown", 8, 43, 4.5);

var capitalHill = new DonutShop("Capital Hill", 4, 37, 2);

var southLakeUnion = new DonutShop("South Lake Union", 9, 23, 6.33);

var wedgewood = new DonutShop("Wedgewood", 2, 28, 1,25);

var ballard = new DonutShop("Ballard", 8, 58, 3.75);



main.appendChild(ballard.render());
main.appendChild(downtown.render());
main.appendChild(capitalHill.render());
main.appendChild(southLakeUnion.render());
main.appendChild(wedgewood.render());
main.appendChild(ballard.render());
