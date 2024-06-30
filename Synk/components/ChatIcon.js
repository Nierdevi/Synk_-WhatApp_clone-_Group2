import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ChatIcon(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <Path fill="none" d="M0 0H256V256H0z" />
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={13}
        d="M34.071 140.749a71.97 71.97 0 1125.18 25.18v-.001l-24.867 7.105a6 6 0 01-7.417-7.417l7.105-24.868z"
      />
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={13}
        d="M92.059 175.892a72.043 72.043 0 00104.69 38.037v-.001l24.867 7.105a6 6 0 007.417-7.417l-7.105-24.868h0a72.02 72.02 0 00-57.99-108.642"
      />
    </Svg>
  )
}

export default ChatIcon
