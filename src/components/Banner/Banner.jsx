import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import "./Banner.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import DeleteIcon from "@mui/icons-material/Delete";
function Banner() {
  const [image, setImage] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const AdminDeatails = useSelector((state) => state.admindData.value);
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm();
  const columns = [
    {
      name: "IMAGE",
      selector: (row) => (
        <img src={row.image} style={{ width: "150px", height: "100px" }} />
      ),
    },
    {
      name: "TITLE",
      selector: (row) => row.title,
    },
    {
      name: "SUB TITILE",
      selector: (row) => row.subTitle,
    },
    {
      name: "ACTION",

      cell: (row) => (
        <>
          <DeleteIcon
            style={{
              fontSize: "18px",
              color: "red",
              marginLeft: "10px",
              cursor: "pointer",
            }}
            onClick={() => deleteBanner(row._id)}
          />
        </>
      ),
    },
  ];

  const tableData = {
    columns,
    data,
  };
  const navigate = useNavigate();

  //take all banner
  useEffect(() => {
    (async function () {
      try {
        const config = {
          headers: {
            "auth-token": AdminDeatails.token,
          },
        };
        const { data } = await axios.get(
          "http://18.208.225.35/api/admin/view-all-banner",
          config
        );
        setData(data);
      } catch (error) {
        swal("OOPS!", "Email And Password Incorrect!", "error");
      }
    })();
  }, [loading]);

  //image uploading
  const Imageupload = () => {
    var myWidget = window.cloudinary.openUploadWidget(
      {
        cloudName: "dfx1wpxqz",
        uploadPreset: "iroqkwxu",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImage(result.info.url);

          // setImage((prev) => [
          //   ...prev,
          //   { url: result.info.url, public_id: result.info.public_id },
          // ]);
        }
      }
    );

    myWidget.open();
  };
  const onSubmit = async (data) => {
    const { title, subTitle, ID } = data;
    if (image) {
      try {
        const config = {
          headers: {
            "auth-token": AdminDeatails.token,
          },
        };
        const { data } = await axios.post(
          "http://18.208.225.35/api/admin/add-banner",
          {
            title,
            ID,
            image,
            subTitle,
          },
          config
        );
        reset()
        setImage("")
        setLoading(true);
        setLoading(false);
      } catch (error) {
        console.log(error);
        swal("OOPS!", "Email And Password Incorrect!", "error");
      }
    } else {
      swal("OOPS!", "Please Verify Image!", "error");
    }
  };
  const deleteBanner = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const config = {
            headers: {
              "auth-token": AdminDeatails.token,
            },
          };
          const { data } = await axios.delete(
            `http://18.208.225.35/api/admin/delete-banner/${id}`,

            config
          );

          setLoading(true);
          setLoading(false);
        } catch (error) {
          console.log(error);
          swal("OOPS!", "Somthing Wernt Wrong!", "error");
        }
      } else {
        swal("Your Data Is Safe");
      }
    });
  };

  return (
    <div className="container tm-mt-big tm-mb-big">
      <div className="row">
        <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
          <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
            <div className="row">
              <div className="col-12 text-center">
                <h2 className="text-light">ADD BANNER</h2>
              </div>
            </div>
            <form
              className="tm-edit-product-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="row tm-edit-product-row">
                <div className="col-xl-6 col-lg-6 col-md-12">
                  <div className="form-group mb-3">
                    <label for="name">Tittle</label>
                    <input
                      id="name"
                      name="title"
                      type="text"
                      className="form-control validate"
                      {...register("title", {
                        required: "Tittle is Required",
                        pattern: {
                          value: /^[A-Za-z\s]*$/,
                          message: "Invalid Tittle",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("title");
                      }}
                    />
                    {errors.title && (
                      <div>
                        <small className="text-danger">
                          {errors.title.message}
                        </small>
                      </div>
                    )}
                  </div>

                  <div className="form-group mb-3">
                    <label for="description">Sub Tittle</label>
                    <input
                      name="subTitle"
                      type="text"
                      className="form-control validate"
                      {...register("subTitle", {
                        required: "Sub Tittle is Required",
                        pattern: {
                          value: /^[A-Za-z\s]*$/,
                          message: "Invalid  Sub Tittle",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("subTitle");
                      }}
                    />
                    {errors.subTitle && (
                      <div>
                        <small className="text-danger">
                          {errors.subTitle.message}
                        </small>
                      </div>
                    )}
                  </div>
                  <div className="form-group mb-3">
                    <label for="name">Product Id</label>
                    <input
                      id="name"
                      name="ID"
                      type="text"
                      className="form-control validate"
                      {...register("ID", {
                        required: "ID is required",
                      })}
                      onKeyUp={() => {
                        trigger("ID");
                      }}
                    />
                    {errors.ID && (
                      <div>
                        <small className="text-danger">
                          {errors.ID.message}
                        </small>
                      </div>
                    )}
                  </div>
                  {/* <div className="form-group mb-3">
                    <label for="category">Category</label>
                    <select
                      className="custom-select tm-select-accounts"
                      id="category"
                      name="category"
                    >
                      <option selected>Select category</option>
                      <option value="1">New Arrival</option>
                      <option value="2">Most Popular</option>
                      <option value="3">Trending</option>
                    </select>
                  </div> */}
                  {/* <div className="row">
                    <div className="form-group mb-3 col-xs-12 col-sm-6">
                      <label for="expire_date">Expire Date</label>
                      <input
                        id="expire_date"
                        name="expire_date"
                        type="text"
                        className="form-control validate"
                        data-large-mode="true"
                      />
                    </div>
                    <div className="form-group mb-3 col-xs-12 col-sm-6">
                      <label for="stock">Units In Stock</label>
                      <input
                        id="stock"
                        name="stock"
                        type="text"
                        className="form-control validate"
                        required
                      />
                    </div>
                  </div> */}
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 mt-4 mx-auto mb-4">
                  {image ? (
                    <img className="tm-product-img-dummy" src={image} />
                  ) : (
                    <div className="tm-product-img-dummy mx-auto">
                      <svg
                        className="tm-upload-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                      </svg>
                    </div>
                  )}
                  <div className="custom-file mt-3 mb-3">
                    <input
                      id="fileInput"
                      type="file"
                      style={{ display: "none" }}
                    />
                    <input
                      type="button"
                      className="btn btn-primary btn-block mx-auto"
                      onClick={Imageupload}
                      value="UPLOAD PRODUCT IMAGE"
                      style={{ backgroundColor: "#f5a623" }}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    style={{ backgroundColor: "#f5a623" }}
                    className="btn btn-primary btn-block text-uppercase"
                  >
                    Add Product Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl mt-5">
        <DataTableExtensions {...tableData}>
          <DataTable
            title={"Banner Details"}
            columns={columns}
            data={data}
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
          />
        </DataTableExtensions>
      </div>
    </div>
  );
}

export default Banner;
