// // Who has the highest density?
// function chart4(data) {
//   const ctx4 = document.querySelector('#myChart4');
//   let pokemonHighestDensity;
//   let highestDensity = 0;
//   let statArray = [];
//   let statName = [];

//   for (const object of data) {
//     const density = object.weight / object.height;

//     if (density > highestDensity) {
//       highestDensity = density;
//       pokemonHighestDensity = object;
//     }
//   }
//   //console.log(pokemonHighestDensity.sprites.front_default);
//   document.querySelector('#pokemonImg5').src = pokemonHighestDensity.sprites.front_default;
  
//   for (let i = 0; i < 6; i++){
//     const value = pokemonHighestDensity.stats[i].base_stat;
//     const name = pokemonHighestDensity.stats[i].stat.name;
//     statArray.push(value);
//     statName.push(name);
//   }
  
//   console.log(statArray);

//   new Chart(ctx4, {
//     type: 'radar',
//     data: {
//       labels: statName,
//       datasets: [{
//         label: pokemonHighestDensity.name,
//         data: statArray,
//         fill: true,
//         borderWidth: 1,
//         backgroundColor: 'rgba(255, 205, 86, 0.5)',
//       }],
//     },
//   })
// }


// // Average
// function calculateAverageHPPerCount(hpObject, countsObject) {
//   const averageHPPerCount = [];

//   for (const key in hpObject) {
//     const hp = hpObject[key];
//     const count = countsObject[key];

//     if (count > 0 && hp != 0) {
//       averageHPPerCount[key] = hp / count;
//     }
//   }

//   return averageHPPerCount;
// }

// // chart3: Weight vs base_experience
// function chart3(data) {
//   const ctx3 = document.querySelector('#myChart3');
//   const sumHPPerWeight = [];
//   const weightArray = [];

//   for (const object of data) {
//     const weight = object.weight;
//     const exp = object.base_experience;
    
//     // sum the same weight
//     if (!weightArray[weight]) {
//       weightArray[weight] = 1;
//     } else {
//       weightArray[weight]++;
//     }
    
//     // sume Hp
//     if (!sumHPPerWeight[weight]) {
//       sumHPPerWeight[weight] = 0;
//     }
//     sumHPPerWeight[weight] += exp;
//   }
  
//   const avgResults = calculateAverageHPPerCount(sumHPPerWeight,weightArray);
  
//   new Chart(ctx3, {
//     type: 'line',
//     data: {
//       labels: Object.keys(avgResults),
//       datasets: [{
//         label:'Avarage of Experience',
//         data: Object.values(avgResults),
//         borderWidth: 1,
//         tension: 0.5,
//         fill: true,
//         backgroundColor: '#99E1D9',
//         pointRadius: 0
//       }],
//     },
//   })
// }

// // chart2: Type
// function chart2(data) {
//   const ctx2 = document.querySelector('#myChart2');
//   const typeCounts = {};
  
//   for (const object of data) {
//     const type1 = object.types[0].type.name;
//     const type2 = object.types[1]?.type.name ?? '';

//     if (!typeCounts[type1]) {
//       typeCounts[type1] = 1;
//     } else {
//       typeCounts[type1]++;
//     }

//     if (type2 !== '') {
//       if (!typeCounts[type2]) {
//         typeCounts[type2] = 1;
//       } else {
//         typeCounts[type2]++;
//       }
//     }
//   }
  

//   new Chart(ctx2, {
//     type: 'bar',
//     data: {
//       labels: Object.keys(typeCounts),
//       datasets: [{
//         label:'Counts of Pokemon',
//         data: Object.values(typeCounts),
//         borderWidth: 1,
//         backgroundColor: [
//           'rgba(103, 148, 54, 0.3)', // green
//           'rgba(153, 102, 255, 0.3)', //purple
//           'rgba(255, 159, 64, 0.3)', //orange
//           'rgba(40, 175, 176, 0.3)', // greenblue
//           'rgba(54, 162, 235, 0.3)', // blue
//           'rgba(211, 79, 115, 0.3)', // redpur
//           'rgba(201, 203, 207, 0.3)', //grey
//           'rgba(255, 205, 86, 0.3)', //yellow
//           'rgba(163, 123, 115, 0.3)', //brown
//           'rgba(255, 99, 132, 0.3)' //red
//         ],
//         borderColor: 'grey',
//       }],
//     },
//   })
// }

// // chart1: Height & Weight
// function chart1(data) {
//   const ctx1 = document.querySelector('#myChart1');
  
//   const newArray = data.map((object) => {
//     // Create a new object with the selected properties and renamed keys
//     const newObject = {
//       x: object.height,
//       y: object.weight,
//     };
//     return newObject;
//   });
  

//   new Chart(ctx1, {
//     type: 'scatter',
//     data: {
//       datasets: [{
//         label: 'Height, Weight',
//         data: newArray,
//         borderWidth: 1
//       }],
//     },
//     options: {
//       scales: {
//         x:{
//           beginAtZero: true,
//           title: "Height(dm)"
//         },
//         y: {
//           beginAtZero: true,
//           title: "Weight(Hg)"
//         }
//       }
//     }
//   })
// }

// Randomly Select 5
function randomFive(data){
    for (let i = 0; i < 5; i++){
      let randomID = Math.floor(Math.random() * 1017);
      let pokemonUrl = data[randomID].sprites.front_default;
      
      if (data[randomID].sprites.front_default != null){
        pokemonUrl = data[randomID].sprites.front_default;
      } else{
        randomID = Math.floor(Math.random() * 1017);
        pokemonUrl = data[randomID].sprites.front_default;
      }
      if (Math.random() < 0.1 && data[randomID].sprites.front_shiny != null){
        pokemonUrl = data[randomID].sprites.front_shiny;
      }
      document.querySelector(`#pokemonImg${i}`).src = pokemonUrl;
  }
}

// Fetch Pokemon Data by urlId
async function loadData(url) {
  const results = [];
  for (let i = 1; i < 1018; i++){
    // const results = await fetch(url+i);
    // pokemon.push(await results.json());
    // Promise can sent the request when it ready, and promise all can pack all the single requests
    const result = fetch(url+i).then(res => res.json());
    results.push(result);
  }
  const pokemons = await Promise.all(results);
  return pokemons;
}

async function mainEvent() {
  console.log("chart.js loaded")
  const chartTarget = document.querySelector('#myChart');
  const data = await loadData("https://pokeapi.co/api/v2/pokemon/");
  //console.log(data);
  // // chart1
  // const chart_1 = chart1(data);
  // random
  const img = randomFive(data);
  const button = document.querySelector('#submitPokemon');
  button.addEventListener("click", () => randomFive(data))
  // // chart2
  // const chart_2 = chart2(data);
  // // chart3
  // const chart_3 = chart3(data);
  // // chart4
  // const chart_4 = chart4(data);
}



// This is the first loaded line of your code
// the async keyword means we can make API requests
document.addEventListener("DOMContentLoaded", async () => mainEvent()); 

// Loading
document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        var loaders = document.querySelectorAll(".loader");
        for (var i = 0; i < loaders.length; i++) {
            loaders[i].style.visibility = "visible";
        }
    } else {
        var loaders = document.querySelectorAll(".loader");
        for (var i = 0; i < loaders.length; i++) {
            loaders[i].style.display = "none";
        }
        document.querySelector("body").style.visibility = "visible";
    }
};