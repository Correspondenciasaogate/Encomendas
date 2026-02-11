// ================= VARIÁVEIS GLOBAIS =================
let encomendas = JSON.parse(localStorage.getItem('encomendas')) || [];
let selecionadaId = null;
let canvas, ctx, desenhando = false;

// ================= AGENDA DE MORADORES =================
const agendaMoradores = {
    "Gate002": "11994392466",
    "Gate004": "11958649090",
    "Gate007": "11958649090",
    "Gate101": "11979861261",
    "Gate102": "11915568088",
    "Gate103": "11915568088",
    "Gate104": "11971556999",
    "Gate105": "11971556999",
    "Gate106": "11988132624",
    "Gate107": "11969715269",
    "Gate121": "11969715269",
    "Gate123": "11993498721",
    "Gate124": "11914217088",
    "Gate125": "11914217088",
    "Gate126": "11940057497",
    "Gate202": "11955303530",
    "Gate204": "11985918864",
    "Gate209": "11953472717",
    "Gate210": "11988067671",
    "Gate211": "11988067671",
    "Gate215": "11972277072",
    "Gate216": "11972277072",
    "Gate218": "11949380908",   
    "Gate219": "11981069977",
    "Gate220": "11988051513",
    "Gate223": "11949380908",
    "Gate224": "11981870451",
    "Gate225": "11981870451",
    "Gate226": "11981840136",
    "Gate302": "11942103456",
    "Gate304": "11910101213",
    "Gate305": "11993613117",
    "Gate307": "11993371621",
    "Gate308": "11993371621",
    "Gate310": "11987413211",
    "Gate311": "11987413211",
    "Gate315": "11977452000",
    "Gate319": "11912795347",
    "Gate323": "11912795347",
    "Gate324": "11954488602",
    "Gate325": "11954488602",
    "Gate326": "11986727868",
    "Gate401": "11994500123",
    "Gate402": "11984141218",
    "Gate405": "11972079173", 
    "Gate407": "11916991214",
    "Gate413": "11946093516",
    "Gate414": "11998636282",
    "Gate417": "11964420087",
    "Gate418": "11976711191",
    "Gate419": "11976711191",
    "Gate421": "11972079173",
    "Gate422": "11940728668",
    "Gate423": "11968799892",
    "Gate424": "11999743530",
    "Gate426": "11963232040",
    "Gate502": "11984887067",
    "Gate503": "11998592019",
    "Gate506": "11956800426",
    "Gate507": "11983156104",
    "Gate508": "11983156104",
    "Gate510": "11972079173",
    "Gate512": "11972079173",
    "Gate513": "11948286001",
    "Gate514": "11994781574",
    "Gate517": "11995971657",
    "Gate518": "11973637104",
    "Gate519": "11997163229",
    "Gate521": "11997863040",
    "Gate522": "11997863040",
    "Gate525": "11997163229",
    "Gate526": "11999002106",
    "Gate601": "11998384626",
    "Gate602": "11914849424",
    "Gate603": "11989478750",
    "Gate604": "11940502054",
    "Gate605": "11940394433",
    "Gate606": "11984323889",
    "Gate608": "11989698757",
    "Gate610": "11981559223",
    "Gate611": "11983104658",
    "Gate612": "11983104658",
    "Gate615": "11999555858",
    "Gate617": "11991154362",
    "Gate618": "11991154362",
    "Gate619": "11987013176",
    "Gate620": "11987013176",
    "Gate621": "11987013176",
    "Gate622": "11987013176",
    "Gate625": "11953125020",
    "Gate626": "11959561324",
    "Gate701": "11945983290",
    "Gate702": "11945983290",
    "Gate704": "11975277222",
    "Gate705": "11982694905",
    "Gate707": "11974442284",
    "Gate708": "11963097450",
    "Gate709": "11982008880",
    "Gate710": "11962021731",
    "Gate712": "11983539111",
    "Gate713": "11945551623",
    "Gate714": "11940091219",
    "Gate715": "11945778383",
    "Gate716": "11986321220",
    "Gate717": "11992136352",
    "Gate718": "11992136352",
    "Gate719": "11985355735",
    "Gate721": "11992445575",
    "Gate722": "11992136352",
    "Gate726": "11992136352",
    "Gate801": "11971773002",
    "Gate802": "11982084119",
    "Gate803": "11999378520",
    "Gate804": "11999378520",
    "Gate805": "11919998392",
    "Gate808": "11937079090",
    "Gate809": "11937079090",
    "Gate813": "11943023232",
    "Gate814": "11943023232",
    "Gate815": "11982490284",
    "Gate816": "11947425053",
    "Gate819": "11944509481",
    "Gate820": "11944509481",
    "Gate821": "11944509481",
    "Gate822": "11992414539",
    "Gate823": "11995529248",
    "Gate901": "11942253338",
    "Gate902": "11993062995",
    "Gate903": "11966232691",
    "Gate904": "11971917184",
    "Gate905": "11942090332",
    "Gate907": "11950400353",
    "Gate913": "11995348108",
    "Gate914": "11995348108",
    "Gate915": "11995348108",
    "Gate916": "11998592019",
    "Gate917": "11998592019",
    "Gate918": "11998592019",
    "Gate919": "11984261996",
    "Gate920": "11981638512",
    "Gate921": "11981638512",
    "Gate922": "11966177018",
    "Gate923": "11966177018",
    "Gate924": "11966346952",
    "Gate925": "11941903103",
    "Gate926": "11981081245",
    "Gate1001": "11984479820",
    "Gate1002": "11986970186",
    "Gate1003": "11912758090",
    "Gate1004": "11947089976",
    "Gate1005": "11999054195",
    "Gate1007": "11997056816",
    "Gate1008": "11982660283",
    "Gate1009": "11982660283",
    "Gate1010": "11998231391",
    "Gate1012": "11988406990",
    "Gate1014": "11994118788",
    "Gate1022": "11985863922",
    "Gate1023": "11985863922",
    "Gate1024": "11981957063",
    "Gate1025": "11970739076",
    "Gate1101": "11973781626",
    "Gate1102": "11948394992",
    "Gate1104": "11999258982",
    "Gate1105": "11992136352",
    "Gate1106": "11992136352",
    "Gate1107": "11943668324",
    "Gate1108": "11943668324",
    "Gate1110": "11971507476",
    "Gate1112": "11940277289",
    "Gate1113": "11943123167",
    "Gate1114": "1120609991",
    "Gate1115": "1120609991",
    "Gate1116": "1120609991",
    "Gate1117": "1120609991",
    "Gate1118": "1120609991",
    "Gate1119": "1120609991",
    "Gate1120": "1120609991",
    "Gate1121": "1120609991",
    "Gate1122": "11940611428",
    "Gate1123": "11940611428",
    "Gate1124": "11940611428",
    "Gate1125": "11940611428",
    "Gate1126": "11940611428",
    "Gate1203": "11993850978",
    "Gate1204": "11993850978",
    "Gate1205": "11996227252",
    "Gate1207": "11963570835",
    "Gate1208": "11963570835",
    "Gate1209": "1155558872",
    "Gate1210": "1155558872",
    "Gate1211": "1155558872",
    "Gate1212": "1155558872",
    "Gate1213": "1155558872",
    "Gate1214": "1155558872",
    "Gate1215": "1155558872",
    "Gate1216": "1155558872",
    "Gate1222": "11981289538",
    "Gate1223": "11986967125",
    "Gate1224": "11986967125",
    "Gate1225": "11986967125",
    "Gate1226": "11912984074",
    "Gate1301": "11982887452",
    "Gate1302": "11982887452",
    "Gate1303": "11982887452",
    "Gate1304": "11982887452",
    "Gate1306": "11963490073",
    "Gate1307": "11960211124",
    "Gate1308": "11960211124",
    "Gate1309": "11951178978",
    "Gate1310": "11963587730",
    "Gate1311": "11963587730",
    "Gate1312": "11992906300",
    "Gate1313": "11992906300",
    "Gate1317": "11943482759",
    "Gate1318": "11943482759",
    "Gate1319": "11916270842",
    "Gate1320": "11976407877",
    "Gate1322": "11998938372",
    "Gate1323": "11998938372",
    "Gate1324": "11998938372",
    "Gate1325": "11943280317",
    "Gate1326": "11943280317",
    "Gate1403": "11916270842",
    "Gate1404": "11916270842",
    "Gate1407": "11942764856",
    "Gate1408": "11942764856",
    "Gate1409": "11942764856",
    "Gate1410": "11942764856"	,
    "Gate1411": "11942764856",
    "Gate1412": "11942764856",
    "Gate1415": "11983570675",
    "Gate1418": "11977109839",
    "Gate1419": "11977109839",
    "Gate1420": "11977109839",
    "Gate1422": "11917365825",
    "Gate1423": "11917365825",
    "Gate1424": "11982000174",
    "Gate1425": "11982000174",
    "Gate1501": "11962186775",
    "Gate1503": "11991487883",
    "Gate1504": "11991487883",
    "Gate1505": "11945205453",
    "Gate1506": "11945205453",
    "Gate1507": "11943482759",
    "Gate1508": "11943482759",
    "Gate1509": "11943482759",
    "Gate1510": "11943482759",
    "Gate1511": "11943482759",
    "Gate1512": "11943482759",
    "Gate1513": "11943482759",
    "Gate1514": "11943482759",
    "Gate1515": "1120609991",
    "Gate1516": "1120609991",
    "Gate1517": "1120609991",
    "Gate1518": "11953310000",
    "Gate1519": "11991542993",
    "Gate1520": "11992611390",
    "Gate1521": "11992611390",
    "Gate1522": "11943842468",
    "Gate1523": "11943842468",
    "Gate1524": "11941901504",
    "Gate1525": "11941901504",
    "Way001": "11994766923",
    "Way101": "3598154110",
    "Way102": "11966584923",
    "Way105": "3598154110",
    "Way106": "3598154110",
    "Way107": "11964038896",
    "Way201": "11977268575",
    "Way202": "11984608870",
    "Way204": "11988978251",
    "Way205": "11993020196",
    "Way209": "11982881864",
    "Way210": "11974762455",
    "Way303": "11951758930",
    "Way304": "11951758930",
    "Way306": "11991122765",
    "Way310": "11989558176",
    "Way404": "11981144343",
    "Way406": "11995088059",
    "Way407": "11983317178",
    "Way409": "11916657894",
    "Way410": "11916657894",
    "Way501": "11952369167",
    "Way502": "11947779894",
    "Way503": "11992544441",
    "Way504": "11949640168",
    "Way505": "11969219628",
    "Way507": "11991991833",
    "Way508": "11976704835",
    "Way601": "11991317150",
    "Way604": "11952063684",
    "Way610": "11975776105",
    "Way701": "11952250080",
    "Way702": "11945079814",
    "Way707": "11945079814",
    "Way710": "11938006905",
    "Way801": "11940183228",
    "Way802": "11958313345",
    "Way804": "11958313345",
    "Way810": "11958313345",
    "Way901": "11977119335",
    "Way902": "11950666086",
    "Way903": "11950666086",
    "Way904": "11969219628",
    "Way905": "11941384840",
    "Way906": "11996019671",
    "Way907": "11996019671",
    "Way908": "11985006930",    
    "Way1001": "11993905617",
    "Way1005": "1135938483",
    "Way1006": "1135938483",
    "Way1010": "11940037132",
    "Way1101": "11958113536",
    "Way1104": "11997073515",
    "Way1105": "11997073515",
    "Way1106": "11997073515",
    "Way1107": "11997073515",
    "Way1110": "11958113536",
    "Way1201": "11979569039",
    "Way1202": "11993936531",
    "Way1205": "11983077846",
    "Way1206": "11988971195",
    "Way1208": "11933931917",
    "Way1302": "11989555962",
    "Way1303": "11975153885",
    "Way1306": "1142294029",
    "Way1307": "11937469366",
    "Way1310": "11953632530",
    "Way1401": "11942999009",
    "Way1403": "11941928289",
    "Way1404": "11994783019",
    "Way1405": "11963315000",
    "Way1406": "11989690868",
    "Way1409": "11989690868",
    "Way1501": "11941283021",
    "Way1502": "11950437885",
    "Way1503": "11973905126",
    "Way1504": "11973905126",
    "Way1505": "11912838165",
    "Way1507": "11947502427",
       

};

// ================= INICIALIZAÇÃO =================
window.onload = () => {
    renderizarTabela();
    atualizarDashboard();
    document.getElementById('sala').addEventListener('input', buscarContatoAutomatico);
    document.getElementById('torre').addEventListener('change', buscarContatoAutomatico);
};

// ================= FUNÇÕES DE APOIO =================
function salvarEAtualizar() {
    localStorage.setItem('encomendas', JSON.stringify(encomendas));
    renderizarTabela();
    atualizarDashboard();
}

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

function atualizarDashboard() {
    const hoje = new Date().toLocaleDateString('pt-BR');
    const tHoje = encomendas.filter(e => e.data === hoje).length;
    const tAguardando = encomendas.filter(e => e.status === 'Aguardando retirada').length;
    const tRetirados = encomendas.filter(e => e.status === 'Retirado').length;

    document.getElementById('dashTotal').innerText = tHoje;
    document.getElementById('dashAguardando').innerText = tAguardando;
    document.getElementById('dashRetirados').innerText = tRetirados;
}

// ================= WHATSAPP =================
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
    enviarZap(nova, 'chegada');
    this.reset();
});

// ================= FILTROS E TABELA =================
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
    if (filtrados.length > 0) selecionarUnica(filtrados[0].id);
}

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
                <button onclick="event.stopPropagation(); apagar(${item.id})">🗑️</button>
            </td>
        `;
        corpo.appendChild(tr);
    });
}

// ================= DETALHES E ASSINATURA =================
function selecionarUnica(id) {
    selecionadaId = id;
    const item = encomendas.find(e => e.id === id);
    if (!item) return;
    
    document.getElementById('resultadoConteudo').innerHTML = `
        <div style="border-left:5px solid #2563eb; background:#fff; padding:15px; border-radius:8px;">
            <p><strong>📦 NF:</strong> ${item.nf} | <strong>Sala:</strong> ${item.sala}</p>
            <p><strong>👤 Nome:</strong> ${item.destinatario}</p>
            <p><strong>🚩 Status:</strong> ${item.status}</p>
            ${item.status === 'Retirado' ? `
                <div style="margin-top:10px; border-top:1px solid #eee; padding-top:10px;">
                    <p style="color:green">✅ Retirado por: ${item.quemRetirou}</p>
                    <p><small>${item.dataRetirada}</small></p>
                    <p><strong>Assinatura:</strong></p>
                    <img src="${item.assinatura}" style="width:100%; border:1px solid #ddd; background:#fff;" />
                </div>
            ` : `
                <button onclick="enviarZapManual(${item.id})" style="background:#25d366; color:white; border:none; padding:10px; width:100%; border-radius:5px; cursor:pointer; margin-top:10px;">Reenviar Aviso</button>
            `}
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

function configurarCanvas() {
    canvas = document.getElementById('canvasAssinatura');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";

    const getPos = (e) => {
        const rect = canvas.getBoundingClientRect();
        const cx = e.clientX || e.touches[0].clientX;
        const cy = e.clientY || e.touches[0].clientY;
        return { x: cx - rect.left, y: cy - rect.top };
    };

    canvas.onmousedown = (e) => { desenhando = true; ctx.beginPath(); const p = getPos(e); ctx.moveTo(p.x, p.y); };
    canvas.onmousemove = (e) => { if(desenhando) { const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); } };
    window.onmouseup = () => { desenhando = false; };
    
    canvas.ontouchstart = (e) => { desenhando = true; ctx.beginPath(); const p = getPos(e); ctx.moveTo(p.x, p.y); e.preventDefault(); };
    canvas.ontouchmove = (e) => { if(desenhando) { const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); } e.preventDefault(); };
    canvas.ontouchend = () => { desenhando = false; };
}

function finalizarEntrega() {
    const nome = document.getElementById('nomeRec').value;
    if(!nome) return alert("Quem está retirando?");
    
    const index = encomendas.findIndex(e => e.id === selecionadaId);
    
    // CORREÇÃO DO FUNDO PRETO: Criar um canvas temporário com fundo branco
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.fillStyle = "#ffffff";
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);

    encomendas[index].status = 'Retirado';
    encomendas[index].quemRetirou = nome;
    encomendas[index].dataRetirada = new Date().toLocaleString('pt-BR');
    encomendas[index].assinatura = tempCanvas.toDataURL('image/jpeg', 0.5);

    salvarEAtualizar();
    enviarZap(encomendas[index], 'retirada');
    
    document.getElementById('nomeRec').value = "";
    document.getElementById('blocoConfirmarRetirada').style.display = 'none';
    selecionarUnica(selecionadaId);
}

function limparAssinatura() { ctx.clearRect(0, 0, canvas.width, canvas.height); }

function enviarZapManual(id) { enviarZap(encomendas.find(e => e.id === id), 'chegada'); }

function visualizarTudo() {
    document.getElementById('filtroSala').value = "";
    document.getElementById('filtroNome').value = "";
    document.getElementById('filtroNF').value = "";
    document.getElementById('filtroStatus').value = "";
    renderizarTabela(encomendas);
}

function apagar(id) {
    if(confirm("Excluir?")) {
        encomendas = encomendas.filter(e => e.id !== id);
        salvarEAtualizar();
        document.getElementById('resultadoConteudo').innerHTML = '';
        document.getElementById('blocoConfirmarRetirada').style.display = 'none';
    }
}