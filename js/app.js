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
  $('main').append('<section class="clone"></section>');

  const $hornClone = $('section[class="clone"]');
  const $hornHtml = $('#photo-template').html();
  $hornClone.html($hornHtml);
  console.log('$hornClone', $hornClone);


  $hornClone.find('h2').text(this.title);
  $hornClone.find('img').attr('src', this.image_url);
  $hornClone.find('p').text(this.description);
  $hornClone.removeClass('clone');
  $hornClone.addClass(this.keyword);
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
  Horn.allHorns.forEach(horn => horn.render());
}

$(() => Horn.readJson());

//Filter set up

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

