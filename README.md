## Móveis Simonett
Passo a passo instalação do script.
# `ATENÇÃO FAÇA OS  PASSOS A SEGUIR EM UMA PÁGIN DE TESTE`
### Página de produto 
1. Dentro do CMS, no template de produto, inclua a seguinte linha antes do fechamento do body `</body>`: 
```HTML
    <div id="flag-controll" style="display:none;">
        <vtex.cmc:HightLight/>
        <vtex.cmc:discountHightLight/>
    </div>
````
2. Faça updload do arquivo `script-montador-produto.js` dentro do CMS vtex
3. Dentro do CMS, no template de produto, inclua a seguinte linha antes do fechamento do body `</body>`
``` HTML 
    <script src="/arquivos/script-montador-produto.js"></script>
```

Aguarde o cahe para testar. Caso corra tudo bem, cloqueo no template em produção.

### Instalando o script no checkout 
1. Acesse  admin da loja, vá para `checkout` no menu esrquerdo
2. Será mostrado os checkouts das lojas, clique na engrenagem da loja desejada
3. No menu que aparece no topo selecione código.
4. No menu lateral clique em `checkout5-custom.js`
5. Faça um backou de segurança do conteúdo desse arquivo
6. Copie o conteudo do `script-montador-checkout.js` que está nesse respositório e cole o final do arquivo aberto no checkout (`checkout5-custom.js`)
7. Salve e faça os testes necessários.


# O que você deve testar :

### Página de produto 
1. Etre nesse produto teste [aqui](herf="https://www.moveissimonetti.com.br/comoda-uli-em-mdf-1-porta-e-4-gavetas-com-corredicas-metalicas-peroba/p") usande o lid da página de teste
2. Digite um cep válido para o achei montador
3. deve aparecer a caixa de diálogo oferecendo o serviço de montagem
4. digite um cep inválido para o achei montado 
5. A caia de diálgo deve sumir 
6. digite novamente um cep válida 
7. selecione a caixa de diálogo 
8. coloqueo o produto no carrinho e verifique se o serviso de montagem também foi para o carrinho.


### No checkout 
1. Remova o serviço de montagem do carrinho clicando no "X"
2. a caixa de diálogo oferecendo o serviso novamente, deve aparecer desmarcada 
3. Selecione a caixa de deiálogo do achei montador
4. ao selecionar o servido deve ser incluído no carrinho 
