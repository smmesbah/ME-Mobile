import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function Calender(props?: any) {
  return (
    <Svg
      fill="#000"
      xmlns="http://www.w3.org/2000/svg"
      width="800px"
      height="800px"
      viewBox="0 0 612 612"
      xmlSpace="preserve"
      {...props}
    >
      <Path d="M612 463.781c0-70.342-49.018-129.199-114.75-144.379-10.763-2.482-21.951-3.84-33.469-3.84-3.218 0-6.397.139-9.562.34-71.829 4.58-129.725 60.291-137.69 131.145-.617 5.494-.966 11.073-.966 16.734 0 10.662 1.152 21.052 3.289 31.078C333.139 561.792 392.584 612 463.781 612 545.641 612 612 545.641 612 463.781zm-148.219 98.016c-54.133 0-98.016-43.883-98.016-98.016s43.883-98.016 98.016-98.016 98.016 43.883 98.016 98.016-43.883 98.016-98.016 98.016z" />
      <Path d="M482.906 396.844L449.438 396.844 449.438 449.438 396.844 449.438 396.844 482.906 482.906 482.906 482.906 449.438 482.906 449.438z" />
      <Path d="M109.969 0c-9.228 0-16.734 7.507-16.734 16.734V95.625c0 9.228 7.506 16.734 16.734 16.734h14.344c9.228 0 16.734-7.507 16.734-16.734V16.734C141.047 7.507 133.541 0 124.312 0h-14.343zM372.938 0c-9.228 0-16.734 7.507-16.734 16.734V95.625c0 9.228 7.507 16.734 16.734 16.734h14.344c9.228 0 16.734-7.507 16.734-16.734V16.734C404.016 7.507 396.509 0 387.281 0h-14.343z" />
      <Path d="M38.25 494.859h236.672A181.687 181.687 0 01271.35 459c0-4.021.177-7.999.435-11.953H71.719c-15.845 0-28.688-12.843-28.688-28.688v-229.5h411.188v88.707c3.165-.163 6.354-.253 9.562-.253 11.437 0 22.61 1.109 33.469 3.141V93.234c0-21.124-17.126-38.25-38.25-38.25h-31.078v40.641c0 22.41-18.23 40.641-40.641 40.641h-14.344c-22.41 0-40.641-18.231-40.641-40.641V54.984H164.953v40.641c0 22.41-18.231 40.641-40.641 40.641h-14.344c-22.41 0-40.641-18.231-40.641-40.641V54.984H38.25C17.126 54.984 0 72.111 0 93.234v363.375c0 21.124 17.126 38.25 38.25 38.25z" />
      <Circle cx={134.774} cy={260.578} r={37.954} />
      <Circle cx={248.625} cy={260.578} r={37.954} />
      <Circle cx={362.477} cy={260.578} r={37.954} />
      <Circle cx={248.625} cy={375.328} r={37.953} />
      <Circle cx={134.774} cy={375.328} r={37.953} />
    </Svg>
  )
}

export default Calender