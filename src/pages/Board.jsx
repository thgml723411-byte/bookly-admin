import React,{useState} from 'react'
import { Helmet } from 'react-helmet-async'
import boardData from '../data/boardData.json'

import styles from './Board.module.scss'

const reviewData = boardData.reviewData
const feedData = boardData.feedData

/*
useEffect (() => {
   fetch('/data/board.json')
   .then((res) => res.json())
   .then((data) => setBoards(data))    
},[])
*/ 

const Board = () => {
  //리뷰 게시판
 const [reviewKeyword,SetReviewKeyword] = useState('')
 const [selectReview,SetSelectReview] = useState('전체')
 const [selectDatas,SetSelectDatas] = useState(null)

 //이벤트 피드
 const [feeds,setFeeds] = useState(feedData)
 const [feedKeyword,setFeedKeyword] = useState('')
 const [feedStatus,setFeedStatus] = useState('전체')
 const [feedSelect,setFeedSelect] = useState(null)

 //리뷰 검색
 const filterReviews = reviewData.filter((item)=>{
   const word = reviewKeyword.trim().toLocaleLowerCase()
   const searchWord = item.book.toLocaleLowerCase().includes(word)
   const ratingMatch = selectReview === '전체' || item.rating === Number(selectReview)

   return searchWord && ratingMatch 
 })

 //이벤트 피드 검색
 const filterFeed = feeds.filter((item)=>{
   const word = feedKeyword.trim().toLocaleLowerCase()

   const searchWord = item.title.toLocaleLowerCase().includes(word) ||
   item.content.toLocaleLowerCase().includes(word)

   const searchSelect = feedStatus === '전체' || item.status === feedStatus

   return searchWord && searchSelect
 })

  //이벤트 피드 공개 / 비공개 상태 바꾸기
 const feedStatusChange = (id) => {
    setFeeds(feeds.map((item)=>item.id === id ? {...item, status : item.status === '공개' ? '비공개' : '공개'}: item))
 }

 //이벤트 수정 모달 열기
 const openFeedEdit = (feed)=>{
    setFeedSelect(feed)
 }

 //이벤트 수정 저장
 const saveFeed = () =>{
    setFeeds(feeds.map((item)=>item.id === feedSelect.id ? feedSelect : item))

    setFeedSelect(null)
  }

  //이벤트 피드 삭제
const delfeed = (id) => {
   setFeeds(feeds.filter((item) => item.id !== id))
}

  return (
    <>

    <Helmet>
       <title>게시판 관리 | 관리자 대시 보드</title>
    </Helmet>

    <main className={styles.board}>
      <div className={styles.heading}>
        <h2>게시판 관리</h2>
        <p>회원 리뷰와 공지 게시판을 확인합니다</p>
      </div>

      <div className={styles.gridBoard}>

        {/* 리뷰관리게시판 */}
        <section className={styles.card}>

          <div className={styles.cardTitle}>

              <div>
                  <h3>리뷰 관리 게시판</h3>
                  <p>회원이 작성한 도서 리뷰를 확인합니다</p>
              </div>

              <span className={styles.countBadge}>
                {filterReviews.length}건
              </span>

           </div>

           <div className={styles.searchBar}>
             <input type='text' placeholder='도서명 검색' value={reviewKeyword} onChange={(e)=>SetReviewKeyword(e.target.value)}/>
             <select value={selectReview} onChange={(e)=> SetSelectReview(e.target.value)}>
                <option value='전체'>전체평점</option>
                <option value='5'>5점</option>
                <option value='4'>4점</option>
                <option value='3'>3점</option>
                <option value='2'>2점</option>
                <option value='1'>1점</option>
             </select>
           </div>

           <div className={styles.tableWrap}>
             <table>
                <thead>
                   <tr>
                     <th>도서명</th>
                     <th>회원</th>
                     <th>평점</th>
                     <th>작성일</th>
                   </tr>
                </thead>
                <tbody>
                   {
                     filterReviews.map((item)=>(
                       <tr key={item.id} onClick={(e)=> SetSelectDatas(item)}>
                          <td>{item.book}</td>
                          <td>{item.user}</td>
                          <td className={styles.rating}>{'★'.repeat(item.rating)}</td>
                          <td>{item.date}</td>
                       </tr>
                     ))
                   }
                </tbody>
             </table>
           </div>

        </section>

         {/* 이벤트 피드 게시판 */}
        <section className={styles.card}>

          <div className={styles.cardTitle}>
              <div>
                  <h3>이벤트 피드 게시판</h3>
                  <p>서비스 이벤트 게시판을 관리합니다</p>
              </div>
              <span className={styles.countBadge}>
                {filterFeed.length}건
              </span>
          </div>

          <div className={styles.searchBar}>
             <input type='text' placeholder='이벤트 검색' value={feedKeyword}
               onChange={(e) => setFeedKeyword(e.target.value)}/>
             <select value={feedStatus} onChange={(e)=>setFeedStatus(e.target.value)}>
                <option value='전체'>전체 상태</option>
                <option value='공개'>공개</option>
                <option value='비공개'>비공개</option>
             </select>
          </div>

          <div className={styles.feedList}>
             {
               filterFeed.map((item)=>(
                    <div key={item.id} className={styles.feedItem}>
                       <div className={styles.feedInfo}>
                           <div className={styles.feedTitle}>
                                 <strong>{item.title}</strong>
                                 <span className={item.status === '공개' ? styles.badgeOpen : styles.badgeClose}>{item.status}</span>
                                 <div className={styles.feedContent}>{item.content}</div>
                                 <div className={styles.feedDate}>{item.startDate} ~ {item.endDate}</div>
                           </div>
                            <div className={styles.feedBtns}>
                               <button onClick={()=>feedStatusChange(item.id)}>{item.status === '공개'?'비공개' : '공개'}</button>
                               <button onClick={()=>openFeedEdit(item)}>수정</button>
                               <button onClick={()=>delfeed(item.id)}>삭제</button>
                            </div>
                       </div>
                    </div>
               ))
             }
          </div>

        </section>

      </div>

      {/* 리뷰 게시판 상세 모달창 */}
          {
            selectDatas && (
              <div className={styles.modalDim}>
                  <div className={styles.modal}>
                     <div className={styles.modalHead}>
                       <div>
                         <p>REVIEW</p>
                         <h3>리뷰 상세</h3>
                       </div>
                       <button onClick={()=>SetSelectDatas(null)}>
                          X
                       </button>
                     </div>
                     <dl className={styles.modalList}>
                        <div>
                           <dt>도서명</dt>
                           <dd>{selectDatas.book}</dd>
                        </div>
                        <div>
                           <dt>회원</dt>
                           <dd>{selectDatas.user}</dd>
                        </div>
                     </dl>
                  </div>
              </div>
            )
          }

      {/* 이벤트 피드 수정 모달창 */}
          {
            feedSelect && (
              <div>

              </div>
            )
          }

    </main>

    </>
  )
}

export default Board

//map으로뺑뺑이로돌리거면key가있어야함
//map에서괄호중괄호쓰는이유는
