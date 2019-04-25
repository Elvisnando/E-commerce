export const login = (email, password, success, error) => {
  fetch('/login/authenticate',
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(success)
    .catch(error);
}

export const registrationBuyer = (email, password, name, surname, birthday, question, answer, success, error) => {

  var global = {};
  var userDto = {email: email, name: name, password: password, business: false, merchant: false, restaurant: false, producer: false, admin: false, inRecovery: false, question: question, answer: answer};
  var buyerDto = {surname: surname, birthday: birthday};

  global['userDto'] = userDto;
  global['buyerDto'] = buyerDto;

  fetch('/registration/addUser',
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(global)
  })
  .then(success)
  .catch(error);
}

export const registrationBusiness = (email, password, name, address, piva, business, producer, merchant, restaurant, question, answer, success, error) => {
  var global = {};
  if (producer) {
    var producerDto = {address: address, piva: piva};
    global['producerDto'] = producerDto;
  }
  if (merchant) {
    var merchantDto = {address: address, piva: piva};
    global['merchantDto'] = merchantDto;
  }
  if (restaurant) {
    var restaurantDto = {address: address, piva: piva};
    global['restaurantDto'] = restaurantDto;
  }
  var userDto = {email: email, name: name, password: password, business: business, producer: producer, merchant: merchant, restaurant: restaurant, admin: false, question: question, answer: answer};
  global['userDto'] = userDto;
  
  fetch('/registration/addUser',
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(global)
    })
    .then(success)
    .catch(error);
}

export const product = (product, success, error) => {
  fetch('/search?product=' + product,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(success)
    .catch(error);
}

export const updateUser = (name, surname, birthday, password, success, error) => {
  let array = {name: name, surname: surname, birthday: birthday, password: password};
  fetch('/admin/modifyUser',
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify(array)
    })
    .then(success)
    .catch(error);
}

export const getUser = (email, success, error) => {
  fetch('/admin/user?email=' + email,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(success)
    .catch(error);
}

export const getUserPaymentInfo = (email, success, error) => {
  fetch('/admin/paymentInfo?email=' + email,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(success)
    .catch(error);
}


export const payUsingPentacoin = (token, success, error) => {
  fetch('/blockchain/sendTransaction',
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer "+token
      }
    })
    .then(success)
    .catch(error);
}

export const getUserShippingInfo = (email, success, error) => {
  fetch('/admin/shippingInfo?email=' + email,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(success)
    .catch(error);
}

export const getAllUser = (success, error) => {
  fetch('/search?product=',
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(success)
    .catch(error);
}

export const getAllProducts = (name, success, error) => {
  fetch('/searchProductsByFilter?name=' + name,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(success)
    .catch(error);
}

export const insertProduct = (name, description, availability, origin, price, currency, type, token, success, error) => {
  fetch('/product/add',
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer "+ token
    },
    body: JSON.stringify({
      availability: availability,
      description: description,
      expiryDate: "2019-01-02",
      name:name,
      origin:origin,
      price:price,
      sellerId:0,
      type:null,
    })
    })
    .then(success)
    .catch(error);
}

  export const addToCart = (id, av, token, success, error) => {
    fetch('/Cart/add',
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer "+token
      },
      body: JSON.stringify({
        idProduct: id,
        quantity: av
        
        
      })
      })
      .then(success)
      .catch(error);
    }

    export const checkQuantityInCartPerProduct = (id, token, success, error) => {
      fetch('/Cart/checkQuantity',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer "+token
        },
        body: JSON.stringify({
          idProduct: id,
                 
        })
        })
        .then(success)
        .catch(error);
      }
  
  

  //-------------

export const productsOwner = (success, error) => {
  fetch('/searchProductsOwner' ,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(success)
    .catch(error);
}

export const receiveAvailabilityProduct = (id, success, error) => {
  fetch('/searchQuantityProduct?idProduct='+ id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(success)
    .catch(error);
}

export const retrieveProductDetails = (id, success, error) => {
  fetch('/productDetails?productID='+ id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(success)
    .catch(error);
}


export const sendFilter = (name, producer, location, expireDate, min, max, availability, success, error) => {
  fetch('/searchProductsByFilter?name=' + name +'&origin=' + location + '&expiryDate=' + expireDate +'&availability='+availability +'&minPrice='+min+'&maxPrice='+max,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
    })
    .then(success)
    .catch(error);
}

export const sendAllProductTest = (name, producer, location, expireDate, min, max, availability, success, error) => {
    fetch('/searchProductsByFilter?name=' + name +'&origin=' + location + '&expiryDate=' + expireDate +'&availability='+availability +'&minPrice='+min+'&maxPrice='+max,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
      })
      .then(success)
      .catch(error);
} 

export const receiveProductByName = (name, success, error) => {
  fetch('/searchProductByName?name=' + name,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
    })
    .then(success)
    .catch(error);
  }

export const recoveryPassword = (email, answer, success, error) => {
    fetch('/forget/password',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: email,
          answer: answer
        })
      })
      .then(success)
      .catch(error);
  }

export const resetPassword = (token, password, success, error) => {
  fetch('/forget/reset',
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        token: token,
        password: password
      })
    })
    .then(success)
    .catch(error);
}

export const getProductFromCart = (token, success, error) => {
  fetch('/Cart/retrieve',
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + token
      }
    })
    .then(success)
    .catch(error);
}

export const deleteItemToChart = (id, token, succex, errorx) => {
  debugger;
  fetch('/Cart/removeOneProduct',
  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer "+token
      },
      body: JSON.stringify({
        
          "productID": id
        
      })
    })
    .then(succex)
    .catch(errorx);
}

export const emptyCart = (token, succex, errorx) => {
  fetch('/Cart/emptyCart',
  {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer "+token
      }
    })
    .then(succex)
    .catch(errorx);
}

export const sendNewProduct = (token, product, success, error, file) => {
  fetch('/product/add',
  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer "+ token
      },
      body: JSON.stringify(product)
    })
    .then(response => response.status === 200 && uploadFile(token, file, success, error, response))
    .catch(error);
}

const uploadFile = async (token, file, success, error, response) => {
  
  var id = await response.json();
  const image = new FormData();
  image.append('file', file);
  image.append('name', id);
  fetch('/product/upload',
  {
      method: "POST",
      headers: {
        "Authorization": "Bearer "+ token
      },
      body: image
    })
    .then(success)
    .catch(error);
}

export const getFile = (id, success, error) => {
  fetch('/getImage?productID=' + id,
  {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        // "Authorization": "Bearer "+token
      }
    })
    .then(success)
    .catch(error);
}
