import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Data() {
    let [Record, setRecord] = useState([]);
    let [currentPage, setCurrentPage] = useState(1);
    let [search, setSearch] = useState('');
    let [sortBy, setSortBy] = useState('');

    let navigate = useNavigate();
    
    useEffect(() => {
        Recordhanle();
    }, []);

    let Recordhanle = () => {
        fetch('http://localhost:3000/user', {
            method: 'GET',
        })
        .then(async (res) => {
            let resdata = await res.json();
            setRecord(resdata);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    let deletData = (id) => {
        fetch(`http://localhost:3000/user/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            Recordhanle();
            console.log('Data deleted');
        })
        .catch((err) => {
            console.log(err);
        });
    };

    let edittData = (id) => {
        navigate(`/editData/${id}`);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setCurrentPage(1); // Reset to first page when sorting
    };

    let perPage = 4;
    let last = currentPage * perPage;
    let first = last - perPage;

    // Filter the records based on the search term (e.g., by name)
    let filteredRecords = Record.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    // Apply sorting
    if (sortBy === 'name-asc') {
        filteredRecords.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (sortBy === 'name-desc') {
        filteredRecords.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
    }

    // Paginate filtered results
    let currentItem = filteredRecords.slice(first, last);
    let totalPage = Math.ceil(filteredRecords.length / perPage);

    return (
        <>
            <h2>User Data</h2>
            <Link to={'/'}>Form</Link>

            <div className="m-auto w-50 mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="m-auto w-50 mb-3">
                <select className="form-control" value={sortBy} onChange={handleSortChange}>
                    <option value="">Sort By</option>
                    <option value="name-asc">Name: A-Z</option>
                    <option value="name-desc">Name: Z-A</option>
                </select>
            </div>

            <table align='center' border={1}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Hobby</td>
                        <td>City</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {currentItem.map((res, i) => (
                        <tr key={i}>
                            <td>{res.name}</td>
                            <td>{res.email}</td>
                            <td>{res.hobby}</td>
                            <td>{res.city}</td>
                            <td>
                                <button onClick={() => deletData(res.id)}>Delete</button>
                            </td>
                            <td>
                                <button onClick={() => edittData(res.id)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div>
                {[...Array(totalPage)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {currentPage > 1 && (
                <button onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
            )}

            {currentPage < totalPage && (
                <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            )}
        </>
    );
}

export default Data;
