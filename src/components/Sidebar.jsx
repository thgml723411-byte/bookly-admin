import React, {useLayoutEffect, useRef} from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import gasp from 'gsap'

import styles from './Sidebar.module.scss'

const Sidebar = () => {
  const navRef = useRef(null)
  const boxRef = useRef(null)
  const {pathname} = useLocation()

  useLayoutEffect(() => {
    const moveIndicator = () => {
      const menu = navRef.current.querySelector('[aria-current="page"]')
      if (!menu) return
      const navbox = navRef.current.getBoundingClientRect()
      const menuBox = menu.getBoundingClientRect()

      gasp.killTweensOf(boxRef.current)
      gasp.set(boxRef.current, {y: menuBox.top - navbox.top})
    }

    moveIndicator()
    window.addEventListener('resize', moveIndicator)
    return () => window.removeEventListener('resize', moveIndicator)
  }, [pathname])

  return (
    <aside className={styles.sidebar}>

       <nav ref={navRef} className={styles.nav}>

        {/* 움직이는 박스 */}
          <span ref={boxRef} className={styles.moveBox} />

        {/* 네비들 */}
          <NavLink to = '/' className={({isActive})=> isActive ? styles.active : '' }> 대시보드 </NavLink>
          <NavLink to = '/visitors' className={({isActive})=> isActive ? styles.active : '' }> 방문자 </NavLink>
          <NavLink to = '/users' className={({isActive})=> isActive ? styles.active : '' }> 사용자 </NavLink>
          <NavLink to = '/books' className={({isActive})=> isActive ? styles.active : '' }> 도서 </NavLink>
          <NavLink to = '/board' className={({isActive})=> isActive ? styles.active : '' }> 게시판 </NavLink>
          <button type='button' className={styles.disabledMenu} disabled> 설정 </button>
      
       </nav>
    </aside>
  )
}

export default Sidebar

//재활용이가능한친구불려가는친구
//getBoundingClientRect()x,y좌표값 w위드h하이크기값 모든정보를 나한테 던져주세요
//killTweensOf() 제거해주세요
