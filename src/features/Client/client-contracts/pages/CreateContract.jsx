import { duration } from "@mui/material";
import { useState } from "react";
import Cookies from "universal-cookie";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../../../services/Api/api";
import { CreateContract, UpdateContract } from "../services/api_contract";
import '../styles/CreateContract.css'
export default function CreateContractt() {
    const cookies = new Cookies();
    const token = cookies.get('token-client');

    const { id } = useParams();
    const isEditMode = Boolean(id);
    const { state } = useLocation();
    const navigate = useNavigate();
    const projectId = state?.projectId;
    const freelancerId = state?.freelancerId;
    // console.log(projectId);
    // console.log(freelancerId);
    const [errors, setErrors] = useState([]);
    const [type, setType] = useState("single_phase");

    const [phases, setPhases] = useState([
        {
            title: "",
            amount: "",
            deadline: "",
            allowed_revisions: "",
            duration_in_days: "",
        },
    ]);

    const [data, setData] = useState({
        title: "",
        total_budget: "",
        deadline: "",
    });
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    
    const handlePhaseChange = (index, e) => {
    const { name, value } = e.target;

    const updatedPhases = [...phases];

    updatedPhases[index][name] = value;

    setPhases(updatedPhases);
};
    const addPhase = () => {
    setPhases([
        ...phases,
        {
            title: "",
            amount: "",
            deadline: "",
            allowed_revisions: "",
            duration_in_days: "",
        },
    ]);
};
const removePhase = (index) => {

    const updatedPhases = phases.filter((_, i) => i !== index);

    setPhases(updatedPhases);

};
    const handleSubmit = async () => {
        
        try {
            const url = isEditMode ? `${baseURL}${UpdateContract}${projectId}` : `${baseURL}${CreateContract}${projectId}`
            const body = {
                ...data,
                freelancer_id: freelancerId,
                type,
            };

            if (type === "multi_phase") {
                body.phases = phases;
            }

            const res = await axios.post(url, body, { headers: { Authorization: `Bearer ${token}` } });

            navigate("/clientlayout/contracts");
        } catch (err) {
             console.log(err.response?.data);

        setErrors(err.response?.data?.errors || []);
            
        }
    }
   return (
    <div className="create-contract-page">

        <div className="create-contract-card">

            <h2>
                {isEditMode ? "Update Contract" : "Create Contract"}
            </h2>
            {errors.length > 0 && (

    <div className="contract-errors">

        {errors.map((error, index) => (

            <div key={index} className="contract-error-item">
                • {error.message}
            </div>

        ))}

    </div>

)}

            <h3 className="contract-section-title">
                Contract Type
            </h3>

            <div className="contract-type-container">

                <div
                    className={`contract-type-card ${
                        type === "single_phase"
                            ? "active-contract-type"
                            : ""
                    }`}
                    onClick={() => setType("single_phase")}
                >
                    <h3>⚡ Instant Contract</h3>

                    <p>
                        For a single task or quick deliverable — fixed price,
                        no stages.
                    </p>

                </div>

                <div
                    className={`contract-type-card ${
                        type === "multi_phase"
                            ? "active-contract-type"
                            : ""
                    }`}
                    onClick={() => setType("multi_phase")}
                >
                    <h3>📦 Project Contract</h3>

                    <p>
                        For larger projects — split into stages and milestone
                        payments.
                    </p>

                </div>

            </div>

            <div className="contract-form">

                <div className="contract-row">

                    <div className="contract-input-group">

                        <label>
                            Contract Name
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            placeholder="Enter contract name"
                        />

                    </div>

                    <div className="contract-input-group">

                        <label>
                            Total Budget ($)
                        </label>

                        <input
                            type="number"
                            name="total_budget"
                            value={data.total_budget}
                            onChange={handleChange}
                            placeholder="Enter total budget"
                        />

                    </div>

                    {type === "single_phase" && (

                        <div className="contract-input-group">

                            <label>
                                Deadline
                            </label>

                            <input
                                type="date"
                                name="deadline"
                                value={data.deadline}
                                onChange={handleChange}
                            />

                        </div>

                    )}

                </div>

                {type === "multi_phase" && phases.map((phase, index) => (

                    <div className="phase-card" key={index}>

                        <div className="phase-header">

                            <h3>
                                Phase {index + 1}
                            </h3>

                            {index > 0 && (

                                <button
                                    type="button"
                                    className="remove-phase-btn"
                                    onClick={() => removePhase(index)}
                                >
                                    ✕
                                </button>

                            )}

                        </div>

                        <div className="phase-grid">

                            <div className="contract-input-group">

                                <label>
                                    Phase Name
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={phase.title}
                                    onChange={(e) =>
                                        handlePhaseChange(index, e)
                                    }
                                />

                            </div>

                            <div className="contract-input-group">

                                <label>
                                    Amount
                                </label>

                                <input
                                    type="number"
                                    name="amount"
                                    value={phase.amount}
                                    onChange={(e) =>
                                        handlePhaseChange(index, e)
                                    }
                                />

                            </div>

                            <div className="contract-input-group">

                                <label>
                                    Deadline
                                </label>

                                <input
                                    type="date"
                                    name="deadline"
                                    value={phase.deadline}
                                    onChange={(e) =>
                                        handlePhaseChange(index, e)
                                    }
                                />

                            </div>

                            <div className="contract-input-group">

                                <label>
                                    Allowed Revisions
                                </label>

                                <input
                                    type="number"
                                    name="allowed_revisions"
                                    value={phase.allowed_revisions}
                                    onChange={(e) =>
                                        handlePhaseChange(index, e)
                                    }
                                />

                            </div>

                            <div className="contract-input-group">

                                <label>
                                    Duration (Days)
                                </label>

                                <input
                                    type="number"
                                    name="duration_in_days"
                                    value={phase.duration_in_days}
                                    onChange={(e) =>
                                        handlePhaseChange(index, e)
                                    }
                                />

                            </div>

                        </div>

                    </div>

                ))}

                {type === "multi_phase" && (

                    <button
                        type="button"
                        className="add-phase-btn"
                        onClick={addPhase}
                    >
                        + Add Phase
                    </button>

                )}

            </div>

            <div className="contract-submit">

                <button
                    type="button"
                    className="create-contract-btn"
                    onClick={handleSubmit}
                >
                    {isEditMode
                        ? "Update Contract"
                        : "Create Contract"}
                </button>

            </div>

        </div>

    </div>
);
    
}

