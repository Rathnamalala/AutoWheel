import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);



  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/car/get-car/${params.slug}`
      );
      setCar(data?.car);
      getSimilarProduct(data?.car._id, data?.car.category._id);
    } catch (error) {
      console.log(error);
    }
  };


  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/car/related-car/${pid}/${cid}`
      );
      setRelatedProducts(data?.cars);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
        {car._id && (
          <img
            src={`/api/v1/car/car-photo/${car._id}`}
            className="card-img-top"
            alt={car.name}
            height="300"
            width={"350px"}
          />)}
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {car.name}</h6>
          <h6>Address : {car.address}</h6>
          <h6>Phone number: {car.phone}</h6>
          <h6>
            Price :
            {car?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6>Category : {car?.category?.name}</h6>
          <h6>Transmission : {car.transmission}</h6>
          <h6>Condition : {car.condition}</h6>
          <h6>Shipping : {car.shipping ? "Available" : "Not Available"}</h6>
          <h6>Color : {car.color}</h6>
          <h6>Model : {car.model}</h6>
          <h6>Year : {car.year}</h6>
          <h6>Description : {car.description}</h6>


          <button class="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Cars ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Cars found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`/api/v1/car/car-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  {/* <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
