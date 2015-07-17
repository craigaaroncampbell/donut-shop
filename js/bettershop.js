var Shop = function (storeLocation, minCustPerHr, maxCustPerHr, avgDonutsPerCust) {
this.hours = 11;
this.storeLocation = storeLocation;
this.minCustPerHr = minCustPerHr;
this.maxCustPerHr = maxCustPerHr;
this.avgDonutsPerCust = avgDonutsPerCust;
this.hourlyDonuts = [];
this.dailyDonuts = 0;
};

//method: calculate customers per hour
Shop.prototype.calculateHourlyCustomers = function(){
  var hourlyCustomers = Math.floor(Math.random() * ( this.maxCustPerHr - this.minCustPerHr + 1 )) + this.minCustPerHr;
  return hourlyCustomers;
};

Shop.prototype.calculateHourlyDonuts = function(){
  for (var i = 0; i < this.hours; i++){
    var hourlyCustomers = this.calculateHourlyCustomers();
    var donutsThisHour = Math.round(hourlyCustomers * this.avgDonutsPerCust);
    this.hourlyDonuts.push(donutsThisHour);
    this.dailyDonuts += donutsThisHour;
  }
};

Shop.prototype.makeTable = function(){
  //create table row, table header, and td elements to put data in
  var tr = document.createElement('tr');
  tr.setAttribute("id", this.storeLocation)
  var th = document.createElement('th');

  //gets table element  in HTML to attach the new elements to
  var tbl = document.getElementById('table');

  //insert store location into the new row
  th.textContent = this.storeLocation;
  // th.setAttribute('class', this.storeLocation);
  tr.appendChild(th);

  // loop to insert hourly donuts into table
  for (var i = 0; i < this.hours; i++){
    var td = document.createElement('td');
    td.textContent = this.hourlyDonuts[i];
    // td.setAttribute('class', this.storeLocation);
    tr.appendChild(td);
  }

  //insert daily donuts total into table
  var td = document.createElement('td');
  td.textContent = this.dailyDonuts;
  // td.setAttribute('class', this.storeLocation);
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

//call method that adds data to table for each store location the first time
for (var i = 0; i < locationArray.length; i++){
  locationArray[i].calculateHourlyDonuts();
  locationArray[i].makeTable();
}

// function takes user input and will either create a new table row or update a preexisting one
var newStore = function(){
 var newLocation = document.getElementById('newLocation').value;
  var newMinStr = document.getElementById('newMin').value;
  var newMin = parseInt(newMinStr);
  var newMaxStr = document.getElementById('newMax').value;
  var newMax = parseInt(newMaxStr);
  var newAvgStr = document.getElementById('newAvg').value;
  var newAvg = parseInt(newAvgStr);

  if (newLocation.toUpperCase() === "Run's House".toUpperCase()) {
    var pic = document.getElementById("toppot");
    pic.setAttribute("src", "http://s3.amazonaws.com/rapgenius/revrunfortwitter2.jpg")
  }

  if (newLocation.toUpperCase() === "I want to see a scary headless guy".toUpperCase()) {
    var pic = document.getElementById("toppot");
    pic.setAttribute("src", "brook.png")
    newLocation = "AAAAAAAHHHHHH!";
  }

  if (locationArray.length === 8){
  alert("That's 8 stores... I think you don't need any more!")
};

if (locationArray.length === 9){
  alert("That's 9 stores... STOP MAKING MORE STORES!")
};

if (locationArray.length === 10){
  var celebrate = confirm("That's 10 stores... You have worked hard to open so many stores so quickly. Let's Celebrate!");

  if (!celebrate){
    alert("You're no fun!");
  }else {
    alert("Well I'm too lazy to do anything else to this code, so you're stuck with this lame alert!");
  }
}


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
      locationArray[locationArray.length - 1].calculateHourlyDonuts();
      locationArray[locationArray.length - 1].makeTable();
    }

    if (found === true){

      var foundRow = document.getElementById(locationArray[index].storeLocation);
      var childrenToReplace = foundRow.childNodes;

      locationArray[index] = new Shop(newLocation, newMin, newMax, newAvg);
      locationArray[index].calculateHourlyDonuts();

      for (var i = 1; i < childrenToReplace.length; i++){
      childrenToReplace[i].textContent = locationArray[index].hourlyDonuts[i-1];

     }
     childrenToReplace[childrenToReplace.length - 1].textContent = locationArray[index].dailyDonuts;
    }
};

var newEl = document.getElementById('addStore');
newEl.addEventListener("click", newStore, false);


