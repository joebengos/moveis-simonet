/**
 * Script para adicionar a opcao de Montagem na tela do Produto
 *
 * Regras de Negocio
 *
 * 01 - Verifica se o produto tem a promoçao "Achei montador"
 * 02 - Verifica o CEP, se for um CEP válido então mostra o modal
 * 
 * @url   https://www.linkedin.com/in/raphael-corr%C3%AAa-29993952/
 * @author Raphael Corrêa
 * 
 */

function start() {
    var SimonettiStores = [
        "Itamaraju",
        "Posto da Mata",
        "Medeiros Neto",
        "Teixeira de Freitas",
        "Alcobaça",
        "Buerarema",
        "Ipiau",
        "Canavieiras",
        "Itabuna",
        "Itabela",
        "Jequié",
        "Porto Seguro",
        "Ubaitaba",
        "Camacan",
        "Itabatan",
        "Ilhéus",
        "Eunápolis",
        "Vitória",
        "Vila Velha",
        "Jaguaré",
        "Pedro Canário",
        "Barra de São Francisco",
        "Linhares",
        "Serra",
        "Cachoeiro de Itapemirim",
        "Nova Venécia",
        "Cariacica",
        "São Mateus",
        "Conceição da Barra",
        "Pinheiros",
        "Aracruz",
        "Guarapari",
        "Ponto Belo",
        "Montanha",
        "Nanuque",
        "Teófilo Otoni",
        "Carlos Chagas"
    ];
    
    var AcheiMontadorStores = ["São Paulo", "Rio de Janeiro", "Salvador"];
    
    var parcelamentoTableOriginal = $('.other-payment-method-ul').html();

    function validaCEP(cep) {
        var endpoint = "https://viacep.com.br/ws/" + cep + "/json/";

        var tmp = null;
        $.ajax({
            'async': false,
            'crossDomain': true,
            'type': "GET",
            'global': false,
            'dataType': 'html',
            'url': endpoint,
            'success': function (data) {

                // console.log('data')
                tmp = JSON.parse(data).localidade;
                // console.log(tmp)
            }
        });

        if ($.inArray(tmp, AcheiMontadorStores) !== -1 ) {
           return { is: true, currentCity: tmp}
        }

        return { is: false, currentCity: tmp};
    }

    function priceMounting() {

        var priceProduct ;
        var installments ;

        $.each(skuJson.skus, function (i, item) {
            if (item.available == true) {
                priceProduct = (item.bestPrice / 100)
                installments = item.installments
                return false
            }
        })
    

        var ptbr = new Intl.NumberFormat(["pt-BR"], {
            style: "currency",
            currency: "BRL",
            currencyDisplay: "symbol",
            maximumFractionDigit: 1
        });
    
        var mounting = {
            skuVal: '',
            get sku() {
                return this.skuVal;
            },
            set sku(val) {
                this.skuVal = val;
            },
            priceVal: '',
            get price() {
                return ptbr.format(this.priceVal);
            },
            set price(val) {
                this.priceVal = val;
            },
            priceInstallmentsVal: '',
            get priceInstallments() {
                //var installments = skuJson_0.skus[0].installments;
                //console.log(ptbr.format(this.priceVal/installments))
                return ptbr.format(this.priceVal/installments);
            },
            set priceInstallments(val) {
                this.priceInstallmentsVal = val;
            }
    
        };    
    
        if (priceProduct <= 149.99 ) {
            mounting.sku = 18823;
            mounting.price = 79.00;
        }
        else if ( priceProduct >= 150 && priceProduct <= 299.99 ) {
            mounting.sku = 18824;
            mounting.price = 110.00;
        }
        else if ( priceProduct >= 300 && priceProduct <= 599.99 ) {
            mounting.sku = 18825;
            mounting.price = 119.00;
        }
        else if ( priceProduct >= 600 && priceProduct <= 899.99 ) {
            mounting.sku = 18826;
            mounting.price = 139.00;
        }
        else if ( priceProduct >= 900 && priceProduct <= 1199.99 ) {
            mounting.sku = 18827;
            mounting.price = 169.00;
        }
        else if ( priceProduct >= 1200 && priceProduct <= 1499.99 ) {
            mounting.sku = 18828;
            mounting.price = 215.00;
        }
        else if ( priceProduct >= 1500 && priceProduct <= 1799.99 ) {
            mounting.sku = 18829;
            mounting.price = 260.00;
        }
        else if ( priceProduct >= 1800 && priceProduct <= 2099.99 ) {
            mounting.sku = 18830;
            mounting.price = 299.00;
        }
        else if ( priceProduct >= 2100 && priceProduct <= 2399.99 ) {
            mounting.sku = 18831;
            mounting.price = 349.00;
        }
        else if ( priceProduct >= 2400 && priceProduct <= 2799.99 ) {
            mounting.sku = 18832;
            mounting.price = 399.00;
        }
        else if ( priceProduct >= 2800 && priceProduct <= 3099.99 ) {
            mounting.sku = 18833;
            mounting.price = 449.00;
        }
        else if ( priceProduct >= 3100 && priceProduct <= 3399.99 ) {
            mounting.sku = 18834;
            mounting.price = 499.00;
        }
        else if ( priceProduct >= 3400 && priceProduct <= 3799.99 ) {
            mounting.sku = 18835;
            mounting.price = 549.00;
        }
        else if ( priceProduct >= 3800 && priceProduct <= 4099.99 ) {
            mounting.sku = 18836;
            mounting.price = 599.00;
        }
        else if ( priceProduct >= 4100 && priceProduct <= 4399.99 ) {
            mounting.sku = 18837;
            mounting.price = 649.00;
        }
    
        return mounting;
    
    
    };

    function validacoesFinais(CityFromCEP) {
        // verifica se o usuário está em uma cidade com loja Simonetti
        if ($.inArray(CityFromCEP, SimonettiStores) !== -1) {

            console.log("Montagem Grátis fornecida por Lojas Simonetti.");
            showboxMounting("MoveisSimonetti");
        }
        // verifica se o usuário está em uma cidade atendida pelo Achei Montador
        else if( $.inArray( CityFromCEP, AcheiMontadorStores ) !== -1 )  {
            // mostra o box de montagem
            console.log("Mostra box de Montagem Achei Montador");
            showboxMounting("AcheiMontador");
        } else {
            console.log("Cidade sem cobertura pela Simonetti ou Achei Montador")
            return false;
        }
    }

    function showboxMounting(partial) {


        if(partial == "MoveisSimonetti") {
    
            var boxMounting = '<div id="boxMounting_content">' +
                '<div class="row"><span>Oferta Exclusiva</span></div>' +
                '<div class="row box" style="height: 102px;">' +
                '<div class="av-col-md-16">' +
                '<span class="totalPriceLabel totalPriceMounting">Compre e Ganhe</span>' +
                '<span class="priceMounting"><span class="totalPriceMounting">Montagem de M&oacute;veis</span> <span class="totalPriceLabel totalPriceMounting">Gr&aacute;tis por M&oacute;veis Simonetti.</span>' +
                '</div>' +
                '<div class="av-col-md-8">' +
                '<img class="logoAcheiMontador" src="https://moveissimonetti.vteximg.com.br/arquivos/suamoveis.gif" width="80" height="80" />' +
                '</div>' +
                '</div>' +
                '</div>';
    
        }
        
        if(partial == "AcheiMontador") {
            var mounting = priceMounting();
            //var installments = skuJson_0.skus[0].installments;
            var templateInstalment = ''
            //console.log(mounting);

            var installments ;

            $.each(skuJson.skus, function (i, item) {
                if (item.available == true) {
                    installments = item.installments
                    return false
                }
            });

            if (isNaN(mounting.priceInstallments)) {
                templateInstalment = '<span class="priceMounting">At&eacute; <span class="installmentsTimes">' + installments + 'x</span> de <span class="priceInstallments">' + mounting.priceInstallments + '</span></span>'   
            }
    
            var boxMounting = '<div id="boxMounting_content">' +
                '<div class="row"><span>Aproveite e contrate</span></div>' +
                '<div class="row box">' +
                '<div class="av-col-md-2"><div class="checkboxFive">' +
                '<input type="checkbox" value="' + mounting.sku + '" id="addMounting" name="addMounting">' +
                '<label for="addMounting"></label></div></div>' +
                '<div class="av-col-md-13">' +
                '<span class="title">Montagem de M&oacute;veis</span>' +
                templateInstalment +
                '<span class="totalOneTime">Total &agrave; vista: <span class="totalPriceMounting">' + mounting.price + '</span> </span>' +
                '</div>' +
                '<div class="av-col-md-9">' +
                '<img class="logoAcheiMontador" src="https://moveissimonetti.vteximg.com.br/arquivos/logo-Achei-Montador.png" width="100" height="57" />' +
                '</div>' +
                '</div>' +
                '</div>';
    
    
        }
    
        console.log(document.getElementById("boxMounting_content"));
    
        if ( document.getElementById("boxMounting_content") === (false || null) ) {
    
            console.log(boxMounting);
    
            $(boxMounting).insertAfter("#main > div.product-info > div > div.product-buy-info");
    
        }
    
        addToCartWithMounting();
    };

    function addToCartWithMounting () {

        $(".buy-button").live("click", function (e) {
    
            console.log('addMounting checked');
            console.log($('[name="addMounting"]').is(':checked'));
    
            if ($('[name="addMounting"]').is(':checked')) {
    
                e.preventDefault();
    
                var buyButton = document.getElementsByClassName("buy-button");
                var href = buyButton[1].href;
    
    
                if (href.indexOf("selecione") == -1 ) {
    
    
                    $.urlParam = function (name) {
                        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(href);
                        return results[1] || 0;
                    }
    
                    var sku = $.urlParam('sku');
                    var qty = $.urlParam('qty');
                    var seller = $.urlParam('seller');
    
                    var addMounting = $("#addMounting").val();
    
                    //console.log(addMounting);
    
                    vtexjs.checkout.getOrderForm().then(function (orderForm) {
                        var item = [];
                        var item1 = {id: sku, quantity: qty, seller: seller};
                        var item2 = {id: addMounting, quantity: qty, seller: 'acheimontador'};
                        item.push(item1);
                        item.push(item2);
                        return vtexjs.checkout.addToCart(item);
                    }).done(function (orderForm) {
                        //console.log(orderForm)
                        window.location.href = "/checkout/#cart";
                    });
    
    
                }
    
    
            }
    
    
        });
    
    };

    function installmentAddMounting() {
        var parcelamentoTableOriginal = $('.other-payment-method-ul').html();


        $(document).on('click', '#addMounting', function () {

            // caso o box de montagem seja marcado atualiza o box do parcelamento

            if ($('#' + this.id).is(":checked")) {

                var parcelamentoTable = "";
                var bestPrice = skuJson.skus[0].bestPrice;
                var mountingPrice = 169.90 * 100; // converte preço da montagem para base 100
                var finalPrice = (bestPrice + mountingPrice) / 100;
                var i = 2;

                parcelamentoTable += '<li class="other-payment-method-Visa-à vista #ParcelamentoPreco#">à vista R$ ' + finalPrice.toFixed(2) + ' <span class="other-payment-method-intereset-no"></span></li>';

                while (i <= 10) {

                    parcelamentoTable += '<li class="other-payment-method-Visa-' + i + '">em até <span>' + i + 'X</span> de <strong>R$ ' + (finalPrice / i).toFixed(2) + '</strong> sem juros <span class="other-payment-method-intereset-no">sem juros</span></li>';
                    i++;
                }

                $('.other-payment-method-ul').html(parcelamentoTable);
            }

            // caso o box de montagem seja desmarcado recupera a tabela de parcelamento original
            else {

                $('.other-payment-method-ul').html(parcelamentoTableOriginal);

            }

        });
    }

   

    // se a fleg de promoção exister chame valida cep
    if ($('#falg-controll .achei-montador').length > 0) {
        var time ;
        $(document).on('keyup', '#txtCep', function(){
            var cep = $(this).val().replace(/\D/g,'');;

                clearTimeout(time);  
                time = setTimeout(function () {
                    if (cep.length >= 8) {
                        var validaCep = validaCEP(cep);

                        if (validaCep.is == true) {
                            validacoesFinais(validaCep.currentCity)
                        }

                        //console.log(validaCEP(cep))
                    }
                }, 500);  
        });
        installmentAddMounting()
    }
}


$(window).load(start())