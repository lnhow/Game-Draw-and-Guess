import { useState } from 'react';
import MaterialTable from "material-table";
import {tableIcons} from './configIcon'

export default function DisableFieldEditable({datas,lookupCategory}) {
    
    const [columns, setColumns] = useState([
        { title: 'id', field: 'id',hidden:true },
      { title: 'Name', field: 'roomName' },
      { title: 'Category', field: 'categoryId', lookup:lookupCategory, },
      { title: 'Max Player', field: 'maxPlayer', type: 'numeric' },
      { title: 'Status', field: 'roomStatus'},
    ]);
    // const [columns, setColumns] = useState([
    //     { title: 'Name', field: 'name', editable: 'onUpdate' },
    //     { title: 'Surname', field: 'surname', editable: 'never' },
    //     { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    //     {
    //       title: 'Birth Place',
    //       field: 'birthCity',
    //       lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    //     },
    //   ]);
    
    const [data, setData] = useState([
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
      ]);
    console.log('lookupCategory->:  ',lookupCategory)
    console.log('datasssssssssssss->:  ',datas)

    const handleDelete = (oldData) =>{
        return (
            new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);
    
                  resolve();
                }, 1000)
              })
        )  
    }


  
    return (
      <MaterialTable
        title="Rooms"
        icons={tableIcons}
        columns={columns}
        data={datas}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
                console.log(newData)
            //   setTimeout(() => {
            //     setData([...data, newData]);
  
            //     resolve();
            //   }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
  
                resolve();
              }, 1000)
            }),
          onRowDelete:handleDelete,
        }}
      />
    )
  }
  