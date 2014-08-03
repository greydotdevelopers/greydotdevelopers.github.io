//THIS VERSION IS NOT UPDATED WITH THE MOST CURRENT EQUATIONS AND VIVIAN'S NEW INPUT FORMAT
// IT HAS SPECIFIC RETURN PAGES FOR EACH "PAGE"
var inputVars = [[], []];
var allVarsPerm =
    [
        ["a", "Acceleration", "m/s^2"],
        ["d", "Distance", "m"],
        ["F", "Force", "N"],
        ["m", "Mass", "kg"],
        ["xo", "Position Initial", "m"],
        ["x", "Position Final", "m"],
        ["vo", "Velocity Initial", "m/s"],
        ["v", "Velocity Final/Velocity", "m/s"],
        ["t", "Time", "s"],
        ["J", "Impulse", "N*s"],
        ["p", "Momentum", "kg*m/s"],
        ["ac", "Acceleration, Centripital", "m/s^2"],
        ["r", "Radius", "m"],
        ["Fc", "Force, Centripital", "N"],
        ["K", "Energy, Kinetic", "J"],
        ["Ug", "Energy, Gravitational Potential", "J"],
        ["W", "Work", "J"],
        ["theta", "Angle", "deg"],
        ["h", "Height", "m"],
        ["T", "Period", "s"],
        ["k", "Spring Constant", ""],
        ["l", "Length", "m"],
        ["f", "Frequency", "Hz"],
        ["m1", "Mass 1", "kg"],
        ["m2", "Mass 2", "kg"],
        ["Fg", "Force, Gravitational", "N"],
        ["P", "Power", "W"],
        ["Fs", "Force, Spring", "N"],
        ["Us", "Energy, Spring Potential", "J"]
    ];
var allVars = allVarsPerm.slice(0);
//sort options in alphabetical order
allVars.sort(function(a, b) { return (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0)); });

/************************************************************************
 * To add another equation:                                         	*
 * 1. Define all the variables required (array) below as _____Vars  	*
 * 2. Add the array to equationVars                                 	*
 * 3. Add the method to solveEquation. Make sure the indexes match. 	*
 * 4. Write a function to solve the equation.							*
 * 5. Add all the required variables to the drop-down menu array above	*
 * @type {string[]}                                                 	*
 ************************************************************************/
//list of required variables in each equation
var kinematics1Vars0 = ["v", "vo", "a", "t"];
var kinematics2Vars1 = ["x", "xo", "vo", "t", "a"];
var kinematics3Vars2 = ["v", "vo", "a", "x", "xo"];
var kinematics4Vars3 = ["v", "vo", "a", "d"];
var Newton2LawVars4 = ["F", "m", "a"];
var momentum1Vars5 = ["p", "m", "v"];
var momentum2Vars6 = ["J", "F", "t"];
var cenAccelVars7 = ["ac", "v", "r"];
var Newton2Law2Vars8 = ["F", "m", "ac"];
var kinetic1Vars9 = ["K", "m", "v"];
var gravPotentialVars10 = ["Ug", "m", "h"];
var work1Vars11 = ["W", "F", "d", "theta"];
var work2Vars12 = ["W", "F", "d"];
var power1Vars13 = ["P", "W", "t"];
var power2Vars14 = ["P", "F", "v", "theta"];
var spring1Vars15 = ["Fs", "k", "d"];
var spring2Vars16 = ["Us", "k", "d"];
var period1Vars17 = ["T", "m", "k"];
var period2Vars18 =  ["T", "l"];
var period3Vars19 = ["T", "f"];
var gravity1Vars20 = ["Fg", "m1", "m2", "r"];
var gravity2Vars21 = ["Ug", "m1", "m2", "r"];

//status = 1: 1 unknown variable; status = 2: 2 unknowns, etc...
var equationStatus = [];

//used to keep track of which equation is used, used in publish()
var equationUsed = [];

//2D array with all the equations' required variables; index number matches that of equation.
var equationVars = [kinematics1Vars0, kinematics2Vars1, kinematics3Vars2, kinematics4Vars3, Newton2LawVars4,
    momentum1Vars5, momentum2Vars6, cenAccelVars7, Newton2Law2Vars8, kinetic1Vars9, gravPotentialVars10,
    work1Vars11, work2Vars12, power1Vars13, power2Vars14, spring1Vars15, spring2Vars16,
    period1Vars17, period2Vars18, period3Vars19, gravity1Vars20, gravity2Vars21];
for(var i = 0; i < equationVars.length; i++){
    equationStatus.push(0); //placeholder
}

//called by Submit button
function onSubmit(pageName){
	organizeData();
    var ans = solve();
	//alert(inputVars[0]);
	if(ans != null){ //if solveable
		ans = roundDecimal(ans, 3);
		//alert(inputVars[0][0] + " = " + ans);
		publish(ans, pageName);
		//go to results page
		location.href = '#r-NewtonianMechanics';
	} else { //if not solveable
		inputVars[0].splice(0, 1);
		inputVars[1].splice(0, 1);
		round = -1;
	}
	//alert(inputVars[0]);
}

var round = -1;

function solve(){
    round++;
    //alert(round);
    if(round < 5){
        changeStatus();
        var ans;
        for(var i = 0; i < equationStatus.length; i++){
            if(equationStatus[i] == 1){
                if(checkList(equationVars[i], inputVars[0][0]) == true){
                    ans = solveEquation(i, inputVars[0][0]);
                    return ans;
                }
            }
        }

        for(var k = 0; k < equationStatus.length; k++){
            if(equationStatus[k] == 2) {
                if (checkList(equationVars[k], inputVars[0][0]) == false) {
                    //Only if the equation doesn't contain what we're trying to solve for, not poss. otherwise.
                    var solveFor = findMissing(equationVars[k]);
                    var temp = solveEquation(k, solveFor);
                    //let the user know which value was found
                    //alert(solveFor + " = " + temp);
                    //add the newly solved for variable and its value to inputVars
                    inputVars[0].push(solveFor);
                    inputVars[1].push(temp);
                }
            }
        }
        //alert(inputVars[0]);
        //alert(inputVars[1]);
        changeStatus();
        ans = solve();
        return(ans);
    } else {
        alert("Not enough information or unsupported case. Please try again.");
		return(null);
    }
}

//change the status of the equation (1 = 1 unknown, 2 = 2 unknown, etc)
function changeStatus(){
    for(var i = 0; i < equationStatus.length; i++){
        var missing = 0;
        for(var j = 0; j < equationVars[i].length; j++){
            //check if each variable required in the equation is entered
            if(checkList(inputVars[0],equationVars[i][j]) == false) {
                //If the variable was not entered, add to missing
                missing += 1;
            }
        }
        equationStatus[i] = missing + 1;
    }
}

//checks to see if an item exists in the given array
function checkList(array, item){
    for(var i = 0; i < array.length; i++){
        if(array[i] == item){
            return true; //item exists in list
        }
    }
    return false; //item does not exist in list
}

//Finds the variable in the equation that is not inputed by the user.
function findMissing(varList){
    for(var i = 0; i < varList.length; i++){
        if(checkList(inputVars[0], varList[i]) == false){  //If item does not exist in list
            //alert(varList[i]);
            return varList[i];
        }
    }
}

//Solves an equation given the equation index number and the variable to solve for.
function solveEquation(equationNum, solveFor){
    var ans;
    switch (equationNum){
        case 0:
            ans = equationsLibrary.kinematics1(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("v = vo + at");
            break;
        case 1:
            ans = equationsLibrary.kinematics2(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("x = xo + vot + 1/2at^2");
            break;
        case 2:
            ans = equationsLibrary.kinematics3(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("v^2 = vo^2 + 2a(x-xo)");
            break;
        case 3:
            ans = equationsLibrary.kinematics4(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("v^2 = vo^2 + 2ad");
            break;
        case 4:
            ans = equationsLibrary.Newton2Law(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("F = ma");
            break;
        case 5:
            ans = equationsLibrary.momentum1(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("p = mv");
            break;
        case 6:
            ans = equationsLibrary.momentum2(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("J = Ft");
            break;
        case 7:
            ans = equationsLibrary.cenAccel(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("ac = v^2/r");
            break;
        case 8:
            ans = equationsLibrary.Newton2Law2(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("Fc = m(ac)");
            break;
        case 9:
            ans = equationsLibrary.kinetic1(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("K = 1/2 mv^2");
            break;
        case 10:
            ans = equationsLibrary.gravPotential(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("Ug = mgh");
            break;
        case 11:
            ans = equationsLibrary.work1(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("W = Fd cos(theta)");
            break;
        case 12:
            ans = equationsLibrary.work2(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("W = Fd");
            break;
        case 13:
            ans = equationsLibrary.power1(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("P = W/t");
            break;
        case 14:
            ans = equationsLibrary.power2(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("P = Fv cos(theta)");
            break;
        case 15:
            ans = equationsLibrary.spring1(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("Fs = -kd");
            break;
        case 16:
            ans = equationsLibrary.spring2(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("Us = 1/2kd^2");
            break;
        case 17:
            ans = equationsLibrary.period1(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("T = 2 * PI * sqrt(m/k)");
            break;
        case 18:
            ans = equationsLibrary.period2(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("T = 2 * PI * sqrt(l/g)");
            break;
        case 19:
            ans = equationsLibrary.period3(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("T = 1/f");
            break;
        case 20:
            ans = equationsLibrary.gravity1(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("Fg = (-Gm1m2)/r^2");
            break;
        case 21:
            ans = equationsLibrary.gravity2(inputVars[0], inputVars[1], solveFor);
            equationUsed.push("Ug = (-Gm1m2)/r");
            break;
    }
	equationUsed.push(solveFor + " = " + roundDecimal(ans, 3) + " " + getUnits(solveFor));
    return ans;
}

//finds the variable in an array, returns the index number
function findVariable(array, variable){
    for(var i = 0; i < array.length; i++){
        if(array[i] == variable){
            return i;
        }
    }
//	return false;
}

//rounds a number to a specified number of places
function roundDecimal(num, places){
    return Math.round(num*Math.pow(10, places))/(Math.pow(10, places));
}


/************************************************************************************************************
 * Front End Code
 ************************************************************************************************************/

//used to keep track of number of given values inputted
var counter = 0;

//called by body
function addOptions(){
    refreshOptions('findThis');
    refreshOptions('givenThis');
    $('#doc_title').val("");
	$('#findThis').selectmenu('refresh');
	$('#givenThis').selectmenu('refresh');
}

//add drop down options to select forms, given the id
function refreshOptions(idName){
    //alert(idName);
    var mySelect = document.getElementById(idName);
    mySelect.options.length = 1;
	//mySelect.options[0] = new Option("test", "test", true, false);
    for(var i = 0; i < allVars.length; i++){
		//display will look like this: name - abbreviation (units)
		var display = allVars[i][1] + " - " + allVars[i][0] + " (" + allVars[i][2] + ")"; 
        mySelect.options[i+1] = new Option(display, allVars[i][0], false, false);
    }
    //var temp = "#" + idName;
	//alert("5");
    //$(temp).selectmenu('refresh');
    //alert("refreshed");
}

//returns the units given the abbreviation
function getUnits(val){
	return allVarsPerm[findVariable2D(allVarsPerm, val)][2];
}


//used for checking that a value has not been entered previously or selected to be found
function checkDuplicates()
{
    if ($('#givenThis').val() == $('#findThis').val()){
        return true;
    }
    for (var i = 0; i < inputVars[0].length; i++) {
        if (inputVars[0][i] == $('#givenThis').val()) {
            return true;
        }
    }
    return false;
}

//called by onclick of add value button
//adds a button for each input
function addInput(divName) {
    var selected = $('#givenThis').val();
    var inputVal = $('#inputText').val();
    if (selected == "default"){
        alert("Pick a variable");
    } else if (counter > 10) {
        alert("Maximum number of given values has been reached");
    } else if (checkDuplicates() == true){
        alert("value already entered or requested for");
    } else if(inputVal == ""){
        alert("Enter a value")
    } else {
        var newdiv = document.createElement('div');
        newdiv.innerHTML = ("<input type='button' " +
            "style='background-color: #F5A9A9'; " +
            "onClick='deleteValue(this.id)' " +
            "id='" + (counter) + "'" +
            "name='" + (selected) + "'" +
            "value='" + selected + " = " + inputVal + "'>");
        document.getElementById(divName).appendChild(newdiv);
        inputVars[0].push(selected); //push in variables
        inputVars[1].push(inputVal); //push in values
        counter +=1;
        //delete option from drop down
        for(var i = 0; i < allVars.length; i++){
            if(allVars[i][0] == selected){
                allVars.splice(i, 1);
            }
        }
        refreshOptions('givenThis');
		$('#givenThis').selectmenu('refresh');
        $('#inputText').val("");
    }
}

//called by onclick of the value button
function deleteValue(idName){
    //remove the variable and value from the input array
    var i = parseInt(idName);
    //inputVars[0].splice(i, 1);
    //inputVars[1].splice(i, 1);
    delete inputVars[0][i];
    delete inputVars[1][i];
    counter--;
    //add option back into drop down menu
    for(var j = 0; j < allVarsPerm.length; j++){
        //alert(allVarsPerm[j][0]);
        if(allVarsPerm[j][0] == document.getElementById(idName).name){
            allVars.push(allVarsPerm[j]);
            allVars.sort(function(a, b) { return (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0)); });
        }
    }
    refreshOptions('givenThis');
	$('#givenThis').selectmenu('refresh');
    //remove the button
    var temp = "#" + idName;
    $(temp).remove();
}

//called by onSubmit()
// pushes the variable to be found into inputVariable[0] and an empty string into inputVariable[1]
//pushes the text field values into inputVars[1]
function organizeData() {

    inputVars[0].unshift($('#findThis').val()); //tested successful
    //alert(("You have selected to find  ") + (inputVars[0][0]));
    inputVars[1].unshift("");

    //removes empty (removed) variables/values from inputVars
    for(var i = 0; i < inputVars[0].length; i++){
        if(inputVars[0][i] == undefined){
            inputVars[0].splice(i, 1);
            inputVars[1].splice(i, 1);
            i--;
        }
    }
}

//called by publish, to replace hard-code. 
//Finds a variable in a 2D array. Only returns i in array[i][0];
function findVariable2D(twoDArray, variable){
	for(var i = 0; i < twoDArray.length; i++){
		if(twoDArray[i][0] == variable){
			return i;
		}
    }
}

//called by onSubmit, publishes inputed values and results to the "return" page
function publish(x, p){

    //used to designate which variable is solved for in a nice string format
	var i = findVariable2D(allVarsPerm, inputVars[0][0]);
	var whatIsFound = allVarsPerm[i][1];

    // publishing starts here

    var find = document.createElement('div');
    var f = document.createTextNode("You selected to find " + whatIsFound);
    find.appendChild(f);
    document.getElementById('input-' + (p) + '').appendChild(find);

    var valuesLabel = document.createElement('div');
    var vl = document.createTextNode("You entered the following values:");
    valuesLabel.appendChild(vl);
    document.getElementById('input-' + (p) + '').appendChild(valuesLabel);

    //adds in the entered variables/values
    //for (c = 1; c < inputVars[0].length; c++) {
    for (c = 1; c < (counter+1); c++) {
        var input = document.createElement('div');
        var i = document.createTextNode(inputVars[0][c]+ " = " + inputVars[1][c]);
        input.appendChild(i);
        document.getElementById('input-' + (p) + '').appendChild(input);
    }

    var equationLabel = document.createElement('div');
    var e = document.createTextNode("Equations used:");
    equationLabel.appendChild(e);
    document.getElementById('equations-'+ (p) + '').appendChild(equationLabel);

    for (j = 0; j < equationUsed.length; j++) {
        var equation = document.createElement('div');
        var e = document.createTextNode(equationUsed[j]);
        equation.appendChild(e);
        document.getElementById('equations-'+ (p) + '').appendChild(equation);
    }

    var answerLabel = document.createElement('div');
    var aL = document.createTextNode("Answer:");
    answerLabel.appendChild(aL);
    document.getElementById('answer-'+ (p) + '').appendChild(answerLabel);

    var answerResult = document.createElement('div');
    var a = document.createTextNode(inputVars[0][0] + " = " + x + " " + getUnits(inputVars[0][0]));
    answerResult.appendChild(a);
    document.getElementById('answer-'+ (p) + '').appendChild(answerResult);

}