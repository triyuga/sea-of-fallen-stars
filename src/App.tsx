import * as React from 'react'
import { Routes, Route, Outlet, Link, BrowserRouter, Navigate } from 'react-router-dom'
import styles from './App.module.scss'
import { SeaOfFallenStars } from './SeaOfFallenStars/SeaOfFallenStars'

export const App = () => (
    <BrowserRouter>
        {/* Routes nest inside one another. Nested route paths build upon parent route paths, and nested route elements render inside parent route elements. See the note about <Outlet> below. */}
        <Routes>
            <Route path="/sea-of-fallen-stars/" element={<Layout />}>
                <Route index element={<SeaOfFallenStars />} />
                <Route path="dashboard" element={<Dashboard />} />

                {/* Using path="*"" means "match anything", so this route acts like a catch-all for URLs that we don't have explicit routes for. */}
                <Route path="*" element={<Navigate replace to="/sea-of-fallen-stars/" />} />
            </Route>
        </Routes>
    </BrowserRouter>
)

const Layout = () => (
    <div className={styles.layout}>
        <div className={styles.header}>
            <Link to="/sea-of-fallen-stars/">
                <h1 className={styles.siteName}>Sea of Fallen Stars</h1>
            </Link>
            {/* A "layout route" is a good place to put markup you want to share across all the pages on your site, like navigation. */}
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Link to="/sea-of-fallen-stars/map">Map</Link>
                    </li>
                    <li>
                        <Link to="/sea-of-fallen-stars/dashboard">Dashboard</Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div className={styles.body}>
            <Outlet />
        </div>
        <div className={styles.footer}></div>
    </div>
)

function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    )
}

// function NoMatch() {
//     return (
//         <div>
//             <h2>Nothing to see here!</h2>
//             <p>
//                 <Link to="/">Go to the home page</Link>
//             </p>
//         </div>
//     )
// }
