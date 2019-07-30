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
    $('head').append('<link rel="stylesheet" href="/arquivos/achei-montador.css">')
    
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

    function saveToLocalStorage(id, sku) {
        var localBind = localStorage.getItem('bindsku')
        var arry = []
        if (localBind != null) {
            arry = localBind.split('#');
            arry.push(`{"id":"${id}", "sku":"${sku}"}`)
        } else {
            arry.push(`{"id":"${id}", "sku":"${sku}"}`)
        }
        arry = arry.join('#')
        localStorage.setItem('bindsku', arry);
    }

    function removToLocalStorage(id, sku) {
        var localBind = localStorage.getItem('bindsku')
        var str = `{"id":"${id}", "sku":"${sku}"}`
        localBind = localBind.replace(str,'');
        localStorage.setItem('bindsku', localBind);
    }

    function addToCart(id) {
        var item = [{
            id: id,
            quantity: 1,
            seller: 'acheimontador'
        }];
        
        vtexjs.checkout.addToCart(item)
            .done(function (orderForm) {
                //alert('Item adicionado!')
                console.log(orderForm);
            });
    }

    function removeToCart(sku) {

        vtexjs.checkout.getOrderForm()
            .then(function (orderForm) {              
                return orderForm.items.map(function(item,i) {
                    if (sku === item.id) {
                        itemIndex = i 
                        var itemsToRemove = [{
                            "index": itemIndex,
                            "quantity": 0,
                        }]
                        console.log(itemsToRemove)

                        return vtexjs.checkout.removeItems(itemsToRemove);
                    }
                });
                
            })
    }

    function updateItem(sku, ctrl) {
        vtexjs.checkout.getOrderForm()
            .then(function (orderForm) {              
                orderForm.items.map(function(item,i) {
                    if (sku === item.id) {
                        var itemIndex = i 
                        var qtl =  ctrl === 'more' ? item.quantity = item.quantity + 1 : item.quantity = item.quantity - 1
                        var itemsToUpdate = [{
                            "index": itemIndex,
                            "quantity": qtl
                        }]
                        console.log(itemsToUpdate)

                        return vtexjs.checkout.updateItems(itemsToUpdate, null, false);
                    }
                });
                
            })
    }

    $('body').on('change','input[name="addMounting"]',function(){
        var sku = $(this).val();
        var refSku = $(this).parents('tr.product-item').attr('data-sku')
        var ctrl = false
        var itemIndex = null
        $(this).parents('td.product-name').toggleClass('active')
        
        $.each(vtexjs.checkout.orderForm.items , function(i , item) {
            if (item.id == sku && item.quantity >= 1) {
                ctrl = true
            }
        })

        if (this.checked) {
            if (ctrl == true) {
                updateItem(sku, 'more')
            } else {
                addToCart(sku,refSku);
            }
            saveToLocalStorage(sku,refSku);
        } else {
            if (ctrl == true) {
                updateItem(sku, 'less')
            } else {
                removeToCart(sku)   
            }

            removToLocalStorage(sku,refSku);
        }
    })

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

    function priceMounting(bestPrice,items) {

        var priceProduct = (bestPrice/100);

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
                var installments = null;
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
    
    function enableBenefits(orderForm, product) {
        var ctrl = false

        if (orderForm.ratesAndBenefitsData != (null || undefined)) {
            var benefitsId  = []
            var benefitts   = orderForm.ratesAndBenefitsData.rateAndBenefitsIdentifiers

            benefitts.map(function (item, i) {
                if (item.name == 'Achei Montador') {
                    benefitsId.push(item.id)
                }
            });

            if (product.priceTags.length > 0) {
                product.priceTags.map(function (pricetag) {                    
                    if ($.inArray(pricetag.identifier, benefitsId) >= 0) {                    
                        ctrl = true
                    }
                })
            }
          
        }

        return ctrl
    }

    function showboxMounting(partial,bestPrice,items) {
        var target = '';

        if(partial == "MoveisSimonetti") {

            var boxMounting =   '<div id="boxMounting_content">' +
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
            var mounting = priceMounting(bestPrice,items);
            var installments = null;

            var checkBoxField = null
            // vtexjs.checkout.orderForm.items.map(function(item,i){
            //     if (mounting.sku == item.id ) {
            //         checkBoxField = '<input type="checkbox" value="' + mounting.sku + '" id="addMounting-'+ items.id +'" name="addMounting" checked="checked" >' 
            //         return false
            //     }
            // })
            
            // if (checkBoxField === null) {
            //     checkBoxField = '<input type="checkbox" value="' + mounting.sku + '" id="addMounting-'+ items.id +'" name="addMounting" >' 
            // }

            checkBoxField = '<input type="checkbox" value="' + mounting.sku + '" id="addMounting-'+ items.id +'" name="addMounting" >' 

            var boxMounting = '<div id="boxMounting_content" class="boxMounting_content" data-bind-sku="'+ items.id +'">' +
                '<div class="row"><span>Aproveite e contrate</span></div>' +
                '<div class="row box">' +
                '<div class="av-col-md-2"><div class="checkboxFive">' +
                
                checkBoxField +
                //'<input type="checkbox" value="' + mounting.sku + '" id="addMounting" name="addMounting" checked="checked" >' +
                
                '<label for="addMounting-'+ items.id +'"></label></div></div>' +
                '<div class="av-col-md-13">' +
                '<span class="title">Montagem de M&oacute;veis</span>' +
                //'<span class="priceMounting">At&eacute; <span class="installmentsTimes">' + installments + 'x</span> de <span class="priceInstallments">' + mounting.priceInstallments + '</span></span>' +
                '<span class="priceMounting"><span class="installmentsTimes"></span><span class="priceInstallments"></span></span>' +
                '<span class="totalOneTime">Total &agrave; vista: <span class="totalPriceMounting">' + mounting.price + '</span> </span>' +
                '</div>' +
                '<div class="av-col-md-9">' +
                '<img class="logoAcheiMontador" src="https://moveissimonetti.vteximg.com.br/arquivos/logo-Achei-Montador.png" width="100" height="57" />' +
                '</div>' +
                '</div>' +
                '</div>';

        }
        
        target = 'tr[data-sku="'+ items.id +'"] .product-name'
        $(target).append(boxMounting)

    };

    function validateChek() {
        var skuBinds = localStorage.getItem('bindsku').split('#')

        $.each(skuBinds,function(i, item){
            if (item != '') {
                console.log(item)
                var obj = JSON.parse(item)
                var selector = `#addMounting-${obj.sku}`
                $(selector).attr('checked','checked')
            }
        })
    }

    function validacoesFinais(CityFromCEP, bestPrice,items) {
        // verifica se o usuário está em uma cidade com loja Simonetti
        if ($.inArray(CityFromCEP, SimonettiStores) !== -1) {

            console.log("Montagem Grátis fornecida por Lojas Simonetti.");
            showboxMounting("MoveisSimonetti",bestPrice,items);
            validateChek()
        }
        // verifica se o usuário está em uma cidade atendida pelo Achei Montador
        else if( $.inArray( CityFromCEP, AcheiMontadorStores ) !== -1 )  {
            // mostra o box de montagem
            console.log("Mostra box de Montagem Achei Montador");
            showboxMounting("AcheiMontador",bestPrice,items);
            validateChek()
        } else {
            console.log("Cidade sem cobertura pela Simonetti ou Achei Montador")
            return false;
        }
    }

    $(window).on('orderFormUpdated.vtex', function(evt, orderForm) {
        $('#render-cartman').html('');
        
        if (orderForm.shippingData.address != null) {
            var cep = orderForm.shippingData.address.postalCode
            var validateCep = validaCEP(cep)
            // valida o cep
            if (validateCep.is == true) {
                /*
                    SE CEP OK, VERIFCAR TODOS OS PRODUTOS NO CARRINHO 
                    FAZEM PARTE DE UM DEP E CAT QUE PERMITAM MONTAGEM
                */
                orderForm.items.map(function(item,i){
                    if (enableBenefits(orderForm, item)) {
                        // SE PRODUTO FAZER PARTE DE DEP/CAT COM MONTAGEM FAZER AS ULTIMAS VALIDAÇÕES
                        //console.log(enableBenefits(orderForm,item))
                        validacoesFinais(validateCep.currentCity,item.price,item);
                    }  
                })
            }
        }
    });

    addToCart();
    
}

$(window).load(function(){
    start();
    vtexjs.checkout.getOrderForm().done(validateChek())
})