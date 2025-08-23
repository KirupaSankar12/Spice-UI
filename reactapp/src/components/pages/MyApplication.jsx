import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import '../../components/css/DisplaySpiceMerchant.css';

function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    // ⭐ New state for filtering and pagination
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [currentPage, setCurrentPage] = useState(1);
    const applicationsPerPage = 5; // You can adjust this number

    useEffect(() => {
        const fetchMyApplications = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch("http://localhost:8080/my-applications", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setApplications(data);
                } else {
                    toast.error("Failed to fetch your applications.");
                }
            } catch (err) {
                toast.error("A network error occurred.");
            } finally {
                setLoading(false);
            }
        };
        fetchMyApplications();
    }, []);

    // ⭐ Filtering logic
    const filteredApplications = applications.filter(app => {
        if (filterStatus === 'ALL') {
            return true;
        }
        return app.status === filterStatus;
    });

    // ⭐ Pagination logic
    const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);
    const lastApplicationIndex = currentPage * applicationsPerPage;
    const firstApplicationIndex = lastApplicationIndex - applicationsPerPage;
    const currentApplications = filteredApplications.slice(firstApplicationIndex, lastApplicationIndex);

    // ⭐ Handler for changing page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return (
            <div className="loader">
                <ClipLoader color={"#d35400"} size={50} />
                <p>Loading Your Applications...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>My Applications</h1>
                <p>Here you can track the status of all your submitted franchise applications.</p>
            </div>

            {/* ⭐ Filter Controls */}
            <div className="filter-controls">
                <button
                    className={`filter-btn ${filterStatus === 'ALL' ? 'active' : ''}`}
                    onClick={() => { setFilterStatus('ALL'); setCurrentPage(1); }}
                >
                    All
                </button>
                <button
                    className={`filter-btn ${filterStatus === 'PENDING' ? 'active' : ''}`}
                    onClick={() => { setFilterStatus('PENDING'); setCurrentPage(1); }}
                >
                    Pending
                </button>
                <button
                    className={`filter-btn ${filterStatus === 'APPROVED' ? 'active' : ''}`}
                    onClick={() => { setFilterStatus('APPROVED'); setCurrentPage(1); }}
                >
                    Approved
                </button>
                <button
                    className={`filter-btn ${filterStatus === 'REJECTED' ? 'active' : ''}`}
                    onClick={() => { setFilterStatus('REJECTED'); setCurrentPage(1); }}
                >
                    Rejected
                </button>
            </div>

            {filteredApplications.length === 0 ? (
                <div className="empty-state">
                    <h3>No applications found with status: {filterStatus}</h3>
                    <p>Try clearing your filter or submitting a new application.</p>
                </div>
            ) : (
                <>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Location</th>
                                    <th>Experience (yrs)</th>
                                    <th>Status</th>
                                    <th>Reviewed By</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* ⭐ Map over the currentApplications (paginated and filtered) */}
                                {currentApplications.map((app) => (
                                    <tr key={app.id}>
                                        <td>{app.name}</td>
                                        <td>{app.storeLocation}</td>
                                        <td>{app.experience}</td>
                                        <td>
                                            <span className={`status-badge status-${app.status.toLowerCase()}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td>{app.reviewedBy || "N/A"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ⭐ Pagination Controls */}
                    <div className="pagination">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {[...Array(totalPages).keys()].map(page => (
                            <button
                                key={page + 1}
                                onClick={() => paginate(page + 1)}
                                className={currentPage === page + 1 ? 'active' : ''}
                            >
                                {page + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default MyApplications;