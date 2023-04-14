import json

# Define the FAQ dictionary
faq_dict = {
    "activities": {
        # answers for activities questions
        "¿Cómo puedo inscribirme a un deporte?": "Para inscribirte a un deporte debes hablar con el coordinador del mismo.",
        "¿Qué necesito para entrar al gimnasio?": "Para entrar al gimnasio debes hacer una reservación por SIASE.",
        "¿Qué clubs hay en fime?": "En fime hay una gran cantidad de clubes y grupos estudiantiles a los cuales puedes unirte (no me los se todos)",
        "¿Cómo puedo aprender un nuevo idioma en la facultad?": "Puedes acercarte al Centro de Idiomas (CAADI) en el 3er piso del edificio 9."
    },
    "admission": {
        # answers for admission questions
        "¿Cuáles son los requisitos de ingreso?": "Los requisitos para ingresar a fime los puedes consultar en [link]",
        "¿Cuáles son los requisitos de admisión?": "Para ser admitido en la facultad debes pasar el EXANI-II que se imparte cada semestre en la facultad.",

    },
    "calendar": {
        # answers for calendar questions
        "¿Cuándo son los examenes de medio curso?": "Los examenes de medio curso comenzaron el 13 de marzo y terminaron el día 24 del mismo mes.",
        "¿Cuándo son los examenes ordinarios?": "El periodo de examenes ordinarios inicia el 31 de mayo y termina el día 12 de junio.",
        "¿Cuándo es el último día de clases?": "El semestre finaliza el día 23 de junio",
        "¿Cuándo son los veranos?": "Para inscribir veranos debes hacerlo los días 26 o 27 de Junio.",
        "¿Dónde puedo ver el calendario académico?": "Puedes consultar el calendario académico en [link]",
        "¿Cuándo es el periodo de bajas parciales?": "El periodo de bajas parciales fue durante el 7 a 10 de febrero."
    },
    "costs": {
        # answers for costs questions    
        "¿Cuáles son los precios del semestre?": "El costo del semestre tiene un costo de $3500.00 MXN por parte de la facultad, y un costo de $2500.00 por parte de la UANL, debes realizar ambos pagos cada semestre.",
        "¿Puedo realizar el pago en línea?": "Si, es posible hacer pagos de la colegiatura a través de la plataforma de SIASE."
    },
    "egress": {
        # answers for egress questions
        "¿Qué necesito para titularme?": "Para titularte necesitas "
    },
    "enrollment": {
        # anserws for enrollment questions
        "¿Cuál es el máximo de creditos que puedo inscribir por semestre?": "Puedes inscribir hasta un máximo de 27 créditos por semestre, aunque lo recomendable es que inscribas 22 por semestre.",
        "¿Cuál es el mínimo de creditos que puedo inscribir por semestre?": "Puedes inscribir hasta un mínimo de 9 créditos por semestre, aunque lo recomendable es que inscribas 22 por semestre.",
        "¿Cuántos créditos puedo inscribir por semestre?": "En total puedes inscribir de 9 a 27 créditos por semestre.",
        "¿Cuántas materias puedo meter por semestre?": "La cantidad de materias que puedes inscribir depende del peso de los créditos, puedes meter de 9 a 27 créditos por semestre.",
        "¿Cómo puedo inscribir materias?": "Para inscribir materias necesitas esperar al periodo de inscripción, puedes consultar tu fecha en SIASE en el apartado <<Consultar fecha de inscripción>>.",
        "¿Cómo puedo dar de baja una materia?": "Para dar de baja una materia puedes hacerlo dentro de tu hora de inscripción o esperar al periodo de bajas parciales."
    },
    "exchange": {
        # answers for exchange questions
        "¿Cómo puedo hacer intercambio académico?": "Para realizar un intercambio académico necesitas... (no se)",
        "¿Es posible hacer un intercambio académico en una universidad privada?": "Si, la universidad cuenta con intercambio académico de manera internacional, puedes consultar más detalles en: [link]"
    },
    "financial aid": {
        # answers for financial aid questions
        "¿Cómo puedo sacar una beca?": "Para obtener una beca necesitas: (no se)",
        "¿Existen becas disponibles en la universidad?": "Si, la facultad ofrece distintos tipos de becas."
    },
    "internship": {
        # answers for internship questions
        "¿Qué requisitos ocupo para hacer prácticas profesionales?": "Para hacer tus practicas ocupas asistir a las pláticas que se realizan cada semestre, además de contar con más de 220 creditos y ser de 6to semestre en adelante.",
        "¿Cuándo es la plática informativa de las prácticas profesionales?": "La plática para realizar prácticas profesionales fue en marzo, te sugiero que estes al tanto de las redes sociales oficiales para nuevos avisos.",
        "¿Qué tipo de prácticas profesionales ofrecen en la universidad?": "La facultad ofrece prácticas curriculares y no curriculares.",
        "¿Qué documentos se requieren para tramitar las prácticas curriculares?": "Los documentos oficiales se dan a conocer con cada plática informativa de las prácticas.",
        "¿En qué momento de mi carrera debo realizar las prácticas profesionales?": "Una vez cumplas con los requisitos, es recomendable realizar tus prácticas a partir de 6to semestre.",
        "¿Cuántos créditos ocupo para realizar prácticas profesionales?": "Para realizar tu servicio social necesitas un mínimo de 110 créditos.",
    },
    "majors": {
        # answers for majors questions
        "general": {
            "¿qué carreras ofrecen en la facultad?": "Puedes consultar las carreras y planes de estudio de la facultad en la siguiente página: [link]",
            "¿Qué materias llevo en la carrera?": "A lo largo de tu carrera llevas materias de formación profesional, ",
            "¿Dónde puedo ver mi plan de estudios?": "Puedes consultar tu plan de estudios en la siguiente liga [link]",
            "¿Cuál es la malla curricular de mi carrera?": "Puedes consultar los planes de estudios en la siguiente liga [link]",
            "¿Cuantos años dura una carrera?": "La carrera tiene un periodo mínimo de 5 años, no obstante, puedes terminarla hasta en 10 años.",
            "¿Cuántos semestres tiene la carrera?": "La carrera tiene una duración de 10 semestres, no obstante, es posible llevar menos carga con cada inscripción y alargar la cantidad de semestres."
        },
        "its": {
            "¿Dónde puedo ver mi plan de estudios?": "Puedes consultar el plan de estudios de ITS en la siguiente liga [link]",
        },
        # add more majors...
    },
    "postgrad": {
        # answers for postgrad questions
        "¿Puedo hacer maestría en fime?": "Si, la FIME ofrece una cantidad de maestrías y doctorados, entre los cuales se encuentran...",
    },
    "procedures": {
        # answers for procedures questions
        "¿Cómo puedo tramitar un Kardex?": "Puedes imprimir tu kardex no oficial a través de SIASE, para tramitar tu kardex oficial debes realizarlo a través de la pestaña <<Comercio electrónico>>.",
        "¿Cómo puedo tramitar una constancia de estudios?": "Puedes solicitar tu constancia a través de la pestaña <<Comercio electrónico>> en SIASE y pasar a recogerla en el departamento de escolar.",
    },
    "research": {
        # answers for research questions
        "¿Cómo puedo hacer estancia en la investigación?": "Para realizar estancia en la investigación necesitas... (no se)",
        "¿Cuentan con equipos de investigación?": "La FIME cuenta con diversos equipos de investigación, para más detalles acude al departamento de investigación."
    },
    "schedules": {
        # answers for schedules questions
        "¿Cómo puedo contactar a escolar?": "Los horarios de atención de escolar son de 08:00 a 19:00 de lunes a viernes, el numero de atención es: ## #### ####"
    },
    "social service": {
        # answers for social service questions
        "¿Qué requisitos ocupo para hacer el servicio social?": "Para hacer tu servicio social ocupas haber completado 154 créditos, así como asistir a las pláticas que se realizan cada semestre.",
        "¿Cuántos créditos ocupo para realizar mi servicio social?": "Para realizar tu servicio social necesitas un mínimo de 154 créditos.",
    }
    # ... add more categories as needed
}

# Save the dictionary to a JSON file
with open('faq_data.json', 'w') as f:
    json.dump(faq_dict, f)