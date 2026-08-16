import "../../Wallet/styles/AdminWallet.css";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "cookie-universal";

import { baseURL } from "../../../../services/Api/api";
import Loading from "../../../../components/Loading/Loading";

import { GetPlatformWallet } from "../../Wallet/services/AdminWalletapi";

import {
  FiDollarSign,
  FiLock,
  FiCreditCard,
  FiCheckCircle,
} from "react-icons/fi";

export default function AdminWallet() {
  const cookies = Cookies();

  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [accessDenied, setAccessDenied] = useState(false);

  // =========================
  // Backend Error
  // =========================

  function getErrorMessage(error) {
    const responseData = error.response?.data;
    const backendMessage = responseData?.message;

    // =========================
    // Unauthorized / Forbidden
    // =========================

    if (
      error.response?.status === 401 ||
      error.response?.status === 403 ||
      (
        typeof backendMessage === "string" &&
        (
          backendMessage
            .toLowerCase()
            .includes("unauthenticated") ||
          backendMessage
            .toLowerCase()
            .includes("unauthanticated") ||
          backendMessage
            .toLowerCase()
            .includes("forbidden") ||
          backendMessage
            .toLowerCase()
            .includes("missing permission")
        )
      )
    ) {
      return "You don't have permission to view the platform wallet.";
    }

    // =========================
    // Validation Error
    // =========================

    const validationError =
      responseData?.errors?.[0]?.message;

    if (validationError) {
      return validationError;
    }

    // =========================
    // Normal Backend Message
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
      return (
        backendMessage.message ||
        "Unable to load platform wallet."
      );
    }

    // =========================
    // Default Error
    // =========================

    return "Unable to load platform wallet.";
  }

  // =========================
  // Get Platform Wallet
  // =========================

  async function getPlatformWallet() {
    try {
      setLoading(true);
      setError("");
      setAccessDenied(false);

      const token =
        cookies.get("token-employee");

      // =========================
      // Check Token
      // =========================

      if (!token) {
        setAccessDenied(true);
        setWallet(null);
        return;
      }

      const response = await axios.get(
        `${baseURL}${GetPlatformWallet}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      console.log(
        "PLATFORM WALLET:",
        response.data
      );

      setWallet(
        response.data?.wallet || null
      );

    } catch (err) {
      console.log(
        "PLATFORM WALLET ERROR:",
        err.response?.data || err
      );

      console.log(
        "STATUS:",
        err.response?.status
      );

      const backendMessage =
        err.response?.data?.message;

      // =========================
      // Check Access Denied
      // =========================

      const isAccessDenied =
        err.response?.status === 401 ||
        err.response?.status === 403 ||
        (
          typeof backendMessage === "string" &&
          (
            backendMessage
              .toLowerCase()
              .includes("unauthenticated") ||
            backendMessage
              .toLowerCase()
              .includes("unauthanticated") ||
            backendMessage
              .toLowerCase()
              .includes("forbidden") ||
            backendMessage
              .toLowerCase()
              .includes("missing permission")
          )
        );

      if (isAccessDenied) {
        setAccessDenied(true);
        setError("");
        setWallet(null);

        return;
      }

      // =========================
      // Normal Error
      // =========================

      setError(
        getErrorMessage(err)
      );

    } finally {
      setLoading(false);
    }
  }

  // =========================
  // Load
  // =========================

  useEffect(() => {
    getPlatformWallet();
  }, []);

  // =========================
  // Loading
  // =========================

  if (loading && !wallet) {
    return (
      <div className="admin-wallet-page">
        <Loading />
      </div>
    );
  }

  // =========================
  // Access Denied
  // =========================

  if (accessDenied) {
    return (
      <div className="admin-wallet-page">

        <div className="admin-wallet-access-denied">

          <div className="admin-wallet-access-icon">
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
  // Values
  // =========================

  const availableBalance = Number(
    wallet?.available_balance || 0
  );

  const escrowBalance = Number(
    wallet?.escro_balance || 0
  );

  const totalBalance =
    availableBalance + escrowBalance;

  const currency =
    wallet?.currency || "USD";

  // =========================
  // Render
  // =========================

  return (
    <div className="admin-wallet-page">

      {loading && <Loading />}

      {error && (
        <div className="admin-wallet-error">
          {error}
        </div>
      )}

      {wallet && (
        <>
          {/* Header */}

          <div className="admin-wallet-header">

            <div>
              <h1>
                Platform Wallet
              </h1>

              <p>
                Overview of the platform wallet balance
              </p>
            </div>

            <div className="admin-wallet-status">
              <FiCheckCircle />
              Platform Wallet
            </div>

          </div>


          {/* Main Balance */}

          <div className="admin-wallet-main-card">

            <div className="admin-wallet-main-icon">
              <FiDollarSign />
            </div>

            <div className="admin-wallet-main-info">

              <span>
                Total Wallet Balance
              </span>

              <strong>
                {currency}{" "}
                {totalBalance.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </strong>

              <small>
                Available + Escrow balance
              </small>

            </div>

          </div>


          {/* Balance Cards */}

          <div className="admin-wallet-grid">

            {/* Available */}

            <div className="admin-wallet-card">

              <div className="admin-wallet-card-icon available">
                <FiCreditCard />
              </div>

              <div className="admin-wallet-card-content">

                <span>
                  Available Balance
                </span>

                <strong>
                  {currency}{" "}
                  {availableBalance.toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </strong>

                <small>
                  Funds currently available
                </small>

              </div>

            </div>


            {/* Escrow */}

            <div className="admin-wallet-card">

              <div className="admin-wallet-card-icon escrow">
                <FiLock />
              </div>

              <div className="admin-wallet-card-content">

                <span>
                  Escrow Balance
                </span>

                <strong>
                  {currency}{" "}
                  {escrowBalance.toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </strong>

                <small>
                  Funds currently held in escrow
                </small>

              </div>

            </div>

          </div>


          {/* Wallet Information */}

        </>
      )}

    </div>
  );
}