
//Manejo de las Cards

// --> Asignación de variables

let selected = null

// --> elementos del DOM
const cards = document.getElementsByClassName("card-body")
const cardsContainer = document.querySelectorAll(".btn.card")


// --> Configuración de las cards


// --> Funciones de las Cards

const colors = ["bg-0","bg-1","bg-2"]
const transparent = 'bg-transparent' 

const changeColors = (container, index, revert=false) => {
    const i = Number(index)
    revert 
        ? container.classList.replace(colors[i], transparent) 
        : container.classList.replace(transparent, colors[i])
}

const matchCategory = (selection) => {
    switch (selection) {
        case "0":
            form.categoria.value = 0
            break
        case "1":
            form.categoria.value = 1
            break
        case "2":
            form.categoria.value = 2
            break
        default:
            throw new Error('Algo paso en matchCategory', error)
    }
}

const cardEnter = (e) => {
    const {index} = e.target.dataset
    changeColors(e.target, index)  
}

const cardLeave = (e) => {
    const {index} = e.target.dataset
    changeColors(e.target, index, true)
    
}

const cardClick = (e) => {
    selected = e.currentTarget.dataset.index
    matchCategory(selected)
    eventsAssignmentAll()
}

// --> Eventos de las Cards

const eventCleaner = (container) => {
    container.removeEventListener('mouseenter', cardEnter)
    container.removeEventListener('mouseleave', cardLeave)
    container.removeEventListener('click', cardClick)
}

const eventAssignment = (container) => {
    container.addEventListener('mouseenter', cardEnter)
    container.addEventListener('mouseleave', cardLeave)
    container.addEventListener('click', cardClick)
}

const eventsAssignmentAll = () => {
    for (let container of cardsContainer){

        eventCleaner(container)

        const {index} = container.dataset

        if(index !== selected){
            eventAssignment(container)
            changeColors(container, index, true)
        }
    }
}

// --> Asignación de eventos
eventsAssignmentAll()
