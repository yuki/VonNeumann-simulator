/*
 *		Original code: Pedro Gutiérrez: [info@xitrus.es]
 *      Original Documentation: Noemi Navarro
 *      Modifications: Rubén Gómez [https://github.com/yuki]
 */



function $(id) { return (document.getElementById(id)); }

function _s(id) { return (document.getElementById('svg').getSVGDocument().getElementById(id)); }

function _t(id) { return (_s(id).textContent); }

function _c(id) { return parseInt(_s(id).textContent, 2); }

var LANG = localStorage.getItem("lang") || "es";
var filaSeleccionada = null;


// Wires and records that will be used
// Note: the wires are hidden at the beginning of each step
var WIRES = [
    "RDir-TD0", "RDir-TD1", "RDir-TD2", "RDir-TD3", "RDir-TD4", "RDir-TD5", "RDir-TD6", "RDir-TD7", "RDir-TD8",
    "RDir-TD9", "RDir-TD10", "RDir-TD11", "RDir-TD12", "RDir-TD13", "RDir-TD14", "RDir-TD15",
    "RDat-TD0", "RDat-TD1", "RDat-TD2", "RDat-TD3", "RDat-TD4", "RDat-TD5", "RDat-TD6", "RDat-TD7", "RDat-TD8",
    "RDat-TD9", "RDat-TD10", "RDat-TD11", "RDat-TD12", "RDat-TD13", "RDat-TD14", "RDat-TD15",
    "TD-RDat0", "TD-RDat1", "TD-RDat2", "TD-RDat3", "TD-RDat4", "TD-RDat5", "TD-RDat6", "TD-RDat7", "TD-RDat8",
    "TD-RDat9", "TD-RDat10", "TD-RDat11", "TD-RDat12", "TD-RDat13", "TD-RDat14", "TD-RDat15",
    "ALU-Acum", "Acum-RDat", "RDat-RIns", "RDat-REnt", "CPro-RDir", "CProInc",
    "RIns-RDir", "RIns-Deco",
];
var RECORDS = ["RIns", "CPro", "Deco", "REnt", "Acum", "RDir", "RDat"];

/*
 *	Instructions: 4 bits
 *	Note: negatives not allowed
 */
var ACTUAL = {};

var INSTRUCTIONS = [];
// Instructions without second operand (MOV, FINISH and the ones using only the acumulator)
var SPECIALS = ['0110', '0111', '1000', '1001', '1010', '1011', '1100', '1110']; 

// Función inicial (conseguir orden + función aritmética/lógica)
INSTRUCTIONS['init'] = [];
INSTRUCTIONS['init'][1] =
    function () { showWire('CPro-RDir'); changeContent('CPro', 'RDir'); };
INSTRUCTIONS['init'][2] =
    function () { showWire('CProInc'); changeSpecialContent('CPro', countIncrement()); };
INSTRUCTIONS['init'][3] =
    function () { showWire('RDir-TD' + _c('RDir')); };
INSTRUCTIONS['init'][4] =
    function () { showWire('TD-RDat' + _c('RDir')); changeContent('TD' + _c('RDir'), 'RDat'); };
INSTRUCTIONS['init'][5] =
    function () { showWire('RDat-RIns'); changeContent('RDat', 'RIns'); };
INSTRUCTIONS['init'][6] =
    function () { showWire('RIns-Deco'); changeDecoder(_t('RIns').substr(0, 4)); };
INSTRUCTIONS['init'][7] =
    function () {
        if (SPECIALS.indexOf(ACTUAL.ALU) != -1) {
            ACTUAL.step = 0;
            ACTUAL.inst = ACTUAL.ALU;
            nextStep();
        } else {
            showWire('RIns-RDir');
            changeSpecialContent('RDir', _t('RIns').substr(4, 4));
        }
    };
INSTRUCTIONS['init'][8] =
    function () { showWire('RDir-TD' + _c('RDir')); };
INSTRUCTIONS['init'][9] =
    function () { showWire('TD-RDat' + _c('RDir')); changeContent('TD' + _c('RDir'), 'RDat'); };
INSTRUCTIONS['init'][10] =
    function () { showWire('RDat-REnt'); changeContent('RDat', 'REnt'); };
INSTRUCTIONS['init'][11] =
    function () { showWire('ALU-Acum'); changeSpecialContent('Acum', runALU(ACTUAL.ALU)); };
INSTRUCTIONS['init'][12] =
    function () { init(); };

// From the acumulator to memory
INSTRUCTIONS['0110'] = [];
INSTRUCTIONS['0110'][1] =
    function () { showWire('RIns-RDir'); changeSpecialContent('RDir', _t('RIns').substr(4, 4)); };
INSTRUCTIONS['0110'][2] =
    function () { showWire('RDir-TD' + _c('RDir')); };
INSTRUCTIONS['0110'][3] =
    function () { showWire('RDir-TD' + _c('RDir')); showWire('Acum-RDat'); changeContent('Acum', 'RDat'); };
INSTRUCTIONS['0110'][4] =
    function () { showWire('RDat-TD' + _c('RDir')); showWire('RDir-TD' + _c('RDir')); TM[_c('RDir')] = _t('RDat'); setMemoryTable(); };
INSTRUCTIONS['0110'][5] =
    function () { init(); };

// Instruction to finish the program
INSTRUCTIONS['0111'] = [];
INSTRUCTIONS['0111'][1] =
    function () { changeSpecialContent('CPro', '1111'); nextDoc(); ACTUAL.inst = 'finished'; };

// Instructions NOT, INC, DEC, ROL, ROR and RST uses only the acumulator
INSTRUCTIONS['1000'] = INSTRUCTIONS['1001'] = INSTRUCTIONS['1010'] = INSTRUCTIONS['1011'] = INSTRUCTIONS['1100'] = INSTRUCTIONS['1110'] = [];
INSTRUCTIONS['1000'][1] = INSTRUCTIONS['1001'][1] = INSTRUCTIONS['1010'][1] = INSTRUCTIONS['1011'][1] = INSTRUCTIONS['1100'][1] = INSTRUCTIONS['1110'][1] =
    function () { showWire('Acum-RDat'); changeContent('Acum', 'RDat');};
INSTRUCTIONS['1000'][2] = INSTRUCTIONS['1001'][2] = INSTRUCTIONS['1010'][2] = INSTRUCTIONS['1011'][2] = INSTRUCTIONS['1100'][2] = INSTRUCTIONS['1110'][2] =
    function () { showWire('RDat-REnt'); changeContent('RDat', 'REnt'); };
INSTRUCTIONS['1000'][3] = INSTRUCTIONS['1001'][3] = INSTRUCTIONS['1010'][3] = INSTRUCTIONS['1011'][3] = INSTRUCTIONS['1100'][3] = INSTRUCTIONS['1110'][3] =
    function () {  showWire('ALU-Acum'); changeSpecialContent('Acum', runALU(ACTUAL.ALU)); };
INSTRUCTIONS['1000'][4] = INSTRUCTIONS['1001'][4] = INSTRUCTIONS['1010'][4] = INSTRUCTIONS['1011'][4] = INSTRUCTIONS['1100'][4] = INSTRUCTIONS['1110'][4] =
    function () { init(); };


// ALU's instructions
// Note: the input must be decimal (before the function call to _c)
var ALU = [];
ALU['0000'] = // ADD
    function (a, b) { return a + b; };
ALU['0001'] = // SUBSTRACT
    function (a, b) { return a - b; };
ALU['0010'] = // MULTIPLICATION
    function (a, b) { return a * b; };
ALU['0011'] = // EXPONENTIATION
    function (a, b) { return Math.pow(a, b); };
ALU['0100'] = // AND
    function (a, b) { return a & b; };
ALU['0101'] = // OR
    function (a, b) { return a | b; };
ALU['1000'] = // NOT
    function (a, b) { return 255-a; };
ALU['1001'] = // INC
    function (a, b) { return a+1; };
ALU['1010'] = // DEC
    function (a, b) { return a-1; };
ALU['1011'] = // ROL
    function (a, b) { return ((a << 1) | (a >> 7)) & 255; };
ALU['1100'] = // ROR
    function (a, b) { return ((a >> 1) | (a << 7)) & 255; };
ALU['1101'] = // XOR
    function (a, b) { return a ^ b; };
ALU['1110'] = // RST
    function (a, b) { return 0; };

// Decodificator's sign
var DECODER = new Map([
    ['0000','+'],
    ['0001','-'],
    ['0010','*'],
    ['0011','^'],
    ['0100','&'],
    ['0101','|'],
    ['0110','M'],
    ['0111','…'],
    ['1000','!'],
    ['1001','I'],
    ['1010','D'],
    ['1011','L'],
    ['1100','R'],
    ['1101','X'],
    ['1110','T'],
]);

// Credits
var ABOUT =
    '<span><a target="_blank" href="http://xitrus.es">Pedro Gutiérrez</a></span>: diseño y desarrollo del simulador <br>' +
    '<span>Noemi Navarro</span>: documentación de la ejecución <br>' +
    '<span><a target="_blank" href="https://github.com/yuki/">Rubén Gómez</a></a></span>: ampliación del set de instrucciones <br>'

///////////////////////////////////////////////////////////////////////////////////////////////////

function instructionTable() {
    // Tabla Instrucciones
    var tbody = document.querySelector("#tabla-instrucciones tbody");
    tbody.innerHTML = "";

    const instructions = TEXTOS[LANG].INFOINST;
    for (let i = 0; i < instructions.length; i++) {
        const fila = instructions[i];
        const tr = document.createElement("tr");
        tr.id = "inst_" + fila[0];
        tr.innerHTML = `
            <td>${fila[0]}</td>
            <td>${DECODER.get(fila[0])}</td>
            <td>${fila[1]}</td>
        `;
        tbody.appendChild(tr);
    }
}

function programSelector() {
    setText();
    // Botón ejecutar ejercicio
    btnEjecutar = document.getElementById("btnEjecutar");
    btnEjecutar.disabled = true;

    instructionTable();

    // Tabla Ejercicios
    tbody = document.querySelector("#tabla-ejercicios tbody");
    tbody.innerHTML = "";

    const exercises = TMT;
    for (let i = 0; i < exercises.length; i++) {
        const fila = exercises[i];
        const tr = document.createElement("tr");
        tr.id = "exercise_" + i;
        tr.innerHTML = `
            <td>${fila["tag"]}</td>
        `;
        tr.addEventListener("click", () => {
            //quitar la clase seleccionada de todas las filas, por si acaso
            document.querySelectorAll("#tabla-ejercicios tbody tr").forEach(f => f.classList.remove("seleccionada"));
            tr.classList.add("seleccionada");
            filaSeleccionada = tr;
            btnEjecutar.disabled = false;
        });
        tbody.appendChild(tr);
    }

    btnEjecutar.addEventListener('click', function() { runProgram(false); }, false);
    $('btnUpload').addEventListener('click', uploadProgram, false);
    $('info_b_a').addEventListener('click', about, false);
    const languageSelect = $('languageSelect');
    if (languageSelect) languageSelect.value = LANG;
};

function runProgram(uploaded) {
    console.log(uploaded);
    if (uploaded !== false) {
        TM = JSON.parse(uploaded).table;
    } else {
        var tmtNumber = filaSeleccionada.id.split("_")[1];
        TM = TMT[tmtNumber].table;
        $('title').textContent = TMT[tmtNumber].tag;
    }
    $('ejercicios').style.display = 'none';
    $('svg').classList.remove('hidden');
    init(true);
    $('info_b_r').style.display = 'inline-block';
    $('info_b_r').addEventListener('click',reset, false);
    $('info_b_c').style.display = 'inline-block';
    $('info_b_c').addEventListener('click', hideDoc, false);
    $('info_b_n').style.display = 'inline-block';
    $('info_b_n').addEventListener('click', buttonNextStep, false);
    addEventListener('keypress', keyPress, false);
    resetRecords();
};

function uploadProgram() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt';
    input.style.display = 'none';
    document.body.appendChild(input);

    input.addEventListener('change', function (e) {
        let file = e.target.files[0];
        if (!file) return;
        let reader = new FileReader();
        reader.onload = function (evt) {
            let content = evt.target.result;
            let lines = content.split(/\r?\n/);
            let isValid = lines.every(line => line.trim() === "" || /^[01]+$/.test(line.trim()));
            if (!isValid) {
                alert('Error: The file does not contain valid binary code');
                return;
            }
            let table = lines
                .filter(line => line.trim() !== "")
                .map(line => [line.trim()]);
            runProgram(JSON.stringify({ table }));
        };
        reader.readAsText(file);
    });

    input.click();
    document.body.removeChild(input);
};

function reset() {
    $('ejercicios').style.display = 'block';
    $('svg').classList.add('hidden');
    $('info').style.display = 'none';
    $('title').textContent = '';
    _s('Deco').textContent = '';
    document.querySelectorAll("#tabla-ejercicios tbody tr").forEach(f => f.classList.remove("seleccionada"));
    filaSeleccionada = null;
    btnEjecutar.disabled = true;
}

function setText() {
    instructionTable();
    $('btnEjecutar').innerHTML = TEXTOS[LANG].execute;
    $('btnUpload').innerHTML = TEXTOS[LANG].upload;
    $('info_b_a').innerHTML = TEXTOS[LANG].credits;
    $('info_b_c').innerHTML = TEXTOS[LANG].close;
    $('info_b_n').innerHTML = TEXTOS[LANG].next;
    $('info_b_r').innerHTML = TEXTOS[LANG].changeprogram;
    $('inst').innerHTML = TEXTOS[LANG].instruction;
    $('dir').innerHTML = TEXTOS[LANG].deco;
    $('comment').innerHTML = TEXTOS[LANG].comment;
    $('exercise').innerHTML = TEXTOS[LANG].exercise;
    if (ACTUAL.inst != 'finished' && ACTUAL.inst && ACTUAL.step) {
        $('info_cont').innerHTML = TEXTOS[LANG][ACTUAL.inst][ACTUAL.step-1].replace(/\*([^\*]+)\*/g, '<span>$1</span>');
    }
    document.title = TEXTOS[LANG].title;

    // SVG labels
    _s('t_cpu').textContent = TEXTOS[LANG].SVG.cpu;
    _s('t_memoria').textContent = TEXTOS[LANG].SVG.memoria;
    _s('t_alu').textContent = TEXTOS[LANG].SVG.alu;
    _s('t_rdir').textContent = TEXTOS[LANG].SVG.rdir;
    _s('t_rdatos').textContent = TEXTOS[LANG].SVG.rdatos;
    _s('t_rinst').textContent = TEXTOS[LANG].SVG.rinst;
    _s('t_tmemoria').textContent = TEXTOS[LANG].SVG.tmemoria;
    _s('t_rentrada').textContent = TEXTOS[LANG].SVG.rentrada;
    _s('t_decodificador').textContent = TEXTOS[LANG].SVG.decodificador;
    _s('t_contprograma').textContent = TEXTOS[LANG].SVG.contprograma;
    _s('t_ucontrol').textContent = TEXTOS[LANG].SVG.ucontrol;
    _s('t_rentrada').textContent = TEXTOS[LANG].SVG.rentrada;
    _s('t_acumulador').textContent = TEXTOS[LANG].SVG.acumulador;
}

function changeLanguage(e) {
    LANG = e;
    localStorage.setItem('lang', LANG);
    if (TEXTOS[LANG]) {
        setText();
        const languageSelect = $('languageSelect');
        if (languageSelect) languageSelect.value = LANG;
    } else {
        console.warn('Idioma no disponible:', LANG);
    }
};

function init(next) {
    $('info').style.display = 'block';
    ACTUAL = {
        inst: 'init',
        step: 0,
        ALU: '1111'
    };
    hideWires();
    setMemoryTable();
    if (!next) nextStep();
};

function hideWires() {
    while (WIRES.length != 0)
        _s(WIRES.pop()).style.display = 'none';
};

function resetRecords() {
    RECORDS.map(
        function (r) {
            _s(r).textContent = _s(r).textContent.replace(/[1]/g, '0');
        })
}

function setMemoryTable() {
    for (var i = 0; i < TM.length; i++)
        _s('TD' + i).textContent = TM[i];
};

function showWire(name) {
    WIRES.push(name);
    _s(name).style.display = 'block';
};

function changeContent(from, to) {
    _s(to).textContent = _s(from).textContent;
};

function changeSpecialContent(to, content) {
    _s(to).textContent = content;
};

function changeDecoder(type) {
    ACTUAL.ALU = type;
    _s('Deco').textContent = DECODER.get(type);
};

function countIncrement() {
    var c = _s('CPro').textContent;
    c = parseInt(c, 2);
    c++;
    return checkLength(c, 4);
};

function checkLength(n, len) {
    var n = n.toString(2),
        r = n;
    if (n < 0) return 'OVERFLOW';
    while (r.length < len)
        r = '0' + r;
    return r.length == len ? r : 'OVERFLOW';
};

function runALU(type) {
    var r = (ALU[type])(
        _c('Acum'),
        _c('REnt')
    );
    return checkLength(r, 8);
};

function nextStep() {
    if (ACTUAL.inst == 'finished') return false;
    hideWires();
    ACTUAL.step++;
    (INSTRUCTIONS[ACTUAL.inst][ACTUAL.step])();
    nextDoc();
};

function hideDoc() {
    this.blur();
    $('info').className = $('info').className == 'closed' ? '' : 'closed';
    this.innerHTML = $('info').className == 'closed' ? TEXTOS[LANG].open : TEXTOS[LANG].close;
};

function nextDoc() {
    if (ACTUAL.inst == 'finished') return false;
    if ($('info').className == 'fclosed') $('info').className = '';
    $('info_cont').innerHTML = TEXTOS[LANG][ACTUAL.inst][ACTUAL.step-1].replace(/\*([^\*]+)\*/g, '<span>$1</span>');
};

function keyPress(e) {
    // Enter and space keys
    var nextKeys = [13, 32];
    if (nextKeys.indexOf(e.charCode) != -1) nextStep();
};

function buttonNextStep() {
    this.blur();
    nextStep();
};

function about() {
    $('info').className = '';
    $('info_b_c').innerHTML = $('info').className == 'closed' ? TEXTOS[LANG].open : TEXTOS[LANG].close;
    $('info_cont').innerHTML = ABOUT;
};