
import { useEffect, useState } from 'react'
import './App.css'
import JSONPretty from "react-json-pretty";
import { useConvert20022to8583Mutation, useConvert8583to20022Mutation } from './slides/convertSlide'
import { TfiReload } from "react-icons/tfi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import { FaRightLong } from "react-icons/fa6";
import Select from './coponent/selecter';

const supportMsg = [
  "camt.003.001.08",
  "pacs.008.001.13",
  "camt.004.001.10",
  "pacs.002.001.15"
];

function App() {
  const [isConvertTo20022, setIsConvertTo20022] = useState(true)
  const [mgsName, setgsName] = useState("")
  const [issupportMsg, setIssupportMsg] = useState(true)
  const [mgsNameSelect, setgsNameSelect] = useState("")


  const [convertdata, setconvertdata] = useState(null)

  const [jsonText, setJsonText] = useState("");

  const [convert20022to8583] = useConvert8583to20022Mutation();
  const [convert8583to20022] = useConvert20022to8583Mutation();

  function isValidJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  const convertFile8583 = async () => {

    try {
      const res8385 = await convert20022to8583(jsonText).unwrap();
      setconvertdata(res8385);
      toast.success("Convert Thành Công");
    } catch (error) {

      toast.error(
        typeof error === "string"
          ? error
          : error?.data || "Convert thất bại",

        { autoClose: 10000, }
      );
    }
  };

  const convertFile20022 = async () => {
    try {
      const res8583 = await convert8583to20022(jsonText).unwrap();
      setconvertdata(res8583);
      toast.success("Convert Thành Công");
    } catch (error) {

      toast.error(
        typeof error === "string"
          ? error
          : error?.data || "Convert thất bại",
        { autoClose: 10000 }
      );
    }
  };

  const handleChangeJsontext = (e) => {

    setJsonText(e.target.value)
  }




  useEffect(() => {
    if (!jsonText) return

    try {
      const data = JSON.parse(jsonText)

      if (isConvertTo20022) {
        setgsName(data?.listField?.["62"])
      } else {
        setgsName(data?.AppHdr?.MsgDefIdr)

      }


      if (supportMsg.includes(mgsName)) {

        setIssupportMsg(true)
      }
      else { setIssupportMsg(false) }
    } catch (error) {
    }

  }, [jsonText])
  const convert = () => {



    if (mgsName !== "" && !issupportMsg) {
      toast.error("tool chưa hỗ trợ bản tin " + mgsName);
      return;
    }

    if (!isValidJSON(jsonText)) {
      toast.error("Json không đúng định dạng!!")
    } else {

      if (isConvertTo20022) {
        convertFile8583()

      } else {
        convertFile20022()
      }
    }

  }

  return (

    <div className='bg-gray-200 flex justify-center h-[100vh] w-[100vw] flex-col items-center'>
      <ToastContainer />
      <div className='bg-white shadow-2xl p-2 h-[95%] rounded-2xl  w-[95%] gap-1 item'>
        <div className='w-full h-[10%] flex justify-between'>
          <p className={`flex items-center transition-[5000] justify-center w-[70%] font-bold text-[20px] duration-3000 text-black`}>

            {isConvertTo20022 ? "8583" : "20022"}
          </p>
          <div className='flex flex-col justify-center items-center gap-2'>

            <button className='text-blue-400 transform active:rotate-180 duration-500'
              onClick={() => { setIsConvertTo20022(!isConvertTo20022) }}>
              <TfiReload />
            </button>


            <Select
              mgsNameSelect={mgsName}
              setgsNameSelect={setgsNameSelect}
              jsonText={jsonText}
              setJsonText={setJsonText}
              isConvertTo20022={isConvertTo20022}
            />

          </div>
          <p className='flex items-center justify-center w-[70%] font-bold text-[20px] text-black'>{!isConvertTo20022 ? "8583" : "20022"}
          </p>
        </div>
        <div className="flex h-[80%] gap-2">

          <div className='w-[50%] border h-full rounded-2xl border-gray-400 relative overflow-auto '>
            <button
              onClick={() => {
                setFile(null)
                setJsonText("")
              }}
              className='bg-red-500 text-white rounded-[50%] absolute top-5 right-5 text-xl p-1 '>
              <MdOutlineDeleteOutline />

            </button>

            <div className='h-full flex flex-col p-2 gap-1'>

              <textarea value={jsonText} type="text" accept=".json" onChange={handleChangeJsontext}
                className=' flex-1 w-full  text-black rounded-2xl  focus:outline-0    font-normal text-[20px] p-2' />


            </div>


          </div>
          <div className='w-[50%] border h-full rounded-2xl border-gray-400 relative overflow-auto'>
            {convertdata ?
              <p className=" font-normal text-[10px] text-left whitespace-p-wrap p-2 text-black">
                <JSONPretty
                  data={convertdata}
                  theme="monikai"
                />
              </p>
              :
              ""
            }
          </div>
        </div>
        <div className='w-full flex justify-center items-center'>
          <button className='font-bold bg-blue-400 text-white p-4 rounded-[50%]'
            onClick={convert}
          >
            <FaRightLong />
          </button>
        </div>
      </div>

    </div>
  )
}

export default App
