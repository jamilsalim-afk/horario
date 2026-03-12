async function lerArquivo(file){

    return new Promise((resolve,reject)=>{

        const reader = new FileReader()

        reader.onload = e => resolve(e.target.result)

        reader.readAsText(file)

    })

}

async function carregarArquivos(){

    const f1 = document.getElementById("disciplinas").files[0]
    const f2 = document.getElementById("professores").files[0]
    const f3 = document.getElementById("turmas").files[0]

    const csv1 = await lerArquivo(f1)
    const csv2 = await lerArquivo(f2)
    const csv3 = await lerArquivo(f3)

    carregarDisciplinas(csv1)
    carregarRestricoesProfessor(csv2)
    carregarRestricoesTurma(csv3)

    alert("Dados carregados!")

}
