import { FC } from "react"
import { useReferenceStructure } from "../../hooks/useReferenceStructure"

export const ReferenceNav: FC = () => {
    const {data, loading} = useReferenceStructure()
    return (
        <>
        {loading && <div>loading...</div>}
        {data && <div>{data?.structure}</div>}
        </>
    )
}