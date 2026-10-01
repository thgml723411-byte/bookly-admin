import React,{useState} from 'react'
import { Helmet } from 'react-helmet-async'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale,
    Tooltip, Legend, Filler,} from 'chart.js' //사용허가를받아야함
import {Line,Scatter,Radar} from 'react-chartjs-2' //사용허가를받아야함

import styles from './User.module.scss'
import { palette, chartColors } from '../styles/chartTheme'

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale,
    Tooltip, Legend, Filler,
)

//picsum.photos 같은 외부 이미지 서비스에 의존하지 않도록 표지 이미지를 직접 생성
const coverPalette = chartColors

const makeCover = (title) => {
    const color = coverPalette[title.length % coverPalette.length]
    const initial = title.trim().charAt(0)
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='300'>`
        + `<rect width='220' height='300' rx='18' fill='${color}'/>`
        + `<text x='50%' y='50%' font-family='sans-serif' font-size='104' font-weight='700' fill='${color === palette.gold || color === palette.citron || color === palette.mauve ? palette.ink : palette.cream}' text-anchor='middle' dominant-baseline='central'>${initial}</text>`
        + `</svg>`
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const User = () => {
    const monthlyBook = {
        title: '매 순간 선택이 삶을 바꾼다',
        author: '김태훈',
        publisher: '마인드북',
        point: '이달의 추천 도서',
        monthly: 96,
        sales: 1180,
    }
    monthlyBook.cover = makeCover(monthlyBook.title)

    const poData = [
        {title : '전체회원', value : '12,450명', percent : 82},
        {title : '신규회원', value : '310명', percent : 64},
        {title : '활성회원', value : '9,500명', percent : 78},
        {title : '휴면회원', value : '1,150명', percent : 24},
    ]

    const userData = [
        {
            id: 'book001',
            name: '홍길동',
            nickname: '책벌레',
            email: 'book001@test.com',
            joinDate: '2026-02-14',
            lastVisit: '2026-08-24',
            status: '활성',
            favorite: 38,//찜한 도서
            read: 30,//읽은 도서
            readingTime: 52,
        },

        {
            id: 'reader02',
            name: '김민지',
            nickname: '민지북',
            email: 'reader02@test.com',
            joinDate: '2026-03-22',
            lastVisit: '2026-08-23',
            status: '활성',
            favorite: 25,
            read: 21,
            readingTime: 43,
        },

        {
            id: 'novel07',
            name: '이서준',
            nickname: '소설왕',
            email: 'novel07@test.com',
            joinDate: '2026-01-03',
            lastVisit: '2026-08-20',
            status: '활성',
            favorite: 54,
            read: 42,
            readingTime: 68,
        },

        {
            id: 'green11',
            name: '박지현',
            nickname: '그린북',
            email: 'green11@test.com',
            joinDate: '2025-12-17',
            lastVisit: '2026-07-02',
            status: '휴면',
            favorite: 34,
            read: 15,
            readingTime: 20,
        },

        {
            id: 'hello22',
            name: '최유진',
            nickname: '페이지22',
            email: 'hello22@test.com',
            joinDate: '2026-04-11',
            lastVisit: '2026-08-24',
            status: '활성',
            favorite: 42,
            read: 36,
            readingTime: 61,
        },

        {
            id: 'story33',
            name: '정하늘',
            nickname: '하늘책',
            email: 'story33@test.com',
            joinDate: '2026-05-05',
            lastVisit: '2026-08-21',
            status: '활성',
            favorite: 18,
            read: 12,
            readingTime: 35,
        },

        {
            id: 'page100',
            name: '한지우',
            nickname: '백페이지',
            email: 'page100@test.com',
            joinDate: '2026-05-19',
            lastVisit: '2026-07-01',
            status: '휴면',
            favorite: 47,
            read: 19,
            readingTime: 27,
        },

        {
            id: 'booktree',
            name: '오민수',
            nickname: '북트리',
            email: 'booktree@test.com',
            joinDate: '2026-06-08',
            lastVisit: '2026-08-23',
            status: '활성',
            favorite: 61,
            read: 48,
            readingTime: 72,
        },
    ]

    
    const [keyword,setKeyword] = useState('')//검색어
    const [status,setstatus] = useState('전체')//회원상태전체,휴면,활성
    const [selectUser,setSelectUser] = useState(null)//모달창회원

    const filterUser = userData.filter((item)=>{
        const word = keyword.toLocaleLowerCase()
        const searchMatch = item.id.toLocaleLowerCase().includes(word) ||
                            item.name.includes(keyword) ||
                            item.nickname.toLocaleLowerCase().includes(word)

        const statusMatch = status === '전체' || item.status === status

        return searchMatch && statusMatch
    })

    const lineData = {
        labels : ['3월','4월','5월','6월','7월','8월',],
        datasets : [
            {
                label : '신규회원',
                data : [180,224,256,292,340,288],
                borderColor : palette.gold,
                backgroundColor :palette.goldSoft,
                borderWidth : 3,
                tension : 0.4,
                fill : true,
                pointRadius : 5,
                pointHoverRadius : 8,
                pointBackgroundColor : palette.cream,
                pointBorderColor : palette.gold,
                pointBorderWidth : 3,
            }
        ]
    }

    const lineOptions = {
        responsive : true,
        maintainAspectRatio : false,
        plugins : {
            legend : {
                display : false,
            },
            tooltip : {
                backgroundColor : palette.cream,
                titleColor : palette.navy,
                bodyColor : palette.navy,
                padding : 12,
            }
        },
        scales : {
            x : {
                grid : {
                    display : false,
                },
                border : {
                    display : false,
                },
                ticks : {
                    color : palette.navy,
                    font : {
                        size : 12,
                        weight : 500,
                    }
                }
            },
            y : {
                beginAtZero : true,
                grid : {
                    color : palette.line,
                },
                border : {
                    display : false,
                },
                ticks : {
                    color : palette.navy,
                    font : {
                        size : 12,
                        weight : 500,
                    }
                }
            }
        }
    }

    //분산그래프 :: 2개의 데이터 사이에 어떤 관계가 있는지 확인 예를 들어 광고비와 매출 사이의 관계등
    //찜한 도서 수,실제 읽은 도서 수
    const scatterData = {
        datasets : [
            {
               label : '회원',
               data : userData.map((item)=> ({
                 x : item.favorite,
                 y : item.read,
               })),
               backgroundColor : palette.mauve,
               borderColor : palette.navy,
               pointStyle : 'rectRot', //circle : 원모양, rect : 사각형, star : 별모양, triangle : 삼각형
               pointRadius : 3,
               pointHoverRadius : 5,

            }
           
        ]
    }
    const scatterOptions = {
       responsive : true,
       maintainAspectRatio : false,
       plugins : {
          legend : {
            display : false,
          },
          tooltip : {
             padding : 12,
          }
       },
       scales : {
          x : {
             beginAtZero : true,
             title : {
                display : true,
                text : '찜한 도서수',
                color : palette.navy,
             },
             grid : {
                color : palette.line,
             },
             border : {
                display : false,
             }
          },
          y : {
             beginAtZero : true,
             title : {
                display : true,
                text : '읽은 도서수',
                color : palette.navy,
             },
             grid : {
                color : palette.line,
             },
             border : {
                display : false,
             }
          },

       }
    }

    const raderData = {
        labels : ['소설','시/에세이','인문','경제','자기개발'],
        datasets : [
            {
                label : '회원 독서 성향',
                data : [85,75,63,45,55],
                backgroundColor : palette.line,
                pointRadius : 3,
                pointHoverRadius : 5,
                pointBackgroundColor : palette.rust,
            },
        ],
    }

    const radarOptions = {
        responsive : true,
        maintainAspectRatio : false,
        animation : {
            duration : 800,
        },
        plugins : {
            legend : {
                display : false,
            },
            tooltip : {
                padding : 12,
            },
        },
        scales : {
            r : {
                beginAtZero : true,
                min : 0,
                max : 100,
                ticks : {
                    display : false,
                },
                grid : {
                    color : palette.line,
                },
                pointLabels : {
                    color : palette.navy,
                    font : {
                        size : 12,
                        weight : 600,
                    }
                },  
            }
        }
    }


  return (
    <>
        <Helmet>
            <title>사용자관리 관리자 대시보드</title>
        </Helmet>

        <div className={styles.user}>

           <div className={styles.pageTitle}>
              <h2>사용자 관리</h2>
              <p>회원현황과 독서 활동을 확인합니다</p>
           </div>

           {/* 포그레스 리스트 */}
           <section className={styles.summarySection}>
              <div className={styles.secTitle}>
                 <div>
                    <h3>회원요약</h3>
                    <p>현재 회원 이용 현황입니다</p>
                 </div>
              </div>

              <div className={styles.poList}>
                 {
                   poData.map((item) =>(
                       <div key={item.title} className={styles.poItem}>
                          <div>
                             <span>{item.title}</span>
                             <strong>{item.value}</strong>
                          </div>
                          <progress value={item.percent} max='100'/>
                       </div>
                   ))
                 }
              </div>
           </section>{/* 포그레스 end */}

           {/* 첫번째 줄 */}
           <div className={styles.topLine}>

           {/* 라인그래프 */}
            <section className={styles.trendSection}>

               <div className={styles.secTitle}>
                  <div>
                      <h3>회원 증가 추이</h3>
                      <p>최근 6개월 신규 가입 회원</p>
                  </div>
               </div>

               <div className={styles.chartWrap}>
                  <Line data={lineData} options={lineOptions}/>
               </div>

            </section>

            {/* 분산그래프 */}
            <section className={styles.scatterSection}>

                <div className={styles.secTitle}>
                  <div>
                      <h3>찜한도서와 실제도서</h3>
                      <p>찜한 도서와 실제 읽은 도서와의 관계</p>
                  </div>
               </div>

               <div className={styles.chartWrap}>
                  <Scatter data={scatterData} options={scatterOptions}/>
               </div>

            </section>

           </div>{/* 첫번째 줄 박스 */}


           <div className={styles.bottomLine}>

            {/* 회원목록 */}
            <section className={styles.listSection}>

               <div className={styles.secTitle}>
                  <div>
                      <h3>회원목록</h3>
                      <p>전체 회원 목록을 확인합니다</p>
                  </div>
               </div>

               <div className={styles.searchArea}>
                  <input type='text' placeholder = '아이디,닉네임,이름검색' value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
                  <select value={status} onChange={(e)=>setstatus(e.target.value)}>
                    <option value='전체'>전체</option>
                    <option value='활성'>활성</option>
                    <option value='휴면'>휴면</option>
                  </select>
               </div>

               <div className={styles.tableWrap}>
                  <table>
                      <thead>
                          <tr>
                             <th>아이디</th>
                             <th>이름</th>
                             <th>가입일</th>
                             <th>상태</th>
                          </tr>
                      </thead>

                      <tbody>
                          {
                            filterUser.map((item)=>(
                                <tr key={item.id} onClick={()=>setSelectUser(item)} >
                                   <td>{item.id}</td>
                                   <td>{item.name}</td>
                                   <td>{item.joinDate}</td>
                                   <td>{item.status}</td>
                                </tr>
                            ))
                          }
                      </tbody>
                  </table>                  
               </div>

            </section>

            {/* 이달의 도서 이미지 */}
            <section className={styles.bookSection}>

               <div className={styles.secTitle}>
                  <div>
                      <h3>이달의 도서</h3>
                      <p>관리자가 선정한 이달의 추천 도서</p>
                  </div>
               </div>

               <div className={styles.bookFeature}>
                  <img src={monthlyBook.cover} alt={monthlyBook.title} className={styles.bookCover}/>

                  <div className={styles.bookInfo}>
                     <span className={styles.bookBadge}>{monthlyBook.point}</span>
                     <h4>{monthlyBook.title}</h4>
                     <p className={styles.bookAuthor}>{monthlyBook.author} · {monthlyBook.publisher}</p>
                  </div>

                  <div className={styles.bookStats}>
                     <div>
                        <span>이달 점수</span>
                        <strong>{monthlyBook.monthly}점</strong>
                     </div>
                     <div>
                        <span>판매부수</span>
                        <strong>{monthlyBook.sales.toLocaleString()}권</strong>
                     </div>
                  </div>
               </div>

            </section>

             {/* 레더차트 */}
            <section className={styles.raderSection}>
                <div className={styles.secTitle}>
                  <div>
                      <h3>회원 독서 성향</h3>
                      <p>카테고리별 평균 선호도</p>
                  </div>
               </div>

               <div className={styles.chartWrap}>
                  <Radar data={raderData} options={radarOptions} />
               </div>
            </section>

           </div>{/* 두번째 줄 박스 */}
        {
            selectUser && (
                <div className={styles.madalbig}>
                    <div className={styles.modal}>
                         <div>
                            <div>
                                <h3>회원상세정보</h3>
                                <p>{selectUser.id}</p>
                            </div> 
                            <button onClick={()=>{setSelectUser(null)}}>X</button>   
                         </div>

                         <dl className={styles.modalList}>
                            <div>
                                <dt>이름</dt>
                                <dd>{selectUser.name}</dd>
                            </div>
                            <div>
                                <dt>닉네임</dt>
                                <dd>{selectUser.nickname}</dd>
                            </div>
                            <div>
                                <dt>이메일</dt>
                                <dd>{selectUser.email}</dd>
                            </div>
                            <div>
                                <dt>가입일</dt>
                                <dd>{selectUser.joinDate}</dd>
                            </div>
                            <div>
                                <dt>최근 방문</dt>
                                <dd>{selectUser.lastVisit}</dd>
                            </div>
                            <div>
                                <dt>회원 상태</dt>
                                <dd>{selectUser.status}</dd>
                            </div>
                            <div>
                                <dt>찜한 도서</dt>
                                <dd>{selectUser.favorite}권</dd>
                            </div>
                            <div>
                                <dt>읽은 도서</dt>
                                <dd>{selectUser.read}권</dd>
                            </div>
                            <div>
                                <dt>평균 독서 시간</dt>
                                <dd>{selectUser.readingTime}</dd>
                            </div>
                         </dl>
                    </div>{/* 모달end */}
                </div>//빅모달창end
                
            )
        }

        </div>{/* 최종 */}
    </>
  )
}

export default User

//<div className={styles.poList}>
//                 {
//                 poData.map((item) =>(
//                    
//                   ))
//                 }
//              </div>
// (){}둘중
// idx 보통때는 상관이없지만 어떨때 충돌이냐냐면 추가,삭제할때
// Scatter 분산

//<div className={styles.madalbig} onClick={()=>{setSelectUser(null)}}>/닫기버튼안하고아무곳이나누르면닫히는
