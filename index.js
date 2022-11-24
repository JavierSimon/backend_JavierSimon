const fs = require('fs')
const { v4: uuidv4 } = require('uuid')


class Contenedor {
    constructor(archivo) {
        this.archivo = archivo
    }

    async save(objeto) {
        try {
            const file = await fs.promises.readFile(this.archivo, 'utf-8')
            let parsedFile = await JSON.parse(file)

            objeto.id = uuidv4()
            parsedFile = [...parsedFile, objeto]
            await fs.promises.writeFile(this.archivo, JSON.stringify(parsedFile, null, 2))

            console.log(objeto.id)
        } catch (error) {
            if (error.code === "ENOENT") {
                fs.writeFile(this.archivo, "[]", (e) => {
                    console.log("writeFile en save", e);
                })
            }
            console.log("save", error);
        }
    }

    async getById(Id) {
        try {

            const file = await fs.promises.readFile(this.archivo, "utf-8")
            let parsedFile = await JSON.parse(file)
            let elementById

            parsedFile.forEach(element => {
                if (element.id == Id) {
                    elementById = element
                    return element
                } else {
                    return null
                }
            });

            console.log(elementById)

        } catch (error) {
            console.log("getById()", error);
        }
    }

    async getAll() {
        try {
            const file = await fs.promises.readFile(this.archivo, "utf-8")
            let parsedFile = await JSON.parse(file)
            console.log(parsedFile)
        } catch (error) {
            console.log("getAll()", error);
        }
    }

    async deleteById(Id) {
        try {
            const file = await fs.promises.readFile(this.archivo, "utf-8")
            let parsedFile = await JSON.parse(file)

            let positionObj
            let elementToDelete
            parsedFile.forEach(element => {
                if (element.id == Id) {
                    // console.log(element);     
                    elementToDelete = element
                    return parsedFile
                } else {
                    return null
                }
            });
            positionObj = parsedFile.indexOf(elementToDelete)
            console.log(parsedFile[positionObj]);
            parsedFile.splice(positionObj, 1)


            await fs.promises.writeFile(this.archivo, JSON.stringify(parsedFile), "utf-8")
            console.log (parsedFile)

        } catch (error) {
            console.log("getById()", error);
        }
    }

    async deleteAll() {
        try {

            const file = await fs.promises.readFile(this.archivo, "utf-8")
            let parsedFile = await JSON.parse(file)

            parsedFile.splice(0)

            await fs.promises.writeFile(this.archivo, JSON.stringify(parsedFile), "utf-8")

            console.log(parsedFile) 

        } catch (error) {
            console.log("deleteAll()", error);

        }
    }
}

let archivos = './archivos.txt'
let newFile = new Contenedor(archivos)
const escuadra = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'url-escuadra'
}


// newFile.save(escuadra) //-> ver por consolo el id que devuelve para buscar por id despues con getById
// newFile.getById('d6524590-d8b0-43e2-ad27-08a38b7927a0')
// newFile.getAll()
// newFile.deleteById('d6524590-d8b0-43e2-ad27-08a38b7927a0')
// newFile.deleteAll()