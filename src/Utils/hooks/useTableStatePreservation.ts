import { useState, useEffect } from 'react';

/**
 * Hook to preserve table state (filters, visible columns, submitted filters) across navigation
 * Useful for table-form workflows where users navigate from table to form and back
 * 
 * Usage:
 * ```typescript
 * const {
 *   filterValues,
 *   setFilterValues,
 *   visibleColumns,
 *   setVisibleColumns,
 *   submittedFilter,
 *   setSubmittedFilter,
 *   saveStateBeforeNavigation,
 *   resetToDefaults,
 * } = useTableStatePreservation({
 *   tableKey: 'uniqueTableIdentifier',
 *   defaultVisibleColumns: headers.map(h => h.key),
 *   defaultFilterValues: {},
 *   defaultSubmittedFilter: null,
 * });
 * 
 * // In navigation handler:
 * const handleSettings = (item) => {
 *   saveStateBeforeNavigation();
 *   navigate('/settings', { state: { id: item.id } });
 * };
 * 
 * // In refresh handler:
 * const handleRefresh = () => {
 *   resetToDefaults();
 *   // ... other refresh logic
 * };
 * ```
 */

interface UseTableStatePreservationOptions {
  tableKey: string;
  defaultVisibleColumns: string[];
  defaultFilterValues?: Record<string, any>;
  defaultSubmittedFilter?: Record<string, any> | null;
}

export const useTableStatePreservation = ({
  tableKey,
  defaultVisibleColumns,
  defaultFilterValues = {},
  defaultSubmittedFilter = null,
}: UseTableStatePreservationOptions) => {
  
  // Initialize state from sessionStorage or defaults
  const [filterValues, setFilterValues] = useState<Record<string, any>>(() => {
    const saved = sessionStorage.getItem(`${tableKey}_filterValues`);
    return saved ? JSON.parse(saved) : defaultFilterValues;
  });

  const [visibleColumns, setVisibleColumns] = useState<string[]>(() => {
    const saved = sessionStorage.getItem(`${tableKey}_visibleColumns`);
    return saved ? JSON.parse(saved) : defaultVisibleColumns;
  });

  const [submittedFilter, setSubmittedFilter] = useState<Record<string, any> | null>(() => {
    const saved = sessionStorage.getItem(`${tableKey}_submittedFilter`);
    return saved ? JSON.parse(saved) : defaultSubmittedFilter;
  });

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem(`${tableKey}_filterValues`, JSON.stringify(filterValues));
  }, [filterValues, tableKey]);

  useEffect(() => {
    sessionStorage.setItem(`${tableKey}_visibleColumns`, JSON.stringify(visibleColumns));
  }, [visibleColumns, tableKey]);

  useEffect(() => {
    sessionStorage.setItem(`${tableKey}_submittedFilter`, JSON.stringify(submittedFilter));
  }, [submittedFilter, tableKey]);

  // Function to clear all saved state
  const clearSavedState = () => {
    sessionStorage.removeItem(`${tableKey}_filterValues`);
    sessionStorage.removeItem(`${tableKey}_visibleColumns`);
    sessionStorage.removeItem(`${tableKey}_submittedFilter`);
  };

  // Function to save state before navigation
  const saveStateBeforeNavigation = () => {
    sessionStorage.setItem(`${tableKey}_filterValues`, JSON.stringify(filterValues));
    sessionStorage.setItem(`${tableKey}_visibleColumns`, JSON.stringify(visibleColumns));
    sessionStorage.setItem(`${tableKey}_submittedFilter`, JSON.stringify(submittedFilter));
  };

  // Function to reset state to defaults
  const resetToDefaults = () => {
    setFilterValues(defaultFilterValues);
    setVisibleColumns(defaultVisibleColumns);
    setSubmittedFilter(defaultSubmittedFilter);
    clearSavedState();
  };

  return {
    filterValues,
    setFilterValues,
    visibleColumns,
    setVisibleColumns,
    submittedFilter,
    setSubmittedFilter,
    clearSavedState,
    saveStateBeforeNavigation,
    resetToDefaults,
  };
};
