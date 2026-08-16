// import { useEffect, useState } from "react";
// import { baseURL } from "../../../../services/Api/api";
// import { ShowWallet } from "../../../Client/client-wallet/services/wallet_api";

// export default function WalletFree(){
//       const cookies = new Cookies();
//         const token = cookies.get("token-freelancer");
    
       
//         const [wallet, setWallet] = useState(null);
//         const [loading, setLoading] = useState(true);
//         const [paymentLoading, setPaymentLoading] = useState(false);
    
//         useEffect(() => {
    
//             const getWallet = async () => {
    
//                 try {
    
//                     const res = await axios.get(
//                         `${baseURL}${ShowWallet}`,
//                         {
//                             headers: {
//                                 Authorization: `Bearer ${token}`
//                             }
//                         }
//                     );
    
//                     setWallet(res.data.wallet);
    
//                 } catch (err) {
    
//                     console.error(
//                         err.response?.data || err.message
//                     );
    
//                 } finally {
    
//                     setLoading(false);
    
//                 }
    
//             };
    
//             getWallet();
    
//         }, []);

//     return(
//         <h1>Wallet</h1>
//     )
// }
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

import { baseURL } from "../../../../services/Api/api";

import "../styles/WalletFree.css";
import { ShowWallet } from "../../../Client/client-wallet/services/wallet_api";
import { withdrawFunds } from "../services/api-walletfree";

export default function WalletFree() {

    const cookies = new Cookies();
    const token = cookies.get("token-freelancer");

    const [wallet, setWallet] = useState(null);
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(true);

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


    if (loading) {

        return (
            <div className="freelancer-wallet-page">

                <div className="wallet-loading">
                    Loading wallet...
                </div>

            </div>
        );

    }


    if (!wallet) {

        return (
            <div className="freelancer-wallet-page">

                <div className="wallet-error">
                    Failed to load wallet.
                </div>

            </div>
        );

    }


    const availableBalance =
        Number(wallet.available_balance || 0);

    const escrowBalance =
        Number(wallet.escro_balance || 0);


    const handleWithdraw = async() => {
          try{
            const res = await axios.post(`${baseURL}${withdrawFunds}`,{
                amount:amount,
            },{
                headers:{Authorization:`Bearer ${token}`}
            })
            console.log(res.data)
          }catch(err){
            console.log(err.message?.data)
          }
        // هون رح نربط API السحب
        console.log("Withdraw amount:", amount);

    };


    return (

        <div className="freelancer-wallet-page">

            {/* Header */}

            <div className="wallet-header">

                <div>

                    <h1>
                        Wallet
                    </h1>

                    <p>
                        Manage your earnings and withdrawals
                    </p>

                </div>

                <span className="currency-badge">
                    {wallet.currency}
                </span>

            </div>

            <div className="wallet-layout">


                <div className="withdraw-card">

                    <div className="withdraw-content">

                        <span className="section-label">
                            Available Balance
                        </span>

                        <h2 className="available-balance">
                            $
                            {availableBalance.toLocaleString(
                                "en-US",
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }
                            )}
                        </h2>

                    </div>


                    <div className="withdraw-divider" />


                    <div className="withdraw-form">

                        <label>
                            Withdraw an amount
                        </label>

                        <div className="amount-input-wrapper">

                            <span>
                                $
                            </span>

                            <input
                                type="number"
                                min="0"
                                max={availableBalance}
                                step="0.01"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) =>
                                    setAmount(e.target.value)
                                }
                            />

                        </div>


                        <button
                            type="button"
                            className="withdraw-btn"
                            onClick={handleWithdraw}
                            disabled={
                                !amount ||
                                Number(amount) <= 0 ||
                                Number(amount) > availableBalance
                            }
                        >
                            Withdraw Funds
                        </button>

                    </div>

                </div>


                {/* Wallet Overview */}

                <div className="overview-card">

                    <h3>
                        Wallet Overview
                    </h3>


                    <div className="overview-item">

                        <span>
                            Available
                        </span>

                        <strong>
                            ${availableBalance.toFixed(2)}
                        </strong>

                    </div>


                    <div className="overview-item">

                        <span>
                            Escrow
                        </span>

                        <strong>
                            ${escrowBalance.toFixed(2)}
                        </strong>

                    </div>


                    <div className="overview-item">

                        <span>
                            Currency
                        </span>

                        <strong>
                            {wallet.currency}
                        </strong>

                    </div>

                </div>

            </div>

        </div>

    );

}