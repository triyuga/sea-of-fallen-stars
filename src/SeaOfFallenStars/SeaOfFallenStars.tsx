import React, { useRef, useState } from 'react'
import styles from './SeaOfFallenStars.module.scss'
import mapImage from './assets/SeaOfFallenStarsMap-3000.jpg'
import mapImageNoLabels from './assets/SeaOfFallenStarsMap-3000-no-labels.jpg'
import useMouse from '@react-hook/mouse-position'
import classNames from 'classnames'

enum PinType {
    City,
    Region,
}

const locationPins: LocationPin[] = [
    {
        name: 'party',
        label: 'Party',
        type: PinType.City,
        position: { x: 50, y: 50, isFixed: true },
        relatedWikiLinks: [
            {
                text: 'Party',
                url: 'https://github.com/triyuga/port-blacksand-adventurers-guide/tree/main/PCs',
            },
        ],
    },
    {
        name: 'ships',
        label: 'Ships',
        type: PinType.City,
        position: { x: 150, y: 50, isFixed: true },
        relatedWikiLinks: [
            {
                text: 'Rules for Boats',
                url: 'https://github.com/triyuga/port-blacksand-adventurers-guide/tree/main/rule-for-boats',
            },
        ],
    },
    {
        name: 'portBlacksand',
        label: 'Port Blacksand',
        type: PinType.City,
        position: { x: 1740, y: 1128 },
        relatedWikiLinks: [
            {
                text: 'PORT BLACKSAND - A Travelers Guidebook',
                url: 'https://github.com/triyuga/port-blacksand-adventurers-guide',
            },
        ],
    },
    {
        name: 'yuirwood',
        label: 'Yuirwood',
        type: PinType.City,
        position: { x: 2070, y: 1060 },
        wikiLink: 'https://forgottenrealms.fandom.com/wiki/Yuirwood',
    },
    {
        name: 'mulhorand',
        label: 'Mulhorand',
        type: PinType.Region,
        position: { x: 2800, y: 1750 },
        wikiLink: 'https://forgottenrealms.fandom.com/wiki/Mulhorand',
        relatedWikiLinks: [
            {
                text: 'Mulhorandi pantheon',
                url: 'https://forgottenrealms.fandom.com/wiki/Mulhorandi_pantheon',
            },
            { text: 'Imaskar Empire', url: 'https://forgottenrealms.fandom.com/wiki/Imaskar' },
            { text: '__', url: '__' },
        ],
    },
    {
        name: 'vilhonReach',
        label: 'Vilhon Reach',
        type: PinType.Region,
        position: { x: 1250, y: 1650 },
        wikiLink: 'https://forgottenrealms.fandom.com/wiki/Vilhon_Reach',
        // relatedWikiLinks: [
        //     {
        //         text: 'Mulhorandi pantheon',
        //         url: 'https://forgottenrealms.fandom.com/wiki/Mulhorandi_pantheon',
        //     },
        //     { text: 'Imaskar Empire', url: 'https://forgottenrealms.fandom.com/wiki/Imaskar' },
        //     { text: '__', url: '__' },
        // ],
    },
    {
        name: 'vilhonReach',
        label: 'Vilhon Reach',
        type: PinType.Region,
        position: { x: 1250, y: 1650 },
        wikiLink: 'https://forgottenrealms.fandom.com/wiki/Vilhon_Reach',
        // relatedWikiLinks: [
        //     {
        //         text: 'Mulhorandi pantheon',
        //         url: 'https://forgottenrealms.fandom.com/wiki/Mulhorandi_pantheon',
        //     },
        //     { text: 'Imaskar Empire', url: 'https://forgottenrealms.fandom.com/wiki/Imaskar' },
        //     { text: '__', url: '__' },
        // ],
    },
]

interface Position {
    x: number
    y: number
    isFixed?: boolean
}

interface LocationPin {
    name: string
    label: string
    type: PinType
    position: Position
    wikiLink?: string
    relatedWikiLinks?: Link[]
}

interface Link {
    text: string
    url: string
}

interface CanvasState {
    activePinName: string | null
}

interface CanvasConfig {
    width: number
    height: number
    backgroundImages: string[]
    sidebarWidth: number
}

const config: CanvasConfig = {
    width: 3000,
    height: 2241,
    // backgroundImage: mapImageNoLabels,
    backgroundImages: [mapImage, mapImageNoLabels],
    sidebarWidth: 600,
}

export const SeaOfFallenStars = () => {
    const ref = useRef(null)
    const mouse = useMouse(ref, { enterDelay: 100, leaveDelay: 100 })
    const round = (num: number | null): number => (num ? Math.round(num) : 0)
    const [state, setState] = useState<CanvasState>({
        activePinName: null,
    })

    const activePin = locationPins.find(({ name }) => name === state.activePinName)
    const showSidebar = !!activePin

    return (
        <div
            ref={ref}
            className={styles.canvas}
            style={{
                width: `${!!activePin ? config.width + config.sidebarWidth : config.width}px`,
                height: `${config.height}px`,
            }}
        >
            {/* Background Image */}
            <img
                className={styles.backgroundImage}
                alt={config.backgroundImages[0]}
                src={config.backgroundImages[0]}
                style={{ width: config.width, height: config.height }}
            />

            {/* Mouse Coordinates */}
            <div className={styles.mouseCoordinates}>
                x: {round(mouse.x)}px y: {round(mouse.y)}px
            </div>

            {/* Location Pins */}
            {locationPins.map((pin) => (
                <Pin pin={pin} onClick={() => setState({ ...state, activePinName: pin.name })} />
            ))}

            {/* Sidebar */}
            {showSidebar && (
                <div className={styles.sidebar} style={{ width: `${config.sidebarWidth}px` }}>
                    {/* Close Button */}
                    <button
                        onClick={() => setState({ ...state, activePinName: null })}
                        className={styles.closeButton}
                    >
                        x
                    </button>

                    {/* Title */}
                    <h1>{activePin.label}</h1>

                    {/* Wiki Link */}
                    {!!activePin.wikiLink && (
                        <a href={activePin.wikiLink} target="_blank" rel="noreferrer">
                            {activePin.wikiLink}
                        </a>
                    )}

                    {/* Related Wiki Links */}
                    {!!activePin.relatedWikiLinks && activePin.relatedWikiLinks.length > 0 && (
                        <ul>
                            {activePin.relatedWikiLinks.map(({ text, url }) => (
                                <li>
                                    <a href={url} target="_blank" rel="noreferrer">
                                        {text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}

interface PinProps {
    pin: LocationPin
    onClick: () => void
}

const Pin = ({ pin, onClick }: PinProps) => {
    return (
        <div
            className={classNames(styles.marker, pin.type.toString())}
            style={{
                left: pin.position.x,
                top: pin.position.y,
                position: pin.position.isFixed ? 'fixed' : 'absolute',
            }}
            onClick={onClick}
        >
            <h2>{pin.label}</h2>
        </div>
    )
}
