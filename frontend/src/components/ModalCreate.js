import React from 'react';
import Modal from 'react-modal'


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      width: 400,
      transform             : 'translate(-50%, -50%)'
    }
  }

  Modal.setAppElement('#root')

const ModalCreate = ({data, setData, handleSubmit, modalIsOpen, setModalIsOpen}) => {

   
    const headers = Object.keys(data)

    return ( 

        <>
        <button 
          className='btn btn-success btn-lg mb-2'
          onClick={() => setModalIsOpen(true)}
        >
          <i class="fas fa-plus"></i>  Create
        </button>

        <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
      <h2>Create Form</h2>
      <form onSubmit={handleSubmit}>

        {headers.map((header, i) =>  (
            data[header].type === 'checkbox' 
            ? (
              <div key={i} className="form-check">
              <input 
                key={i}
                type={data[header].type}
                id={header}
                className="form-check-input" 
                checked={data[header].data}
                onChange={(e) => setData({...data , [header]:{type: data[header].type, data: e.target.checked} })}
              />
               <label className="form-check-label" htmlFor={header}>{header}</label>
              </div>
            )
            :(
              <div key={i} className="form-group">
              <label htmlFor={header}>{header}</label>
              <input 
                key={i}
                type={data[header].type}
                id={header}
                className="form-control" 
                aria-describedby={header}
                placeholder= {`Enter ${header}`}
                value={data[header].data}
                onChange={(e) => setData({...data , [header]:{type: data[header].type, data: e.target.value} })}
              />
             
              </div>
              )
            

            )
        

            
            
        )}

        <hr/>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button className='btn btn-danger float-right' onClick={() => setModalIsOpen(false)}>Close</button>
      </form>
  </Modal>
     </>
     );
}
 
export default ModalCreate;