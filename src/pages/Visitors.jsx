import React, {useState} from 'react'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import {Chart as ChartJS,CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement,
        Tooltip, Filler, Legend} from 'chart.js'
import {Line,Bar} from 'react-chartjs-2'

import styles from './Visitors.module.scss'

ChartJS.register(
    CategoryScale, //x축 데이터
    LinearScale, // y축 숫자데이터
    PointElement, // 선위의 점 :: 데이터
    LineElement, // 데이터를 연결하는 선
    ArcElement, // 데이터를 연결하는 원
    BarElement, // 막대그래프
    Tooltip, // 마우스를 올렸을때 정보 표시
    Filler, // 선 아래 영역을 채우기
    Legend, // 범례
)//사용허가를받아야하는import자리에서해야함

const Visitors = () => {
    const [trafficData, setTrafficData] = useState([
        {name : '검색', value : 42,},
        {name : '직접방문', value : 12,},
        {name : 'SNS', value : 79,},
        {name : '외부링크', value : 50,},

    ])

    const rankingData = [
    {
      rank: 1,
      id: 'book_user01',
      name: '김민준',
      nickname: '책벌레민준',
      email: 'minjun@example.com',
      joinDate: '2026.02.12',
      lastVisit: '2026.08.20',
      visits: 38,
    },

    {
      rank: 2,
      id: 'reader_072',
      name: '이서윤',
      nickname: '서윤책방',
      email: 'seoyun@example.com',
      joinDate: '2026.03.05',
      lastVisit: '2026.08.20',
      visits: 34,
    },

    {
      rank: 3,
      id: 'jh_book',
      name: '박지훈',
      nickname: '오늘도독서',
      email: 'jihoon@example.com',
      joinDate: '2026.01.24',
      lastVisit: '2026.08.19',
      visits: 31,
    },

    {
      rank: 4,
      id: 'yujin88',
      name: '최유진',
      nickname: '유진리더',
      email: 'yujin@example.com',
      joinDate: '2026.04.02',
      lastVisit: '2026.08.19',
      visits: 28,
    },

    {
      rank: 5,
      id: 'hw_book23',
      name: '정현우',
      nickname: '현우의서재',
      email: 'hyunwoo@example.com',
      joinDate: '2026.05.18',
      lastVisit: '2026.08.18',
      visits: 24,
    },

    {
      rank: 6,
      id: 'jimin_reader',
      name: '한지민',
      nickname: '책읽는지민',
      email: 'jimin@example.com',
      joinDate: '2026.02.26',
      lastVisit: '2026.08.18',
      visits: 21,
    },

    {
      rank: 7,
      id: 'dohyun77',
      name: '윤도현',
      nickname: '도현북스',
      email: 'dohyun@example.com',
      joinDate: '2026.06.01',
      lastVisit: '2026.08.17',
      visits: 19,
    },
  ]

    const refreshFun = () => {
        setTrafficData(
            (preData) => {
              return preData.map((item)=>{
                const changeNum = Math.floor(Math.random()*11)-5
                let newValue =item.value + changeNum
                if(newValue < 5){
                    newValue = 5
                }
                 if(newValue > 80){
                    newValue = 80
                }
                return{
                    ...item,
                    value : newValue
                }
              })
            }
        )
    }

    const lineData = {
        labels : ['월','화','수','목','금','토','일'],
        datasets : [
            //왼쪽 y축
            {
                label : '전체방문자', //y축 데이터 라벨
                data : [420,610,310,550,710,770,600],
                borderColor : '#E20942',
                backgroundColor : 'rgba(226,9,66,0.08)',
                borderWidth : 3,
                tension : 0.3,
                fill : true,
                pointRadius : 5,
                pointHoverRadius : 7,
                pointBorderColor : '#E20942',
                pointBackgroundColor : 'white',
                pointBorderWidth : 1,

                yAxisID : 'y',
            },
            //오른쪽 y축
            {
                label : '평균 체류 시간', //y축 데이터 라벨
                data : [1.5,4.5,5.9,7.7,8.5,6.5,3.3],
                borderColor : '#7B5A99',
                backgroundColor : 'rgba(123,90,153,0.08)',
                borderWidth : 3,
                tension : 0.3,
                fill : true,
                pointRadius : 5,
                pointHoverRadius : 7,
                pointBorderColor : '#7B5A99',
                pointBackgroundColor : 'white',
                pointBorderWidth : 1,

                yAxisID : 'y1',
            }
        ]
    }

    const lineOption = {
      responsive : true,
      maintainAspectRatio : false,
      plugins : {
         legend : {
           display : true,
           position : 'top',
           align : 'end',
           labels : {
              usePointStyle : true,
              pointStyle : 'circle',
              padding : 16,
           }
         },
         tooltip : {
            padding : 12,
         }
      },
      scales : {
        // x축
        x : {
          grid : {
            display : false,
          },
          border : {
            display : false,
          }
        },

        //왼y축
         y : {
            type : 'linear',
            position : 'left',
            beginAtZero : true,

            title : {
                display : true,
                text : '방문자 수'
            }
         },
         //오y축
         y1 : {
            type : 'linear',
            position : 'right',
            beginAtZero : true,

            grid : {
               drawOnChartArea : false,
            },

            title : {
                display : true,
                text : '체류시간(분)'
            }
         },
      }
    }

    const bardata = {
        labels : ['월','화','수','목','금','토','일'],
        datasets : [
            {
               label : 'PC',
               data : [210,350,420,550,380,110,290],
               backgroundColor : '#3d054e',
               borderRadius : 6,
            },
            {
               label : '모바일',
               data : [210,350,420,550,380,110,190],
               backgroundColor : '#E20942',
               borderRadius : 6,
            }
        ]//y축
    }

    const barOptions = {
      responsive : true,
      maintainAspectRatio : false,
      animation : {
        duration : 800,
      },
      plugins : {
         legend : {
           display : true,
           position : 'right',
           align : 'end',
           labels : {
              usePointStyle : true,
              pointStyle : 'circle',
              padding : 20,
           }
         },
         tooltip : {
            padding : 12,
         },
      },
      scales : {
        x : {
           grid : {
              display : false,
           },
           border : {
            display : false,
           }
        },
        y:{
           beginAtZero : true,
           grid : {
            color : '#ccc',            
           }
        }
      }
    }

    const userClickfnc = (e) => {
        const detail = e.currentTarget.nextElementSibling
        
        const isOpen = detail.dataset.open === 'true'

        //모두 닫기
        document.querySelectorAll('[data-accordion-detail]').forEach((item)=>{
            item.dataset.open = 'false'
            gsap.to(item,{
                 height : 0,
                 opacity : 0,
                 padding : 0,
                 paddingTop : 0,
                 paddingBottom : 0,
                 marginTop : 0,
                 marginBottom : 0,
                 duration : 0.5,
                 ease : 'power2.inOut',
            })
        })

        if(isOpen) {return}

        detail.dataset.open = 'true'
        gsap.to(detail,{
            height : 'auto',
            opacity : 1,
            padding : 15,
            paddingTop : 15,
            paddingBottom : 15,
            marginBottom : 15,
            duration : 0.5,
            ease : 'power2.inOut',
        })
    }

  return (
    <div className={styles.visitors}>

        <Helmet>
            <title>방문 분석 | 관리자</title>
        </Helmet>

        <div className={styles.pageTitle}>
           <h2>방문분석</h2>
           <p>사이트 방문 현황과 사용자 활동을 확인합니다</p>
        </div>

         {/* 첫번째 줄 */}
        <div className={styles.topLine}>

           <section className={styles.trafficSection}>
               <div className={styles.secTitle}>
                  <div>
                     <h3>방문유입경로</h3>
                     <p>전체 방문중 유입 경로 비율</p>
                  </div>
                   <button className={styles.refreshBtn} onClick={refreshFun}>새로고침</button>
               </div>

               {/* 포그레스 그래프 */}
               <div className={styles.progresList}>
                  {
                    trafficData.map((item)=>(
                        <div key={item.name} className={styles.progresItem}>
                           <div>
                              <strong>{item.name}</strong>
                              <span>{item.value}%</span>
                           </div>
                           <progress value={item.value} max='100'/>
                        </div>
                    ))
                  }
               </div>
           </section>

           <section className={styles.trendSection}>
              <div className={styles.secTitle}>
                  <div>
                     <h3>방문자 추이</h3>
                     <p>요일별 방문자수와 평균 체류 시간</p>
                  </div>
               </div>
               <div className={styles.chartWrap}>
                  <Line data={lineData} options={lineOption} />
               </div>
           </section>

        </div>

        {/* 두번째 줄 */}
        <div className={styles.bottomLine}>

           <section className={styles.deviceSection}>
               <div className={styles.secTitle}>

                  <div>
                     <h3>디바이스 별 방문자</h3>
                     <p>요일별 PC/모바일 방문자 비교</p>
                  </div>

               </div>

               <div className={styles.barWrap}>
                  <Bar data={bardata} options={barOptions} />
               </div>

               <div className={styles.secTitle}>

                  <div>
                     <h3>방문 TOP 5</h3>
                     <p>방문 횟수가 많은 사용자</p>
                  </div>

               </div>

               <div className={styles.rankingList}>
                  {
                    rankingData.slice(0, 5).map((item) => {
                        return (
                        <div className={styles.rankingltem} key={item.id}>
                            <button onClick={userClickfnc}>
                               <span>{item.rank}</span>
                               <span>{item.id}</span>
                               <span>{item.visits}회</span>
                               <span>▼</span>
                            </button>
                            <div className={styles.userDetail} data-accordion-detail data-open='false'>
                               <dl>

                                 <div>
                                    <dt>이름</dt>
                                    <dd>{item.name}</dd>
                                 </div>

                                 <div>
                                    <dt>닉네임</dt>
                                    <dd>{item.nickname}</dd>
                                 </div>

                                 <div>
                                    <dt>이메일</dt>
                                    <dd>{item.email}</dd>
                                 </div>

                                 <div>
                                    <dt>가입일</dt>
                                    <dd>{item.joinDate}</dd>
                                 </div>

                                  <div>
                                    <dt>최근방문</dt>
                                    <dd>{item.lastVisit}</dd>
                                 </div>

                                 <div>
                                    <dt>총 방문</dt>
                                    <dd>{item.visits}</dd>
                                 </div>

                               </dl>
                            </div> {/* styles.userDetail end */}
                        </div>// styles.rankingltem end
                        ) // return end
                    })// map end
                   }
               </div>

           </section>

        </div>

    </div>
  )
}

export default Visitors