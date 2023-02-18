const form = document.getElementById('form-login')

const listaUsuarios = buscarDadosDoLocalStorage('Lista-Usuarios')
const feedbackLogin = document.getElementById("feedbackLogin")

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const inputSenha = document.getElementById('senha').value

    const inputemail = document.getElementById('email').value

    const usuarioLogado = listaUsuarios.find((valor) => valor.email === inputemail && valor.senha === inputSenha)

    if (usuarioLogado) {
        window.location.href = "./recados.html"
    } else {
        feedbackLogin.innerText = ("Senha/E-mail inválidos ou não existentes!")

        setTimeout(() => {
            feedbackLogin.innerText = ''
        }, 3000)
    }

    guardarNoLocalStorage('usuarioLogado', usuarioLogado)
})

const modalCadastro = new bootstrap.Modal('#modal-cadastrar')

const formularioHTML = document.getElementById('form-cadastro')

const feedbackHTML = window.document.getElementById('invalid-feedback')

formularioHTML.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const email = document.getElementById('email-novo-usuario').value;

    const senha = document.getElementById('senha-novo-usuario').value;

    const repetirSenha = document.getElementById('repetir-senha-novo-usuario').value;


    if (!email || !senha || !repetirSenha || !email.includes('@')) {
        feedbackHTML.innerText = ("Insira um email e senha validos. Tente novamente!")
        return
    }

    const verificaEmail = listaUsuarios.some((valor) => valor.email === email)

    if (verificaEmail) {
        feedbackHTML.innerText = ("Email ja cadastrado. Tente novamente!")

        setTimeout(() => {
            feedbackHTML.innerText = ''
        }, 2000)

        return;
    }

    if (senha !== repetirSenha) {
        feedbackHTML.innerText = ("As senhas precisam ser iguais. Tente novamente!")

        setTimeout(() => {
            feedbackHTML.innerText = ''
        }, 2000)

        return;
    }
    

    const novoCadastro = {
        email: email,
        senha: senha,
        recados: [],
    }

    listaUsuarios.push(novoCadastro)

    guardarNoLocalStorage('Lista-Usuarios', listaUsuarios)
    formularioHTML.reset()

    if (novoCadastro) {
        feedbackHTML.innerText = ("Conta criada!")
    }

    modalCadastro.hide()

})



function guardarNoLocalStorage(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));

}

function buscarDadosDoLocalStorage(chave) {
    const dadoJSON = localStorage.getItem(chave)

    if (dadoJSON) {
        const listaDados = JSON.parse(dadoJSON)
        return listaDados
    } else {
        return []
    }
}

