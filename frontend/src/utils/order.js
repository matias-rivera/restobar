//get order total price 
exports.totalPrice = (productsIn) => {
    return productsIn.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)
}

  //get all order items
exports.totalItems = (productsIn) => {
    return productsIn.reduce((acc, item) => acc + item.quantity, 0)
}

//increase product quantiity
exports.addUnit = (e, product, productsInOrder, setProductsInOrder) => {
    e.preventDefault()

    const newProducts = productsInOrder.map(el => (el.id === product.id ? {...el, quantity:el.quantity+1} : el))
    setProductsInOrder(newProducts)

}

//decrease product quantity
exports.removeUnit = (e, product, productsInOrder, setProductsInOrder) =>{
    e.preventDefault()

    const newProducts = productsInOrder.map(el => (el.id === product.id ? {...el, quantity:el.quantity-1} : el))
    setProductsInOrder(newProducts)

}


//check if product is already in order
const inOrder = (obj, list) => {
    for (let index = 0; index < list.length; index++) {
      if (obj.id === list[index].id){
        return true
      }
    }
    return false
  }

const returnProduct = (obj, list) => {
    for (let index = 0; index < list.length; index++) {
      if (obj.id === list[index].id){
        return list[index]
      }
    }
    return false
  }

exports.mapSelect = (data) => {
    const mapped = data.map(table => ({ label: table.name, value: table.id}))
    return mapped
  }

exports.setDeletedState = (list) => {
    return list.map(item => {
      return {...item, deleted: false}
    })
}



exports.mapProducts = (list, productsInOrderOld) => {
    const mappedProducts = list.map(product => {

    const productIn = returnProduct(product, productsInOrderOld)
    if(productIn){

      if(productIn.deleted){
        product.stock = productIn.stock + productIn.quantity
      }
  
    }
      return product
    })

    return mappedProducts
  }


//refresh product in order
exports.refreshProductsInOrder = (e, products, productsInOrder, setProductsInOrder) => {
    e.preventDefault()
    let newProducts = productsInOrder
    for (let index = 0; index < products.length; index++) {
      newProducts = newProducts.map(el => (el.id === products[index].id ? {...el, stock:products[index].stock} : el))
    }
    setProductsInOrder(newProducts)
  }


//remove product from order
exports.removeProduct = (e, product, productsInOrder, setProductsInOrder, productsInOrderOld, setProductsInOrderOld) => {
    e.preventDefault()

    //remove product

    const productsIn = productsInOrder.filter(function (item) {
        return item.id !== product.id;
    })


    const setDeletedProduct = productsInOrderOld.map(productDeleted => {
        if(product.id === productDeleted.id){
        productDeleted.deleted = true
        }
        return productDeleted
    })

    setProductsInOrderOld(setDeletedProduct)
    setProductsInOrder(productsIn)
}

//add product to order
exports.addProduct = (e, product, productsInOrder, setProductsInOrder) => {
    e.preventDefault()

    //product object
    const productIn = {
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        quantity: 1
        }
    //if is already in order
    if(!inOrder(productIn, productsInOrder)){
        setProductsInOrder([...productsInOrder, productIn])
    }else{
        alert('Product already in order')
    }

}


  
module.exports.returnProduct = returnProduct
module.exports.inOrder = inOrder