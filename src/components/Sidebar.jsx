import React, {useRef} from 'react'
import {NavLink} from 'react-router-dom'
import gasp from 'gsap'

import styles from './Sidebar.module.scss'

const Sidebar = () => {
  const navRef = useRef(null)
  const boxRef = useRef(null)

  const menufnc = (e) => {
    const menu = e.currentTarget
    const navbox = navRef.current.getBoundingClientRect()
    const menuBox = menu.getBoundingClientRect()

    const targetY = menuBox.top - navbox.top

    gasp.killTweensOf(boxRef.current)
    gasp.to(boxRef.current,{
      y : targetY,
      delay : 0.15,
      duration : 0.65,
      ease : 'power2.inOut',
    })
  }

  return (
    <aside className={styles.sidebar}>

       <nav ref={navRef} className={styles.nav}>

        {/* 움직이는 박스 */}
          <span ref={boxRef} className={styles.moveBox} />

        {/* 네비들 */}
          <NavLink to = '/' onClick={menufnc} className={({isActive})=> isActive ? styles.active : '' }> 대시보드 </NavLink>
          <NavLink to = '/visitors' onClick={menufnc} className={({isActive})=> isActive ? styles.active : '' }> 방문자 </NavLink>
          <NavLink to = '/users' onClick={menufnc} className={({isActive})=> isActive ? styles.active : '' }> 사용자 </NavLink>
          <NavLink to = '/books' onClick={menufnc} className={({isActive})=> isActive ? styles.active : '' }> 도서 </NavLink>
          <NavLink to = '/board' onClick={menufnc} className={({isActive})=> isActive ? styles.active : '' }> 게시판 </NavLink>
          <NavLink to = '/settings' onClick={menufnc} className={({isActive})=> isActive ? styles.active : '' }> 설정 </NavLink>
      
       </nav>
    </aside>
  )
}

export default Sidebar

//재활용이가능한친구불려가는친구
//getBoundingClientRect()x,y좌표값 w위드h하이크기값 모든정보를 나한테 던져주세요
//killTweensOf() 제거해주세요