import fs from 'fs'
import path from 'path';
import { __dirname } from '../utils.js'


const fullPath = path.join(__dirname, 'products.json');

class ProductManager {



    constructor(path) {
        this.path = path
    }
   
    async addProduct(data) {

        const { title, description, price, thumbnail, code, stock,id,category } = data
        //validamos (por las dudas)
        if (!title || !description || !code || !price || !stock || !thumbnail || !category || !id) {
            console.error('Todos los campos son obligatorios')
            return
        }

        //Antes de adherir un nuevo producto necesito saber si ya existe un archivo 

        const existFile = await request(this.path)
        const newProduct = {
            id:parseInt(id),
            title,
            description,
            code,
            price,
            status:true,
            stock,
            category,
            thumbnail,
            
        }


        //el archivo ya tendria el nuevo contenido disponible pára ingresar
        existFile.push(newProduct)

        //guardar el archivo

        await saveinFile(this.path, existFile)



    }

    async getProducts() {
        // si request es una promesa debemos llamar a (getProducts) como una funcion asincrona utilizando "await" para esperar 

        const mostrarProductos = await request(this.path)

    
        return mostrarProductos
    }


    async getProductById(id) {

        const NewId=parseInt(id)

        const lectura = await request(this.path)
        const buscarPorID = lectura.find((i) => {
            
            return i.id === NewId
        })

        if (buscarPorID) {
            console.log("el producto encontrado fue:", buscarPorID)

            //Si no lo retornaba nunca lo iba a ver en la pantalla del navegador 🤦‍♂️
            return buscarPorID

        } else {
            console.log('no se encontro ningun producto 😪')
            
            return buscarPorID
        }

    }

    async deleteProduct(id) {

        

        const lectura = await request(this.path)


        const buscarIndicePorID = lectura.findIndex((i) => {

            console.log('i.id == id', i.id == id)

            return i.id == id
        })

        console.log('buscarIndicePorID: ',buscarIndicePorID)
        if (buscarIndicePorID) {

            lectura.splice([buscarIndicePorID], 1)
            console.log("se ha eliminado un producto")

        
        }
        await saveinFile(this.path, lectura)


    }
    
    
}

// para comprender el resultado de "request". El valor de request puede ser un array vacío [] si el archivo no existe, o una promesa que se resolverá con el contenido del archivo en formato JSON si el archivo existe.

const request = async (path) => {
    //si no existe retorna un array vacio
    if (!fs.existsSync(path)) {
        console.log('no existe el archivo')
        return []

    } else {
        // si existe, lee el archivo existente y retorna su contenido en formato JSON (parse= un objeto dentro de un array)
        try {
            const content = await fs.promises.readFile(path, 'utf-8')
            return JSON.parse(content)
        } catch (error) {
            console.log("ha ocurrido un error", error)
        }
    }
}

const saveinFile = async (path, data) => {
    const content = JSON.stringify(data, null, '\t')
    try {
        await fs.promises.writeFile(path, content, 'utf-8')
        console.log("Se han guardado los cambios")
    } catch (error) {
        console.log("ha ocurrido un error", error)
    }

}


export const product2 = new ProductManager(fullPath)

