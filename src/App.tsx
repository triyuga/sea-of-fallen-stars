import * as React from 'react'
import { Routes, Route, Outlet, Link, BrowserRouter } from 'react-router-dom'
import styles from './App.module.scss'
import { SeaOfFallenStars } from './SeaOfFallenStars/SeaOfFallenStars'

export const App = () => (
    <BrowserRouter>
        {/* Routes nest inside one another. Nested route paths build upon parent route paths, and nested route elements render inside parent route elements. See the note about <Outlet> below. */}
        <Routes>
            <Route path="/sea-of-fallen-stars/" element={<Layout />}>
                <Route index element={<SeaOfFallenStars />} />
                <Route path="about" element={<About />} />
                <Route path="dashboard" element={<Dashboard />} />

                {/* Using path="*"" means "match anything", so this route acts like a catch-all for URLs that we don't have explicit routes for. */}
                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    </BrowserRouter>
)

const Layout = () => (
    <div className={styles.layout}>
        <div className={styles.header}>
            <h1 className={styles.siteName}>Sea of Fallen Stars</h1>
            {/* A "layout route" is a good place to put markup you want to share across all the pages on your site, like navigation. */}
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Link to="/">Map</Link>
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

// function Home() {
//   return (
//     <div>
//       <h2>Home</h2>
//     </div>
//   );
// }

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    )
}

function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    )
}

function NoMatch() {
    return (
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    )
}
