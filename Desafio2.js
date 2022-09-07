const fs=require('fs');

class Contenedor{

    constructor(name){
        this.name=name;
    }

    async archivo(){
        try{
            let contenido= await fs.promises.readFile(`./${this.name}`,`utf-8`) 
            let contenidoJSon=JSON.parse(contenido); //entra en el archivo porque no puede manejar string como arreglo
            return contenidoJSon;
        } catch (error) {return error;}
        
    }

    async save(Object){
        try{
            let contJS= await this.archivo();
            let match = contJS.find((element => element.title == Object.title))
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
        return this.id;
    }

    async getById(Number){
        let contenidoExtraidoDelArray=null;
        try {
            await this.archivo().forEach(element => {
                if (element.id==Number)
                    contenidoExtraidoDelArray=element
            });
        } catch (error) {console.log (error);}

        return (contenidoExtraidoDelArray);
    }

    async getAll(){
        return (await this.archivo())
    }

    async getProductRandom() {
        try {
            const productos = await this.archivo();
            const procutoRandom = productos[Math.floor(Math.random() * productos.length)];
            return procutoRandom;
        }
        catch (error) {return error;}
    }

    async deleteById(Number){
        try {
            let contenidoNuevo=await this.archivo().filter(
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

