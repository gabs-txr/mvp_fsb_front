
const getList = async () => {
  let url = 'http://127.0.0.1:5000/Series';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      //var series = data.series;
      data.Series.forEach(tvshow => insertList(tvshow.id, tvshow.nome, tvshow.temporadas, tvshow.plataforma))
      
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

getList()

const postshow = async (inputserie, inputtemporada, inputplataforma) => {
  const formData = new FormData();
  formData.append('nome', inputserie);
  formData.append('temporadas', inputtemporada);
  formData.append('plataforma', inputplataforma);
  let url = 'http://127.0.0.1:5000/Serie';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const idItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(idItem)
        alert("Removido!")
      }

    }
  }
}

const deleteItem = (id) => {
  let url = 'http://127.0.0.1:5000/Serie?id=' + id;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

const newTV = () => {
  let inputserie = document.getElementById("newName").value;
  let inputtemporada = document.getElementById("newTemp").value;
  let inputplataforma = document.getElementById("newStream").value;

  if (inputserie === '') {
    alert("Escreva o nome de uma Serie!");
  } else if (isNaN(inputtemporada)) {
    alert("A quantidade de Temporadas precisam ser em números!");
  } else {

    insertList( inputserie, inputtemporada, inputplataforma)
    postshow( inputserie, inputtemporada, inputplataforma)
    alert("Item adicionado com sucesso!")
    document.getElementById("myTable").remove()
    getList();
  }
}

function insertList(id, nameSerie, temporadas, plataforma) {
  var tvshow = [id, nameSerie, temporadas, plataforma]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < tvshow.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = tvshow[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newName").value = "";
  document.getElementById("newTemp").value = "";
  document.getElementById("newStream").value = "";

  removeElement(); 
}