function dados(){
    const ds = [ 
        { id: 1, login: "gabriel", password: "1234@", email: "gabriel@gmail.com"},//[0]
        { id: 2, login: "amanda", password: "12345@", email: "amanda@gmail.com"},//[1]
        { id: 3, login: "ladygaga", password: "123456@", email: "ladygaga@gmail.com"},//[2]
        { id: 4, login: "snoopy", password: "1950", email: "snoopy@gmail.com"}
     ]
     let n = JSON.stringify(ds);
     localStorage.setItem("UsersAll", n);   
     return ds  
}


function verify_if_log(){
    const user = JSON.parse(sessionStorage.getItem("userHere"))

    const login_object = document.getElementById("login-box")

    const carrino_log = document.querySelector(".btn-login")

    if (user !== null){
        login_object.innerHTML = `<a>
                  <button class="btn-login"></button>
                  <p>Olá ${user.nome}<span style="color:red; cursor:pointer" onclick="logoff()"><br>sair</span></p>
              </a>`
        carrino_log.classList.add('log')
    } else{

    }
}

function logoff(){
    sessionStorage.removeItem("userHere");
    sessionStorage.removeItem("carrinho");
    window.location.href = window.location.href;
}

function login(event){
    event.preventDefault();
    
    const usuarios = JSON.parse(localStorage.getItem("UsersAll"))
    


    let log = document.querySelector("#login0").value
    let senha = document.querySelector('#password0').value
    //laço for
        for(let i = 0;i < usuarios.length; i++){
            if(log == usuarios[i].login && senha == usuarios[i].password){
                console.log("voce logou no sistema :) ")
                window.location.href =  window.location.href.replace("login.html","") + "index.html"
                let user = {nome: usuarios[i].login}
                
                sessionStorage.setItem("userHere", JSON.stringify(user))
            }
}       
}

function cadastrar(event) {
    event.preventDefault();

    var usuarios = JSON.parse(localStorage.getItem("UsersAll"))
    let nome = document.querySelector("#login0").value
    let senha = document.querySelector("#password0").value

    if (nome !== '' && senha !== ''){
        let user = { id: Date.now(), login: nome, password: senha}
        usuarios.push(user)

        localStorage.setItem("UsersAll", JSON.stringify(usuarios))
        alert('Conta Registrada!')

        document.querySelector("#login0").value = ""
        document.querySelector("#password0").value = "" 



    }
  
  }


function vec_produtos(){
    const os_produtos = [ 
        { id: 0, nome: "Camiseta Goku Masculina", img: 'img/camisetagoku.jpg', preco: '59,99', val: 59.99},
        { id: 1, nome: "Boneco Goku Super Saiajin", img: 'img/bonecodogoku.jpg', preco: '159,99', val: 159.99},
        { id: 2, nome: "Caneca Goku", img: 'img/canecagoku2.webp', preco: '39,99', val:39.99},
        { id: 3, nome: "Mouse Pad Goku Black", img: 'img/MousePadGamergokublack.png', preco: '49,99', val:49.99},
        { id: 4, nome: "Jaqueta Dragon Ball", img: 'img/jaquetadragonball.jpg', preco: '79,99', val:79.99},
        { id: 5, nome: "Tênis Dragon Ball", img: 'img/tenisdb.jpg', preco: '299,99', val:299.99},
        { id: 6, nome: "Camisa Goku Vermelha", img: 'img/dragon02vermelho1.jpg', preco: '49,99', val:49.99},
        { id: 7, nome: "Camiseta Dragon Ball Laranja", img: 'img/camisa_Dbz.jpeg', preco: '59,99', val:59.99},
        { id: 8, nome: "Quadro Goku", img: 'img/quadro_dbz.webp', preco: '39,90', val:39.90},
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
        produto_cards += `<div value='${tds_produtos[i].id}' class='card-produto'>
        <img src=${tds_produtos[i].img} class="card-img-top" style="max-width: 90%; height: auto">
        <h5>${tds_produtos[i].nome}</h5>
        <p> R$${tds_produtos[i].preco}</p>
        <div class='buttom-pos'>
            <p class='btns_texto'>Adicionar ao Carrinho</p>
            <buttom  class='btn-comprar' type='button' onclick="add_ao_carinho(this,${i})"></buttom>
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
        let compra = {nome:tds_produtos[i].nome, img:tds_produtos[i].img, qtd:1, 
            preco:tds_produtos[i].preco,  valor:tds_produtos[i].val, 
            pos:carrinho_j.length, id:tds_produtos[i].id}
        carrinho_j.push(compra)

        
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
    const carrinho_box = document.getElementById('carrinho-box');
    carrinho_j[0].qtd = 0


    // add qtd to carrinho amount
    if (carrinho_j.length > 1){
        for (let i = 1; i < carrinho_j.length; i++){
            carrinho_j[0].qtd += carrinho_j[i].qtd
            console.log('as qtds: '+carrinho_j[0].qtd)
        }
    }

    // change carrinho number
    if (carrinho_qtd.innerHTML != carrinho_j[0].qtd){
        
        carrinho_qtd.style.animation = 'none';
        carrinho_qtd.offsetHeight;
        carrinho_qtd.style.animation = null;

        carrinho_box.style.animation = 'none';
        carrinho_box.offsetHeight;
        carrinho_box.style.animation = null;

        carrinho_qtd.innerHTML = carrinho_j[0].qtd;
    } 


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

    btns.forEach((btn, index) => {
        if (btn_list.includes(index)) {
            btn.classList.add('comprado')
            btns_texto[index].innerHTML = 'Adicionado ao carrinho'
            btns_texto[index].classList.add('ao_carrinho')
            btn.parentNode.parentNode.classList.add('comprado')
        }
    });

}

function load_compras(){
    const carrinho_j = JSON.parse(sessionStorage.getItem("carrinho"))
    const items_carrinho = document.getElementById('items-do-carrinho')
    
    let produto_cards = ''
    if (carrinho_j !== null){
        for(let i = 1; i < carrinho_j.length; i++){
            produto_cards += `<div value="${carrinho_j[i].id}" class='card-carrinho'>
            <img src=${carrinho_j[i].img} class="card-img-top">
            <div class="card-carrinho-div">
                <h3>${carrinho_j[i].nome}</h3>
                <p> R$ ${carrinho_j[i].preco}</p>
            </div>
            <nav class="card-carrinho-btns">
                <button id="mais" onclick="carrinho_nav(this, 1)"></button>
                <button id="menos" onclick="carrinho_nav(this, -1)"></button>
            </nav>
            <div class="card-carrinho-qtd">
                <p>${carrinho_j[i].qtd}</p>
                
            </div>
            <button id="remover" onclick="remove_do_carrinho(this)"></button>
            </div>`;
        }
    }
    items_carrinho.innerHTML = ''
    items_carrinho.innerHTML += produto_cards
}

function carrinho_nav(own, v){
    const carrinho_j = JSON.parse(sessionStorage.getItem("carrinho"))
    
    const id = own.parentNode.parentNode.getAttribute('value');
    const qtd = own.parentNode.nextElementSibling.children[0];
    console.log(carrinho_j)
    console.log(id)
    console.log(carrinho_j[id])


    for(let i = 0;i < carrinho_j.length; i++){
        if(id == carrinho_j[i].id){
            console.log('pos '+id)
            if (v < 0 && carrinho_j[i].qtd > 1){
                carrinho_j[i].qtd += v 
            } else if (v > 0) {
                carrinho_j[i].qtd += v
            }
            
            qtd.innerHTML = carrinho_j[i].qtd
            
            let carrinho = JSON.stringify(carrinho_j);
            sessionStorage.setItem("carrinho", carrinho);  

            calcular_total()
            load_carrinho_qtd()
        }
}

}

function calcular_total(){
    const carrinho_j = JSON.parse(sessionStorage.getItem("carrinho"))
    const mostrar_total = document.getElementById('mostrar-total')

    const valor = []
    let total = 0

    for(let i = 1;i < carrinho_j.length; i++){
        valor.push(carrinho_j[i].valor * carrinho_j[i].qtd)
        total += carrinho_j[i].valor * carrinho_j[i].qtd
    }
    carrinho_j[0].total = total

    let carrinho = JSON.stringify(carrinho_j);
    sessionStorage.setItem("carrinho", carrinho);  

    console.log(carrinho)
    mostrar_total.innerHTML = `Total: R$ ${carrinho_j[0].total.toFixed(2)}`
}

function remove_do_carrinho(own){
    const carrinho_j = JSON.parse(sessionStorage.getItem("carrinho"))
    
    const id = own.parentNode.getAttribute('value');
    console.log(id)
    for(let i = 0;i < carrinho_j.length; i++){
        if(id == carrinho_j[i].id){
            carrinho_j.splice(i, 1)
            //console.log(id, carrinho_j[i].id)
            let carrinho = JSON.stringify(carrinho_j);
            sessionStorage.setItem("carrinho", carrinho);  
            load_compras()
            calcular_total()
            load_carrinho_qtd()
        }
    }
}

function finalizar_compra(){
    const user = JSON.parse(sessionStorage.getItem('userHere'))

    const carrinho_j = JSON.parse(sessionStorage.getItem("carrinho"))
    
    if (user === null && carrinho_j.length > 1){
        alert('faça login para finalizar sua compra')
        window.location.href = window.location.href.replace("carrinho.html","") + 'login.html'
    } else if (carrinho_j.length > 1){
        alert(`compra finalizada!, obrigado ${user.nome} por comprar conosco!`)
        sessionStorage.removeItem("carrinho")
        window.location.href =  window.location.href.replace("carrinho.html","") + "index.html"
    } else if (carrinho_j === null){
       alert('seu carrinho está vazio!') 
    } else if (carrinho_j.length < 2){
        alert('seu carrinho está vazio!') 
    }
}

    
