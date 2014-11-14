var ProductModel = require('./models/listing');

module.exports = function(app, passport) {
  // PROFILE SECTION =========================
  // POST to CREATE
  app.post('/api/products', function (req, res) {
    var product;
    var tags;
    console.log("POST: ");
    console.log(req.body);
    if ( req.body.tags !== ''){
       tags = req.body.tags.split(' ');
    }
    else {
      tags = [];
    }

    //laundry wash clean
    product = new ProductModel({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      provider: req.body.user,
      tags: tags
    });
    product.save(function (err) {
      if (!err) {
        return console.log("created");
      } else {
        return console.log(err);
      }
    });
    return res.send(product);
  });

  // PUT to UPDATE

  // Bulk update
  app.put('/api/products', function (req, res) {
      var i, len = 0;
      console.log("is Array req.body.products");
      console.log(Array.isArray(req.body.products));
      console.log("PUT: (products)");
      console.log(req.body.products);
      if (Array.isArray(req.body.products)) {
          len = req.body.products.length;
      }
      for (i = 0; i < len; i++) {
          console.log("UPDATE product by id:");
          for (var id in req.body.products[i]) {
              console.log(id);
          }
          ProductModel.update({ "_id": id }, req.body.products[i][id], function (err, numAffected) {
              if (err) {
                  console.log("Error on update");
                  console.log(err);
              } else {
                  console.log("updated num: " + numAffected);
              }
          });
      }
      return res.send(req.body.products);
  });

  // Single update
  app.put('/api/products/:id', function (req, res) {
    return ProductModel.findById(req.params.id, function (err, product) {
      product.title = req.body.title;
      product.description = req.body.description;
      product.price = req.body.price;
      produce.provider = req.body.user;
      return product.save(function (err) {
        if (!err) {
          console.log("updated");
        } else {
          console.log(err);
        }
        return res.send(product);
      });
    });
  });

  // GET to READ

  // List products
  app.get('/api/products', function (req, res) {
    return ProductModel.find(function (err, products) {
      if (!err) {
        // HACKTICIAN
        //calculate score for service

        return res.send(products);
      } else {
        return console.log(err);
      }
    });
  });

  // Single product
  app.get('/api/products/:id', function (req, res) {
    return ProductModel.findById(req.params.id, function (err, product) {
      if (!err) {
        return res.send(product);
      } else {
        return console.log(err);
      }
    });
  });

  // DELETE to DESTROY

  // Bulk destroy all products
  app.delete('/api/products', function (req, res) {
    ProductModel.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });

  // remove a single product
  app.delete('/api/products/:id', function (req, res) {
    return ProductModel.findById(req.params.id, function (err, product) {
      return product.remove(function (err) {
        if (!err) {
          console.log("removed");
          return res.send('');
        } else {
          console.log(err);
        }
      });
    });
  });

  //Subsciptions
 app.post('/api/products/subscribe', function (req,res) {
   console.log(req.body);
   return ProductModel.findById(req.body.id, function (err, product) {
     //save the info
     console.log(product);
     if (product.subscribers.indexOf(req.body.user)>=0){
       res.send("already subscribed redirect");
     }
     product.subscribers.push(req.body.user);
     return product.save(function (err) {
       if (!err){
         console.log("subscribed");
         return res.send('success');
       }
       else {
         console.log(err);
         res.end('error');
       }
     });
   });
 });

 //reviews

app.post('/api/products/reviews', function (req,res) {
  console.log(req.body);
  return ProductModel.findById(req.body.id, function (err, product) {
    //save the info
    console.log(product);
    //prefille reviews

    product.reviews.push({
      body: req.body.body,
      title: req.body.title,
      stars: req.body.stars,
      time: Date.now()
    });
    return product.save(function (err) {
      if (!err){
        console.log("review added");
        return res.send('added review');
      }
      else {
        console.log(err);
        res.end('error');
      }
    });
  });
});
};
