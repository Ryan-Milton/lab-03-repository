'use strict';

function Horn(hornObject) {
  this.image_url = hornObject.image_url;
  this.title = hornObject.title;
  this.description = hornObject.description;
  this.keyword = hornObject.keyword;
  this.horns = hornObject.horns;
}

Horn.allHorns = [];

Horn.prototype.render = function() {
  const $source = $('#photo-template').html();
  console.log($source);
  const compiledSource = Handlebars.compile($source);

  return compiledSource(this);
}

Horn.readJson = () => {
  $.get('/data/page-1.json', 'json')
    .then(data => {
      data.forEach(horn => {
        Horn.allHorns.push(new Horn(horn));
      })
    })
    .then(Horn.loadHorns)
    .then(Horn.createFilter)
    .then(createDropdown)
}

Horn.loadHorns = () => {
  Horn.allHorns.forEach(horn => $('#photos').append(horn.render()));
}

$(() => Horn.readJson());

//Filter set up - called as a .then up above

let hornedAnimals = [];

Horn.createFilter = () => {
  Horn.allHorns.forEach(horn => {
    if(hornedAnimals.indexOf(horn.keyword) === -1) {
      hornedAnimals.push(horn.keyword);
    }
  })
}

let createDropdown = function() {

  for (let i = 0; i < hornedAnimals.length; i++){
    let dropdownOption = document.createElement('option');
    let dropdownContainer = document.getElementById('dropDown');
    dropdownOption.textContent = hornedAnimals[i];
    dropdownContainer.appendChild(dropdownOption);
  }
};

// Filter event

$('select').change(function(){

  let optionSelected = $('#dropDown').find(':selected').text();

  $('div').hide();
  $('div.' + optionSelected).show();
})

// Sorting

function compare(a,b) {
  const titleA = a.title;
  const titleB = b.title;

  let comparison = 0;
  if (titleA > titleB){
    comparison = 1;
  } else if (titleA < titleB) {
    comparison = -1;
  }
  return comparison;
}

Horn.allHorns.sortBy();
