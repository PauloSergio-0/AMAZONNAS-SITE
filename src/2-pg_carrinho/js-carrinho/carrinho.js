//variavel que mantém o estado visivel so carrinho
var  carrinhoVisivel = false;

//Aguqrdamos o carregamento todos os elementos da pagina antes de continuar
if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}


function ready(){
    //adicionamos funcionalidade aos botões de excluir do carrinho
    var botoesExcluirItem = document.getElementsByClassName('bt-excluir');
    for(var i=0;i < botoesExcluirItem.length;i++){
        var botao = botoesExcluirItem[i];
        botao.addEventListener('click', exluirItemCarrinho);
    }
    //adicionamos funcionalidade ao botão aumentar do carrinho
    var botaoSomarQuantidade = document.getElementsByClassName('aumen-quantidade');
    for(var i = 0; i < botaoSomarQuantidade.length; i++) {
        var botao = botaoSomarQuantidade[i];
        botao.addEventListener('click', aumQuantidade);
    }
    
    //adicionamos funcionalidade ao botão diminuir do carrinho
    var botaoDimrQuantidade = document.getElementsByClassName('dim-quantidade');
    for(var i = 0; i < botaoDimrQuantidade.length; i++) {
        var botao = botaoDimrQuantidade[i];
        botao.addEventListener('click', dimiquantidade);
    }

    //funcionalidade aos botões adicionar ao carrinho
    var botoesAdicionarCarrinho = document.getElementsByClassName('butao-item');
    for(var i=0;i < botoesAdicionarCarrinho.length;i++){
        var botao =botoesAdicionarCarrinho[i];
        botao.addEventListener('click', adicionarCarrinhoClicked);
    }

    //funcionalidade do botão pagar,,,
    document.getElementsByClassName('bt-pagar')[0].addEventListener('click', pagarClicked);
// Verifica se o carrinho está vazio e, se estiver, oculta-o no início
var carrinhoItens = document.querySelector('.carrinho-itens');
if (carrinhoItens.childElementCount === 0) {
    ocultarCarrinho();
}
}


//Atualizar o total do carrinho
function atualizarTotalCarrinho() {
    var carrinhoConteiner = document.querySelector('.carrinho-itens');
    var carrinhoItems = carrinhoConteiner.querySelectorAll('.carrinho-item');
    var total = 0;

    for (var i = 0; i < carrinhoItems.length; i++) {
        var item = carrinhoItems[i];
        var precoElemento = item.querySelector('.carrinho-item-pre');
        var precoTexto = precoElemento.innerText.replace('R$', '').replace(',', '.');
        var preco = parseFloat(precoTexto);
        var quantidadeItem = item.querySelector('.carrinho-item-quantidade');
        var quantidade = parseInt(quantidadeItem.value, 10);
        total += preco * quantidade;
    }

    total = total.toFixed(2);
    document.querySelector('.carrinho-pre-total').innerText = 'R$ ' + total;

    // Verifique se o carrinho está vazio e, se estiver, oculte-o
    if (carrinhoItems.length === 0) {
        ocultarCarrinho();
    }
}


function exluirItemCarrinho(event) {
    var botaoCliked = event.target;
    botaoCliked.parentElement.remove();

    // Atualizamos o total do carrinho uma vez que eliminamos um item do carrinho
    atualizarTotalCarrinho();

    // Verificamos se há itens no carrinho depois que ele é excluído
    var carrinhoItens = document.querySelector('.carrinho-itens');
    if (carrinhoItens.childElementCount === 0) {
        ocultarCarrinho(); // Chamando a função para ocultar o carrinho
    }
}

function ocultarCarrinho() {
    if (carrinhoVisivel) {
        var carrinho = document.getElementsByClassName('carrinho')[0];
        carrinho.style.marginRight = '-100%';
        carrinho.style.opacity = '0';
    
        carrinhoVisivel = false;
    
        // Agora maximize o conteiner de elementos
        var itens = document.getElementsByClassName('conteiner-itens')[0];
        itens.style.width = '100%';
    }
    
    
}



//aumantar em 1 a quantiadade do elemanto selecionado
function aumQuantidade(event){
    var botaoCliked = event.target;
    var selector = botaoCliked.parentElement;
    var quantidadeAtual = selector.getElementsByClassName('carrinho-item-quantidade')[0].value;
    console.log(quantidadeAtual);
    quantidadeAtual++;
    selector.getElementsByClassName('carrinho-item-quantidade')[0].value = quantidadeAtual;
    atualizarTotalCarrinho();
}

function dimiquantidade(event){
    var botaoCliked = event.target;
    var selector = botaoCliked.parentElement;
    var quantidadeAtual = selector.getElementsByClassName('carrinho-item-quantidade')[0].value;
    console.log(quantidadeAtual);
    quantidadeAtual--;

    //verificamos se não é menor que 1
    if(quantidadeAtual >=1){
    selector.getElementsByClassName('carrinho-item-quantidade')[0].value = quantidadeAtual;
    //atualiza o total
    atualizarTotalCarrinho();
    }
}
function adicionarCarrinhoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo= item.getElementsByClassName('titulo-itens')[0].innerText;
    console.log(titulo);
    var preco = item.getElementsByClassName('preço-itens')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    //adiciona item ao carrinho
    adicionarItemCarrinho(titulo,preco,imagenSrc);

    // ocarrinho fica vizivel quando algo é adicionado pela primeira vez
    fazerVisivelCarrinho();
}
function adicionarItemCarrinho(titulo,preco,imagenSrc){
    var item = document.createElement('div');
    item.classList.add('item');
    var itemsCarrinho = document.getElementsByClassName('carrinho-itens')[0];

    //verifica se o item se estar dentro do carrinho
    var nomesItensCarrinho = itemsCarrinho.getElementsByClassName('carrinho-item-titulo');
    for(var i=0; i < nomesItensCarrinho.length;i++){
    if(nomesItensCarrinho[i].innerText==titulo){
        alert("Este item já foi adicionado")
        return;
        }
    }

    var ItemConteinersCarrinho = `
    <div class="carrinho-item">
        <img src="${imagenSrc}" alt="" width="80px">
        <div class="carrinho-item-detalhes">
            <span class="carrinho-item-titulo">${titulo}</span>
            <div class="selecionar-quantidade">
                <i class="fa-solid fa-minus dim-quantidade"></i>
                <input type="text" value="1" class="carrinho-item-quantidade" disabled>
                <i class="fa-solid fa-plus aumen-quantidade"></i>
            </div>
            <span class="carrinho-item-pre">${preco}</span>
        </div>
        <span class="bt-excluir">
            <i class="fa-solid fa-trash"></i>
        </span>
    </div>
    `
    item.innerHTML = ItemConteinersCarrinho;
    itemsCarrinho.append(item);

    //Funcionalidade de excluir novo item
    item.getElementsByClassName('bt-excluir')[0].addEventListener("click", exluirItemCarrinho)

    //Funcionalidade de adicionar itens ao carrinho para o novo item
    var botaoSomarQuantidade = item.getElementsByClassName('aumen-quantidade')[0];
    botaoSomarQuantidade.addEventListener('click', aumQuantidade);

    //Funcionalidade de eliminar itens do carrinho para o novo item
    var botaoDimrQuantidade = item.getElementsByClassName('dim-quantidade')[0];
    botaoDimrQuantidade.addEventListener('click', dimiquantidade);
    atualizarTotalCarrinho();
}

function pagarClicked(event){
    alert("Obrigado por comprar na loja AMAZONNAS");

    //exclui todos os itens do carrinho
    var carrinhoItems = document.getElementsByClassName('carrinho-itens')[0];
    while(carrinhoItems.hasChildNodes()){
        carrinhoItems.removeChild(carrinhoItems.firstChild);
    }
    atualizarTotalCarrinho();

    //Função que oculta carrinho
    ocultarCarrinho();
}

function fazerVisivelCarrinho(){
    carrinhoVisivel = true;
    var carrinho = document.getElementsByClassName('carrinho')[0];
    carrinho.style.marginRight = '0';
    carrinho.style.opacity = '1';

    var items = document.getElementsByClassName('conteiner-itens')[0];
    items.style.width = '60%';
}