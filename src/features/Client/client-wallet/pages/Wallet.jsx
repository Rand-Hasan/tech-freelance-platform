import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "../../../../services/Api/api";
import {createFundingIntent,ShowWallet} from "../services/wallet_api";
import "../styles/Wallet.css";
import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";

export default function WalletClient() {

    const cookies = new Cookies();
    const token = cookies.get("token-client");

    const navigate = useNavigate();

    const { contractId } = useParams();

    const [wallet, setWallet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paymentLoading, setPaymentLoading] = useState(false);

    useEffect(() => {

        const getWallet = async () => {

            try {

                const res = await axios.get(
                    `${baseURL}${ShowWallet}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setWallet(res.data.wallet);

            } catch (err) {

                console.error(
                    err.response?.data || err.message
                );

            } finally {

                setLoading(false);

            }

        };

        getWallet();

    }, []);

    const handleFundContract = async () => {

        try {

            setPaymentLoading(true);

            const res = await axios.post(
                `${baseURL}${createFundingIntent}${contractId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const paymentData = res.data.data;

            navigate(
                "/clientlayout/payment",
                {
                    state: paymentData
                }
            );

        } catch (err) {

            console.error(
                err.response?.data || err.message
            );

        } finally {

            setPaymentLoading(false);

        }

    };

    if (loading) {

        return (
            <div className="wallet-page">
                <div className="wallet-card">
                    <p>Loading wallet...</p>
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
                            My Wallet
                        </h1>

                        <p>
                            Manage your funds and contract payments.
                        </p>

                    </div>

                    <span className="currency-badge">
                        {wallet?.currency || "USD"}
                    </span>

                </div>


                <div className="wallet-stats">

                    <div className="stat-card primary">

                        <div className="stat-icon">
                            💳
                        </div>

                        <div className="stat-details">

                            <span>
                                Available Balance
                            </span>

                            <strong>
                                ${wallet?.available_balance || "0.00"}
                            </strong>

                        </div>

                    </div>


                    <div className="stat-card secondary">

                        <div className="stat-icon">
                            🔒
                        </div>

                        <div className="stat-details">

                            <span>
                                Escrow Balance
                            </span>

                            <strong>
                                ${wallet?.escro_balance || "0.00"}
                            </strong>

                        </div>

                    </div>

                </div>


                {contractId && (

                    <div className="wallet-actions">

                        <button
                            className="btn btn-deposit"
                            onClick={handleFundContract}
                            disabled={paymentLoading}
                        >

                            {paymentLoading
                                ? "Preparing payment..."
                                : "💰 Fund Contract"
                            }

                        </button>

                    </div>

                )}

            </div>

        </div>

    );

}