import { Router } from 'express';
import { product2 } from '../../manager/ProductManager.js'
import { socketClient } from '../../socket.js';



const router = Router();

router.get('/products', async (req, res) => {

  try {

    const products = await product2.getProducts()

    res.render('home', { listaProductos: products })

  } catch (error) {
    res.json({ error: 'Error al obtener los productos' })
  }
})


router.get('/products/:pid', async (req, res) => {
  const { pid } = req.params

  console.log('pid es:', pid)

  if (pid) {
    const productById = await product2.getProductById(pid)


    res.json(productById)

  } else {
    res.send({ error: 'No se proporcionó un PID válido' })
  }
})


router.get('/realtimeproducts', async (req, res) => {

  try {



    res.render('realTimeProducts')

  } catch (error) {
    res.json({ error: 'Error al obtener los productos' })
  }
})


router.post('/products', async (req, res) => {

  try {
    const { body } = req

    console.log('body es', body)

    let newProduct = {

      ...body,

    }

   console.log('newProduct.id es: ',typeof newProduct.id)

    console.log('newProduct', newProduct)

    await product2.addProduct(newProduct)
    socketClient.emit('operacion', { mensaje: 'Operación exitosa' })


    res.status(201).redirect('/realtimeproducts')

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }

})





router.post('/DeleteProducts', async (req, res) => {

  try {

    const { deleteId } = req.body;

    console.log('deleteId es: ', deleteId)

      const existe = await product2.getProductById(deleteId)

      console.log('existe es: ', existe)

      if (existe == undefined) {
        socketClient.emit('operacion', { mensaje: 'Operación rechazada.No existe el ID en la base de datos' })
        return res.status(500).render('realTimeProducts')
      }

      await product2.deleteProduct(deleteId)

      socketClient.emit('operacion', { mensaje: 'Operación exitosa' })

    ;

    res.status(200).redirect('/realtimeproducts')

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }


})
export default router;