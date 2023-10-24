import React from "react";
// import { useState } from "react";





const Pages = ({emailsPerPage, currentPage, setCurrentPage, emails, read ,unRead , favorites, isReadbtn, isUnReadbtn,isfavbtn}) => {




    const totalEmails = (isfavbtn ? 
                            Math.ceil(favorites.length / emailsPerPage):
                        isUnReadbtn ? 
                            Math.ceil(unRead.length / emailsPerPage):
                        isReadbtn ? 
                            Math.ceil(read.length / emailsPerPage):
                            Math.ceil(emails.length / emailsPerPage));
  



    // console.log(totalEmails,'total');
    
    
    const nextPage = () => {
        
        if(currentPage >= totalEmails){
            setCurrentPage(totalEmails)
        }
        else{
            setCurrentPage(currentPage + 1)
        }
    }
    const prevPage = () => {
        if(currentPage <= 1){
            setCurrentPage(1);
        }
        else{
            setCurrentPage(currentPage - 1)
        }
    }
    
    
    console.log(currentPage,'prev');
    
    
    
    return(
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <button 
                className="pagebtnp" 
                onClick={() => prevPage()}
                style={{
                    background: currentPage !== 1 ? '#E54065':'white',
                    color: currentPage !== 1 ? 'white':'black',
                    border: currentPage !== 1 ? 'none':'1px solid red'
                }}
            >
                Prev
            </button> 
            {Array.from({ length: totalEmails }, (_, i) => (
                <button 
                    key={i} 
                    className="pagebtnno" 
                    onClick={() => setCurrentPage(i + 1)}
                    style={{
                        background: currentPage === i+1 ? '#E54065':'white',
                        color: currentPage === i+1 ? 'white':'black',
                        border: currentPage === i+1 ? 'none':'1px solid red'
                        
                    }}
                >
                    {i + 1}
                </button>
            ))}
            <button 
                className="pagebtnn" 
                onClick={() => nextPage()}
                style={{
                    background: currentPage !== totalEmails ? '#E54065':'white',
                    color: currentPage !== totalEmails ? 'white':'black',
                    border: currentPage !== totalEmails ? 'none':'1px solid red'
                }}
            >
                Next
            </button>
        </div>
    )
}
export default Pages;















