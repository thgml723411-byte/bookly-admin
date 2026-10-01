import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Visitors from './pages/Visitors'
import User from './pages/User'
import Book from './pages/Book'
import Board from './pages/Board'

import styles from './App.module.scss'

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
       <div className={styles.container}>
        <Sidebar/>
         <main className={styles.main}>
           <Routes>
             <Route path='/' element={<Home/>} />
             <Route path='/visitors' element={<Visitors/>} />
             <Route path='/users' element={<User/>} />
             <Route path='/books' element={<Book/>} />
             <Route path='/board' element={<Board/>} />
             <Route path='/settings/*' element={<Navigate to='/' replace />} />
           </Routes>
         </main>
       </div>
    </div>
  )
}

export default App
