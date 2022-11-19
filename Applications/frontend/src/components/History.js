const History = () => {
    // test data
    const user = ["Person1","Person2","Person3"]

    return(
        <div>
            <h2>Admid History</h2>

        <div className='fram'>
            <div >
                {user.map((user, i) => (
                    <div className='square' key={i}>
                        <p>From: {user}</p>
                        <p>Detail: {user.address}</p>
                        <p>Date : {user.node}</p>       
                        <hr></hr>          
                    </div>
        
                ))}
            </div>
        </div>
        </div>
    )
}
export default History;