const PORT = process.env.PORT || 8080;

const fs = require("fs");
const express = require("express");
const app = express();

class Contenedor {
  constructor(name) {
    this.name = name;
  }

  async archivo() {
    try {
      let contenido = await fs.promises.readFile(`./${this.name}`, `utf-8`);
      let contenidoJSon = JSON.parse(contenido); //entra en el archivo porque no puede manejar string como arreglo
      return contenidoJSon;
    } catch (error) {
      return error;
    }
  }

  async save(Object) {
    try {
      let contJS = await this.archivo();
      let match = contJS.find((element) => element.title == Object.title);
      if (match == undefined) {
        let ultimoIndice = contJS.length - 1;
        let ultimoId = contJS[ultimoIndice].id;
        Object.id = ultimoId + 1;
        let id = Object.id;
        contJS.push(Object);
        await fs.promise.writeFile(`./${this.name}`, JSON.stringify(contJS));
        console.log(id);
      } else console.log("EL objeto ya existe");
    } catch (error) {
      console.log(error);
    }
    return this.id;
  }

  async getById(Number) {
    let contenidoExtraidoDelArray = null;
    try {
      await this.archivo().forEach((element) => {
        if (element.id == Number) contenidoExtraidoDelArray = element;
      });
    } catch (error) {
      console.log(error);
    }

    return contenidoExtraidoDelArray;
  }

  async getAll() {
    return await this.archivo();
  }

  async getProductRandom() {
    try {
      const productos = await this.archivo();
      const procutoRandom =
        productos[Math.floor(Math.random() * productos.length)];
      return procutoRandom;
    } catch (error) {
      return error;
    }
  }

  async deleteById(Number) {
    try {
      let contenidoNuevo = await this.archivo().filter(
        (element) => element.id !== Number
      );
      await fs.promises.writeFile(
        `./${this.name}`,
        JSON.stringify(contenidoNuevo)
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(`./${this.name}`, JSON.stringify([]));
    } catch (error) {
      console.log(error);
    }
  }
}

const contenedor = new Contenedor("Productos.json");

app.get("/productos", async (req, res) => {
  contenedor.getAll().then((products) => res.send(products));
});

app.get("/productoRandom", async (req, res) => {
  contenedor.getProductRandom().then((product) => res.send(product));
});

app.get("*", async (req, res) => {
  res.send(
    'Ir a <a href="./productos">Productos</a> \n Ir a <a href="./productoRandom">Producto Random</a>'
  );
});

// Escuchar puerto seteado
const connectedServer = app.listen(PORT, () => {
  console.log(`Server is UP and RUNNING on http://localhost:${PORT}`);
});

// Caputra el error y lo muestra
connectedServer.on("error", (error) => {
  console.log(error);
});
