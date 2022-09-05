class Usuario {
    constructor (nombre, apellido,libros=[], mascotas=[]){
        this.nombre=nombre;
        this.apellido=apellido;
        this.libros=libros;
        this.mascotas=mascotas;
    }

    getFullName(){
        return `'${this.nombre} ${this.apellido}'`;
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nom, autor){
        this.libros.push({nom, autor});
    }

    getBookNames(){

        let nombres=[];
        for (let i = 0; i < this.libros.length; i++) {
             nombres.push(this.libros[i].nom);
        }
        return nombres; 
    }
};

let usuario = new Usuario('Elon', 'Musk', [{nom:'El señor de las moscas', autor:'William Goling'}], ['perro']);
console.log(usuario.getFullName());
console.log(usuario.getBookNames());
console.log(usuario.countMascotas());
usuario.addMascota('gato');
usuario.addBook('Fundacion', 'Isaac Asimov');
console.log(usuario.getBookNames());
console.log(usuario.countMascotas());
