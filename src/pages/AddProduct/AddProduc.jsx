import React from "react";

function AddProduc() {
  return (
    <div className="container ">
      <form className="form-group myform">
        <div
          className="jumbotron ms-5 me-5 "
          style={{ backgroundColor: "ActiveBorder" }}
        >
          <h3 className="text-center text-primary mb-4 mt-2">PRODUCT INFO</h3>
          <div className="form-row row ms-2 me-2">
            <div className="form-group col-md-6">
              <label for="input">Select Sub Category</label>
              <select class="form-select form-control" aria-label="Default select example">
                <option selected>APPLE</option>
                <option value="1">SUMSUNG</option>
                <option value="2">HUAWEI</option>
                <option value="3">NOKIA</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label for="input">Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Product Deatails"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-row row ms-2 me-2">
            <div className="form-group col-md-6">
              <label for="input">Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Product Deatails"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-6">
              <label for="input">Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Product Deatails"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-row row ms-2 me-2">
            <div className="form-group col-md-6">
              <label for="input">Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Product Deatails"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-6">
              <label for="input">Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Product Deatails"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-row row ms-2 me-2">
            <div className="form-group col-md-6">
              <label for="input">Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Product Deatails"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-6">
              <label for="input">Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Product Deatails"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-row row">
            <div className="form-group col-md-6">
              <label for="input">Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Product Deatails"
                className="form-control"
              />
            </div>
            <div className="form-group col-md-6">
              <label for="input">Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Product Deatails"
                className="form-control"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProduc;
