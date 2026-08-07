import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../../../../services/Api/api";
import { createFundingIntent, ShowWallet } from "../services/wallet_api";
import "../styles/Wallet.css";
import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";

export default function WalletClient() {
    const cookies = new Cookies();
    const token = cookies.get("token-client");
    const navigate = useNavigate();

    const { contractId } = useParams();
    const isPaymentMode = !!contractId;

    const [wallet, setWallet] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ShowWalletClient();
    }, []);

    const ShowWalletClient = async () => {
        try {
            const res = await axios.get(`${baseURL}${ShowWallet}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setWallet(res.data.wallet);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFundContract = async () => {
        try {
            const res = await axios.post(
                `${baseURL}${createFundingIntent}${contractId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            navigate(
                `/clientlayout/payment/${res.data.data.contractId}`,
                {
                    state: res.data.data,
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) {
        return (
            <div className="wallet-page">
                <div className="wallet-loading">
                    Loading wallet...
                </div>
            </div>
        );
    }

    return (
        <div className="wallet-page">
            <div className="wallet-card">

                <div className="wallet-header">
                    <div>
                        <h1>
                            {isPaymentMode ? "Contract Payment" : "My Wallet"}
                        </h1>

                        <p>
                            {isPaymentMode
                                ? "Review your balance before funding this contract."
                                : "Manage your funds, deposits and escrow balance."}
                        </p>
                    </div>

                    <span className="currency-badge">
                        {wallet.currency || "USD"}
                    </span>
                </div>

                <div className="wallet-stats">
                    <div className="stat-card primary">
                        <div className="stat-icon">💳</div>

                        <div className="stat-details">
                            <span>Available Balance</span>

                            <strong>
                                ${wallet.available_balance ?? "0.00"}
                            </strong>
                        </div>
                    </div>

                    <div className="stat-card secondary">
                        <div className="stat-icon">🔒</div>

                        <div className="stat-details">
                            <span>Escrow Balance</span>

                            <strong>
                                ${wallet.escro_balance ?? "0.00"}
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="wallet-actions">

                    {isPaymentMode ? (
                        <button
                            className="btn btn-deposit"
                            onClick={handleFundContract}
                        >
                            💰 Fund Contract
                        </button>
                    ) : (
                        <>
                            <button className="btn btn-deposit">
                                ⬇️ Deposit Funds
                            </button>

                            <button className="btn btn-withdraw">
                                ⬆️ Withdraw
                            </button>
                        </>
                    )}

                </div>

            </div>
        </div>
    );
}