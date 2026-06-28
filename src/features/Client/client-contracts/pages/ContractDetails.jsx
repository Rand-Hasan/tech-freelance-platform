import "../../client-contracts/styles/ContractDetails.css";
import { useState } from "react";
export default function ContractDetails() {
      const [showModal, setShowModal] = useState(false);

  return (
    <div className="contract-details-page">

      <div className="contract-header-card">
        <div>
          <h1>E-commerce Platform Redesign – Contract</h1>

          <p>
            Project-based contract with 3 stages.
            Freelancer: Ahmad Al-Zahrani.
            Started Jun 1, 2025.
          </p>

          <div className="contract-stats">
            <div>
              <span>Total Value</span>
              <h3>$1,800</h3>
            </div>

            <div>
              <span>Work Type</span>
              <h3>Hourly</h3>
            </div>

            <div>
              <span>Duration</span>
              <h3>2 months</h3>
            </div>

            <div>
              <span>Status</span>
              <h3 className="active-text">Active</h3>
            </div>
          </div>
        </div>

        <div className="header-actions">
          <span className="status-pill">● Active</span>

        <button
  className="cancel-btn"
  onClick={() => setShowModal(true)}
>
  Cancel Contract
</button>
        </div>
      </div>

      <div className="details-grid">

        <div className="card">
          <h2>Stage Breakdown</h2>

          <div className="stage-item">
            <div>
              <h4>Authentication & User Management</h4>
              <p>3 tasks · Completed</p>
            </div>

            <span>$600</span>
          </div>

          <div className="stage-item">
            <div>
              <h4>Product Catalog & Search</h4>
              <p>4 tasks · In progress</p>
            </div>

            <span>$700</span>
          </div>

          <div className="stage-item">
            <div>
              <h4>Checkout & Payments</h4>
              <p>2 tasks · Not started</p>
            </div>

            <span>$500</span>
          </div>

          <button className="workspace-btn">
            Go to Project Workspace →
          </button>
        </div>

        <div className="card">
          <h2>Contract Terms</h2>

          <div className="term-row">
            <span>Platform commission (5%)</span>
            <strong>$90.00</strong>
          </div>

          <div className="term-row">
            <span>Net to freelancer</span>
            <strong>$1,710.00</strong>
          </div>

          <div className="term-row">
            <span>Paid so far</span>
            <strong className="green">$600.00</strong>
          </div>

          <div className="term-row">
            <span>Remaining</span>
            <strong>$1,200.00</strong>
          </div>

          <h3 className="activity-title">
            Activity
          </h3>

          <div className="activity-list">
            <p>✓ Contract accepted — Jun 1</p>
            <p>✓ Stage 1 completed & paid — Jun 9</p>
            <p>⏳ Stage 2 in progress — started Jun 10</p>
          </div>
        </div>

      </div>
            {showModal && (
        <div className="modal-overlay">
          <div className="cancel-modal">

            <div className="modal-header">
              <h2>Cancel Contract</h2>

              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <p className="modal-description">
              This will end the contract with Ahmad Al-Zahrani.
              This action cannot be undone.
            </p>

            <div className="warning-box">
              ⚠ Cancelling this contract may apply a cancellation fee
              per the platform's fines policy, and will affect both
              parties' ratings.
            </div>

            <label>Reason for cancellation</label>

            <textarea
              placeholder="Explain why you're cancelling this contract..."
            />

            <div className="accept-box">
              <input type="checkbox" />

              <span>
                I understand and accept the
                <strong> 10% cancellation fee</strong>
              </span>
            </div>

            <div className="modal-actions">
              <button className="confirm-btn">
                Cancel Contract
              </button>

              <button
                className="back-btn"
                onClick={() => setShowModal(false)}
              >
                Go Back
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
  

}