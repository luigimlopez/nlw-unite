let participantes = [
  {
    nome: "Luigi López",
    email: "luigizelo@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 23, 22, 00) 
  },
  {
    nome: "Pietra Mascarello",
    email: "pietramlopez@gmail.com",
    dataInscricao: new Date(2024, 3, 04, 05, 21),
    dataCheckIn: new Date(2024, 3, 07, 12, 18) 
  },
  {
    nome: "João Silva",
    email: "joaosilva@gmail.com",
    dataInscricao: new Date(2024, 1, 3, 15, 30),
    dataCheckIn: new Date(2024, 1, 15, 10, 45) 
  },
  {
    nome: "Maria Souza",
    email: "mariasouza@gmail.com",
    dataInscricao: new Date(2024, 0, 5, 08, 10),
    dataCheckIn: new Date(2024, 0, 10, 16, 25) 
  },
  {
    nome: "Pedro Costa",
    email: "pedrocosta@gmail.com",
    dataInscricao: new Date(2024, 1, 30, 14, 55),
    dataCheckIn: new Date(2024, 2, 22, 18, 30) 
  },
  {
    nome: "Ana Santos",
    email: "anasantos@gmail.com",
    dataInscricao: new Date(2024, 2, 20, 11, 40),
    dataCheckIn: new Date(2024, 2, 25, 09, 15) 
  },
  {
    nome: "Carlos Oliveira",
    email: "carlosoliveira@gmail.com",
    dataInscricao: new Date(2024, 0, 15, 17, 20),
    dataCheckIn: new Date(2024, 1, 20, 20, 10) 
  },
  {
    nome: "Mariana Pereira",
    email: "marianapereira@gmail.com",
    dataInscricao: new Date(2024, 1, 8, 09, 45),
    dataCheckIn: new Date(2024, 2, 02, 14, 55) 
  },
  {
    nome: "Rafael Fernandes",
    email: "rafaelfernandes@gmail.com",
    dataInscricao: new Date(2024, 1, 3, 13, 15),
    dataCheckIn: new Date(2024, 2, 08, 10, 20) 
  },
  {
    nome: "Juliana Santos",
    email: "julianasantos@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 20, 30),
    dataCheckIn: new Date(2024, 2, 31, 08, 40) 
  }
];


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button 
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }
  
  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }
  
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
    
  )

  if(participanteExiste) {
    alert('Email ja cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""

}

const fazerCheckIn = (event) => {

  const mensagemConfirmacao = 'Tem certeza que deseja fazer check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  participante.dataCheckIn = new Date()

  atualizarLista(participantes) 
}


