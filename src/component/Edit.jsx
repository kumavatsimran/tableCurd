import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form() {
    let [data, setData] = useState({})
    let [hobby, setHobby] = useState([])
    let navigater = useNavigate()
    let { id } = useParams();
    console.log(id);
    let fetchData = () => {
        fetch(`http://localhost:3000/user/${id}`, {
            method: 'GET'
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                setData(data)
                setHobby(data.hobby)
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        return () => {
            fetchData();
        };
    }, []);

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
        value=newHobby
    };
   
    let handlesubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/user/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        }).then(() => {
            toast.success('data added');
        }).catch((err) => {
            console.log(err)
        })
        setTimeout(() => {
            navigater('/Record')
        }, 500)


    }
    return (
        <>
            <h2>
                edit user data</h2>
            <Link to={'/Record'}>data show</Link>
            <form method='post' onSubmit={handlesubmit} >
                <table align='center' border={1}>
                    <tr>
                        <td>Name</td>
                        <td><input type="text" name="name" value={data.name || ''} onChange={handleInput}></input></td>
                    </tr>
                    <tr>
                        <td>email</td>
                        <td><input type="text" name="email" value={data.email || ''} onChange={handleInput}></input></td>
                    </tr>
                    {/* <tr>
                        <td><label for="male">Male</label></td>
                        <td><input type="radio" id="male" name="gender" value="male" checked={data.gender=="male"?"checked":""} /></td>
                    </tr>
                    <tr>
                        <td><label for="female">Female</label></td>
                        <td><input type="radio" id="female" name="gender" value="female"checked={data.gender=="female"?"checked":""} /></td>
                    </tr> */}
                    <tr>
                        <td>hobby</td>
                        <td>
                            <lable>dance</lable><input type="checkbox" name="hobby" value="dance"checked={hobby.includes("dance")?"ckecked":""} onChange={handleInput}></input>
                            <label>music</label>
                            <input type="checkbox" name="hobby" value="music" checked={hobby.includes("music")?"ckecked":""} onChange={handleInput}></input></td>

                    </tr>
                    <tr>
                        <td>city</td>
                        <td><select type="option" name='city' value={data.city||""} onChange={handleInput}>
                            <option value='surat' name='city' onChange={handleInput}>surat</option>
                            <option value='ahemdabad' name='city' onChange={handleInput}>ahemdabad</option>
                            <option value='baruch' name='city' onChange={handleInput}>baruch</option>

                        </select></td>

                    </tr>
                    <tr><td></td>
                        <td><input value='submit' type='submit' /></td></tr>
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
                transition: Bounce />
        </>
    );
}

export default Form;
