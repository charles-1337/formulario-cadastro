document.addEventListener('DOMContentLoaded', function() {
    const formProduto = document.getElementById('formProduto');
    const listaOrdenada = document.querySelector('.listaOrdenada');

    function adicionarProduto(nome, descricao, valor, disponibilidade) {
        const novoProduto = document.createElement('li');
        novoProduto.textContent = `${nome} - R$ ${valor}`;

        // Encontra o índice onde o novo produto deve ser inserido
        let index = 0;
        const produtos = Array.from(listaOrdenada.children);
        while (index < produtos.length && parseFloat(produtos[index].textContent.split(' - R$ ')[1]) < parseFloat(valor)) {
            index++;
        }

        // Insere o novo produto na posição correta da lista
        if (index === produtos.length) {
            listaOrdenada.appendChild(novoProduto); // Adiciona no final da lista
        } else {
            listaOrdenada.insertBefore(novoProduto, produtos[index]); // Insere antes do produto na posição index
        }
    }

    formProduto.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = formProduto.elements.nomeProduto.value;
        const descricao = formProduto.elements.descricaoProduto.value;
        const valor = parseFloat(formProduto.elements.valorProduto.value).toFixed(2);
        const disponibilidade = formProduto.elements.disponibilidade.value;

        if (nome && descricao && valor && disponibilidade) {
            adicionarProduto(nome, descricao, valor, disponibilidade);
            formProduto.reset();
        } else {
            alert('Por favor, preencha todos os campos do formulário.');
        }
    });

    const btnNovoProduto = document.querySelector('.btnNovoProduto');
    btnNovoProduto.addEventListener('click', function() {
        formProduto.reset();
        document.getElementById('nomeProduto').focus(); // Coloca o foco no campo de nome do produto
        formProduto.scrollIntoView({ behavior: 'smooth' });
    });

    function ordenarListaProdutos() {
        const produtos = Array.from(listaOrdenada.children);
        produtos.sort((a, b) => {
            const valorA = parseFloat(a.textContent.split(' - R$ ')[1]);
            const valorB = parseFloat(b.textContent.split(' - R$ ')[1]);
            return valorA - valorB;
        });

        listaOrdenada.innerHTML = '';
        produtos.forEach(produto => listaOrdenada.appendChild(produto));
    }

    ordenarListaProdutos();
});
