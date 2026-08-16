import "../../../Admin/RolesPermissions/styles/RolesPermissions.css";

import {
  FaCrown,
  FaShieldAlt,
  FaChartBar,
  FaComments,
  FaQuestion,
  FaPlus,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "cookie-universal";

import { baseURL } from "../../../../services/Api/api";

import {
  GetPermissions,
  GetPositions,
  CreatePosition,
  CreatePermission,
  CreateEmployee, UpdatePositionPermissions,
} from "../../RolesPermissions/services/RolesPermissionsapi";

import Loading from "../../../../components/Loading/Loading";

export default function RolesPermissions() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  // =========================
  // Access Denied
  // =========================

  const [accessDenied, setAccessDenied] = useState(false);

  // =========================
  // Loading
  // =========================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =========================
  // Errors
  // =========================

  const [pageError, setPageError] = useState("");
  const [employeeError, setEmployeeError] = useState("");
  const [modalError, setModalError] = useState("");

  // =========================
  // Success
  // =========================

  const [employeeSuccess, setEmployeeSuccess] = useState("");
  const [modalSuccess, setModalSuccess] = useState("");

  // =========================
  // Modal
  // =========================

  const [showModal, setShowModal] = useState(false);

  // role | permission
  const [modalType, setModalType] = useState("role");

  // =========================
  // Role Form
  // =========================

  const [roleForm, setRoleForm] = useState({
    name: "",
    display_name: "",
    description: "",
    permission_keys: [],
  });

  // =========================
  // Permission Form
  // =========================

  const [permissionForm, setPermissionForm] = useState({
    key: "",
    description: "",
  });

  // =========================
  // Employee Form
  // =========================

  const [employeeForm, setEmployeeForm] = useState({
    user_name: "",
    email: "",
    password: "",
    position_id: "",
  });

  // =========================
  // Token
  // =========================

  const cookies = Cookies();

  const token = cookies.get("token-employee");

  // =========================
  // Get Backend Error
  // =========================

  const getErrorMessage = (error, defaultMessage) => {
    const responseData = error.response?.data;

    const backendMessage = responseData?.message;

    // =========================
    // Backend Message
    // =========================

    if (typeof backendMessage === "string") {
      return backendMessage;
    }

    // =========================
    // Object Message
    // =========================

    if (
      backendMessage &&
      typeof backendMessage === "object"
    ) {
      if (
        typeof backendMessage.message === "string"
      ) {
        return backendMessage.message;
      }
    }

    // =========================
    // Validation Errors
    // =========================

    const validationError =
      responseData?.errors?.[0]?.message;

    if (validationError) {
      return validationError;
    }

    // =========================
    // Default
    // =========================

    return defaultMessage;
  };

  // =========================
  // Check Permission Error
  // =========================

  const isPermissionError = (error) => {
    const status = error.response?.status;

    const backendMessage =
      error.response?.data?.message;

    if (status === 403) {
      return true;
    }

    if (typeof backendMessage === "string") {
      const message =
        backendMessage.toLowerCase();

      return (
        message.includes("forbidden") ||
        message.includes("missing permission")
      );
    }

    if (
      backendMessage &&
      typeof backendMessage === "object"
    ) {
      const message =
        backendMessage.message;

      if (typeof message === "string") {
        const lowerMessage =
          message.toLowerCase();

        return (
          lowerMessage.includes("forbidden") ||
          lowerMessage.includes(
            "missing permission"
          )
        );
      }
    }

    return false;
  };

  // =========================
  // Load Data
  // =========================

  useEffect(() => {
    getRolesPermissions();
  }, []);

  const getRolesPermissions = async () => {
    try {
      setLoading(true);
      setPageError("");
      setAccessDenied(false);

      const results =
        await Promise.allSettled([
          axios.get(
            `${baseURL}${GetPositions}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),

          axios.get(
            `${baseURL}${GetPermissions}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
        ]);

      // =========================
      // Positions
      // =========================

      const positionsResult = results[0];

      if (
        positionsResult.status ===
        "fulfilled"
      ) {
        console.log(
          "Positions Response:",
          positionsResult.value.data
        );

        const positionsData =
          positionsResult.value.data;

        setRoles(
          positionsData?.positions ||
            positionsData?.data ||
            []
        );
      } else {
        console.error(
          "GetPositions Error:",
          positionsResult.reason
        );

        if (
          isPermissionError(
            positionsResult.reason
          )
        ) {
          setAccessDenied(true);
          return;
        }

        setPageError(
          getErrorMessage(
            positionsResult.reason,
            "Unable to load roles."
          )
        );
      }

      // =========================
      // Permissions
      // =========================

      const permissionsResult = results[1];

      if (
        permissionsResult.status ===
        "fulfilled"
      ) {
        console.log(
          "Permissions Response:",
          permissionsResult.value.data
        );

        const permissionsData =
          permissionsResult.value.data;

        setPermissions(
          permissionsData?.permissions ||
            permissionsData?.data ||
            []
        );
      } else {
        console.error(
          "GetPermissions Error:",
          permissionsResult.reason
        );

        if (
          isPermissionError(
            permissionsResult.reason
          )
        ) {
          setAccessDenied(true);
          return;
        }

        setPageError(
          getErrorMessage(
            permissionsResult.reason,
            "Unable to load permissions."
          )
        );
      }
    } catch (error) {
      console.error(
        "Roles & Permissions Error:",
        error
      );

      if (isPermissionError(error)) {
        setAccessDenied(true);
        setPageError("");
      } else {
        setPageError(
          getErrorMessage(
            error,
            "Unable to load roles and permissions."
          )
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Icons
  // =========================

  const getIcon = (roleName) => {
    switch (roleName) {
      case "super_admin":
        return <FaCrown />;

      case "support_officer":
        return <FaComments />;

      case "finance_officer":
        return <FaChartBar />;

      case "content_moderator":
        return <FaShieldAlt />;

      case "quiz_master":
        return <FaQuestion />;

      case "reviews_moderator":
        return <FaShieldAlt />;

      default:
        return <FaShieldAlt />;
    }
  };

  // =========================
  // Open Role Modal
  // =========================

  const openRoleModal = () => {
    setModalType("role");

    setModalError("");
    setModalSuccess("");

    setRoleForm({
      name: "",
      display_name: "",
      description: "",
      permission_keys: [],
    });

    setShowModal(true);
  };

  // =========================
  // Open Permission Form
  // =========================

  const openPermissionForm = () => {
    setModalType("permission");

    setModalError("");
    setModalSuccess("");
  };

  // =========================
  // Close Modal
  // =========================

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);

    setModalError("");
    setModalSuccess("");

    setRoleForm({
      name: "",
      display_name: "",
      description: "",
      permission_keys: [],
    });

    setPermissionForm({
      key: "",
      description: "",
    });
  };

  // =========================
  // Role Inputs
  // =========================

  const handleRoleChange = (e) => {
    const { name, value } = e.target;

    setRoleForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setModalError("");
    setModalSuccess("");
  };

  // =========================
  // Permission Checkbox
  // =========================

  const handlePermissionChange = (
    permissionKey
  ) => {
    setRoleForm((prev) => {
      const exists =
        prev.permission_keys.includes(
          permissionKey
        );

      if (exists) {
        return {
          ...prev,
          permission_keys:
            prev.permission_keys.filter(
              (key) =>
                key !== permissionKey
            ),
        };
      }

      return {
        ...prev,
        permission_keys: [
          ...prev.permission_keys,
          permissionKey,
        ],
      };
    });

    setModalError("");
    setModalSuccess("");
  };

  // =========================
  // Permission Inputs
  // =========================

  const handlePermissionFormChange = (
    e
  ) => {
    const { name, value } = e.target;

    setPermissionForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setModalError("");
    setModalSuccess("");
  };

  // =========================
  // Employee Inputs
  // =========================

  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;

    setEmployeeForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setEmployeeError("");
    setEmployeeSuccess("");
  };

  // =========================
  // Create Permission
  // =========================

  const createPermission = async (e) => {
    e.preventDefault();

    setModalError("");
    setModalSuccess("");

    try {
      setSaving(true);

      const payload = {
        key: permissionForm.key.trim(),
        description:
          permissionForm.description.trim(),
      };

      const response =
        await axios.post(
          `${baseURL}${CreatePermission}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      console.log(
        "Create Permission Response:",
        response.data
      );

      // =========================
      // Backend Success Message
      // =========================

      const backendSuccess =
        response.data?.message ||
        response.data?.data?.message ||
        response.data?.permission?.message;

      if (backendSuccess) {
        setModalSuccess(
          String(backendSuccess)
        );

        setTimeout(() => {
          setModalSuccess("");
        }, 3000);
      }

      // =========================
      // Update Permissions
      // =========================

      const createdPermission =
        response.data?.permission ||
        response.data?.data;

      if (createdPermission) {
        setPermissions((prev) => [
          ...prev,
          createdPermission,
        ]);
      } else {
        const permissionsResponse =
          await axios.get(
            `${baseURL}${GetPermissions}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        const permissionsData =
          permissionsResponse.data;

        setPermissions(
          permissionsData?.permissions ||
            permissionsData?.data ||
            []
        );
      }

      setPermissionForm({
        key: "",
        description: "",
      });

      setModalError("");
      setModalType("role");
    } catch (error) {
      console.error(
        "Create Permission Error:",
        error
      );

      setModalSuccess("");

      setModalError(
        getErrorMessage(
          error,
          "Failed to create permission."
        )
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // Create Position / Role
  // =========================

  const createRole = async (e) => {
    e.preventDefault();

    setModalError("");
    setModalSuccess("");

    try {
      setSaving(true);

      const payload = {
        name: roleForm.name.trim(),

        display_name:
          roleForm.display_name.trim(),

        description:
          roleForm.description.trim(),

        permission_keys:
          roleForm.permission_keys,
      };

      const response =
        await axios.post(
          `${baseURL}${CreatePosition}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      console.log(
        "Create Position Response:",
        response.data
      );

      // =========================
      // Backend Success Message
      // =========================

      const backendSuccess =
        response.data?.message ||
        response.data?.data?.message ||
        response.data?.position?.message ||
        response.data?.role?.message;

      if (backendSuccess) {
        setModalSuccess(
          String(backendSuccess)
        );

        setTimeout(() => {
          setModalSuccess("");
        }, 3000);
      }

      // =========================
      // Update Roles
      // =========================

      const createdRole =
        response.data?.position ||
        response.data?.role ||
        response.data?.data;

      if (createdRole) {
        setRoles((prev) => [
          ...prev,
          createdRole,
        ]);
      } else {
        const positionsResponse =
          await axios.get(
            `${baseURL}${GetPositions}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        const positionsData =
          positionsResponse.data;

        setRoles(
          positionsData?.positions ||
            positionsData?.data ||
            []
        );
      }

      setModalError("");
    } catch (error) {
      console.error(
        "Create Role Error:",
        error
      );

      setModalSuccess("");

      setModalError(
        getErrorMessage(
          error,
          "Failed to create role."
        )
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // Create Employee
  // =========================

  const createEmployee = async (e) => {
    e.preventDefault();

    setEmployeeError("");
    setEmployeeSuccess("");

    try {
      setSaving(true);

      const payload = {
        user_name:
          employeeForm.user_name.trim(),

        email:
          employeeForm.email.trim(),

        password:
          employeeForm.password,

        position_id:
          Number(
            employeeForm.position_id
          ),
      };

      const response =
        await axios.post(
          `${baseURL}${CreateEmployee}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      console.log(
        "Create Employee Response:",
        response.data
      );

      // =========================
      // Backend Success Message
      // =========================

      const backendSuccess =
        response.data?.message ||
        response.data?.data?.message ||
        response.data?.employee?.message;

      if (backendSuccess) {
        setEmployeeSuccess(
          String(backendSuccess)
        );

        // =========================
        // Hide Success After 3 Seconds
        // =========================

        setTimeout(() => {
          setEmployeeSuccess("");
        }, 3000);
      }

      // =========================
      // Reset Form
      // =========================

      setEmployeeForm({
        user_name: "",
        email: "",
        password: "",
        position_id: "",
      });

      setEmployeeError("");
    } catch (error) {
      console.error(
        "Create Employee Error:",
        error
      );

      setEmployeeSuccess("");

      setEmployeeError(
        getErrorMessage(
          error,
          "Failed to create employee."
        )
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // Initial Loading
  // =========================

  if (loading) {
    return (
      <div className="roles-loading">
        <Loading />
      </div>
    );
  }

  // =========================
  // Access Denied
  // =========================

  if (accessDenied) {
    return (
      <div className="roles-page">
        <div className="access-denied">

          <div className="access-denied-icon">
            🔒
          </div>

          <h1>
            Access Denied
          </h1>

          <p>
            You don't have permission
            to access this page.
          </p>

          <span>
            Please contact your administrator
            if you believe you should have access.
          </span>

        </div>
      </div>
    );
  }

  // =========================
  // Full Page Error
  // =========================

  if (pageError) {
    return (
      <div className="roles-page">
        <div className="page-error">
          {pageError}
        </div>
      </div>
    );
  }

  // =========================
  // Render
  // =========================

  return (
    <div className="roles-page">

      {/* =========================
          Left Side - Roles
      ========================= */}

      <div className="roles-card">

        <div className="card-header">

          <div>
            <h2>
              Platform Roles
            </h2>

            <p>
              Manage platform roles and
              permissions.
            </p>
          </div>

          <button
            className="add-btn"
            onClick={openRoleModal}
            disabled={saving}
          >
            <FaPlus />
            Add Role
          </button>

        </div>

        {roles.length === 0 ? (
          <div className="empty-state">
            No roles found.
          </div>
        ) : (
          roles.map((role) => (
            <div
              className="role-item"
              key={role.id}
            >

              <div className="role-left">

                <div className="icon-box">
                  {getIcon(role.name)}
                </div>

                <div>

                  <h3>
                    {role.display_name}
                  </h3>

                  <p>
                    {role.description ||
                      "No description"}
                  </p>

                </div>

              </div>

            </div>
          ))
        )}

      </div>

      {/* =========================
          Right Side - Create Employee
      ========================= */}

      <div className="assign-card">

        <div className="assign-header">

          <div>

            <h2>
              Create Employee
            </h2>

            <p>
              Add a new employee to the
              platform.
            </p>

          </div>

        </div>

        {/* =========================
            Employee Success
        ========================= */}

        {employeeSuccess && (
          <div className="employee-success">

            <FaCheck />

            <span>
              {employeeSuccess}
            </span>

          </div>
        )}

        {/* =========================
            Employee Error
        ========================= */}

        {employeeError && (
          <div className="employee-error">

            <div className="employee-error-icon">
              <FaTimes />
            </div>

            <div>

              <strong>
                {employeeError}
              </strong>

            </div>

          </div>
        )}

        <form
          onSubmit={createEmployee}
          className="employee-form"
        >

          <div className="form-group">

            <label>
              Username
            </label>

            <input
              type="text"
              name="user_name"
              value={
                employeeForm.user_name
              }
              onChange={
                handleEmployeeChange
              }
              placeholder="Enter username..."
              autoComplete="username"
              disabled={saving}
            />

          </div>

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={
                employeeForm.email
              }
              onChange={
                handleEmployeeChange
              }
              placeholder="Enter email..."
              autoComplete="email"
              disabled={saving}
            />

          </div>

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              value={
                employeeForm.password
              }
              onChange={
                handleEmployeeChange
              }
              placeholder="Enter password..."
              autoComplete="new-password"
              disabled={saving}
            />

          </div>

          <div className="form-group">

            <label>
              Role
            </label>

            <select
              name="position_id"
              value={
                employeeForm.position_id
              }
              onChange={
                handleEmployeeChange
              }
              disabled={saving}
            >

              <option value="">
                Select a role
              </option>

              {roles.map((role) => (
                <option
                  key={role.id}
                  value={role.id}
                >
                  {role.display_name}
                </option>
              ))}

            </select>

          </div>

          <button
            type="submit"
            className={`confirm-btn ${
              saving
                ? "loading-btn"
                : ""
            }`}
            disabled={saving}
          >

            {saving ? (
              <>
                <span className="button-spinner" />

                Creating Employee...
              </>
            ) : (
              <>
                <FaPlus />

                Create Employee
              </>
            )}

          </button>

        </form>

      </div>

      {/* =========================
          Create Modal
      ========================= */}

      {showModal && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (
              e.target ===
                e.currentTarget &&
              !saving
            ) {
              closeModal();
            }
          }}
        >

          <div className="role-modal">

            <div className="modal-header">

              <div>

                <h2>
                  {modalType === "role"
                    ? "Create New Role"
                    : "Create New Permission"}
                </h2>

                <p>
                  {modalType === "role"
                    ? "Create a new platform role and assign permissions."
                    : "Create a new permission that can be assigned to roles."}
                </p>

              </div>

              <button
                className="modal-close"
                onClick={closeModal}
                disabled={saving}
              >
                <FaTimes />
              </button>

            </div>

            {/* =========================
                Modal Success
            ========================= */}

            {modalSuccess && (
              <div className="form-success">

                <FaCheck />

                <span>
                  {modalSuccess}
                </span>

              </div>
            )}

            {/* =========================
                Modal Error
            ========================= */}

            {modalError && (
              <div className="modal-error">

                <div className="modal-error-icon">
                  <FaTimes />
                </div>

                <div>

                  <strong>
                    {modalError}
                  </strong>

                </div>

              </div>
            )}

            {/* =========================
                Role Form
            ========================= */}

            {modalType === "role" && (
              <form
                onSubmit={createRole}
                className="modal-form"
              >

                <div className="form-row">

                  <div className="form-group">

                    <label>
                      Role Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={
                        roleForm.name
                      }
                      onChange={
                        handleRoleChange
                      }
                      placeholder="e.g. support_officer"
                      disabled={saving}
                    />

                    <small>
                      Internal name used by
                      the system.
                    </small>

                  </div>

                  <div className="form-group">

                    <label>
                      Display Name
                    </label>

                    <input
                      type="text"
                      name="display_name"
                      value={
                        roleForm.display_name
                      }
                      onChange={
                        handleRoleChange
                      }
                      placeholder="e.g. Support Officer"
                      disabled={saving}
                    />

                  </div>

                </div>

                <div className="form-group">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={
                      roleForm.description
                    }
                    onChange={
                      handleRoleChange
                    }
                    placeholder="Describe what this role is responsible for..."
                    rows="3"
                    disabled={saving}
                  />

                </div>

                <div className="permissions-header">

                  <label>
                    Permissions
                  </label>

                  <button
                    type="button"
                    className="small-add-btn"
                    onClick={
                      openPermissionForm
                    }
                    disabled={saving}
                  >
                    <FaPlus />
                    New Permission
                  </button>

                </div>

                <div className="permissions-list">

                  {permissions.length ===
                  0 ? (
                    <div className="no-permissions">
                      No permissions found.
                    </div>
                  ) : (
                    permissions.map(
                      (permission) => {

                        const permissionKey =
                          permission.key;

                        const checked =
                          roleForm.permission_keys.includes(
                            permissionKey
                          );

                        return (
                          <label
                            className={`permission-item ${
                              checked
                                ? "selected"
                                : ""
                            }`}
                            key={
                              permission.id ||
                              permission.key
                            }
                          >

                            <input
                              type="checkbox"
                              checked={
                                checked
                              }
                              onChange={() =>
                                handlePermissionChange(
                                  permissionKey
                                )
                              }
                              disabled={
                                saving
                              }
                            />

                            <div>

                              <strong>
                                {
                                  permission.key
                                }
                              </strong>

                              <span>
                                {
                                  permission.description ||
                                  "No description"
                                }
                              </span>

                            </div>

                          </label>
                        );
                      }
                    )
                  )}

                </div>

                <div className="modal-actions">

                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={closeModal}
                    disabled={saving}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className={`save-btn ${
                      saving
                        ? "loading-btn"
                        : ""
                    }`}
                    disabled={saving}
                  >

                    {saving ? (
                      <>
                        <span className="button-spinner" />
                        Creating...
                      </>
                    ) : (
                      <>
                        Create Role
                      </>
                    )}

                  </button>

                </div>

              </form>
            )}

            {/* =========================
                Permission Form
            ========================= */}

            {modalType ===
              "permission" && (
              <form
                onSubmit={
                  createPermission
                }
                className="modal-form"
              >

                <div className="form-group">

                  <label>
                    Permission Key
                  </label>

                  <input
                    type="text"
                    name="key"
                    value={
                      permissionForm.key
                    }
                    onChange={
                      handlePermissionFormChange
                    }
                    placeholder="e.g. employees.manage"
                    disabled={saving}
                  />

                  <small>
                    Example:
                    employees.manage
                  </small>

                </div>

                <div className="form-group">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={
                      permissionForm.description
                    }
                    onChange={
                      handlePermissionFormChange
                    }
                    placeholder="Describe what this permission allows..."
                    rows="4"
                    disabled={saving}
                  />

                </div>

                <div className="modal-actions">

                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setModalType("role");
                      setModalError("");
                      setModalSuccess("");
                    }}
                    disabled={saving}
                  >
                    Back to Role
                  </button>

                  <button
                    type="submit"
                    className={`save-btn ${
                      saving
                        ? "loading-btn"
                        : ""
                    }`}
                    disabled={saving}
                  >

                    {saving ? (
                      <>
                        <span className="button-spinner" />
                        Creating...
                      </>
                    ) : (
                      <>
                        Create Permission
                      </>
                    )}

                  </button>

                </div>

              </form>
            )}

          </div>

        </div>
      )}

    </div>
  );
}