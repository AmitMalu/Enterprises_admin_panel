import { useEffect, useState, useCallback, useRef } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { fetchMasterDropdown } from "../../Redux/Features/Masters/MastersThunk";
import { API_ENDPOINTS } from "../../Config/Api/EndPoints";
import { toast } from "react-toastify";

// Hook to track previous value
function usePrevious<T>(value: T) {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}
interface LocationHookProps {
    countryId?: string | number;
    stateId?: string | number;
    districtId?: string | number;
    cityId?: string | number;
    onResetCountry?: () => void;
    onResetState?: () => void;
    onResetDistrict?: () => void;
    onResetCity?: () => void;
    getStates?: boolean;
    getDistricts?: boolean;
    getCities?: boolean;
}

export const useLocationDropdowns = ({
    countryId,
    stateId,
    districtId,
    cityId,
    onResetCountry,
    onResetState,
    onResetDistrict,
    onResetCity,
    getStates = false,
    getDistricts = false,
    getCities = false
}: LocationHookProps) => {
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

    // Keys (for rerender)
    const [countryKey, setCountryKey] = useState(0);
    const [stateKey, setStateKey] = useState(0);
    const [districtKey, setDistrictKey] = useState(0);
    const [cityKey, setCityKey] = useState(0);

    const prevCountryId = usePrevious(countryId);
    const prevStateId = usePrevious(stateId);
    const prevDistrictId = usePrevious(districtId);

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
                const isValid = formatted?.some((item: any) => item.value === String(countryId));

                if (!isValid && countryId !== "") {
                    onResetCountry?.();
                    setCountryKey((k) => k + 1);
                }
            })
            .catch((err: any) => {
                onResetCountry?.();
                toast.error(err)
                setCountryError(err)
            })
            .finally(() => setCountryLoading(false));
    }, [dispatch]);

    const fetchStates = useCallback(() => {
        if (!countryId || countryId === "" || countryId === null || countryId === undefined) return;
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
                setStateKey((k) => k + 1);

                const isValid = formatted?.some((item: any) => item.value === String(stateId));

                if (!isValid && stateId !== "") {
                    onResetState?.();
                    setStateKey((k) => k + 1);
                }
            })
            .catch((err: any) => {
                onResetState?.();
                toast.error(err)
                setStateError(err)
            })
            .finally(() => setStateLoading(false));
    }, [countryId, stateId, dispatch]);

    const fetchDistricts = useCallback(() => {
        if (!stateId || stateId === "" || stateId === null || stateId === undefined) return;

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
                setDistrictKey((k) => k + 1);

                const isValid = formatted.some((item: any) => item.value === String(districtId));
                if (!isValid && districtId) {
                    onResetDistrict?.();
                    setDistrictKey((k) => k + 1);
                }
            })
            .catch((err: any) => {
                onResetDistrict?.();
                toast.error(err)
                setDistrictError(err)
            })
            .finally(() => setDistrictLoading(false));
    }, [stateId, districtId, dispatch]);

    const fetchCities = useCallback(() => {
        if (!districtId || districtId === "" || districtId === null || districtId === undefined) return;
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
                setCityKey((k) => k + 1);
                const isValid = formatted.some((item: any) => item.value === String(cityId));
                if (!isValid && cityId) {
                    onResetCity?.();
                    setCityKey((k) => k + 1);
                }
            })
            .catch((err: any) => {
                onResetCity?.();
                toast.error(err)
                setCityError(err)
            })
            .finally(() => setCityLoading(false));
    }, [districtId, cityId, dispatch]);

    // =============================
    // Auto-fetching Logic
    // =============================

    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);

    useEffect(() => {
        if (getStates && countryId && prevCountryId !== countryId) {
            fetchStates();
        }
    }, [countryId, prevCountryId, fetchStates]);

    useEffect(() => {
        if (getDistricts && stateId && prevStateId !== stateId) {
            fetchDistricts();
        }
    }, [stateId, prevStateId, fetchDistricts]);

    useEffect(() => {
        if (getCities && districtId && prevDistrictId !== districtId) {
            fetchCities();
        }
    }, [districtId, prevDistrictId, fetchCities]);


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

        countryKey,
        stateKey,
        districtKey,
        cityKey,

        // Manual Refetchers
        refetchCountries: fetchCountries,
        refetchStates: fetchStates,
        refetchDistricts: fetchDistricts,
        refetchCities: fetchCities,
    };
};
