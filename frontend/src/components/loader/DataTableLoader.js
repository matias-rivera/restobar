import React from "react"
import ContentLoader from "react-content-loader"

const DataTableLoader = (props) => (
  <ContentLoader 
    speed={2}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    style={{ width: '100%', height: '420px' }}
    {...props}
  >
    <rect x="0" y="5" rx="3" ry="3"  style={{ width: '100%'}} height="50" /> 
    <rect x="0" y="60" rx="3" ry="3"  style={{ width: '100%'}} height="55" /> 
    <rect x="0" y="120" rx="3" ry="3"  style={{ width: '100%'}} height="55" />
    <rect x="0" y="180" rx="3" ry="3"  style={{ width: '100%'}} height="55" />
    <rect x="0" y="240" rx="3" ry="3"  style={{ width: '100%'}} height="55" />
    <rect x="0" y="300" rx="3" ry="3"  style={{ width: '100%'}} height="55" />
    <rect x="0" y="360" rx="3" ry="3"  style={{ width: '100%'}} height="55" />



  </ContentLoader>
)

export default DataTableLoader

