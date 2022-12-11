# Carbon Emissions Tracker

[Hosted with Netlify](https://emissiontracker.netlify.app/)

## About This Project

This website uses the concepts covered in the [ACM Coding Bootcamp 2022](https://cbc.acmbpdc.org/).

It is a **Carbon Emissions Tracker**, as global warming intensifies and the threat grows larger, this website serves as a great source of awareness, you can use it to keep track of your emissions, use the search bar to find a source of emissions and add it to your record. It may suprise users to know how large the emissions are even for simple tasks.

---

## How was it made?

This is a single html page site, it utilises JavaScript for dynamic functionality.

* The site has been designed with [Bootstrap](https://getbootstrap.com/) and some [Custom CSS](./css/style.css).
* The Search Bar and Calculator makes use of the [Climatiq API](https://www.climatiq.io/)
* Data is stored locally with Javascript's [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
* Graphs are rendered with the help of the js library - [Chart.js](https://www.chartjs.org/)

### Current Features

* Add Emissions by Part or Fully
* View Chartwise breakdown of greenhouse gases where available
* Use filters for advanced search

### Future Features

* More Emission Choices (Needs to be implemented as per API Docs)
* Connect to a Database to have user accounts
* Log each emission type when added