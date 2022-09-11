import { useCallback, useEffect, useMemo, useState } from "react";
import { VERBOSITY } from "../lib/constants"
import { TRequest } from "../models/models";
import useClient from "./useClient"

export const useReferenceStructure = () => {
    const { fetchMe, loading, error } = useClient(VERBOSITY.NORMAL);
    const [data, setData] = useState<TData |  null>(null);

    type TData = {
        hash: string
        path: string
        reference_structure_id: number
        structure: string
    }

    const request: TRequest = useMemo(() => {
        return {
            method: 'GET',
            path: `/api/reference/structure`
        }
    }, [])

    const getReferenceStructure = useCallback(
        async( request: TRequest ) => {
            const data: TData = await fetchMe(request);
            setData(data)
        }, [fetchMe]
    )

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getReferenceStructure(request)
        }
        return ( ) => {
            mounted = false
        }
    }, [getReferenceStructure, request])

    return {
        data,
        loading,
        error
    }
}