const voids = {};

voids.updateOrders = (orderSelected, newDetailOrder,channel,subchannel) => {
  try {
    if(localStorage.getItem('orders') ==  null || localStorage.getItem('orders') ==  undefined){
      localStorage.setItem('orders', JSON.stringify([]));
      localStorage.setItem('ordersChannel',JSON.stringify([]));
    }else{
      const orders = JSON.parse(localStorage.getItem('orders'));
      const ordersChannel = JSON.parse(localStorage.getItem('ordersChannel'));
      orders[orderSelected] = newDetailOrder;
      ordersChannel[orderSelected] = {channel,subchannel};
      localStorage.setItem('orders', JSON.stringify(orders));
      localStorage.setItem('ordersChannel',JSON.stringify(ordersChannel));
    }
  } catch (error) {
    console.log(error);
  }
};

voids.deleteOrders = (orderSelected) => {
  const orders = JSON.parse(localStorage.getItem('orders'));
  const ordersChannel = JSON.parse(localStorage.getItem('ordersChannel'));
  if(orders.length == 0){
    localStorage.setItem('orders', JSON.stringify([]));
    localStorage.setItem('ordersChannel', JSON.stringify([]));
  }else{
    orders.splice(orderSelected, 1);
    ordersChannel.splice(orderSelected, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('ordersChannel', JSON.stringify(ordersChannel));
  }
};

voids.total = (order) => {
  let total = 0.0;
  let discounts = 0.0;
  try {
    order.map((product) => {
      if (product.priceArray.discount !== null) {
        if (product.priceArray.discount.type === 1) {
          total += (product.cost)*(product.cant);
          discounts += (product.cost)*(product.priceArray.discount.discountInfo)*(product.cant);
        } else {
          total += (product.cost)*(product.cant);
          discounts += (product.priceArray.discount.discountInfo)*(product.cant);
        }
      }else {
        total += (product.cost)*(product.cant);
      }
      if((product.modifierProduct)[0]?.id != null){
        (product.modifierProduct).map((modifierProduct)=>{
          total += modifierProduct.price * modifierProduct.cantModifier;
        })
      }
    });   
    return {
      total:parseFloat(total).toFixed(2),
      discounts:parseFloat(discounts).toFixed(2),
    };
  } catch (error) {
    console.log(error);
    return total;
  }
};

export default voids;
