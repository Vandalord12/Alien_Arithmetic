//Sends a GET request to the server in order to get back the scores for the user
fetch("http://localhost:3000/stats/game-scores")
.then((res) => {
  return res.json();
})
.then((data) => {
  const content = data.message;
  //Displays the data
  makeChart(content.typeBoth, "Both", "Both types");
  makeChart(content.typeMD, "MD", "Multiplication and Division Data");
  makeChart(content.typeAS, "AS", "Addition and Subtraction Data");
});

function makeChart(data, canvas, title) {
//Creates a graph with the given data and title
//in the specified canvas
let xValues = [];
if (data[0] !== 0) {
  //Adds 0 to the front of the data if 0 is not already present
  data.unshift(0);
}
const yValues = data;
for (let i = 0; i < yValues.length; i++) {
  //Makes the xValues list
  xValues.push(i);
}

const chart = new Chart(canvas, {
  //Creates the chart
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        //Styles the chart and inputs the data
        label: title,
        pointRadius: 4,
        pointBackgroundColor: "rgb(255, 165, 0)",
        backgroundColor: "rgb(50 216 223)",
        borderColor: "rgb(50 216 223)",
        data: yValues,
      },
    ],
  },
});
}