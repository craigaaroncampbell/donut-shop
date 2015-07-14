
//create object constructor for donut shop
    //properties of stores:
      //hours open - all open same so not in paramters

      //parameters
      //min cust per hour
      //max cust per hour
      //avg donuts per cust
      //location name

var Shop = function (storeLocation, minCustPerHr, maxCustPerHr, avgDonutsPerCust) {
this.hours = 11;
this.storeLocation = storeLocation;
this.minCustPerHr = minCustPerHr;
this.maxCustPerHr = maxCustPerHr;
this.avgDonutsPerCust = avgDonutsPerCust;
};

//method: calculate customers per hour
Shop.prototype.calculateHourlyCustomers = function(){
  this.hourlyCustomers = Math.floor(Math.random() * ( this.maxCustPerHr - this.minCustPerHr + 1 )) + this.minCustPerHr;
  return this.hourlyCustomers;
};

//method: calculate donuts per hour
//multiply hourly customers by avg donuts per customer. round it so that it is a whole number
//push each hour's donuts into an array so it keeps track of the donuts each hour - recalculate 11 times using a loop
Shop.prototype.calculateHourlyDonuts = function(){

  this.hourlyDonuts = [];
  for (var i = 0; i < this.hours; i++){
    this.calculateHourlyCustomers();
    this.donutsThisHour = Math.round(this.hourlyCustomers * this.avgDonutsPerCust);
    this.hourlyDonuts.push(this.donutsThisHour);
  }
  return this.hourlyDonuts;
};

//method : calculate donuts per day - needs number per hour for each hour
  //so.... first calculate donuts per hour ... do this 11 times.. then add up the results to get total
Shop.prototype.calculateDailyDonuts = function(){
  this.calculateHourlyDonuts();
  this.dailyDonuts = 0
    for (var i = 0; i < this.hours; i++){
      this.dailyDonuts += this.hourlyDonuts[i];
    }
    return this.dailyDonuts;
};


//method : do all the following:
    //create new element for table - tr
    // create new element for table - td
    //add store location to table (append child td to tr)
    //add donuts per hour to table (append td to tr) - DO THIS 11 TIMES
    // add donuts per day to table (append td to tr)

Shop.prototype.makeArray = function(){
  this.shopArray = [];

};

Shop.prototype.makeTable = function(){
  this.calculateDailyDonuts();
  //create table row, table header, and td elements to put data in
  var tr = document.createElement('tr');
  var th = document.createElement('th');

  //gets table element  in HTML to attach the new elements to
  var tbl = document.getElementById('table');

  //insert store location into the new row
  th.textContent = this.storeLocation;
  th.setAttribute('class', this.storeLocation);
  tr.appendChild(th);

  // loop to insert hourly donuts into table
  for (var i = 0; i < this.hours; i++){
    var td = document.createElement('td');
    td.textContent = this.hourlyDonuts[i];
    td.setAttribute('class', this.storeLocation);
    tr.appendChild(td);
  }

  //insert daily donuts total into table
  var td = document.createElement('td');
  td.textContent = this.dailyDonuts;
  td.setAttribute('class', this.storeLocation);
  tr.appendChild(td);

  //add the new row to the table
  tbl.appendChild(tr);
};


//create instances of each donut shop
var downtown = new Shop("Downtown", 8, 43, 4.5);

var capitalHill = new Shop("Capital Hill", 4, 37, 2);

var southLakeUnion = new Shop("South Lake Union", 9, 23, 6.33);

var wedgewood = new Shop("Wedgewood", 2, 28, 1,25);

var ballard = new Shop("Ballard", 8, 58, 3.75);


//call method that adds data to table for each store location
ballard.makeTable();
capitalHill.makeTable();
downtown.makeTable();
southLakeUnion.makeTable();
wedgewood.makeTable();

// if the store name matches an existing name, delete the old data and repalce
//it with the new data.
//otherwise, just add the new data
var newStore = function(){
    var newLocation = document.getElementById('newLocation').value;
    var newMin = document.getElementById('newMin').value;
    var newMax = document.getElementById('newMax').value;
    var newAvg = document.getElementById('newAvg').value;
    var newStore = new Shop(newLocation, newMin, newMax, newAvg);
    newStore.makeTable();
};

var newEl = document.getElementById('addStore');
newEl.addEventListener("click", newStore, false);

var locationArray = [];
