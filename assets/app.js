var config = {
    apiKey: "AIzaSyB5Vba97uBzvrtcCHq6YaEAqG68BjOqO0Q",
    authDomain: "train-scheduler-e3db7.firebaseapp.com",
    databaseURL: "https://train-scheduler-e3db7.firebaseio.com",
    projectId: "train-scheduler-e3db7",
    storageBucket: "train-scheduler-e3db7.appspot.com",
    messagingSenderId: "150225233914"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#train-submit").on("click", function () {
    var newTrainName = $("#train-name").val().trim();
    var newTrainDest = $("#train-destination").val().trim();
    var newTrainTime = $("#first-train-time").val().trim();
    var newTrainFreq = $("#train-frequency").val().trim();


    var newTrain = {
        name: newTrainName,
        destination: newTrainDest,
        firstTrainTime: newTrainTime,
        frequency: newTrainFreq
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrainTime);
    console.log(newTrain.frequency);

    alert("Train successfully added!");

    $("#train-name").val("");
    $("#train-destination").val("");
    $("#first-train-time").val("");
    $("#train-frequency").val("");

    return false;

})


database.ref().on("child_added", function (childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().firstTrainTime;
    var trainFreq = childSnapshot.val().frequency;

    var timeArrival = trainTime.split(":");
    var tTime = moment().hours(timeArrival[0]).minutes(timeArrival[1]);
    var maxTime = moment.max(moment(), tTime)
    var tMinutes;
    var tArrival;

    if(maxTime === tTime){
        tArrival = tTime.format("hh:mm A");
        tMinutes = tTime.diff(moment(),"minutes");
    }
    else{
        var differentTime = moment().diff(tTime, "minutes");
        var timeRemainder = differentTime % trainFreq;
        tMinutes = trainFreq - timeRemainder;
        tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    }

    console.log("tMinutes: ", tMinutes);
    console.log("tArrival: ", tArrival);

    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

});






