let bodyElemento = document.querySelector("body");
let tabelaElemento = document.querySelector("#tabela");
let formElemento = document.querySelector("#formulario")

bodyElemento.onload = function() {
    console.log("Loading o body"); 
    buscarAutores();   
    //setInterval(buscarProdutos, 5000);
    montarFormularioAutores();
}


function buscarAutores() {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        const listaAutores = JSON.parse(this.responseText);
        montarTabelaAutores(listaAutores);
    }
    xhttp.open("GET", "http://localhost:3000/autores", true);
    xhttp.send();   
}

function montarTabelaAutores(listaAutores) {
    let tabela = `<table>
        <tr>
            <th>ID</th>
            <th>NOME</th>
            <th>NACIONALIDADE</th>
        </tr>`;
    
    for(let i=0; i < listaAutores.length; i++) {
        tabela += `<tr>
            <td>${listaAutores[i].id}</td>
            <td>${listaAutores[i].nome}</td>
            <td>${listaAutores[i].nacionalidade}</td>
        </tr>`;
    }        
    tabela += `</table>`;
    tabelaElemento.innerHTML = tabela;
}

function montarFormularioAutores() {
    const formulario = `<form id="formAutores">
        <label for='nomeInput'>Nome:</label>
        <input id='nomeInput'> </br>
        <label for='nacionalidadeInput'>Nacionalidade:</label>
        <input id='nacionalidadeInput'> </br>
        <input type="submit" value="Salvar">
    </form>`;
    
    formElemento.innerHTML = formulario;
    
    const formAutores = document.querySelector("#formAutores");
    formAutores.onsubmit = function(event) {
        event.preventDefault();
        const nomeInput = document.querySelector("#nomeInput");
        const precoInput = document.querySelector("#nacionalidadeInput");
        if(nomeInput.value && nacionalidadeInput.value) {
            let autor = new Object();
            autor.nome = nomeInput.value;
            autor.nacionalidade = nacionalidadeInput.value;
            //Chamada AJAX para inserir produto
            inserirAutor(autor);
            nomeInput.value="";
            nacionalidadeInput.value="";
        }
        else {
            alert("Campos Nome e Nacionalidade obrigatórios");
        }
    }
}

function inserirAutor(autor) {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        const autor = JSON.parse(this.responseText);
        alert(`Autor ${autor.nome} cadastrado com sucesso!`);
        buscarAutores();
    }
    xhttp.open("POST", "http://localhost:3000/autores", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(autor));   

}
