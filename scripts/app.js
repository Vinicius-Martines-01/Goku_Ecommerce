function dados(){
    const ds = [ 
        { id: 1, login: "gabriel", password: "1234@", email: "gabriel@gmail.com"},//[0]
        { id: 2, login: "amanda", password: "12345@", email: "amanda@gmail.com"},//[1]
        { id: 3, login: "ladygaga", password: "123456@", email: "ladygaga@gmail.com"},//[2]
        { id: 4, login: "snoopy", password: "1950", email: "snoopy@gmail.com"}
     ]
     return ds
}

const usuarios = dados()
//console.log( "Seu login é: " + usuarios[2].login + "\n A sennha sua é: " + usuarios[2].password)
//let log = document.querySelector("login").value
//let senha = document.querySelector('password').value

function login(event){
    event.preventDefault();
    
    let log = document.querySelector("#login0").value
    let senha = document.querySelector('#password0').value
    //laço for
        for(let i = 0;i < usuarios.length; i++){
            if(log == usuarios[i].login && senha == usuarios[i].password){
                console.log("voce logou no sistema :) ")
                window.location.href =  window.location.href.replace("login.html","") + "index.html"

                alert("Voce logou")
            }
}       
}


function vec_produtos(){
    const os_produtos = [ 
        { id: 0, nome: "Camiseta Goku Masculina", img: 'img/camisetagoku.jpg', preco: '59,99', val: 59.99},
        { id: 1, nome: "carrinho.html", img: 'img/canecagoku2.webp', preco: ''},
        { id: 2, nome: "gabriel", img: '', preco: ''},
        ]
    let prod = JSON.stringify(os_produtos);
    sessionStorage.setItem("produtos", prod);   
    //console.log(os_produtos)  



    is_carrinho = JSON.parse(sessionStorage.getItem('carrinho'))

    if (is_carrinho === null) {
        const carinho_vect = [{total: 0.0, qtd:0}]
        const carrinho = JSON.stringify(carinho_vect);

        sessionStorage.setItem("carrinho", carrinho);   

    }
    load_carrinho_qtd()
    return os_produtos

}

function add_produtos_to_main(){
    const tds_produtos = JSON.parse(sessionStorage.getItem("produtos"))
    
    const prod_div = document.getElementById('merchs')

    let produto_cards = ''

    for(let i = 0; i < tds_produtos.length; i++){
        produto_cards += `<div class='card-produto'>
        <img src=${tds_produtos[i].img} class="card-img-top">
        <h5>${tds_produtos[i].nome}</h5>
        <p> R$${tds_produtos[i].preco}</p>
        <div class='buttom-pos'>
            <p class='btns_texto'>Adicionar ao Carrinho</p>
            <buttom value='${tds_produtos[i].id}' class='btn-comprar' type='button' onclick="add_ao_carinho(this,${i})"></buttom>
        </div>
       
        </div>`;
    }

    prod_div.innerHTML = produto_cards
}

function add_ao_carinho(own, i){
    own.classList.add('comprado')
    const tds_produtos = JSON.parse(sessionStorage.getItem("produtos"))
    
    const carrinho_j = JSON.parse(sessionStorage.getItem("carrinho"))
    
    let prod_list = []

    for(let i2 = 0; i2 < carrinho_j.length; i2++){
        prod_list.push(carrinho_j[i2].id)
    }

    console.log(prod_list)
    if (prod_list.includes(tds_produtos[i].id)){
        console.log('já tem')
    }else {
        let compra = {nome:tds_produtos[i].nome, valor:tds_produtos[i].val, pos:carrinho_j.length, id:tds_produtos[i].id}
        carrinho_j.push(compra)
        carrinho_j[0].total += tds_produtos[i].val
        carrinho_j[0].qtd += 1
        
        const carrinho = JSON.stringify(carrinho_j);
        sessionStorage.setItem("carrinho", carrinho); 

        const JSON_tds_produtos = JSON.stringify(tds_produtos);
        sessionStorage.setItem("produtos", JSON_tds_produtos);
        console.log('true')
        console.log(carrinho_j)
        load_carrinho_qtd()
        change_buttons()
    }
}

function load_carrinho_qtd(){
    const carrinho_j = JSON.parse(sessionStorage.getItem("carrinho"));

    const carrinho_qtd = document.getElementById('carrinho_qtd');
    carrinho_qtd.innerHTML = carrinho_j[0].qtd;

}

function change_buttons(){
    const carrinho_j = JSON.parse(sessionStorage.getItem("carrinho"));

    const btns = document.querySelectorAll('.btn-comprar');
    const btns_texto = document.querySelectorAll('.btns_texto');

    console.log(carrinho_j)

    let btn_list = []

    for(let i2 = 1; i2 < carrinho_j.length; i2++){
        btn_list.push(carrinho_j[i2].id)
    }
    console.log(btn_list)
    
    btns.forEach((btn, index) => {
        if (btn_list.includes(index)) {
            btn.classList.add('comprado')
            btns_texto[index].innerHTML = 'Adicionado ao carrinho'
            btns_texto[index].classList.add('ao_carrinho')
            btn.parentNode.parentNode.classList.add('comprado')
        }
    });

}