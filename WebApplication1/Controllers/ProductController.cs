using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1;
using System.Data;
using System.Data.SqlClient;

namespace WebApplication1.Controllers
{
    public class ProductController : ApiController
    {

        public HttpResponseMessage GetAllProducts()
        {
            List<Products> productList = new List<Products>();
            using (var db = new ProductContext())
            {
                var products = from p in db.Products
                               select p;
                foreach(Products product in products)
                {
                    productList.Add(product);
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, System.Web.Helpers.Json.Encode(productList));
        }
        [HttpGet]
        public HttpResponseMessage GetProduct(int? id)
        {
            if (id != null)
            {
                using (var db = new ProductContext())
                {
                    Products product = (from p in db.Products
                                  where p.ID == id
                                  select p).FirstOrDefault();
                    if (product == null)
                        return Request.CreateResponse(HttpStatusCode.NotFound);
                    return Request.CreateResponse(HttpStatusCode.OK, System.Web.Helpers.Json.Encode(product));
                }
            }
            else return Request.CreateResponse(HttpStatusCode.OK, System.Web.Helpers.Json.Encode(GetAllProducts()));
        }
        [HttpPost]
        public HttpResponseMessage CreateProduct([FromBody] Products value)
        {
            if (value != null)
            {
                try
                {
                    using (var db = new ProductContext())
                    {
                        db.Products.Add(value);
                        db.SaveChanges();
                        value = (from p in db.Products
                                 orderby p.ID descending
                                 select p).First();
                    }
                }
                catch(System.Data.Entity.Validation.DbEntityValidationException e)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
                }
                string jsonValue = System.Web.Helpers.Json.Encode(value);
                return Request.CreateResponse(HttpStatusCode.Created, jsonValue);
            }
            else return Request.CreateResponse(HttpStatusCode.BadRequest);
        }
        [HttpPut]
        public HttpResponseMessage PutProduct([FromBody] Products value)
        {
            if ((!String.IsNullOrEmpty(value.Name) || !String.IsNullOrEmpty(value.Category) || value.Price > 0) && value.ID > 0)
            {
                using(var db = new ProductContext())
                {
                    var products = from p in db.Products
                                       where p.ID == value.ID
                                       select p;
                    if (products.Count() == 0)
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Not Found");
                    foreach(Products p in products)
                    {
                        p.Name = !String.IsNullOrEmpty(value.Name)? value.Name : p.Name;
                        p.Category = !String.IsNullOrEmpty(value.Category)? value.Category : p.Category;
                        p.Price = value.Price != null ? value.Price : p.Price;
                    }
                    try
                    {
                        db.SaveChanges();
                    }
                    catch(System.Data.Entity.Validation.DbEntityValidationException e)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
                    }
                    string jsonValue = System.Web.Helpers.Json.Encode(products.First());
                    return Request.CreateResponse(HttpStatusCode.OK, jsonValue);
                }
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }
    }
}
