import { useEffect, useState, useCallback } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { fetchMasterDropdown } from "../../Redux/Features/Masters/MastersThunk";
import { API_ENDPOINTS } from "../../Config/Api/EndPoints";
import { toast } from "react-toastify";

interface LocationHookProps {
    countryId?: string | number;
    stateId?: string | number;
    districtId?: string | number;
}

export const useLocationDropdowns = ({ countryId, stateId, districtId }: LocationHookProps) => {
    const dispatch = useAppDispatch();

    // Data
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [cities, setCities] = useState([]);

    // Loading
    const [countryLoading, setCountryLoading] = useState(false);
    const [stateLoading, setStateLoading] = useState(false);
    const [districtLoading, setDistrictLoading] = useState(false);
    const [cityLoading, setCityLoading] = useState(false);

    // Errors
    const [countryError, setCountryError] = useState("");
    const [stateError, setStateError] = useState("");
    const [districtError, setDistrictError] = useState("");
    const [cityError, setCityError] = useState("");

    // =============================
    // Fetch Handlers (Memoized)
    // =============================

    const fetchCountries = useCallback(() => {
        setCountryLoading(true);
        setCountryError("");
        dispatch(fetchMasterDropdown({ url: `${API_ENDPOINTS.MASTER.COUNTRY_MASTER}/dropdown` }))
            .unwrap()
            .then((data) => {
                // Set value/label from countryName & countryId
                const formatted = data.map((item: any) => ({
                    label: item.countryName,
                    value: String(item.id),
                }));
                setCountries(formatted);
            })
            .catch((err: any) => {
                toast.error(err)
                setCountryError(err)
            })
            .finally(() => setCountryLoading(false));
    }, [dispatch]);

    const fetchStates = useCallback(() => {
        if (!countryId) return;
        setStateLoading(true);
        setStateError("");
        dispatch(fetchMasterDropdown({ url: `${API_ENDPOINTS.MASTER.STATE_MASTER}/by-country/${countryId}` }))
            .unwrap()
            .then((data) => {
                const formatted = data.map((item: any) => ({
                    label: item.stateName,
                    value: String(item.id),
                }));
                setStates(formatted);
            })
            .catch((err: any) => {
                toast.error(err)
                setStateError(err)
            })
            .finally(() => setStateLoading(false));
    }, [countryId, dispatch]);

    const fetchDistricts = useCallback(() => {
        if (!stateId) return;
        setDistrictLoading(true);
        setDistrictError("");
        dispatch(fetchMasterDropdown({ url: `${API_ENDPOINTS.MASTER.DISTRICT_MASTER}/by-state/${stateId}` }))
            .unwrap()
            .then((data) => {
                const formatted = data.map((item: any) => ({
                    label: item.districtName,
                    value: String(item.id),
                }));
                setDistricts(formatted);
            })
            .catch((err: any) => {
                toast.error(err)
                setDistrictError(err)
            })
            .finally(() => setDistrictLoading(false));
    }, [stateId, dispatch]);

    const fetchCities = useCallback(() => {
        if (!districtId) return;
        setCityLoading(true);
        setCityError("");
        dispatch(fetchMasterDropdown({ url: `${API_ENDPOINTS.MASTER.CITY_MASTER}/by-district/${districtId}` }))
            .unwrap()
            .then((data) => {
                const formatted = data.map((item: any) => ({
                    label: item.cityName,
                    value: String(item.id),
                }));
                setCities(formatted);
            })
            .catch((err: any) => {
                toast.error(err)
                setCityError(err)
            })
            .finally(() => setCityLoading(false));
    }, [districtId, dispatch]);

    // =============================
    // Auto-fetching Logic
    // =============================

    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);

    useEffect(() => {
        if (countryId) {
            fetchStates();
        }
        // Reset downstream data
        setStates([]);
        setDistricts([]);
        setCities([]);
    }, [countryId, fetchStates]);

    useEffect(() => {
        if (stateId) {
            fetchDistricts();
        }
        setDistricts([]);
        setCities([]);
    }, [stateId, fetchDistricts]);

    useEffect(() => {
        if (districtId) {
            fetchCities();
        }
        setCities([]);
    }, [districtId, fetchCities]);

    return {
        countries,
        states,
        districts,
        cities,

        countryLoading,
        stateLoading,
        districtLoading,
        cityLoading,

        countryError,
        stateError,
        districtError,
        cityError,

        // Manual Refetchers
        refetchCountries: fetchCountries,
        refetchStates: fetchStates,
        refetchDistricts: fetchDistricts,
        refetchCities: fetchCities,
    };
};
