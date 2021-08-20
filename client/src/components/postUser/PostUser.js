import React,{useEffect,useState} from 'react'
import "./PostUser.css"
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const PostUser = ({post}) => {
    let history = useHistory()
    const [names,setNames] = useState([])

    const [money, setAmount] = useState()  
    const [cName, setClientName]= useState("")
    
    
    const submitHandler = async(e) =>{
        
        e.preventDefault();
        
        if(cName===''){
            window.alert('please select a name')
            return
        }

        const body = {
            userId: post._id,
            clientName: cName,
            amount: money
        }
        console.log(body)
        try{
            await axios.put('https://banking-mern-server.herokuapp.com/api/user/transferAmount',body)
            const wndw= window.confirm('transaction successful. You will be redirected to your transaction page')
            wndw===true && history.push('/transactions')
        }catch(err){
            console.log(err);
        }

    }

  useEffect(()=>{
    const fetchPosts = async() => {
        console.log("checking")
        const res = await axios.get('https://banking-mern-server.herokuapp.com/api/user/allUsers')
        setNames(res.data)       
    }
  
    fetchPosts()


  },[])

  
    return (
        <div className= "postUser">
            <div className="postUserWrapper">
                <form onSubmit={submitHandler}>

                <div className="postUserTop">
                    <div className="postUserTopLeft">
                        <span>Name: </span>
                        <span>{post.name}</span>
                       
                    </div>
                    <div className="postUserTopRight">
                        <span>Email:</span>
                        <span>{post.email}</span>
                    </div>
                </div>
                <div className="postUserCenter">
                    <div className="postUserCenterLeft">
                        <span>Balance: </span>
                        <span>{post.balance}</span>
                    </div>
                    <div className="postUserCenterRight">
                        <span>Transfer Money</span>
                        <button type = "submit" id = {post._id} >Send</button>
                    </div>
                </div>
                <div className="postUserBottom">
                    <div className="postUserBottomLeft">
                        <span>To: </span>
                        <select className = "select" id ="clientList" onChange={(e)=> setClientName(e.target.value)} >
                        <option value="" selected disabled hidden>Choose here</option>
                        
                            {names.map((p)=> 
                                
                                (p.name!==post.name && <option key = {p._id} value ={p.name} className = "option">{p.name}</option>) 
                            )}
                            
                        </select>
                    </div>
                    <div className="postUserBottomRight">
                        <span>Amount</span>
                        <input type="number" required name = "amount" id ="amount"
                        value ={money}
                        onChange = {(e)=> setAmount(e.target.value)}  />
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}

export default PostUser
