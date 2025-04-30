import Auth from "./auth";


export default function Home() {
  return (
    <div style={{height:'100vh',width:'100vw',backgroundColor:'white',overflow:'hidden',display:'flex',
      alignItems:'center',justifyContent:'center',flexDirection:'column',
      backgroundImage:'url(https://img.freepik.com/free-vector/abstract-secure-technology-background_23-2148331624.jpg?t=st=1745988060~exp=1745991660~hmac=90f7120b2f31d970a7a17dead0fe8ebfea3e74db4933ce0f8ec39668a7a61619&w=1380'
    }}>
    <Auth></Auth>
    </div>
  )
}
