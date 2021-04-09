const Product =  require('../models').Product


//calc stock of each product in order
const stock = async (list) => {
    for (let index = 0; index < list.length; index++) {
      const productSearched = await Product.findByPk(list[index].id)
      if(productSearched.stock < list[index].quantity){
        return false
      }
      
    }
    return true
  }
  
  //get products
const getProducts = async (list) => {
    const products = list.map(async item => {
      const product = await Product.findByPk(item.id)
      return product
    })
    return products
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

  //return product quantity difference
const getProductDifference = (obj, list) => {
    for (let index = 0; index < list.length; index++) {
      if (obj.id === list[index].id){
        return obj.OrderProduct.quantity - list[index].quantity  
      }
    }
    return 0
  }

  
//check for stock
const checkNoStock = async (item, products) => {

    const product = await Product.findByPk(item.id)

    //get difference
    const difference = getProductDifference(item, products)

    if(difference < 0 && product.stock < Math.abs(difference)){
        return `Not enough stock of ${product.name}`
    }
    return false


}

exports.getProductDifference = getProductDifference
exports.checkNoStock = checkNoStock
exports.inOrder = inOrder
exports.stock = stock
exports.getProducts = getProducts