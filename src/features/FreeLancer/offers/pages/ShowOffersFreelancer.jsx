import axios from "axios";
import { useEffect, useState } from "react"
import Cookies from "universal-cookie";
import { baseURL } from "../../../../services/Api/api";
import { GetFreelancerOffers } from "../services/api_offers";
import { Pagination } from "@mui/material";
import CardOffer from "../components/CardOffer";
import '../styles/ShowOffersFreelancer.css'
import ShowOffersDetails from "./ShowOffersDetails";
export default function ShowOffersFreelancer() {
    const cookies = new Cookies();
    const token = cookies.get('token-freelancer')
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(6);
    const [limit] = useState(3);
    const [Offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false);
    const[isModel,setIsModel]= useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);
    useEffect(() => {
        ShowOffers(page)
    }, [page])
    const ShowOffers = async (currentPage) => {
        // setLoading(true);
        setOffers([]);

        try {
            const res = await axios.get(`${baseURL}${GetFreelancerOffers}${currentPage}/${limit}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOffers(res.data.offers || [])
        } catch (err) {
            console.log(err)
        }
    }
    const handlePageChange = (event, value) => {
        setPage(value)
    }
    return (
        <div className="offers-page">

            {loading ? (
                <p className="offers-loading">Loading offers...</p>
            ) : Offers.length > 0 ? (

                <div className="offers-list">

                    {Offers.map((off) => (
                        <CardOffer
                            key={off.offer_id}
                            offers={off}
                              
                            onOpen={()=>{setSelectedOffer(off);
                                setIsModel(true)}}
                        />
                    ))}

                </div>

            ) : (

                <div className="offers-empty">

                    <div className="offers-empty-icon">
                        📤
                    </div>

                    <p>
                        No Offers found
                    </p>

                </div>

            )}

            <div className="offers-pagination">

                <Pagination
                    count={totalPages}
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
            {isModel && (
                            <ShowOffersDetails 
                               offerdetails={selectedOffer}
                                onClose={() => setIsModel(false)}
                            />
                        )}

        </div>
    )
}