var ctx = document.getElementById("myChart").getContext("2d");
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "pie",

  // The data for our dataset
  data: {
    labels: [
      "Parking",
      "Notice of Renters Violation",
      "Chicken Violation",
      "Domestic Violence",
      "Collusion",
      "Homicide",
      "Robbery"
    ],
    datasets: [
      {
        label: "",
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(196, 219, 185)",
          "rgb(77, 201, 253)",
          "rgb(247, 193, 64)",
          "rgb(138, 238, 102)",
          "rgb(250, 251, 10)",
          "rgb(138, 151, 194)"
        ],
        borderColor: "rgb(255, 255, 255)",
        data: [130, 77.68, 212.12, 81.66, 340.29, 30.75, 65.01]
      }
    ]
  },

  // Configuration options go here
  options: {}
});
