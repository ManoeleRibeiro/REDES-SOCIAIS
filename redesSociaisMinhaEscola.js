import { criarGrafico, getCSS, incluirTexto } from "./common.js"

async function redesSociaisMinhaEscola() {
    const dadosLocaisString = localStorage.getItem('respostaRedesSociais')
    if (dadosLocaisString) {
        const dadosLocais = JSON.parse(dadosLocaisString)
        processarDados(dadosLocais)
    } else {
        const url = 'https://script.googleusercontent.com/a/macros/escola.pr.gov.br/echo?user_content_key=dc08tF-niHso-BYnZcovcrUTg1Imh2ufU9G2bJsRptD3oIQHDCzu03tusJjQ7txNdlw6sKo6OB93MykIUe8kK0ja-0wDhqabOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKBGCNaBo701naU8cM07sy4y4YFj_89rZFWs_9FzuMa_ctRLLSkTLlG7siCVXe8iT66gNj9W8BwtCxNJWkD4sw2_S8oMa1fV8SwSUtIUnGALUpid1X6QIdRpCVMY41jYEdcYZpTak_o22Q&lib=M5wr9lQB66GnDRgxs0KZxH-hZW63ph_q6'
        const res = await fetch(url)
        const dados = await res.json()
        localStorage.setItem('respostaRedesSociais', JSON.stringify(dados))
        processarDados(dados)
    }
}

function processarDados(dados) {
    const redesSociais = dados.slice(1).map(redes => redes[1])
    const contagemRedesSociais = redesSociais.reduce((acc, redesSociais) => {
        acc[redesSociais] = (acc[redesSociais] || 0) + 1
        return acc
    }, {})
    const valores = Object.values(contagemRedesSociais)
    const labels = Object.keys(contagemRedesSociais)

    const data = [
        {
            values: valores,
            labels: labels,
            type: 'pie',
            textinfo: 'label+percent'
        }
    ]

    const layout = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        height: 700,
        title: {
            text: 'Redes sociais que os alunos do BFA mais gostam (galera do 3°C):',
            x: 0,
            font: {
                color: getCSS('--primary-color'),
                family: getCSS('--font'),
                size: 30
            }
        },
        legend: {
            font: {
                color: getCSS('--primary-color'),
                size: 16
            }
        }
    }

    criarGrafico(data, layout)
    incluirTexto(`Como no mundo, a amostra de pessoas entrevistadas por mim, demonstra um apreço pelo <span>Whatsapp</span> em relação a outras redes.
        Pelo visto a galera curte mais as mensagens, viva a comunicação!`)
}

redesSociaisMinhaEscola()
