import "../../FinesCommission/styles/FinesCommission.css";
import { FaCircle } from "react-icons/fa";

export default function FinesCommission() {
  return (
    <div className="settings-page">

      <div className="settings-grid">

        {/* Commission */}
        <div className="setting-card">
          <h2>Platform Commission</h2>

          <label>Commission Rate (%)</label>

          <input
            type="number"
            defaultValue={10}
          />

          <div className="info success">
            <FaCircle className="dot" />
            <span>Applied automatically to every new contract</span>
          </div>
        </div>

        {/* Fine */}
        <div className="setting-card">
          <h2>Contract Cancellation Fine</h2>

          <label>Fine Rate (%)</label>

          <input
            type="number"
            defaultValue={15}
          />

          <div className="info danger">
            <FaCircle className="dot" />
            <span>Applied when either party cancels the contract</span>
          </div>
        </div>

      </div>

      <div className="save-wrapper">
        <button className="save-btn">
          Save Settings
        </button>
      </div>

    </div>
  );
}