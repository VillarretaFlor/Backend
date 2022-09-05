const fs=require('fs');

class Contenedor{

    constructor(name){
        this.name=name;
    }

   async archivo(){
        let contenido= await fs.promises.readFile(`./${this.name}`,`utf-8`);
        let contenidoJSon=JSON.parse(contenido); //entra en el archivo porque no puede manejar string como arreglo
        return contenidoJSon;
    }

    async save(Object){
        try{
            let contJS=archivo();
            let match = contJS.find((element => element.title == Object.title));
            if (match == undefined){
                let ultimoIndice=contJS.length-1; 
                let ultimoId=contJS[ultimoIndice].id;
                Object.id=ultimoId+1;
                let id=Object.id;
                contJS.push(Object);
                await fs.promise.writeFile(`./${this.name}`,JSON.stringify(contJS));
                console.log(id);
            } else console.log ("EL objeto ya existe");

        }catch(error){console.log (error);}
        return id;
    }

    async getById(Number){
        let contenidoExtraidoDelArray=null;
        try {
            archivo().forEach(element => {
                if (element.id==Number)
                    contenidoExtraidoDelArray=element
            });
        } catch (error) {console.log (error);}

        return (contenidoExtraidoDelArray);
    }

    async getAll(){
        return (archivo());
    }

    async deleteById(Number){
        try {
            let contenidoNuevo=archivo.filter(
                (element) => element.id !== Number
            );
            await fs.promises.writeFile( `./${this.name}`, JSON.stringify(contenidoNuevo));
        } catch (error) {console.log (error);}
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(`./${this.name}`, JSON.stringify([]));
        } catch (error) {console.log (error);}
    }
}

let contenedor=new Contenedor("C:\Users\FRAVEGA\Desktop\Flor\Estudios\CoderHouse\Backend\Desafio2\Productos.json");
let informacionNueva = {
    "title": "goma",
    "price": 123.45,
    "thumbnail": 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
    "id":1
}

contenedor.save(informacionNueva).then(respuestaDeLaPromesa => {
    console.log(respuestaDeLaPromesa)}
)  

contenedor.getById(2).then(result => {
    console.log(result)}
)

contenedor.getAll().then(result => {
    console.log(result)}
)

contenedor.deleteById(2).then(result => {
    console.log(result)}
)

contenedor.deleteAll().then(result => {
    console.log(result)}
)

