const Record = () => {
    // test data
    const user = ["Person1","Person2","Person3"]

    return(
        <div class=''><br/><br/><br/><br/>
        <h2>Medical Record Section</h2>
            <div class='row form'>
                <div class='column'>
                    <h4>patient permission</h4>
                    <label>patient publicKey</label><br />
                    <input className='input_default'type='text'/><br />
                    <button className='button_createGroup'>Confirm</button>  <br />  <br/>  <br/>
                  
                    <h4>Patient History</h4>
                        <input className='input_default'type='text'/><br />
                        <button className='button_createGroup'>Show History</button>
               
                </div>
                
                <div class='column'>
                    <div>
                        <h4>Name</h4>
                        <input className='input_default'type='text'/><br />
                    </div><br />
                    <div>
                        <h4>Record</h4>
                        <input className='input_default'type='text'/><br />
                    </div><br />
                    <div>
                        <h4>Date</h4>
                        <input className='input_default'type='text'/><br />
                    </div>
                    <button className='button_createGroup'>Confirm</button>
                    </div>
                    
                </div>
            </div>


    )
}
export default Record;