// ================= VARIÁVEIS GLOBAIS =================
let encomendas = JSON.parse(localStorage.getItem('encomendas')) || [];
let selecionadaId = null;
let canvas, ctx, desenhando = false;

// ================= AGENDA DE MORADORES =================
const agendaMoradores = {
    "Gate002": "11994392466", "Gate004": "11958649090", "Gate007": "11958649090",
    "Gate101": "11979861261", "Gate102": "11915568088", "Gate103": "11915568088",
    "Gate104": "11971556999", "Gate105": "11971556999", "Gate106": "11988132624",
    "Gate107": "11969715269", "Gate121": "11969715269", "Gate123": "11993498721",
    "Gate124": "11914217088", "Gate125": "11914217088", "Gate126": "11940057497",
    "Gate202": "11955303530", "Gate204": "11985918864", "Gate209": "11953472717",
    "Gate210": "11988067671", "Gate211": "11988067671", "Gate215": "11972277072",
    "Gate216": "11972277072", "Gate218": "11949380908", "Gate219": "11981069977",
    "Gate220": "11988051513", "Gate223": "11949380908", "Gate224": "11981870451",
    "Gate225": "11981870451", "Gate226": "11981840136", "Gate302": "11942103456",
    "Gate304": "11910101213", "Gate305": "11993613117", "Gate307": "11993371621",
    "Gate308": "11993371621", "Gate310": "11987413211", "Gate311": "11987413211",
    "Gate315": "11977452000", "Gate319": "11912795347", "Gate323": "11912795347",
    "Gate324": "11954488602", "Gate325": "11954488602", "Gate326": "11986727868",
    "Gate401": "11994500123", "Gate402": "11984141218", "Gate405": "11972079173",
    "Gate407": "11916991214", "Gate413": "11946093516", "Gate414": "11998636282",
    "Gate417": "11964420087", "Gate418": "11976711191", "Gate419": "11976711191",
    "Gate421": "11972079173", "Gate422": "11940728668", "Gate423": "11968799892",
    "Gate424": "11999743530", "Gate426": "11963232040", "Gate502": "11984887067",
    "Gate503": "11998592019", "Gate506": "11956800426", "Gate507": "11983156104",
    "Gate508": "11983156104", "Gate510": "11972079173", "Gate512": "11972079173",
    "Gate513": "11948286001", "Gate514": "11994781574", "Gate517": "11995971657",
    "Gate518": "11973637104", "Gate519": "11997163229", "Gate521": "11997863040",
    "Gate522": "11997863040", "Gate525": "11997163229", "Gate526": "11999002106",
    "Gate601": "11998384626", "Gate602": "11914849424", "Gate603": "11989478750",
    "Gate604": "11940502054", "Gate605": "11940394433", "Gate606": "11984323889",
    "Gate608": "11989698757", "Gate610": "11981559223", "Gate611": "11983104658",
    "Gate612": "11983104658", "Gate615": "11999555858", "Gate617": "11991154362",
    "Gate618": "11991154362", "Gate619": "11987013176", "Gate620": "11987013176",
    "Gate621": "11987013176", "Gate622": "11987013176", "Gate625": "11953125020",
    "Gate626": "11959561324", "Gate701": "11945983290", "Gate702": "11945983290",
    "Gate704": "11975277222", "Gate705": "11982694905", "Gate707": "11974442284",
    "Gate708": "11963097450", "Gate709": "11982008880", "Gate710": "11962021731",
    "Gate712": "11983539111", "Gate713": "11945551623", "Gate714": "11940091219",
    "Way1505": "11912838165", "Way1507": "11947502427",
};

// ================= INICIALIZAÇÃO =================
window.onload = () => {
    atualizarDashboard();
    renderizarTabela();
    document.getElementById('sala').addEventListener('input', buscarContatoAutomatico);
    document.getElementById('torre').addEventListener('change', buscarContatoAutomatico);
};

// ================= APOIO =================
function buscarContatoAutomatico() {
    const torre = document.getElementById('torre').value;
    const sala = document.getElementById('sala').value.trim();
    const campoTelefone = document.getElementById('telefone');
    const chave = torre + sala;
    if (agendaMoradores[chave]) {
        campoTelefone.value = agendaMoradores[chave];
        campoTelefone.style.backgroundColor = "#e8f5e9";
    } else {
        campoTelefone.style.backgroundColor = "";
    }
}

function salvarEAtualizar() {
    localStorage.setItem('encomendas', JSON.stringify(encomendas));
    atualizarDashboard();
    renderizarTabela();
}

function atualizarDashboard() {
    const hoje = new Date().toLocaleDateString('pt-BR');
    document.getElementById('dashTotal').innerText = encomendas.filter(e => e.data === hoje).length;
    document.getElementById('dashAguardando').innerText = encomendas.filter(e => e.status === 'Aguardando retirada').length;
    document.getElementById('dashRetirados').innerText = encomendas.filter(e => e.status === 'Retirado').length;
}

// ================= FLUXO WHATSAPP =================
function enviarZap(item, tipo) {
    if (!item.telefone) return;
    const tel = item.telefone.replace(/\D/g, '');
    let msg = "";
    
    if (tipo === 'chegada') {
        msg = `Olá, *${item.destinatario}*! 📦\nSua encomenda (NF: *${item.nf}*) chegou na Portaria.\n*Sala ${item.sala}* (${item.torre}).`;
    } else {
        msg = `✅ *Confirmação de Retirada*\nOlá, *${item.destinatario}*!\nSua encomenda (NF: *${item.nf}*) foi retirada por *${item.quemRetirou}* em ${item.dataRetirada}.`;
    }
    
    window.open(`https://api.whatsapp.com/send?phone=55${tel}&text=${encodeURIComponent(msg)}`, '_blank');
}

// ================= CADASTRO =================
document.getElementById('formRecebimento').addEventListener('submit', function(e) {
    e.preventDefault();
    const nova = {
        id: Date.now(),
        nf: document.getElementById('notaFiscal').value,
        torre: document.getElementById('torre').value,
        sala: document.getElementById('sala').value,
        destinatario: document.getElementById('destinatario').value,
        telefone: document.getElementById('telefone').value,
        data: new Date().toLocaleDateString('pt-BR'),
        status: 'Aguardando retirada',
        quemRetirou: '',
        dataRetirada: '',
        assinatura: ''
    };
    encomendas.push(nova);
    salvarEAtualizar();
    enviarZap(nova, 'chegada'); // Envio automático no cadastro
    this.reset();
});

// ================= TABELA E ORDENAÇÃO =================
function renderizarTabela(dados = encomendas) {
    const corpo = document.getElementById('listaCorpo');
    if (!corpo) return;
    corpo.innerHTML = '';

    // ORDEM: Data Crescente -> Sala Crescente
    const ordenados = [...dados].sort((a, b) => {
        const dataA = a.data.split('/').reverse().join('');
        const dataB = b.data.split('/').reverse().join('');
        if (dataA !== dataB) return dataA.localeCompare(dataB);
        
        const salaA = parseInt(a.sala.replace(/\D/g, '')) || 0;
        const salaB = parseInt(b.sala.replace(/\D/g, '')) || 0;
        return salaA - salaB;
    });

    ordenados.forEach(item => {
        const tr = document.createElement('tr');
        tr.onclick = (e) => { if (e.target.tagName !== 'BUTTON') selecionarUnica(item.id); };
        tr.innerHTML = `
            <td>${item.data}</td>
            <td>${item.nf}</td>
            <td style="font-weight:bold; color:#2563eb;">${item.sala}</td>
            <td>${item.destinatario}</td>
            <td style="font-weight:bold; color:${item.status === 'Retirado' ? 'green' : '#f59e0b'}">${item.status}</td>
            <td>
                <button onclick="event.stopPropagation(); editarRegistro(${item.id})">✏️</button>
                <button onclick="event.stopPropagation(); apagar(${item.id})">🗑️</button>
            </td>
        `;
        corpo.appendChild(tr);
    });
}

// ================= FILTROS =================
function aplicarFiltros() {
    const fSala = document.getElementById('filtroSala').value.toLowerCase();
    const fNome = document.getElementById('filtroNome').value.toLowerCase();
    const fNF = document.getElementById('filtroNF').value.toLowerCase();
    const fStatus = document.getElementById('filtroStatus').value;

    const filtrados = encomendas.filter(e => 
        (fSala === "" || e.sala.toLowerCase().includes(fSala)) &&
        (fNome === "" || e.destinatario.toLowerCase().includes(fNome)) &&
        (fNF === "" || e.nf.toLowerCase().includes(fNF)) &&
        (fStatus === "" || e.status === fStatus)
    );
    
    renderizarTabela(filtrados);
    // Se houver resultados, seleciona automaticamente o primeiro para o Detalhes
    if (filtrados.length > 0) selecionarUnica(filtrados[0].id);
}

function visualizarTudo() {
    document.getElementById('filtroSala').value = "";
    document.getElementById('filtroNome').value = "";
    document.getElementById('filtroNF').value = "";
    document.getElementById('filtroStatus').value = "";
    renderizarTabela(encomendas);
}

// ================= DETALHES E SELEÇÃO =================
function selecionarUnica(id) {
    selecionadaId = id;
    const item = encomendas.find(e => e.id === id);
    if (!item) return;
    
    document.getElementById('resultadoConteudo').innerHTML = `
        <div style="border-left:5px solid #2563eb; background:#fff; padding:15px; border-radius:8px;">
            <p><strong>NF:</strong> ${item.nf} | <strong>Sala:</strong> ${item.sala}</p>
            <p><strong>Destinatário:</strong> ${item.destinatario}</p>
            <p><strong>Status:</strong> ${item.status}</p>
            ${item.status === 'Aguardando retirada' ? 
                `<button onclick="avisarZapManual(${item.id})" style="background:#25d366; color:white; border:none; padding:10px; width:100%; border-radius:5px; font-weight:bold; cursor:pointer;">Reenviar Aviso</button>` : 
                `<p style="color:green;">✅ Retirado por ${item.quemRetirou} em ${item.dataRetirada}</p>`
            }
        </div>
    `;

    const blocoR = document.getElementById('blocoConfirmarRetirada');
    if (item.status === 'Aguardando retirada') {
        blocoR.style.display = 'block';
        setTimeout(configurarCanvas, 100);
    } else {
        blocoR.style.display = 'none';
    }
}

function avisarZapManual(id) {
    const item = encomendas.find(e => e.id === id);
    enviarZap(item, 'chegada');
}

// ================= FINALIZAÇÃO E ASSINATURA =================
function configurarCanvas() {
    canvas = document.getElementById('canvasAssinatura');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";

    const getPos = (e) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const start = (e) => { desenhando = true; ctx.beginPath(); const p = getPos(e); ctx.moveTo(p.x, p.y); };
    const move = (e) => { if(!desenhando) return; const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); e.preventDefault(); };
    const stop = () => { desenhando = false; };

    canvas.onmousedown = start; canvas.onmousemove = move; window.onmouseup = stop;
    canvas.ontouchstart = start; canvas.ontouchmove = move; canvas.ontouchend = stop;
}

function finalizarEntrega() {
    const nome = document.getElementById('nomeRec').value;
    if(!nome) return alert("Quem está retirando?");
    
    const index = encomendas.findIndex(e => e.id === selecionadaId);
    if (index === -1) return;

    encomendas[index].status = 'Retirado';
    encomendas[index].quemRetirou = nome;
    encomendas[index].dataRetirada = new Date().toLocaleString('pt-BR');
    encomendas[index].assinatura = canvas.toDataURL();

    salvarEAtualizar();
    enviarZap(encomendas[index], 'retirada'); // Envio automático na retirada
    
    document.getElementById('nomeRec').value = "";
    document.getElementById('blocoConfirmarRetirada').style.display = 'none';
    alert("Retirada concluída e WhatsApp enviado!");
}

function limparAssinatura() { ctx.clearRect(0, 0, canvas.width, canvas.height); }

// ================= GESTÃO DE REGISTROS =================
function apagar(id) {
    if(confirm("Excluir registro?")) {
        encomendas = encomendas.filter(e => e.id !== id);
        salvarEAtualizar();
        document.getElementById('resultadoConteudo').innerHTML = '<p class="placeholder-text">Clique em uma nota.</p>';
        document.getElementById('blocoConfirmarRetirada').style.display = 'none';
    }
}

function editarRegistro(id) {
    const item = encomendas.find(e => e.id === id);
    if(!item) return;
    const novaNF = prompt("Nova NF:", item.nf);
    if(novaNF !== null) { item.nf = novaNF; salvarEAtualizar(); }
}

function exportarCSV() {
    if(encomendas.length === 0) return alert("Nada para exportar.");
    let csv = "\uFEFFData;NF;Torre;Sala;Destinatario;Status;Quem Retirou;Data Retirada\n";
    encomendas.forEach(e => {
        csv += `${e.data};${e.nf};${e.torre};${e.sala};${e.destinatario};${e.status};${e.quemRetirou};${e.dataRetirada}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `relatorio_${new Date().toLocaleDateString()}.csv`;
    link.click();
}