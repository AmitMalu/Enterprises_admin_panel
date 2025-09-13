import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hooks';
import { toast } from 'react-toastify';
import { KYC_VIEW_KEY, kycDetailsHeaders, KycDetailsTableType, PENDING_KYC_URL } from '../../Config/Management/PendingKycConfig';
import { fetchMasterById } from '../../Redux/Features/Masters/MastersThunk';
import BackHeader from '../../Components/Molecules/BackHeader';
import BreadCrumb from '../../Components/Molecules/BreadCrumb';
import ShimmerTableRows from '../../Components/Atoms/ShimmerTableRows';
import GenericMasterTable from '../../Components/Organisms/GenericMasterTable';
import { Tooltip } from '@mantine/core';
import { EditIcon } from '../../assets/Icons';

const PendingKycView = () => {

    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAndSet = async () => {
            if (id) {
                setLoading(true);
                // setFetchError(null);
                try {
                    const data = await dispatch(
                        fetchMasterById({ key: KYC_VIEW_KEY, endpoint: `${PENDING_KYC_URL}/details`, id })
                    ).unwrap();

                    setData(data);

                } catch (err: any) {
                    toast.error(err);
                    // setFetchError(err);
                    setTimeout(() => {
                        // navigate("/management/kyc-pending/");
                    }, 2000);
                }
                finally {
                    setLoading(false);
                }
            }
        };

        fetchAndSet();

    }, [dispatch, id]);

    return (
        <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col bg-[#F8F8F8]">

            <BackHeader
                title="PENDING KYC DETAILS"
                backPath="/management/kyc-pending"
            />

            {/* Sub Heading */}
            <BreadCrumb type={"Pending KYC"} text="Management" />

            {
                loading ? (
                    // Render shimmer
                    <ShimmerTableRows rowCount={6} columnCount={kycDetailsHeaders.length} />
                ) : (
                    <GenericMasterTable<KycDetailsTableType>
                        data={data}
                        headers={kycDetailsHeaders}
                        renderExtraHeader={() => <></>} // empty header for action column/>
                        renderExtraRowCell={() => (
                            <div className="flex justify-center gap-2 min-w-10">
                                <Tooltip
                                    label="View Documents" withArrow={false}
                                    styles={{
                                        tooltip: {
                                            backgroundColor: 'grey',
                                            color: 'white',
                                            fontSize: '12px',
                                        }
                                    }}
                                >
                                    <span
                                        // onClick={() => navigate(`/management/kyc-pending/${item}`)}
                                        className="cursor-pointer"
                                    >
                                        <EditIcon />
                                    </span>
                                </Tooltip>
                            </div>
                        )}
                    />
                )
            }
        </div>
    )
}

export default PendingKycView
