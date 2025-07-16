import React, { useEffect, useState } from "react";
import { State, City } from "country-state-city";

type StateOption = { label: string; value: string; code: string };
type CityOption = { label: string; value: string };

interface UseIndianStateCityParams {
  selectedStateName?: string;
  selectedCityName?: string;
  onCityReset?: () => void;
}

export const useIndianStateCity = ({
  selectedStateName,
  selectedCityName,
  onCityReset,
}: UseIndianStateCityParams) => {
  const [states, setStates] = useState<StateOption[]>([]);
  const [cities, setCities] = useState<CityOption[]>([]);
  const [cityKey, setCityKey] = useState(0);

  useEffect(() => {
    const stateList = State.getStatesOfCountry("IN").map((state) => ({
      label: state.name,
      value: state.name,
      code: state.isoCode,
    }));

    setStates(stateList);
  }, []);

  useEffect(() => {
    // dont fetch citiesList if state not selected or state list is empty
    if (!selectedStateName || states.length === 0) return;

    const selectedState = states.find(
      (state) => state.value === selectedStateName
    );

    if (selectedState) {
      const cityList = City.getCitiesOfState("IN", selectedState.code).map(
        (city) => ({
          label: city.name,
          value: city.name,
        })
      );

      setCities(cityList);

      const isCityValid = cityList.some((c) => c.value === selectedCityName);

      if (!isCityValid && selectedCityName !== "") {
        onCityReset?.(); // call callback function if provided, to reset the formik value
        setCityKey((prev) => prev + 1); // force reset Formik Select key
      }
    } else {
      setCities([]);
      onCityReset?.();
      setCityKey((prev) => prev + 1);
    }
  }, [selectedStateName, states]);

  return {
    states,
    cities,
    cityKey,
  };
};
