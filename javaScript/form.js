
//Manejo del Form

// --> Variables
const precio = 200
let tickets = null
let categoria = null
let total = null

const categorias = {
    0: {
        porcentaje: 80,
        valor: '0'
    },
    1: {
        porcentaje: 50,
        valor: '1'
    },
    2: {
        porcentaje: 15,
        valor: '2'
    }
}

// --> Elementos del DOM
const form = document.forms.formulario
const inputs = form.getElementsByTagName('input')
const select = form.getElementsByTagName('select')[0]

const totalTag = document.getElementById('total')
const btnBorrar = document.getElementById('btnBorrar') 
const btnEnviar = document.getElementById('btnEnviar')

// --> Configuracion del Form




// --> Funciones del Form

const totalPrice = () => {

    if(!tickets || !categoria) return;
    const totalValue = precio * tickets
    const descuento = (totalValue / 100) * categorias[categoria].porcentaje
    total = totalValue - descuento
    totalTag.innerText += `${total} pesos`
}

totalPrice()

// --> Eventos del Form

const reset = (e) => {
    e.preventDefault()

    for (let input of inputs){
        input.value = ""
    }
    select.value = 'none'

    resetCategory()
}

const submit = (e) => {
    e.preventDefault()

    const {nombre, apellido, email, tickets, categoria} = form

    const verified = {
        nombre: nombre.value !== '',
        apellido: apellido.value !== '',
        email: email.value.includes('@'),
        tickets: tickets.value > 0,
        categoria: categoria.value !== 'none'
    }
    const values = Object.values(verified)
    const submitAccepted = values.every(value => value)
    submitAccepted ? location.href = '/enviado.html' : alert("Necesitas completar todos los campos correctamente")
}

const resetCategory = () => {
    total = null
    selected = null
    eventsAssignmentAll()
    totalTag.innerText += ""
}

const setCategory = (e) => {

    const option = e.target.value

    if(option === 'none'){
        resetCategory()
        return
    }

    categoria = option
    const index = categorias[categoria].valor
    const container = cardsContainer[index]

    selected = index
    changeColors(container, index)
    eventsAssignmentAll()

    totalPrice()
}

const setTickets = (e) => {
    const {value} = e.target

    if(value < 0 || isNaN(value)){
      e.target.value = 0
      total = null
      return  
    }

    tickets = value
    totalPrice()
}

form.addEventListener('submit', submit)
form.categoria.addEventListener('change', setCategory)
form.tickets.addEventListener('change', setTickets)
form.tickets.addEventListener('keyup', setTickets)
btnBorrar.addEventListener('click', reset)