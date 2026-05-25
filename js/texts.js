// -----------------------------------------------------------------------------
// Documentation for the instructions
// -----------------------------------------------------------------------------

const TEXTOS = {
    es: {
        title: "Simulador de Von Neumann",
        open: "Abrir",
        close: "Cerrar",
        execute: "Ejecutar programa",
        upload: "Subir programa",
        credits: "Créditos",
        changeprogram: "Cambiar programa",
        close: "Cerrar",
        next: "Siguiente",
        instruction: "Instrucción",
        deco: "D",
        comment: "Comentario",
        exercise: "Ejercicio",
        ABOUT: "<span><a target='_blank' href='http://xitrus.es'>Pedro Gutiérrez</a></span>: diseño y desarrollo del simulador <br><span>Noemi Navarro</span>: documentación de la ejecución <br><span><a target='_blank' href='https://github.com/yuki/'>Rubén Gómez</a></span>: ampliación del set de instrucciones, mejoras gráficas y traducciones<br>",
        SVG: {
            rdir: "R. Direcciones",
            rdatos: "R. Datos",
            memoria: "Memoria",
            tmemoria: "Tabla de memoria",
            rinst: "R. Instrucciones",
            decodificador: "Decodificador",
            contprograma: "Cont. programa",
            ucontrol: "Unidad de control",
            acumulador: "Acumulador",
            rentrada: "R. Entrada",
            alu: "Unidad aritmético lógica (ALU)",
            cpu: "CPU"
        },
        INFOINST: [
            ['0000','Suma'],
            ['0001','Resta'],
            ['0010','Producto'],
            ['0011','Exponente'],
            ['0100','Operador AND'],
            ['0101','Operador OR'],
            ['0110','Mover a memoria'],
            ['0111','Finalizar'],
            ['1000','Operador NOT'],
            ['1001','Incrementar + 1'],
            ['1010','Decrementar - 1'],
            ['1011','ROL'],
            ['1100','ROR'],
            ['1101','Operador XOR'],
            ['1110','RST acumulador'],
        ],
        "init": [
            "La *Unidad de control* envía una micro-orden para transferir el contenido del *Contador de programa* al *Registro de direcciones*.",
            "El *Contador de programa* aumenta en uno, por lo que su contenido será la dirección de la próxima instrucción a ejecutar.",
            "Se selecciona la posición de memoria que indica el *Registro de direcciones* y se realiza una lectura en la memoria.",
            "Se deposita en el *Registro de datos* la instrucción a ejecutar.",
            "Se realiza el traslado de la información contenida en el *Registro de datos* al *Registro de instrucciones*, donde se almacenará.",
            "El *Decodificador* procede a la interpretación de la instrucción que serán los 4 primeros bits, es decir, interpreta el código de operación.",
            "El *Registro de instrucciones* envía los 4 últimos bits al *Registro de direcciones*.",
            "El *Registro de direcciones* busca en la memoria la celda correspondiente y procede a la lectura del dato.",
            "La información es enviada al *Registro de datos*.",
            "El *Registro de datos* envía la información al *Registro de entrada*.",
            "El *Circuito operacional* realiza la operación con el *Registro acumulador* y el *Registro de entrada* y lo almacena de nuevo en el *Registro acumulador*.",
        ],
        "0110": [
            "El *Registro de instrucciones* envía los 4 últimos bits al *Registro de direcciones*.",
            "El *Registro de direcciones* busca en la memoria la celda en la que será almacenada el resultado.",
            "El *Registro acumulador* envía la información al *Registro de datos*.",
            "El *Registro de datos* procede a la escritura de la información en la celda seleccionada por el *Registro de Direcciones*."
        ],
        "0111": [
            "El *Decodificador* interpreta que se finaliza el programa y se para la ejecución."
        ],
        // Special instructions - they all have the same comments
        "1000": [
            "El *Registro acumulador* envía la información al *Registro de datos*.",
            "El *Registro de datos* envía la información al *Registro de entrada*.",
            "El *Circuito operacional* realiza la operación con SÓLO el *Registro de entrada* y lo almacena de nuevo en el *Registro acumulador*."
        ],
        "1001": [
            "El *Registro acumulador* envía la información al *Registro de datos*.",
            "El *Registro de datos* envía la información al *Registro de entrada*.",
            "El *Circuito operacional* realiza la operación con SÓLO el *Registro de entrada* y lo almacena de nuevo en el *Registro acumulador*."
        ],
        "1010": [
            "El *Registro acumulador* envía la información al *Registro de datos*.",
            "El *Registro de datos* envía la información al *Registro de entrada*.",
            "El *Circuito operacional* realiza la operación con SÓLO el *Registro de entrada* y lo almacena de nuevo en el *Registro acumulador*."
        ],
        "1011": [
            "El *Registro acumulador* envía la información al *Registro de datos*.",
            "El *Registro de datos* envía la información al *Registro de entrada*.",
            "El *Circuito operacional* realiza la operación con SÓLO el *Registro de entrada* y lo almacena de nuevo en el *Registro acumulador*."
        ],
        "1100": [
            "El *Registro acumulador* envía la información al *Registro de datos*.",
            "El *Registro de datos* envía la información al *Registro de entrada*.",
            "El *Circuito operacional* realiza la operación con SÓLO el *Registro de entrada* y lo almacena de nuevo en el *Registro acumulador*."
        ],
        "1101": [
            "El *Registro acumulador* envía la información al *Registro de datos*.",
            "El *Registro de datos* envía la información al *Registro de entrada*.",
            "El *Circuito operacional* realiza la operación con SÓLO el *Registro de entrada* y lo almacena de nuevo en el *Registro acumulador*."
        ],
        "1110": [
            "El *Registro acumulador* envía la información al *Registro de datos*.",
            "El *Registro de datos* envía la información al *Registro de entrada*.",
            "El *Circuito operacional* realiza la operación con SÓLO el *Registro de entrada* y lo almacena de nuevo en el *Registro acumulador*."
        ],
    },

// -----------------------------------------------------------------------------

    eu: {
        title: "Von Neumann simuladorea",
        open: "Ireki",
        close: "Itxi",
        execute: "Programa exekutatu",
        upload: "Programa igo",
        credits: "Kredituak",
        changeprogram: "Aldatu programa",
        next: "Hurrengoa",
        instruction: "Agindu",
        deco: "D",
        comment: "Iruzkin",
        exercise: "Ariketa",
        ABOUT: "<span><a target='_blank' href='http://xitrus.es'>Pedro Gutiérrez</a></span>: simuladorearen diseinua eta garapena <br><span>Noemi Navarro</span>: exekuzioaren dokumentazioa <br><span><a target='_blank' href='https://github.com/yuki/'>Rubén Gómez</a></span>: aginduen multzoaren hedapena, grafika hobekuntzak eta itzulpenak<br>",
        SVG: {
            rdir: "Helbide err.",
            rdatos: "Datu err.",
            memoria: "Memoria",
            tmemoria: "Memoriaren taula",
            rinst: "Agindu erregistroa",
            decodificador: "Deskodetzailea",
            contprograma: "Programaren kont.",
            ucontrol: "Kontrol unitatea",
            acumulador: "Akumuladorea",
            rentrada: "Sarrera err.",
            alu: "Aritmetika-logika unitatea (ALU)",
            cpu: "CPU"
        },
        INFOINST: [
            ['0000','Batuketa'],
            ['0001','Kenketa'],
            ['0010','Biderketa'],
            ['0011','Potentzia'],
            ['0100','AND eragilea'],
            ['0101','OR eragilea'],
            ['0110','Memorian mugitu'],
            ['0111','Amaitu'],
            ['1000','NOT eragilea'],
            ['1001','+1 handitu'],
            ['1010','-1 gutxitu'],
            ['1011','ROL'],
            ['1100','ROR'],
            ['1101','XOR eragilea'],
            ['1110','Akumuladorea berrezarri'],
        ],
        "init": [
            "*Kontrol unitateak* mikro-agindua bidaltzen du *programaren kontadorearen* edukia *helbide erregistroara* transferitzeko.",
            "*Programaren kontadoreak* bat gehitzen du, beraz, bere edukia hurrengo exekutatu beharreko aginduen helbidea izango da.",
            "*Helbide erregistroak* adierazten duen memoriako posizioa hautatzen da eta memorian irakurketa egiten da.",
            "Exekutatu beharreko agindua *datu erregistroan* gordetzen da.",
            "*Datu erregistroaren* edukia *agindu erregistroara* eramaten da, non gordeko den.",
            "*Deskodetzaileak* aginduaren lehen 4 biteak interpretatzen ditu, hau da, opzio kodea.",
            "*Agindu erregistroak* azken 4 biteak *helbide erregistroari* bidaltzen dizkio.",
            "*Helbide erregistroak* memorian dagokion zelula bilatzen du eta datua irakurtzen du.",
            "*Datu erregistroara* informazioa bidaltzen da.",
            "*Datu erregistroak* informazioa *sarrera erregistroari* bidaltzen dio.",
            "*Zirkuitu operazionalak* *akumuladore erregistroarekin* eta *sarrera erregistroarekin* eragiketa egiten du eta berriro *akumuladore erregistroan* gordetzen du.",
        ],
        "0110": [
            "*Agindu erregistroak* azken 4 biteak *helbide erregistroari* bidaltzen dizkio.",
            "*Helbide erregistroak* emaitza gordeko den zelula memorian bilatzen du.",
            "*Akumuladore erregistroak* informazioa *datu erregistroari* bidaltzen dio.",
            "*Datu erregistroak* informazioa *helbide erregistroak* hautatutako zelulan idazten du.",
        ],
        "0111": [
            "*Deskodetzaileak* programaren amaiera interpretatzen du eta exekuzioa gelditzen da."
        ],
        "1000": [
            "*Akumuladore erregistroak* informazioa *datu erregistroari* bidaltzen dio.",
            "*Datu erregistroak* informazioa *sarrera erregistroari* bidaltzen dio.",
            "*Zirkuitu operazionalak* soilik *sarrera erregistroarekin* eragiketa egiten du eta berriro *akumuladorean* gordetzen du."
        ],
        "1001": [
            "*Akumuladore erregistroak* informazioa *datu erregistroari* bidaltzen dio.",
            "*Datu erregistroak* informazioa *sarrera erregistroari* bidaltzen dio.",
            "*Zirkuitu operazionalak* soilik *sarrera erregistroarekin* eragiketa egiten du eta berriro *akumuladorean* gordetzen du."
        ],
        "1010": [
            "*Akumuladore erregistroak* informazioa *datu erregistroari* bidaltzen dio.",
            "*Datu erregistroak* informazioa *sarrera erregistroari* bidaltzen dio.",
            "*Zirkuitu operazionalak* soilik *sarrera erregistroarekin* eragiketa egiten du eta berriro *akumuladorean* gordetzen du."
        ],
        "1011": [
            "*Akumuladore erregistroak* informazioa *datu erregistroari* bidaltzen dio.",
            "*Datu erregistroak* informazioa *sarrera erregistroari* bidaltzen dio.",
            "*Zirkuitu operazionalak* soilik *sarrera erregistroarekin* eragiketa egiten du eta berriro *akumuladorean* gordetzen du."
        ],
        "1100": [
            "*Akumuladore erregistroak* informazioa *datu erregistroari* bidaltzen dio.",
            "*Datu erregistroak* informazioa *sarrera erregistroari* bidaltzen dio.",
            "*Zirkuitu operazionalak* soilik *sarrera erregistroarekin* eragiketa egiten du eta berriro *akumuladorean* gordetzen du."
        ],
        "1101": [
            "*Akumuladore erregistroak* informazioa *datu erregistroari* bidaltzen dio.",
            "*Datu erregistroak* informazioa *sarrera erregistroari* bidaltzen dio.",
            "*Zirkuitu operazionalak* soilik *sarrera erregistroarekin* eragiketa egiten du eta berriro *akumuladorean* gordetzen du."
        ],
        "1110": [
            "*Akumuladore erregistroak* informazioa *datu erregistroari* bidaltzen dio.",
            "*Datu erregistroak* informazioa *sarrera erregistroari* bidaltzen dio.",
            "*Zirkuitu operazionalak* soilik *sarrera erregistroarekin* eragiketa egiten du eta berriro *akumuladorean* gordetzen du."
        ],
    },
    en: {
        title: "Von Neumann Simulator",
        open: "Open",
        close: "Close",
        execute: "Run program",
        upload: "Upload program",
        credits: "Credits",
        changeprogram: "Change program",
        next: "Next",
        instruction: "Instruction",
        deco: "D",
        comment: "Comment",
        exercise: "Exercise",
        ABOUT: "<span><a target='_blank' href='http://xitrus.es'>Pedro Gutiérrez</a></span>: simulator design and development <br><span>Noemi Navarro</span>: execution documentation <br><span><a target='_blank' href='https://github.com/yuki/'>Rubén Gómez</a></span>: instruction set expansion, graphical improvements and translations<br>",
        SVG: {
            rdir: "Address Reg.",
            rdatos: "Data Reg.",
            memoria: "Memory",
            tmemoria: "Memory table",
            rinst: "Instruction Reg.",
            decodificador: "Decoder",
            contprograma: "Program counter",
            ucontrol: "Control unit",
            acumulador: "Accumulator",
            rentrada: "Input Reg.",
            alu: "Arithmetic Logic Unit (ALU)",
            cpu: "CPU"
        },
        INFOINST: [
            ['0000','Sum'],
            ['0001','Subtract'],
            ['0010','Product'],
            ['0011','Exponent'],
            ['0100','AND operator'],
            ['0101','OR operator'],
            ['0110','Move to memory'],
            ['0111','Finish'],
            ['1000','NOT operator'],
            ['1001','Increment + 1'],
            ['1010','Decrement - 1'],
            ['1011','ROL'],
            ['1100','ROR'],
            ['1101','XOR operator'],
            ['1110','RST accumulator'],
        ],
        "init": [
            "*The control unit* sends a microinstruction to transfer the content of the *program counter* to the *address register*.",
            "The *program counter* increments by one, so its content will be the address of the next instruction to execute.",
            "The memory location indicated by the *address register* is selected and a memory read is performed.",
            "The instruction to execute is placed into the *data register*.",
            "The information in the *data register* is transferred to the *instruction register*, where it will be stored.",
            "The *decoder* interprets the first four bits of the instruction, that is, it decodes the opcode.",
            "The *instruction register* sends the last four bits to the *address register*.",
            "The *address register* finds the corresponding memory cell and reads the data.",
            "The information is sent to the *data register*.",
            "The *data register* sends the information to the *input register*.",
            "The *arithmetic unit* performs the operation with the *accumulator register* and the *input register* and stores it back in the *accumulator register*.",
        ],
        "0110": [
            "The *instruction register* sends the last four bits to the *address register*.",
            "The *address register* searches memory for the cell where the result will be stored.",
            "The *accumulator register* sends the information to the *data register*.",
            "The *data register* writes the information into the cell selected by the *address register*.",
        ],
        "0111": [
            "The *decoder* interprets that the program finishes and stops execution."
        ],
        "1000": [
            "The *accumulator register* sends the information to the *data register*.",
            "The *data register* sends the information to the *input register*.",
            "The *arithmetic unit* performs the operation with ONLY the *input register* and stores it back in the *accumulator register*."
        ],
        "1001": [
            "The *accumulator register* sends the information to the *data register*.",
            "The *data register* sends the information to the *input register*.",
            "The *arithmetic unit* performs the operation with ONLY the *input register* and stores it back in the *accumulator register*."
        ],
        "1010": [
            "The *accumulator register* sends the information to the *data register*.",
            "The *data register* sends the information to the *input register*.",
            "The *arithmetic unit* performs the operation with ONLY the *input register* and stores it back in the *accumulator register*."
        ],
        "1011": [
            "The *accumulator register* sends the information to the *data register*.",
            "The *data register* sends the information to the *input register*.",
            "The *arithmetic unit* performs the operation with ONLY the *input register* and stores it back in the *accumulator register*."
        ],
        "1100": [
            "The *accumulator register* sends the information to the *data register*.",
            "The *data register* sends the information to the *input register*.",
            "The *arithmetic unit* performs the operation with ONLY the *input register* and stores it back in the *accumulator register*."
        ],
        "1101": [
            "The *accumulator register* sends the information to the *data register*.",
            "The *data register* sends the information to the *input register*.",
            "The *arithmetic unit* performs the operation with ONLY the *input register* and stores it back in the *accumulator register*."
        ],
        "1110": [
            "The *accumulator register* sends the information to the *data register*.",
            "The *data register* sends the information to the *input register*.",
            "The *arithmetic unit* performs the operation with ONLY the *input register* and stores it back in the *accumulator register*."
        ],
    },
    // -----------------------------------------------------------------------------

};

