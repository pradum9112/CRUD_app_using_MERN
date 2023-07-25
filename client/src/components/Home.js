import React, { useState, useEffect,useContext } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from "react-router-dom";
import {adddata,updatedata,deldata} from './context/ContextProvider';




const Home = () => {

  document.title = 'Crud-Application'

  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const {udata,setUdata}= useContext(adddata);
  const {updata, setUpdata} = useContext(updatedata);
  const {dltdata,setDLTdata} = useContext(deldata); 


  const getdata = async (e) => {


    const res = await fetch("/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });


    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      alert("error");
      console.log("error");
    }
    else {
      setUserdata(data);
      console.log("Get data");
    }
  }

  useEffect(() => {
    getdata();
  }, [])


  const  deleteuser = async(id)=>{
        
    const res2 = await fetch(`/deleteuser/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    });
    const deletedata = await res2.json();
    console.log(deletedata);

    if(res2.status === 422 || !deletedata){
      console.log("error");
    }else{
      console.log("user deleted");
      setDLTdata(deletedata);
      getdata();
    }
  }
  useEffect(()=>{
    deleteuser();
  },[]) 




  return (

     <>
{
  udata ?
  <>
  <div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>{udata.name}</strong> added successfully!
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
  </> : ""
}

{
  updata ?
  <>
  <div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong> {updata.name}</strong> updated successfully!
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>  
  </> : ""
}

{
  dltdata ?
  <>
  <div class="alert alert-danger alert-dismissible fade show" role="alert">
  <strong> {dltdata.name} </strong> deleted  successfully!
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>  
  </> : ""
}



      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2 ">
            <NavLink to="/register" className="btn btn-primary">Add Data</NavLink>
          </div>

          <table className="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">Id</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Job</th>
                <th scope="col">Number</th>
                <th scope="col"></th>
              </tr>

            </thead>
            <tbody>
              {
                getuserdata.map((element, id) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{id + 1}</th>
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        <td>{element.work}</td>
                        <td>{element.mobile}</td>
                        <td className="d-flex justify-content-between">
                          <NavLink to={`view/${element._id}`} ><button className="btn btn-success" ><RemoveRedEyeIcon /></button></NavLink>
                          <NavLink to={`edit/${element._id}`} ><button className="btn btn-primary mx-1"><CreateIcon /></button></NavLink>
                          <button className="btn btn-danger" onClick={() => deleteuser(element._id)} ><DeleteOutlineIcon /></button>
                        </td>
                      </tr>
                    </>
                  )
                })
              }


            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
