// import React, { useMemo, useState } from "react";
// import MaterialReactTable from "material-react-table";
// import { data } from "./makeData";

// const Example = () => {
//   const columns = useMemo( () => [
//       {
//         accessorKey: "firstName",
//         header: "First Name",
//       },
//       {
//         accessorKey: "lastName",
//         header: "Last Name",
//       },

//       {
//         accessorKey: "address",
//         header: "Address",
//       },
//       {
//         accessorKey: "city",
//         header: "City",
//       },

//       {
//         accessorKey: "state",
//         header: "State",
//       }, //end
//     ],
//     []
//   );

//   const [tableData, setTableData] = useState(() => data);

//   const handleSaveRow = async ({ exitEditingMode, row, values }) => {
//     //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
//     tableData[row.index] = values;
//     //send/receive api updates here
//     setTableData([...tableData]);
//     exitEditingMode(); //required to exit editing mode
//   };

//   return (
//     <MaterialReactTable
//       columns={columns}
//       data={tableData}
//       editingMode="row"
//       enableEditing
//       onEditingRowSave={handleSaveRow}
//     />
//   );
// };

// export default Example;
// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
// import { sampleProducts } from './sample-products';
// import EditForm from './editForm';
// const EditCommandCell = props => {
//   return <td>
//       <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" onClick={() => props.enterEdit(props.dataItem)}>
//         Edit
//       </button>
//     </td>;
// };
// const App = () => {
//   const [openForm, setOpenForm] = React.useState(false);
//   const [editItem, setEditItem] = React.useState({
//     ProductID: 1
//   });
//   const [data, setData] = React.useState(sampleProducts);
//   const enterEdit = item => {
//     setOpenForm(true);
//     setEditItem(item);
//   };
//   const handleSubmit = event => {
//     let newItem = true;
//     let newData = data.map(item => {
//       if (event.ProductID === item.ProductID) {
//         newItem = false;
//         item = {
//           ...event
//         };
//       }
//       return item;
//     });
//     if (newItem) {
//       newData.push(event);
//     }
//     setData(newData);
//     setOpenForm(false);
//   };
//   const addNew = () => {
//     setOpenForm(true);
//     setEditItem({
//       ProductID: 99
//     }); // you need to change the logic for adding unique ID value;
//   };

//   const handleCancelEdit = () => {
//     setOpenForm(false);
//   };
//   const MyEditCommandCell = props => <EditCommandCell {...props} enterEdit={enterEdit} />;
//   return <React.Fragment>
//       <Grid style={{
//       height: '400px'
//     }} data={data}>
//         <GridToolbar>
//           <button title="Add new" className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" onClick={addNew}>
//             Add new
//           </button>
//         </GridToolbar>
//         <Column field="ProductID" title="ID" width="40px" />
//         <Column field="ProductName" title="Name" width="250px" />
//         <Column field="Category.CategoryName" title="CategoryName" />
//         <Column field="UnitPrice" title="Price" />
//         <Column field="UnitsInStock" title="In stock" />
//         <Column cell={MyEditCommandCell} />
//       </Grid>
//       {openForm && <EditForm cancelEdit={handleCancelEdit} onSubmit={handleSubmit} item={editItem} />}
//     </React.Fragment>;
// };
// ReactDOM.render(<React.Fragment>
//     <App />
//     <style>
//       {`.k-animation-container {
//             z-index: 10003;
//         }`}
//     </style>
//   </React.Fragment>, document.querySelector('my-app'));import * as React from 'react';
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Close";
import {
  useGridApiRef,
  DataGridPro,
  GridToolbarContainer,
} from "@mui/x-data-grid-pro";
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
} from "@mui/x-data-grid-generator";
import { createTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: "inline-flex",
      alignItems: "center",
      gap: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
    textPrimary: {
      color: theme.palette.text.primary,
    },
  }),
  { defaultTheme }
);

function RowMenuCell(props) {
  const { api, id } = props;
  const classes = useStyles();
  const isInEditMode = api.getRowMode(id) === "edit";

  const handleEditClick = (event) => {
    event.stopPropagation();
    api.setRowMode(id, "edit");
  };

  const handleSaveClick = (event) => {
    event.stopPropagation();
    api.commitRowChange(id);
    api.setRowMode(id, "view");

    const row = api.getRow(id);
    api.updateRows([{ ...row, isNew: false }]);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    api.updateRows([{ id, _action: "delete" }]);
  };

  const handleCancelClick = (event) => {
    event.stopPropagation();
    api.setRowMode(id, "view");

    const row = api.getRow(id);
    if (row.isNew) {
      api.updateRows([{ id, _action: "delete" }]);
    }
  };

  if (isInEditMode) {
    return (
      <div className={classes.root}>
        <IconButton
          color="primary"
          size="small"
          aria-label="save"
          onClick={handleSaveClick}
        >
          <SaveIcon fontSize="small" />
        </IconButton>
        <IconButton
          color="inherit"
          size="small"
          aria-label="cancel"
          className={classes.textPrimary}
          onClick={handleCancelClick}
        >
          <CancelIcon fontSize="small" />
        </IconButton>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        className={classes.textPrimary}
        size="small"
        aria-label="edit"
        onClick={handleEditClick}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        color="inherit"
        size="small"
        aria-label="delete"
        onClick={handleDeleteClick}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
}

RowMenuCell.propTypes = {
  api: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

const rows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];

const columns = [
  { field: "name", headerName: "Name", width: 180, editable: true },
  { field: "age", headerName: "Age", type: "number", editable: true },
  {
    field: "dateCreated",
    headerName: "Date Created",
    type: "date",
    width: 180,
    editable: true,
  },
  {
    field: "lastLogin",
    headerName: "Last Login",
    type: "dateTime",
    width: 220,
    editable: true,
  },
  {
    field: "actions",
    headerName: "Actions",
    renderCell: RowMenuCell,
    sortable: false,
    width: 100,
    headerAlign: "center",
    filterable: false,
    align: "center",
    disableColumnMenu: true,
    disableReorder: true,
  },
];

function EditToolbar(props) {
  const { apiRef } = props;

  const handleClick = () => {
    const id = randomId();
    apiRef.current.updateRows([{ id, isNew: true }]);
    apiRef.current.setRowMode(id, "edit");
    // Wait for the grid to render with the new row
    setTimeout(() => {
      apiRef.current.scrollToIndexes({
        rowIndex: apiRef.current.getRowsCount() - 1,
      });

      apiRef.current.setCellFocus(id, "name");
    }, 150);
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  apiRef: PropTypes.shape({
    current: PropTypes.object.isRequired,
  }).isRequired,
};

export default function FullFeaturedCrudGrid() {
  const apiRef = useGridApiRef();

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGridPro
        rows={rows}
        columns={columns}
        apiRef={apiRef}
        editMode="row"
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { apiRef },
        }}
      />
    </div>
  );
}
