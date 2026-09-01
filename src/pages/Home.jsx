import React,{useState} from 'react'
import { Helmet } from 'react-helmet-async'
import {Chart as ChartJS,CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement,
        Tooltip, Filler, Legend} from 'chart.js' //
import {Line,Doughnut,Pie,Bar} from 'react-chartjs-2' //
import styles from './Home.module.scss'

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

ChartJS.defaults.animation.duration = 3000
ChartJS.defaults.animation.easing = 'easeOutQuart'

const Home = () => {
  const [selectWeek,setSelectWeek] = useState('week3')
  
  //x축
  const getDates = (week) => {
     const dates = []
     const today = new Date()
     
     let weekGap = 0
     //week3::이번주 0일
     //week2::2주전 7일전
     //week1::3주전 14일전

     if(week === 'week1' ){ //week1::3주전 weekGap14일전
         weekGap = 14
     }

      if(week === 'week2' ){ //week2::2주전 weekGap7일전
         weekGap = 7
     }

      if(week === 'week3' ){ //week3::이번주 weekGap0일
         weekGap = 0
     }

     for(let i = 6; i >= 0; i--){ // 7번 반복, 오늘까지 최근 7일 만듬
         const data = new Date(today) //new Date()/똑같은데왜반복하냐/투데이가오늘날짜가아니라일주일날짜로값이변화될수있기때문에한번더튕겨주는역활을함
         data.setDate(// 일은 지정
            today.getDate()-i-weekGap
         )

         const moonth = data.getMonth() +1
         const day = data.getDate()
         dates.push(`${moonth}/${day}`)
     }

     return dates
  }

  // y축 값
  const visitorData = {
     week1 : {
        title : '3주전',
        visitors : [120, 160, 220, 320, 200, 320, 250],
     },

      week2 : {
        title : '2주전',
        visitors : [120, 160, 100, 320, 200, 420, 250],
     },

      week3 : {
        title : '이번주',
        visitors : [120, 160, 300, 420, 310, 420, 450],
     },
  }

  const currentData = visitorData[selectWeek]

  // 실제차트데이터에들어가는
  const chartData = {
     labels : getDates(selectWeek), //x 축 데이터 라벨
     datasets : [
      {
        label : '방문자수', //y축 데이터 라벨
        data : currentData.visitors,
        borderColor : '#E20942',
        backgroundColor : 'rgba(226,9,66,0.08)',
        borderWidth : 2,
        fill : true,
        pointRadius : 8,
        pointHoverRadius : 12,
        pointBorderColor : '#E20942',
        pointBackgroundColor : 'white',
        pointBorderWidth : 2,
      }
     ]
  }

  const chartOptions = {
      responsive : true,
      maintainAspectRatio : false,
      plugins : {
        legend : {
          display : false,
        },
        tooltip : {
           displayColors : false,
           titleColor : '#333',
           backgroundColor : '#fff',
           bodyColor : '#333',
           borderWidth : 1,
           borderColor : '#eee',
           padding : 12,
        }
      },
      scales : {
        x : {
           grid : {
             display : false,
           },
           ticks : {
              color : '#333',
              font : {
                size : 13,
                weight : '500',
              },
              border : {
                display : false,
              }
           }
        },
        y: {
           beginAtZero : true,
           border : {
             display : false,
           },
           grid : {
              color : '#ece6ea',
           },
           ticks : {
              color : '#333',
              font : {
                size : 13,
              },
              padding : 10,
           }
        }
      }
  }

  const categoryData = {
    labels : ['소설','에세이','자기개발','경제','인문'],
    datasets : [
      {
         data : [32,21,18,17,12],
         backgroundColor : [
            '#E20942', //소설
            '#7B5A99', //에세이
            '#3D8A4A', //자기개발
            '#C69A3B', //경제
            '#0A87A0', //인문
         ],
         borderColor : 'white',
         borderWidth : 4,
         hoverOffset : 8,
      }
    ]
  }

  const categoryOptions = {
   responsive : true,
   maintainAspectRatio : false,
   animation : {
      duration : 1400,
      // animateRotate : true,
      // animateScale : true,
   },

   //가운데 구멍 크기
   cutout : '70%',

   plugins : {
      legend : {
         display : true,
         position : 'bottom',
         labels : {
            padding : 15,
            usePointStyle : true,
            pointStyle : 'circle',
            color : '#333',
            font : {
               size : 12,
            }
         }
       },
       tooltip : {
           displayColors : false,
           titleColor : '#333',
           backgroundColor : '#fff',
           bodyColor : '#333',
           borderWidth : 1,
           borderColor : '#eee',
           padding : 12,
        }
     }
   }

   const diviceData = {
      labels : ['pc','테블릿','모바일'],
      datasets : [ //y축
      {
         data : [31,11,58],
         backgroundColor : [
            '#E20942', //pc
            '#7B5A99', //테블릿
            '#C69A3B', //모바일
         ],
        borderColor : 'white',
        borderWidth : 4,
        hoverOffset : 8,
      }
     ]
   }

   const diviceOptions = {
      responsive : true,
      maintainAspectRatio : false,
      animation : {
         duration : 1400,
      },
      plugins : {
         legend : {
            display : true,
            position : 'right',
            labels : {
            padding : 15,
            usePointStyle : true,
            pointStyle : 'circle',
            color : '#333',
            font : {
               size : 12,
            }
          }
        },
        tooltip : {
           displayColors : false,
           titleColor : '#333',
           backgroundColor : '#fff',
           bodyColor : '#333',
           borderWidth : 1,
           borderColor : '#eee',
           padding : 12,
        }
      }
   }

   //막대그래프에들어가는 y축 값
   const timeData = {
      labels : ['00~03시','03~06시','06~09시','09~12시','12~15시','15~18시','18~21시','21~24시'],
      datasets : [
        {
          label : '방문자수',
          data : [15, 8, 60, 180, 260, 300, 340, 190],
          backgroundColor : '#E20942',
          borderRadius : {
             topLeft : 4,
             topRight : 4,
             bottomLeft : 0,
             bottomRight : 0,
          },
          borderSkipped : false,
          maxBarThickness : 28,
        }
      ]
   }

   const timeOptions = {
      responsive : true,
      maintainAspectRatio : false,
      plugins : {
        legend : {
          display : false,
        },
        tooltip : {
           displayColors : false,
           titleColor : '#333',
           backgroundColor : '#fff',
           bodyColor : '#333',
           borderWidth : 1,
           borderColor : '#eee',
           padding : 12,
        }
      },
      scales : {
        x : {
           grid : {
             display : false,
           },
           ticks : {
              color : '#333',
              font : {
                size : 12,
              },
              border : {
                display : false,
              }
           }
        },
        y: {
           beginAtZero : true,
           border : {
             display : false,
           },
           grid : {
              color : '#ece6ea',
           },
           ticks : {
              color : '#333',
              font : {
                size : 13,
              },
              padding : 10,
           }
        }
      }
   }

  return (
    <>

      <Helmet>
         <title>
            대시보드 | 온라인 출판 관리자
         </title>
         <meta name='description' content='온라인 출판 서비스 관리자 대시보드' />
      </Helmet>        

      <div className={styles.home}>

         <div className={styles.heading}>
            <h2 className={styles.title}>대시보드</h2>
            <p className={styles.desc}>온라인 출판 서비스 이용 현황입니다</p>
         </div>

         <section className={styles.card}>
            <div className={styles.chartsRow}>

               {/* 라인그래프 */}
               <div className={styles.chartCol}>
                  <div className={styles.colHeader}>
                     <div>
                        <h3 className={styles.cardTitle}>이용 현황</h3>
                        <p className={styles.cardSubtitle}>{currentData.title}방문자수</p> {/* 클릭할때마다달라져야하는것/변수들어감 */}
                     </div>

                     <div className={styles.weekButtons}>
                       {/* 매개변수가들어감 */}
                         <button
                           className={`${styles.weekButton} ${selectWeek === 'week1' ? styles.weekButtonActive : ''}`}
                           onClick={()=>setSelectWeek('week1')}
                         >3주전</button>
                         <button
                           className={`${styles.weekButton} ${selectWeek === 'week2' ? styles.weekButtonActive : ''}`}
                           onClick={()=>setSelectWeek('week2')}
                         >2주전</button>
                         <button
                           className={`${styles.weekButton} ${selectWeek === 'week3' ? styles.weekButtonActive : ''}`}
                           onClick={()=>setSelectWeek('week3')}
                         >이번주</button>
                     </div>
                  </div>

                  <div className={styles.chartWrap}>
                     <Line data={chartData} options={chartOptions}/>
                  </div>
               </div>

               {/* 도넛 */}
               <div className={styles.donutWrap}>

                  <div className={styles.colHeader}>
                     <div>
                        <h3 className={styles.cardTitle}>카테고리별 비중</h3>
                        <p className={styles.cardSubtitle}>전체 도서 비율</p>
                     </div>
                  </div>

                  <div className={styles.donutCanvas}>
                     <Doughnut data={categoryData} options={categoryOptions} />
                  </div>
               </div>

            </div>

         </section>

         <section className={styles.card}>
            <div className={styles.chartsRow}>

               {/* 막대 그래프 */}
               <div className={styles.barCol}>
                  <div className={styles.colHeader}>
                     <div>
                        <h3 className={styles.cardTitle}>시간대별 방문자수</h3>
                        <p className={styles.cardSubtitle}>오늘 시간대별 접속 현황</p>
                     </div>
                  </div>

                  <div className={styles.barWrap}>
                     <Bar data={timeData} options={timeOptions} />
                  </div>
               </div>

               {/* 원 그래프 */}
               <div className={styles.pieWrap}>
                  <div className={styles.colHeader}>
                     <div>
                        <h3 className={styles.cardTitle}>접속 디바이스 비중</h3>
                        <p className={styles.cardSubtitle}>PC / 테블릿 / 모바일</p>
                     </div>
                  </div>

                  <div className={styles.pieCanvas}>
                     <Pie data={diviceData} options={diviceOptions} />
                  </div>
               </div>

            </div>
         </section>

      </div>

    </>
  )
}

export default Home

//헬멧태그를넣을때는감싸는태그를의미없는태그를쓴다
