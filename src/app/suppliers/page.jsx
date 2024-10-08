"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import DeleteDialog from "@/components/DeleteDialog/DeleteDialog";
import EditDialog from "@/components/EditDialog/EditDialog";
import CreateDialog from "@/components/CreateDialog/CreateDialog";
import TableComponent from "../../components/Tables/TableComponent";
import { Box } from "@mui/material";
import { URL_BD_POST } from "@/connection/endpoints";
import CreateButton from "@/components/UI/button/CreateButton";
import AlertNotification from "@/components/Alert/AlertNotificacion";

function SuppliersPage() {
  const [data, setData] = useState([])
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [createData, setCreateData] = useState({bodega: 3, subcategoria: 37, descripcion: '', costo: '', precioventa: ''});
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editData, setEditData] = useState({ descripcion: '', costo: '', precio: '' });
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");
    

    const showAlert = (message, severity) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setAlertOpen(true);
    };
;    const handleClickOpenDelete = (row) => {
        setSelectedRow(row);
        setDeleteDialogOpen(true);
    };

     const handleCloseDelete = () => {
        setDeleteDialogOpen(false);
        setSelectedRow(null);
    };

    const handleDelete = async () => {
        try {
            if (selectedRow) {
                await axios({
                    method: 'post',
                    url: `${URL_BD_POST}31?id=${selectedRow.id}`,
                    params: selectedRow,
                });
                setData(data.filter((item) => item.id !== selectedRow.id));
                handleCloseDelete();
                showAlert("Proveedorador eliminado correctamente", "success");
            }   
        } catch (error) {
            showAlert("Error al eliminar el proveedorador", "error");   
          
      }
    };

    const handleClickOpenEdit = (row) => {
        setEditData(row);
        setEditDialogOpen(true);
    };

    const handleCloseEdit = () => {
        setEditDialogOpen(false);
        setEditData({  descripcion: '', costo: '', precio: ''});
    };
    
    const handleEditSave = async () => {
        try {
            await axios({
                method: 'post',
                url: `${URL_BD_POST}30?id=${editData.id}`,
                params: editData,
            });
            setData(data.map((item) => (item.id === editData.id ? editData : item)));
            handleCloseEdit();
            showAlert("Proveedorador editado correctamente", "success");
        } catch (error) {
            showAlert("Error al editar el proveedorador", "error");
        }
  };
    const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
      const handleClickOpenCreate = () => {
        setCreateDialogOpen(true);
    };

    const handleCloseCreate = () => {
        setCreateDialogOpen(false);
        setCreateData({bodega: 3, subcategoria: 37, descripcion: '', costo: '', precio: ''});
    };

    const handleCreateSave = async () => {
    try {
        // Realizar el POST para crear la nueva categoría
        await axios({
            method: 'post',
            url: `${URL_BD_POST}28  `,
            params: createData
            
        });

        
        const response = await axios({
            method: 'post',
            url: `${URL_BD_POST}29`,    
        });
        const { listarinsumos } = response.data;
        setData(listarinsumos);

        handleCloseCreate();
        showAlert("Insumo creado correctamente", "success");
    } catch (error) {
        showAlert("Error al crear el insumo", "error");
    }
};
    const handleCreateChange = (e) => {
        setCreateData({ ...createData, [e.target.name]: e.target.value });
    };
    
    const columns = [
        { field: 'id', headerName: 'Id', flex: 1},
        { field: 'descripcion', headerName: 'Description', flex: 1 },
        { field: 'costo', headerName: 'Cost', flex: 1 },
        {
            field: 'precioventa',
            headerName: 'Price',
            type: 'number',
            flex: 1,
            
        },
        {
            field: 'fechacreacion',
            headerName: 'Date of creation',
            type: 'number',
            flex: 1,
            
        },
         {
            field: 'actions',
            headerName: 'Actions',
            type: 'number',
            flex: 1,
            
        },
    ];
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios({
                method: 'post',
                url: `${URL_BD_POST}29`,
            })
            const {listarinsumos} = response.data

            setData(listarinsumos)
            

          
        }
        fetchData()
    }, [])

    return (
      
     <>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px'}}>
                <div>
                     <h2>Suppliers</h2>
                     <p>List of suppliers</p>
                </div>
                <CreateButton handleCloseCreate={handleClickOpenCreate} text="Create Supplier"></CreateButton>
            </Box>
          <TableComponent
              rows={data}
              columns={columns}
              onEdit={handleClickOpenEdit}
              onDelete={handleClickOpenDelete} />
          <DeleteDialog
              deleteDialogOpen={deleteDialogOpen}
              handleCloseDelete={handleCloseDelete}
              handleDelete={handleDelete}/>
              
          <EditDialog
              editDialogOpen={editDialogOpen}
              handleCloseEdit={handleCloseEdit}
              handleEditSave={handleEditSave}
              fields={editData}
              allowedFields={['descripcion', 'unidad', "costo", "precio"]}
              handleFieldChange={handleEditChange} text={"Edit Supplier"} />
          <CreateDialog
              createDialogOpen={createDialogOpen}
              handleCloseCreate={handleCloseCreate}
              handleCreateSave={handleCreateSave}
              fields={createData}
              allowedFields={['descripcion', 'unidad', "costo", "precio"]}
                handleCreateChange={handleCreateChange} text={"Create Supplier"} />
            <AlertNotification
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                severity={alertSeverity}
                message={alertMessage}
            />
      </>
  )
}
export default SuppliersPage