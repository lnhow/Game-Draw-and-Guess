// import React, { useState } from 'react'
// import input from '../../common/inputField/input'

// import { useSelector, useDispatch } from 'react-redux'
// import { updateUserName } from '../../features/User/userSlice'

// const Username = () => {
//     const [user,setUser] = useState('')
//     const dispatch = useDispatch()

//     function handleSubmit(e){

//         e.preventDefault();
//         const action = ()=>{
//             return {
//                 newUserName:user
//             }
//         }
//         dispatch(updateUserName(action()))

//     }

//     return (
//         <div>
//             <form>
//             <input onChange={e=>setUser(e.target.value)}  placeholder="Change Username"></input>
//             <button type="submit" onClick={(e)=>handleSubmit(e)}>Change</button>
//             </form>
//         </div>
//     )
// }

// export default Username
