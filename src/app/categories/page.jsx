"use client";

import axios from 'axios'
import TableComponent from '../../components/Tables/TableComponent'
import { useEffect, useState } from 'react'
import DeleteDialog from '../../components/DeleteDialog/DeleteDialog';
import EditDialog from '../../components/EditDialog/EditDialog';   
import CreateDialog from '../../components/CreateDialog/CreateDialog';  
import { Box } from '@mui/material';
import {URL_BD_POST} from '../../connection/endpoints';    
import CreateButton from '@/components/UI/button/CreateButton';
import AlertNotification from '@/components/Alert/AlertNotificacion';
function CategoriesPage() {
    const [data, setData] = useState([])
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [createData, setCreateData] = useState({ descripcion: '', comentarios: '' });
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editData, setEditData] = useState({ descripcion: '', comentarios: '' });
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
        if (selectedRow) {
            await axios({
                method: 'post',
                url: `${URL_BD_POST}27`,
                params: {
                    id: selectedRow.id
                }
            });
            setData(data.filter((item) => item.id !== selectedRow.id));
            handleCloseDelete();
            showAlert("Categoría eliminada correctamente", "success");
        }
    };

    const handleClickOpenEdit = (row) => {
        setEditData(row);
        setEditDialogOpen(true);
    };

    const handleCloseEdit = () => {
        setEditDialogOpen(false);
        setEditData({  descripcion: '', comentarios: '' });
    };
    
    const handleEditSave = async () => {
        await axios({
            method: 'post',
            url: `${URL_BD_POST}26?id=${editData.id}`,
            params: editData,  
            

        });
        setData(data.map((item) => (item.id === editData.id ? editData : item)));
        handleCloseEdit();
        showAlert("Categoría editada correctamente", "success");
  };
    const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
      const handleClickOpenCreate = () => {
        setCreateDialogOpen(true);
    };

    const handleCloseCreate = () => {
        setCreateDialogOpen(false);
        setCreateData({ descripcion: '', comentarios: '' });
    };

    const handleCreateSave = async () => {
    try {
        // Realizar el POST para crear la nueva categoría
        await axios({
            method: 'post',
            url: `${URL_BD_POST}24`,
            params: createData

        });

        // Luego, hacer un GET para obtener la lista actualizada
        const response = await axios({
            method: 'post',
            url: `${URL_BD_POST}25` 
        });
        const { listarcategorias } = response.data;
        setData(listarcategorias);

        handleCloseCreate();
        showAlert("Categoría creada correctamente", "success");
    } catch (error) {
        showAlert("Error al crear la categoría", "error");
    }
};
    const handleCreateChange = (e) => {
        setCreateData({ ...createData, [e.target.name]: e.target.value });
    };
    
    const columns = [
        { field: 'id', headerName: 'Category', flex: 1},
        { field: 'descripcion', headerName: 'Description', flex: 1 },
        { field: 'fechacreacion', headerName: 'Date of creation', flex: 1 },
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
                url: `${URL_BD_POST}25`,
            })
            const {listarcategorias} = response.data

            setData(listarcategorias)
            

          
        }
        fetchData()
    }, [])




  return (
      <>
           <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px'}}>
                <div>
                     <h2>Categories</h2>
                     <p>List of Categories</p>
                </div>
                <CreateButton handleCloseCreate={handleClickOpenCreate} text="Create Category"></CreateButton>
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
              allowedFields={['descripcion', 'comentarios', "id"]} 
              handleFieldChange={handleEditChange} text={'Edit Category'} />
          <CreateDialog
              createDialogOpen={createDialogOpen}
              handleCloseCreate={handleCloseCreate}
              handleCreateSave={handleCreateSave}
              fields={createData}
              allowedFields={['descripcion', 'comentarios']}
              handleCreateChange={handleCreateChange} text={'Create Category'} />
           <AlertNotification
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                severity={alertSeverity}
                message={alertMessage}
            />
      </>
  )
}
export default CategoriesPage