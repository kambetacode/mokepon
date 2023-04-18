const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')

const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

const contenedorTarjetas = document.getElementById('contenedor-de-tarjetas')
const contenedorAtaques = document.getElementById('contenedor-ataques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []
let opcionDeMokepones
let opcionDeAtaques
let inputHipodoge
let inputCapipepo
let inputRatigueya
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let ataquesMokeponEnemigo = []
let mascotaJugador
let mascotaJugadorObjeto
let ataqueJugador = []
let ataqueEnemigo = []
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext('2d')
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'

 //Asi se crean clases
class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, x = 10, y = 10) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida 
        this.ataques = []
        this.x = x
        this.y = y
        this.ancho = 40
        this.alto = 40
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto    
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')

let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')

let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')

let hipodogeEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', 100, 220)

let capipepoEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png', 250, 155)

let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', 400, 190)

//Asi se crean arreglos (arrays)

hipodoge.ataques.push(
    { nombre: '💦 CHORRITO', id: 'boton-agua'},
    { nombre: '💦 LLUVIA DORADA', id: 'boton-agua'},
    { nombre: '💦 HIDROKABUM', id: 'boton-agua'},
    { nombre: '🔥 LANZALLAMAS 3000', id: 'boton-fuego'},
    { nombre: '🌱 CULOTEMBLOR', id: 'boton-tierra'}
)

capipepo.ataques.push(
    { nombre: '🌱 CULOTEMBLOR', id: 'boton-tierra'},
    { nombre: '🌱 PUTAZO LODO', id: 'boton-tierra'},
    { nombre: '🌱 PERREMOTO', id: 'boton-tierra'},
    { nombre: '🔥 RUEDITA DE FUEGO', id: 'boton-fuego'},
    { nombre: '💦 CHORRITO', id: 'boton-agua'}
)

ratigueya.ataques.push(
    { nombre: '🔥 LANZALLAMAS 3000', id: 'boton-fuego'},
    { nombre: '🔥 COLMILLITO IGNEO', id: 'boton-fuego'},
    { nombre: '🔥 RUEDITA DE FUEGO', id: 'boton-fuego'},
    { nombre: '🌱 PERREMOTO', id: 'boton-tierra'},
    { nombre: '💦 HIDROKABUM', id: 'boton-agua'}
)

mokepones.push(hipodoge,capipepo,ratigueya)


function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
                <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                    <p>${mokepon.nombre}</p>
                    <img src=${mokepon.foto} alt=${mokepon.nombre}>
                </label>
                `

        contenedorTarjetas.innerHTML += opcionDeMokepones
        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)


    
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display = 'none'
    // sectionSeleccionarAtaque.style.display = 'flex'
    
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert('Selecciona una mascota')
    }

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }

    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataques) => {
        opcionDeAtaques = `
        <button id="${ataques.id}" class="boton-de-ataque BAtaque">${ataques.nombre}</button>
        `

        contenedorAtaques.innerHTML += opcionDeAtaques

    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')

}

function secuenciaAtaques() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {

            if (e.target.textContent === '🔥 LANZALLAMAS 3000' || e.target.textContent === '🔥 RUEDITA DE FUEGO' || e.target.textContent === '🔥 COLMILLITO IGNEO') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if (e.target.textContent === '💦 CHORRITO' || e.target.textContent === '💦 LLUVIA DORADA' || e.target.textContent === '💦 HIDROKABUM') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()    

        })
    })
}



//esta es otra manera mas facil de poner el numero aleatorio entre los mokepones

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0,mokepones.length -1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaques()
}

function ataqueAleatorioEnemigo() {

    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
        }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
        botonFuego.disabled = true
        botonAgua.disabled = true
        botonTierra.disabled = true
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador [jugador]
    indexAtaqueEnemigo = ataqueEnemigo [enemigo]
}

function combate() {

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo [index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA') {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO') {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA') {
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else{
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo ++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
        revisarVidas()
    }
    
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("EMPATE!")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('Felicidades, GANASTE!')
    } else {
        crearMensajeFinal('Lo siento, PERDISTE! :(')
    }
}

function crearMensaje(resultado) {
    
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    
    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
}


function moverCapipepoArriba() {
    mascotaJugadorObjeto.velocidadY = - 5
}
function moverCapipepoAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}
function moverCapipepoIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}
function moverCapipepoDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function presionTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverCapipepoArriba()
            break
        case 'ArrowDown':
            moverCapipepoAbajo()
            break
        case 'ArrowLeft':
            moverCapipepoIzquierda()
            break
        case 'ArrowRight':
            moverCapipepoDerecha()
            break 
        default:
            break;
    }
}

function iniciarMapa() {
    mapa.width = 600
    mapa.height = 400
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', presionTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }

}


window.addEventListener('load', iniciarJuego)