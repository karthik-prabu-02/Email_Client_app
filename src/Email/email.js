import React, { useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { fetchEmail } from '../store/emailing/emailing';
import Pages from './page';



const Email = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(state => state.email);


  useEffect(() => {
    dispatch(fetchEmail());
  }, [dispatch]);

  const [emails, setEmails] = useState([]);
  
  useEffect(() => {
    if(data && data.list) {
      setEmails(data.list); 
    }



  }, [data]);
  
  
  
  // getting body of mail -> 
  const [Ebody,updEBody]=useState([]);
  const [changeId,updchangeId]=useState(null);
  console.log(Ebody,'body of email');
  useEffect(() => {
    if (changeId) {
      fetch(`https://flipkart-email-mock.now.sh/?id=${changeId}`)
        .then((response) => response.json())
        .then((data) => {
          // Store the additional data in the state
          updEBody(data);
        })
        .catch((error) => {
          console.error('Error fetching additional data:', error);
        });
    }
  }, [changeId]);
  console.log("render mail",emails);

  






  // css fn
  const [classMail,updClass]=useState(null);
  const [id,updId] =useState(null);
  // console.log(classMail,id);
  const [selectedmail,updselectedEmail] = useState(null);
  console.log("selectedMail",selectedmail);


// unix -> date
  const dateTime = (unix) => {
    const secondsSinceUnixEpoch = unix / 1000;
    const date = new Date(secondsSinceUnixEpoch * 1000);
    
    const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // Use 12-hour format
  };

  return date.toLocaleDateString('en-US', options);
  }





//change color of selected mail
    const [selected_mail_color,upt_selected_color] = useState(null);
    console.log(selected_mail_color,"color");




//read list
    const [read,updRead]= useState([]);
    const [unRead,updUnRead] = useState(emails);
    useEffect(() => {
      if(data && data.list) {
        updUnRead(data.list); 
        upt_selected_color([data.list[0]]);

      }
    }, [data]);






    const selectedEmail = (email) => {
      updId("selected_mail");
      updClass("selected_class");
      updchangeId(email.id);
      updselectedEmail([email]);
      upt_selected_color([email]);
    // Read
      const AlreadyRead=read.filter(mail=> mail.id === email.id);
      if(AlreadyRead.length===0){
        updRead([...read,email]);
      }
    //unread
      
      const unreadFilter = unRead.filter(mail=>mail.id!==email.id);
      updUnRead(unreadFilter);
    }
    console.log(unRead,'unread');
    console.log(read,'read');


  // Favorites
    const [favorites, updFavorites] = useState([]);
    const selctFav = (mail) => {
        const AlreadyFav=favorites.filter(email=> email.id === mail.id);
        if(AlreadyFav.length===0){
        updFavorites([...favorites,mail]);
        }
    }
    console.log(favorites,'fav');

  







//*****************************************************pages***************************************************** */
const [currentPage, setCurrentPage] = useState(1);
const emailsPerPage = 5;
const indexOfLastEmail = currentPage * emailsPerPage;
const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
const currentEmails = emails.slice(indexOfFirstEmail, indexOfLastEmail);
const currentRead = read.sort((a, b) => b.date - a.date).slice(indexOfFirstEmail, indexOfLastEmail);
const currentunRead = unRead.slice(indexOfFirstEmail, indexOfLastEmail);
const currentFav= favorites.sort((a, b) => b.date - a.date).slice(indexOfFirstEmail, indexOfLastEmail);

//******************************************************************************************************************* */










const [isReadbtn,updIsReadBtn]=useState(false);
const [isUnReadbtn,updIsUnReadBtn]=useState(false);
const [isfavbtn,updIsfavBtn]=useState(false);


const readFn = () => {
  updIsUnReadBtn(false);
  updIsfavBtn(false);
  updIsReadBtn(!isReadbtn);
  setCurrentPage(1);
}
const unReadFn = () => {
  updIsReadBtn(false);
  updIsfavBtn(false);
  updIsUnReadBtn(!isUnReadbtn);
  setCurrentPage(1);
  
}
const favoriteFn = () => {
  updIsReadBtn(false);
  updIsUnReadBtn(false);
  updIsfavBtn(!isfavbtn);
  setCurrentPage(1);
  
}




if (isLoading) {
  return <h1>Loading...</h1>; 
}



  return (
    <React.Fragment>
      <header className="header">
        <span>Filter By:</span>
        <button onClick={()=>unReadFn()}>Unread</button>
        <button onClick={()=>readFn()}>Read</button>
        <button onClick={()=>favoriteFn()}>Favorites</button>
      </header>

        <div className='divider'>      
            <div className='body' id={id}>
            {isfavbtn ? (
              currentFav.map(email => (
                <div 
                    className="single_mail" 
                    key={email.id} 
                    onClick={()=>selectedEmail(email)}
                    style={{
                      backgroundColor: read.some(r => r.id === email.id) ? 'lightgray' : '#F2F2F2',
                      border : selected_mail_color.some(r => r.id === email.id) ? '1px solid red' : '1px solid #CFD2DC'
                    }}
                >
                    <div className='img'>
                        <div className='imga'>{email.from.name[0].toUpperCase()}</div>
                    </div>
                    <div className='content'>
                        <div className='content1'>
                            <span>From :</span>
                            <span>{email.from.name.toUpperCase()}</span>
                            <span>&lt; {email.from.email} &gt;</span>
                            
                            
                            
                        </div>
                        <div className='content2'>
                            <span>Subject :</span>
                            <span style={{overflow:'hidden'}}>{email.subject}</span>
                        </div>
                        <div className='content3'> {email.short_description}</div>
                        <div className='content4'>
                            <time >{dateTime(email.date).replace(/,/g, '').replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')}</time>
                            <span style={{marginLeft:'20px',color:'#e54065'}}>{favorites.filter(fav => fav.id === email.id).length > 0 ? "Favorite" : ""}</span>
                        </div>
                    </div>
                    
                        

                </div>
            ))
            ) : isUnReadbtn ? (
              currentunRead.map(email => (
                <div 
                    className="single_mail" key={email.id} 
                    onClick={()=>selectedEmail(email)}
                    style={{
                      backgroundColor:'#F2F2F2',
                      border : selected_mail_color.some(r => r.id === email.id) ? '1px solid red' : '1px solid #CFD2DC'
                    }}
                >
                    <div className='img'>
                        <div className='imga'>{email.from.name[0].toUpperCase()}</div>
                    </div>
                    <div className='content'>
                        <div className='content1'>
                            <span>From :</span>
                            <span>{email.from.name.toUpperCase()}</span>
                            <span>&lt; {email.from.email} &gt;</span>
                            
                            
                            
                        </div>
                        <div className='content2'>
                            <span>Subject :</span>
                            <span style={{overflow:'hidden'}}>{email.subject}</span>
                        </div>
                        <div className='content3'> {email.short_description}</div>
                        <div className='content4'>
                            <time >{dateTime(email.date).replace(/,/g, '').replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')}</time>
                            <span style={{marginLeft:'20px',color:'#e54065'}}>{favorites.filter(fav => fav.id === email.id).length > 0 ? "Favorite" : ""}</span>
                        </div>
                    </div>
                    
                        

                </div>
            ))
            ) : isReadbtn ? (
              currentRead.map(email => (
                <div 
                    className="single_mail" key={email.id} 
                    onClick={()=>selectedEmail(email)}
                    style={{
                      backgroundColor:'lightgray',
                      border : selected_mail_color.some(r => r.id === email.id) ? '1px solid red' : '1px solid #CFD2DC'
                    }}
                >
                    <div className='img'>
                        <div className='imga'>{email.from.name[0].toUpperCase()}</div>
                    </div>
                    <div className='content'>
                        <div className='content1'>
                            <span>From :</span>
                            <span>{email.from.name.toUpperCase()}</span>
                            <span>&lt; {email.from.email} &gt;</span>
                            
                            
                            
                        </div>
                        <div className='content2'>
                            <span>Subject :</span>
                            <span style={{overflow:'hidden'}}>{email.subject}</span>
                        </div>
                        <div className='content3'> {email.short_description}</div>
                        <div className='content4'>
                            <time >{dateTime(email.date).replace(/,/g, '').replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')}</time>
                            <span style={{marginLeft:'20px',color:'#e54065'}}>{favorites.filter(fav => fav.id === email.id).length > 0 ? "Favorite" : ""}</span>
                        </div>
                    </div>
                    
                        

                </div>
            ))
            ) : (
              currentEmails.map(email => (
                <div 
                    className="single_mail" key={email.id} 
                    onClick={()=>selectedEmail(email)}
                    style={{
                      backgroundColor: read.some(r => r.id === email.id) ? 'lightgray' : '#F2F2F2',
                      border : selected_mail_color.some(r => r.id === email.id) ? '1px solid red' : '1px solid #CFD2DC'
                    }}
                >
                    <div className='img'>
                        <div className='imga'>{email.from.name[0].toUpperCase()}</div>
                    </div>
                    <div className='content'>
                        <div className='content1'>
                            <span>From :</span>
                            <span>{email.from.name.toUpperCase()}</span>
                            <span>&lt; {email.from.email} &gt;</span>
                            
                            
                            
                        </div>
                        <div className='content2'>
                            <span>Subject :</span>
                            <span style={{overflow:'hidden'}}>{email.subject}</span>
                        </div>
                        <div className='content3'> {email.short_description}</div>
                        <div className='content4'>
                            <time >{dateTime(email.date).replace(/,/g, '').replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')}</time>
                            <span style={{marginLeft:'20px',color:'#e54065'}}>{favorites.filter(fav => fav.id === email.id).length > 0 ? "Favorite" : ""}</span>
                        </div>
                    </div>
                    
                </div>
            ))
            )
            }
            </div>
            {selectedmail !== null && selectedmail.map(mail=>
              (<div className={classMail} key={mail.id}>
                  <div className='imgb'>
                      <div className='imga'>{mail.from.name[0].toUpperCase()}</div>
                  </div>
                  <div className='smail_right' style={{margin:'0 0 50px 0'}}>
                      <p style={{color:'#636363',margin:'0 0 30px 0',fontWeight:'bold',fontSize:'30px '}}>{mail.subject}</p>
                      <p style={{color:'#636363',margin:'0 0 30px 0',fontWeight:'bold',fontSize:'18px '}}>{dateTime(mail.date).replace(/,/g, '').replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')}</p>
                      <button onClick={()=>selctFav(mail)} className='btn' style={{background:'#e54065',color:'white',border:'none',borderRadius:'25px'}}>Mark as favorite</button>
                      <article style={{lineHeight:'1.5'}} dangerouslySetInnerHTML={{__html:Ebody.body}}></article>
                      {/* dangerouslySetInnerHTML={{__html:Ebody.body} -> used to get HTML elemnts inside string when we fetch data from API
                          // need to be careful. there can be vulnerabilities
                      */}
                  </div>

                </div>
            ))}
        </div>       
        <Pages
          emailsPerPage={emailsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          emails={emails}
          read={read}
          unRead={unRead}
          favorites={favorites}
          isReadbtn={isReadbtn}
          isUnReadbtn={isUnReadbtn}
          isfavbtn={isfavbtn}

        />
    </React.Fragment>
  );
};

export default Email;