import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { set } from "mongoose";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [transmission,setTransmission] = useState("");
  const [description,setdescription] = useState("");
  const [color,setColor] = useState("");
  const [condition,setCondition] = useState("");
  const [photo, setPhoto] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/car/get-car/${params.slug}`
      );
      setName(data.car.name);
      setId(data.car._id);
      setdescription(data.car.description);
      setPrice(data.car.price);
      setPrice(data.car.price);
      setPhoto(data.car.photo);
      setModel(data.car.model);
      setYear(data.car.year);
      setMileage(data.car.mileage);
      setTransmission(data.car.transmission);
      setColor(data.car.color);
      setCondition(data.car.condition);
      setPhone(data.car.phone);
      setAddress(data.car.address);

     
      
      setCategory(data.car.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const carData = new FormData();
      carData.append("name", name);
      carData.append("description", description);
      carData.append("price", price);
      carData.append("model", model);
      carData.append("year", year);
      carData.append("mileage", mileage);
      carData.append("transmission", transmission);
      carData.append("color", color);
      carData.append("condition", condition);
      carData.append("phone", phone);
      carData.append("address", address);
      photo && carData.append("photo", photo);
      carData.append("category", category);
      const { data } = axios.put(
        `/api/v1/car/update-car/${id}`,
        carData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/cars");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/car/delete-car/${id}`
      );
      toast.success("Product DEleted Succfully");
      navigate("/dashboard/admin/cars");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/car/car-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setdescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={model}
                  placeholder="write a model"
                  className="form-control"
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={year}
                  placeholder="write a year"
                  className="form-control"
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={mileage}
                  placeholder="write a mileage"
                  className="form-control"
                  onChange={(e) => setMileage(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={transmission}
                  placeholder="write a transmission"
                  className="form-control"
                  onChange={(e) => setTransmission(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={color}
                  placeholder="write a color"
                  className="form-control"
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={condition}
                  placeholder="write a condition"
                  className="form-control"
                  onChange={(e) => setCondition(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={phone}
                  placeholder="write a phone"
                  className="form-control"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={address}
                  placeholder="write a address"
                  className="form-control"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              
              
              
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;