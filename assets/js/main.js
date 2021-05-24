document.addEventListener("City Search", function(event) { 
    let buttonsWanted = 10;
    let doc = document;
    let docFrag = document.createDocumentFragment();
  
    for(var x = 0; x < buttonsWanted; x++){
      var button = doc.createElement('button');
      button.setAttribute('text', 'yourtext');
      docFrag.appendChild(button);
    }
  
    doc.getElementById('city-input').appendChild(docFrag);
  });