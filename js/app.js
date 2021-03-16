'use strict';
let imagesList = ['Alstroemerias','Gardenias','Orchids','Roses','Sunflowers','Tulips','Peonies'];
let selectElement = document.getElementById( 'select' );
let formElement = document.getElementById( 'form' );
let tableElement = document.querySelector( 'table' );
let tableHeader = document.querySelector( 'thead' );
let tableBody = document.querySelector( 'tbody' );
// populate the list
function populateTheList () {
  for( let i= 0; i<imagesList.length; i++ ){
    let selected = document.createElement( 'option' );
    selectElement.appendChild( selected );
    selected.setAttribute( 'id', imagesList[i] );
    selected.setAttribute( 'value', imagesList[i] );
    selected.textContent = imagesList[i];
  }
}
let all = [];
populateTheList();
// lets start with the constructor
const Main = function( name,season, selectedRose ) {
  this.name = name;
  this.image = `./img/${selectedRose.toLowerCase()}.jpeg`;
  this.season = season;
  all.push( this );
  localStorage.setItem( 'a',JSON.stringify( all ) );
};

// lets handle the submit
formElement.addEventListener( 'submit', handleSubmit );
function handleSubmit () {
  event.preventDefault();
  let name = event.target.name.value;
  let season = event.target.season.value;
  let selectedRose = event.target.select.value;
  new Main ( name, season, selectedRose );
  tableBody.innerHTML = '';
  tableHeader.innerHTML = '';
  renderTableHeader();
  renderTableBody();

  event.target.reset();
}

// handle the local storage
function previousLocal () {
  let data = JSON.parse( localStorage.getItem( 'a' ) ) || [];
  if( data.length > 0 ){
    for( let i =0; i<data.length; i++ ){
      all.push( data[i] );
    }
    localStorage.setItem( 'a', JSON.stringify( all ) );
    renderTableHeader();
    renderTableBody();
  }
}

// rendering the table
function renderTableHeader () {
  let firstRow = document.createElement( 'tr' );
  tableHeader.appendChild( firstRow );
  const th1Element = document.createElement( 'th' );
  firstRow.appendChild( th1Element );
  th1Element.textContent = '#';
  const th2Element = document.createElement( 'th' );
  firstRow.appendChild( th2Element );
  th2Element.textContent = 'Image';
  const th3Element = document.createElement( 'th' );
  firstRow.appendChild( th3Element );
  th3Element.textContent = 'Name';
  const th4Element = document.createElement( 'th' );
  firstRow.appendChild( th4Element );
  th4Element.textContent = 'Season';
}
function renderTableBody () {
  for ( let i = 0; i < all.length ; i++ ) {
    let rows = document.createElement( 'tr' );
    tableBody.appendChild( rows );
    const td1Element = document.createElement( 'td' );
    rows.appendChild( td1Element );
    td1Element.setAttribute( 'id', i );
    td1Element.textContent = 'X';
    const td2Element = document.createElement( 'img' );
    rows.appendChild( td2Element );
    td2Element.src = all[i].image;
    const td3Element = document.createElement( 'td' );
    rows.appendChild( td3Element );
    td3Element.textContent = all[i].name;
    const td4Element = document.createElement( 'td' );
    rows.appendChild( td4Element );
    td4Element.textContent = all[i].season;
  }
}

tableElement.addEventListener( 'click', handleClick );
function handleClick () {
  let check = event.target;
  if( check.nodeName === 'TD' && check.id ){
    all.splice( Number( check.id ),1 );
    localStorage.setItem( 'a', JSON.stringify( all ) );
    tableBody.innerHTML = '';
    renderTableBody();
  }
}
previousLocal();
