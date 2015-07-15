
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


Shop.prototype.makeTable = function(){
  this.calculateDailyDonuts();
  //create table row, table header, and td elements to put data in
  var tr = document.createElement('tr');
  tr.setAttribute("id", this.storeLocation)
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


var locationArray = [];
//create instances of each donut shop
locationArray.push(new Shop("Downtown", 8, 43, 4.5));

locationArray.push(new Shop("Capital Hill", 4, 37, 2));

locationArray.push(new Shop("South Lake Union", 9, 23, 6.33));

locationArray.push(new Shop("Wedgewood", 2, 28, 1,25));

locationArray.push(new Shop("Ballard", 8, 58, 3.75));

//call method that adds data to table for each store location
for (var i = 0; i < locationArray.length; i++){
  locationArray[i].makeTable();
}

var newStore = function(){
    var newLocation = document.getElementById('newLocation').value;
    var newMinStr = document.getElementById('newMin').value;
    var newMin = parseInt(newMinStr);
    var newMaxStr = document.getElementById('newMax').value;
    var newMax = parseInt(newMaxStr);
    var newAvgStr = document.getElementById('newAvg').value;
    var newAvg = parseInt(newAvgStr);

// check if the new location is already in the array.
//If it exists already, console log this fact. Then delete the original table row
//then add a new row with the updated info
    var found = false;
    for(var i = 0; i < locationArray.length; i++){
      // console.log("for loop " + i);

      if(newLocation.toUpperCase() === locationArray[i].storeLocation.toUpperCase()){
        var found = true;
        var index = i;
        break;
      }
    }

    if (found === false){
      locationArray.push(new Shop(newLocation, newMin, newMax, newAvg));
      locationArray[locationArray.length - 1].makeTable();
    }
    if (found === true){
      var foundRow = document.getElementById(locationArray[index].storeLocation);
      var foundRowParent = foundRow.parentNode;
      foundRowParent.removeChild(foundRow);
      locationArray[index] = new Shop(newLocation, newMin, newMax, newAvg);
      locationArray[index].makeTable();
      }
};

var newEl = document.getElementById('addStore');
newEl.addEventListener("click", newStore, false);

