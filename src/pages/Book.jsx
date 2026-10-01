import React,{useState} from 'react'
import { Helmet } from 'react-helmet-async'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale,
    ArcElement, Tooltip, Legend, Filler,} from 'chart.js' //사용허가를받아야함
import { Doughnut,Bubble,PolarArea} from 'react-chartjs-2'

import styles from './Book.module.scss'
import { palette, chartColors } from '../styles/chartTheme'

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale,
    ArcElement, Tooltip, Legend, Filler,
)//사용하겠다선포

const mediaData = [
    {title : '전자책', value : 72},
    {title : '오디오북', value : 22},
    {title : '챗북', value : 40},
    {title : '오브제북', value : 30},
    {title : '도슨트북', value : 50},
]

//컴포넌트로하는거니깐반드시북이시작되기전임포트하는자리에만들어야함
//풀옵스개념이라아이템이아니다
const MediaDoughnut = ({title,value}) => {
    const data = {
        datasets : [
            {
                data : [value,100-value],
                backgroundColor : [palette.navy,palette.mauve],
                borderRadius :10,
                borderWidth : 0,
                hoverOffset : 2,
            }
        ]
    }

    const options = {
        responsive : true,
        maintainAspectRatio : false,
        cutout : '78%',
        plugins : {
            legend : {
                display : false,
            },
            tooltip : {
                enabled : false,
            }
          }
        }
    return (
        <div className={styles.mediaItem}>
            <div className={styles.mediaChart}>
                <Doughnut data={data} options={options}/>
                <span className={styles.mediaPercent}>{value}%</span>
            </div>
            <strong className={styles.mediaTitle}>{title}</strong>
        </div>
    )
}

//picsum.photos 같은 외부 이미지 서비스에 의존하지 않도록 표지 이미지를 직접 생성
const coverPalette = chartColors

const makeCover = (title, id) => {
    const color = coverPalette[(id - 1) % coverPalette.length]
    const initial = title.trim().charAt(0)
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='300'>`
        + `<rect width='220' height='300' rx='18' fill='${color}'/>`
        + `<text x='50%' y='50%' font-family='sans-serif' font-size='104' font-weight='700' fill='${color === palette.gold || color === palette.citron || color === palette.mauve ? palette.ink : palette.cream}' text-anchor='middle' dominant-baseline='central'>${initial}</text>`
        + `</svg>`
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const Book = () => {
    const bookData = [
        {
            id: 1,
            title: '단어가 품은 세계',
            author: '황선엽',
            category: '인문/교양',
            point: '인문/교양 카테고리 추천 1위',
            daily: 98, weekly: 94, monthly: 91, change: 2,
            price: 18000, pages: 328, sales: 1650,
            size: '64.2MB',
            publisher: '북하우스',
            publishDate: '2026.03.14',
            ebookDate: '2026.03.21',
        },
        {
            id: 2,
            title: '구해줘',
            author: '기욤 뮈소',
            category: '소설',
            point: '소설 카테고리 추천 1위',
            daily: 95, weekly: 97, monthly: 93, change: 1,
            price: 22000, pages: 412, sales: 1420,
            size: '71.8MB',
            publisher: '밝은세상',
            publishDate: '2026.02.11',
            ebookDate: '2026.02.18',
        },
        {
            id: 3,
            title: '매 순간 선택이 삶을 바꾼다',
            author: '김태훈',
            category: '자기계발',
            point: '자기계발 카테고리 추천 1위',
            daily: 92, weekly: 90, monthly: 96, change: -1,
            price: 16000, pages: 280, sales: 1180,
            size: '53.4MB',
            publisher: '마인드북',
            publishDate: '2026.01.20',
            ebookDate: '2026.01.24',
        },
        {
            id: 4,
            title: '싯다르타',
            author: '헤르만 헤세',
            category: '소설',
            point: '소설 카테고리 추천 2위',
            daily: 89, weekly: 92, monthly: 90, change: 3,
            price: 14500, pages: 240, sales: 780,
            size: '42.1MB',
            publisher: '문예출판사',
            publishDate: '2025.12.12',
            ebookDate: '2025.12.20',
        },
        {
            id: 5,
            title: '저희 남매를 위한 최고의 선택',
            author: '최서윤',
            category: '어린이/청소년',
            point: '어린이/청소년 카테고리 추천 1위',
            daily: 86, weekly: 88, monthly: 87, change: 1,
            price: 13500, pages: 210, sales: 930,
            size: '38.2MB',
            publisher: '키즈북',
            publishDate: '2026.04.05',
            ebookDate: '2026.04.10',
        },
        {
            id: 6,
            title: '돈의 흐름을 읽는 법',
            author: '박정호',
            category: '경제/경영',
            point: '경제/경영 카테고리 추천 1위',
            daily: 84, weekly: 91, monthly: 94, change: 4,
            price: 19500, pages: 352, sales: 2410,
            size: '69.7MB',
            publisher: '경제북스',
            publishDate: '2026.03.18',
            ebookDate: '2026.03.25',
        },
        {
            id: 7,
            title: '오늘 하루도 충분히 좋았다',
            author: '이현진',
            category: '시/에세이',
            point: '시/에세이 카테고리 추천 1위',
            daily: 82, weekly: 86, monthly: 88, change: 2,
            price: 15000, pages: 224, sales: 1250,
            size: '40.5MB',
            publisher: '감성책방',
            publishDate: '2026.05.10',
            ebookDate: '2026.05.15',
        },
        {
            id: 8,
            title: '처음 시작하는 사진',
            author: '정재훈',
            category: '취미/실용',
            point: '취미/실용 카테고리 추천 1위',
            daily: 79, weekly: 82, monthly: 85, change: -2,
            price: 17000, pages: 198, sales: 520,
            size: '86.1MB',
            publisher: '라이프북',
            publishDate: '2026.04.17',
            ebookDate: '2026.04.22',
        },
        {
            id: 9,
            title: '판타지 세계의 시작',
            author: '윤서진',
            category: '판타지/무협',
            point: '판타지/무협 카테고리 추천 1위',
            daily: 77, weekly: 80, monthly: 89, change: 5,
            price: 25000, pages: 468, sales: 2980,
            size: '91.4MB',
            publisher: '스토리랩',
            publishDate: '2026.03.05',
            ebookDate: '2026.03.08',
        },
        {
            id: 10,
            title: '월간 북라이프',
            author: '북라이프 편집부',
            category: '매거진',
            point: '매거진 카테고리 추천 1위',
            daily: 73, weekly: 78, monthly: 83, change: 1,
            price: 12000, pages: 145, sales: 420,
            size: '102MB',
            publisher: '북라이프',
            publishDate: '2026.08.01',
            ebookDate: '2026.08.01',
        },
    ].map((item) => ({ ...item, image: makeCover(item.title, item.id) }))

    //bubble 그래프는 3가지 데이터를 비교하기 위해서 만들어진 차트
    // x:항목,y:데이터(값)
    //x:데이터1(값1), y:데이터2(값2), r:데이터3(값3) -> 버블차트
    //x:가격,y:페이지,r:판매량 임의로정했음
    //키와값
    const bubbleData = {
        datasets : [
            {
                label : '도서 판매 분석',
                data : bookData.map((item)=>({
                    x : item.price,
                    y : item.pages,
                    r : 5 + item.sales/100,
                    title : item.title,
                    sales : item.sales,
                })),
                backgroundColor : bookData.map((_,index)=>chartColors[index % chartColors.length] + 'B3'),
                borderColor : bookData.map((_,index)=>chartColors[index % chartColors.length]),
                borderWidth : 1,
            }
        ]
    }

    const bubbleOptions = {
        responsive : true,
        maintainAspectRatio : false,
        plugins : {
           legend : {
              display : false,
           },
           tooltip : {
             titleColor : palette.navy,
             bodyColor : palette.navy,
             padding : 12,
             callbacks : {
                title : (item) => item[0].raw.title,
                label : (context) => [
                    `가격 ${context.raw.x.toLocaleString()}원`,
                    `페이지 ${context.raw.y}P`,
                    `팬매량 ${context.raw.sales.toLocaleString()}권`,
                ]
             }
           }
        },
        scales : {
            x : {
                min : 10000,
                title : {
                    display : true,
                    text : '도서가격',
                    color : palette.rust,
                },
                grid : {
                    color : palette.line
                },
                ticks : {
                    color : palette.navy,
                    callback : (value) => `${value/10000}만`,
                }
            },
            y : {
                beginAtZero : true,
                grid : {
                    color : palette.line
                },
                ticks : {
                    color : palette.navy,
                }
            }
        }
    }

    //카테고리
    const catagories = [
        '종합',
        ...new Set(bookData.map((item)=>item.category))
    ]

    //장르별 독서 몰입도 : 카테고리별 일간/주간/월간 지표 평균을 몰입도 점수로 사용
    const genreLabels = catagories.slice(1)

    const genreData = {
        labels : genreLabels,
        datasets : [
            {
                label : '장르별 독서 몰입도',
                data : genreLabels.map((genre)=>{
                    const items = bookData.filter((item)=>item.category === genre)
                    const avg = items.reduce((sum,item)=>sum + (item.daily + item.weekly + item.monthly) / 3, 0) / items.length
                    return Math.round(avg)
                }),
                backgroundColor : genreLabels.map((_,index)=>chartColors[index % chartColors.length]),
                borderWidth : 1,
            }
        ]
    }

    const genreOptions = {
        responsive : true,
        maintainAspectRatio : false,
        plugins : {
            legend : {
                position : 'right',
                labels : {
                    boxWidth : 10,
                    color : palette.navy,
                }
            },
            tooltip : {
                callbacks : {
                    label : (context) => `${context.label} ${context.raw}점`,
                }
            }
        },
        scales : {
            r : {
                beginAtZero : true,
                max : 100,
                ticks : {
                    display : false,
                },
                grid : {
                    color : palette.line,
                }
            }
        }
    }

    //인기 키워드
    const keywords = [
        '경제상식', '김태리 오디오북', '수식', '인문학', '부동산',
        '한국사', '히가시노게이고', '신간도서', '영어', '건강',
    ]

    const [category,setCategory] = useState('종합') //소설,시,에세이,경제.....
    const [period,setPeriod] = useState('일간') // 주간,월간
    const [selectBook,setSelectBook] = useState(null)//useState(bookData[0])0을넣어서기본값을가지고있고다른놈으로바껴라
    const periodKey = { '일간': 'daily', '주간': 'weekly', '월간': 'monthly' }[period]
    const [searchWord,setSearchWord] = useState('')

    const rankFillterBook = bookData
    .filter((item)=>category === '종합' || item.category === category )
    .sort((a,b)=>b[periodKey]-a[periodKey])
    .slice(0, 5)

    const searchBook = () => {
        const word = searchWord.trim().toLocaleLowerCase()

        if(!word) return
        const findBook = bookData.find((item) => item.title.toLocaleLowerCase().includes(word)||
                                                 item.author.toLocaleLowerCase().includes(word)
        )
            if(findBook){
                setSelectBook(findBook)
            }
    }

  return (
    <>

    <Helmet>
        <title>도서 관리 | 관리자 대시보드</title>
    </Helmet>

    <div className={styles.book}>

       <div className={styles.heading}>
         <h2>도서관리</h2>
         <p>도서 이용 현황과 인기 컨텐츠를 확인합니다</p>
       </div>

       {/* 컨텐츠 전체 박스 */}
       <div className={styles.booklayout}>

            {/* 왼쪽 열 */}
            <div className={styles.col}>

                <section className={styles.card}>

                    <div className={styles.cardTitle}>
                        <h3>인기 도서 순위</h3>
                    </div>

                    <div className={styles.categorylist}>
                       {
                        catagories.map((item)=>(
                            <button key={item} onClick={()=>setCategory(item)}>
                                {item}
                            </button>
                        ))
                       } 
                    </div>

                    <div className={styles.periodSelect}>
                        <select value={period} onChange={(e)=>setPeriod(e.target.value)}>
                            <option value='일간'>일간</option>
                            <option value='주간'>주간</option>
                            <option value='월간'>월간</option>
                        </select>
                    </div>

                    <div className={styles.rankList}>
                        {
                           rankFillterBook.map((item,idx)=>(
                            <div
                                key={item.id}
                                className={`${styles.rankItem} ${selectBook?.id === item.id ? styles.rankItemActive : ''}`}
                                onClick={()=>setSelectBook(item)}
                            >
                               <strong className={styles.rankNum}>{idx +1}</strong>
                               <img src={item.image} alt={item.title}/>
                               <div className={styles.rankInfo}>
                                  <strong>{item.title}</strong>
                                  <p>{item.author}</p>
                                  <span>
                                     <b>point</b>
                                     {item.point}
                                  </span>
                               </div>
                            </div>
                           ))
                        }
                    </div>

                </section>

                <section className={styles.card}>

                    <div className={styles.cardTitle}>
                        <h3>인기 키워드</h3>
                    </div>

                    <div className={styles.keywordList}>
                        {
                            keywords.map((item,idx)=>(
                                <button key={item} type="button" className={styles.keyword}>
                                    <span className={styles.keywordRank}>{idx + 1}</span>
                                    #{item}
                                </button>
                            ))
                        }
                    </div>

                </section>

            </div>{/* 왼쪽 열 end*/}

           {/* 가운데 열 */}
            <div className={styles.col}>
                 <section className={styles.card}>

                    <div className={styles.cardTitle}>
                        <h3>도서 정보</h3>
                    </div>

                   <form onSubmit={(e)=>{e.preventDefault()
                                           searchBook()}}>
                        <div className={styles.searchBar}>
                            <input value={searchWord} onChange={(e)=>setSearchWord(e.target.value)} placeholder='도서명을 검색하세요'/>
                            <button type='submit'>검색</button>
                        </div>
                    </form>

                        {selectBook ? (
                        <div className={styles.bookDetail}>
                            <img src={selectBook.image} alt={selectBook.title}/>
                            <div className={styles.bookMeta}>
                                <h3>{selectBook.title}</h3>
                                <p>{selectBook.author}</p>
                                <dl>
                                    <div>
                                        <dt>카테고리</dt><dd>{selectBook.category}</dd>
                                    </div>
                                    <div>
                                        <dt>가격</dt><dd>{selectBook.price.toLocaleString()}원</dd>
                                    </div>
                                    <div>
                                        <dt>페이지</dt><dd>{selectBook.pages}p</dd>
                                    </div>
                                    <div>
                                        <dt>판매량</dt><dd>{selectBook.sales.toLocaleString()}부</dd>
                                    </div>
                                    <div>
                                        <dt>출간일</dt><dd>{selectBook.publishDate}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        ) : (
                        <p>왼쪽 목록에서 도서를 선택해주세요</p>
                        )}

                </section>
                
                <section className={styles.card}>
                    <div className={styles.cardTitle}>
                        <h3>도서 판매 분석</h3>
                    </div>
                    <div className={styles.bubbleChartWrap}>
                        <span className={styles.axisLabelVertical}>페이지수</span>
                        <div className={styles.bubbleChartInner}>
                            <Bubble data={bubbleData} options={bubbleOptions}/>
                        </div>
                    </div>
                </section>
            </div>{/* 가운데 열 end*/}

            
           {/* 오른쪽 열 */}
            <div className={styles.col}>
                <section className={styles.card}>
                    <div className={styles.cardTitle}>
                        <h3>멀티미디어 독서 콘텐츠</h3>
                    </div>
                    <div className={styles.mediaList}>
                        {
                            mediaData.map((item)=>(
                                <MediaDoughnut key={item.title} title={item.title} value={item.value}/>
                            ))
                        }
                    </div>
                </section>
                
                <section className={styles.card}>
                    <div className={styles.cardTitle}>
                        <h3>장르별 독서 몰입도</h3>
                    </div>
                    <div>
                        <PolarArea data={genreData} options={genreOptions}/>
                    </div>
                </section>
            </div>{/* 오른쪽 열 end*/}

       </div>

    </div>

    </>
  )
}

export default Book

//...new bookData이것을...new Set()로반복되는거를하나씩만들고올수있는
//const rankFillterBook->반복해서출력되는 = bookData.fillter()->걸러서.sort()->정렬.slice(0, 5)->짤라내
//딱한마리만찾아주세요->파인드 / 여러마리찾아주세요->필터
