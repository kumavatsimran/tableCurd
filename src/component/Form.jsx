import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form() {
    let [data, setData] = useState({})
    let [hobby,setHobby]=useState([])
    let navigater=useNavigate()
   
    let handleInput = (e) => {
        let { name, value } = e.target;
        let newHobby = [...hobby];
    
        if (name === 'hobby') {
            if (e.target.checked) {
                newHobby.push(value);
            } else {
                let pos = newHobby.findIndex((val) => value === val);
                newHobby.splice(pos, 1);
            }
            setHobby(newHobby);
            setData({ ...data, hobby: newHobby });
        } else {
            setData({ ...data, [name]: value });
        }
    };
    
    let handlesubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/user',{
            method:'POST',
            body:JSON.stringify(data)
        }).then(()=>{
            toast.success('data added');
        }).catch((err)=>{
            console.log(err)
        })
        setTimeout(()=>{
            navigater('/Record')
        },500)
       

    }
    return (
        <>
            <h2>
                user data</h2>
                <Link to={'/Record'}>data show</Link>
            <form  method='post' onSubmit={handlesubmit} >
                <table align='center' border={1}>
                    <tr>
                        <td>Name</td>
                        <td><input type="text" name="name" onChange={handleInput}></input></td>
                    </tr>
                    <tr>
                        <td>email</td> 
                        <td><input type="text" name="email" onChange={handleInput}></input></td>
                    </tr>
                    <tr>
                        <td>hobby</td>
                        <td>
                            <lable>dance</lable><input type="checkbox" name="hobby" value="dance" onChange={handleInput}></input>
                            <label>music</label>
                            <input type="checkbox" name="hobby" value="music" onChange={handleInput}></input></td>

                    </tr>
                    <tr>
                        <td>city</td>
                        <td><select type="option" name='city' onChange={handleInput}>
                            <option value='surat' name='city' onChange={handleInput}>surat</option>
                            <option value='ahemdabad' name='city' onChange={handleInput}>ahemdabad</option>
                            <option value='baruch' name='city' onChange={handleInput}>baruch</option>

                        </select></td>

                    </tr>
                    <tr><td></td>
                        <td><input value='submit' type='submit'/></td></tr>
                </table>
            </form>
            <ToastContainer
                position="top-center"
                autoClose={20000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition: Bounce/>
        </>
    );
}

export default Form;
