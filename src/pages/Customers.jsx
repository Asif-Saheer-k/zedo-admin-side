import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import swal from "sweetalert";
import axios from "axios";
import { useSelector } from "react-redux";

const Customers = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: true, allowEditing: true };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const AdminDeatails = useSelector((state) => state.admindData.value);
  const columns = [
    {
      name: "CUST_ID",
      selector: (row) => row.CUST_ID,
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "PHONE",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "ACTION",
      sortable: true,
      cell: (row) => (
        <>
          <DeleteIcon
            style={{
              fontSize: "18px",
              color: "red",
              marginLeft: "10px",
              cursor: "pointer",
            }}
            onClick={() => deleteuser(row.CUST_ID)}
          />
        </>
      ),
    },
  ];

  const tableData = {
    columns,
    data,
  };

  const deleteuser = async (id) => {
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
            `http://18.208.225.35/api/admin/delete-user/${id}`,

            config
          );

          setLoading(true);
          setLoading(false);
          swal("Good job!", "You clicked the button!", "success");
        } catch (eror) {
          swal("OOPS!", "Somthing Went Wrong!", "error");
        }
      } else {
        swal("Your Data Is Safe");
      }
    });
  };

  //take all users
  useEffect(() => {
    (async function () {
      try {
        const config = {
          headers: {
            "auth-token": AdminDeatails.token,
          },
        };
        const { data } = await axios.get(
          "http://18.208.225.35/api/admin/view-allusers",
          config
        );
 
        setData(data);
      } catch (error) {
        console.log(error);
        swal("OOPS!", "Somthing Went Wrong!", "error");
      }
    })();
  }, [loading]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <DataTableExtensions {...tableData}>
        <DataTable
          title={"User Deatails"}
          columns={columns}
          data={data}
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
      </DataTableExtensions>
    </div>
  );
};

export default Customers;
