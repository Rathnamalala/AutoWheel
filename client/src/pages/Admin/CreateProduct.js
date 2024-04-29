import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateCar = () => {
  const navigate = useNavigate();
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

  // Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Handle car creation
  const handleCreateCar = async (e) => {
    e.preventDefault();
    try {
      const carData = new FormData();
      carData.append("name", name);
      carData.append("model", model);
      carData.append("year", year);
      carData.append("mileage", mileage);
      carData.append("price", price);
      carData.append("category", category);
      carData.append("transmission", transmission);
      carData.append("description", description);
      carData.append("condition", condition);
      carData.append("color", color);
      carData.append("phone", phone);
      carData.append("address", address);

      carData.append("photo", photo);

      const { data } = await axios.post("/api/v1/car/create-car", carData);

      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashboard/admin/cars");
      } else {
        toast.error("Failed to create car");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Car"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Car</h1>
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
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="car_photo"
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
                  placeholder="Enter car name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={model}
                  placeholder="Enter car model"
                  className="form-control"
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={year}
                  placeholder="Enter manufacturing year"
                  className="form-control"
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={mileage}
                  placeholder="Enter mileage"
                  className="form-control"
                  onChange={(e) => setMileage(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Enter price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Transmission"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setTransmission(value);
                  }}
                >
                  <Option value="0">Auto</Option>
                  <Option value="1">Manual</Option>
                </Select>
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Condition"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setCondition(value);
                  }}
                >
                  <Option value="0">New</Option>
                  <Option value="1">Used</Option>
                </Select>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={color}
                  placeholder="Enter car Colour"
                  className="form-control"
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="Enter your phone number"
                  className="form-control"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="Enter your address"
                  className="form-control"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
             
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="Enter car Description"
                  className="form-control"
                  onChange={(e) => setdescription(e.target.value)}
                />
              </div>
             
              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  onClick={handleCreateCar}
                >
                  CREATE CAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCar;
