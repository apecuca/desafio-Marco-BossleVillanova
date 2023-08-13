// Marco Bossle Villanova

class CaixaDaLanchonete {
    // Retorna o preço dos itens no cardário
    getPreco(codItem)
    {
        switch (codItem)
        {
            case 'cafe':
                return 3.00
            case 'chantily':
                return 1.50
            case 'suco':
                return 6.20
            case 'sanduiche':
                return 6.50
            case 'queijo':
                return 2
            case 'salgado':
                return 7.25
            case 'combo1':
                return 9.50
            case 'combo2':
                return 7.50
            // Código inválido = -1
            default:
                return -1
        }
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        // Caso não tenha itens
        if (itens.length <= 0)
            return "Não há itens no carrinho de compra!"

        // Array para armazenar o código dos itens pedidos, separadinho
        let arrItems = []
        // Total da compra
        let total = 0
        for (let i = 0; i < itens.length; i++)
        {
            // Retirar espaços e separar o código do item da quantidade
            arrItems[i] = itens[i].replace(/^\s+|\s+$/gm,'').split(",")[0]
            // Variáveis 
            let _qntd = itens[i][itens[i].length - 1]
            let _preco = this.getPreco(arrItems[i])

            // Verificações de anormalidades
            if (_qntd == 0 || isNaN(_qntd))
                return "Quantidade inválida!"
            // -1 = inválido
            if (_preco == -1)
                return "Item inválido!"

            // Adicionar no total
            total += _preco * _qntd
        }

        // Verificações de extas sem os principais
        // Daria pra não criar essa bool temporária, mas aí
        // o código ficaria muito amontoado ou teria que repetir
        // returns com string, o que aumenta a chance de dar errado
        let extraSemPrincipal = false
        if (arrItems.includes("chantily") && !arrItems.includes("cafe"))
            extraSemPrincipal = true
        if (arrItems.includes("queijo") && !arrItems.includes("sanduiche"))
            extraSemPrincipal = true
        
        if (extraSemPrincipal)
            return "Item extra não pode ser pedido sem o principal"

        let desconto = 0
        // Fazer o que precisar dependendo do método de pagamento,
        // que nesse caso é dar o desconto, aumentar o preço ou invalidar a compra
        switch (metodoDePagamento)
        {
            case 'debito':
                break;
            case 'credito':
                // Acréscimo de 3%
                desconto = -((total / 100) * 3)
                break;
            case 'dinheiro':
                // Desconto de 5%
                desconto = (total / 100) * 5
                break;
            default:
                return "Forma de pagamento inválida!";
        }

        // Efetuar desconto do total
        total -= desconto

        // Dividir em inteira e decimal para output
        let priceInt = Math.floor(total).toString()
        let priceDecimal = Math.floor(((total % 1).toFixed(2) * 100)).toString()

        // Correções nas strings
        // Caso seja um número só, adicionar um 0 antes
        if (priceDecimal.length == 1)
            priceDecimal = `0${priceDecimal}`
        // Caso seja um 0, duplicar
        if (priceDecimal == "0")
            priceDecimal = "00"

        // Caso não dê nenhum problema, retornar valor final
        return `R$ ${priceInt},${priceDecimal}`
    }

}

export { CaixaDaLanchonete };
