const option = [
    "camt.003.001.08",
    "pacs.008.001.13",
    "camt.004.001.10",
    "pacs.002.001.1"]

export default function Select({ mgsNameSelect, setgsNameSelect, jsonText, setJsonText, isConvertTo20022 }) {

    const handleChange = (e) => {

        const value = e.target.value
        setgsNameSelect(value)

        const data = JSON.parse(jsonText)

        if (isConvertTo20022) {
            data.listField["62"] = value
        } else {
            data.AppHdr.MsgDefIdr = value
        }

        setJsonText(JSON.stringify(data, null, 2))
    }

    return (
        <div>
            <select className="border rounded-2xl" onChange={handleChange} value={mgsNameSelect}
            >
                {option.map((item, index) => {
                    return (
                        <option className="active:bg-[#50a2ff] border rounded-2xl" value={item}>{item}</option>
                    )
                })}

            </select>
        </div>
    )

}