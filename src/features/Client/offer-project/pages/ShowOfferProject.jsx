import axios from "axios";
import Cookies from "cookie-universal";
import { useEffect, useState } from "react";
import { baseURL } from "../../../../services/Api/api";
import { ShowClientsOffer } from "../services/api-offerproject";
import { Pagination } from "@mui/material";
import CardOfferProject from "../components/CardOfferProject";
import { useParams } from "react-router-dom";
import "../styles/ShowOfferProject.css";
import ShowOfferProjectDetails from "./ShowOfferProjectDetails";

export default function ShowOfferProject() {

    const cookies = new Cookies();
    const token = cookies.get("token-client");

    const { id: projectId } = useParams();

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(6);
    const [limit] = useState(4);

    const [Offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [filterStatus, setFilterStatus] = useState("all");


    const [isModel, setIsModel] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);

    useEffect(() => {
        showOfferproject(page);
    }, [page]);

    const showOfferproject = async (PageCurrent) => {
        setOffers([]);
        try {

            const res = await axios.get(
                `${baseURL}${ShowClientsOffer}${PageCurrent}/${limit}/${projectId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setOffers(res.data.offers || []);

        } catch (err) {
            console.log(err);
        }

    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const filteredOffers =
        filterStatus === "all"
            ? Offers
            : Offers.filter(
                (off) => off.offerStatus === filterStatus
            );

    return (
        <div className="client-offers-page">

            <div className="client-filter-bar">

                <button
                    className={filterStatus === "all" ? "client-filter-active" : ""}
                    onClick={() => setFilterStatus("all")}
                >
                    All
                </button>

                <button
                    className={filterStatus === "pending" ? "client-filter-active" : ""}
                    onClick={() => setFilterStatus("pending")}
                >
                    Pending
                </button>

                <button
                    className={filterStatus === "accepted" ? "client-filter-active" : ""}
                    onClick={() => setFilterStatus("accepted")}
                >
                    Accepted
                </button>

                <button
                    className={filterStatus === "rejected" ? "client-filter-active" : ""}
                    onClick={() => setFilterStatus("rejected")}
                >
                    Rejected
                </button>

            </div>

            {loading ? (

                <p className="client-loading">
                    Loading offers...
                </p>

            ) : filteredOffers.length > 0 ? (

                <div className="client-offers-list">

                    {filteredOffers.map((off) => (

                        <CardOfferProject
                            key={off.offer_id}
                            offers={off}
                            onOpen={() => {
                                setSelectedOffer(off);
                                setIsModel(true);
                            }}
                        />

                    ))}

                </div>

            ) : (

                <div className="client-empty-offers">

                    <div className="client-empty-icon">
                        📤
                    </div>

                    <p>No Offers Found</p>

                </div>

            )}

            <div className="client-pagination">

                <Pagination
                    count={totalPage}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{
                        "& .Mui-selected": {
                            backgroundColor: "#007a5a !important",
                            color: "#fff",
                        },
                    }}
                />

            </div>

            {isModel && selectedOffer && (

                <ShowOfferProjectDetails
                    offerdetails={selectedOffer}
                    onClose={() => {
                        setIsModel(false);
                        setSelectedOffer(null);

                    }}
                    refreshOffers={() => showOfferproject(page)}
                />

            )}

        </div>
    );
}