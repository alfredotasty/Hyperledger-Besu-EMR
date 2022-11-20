const History = () => {
    // test data
    const user = ["Person1","Person2","Person3"]

    return(
        <div>
            <h2>Admid History</h2>
        <div className='timeline'>
        <div>
            <h3 className="first">First</h3>
        </div>
            <div className='outer'>
                {user.map((user, i) => (
                    <div className='card' key={i}>
                        <div className="title">
                            <div className= 'info'>
                                <h3 >History</h3>
                                <p>From: {user}</p>
                                <p>Detail: {user.address}</p>
                                <p>Date : {user.node}</p> 
                             
                            </div>                           
                        </div>
                    </div>    
                ))}
            </div>
            <div>
                <h3 className="last">Last</h3>
                
            </div>
            </div>
        </div>

    )
}
export default History;