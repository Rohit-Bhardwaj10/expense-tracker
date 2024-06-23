    let xValues1 = ["Italy", "France", "Spain", "USA", "Argentina"];
    let yValues1 = [55, 49, 44, 24, 15];
    let barColors1 = [
      "#b91d47",
      "#00aba9",
      "#2b5797",
      "#e8c3b9",
      "#1e7145"
    ];
    
    new Chart("myChart", {
      type: "pie",
      data: {
        labels: xValues1,
        datasets: [{
          backgroundColor: barColors1,
          data: yValues1
        }]
      },
      options: {
        title: {
          display: true,
          text: "income chart"
        }
      }
    });

        let xValues = ["Italy", "France", "Spain", "USA", "Argentina","india","dxfcgvhb"];
        let yValues = [55, 49, 44, 24, 15,20];
        let barColors = [
          "#b91d47",
          "#00aba9",
          "#2b5797",
          "#e8c3b9",
          "#1e7145"
        ];
        
        new Chart("myChart1", {
          type: "pie",
          data: {
            labels: xValues,
            datasets: [{
              backgroundColor: barColors,
              data: yValues
            }]
          },
          options: {
            title: {
              display: true,
              text: "expense chart"
            }
          }
        });
