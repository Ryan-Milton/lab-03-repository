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
    .then(Horn.sortBy)
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

$('#dropDown').change(function(){

  let optionSelected = $('#dropDown').find(':selected').text();

  $('div').hide();
  $('div.' + optionSelected).show();
})

//Radio Button Listener

$('#radio').change(function(){

  let selection = $('#radio').find('input[type="radio"]:checked').val();
  console.log(selection);

  if(selection === 'title'){
    $('div').hide();
    Horn.sortBy();
    Horn.loadHorns();
    console.log('titlesort');
  }else if(selection === 'horns'){
    Horn.sortByHorns = () => {
      Horn.allHorns.sort( (a,b) => {
        let firstHorn1 = a['horns'];
        // console.log(firstHorn1);
        let secondHorn1 = b['horns'];
        // console.log(secondHorn1);
        return (firstHorn1 > secondHorn1) ? 1: (firstHorn1 < secondHorn1) ? -1: 0;
      });
    }
    $('div').hide();
    Horn.sortByHorns();
    Horn.loadHorns();
    console.log(Horn.allHorns);
    console.log('hornSort');
  }
});

// Sorting

Horn.sortBy = () => {
  // array = Horn.allHorns;
  // 'title = Horn.title;
  console.log('sorting')
  Horn.allHorns.sort( (a,b) => {
    let firstHorn = a['title'];
    let secondHorn = b['title'];
    return (firstHorn > secondHorn) ? 1: (firstHorn < secondHorn) ? -1: 0;
  });
}