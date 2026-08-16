import { useEffect, useState } from "react";

import { FaArrowLeft, FaPlus, FaTrash, FaFileAlt, FaLink, FaUpload, FaTimes, FaFileArchive } from "react-icons/fa";
import '../styles/TasksandFiles.css';
import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../../../services/Api/api";
import { AddTask, CheckTask, DeleteFiles, DeleteTask, DeleteUrl, GetPhaseFiles, GetPhaseTask, UploadProjectsFile } from "../services/api-myproject";
export default function TasksandFiles() {
    const { id: phaseId } = useParams();
    const cookies = new Cookies();
    const token = cookies.get('token-freelancer');
    const navigate = useNavigate();
    const [showFileModal, setShowFileModal] = useState(false);
    const [fileType, setFileType] = useState(null);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [url, setUrl] = useState("");
    const [fileUrl, setFileUrl] = useState("");
    useEffect(() => {
        showtasks();
    }, [phaseId]);
    useEffect(() => {
        showfiles();
    }, [phaseId])
    const showtasks = async () => {
        try {
            const res = await axios.get(`${baseURL}${GetPhaseTask}${phaseId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTasks(res.data.tasks)
        } catch (err) {
            console.log(err)
        }
    }
    const UpdateTaskCheck = async (id) => {
        try {
            const res = await axios.post(`${baseURL}${CheckTask}${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            showtasks();
        } catch (err) {
            console.log(err);
        }
    }
    const DeleteTaskphase = async (id) => {
        try {
            const res = await axios.post(`${baseURL}${DeleteTask}${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            showtasks();
        } catch (err) {
            console.log(err);
        }
    }

    const AddTaskPhase = async () => {

        try {

            const res = await axios.post(
                `${baseURL}${AddTask}${phaseId}`,
                {
                    task: [
                        {
                            task_name: taskName
                        }
                    ]
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(res.data);

            setTaskName("");
            setShowTaskModal(false);

            await showtasks();

        } catch (err) {

            console.log(err);

        }
    };
    const AddFile = async () => {

        try {

            const formData = new FormData();

            if (fileType === "upload") {
                formData.append("File", selectedFile);
            }

            if (fileType === "link") {
                formData.append("url", fileUrl);
            }

            const res = await axios.post(
                `${baseURL}${UploadProjectsFile}${phaseId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(res.data);
            showfiles();
        } catch (err) {

            console.log(err);

        }
    };

    const showfiles = async () => {
        try {
            const res = await axios.get(`${baseURL}${GetPhaseFiles}${phaseId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setFiles(res.data.files || []);
            setUrl(res.data.url || "");

        } catch (err) {
            console.log(err)
        }
    }
    const DeleteFile = async (type, id) => {
        try {

            if (type === "file") {

                await axios.post(
                    `${baseURL}${DeleteFiles}${id}`, {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

            } else if (type === "url") {

                await axios.post(
                    `${baseURL}${DeleteUrl}${phaseId}`, {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            }

            showfiles();

        } catch (err) {
            console.log(err);
        }
    };
    const CloseFileModal = () => {
        setShowFileModal(false);
        setFileType(null);
        setSelectedFile(null);
        setFileUrl("");
    };
    const CloseTaskModal = () => {
        setShowTaskModal(false);
        setTaskName("");
    };
    return (

        <div className="phase-details-container">

            {/* Back */}
{/* 
            <button className="back-link">
                <FaArrowLeft />
                <span onClick={() => navigate(-1)}>Back to Project Phases</span>
            </button> */}


            {/* ================= TASKS ================= */}

            <section className="details-section">

                <div className="section-header">

                    <h2>Tasks</h2>

                    <button
                        className="add-btn"
                        onClick={() => setShowTaskModal(true)}
                    >
                        <FaPlus />
                        Add Task
                    </button>

                </div>



                <div className="items-card">

                    {tasks.map((task) => (

                        <div className="task-row" key={task.id}>

                            <span className={task.check ? "task-name completed" : "task-name"}>
                                {task.task_name}
                            </span>

                            {task.check === false && (

                                <div className="task-actions">

                                    <button className="delete-btn" onClick={() => DeleteTaskphase(task.id)}>
                                        <FaTrash />
                                    </button>

                                    <input
                                        type="checkbox"
                                        checked={task.check}
                                        onChange={() => UpdateTaskCheck(task.id)}
                                    />

                                </div>

                            )}

                        </div>

                    ))}

                </div>

            </section>


            {/* ================= FILES ================= */}

            <section className="details-section">

                <div className="section-header">

                    <h2>Project Files</h2>

                    <button
                        className="add-btn"
                        onClick={() => setShowFileModal(true)}
                    >
                        <FaPlus />
                        Add File
                    </button>

                </div>


                <div className="items-card">

                    {/* Files */}
                    {files.map((file) => (

                        <div className="file-row" key={file.id}>

                            <div className="file-info">

                                <div className="file-icon">
                                    <FaFileArchive />
                                </div>

                                <div className="file-content">
                                    <div className="file-name">
                                        {file.file.split("/").pop()}
                                    </div>

                                    <div className="file-url">
                                        {file.file}
                                    </div>
                                </div>

                            </div>

                            <button className="delete-btn" onClick={() => DeleteFile("file", phaseId)}>
                                <FaTrash />
                            </button>

                        </div>

                    ))}


                    {/* URL */}
                    {url && (

                        <div className="file-row">

                            <div className="file-info">

                                <div className="file-icon">
                                    <FaLink />
                                </div>

                                <div className="file-content">
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="file-url"
                                    >
                                        {url}
                                    </a>
                                </div>

                            </div>

                            <button className="delete-btn" onClick={() => DeleteFile("url", phaseId)}>
                                <FaTrash />
                            </button>

                        </div>

                    )}

                </div>

            </section>
            {showFileModal && (

                <div
                    className="modal-overlay"
                    onClick={CloseFileModal}
                >

                    <div
                        className="file-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Modal Header */}

                        <div className="modal-header">

                            <div>
                                <h2>Add Project File</h2>

                                <p>
                                    Upload a file or add a link
                                </p>
                            </div>

                            <button
                                className="modal-close"
                                onClick={CloseFileModal}
                            >
                                <FaTimes />
                            </button>

                        </div>


                        {/* Choose Type */}

                        {!fileType && (

                            <div className="file-options">

                                <button
                                    className="file-option"
                                    onClick={() => setFileType("upload")}
                                >

                                    <div className="option-icon upload-icon">
                                        <FaUpload />
                                    </div>

                                    <div>
                                        <h3>Upload File</h3>

                                        <p>
                                            Upload a file from your device
                                        </p>
                                    </div>

                                </button>


                                <button
                                    className="file-option"
                                    onClick={() => setFileType("link")}
                                >

                                    <div className="option-icon link-icon">
                                        <FaLink />
                                    </div>

                                    <div>
                                        <h3>Add Link</h3>

                                        <p>
                                            Add a link to an external resource
                                        </p>
                                    </div>

                                </button>

                            </div>

                        )}


                        {/* Upload File */}


                        {fileType === "upload" && (

                            <div className="modal-form">

                                <label
                                    htmlFor="rarFileInput"
                                    className="select-file-label"
                                >
                                    Select File
                                </label>

                                <input
                                    id="rarFileInput"
                                    type="file"
                                    className="file-input"
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                    accept=".rar,application/x-rar-compressed"
                                // hidden
                                />
                                {selectedFile && (
                                    <div className="selected-file">
                                        <div className="selected-file-icon">
                                            📦
                                        </div>

                                        <span>
                                            {selectedFile.name}
                                        </span>
                                    </div>
                                )}
                                <div className="modal-actions">

                                    <button
                                        className="cancel-btn"
                                        onClick={() => {
                                            setFileType(null);
                                            setFileUrl("");
                                        }}
                                    >
                                        Back
                                    </button>

                                    <button
                                        className="save-btn"
                                        onClick={AddFile}
                                        disabled={!selectedFile}
                                    >
                                        Upload File
                                    </button>

                                </div>

                            </div>

                        )}
                        {/* Add Link */}

                        {fileType === "link" && (

                            <div className="modal-form">

                                <label>
                                    URL
                                </label>

                                <input
                                    type="url"
                                    placeholder="https://..."

                                    value={fileUrl}
                                    onChange={(e) => setFileUrl(e.target.value)}
                                />


                                <div className="modal-actions">

                                    <button
                                        className="cancel-btn"
                                        onClick={() => setFileType(null)}
                                    >
                                        Back
                                    </button>

                                    <button className="save-btn" onClick={AddFile}>
                                        Add Link
                                    </button>

                                </div>

                            </div>

                        )}

                    </div>

                </div>

            )}

            {showTaskModal && (

                <div
                    className="modal-overlay"
                    onClick={CloseTaskModal}
                >

                    <div
                        className="task-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Header */}

                        <div className="modal-header">

                            <div>
                                <h2>Add New Task</h2>

                                <p>
                                    Add a task to this phase
                                </p>
                            </div>

                            <button
                                className="modal-close"
                                onClick={CloseTaskModal}
                            >
                                <FaTimes />
                            </button>

                        </div>


                        {/* Form */}

                        <div className="task-form">

                            <label>
                                Task Name
                            </label>

                            <input
                                name="task_name"
                                type="text"
                                placeholder="e.g. Create homepage"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                            />


                            <div className="modal-actions">

                                <button
                                    className="cancel-btn"
                                    onClick={CloseTaskModal}
                                >
                                    Cancel
                                </button>

                                <button className="save-btn" onClick={AddTaskPhase}>
                                    Add Task
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}