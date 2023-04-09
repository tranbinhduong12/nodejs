import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import "./productList.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

export default function ProductList() {
  // change name page
  document.title = "Product List";
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = async (id) => {
    await deleteProduct(id, dispatch);
    getProducts(dispatch);
  };

  const columns = [
    {
      field: "product",
      headerName: "Product",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "description", headerName: "description",
    flex: 1
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1
    },
    {
      field: "quantity",
      headerName: "quantity",
      flex: 1
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">View</button>
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (

    <div className="productList">
      <div className='productListTitle'>
        <h1 className="productTitle">Product List</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>

      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
