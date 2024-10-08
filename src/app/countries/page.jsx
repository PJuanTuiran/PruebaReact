"use client";
import CreateDialog from "@/components/CreateDialog/CreateDialog";
import DeleteDialog from "@/components/DeleteDialog/DeleteDialog";
import EditDialog from "@/components/EditDialog/EditDialog";
import { useEffect, useState } from "react";

import axios from "axios";
import TableComponent from '../../components/Tables/TableComponent';
import { Box } from "@mui/material";
import { URL_BD_POST } from "@/connection/endpoints";
import CreateButton from "@/components/UI/button/CreateButton";
import AlertNotification from "@/components/Alert/AlertNotificacion";
function CountriesPage() {

    const [data, setData] = useState([])
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [createData, setCreateData] = useState({ abreviatura: '', nombre: '', codigo: '', moneda: ''});
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editData, setEditData] = useState({ abreviatura: '', nombre: '' });
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");

;    const handleClickOpenDelete = (row) => {
        setSelectedRow(row);
        setDeleteDialogOpen(true);
    };

      const showAlert = (message, severity) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setAlertOpen(true);
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
                url: `${URL_BD_POST}8?id=${selectedRow.id}`,
                params: selectedRow,
            });
            setData(data.filter((item) => item.id !== selectedRow.id));
            handleCloseDelete();
            showAlert("Pais eliminado correctamente", "success");
        }
       } catch (error) {
        showAlert("Error al eliminar el pais", "error");
       }
    };

    const handleClickOpenEdit = (row) => {
        setEditData(row);
        setEditDialogOpen(true);
    };

    const handleCloseEdit = () => {
        setEditDialogOpen(false);
        setEditData({  abreviatura: '', nombre: '' });
    };
    
    const handleEditSave = async () => {
        try {
            await axios({
                method: 'post',
                url: `${URL_BD_POST}9?id=${editData.id}`,
                params: editData,
            });
            setData(data.map((item) => (item.id === editData.id ? editData : item)));
            handleCloseEdit();
            showAlert("Pais editado correctamente", "success");
        } catch (error) {
            showAlert("Error al editar el pais", "error");

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
        setCreateData({ abreviatura: '', nombre: '', codigo: '', moneda: ''});
    };

    const handleCreateSave = async () => {
    try {
        // Realizar el POST para crear la nueva categoría
        await axios({
            method: 'post',
            url: `${URL_BD_POST}6`,
            params: createData
            
        });

        // Luego, hacer un GET para obtener la lista actualizada
        const response = await axios({
            method: 'post',
            url: `${URL_BD_POST}7`  
        });
        const { listarcategorias } = response.data;
        setData(listarcategorias);

        handleCloseCreate();
        showAlert("Pais creado correctamente", "success");
    } catch (error) {
        showAlert("Error al crear el pais", "error");
    }
};
    const handleCreateChange = (e) => {
        setCreateData({ ...createData, [e.target.name]: e.target.value });
    };
    
    const columns = [
        { field: 'abreviatura', headerName: 'abreviatura', flex: 1},
        { field: 'nombre', headerName: 'name', flex: 1 },
        { field: 'codigo', headerName: 'code', flex: 1 },
        {
            field: 'moneda',
            headerName: 'currency',
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
                url: `${URL_BD_POST}7`
            })
            const {listarpaises} = response.data

            setData(listarpaises)
            

          
        }
        fetchData()
    }, [])

    return (
      
     <>
           <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px'}}>
                <div>
                     <h2>Countries</h2>
                     <p>List of Countries</p>
                </div>
                <CreateButton handleCloseCreate={handleClickOpenCreate} text="Create Country"></CreateButton>
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
              allowedFields={['abreviatura', 'nombre']}
              handleFieldChange={handleEditChange} text={'Edit Country'}/>
            
          <CreateDialog
              createDialogOpen={createDialogOpen}
              handleCloseCreate={handleCloseCreate}
              handleCreateSave={handleCreateSave}
                fields={createData}
                allowedFields={['abreviatura', 'nombre']}
                handleCreateChange={handleCreateChange} text={'Create Country'} />
          <AlertNotification
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                severity={alertSeverity}
                message={alertMessage}
            />
            
      </>
  )
}
export default CountriesPage