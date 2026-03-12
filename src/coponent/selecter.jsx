import { useEffect } from "react"

const option = [
    "camt.003.001.08",
    "pacs.008.001.13",
    "camt.004.001.10",
    "pacs.002.001.15"
]

export default function Select({
    mgsNameSelect,
    setgsNameSelect,
    jsonText,
    setJsonText,
    isConvertTo20022
}) {

    const handleChange = (e) => {

        const value = e.target.value
        setgsNameSelect(value)

        try {
            const data = JSON.parse(jsonText)

            if (isConvertTo20022) {

                if (!data.listField) data.listField = {}
                data.listField["62"] = value

            } else {

                if (!data.AppHdr) data.AppHdr = {}
                data.AppHdr.MsgDefIdr = value

            }

            setJsonText(JSON.stringify(data, null, 2))

        } catch (err) {
            console.error("JSON lỗi:", err)
        }
    }

    return (
        <div>
            <select
                className="border rounded-2xl"
                onChange={handleChange}
                value={mgsNameSelect}
            >
                {option.map((item, index) => (
                    <option
                        key={index}
                        className="active:bg-[#50a2ff]"
                        value={item}
                    >
                        {item}
                    </option>
                ))}
            </select>
        </div>
    )
}