import { Controller } from 'stimulus'

export default class extends Controller{
	getCity(event){
  		const country = event.srcElement.innerText
		this.getData(country)
	}

	getData(country){
		var this1 = this
		var url = "http://localhost:3000/cities"
		if(country == "All"){

			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
			  if (this.readyState == 4 && this.status == 200) {
			    var myObj = JSON.parse(this.responseText);
			    this1.updateView(myObj, false)
			  }
			};
			xmlhttp.open("GET", url+".json", true);
			xmlhttp.send();
		}
		else{
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
			  if (this.readyState == 4 && this.status == 200) {
			    var myObj = JSON.parse(this.responseText);
			    this1.updateView(myObj, true)
			  }
			};
			xmlhttp.open("GET", url+"/"+country+".json", true);
			xmlhttp.send();
		}
	}

	updateView(data, flag){
		var targetElement = document.getElementById("city-div")
		var response = ""
		var dropBtn = document.getElementById("dropdown-btn")
		if(flag === true){
			// console.log(data.country, data.cities)
			let country = this.createCountryDiv(data.country)
			let cities = this.createCityList(data.cities)
			response += country+cities
			dropBtn.innerText = data.country
		}
		else{
			for(let i = 0; i < data.cities.length; i++){
				let country = this.createCountryDiv(data.cities[i].country)
				let cities = this.createCityList(data.cities[i].cities)
				response += country+cities
			}
			dropBtn.innerText = "All"
			console.log(data)
		}
		targetElement.innerHTML=response

		// console.log(data, ele)
	}

	createCountryDiv(country){
		var countryDiv = '<div class=\"progress\" style=\"width: 95%; height: 35px; margin-top: 10px; margin-bottom: 10px;\"><div class=\"progress-bar bg-secondary\" role=\"progressbar\" style=\"width: 100%\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"98\"><h5>'+country+'</h5></div></div>'
		return countryDiv
	}

	createCityList(cities){
		// var cities_div = document.createElement('div')
		// cities_div.className = "row row-cols-1 row-cols-sm-2 row-cols-md-3"
 		var cities_div = '<div class=\"row row-cols-1 row-cols-sm-2 row-cols-md-3\">'
		// var div1 = document.createElement('div')
		// div1.className = "col mb-4"

		// var div2 = document.createElement('div')
		// div2.className = "card"
		// var city_div = ""
		for (let i = 0; i < cities.length; i++) {
		  var city = '<div class=\"col mb-4\"><div class=\"card\" style=\"width: 18rem; margin: 5px\"><img class=\"card-img-top\" src=\"'+cities[i][1]+'\" alt= \"No Image\" /><div class=\"card-footer\"><h4 class=\"card-text\">'+cities[i][0]+'</h4></div></div></div>'
		  cities_div += city
		}
		// cities.forEach(element => {

		// 	var city = '<div class=\"col mb-4\"><div class=\"card\" style=\"width: 18rem; margin: 5px\"><img class=\"card-img-top\" src=\"'+element.url+'\" alt= \"No Image\" /><div class=\"card-footer\"><h4 class=\"card-text\">'+element.name+'</h4></div></div></div>'
		// 	cities_div += city
		// });

		cities_div += "</div>"

		return cities_div
	}
}