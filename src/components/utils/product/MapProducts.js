// import { isArray } from "util"

// const flattenObject = (obj) => {
//     const flattened = {}
  
//     Object.keys(obj).forEach((key) => {
//         if(obj[key] === 'vendor' || obj[key] === 'created_at' || obj[key] === 'active'){
//         }else{
//             if (typeof obj[key] === 'object' && !isArray(obj[key]) && obj[key] !== null) {
//               Object.assign(flattened, flattenObject(obj[key]))
//             } else {
//               flattened[key] = obj[key]
//             }
//         }
//     })
  
//     return flattened
// }

// const mapProducts = (data) => {
//     const mappedData = []
//     const mappedObject = {}
//     if(isArray(data)){
//         data.forEach(obj => {
//           mappedData.push(flattenObject(obj))   
//         })
//         return mappedData;
//     }
//     return flattenObject(data)    
// }

// export default mapProducts;