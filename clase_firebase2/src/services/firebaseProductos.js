import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore"

import { db } from "../firebase/firebaseConfig.js"


const productosCollection = collection(db, "productos")

const fetchingProductos = async () => {
  try {
    const snapshot = await getDocs(productosCollection)
    return snapshot.docs.map(producto => ({
      id: producto.id,
      ...producto.data()
    }))
  } catch (error) {
    return false
  }
}

const subscribeProductos = (onData, onError) => {
  return onSnapshot(
    productosCollection,
    (snapshot) => {
      const productos = snapshot.docs.map((producto) => ({
        id: producto.id,
        ...producto.data()
      }))

      onData(productos)
    },
    (error) => {
      if (onError) {
        onError(error)
      }
    }
  )
}

const getProducto = async (id) => {
  try {
    const productoRef = doc(db, "productos", id)

    const snapshot = await getDoc(productoRef)

    if (snapshot.exists()) {
      return ({
        id: snapshot.id,
        ...snapshot.data()
      })
    }

    return false
  } catch (error) {
    return false
  }
}

const createProducto = async (newProducto) => {
  try {
    const productoRef = await addDoc(productosCollection, newProducto)

    return {
      id: productoRef.id,
      ...productoRef
    }
  } catch (error) {
    return false
  }
}

const deleteProducto = async (id) => {
  try {
    const productoRef = doc(db, "productos", id)

    await deleteDoc(productoRef)

    return true
  } catch (error) {
    return false
  }
}

const updateProducto = async (productoToUpdate) => {
  try {
    const productoRef = doc(db, "productos", productoToUpdate.id)

    const { id, ...productoData } = productoToUpdate

    await updateDoc(productoRef, productoData)

    return {
      id,
      ...productoData
    }
  } catch (error) {
    return false
  }
}

export { fetchingProductos, subscribeProductos, getProducto, createProducto, deleteProducto, updateProducto }