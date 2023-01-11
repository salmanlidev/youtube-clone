import { useEffect } from "react"
import sideBarData from "../../assets/data/sideBarData"
import { SideBarItem } from "./sideBarItem"

export const SideBar = ({ watch }) => {


  return (
    <div className={`hidden lg:block h-[calc(100vh-100px)] duration-300 px-2 border-r ${watch ? "w-[70px]" : "w-[240px]"}`}>
      <ul className={`w-full flex flex-col space-y-5 ${watch ? "mt-5" : "py-5"}`} >
        {sideBarData.map((data, index) => (
          <SideBarItem key={index} data={data} watch={watch} />
        ))}
      </ul>
    </div>
  )
}
