import { getFillArr } from '@/utils'
import type { TasState } from 'src/types'

let tasState: TasState = {}
const NONE = '........'

const reg = /\|\d\|([LRUDTSAB.]{8})\|([LRUDTSAB.]{8})?\|\|/g

function initTasState() {
    tasState = {}
}

function fm2Parse(text: string, fix: number) {
    let match = reg.exec(text)
    let frame = 0 + fix
    let last = false
    initTasState()
    if (!match) {
        return
    }

    while (match) {
        const p1Match = match[1] === NONE
        const p2Match = match[2] === NONE
        if (p1Match && p2Match) {
            if (last) {
                tasState[frame] = {
                    p1: getFillArr(8, 0x40),
                    p2: getFillArr(8, 0x40),
                }
                last = false
            }
            frame++
            match = reg.exec(text)
            continue
        }
        last = true
        const p1 = match[1] ? match[1].split('').map(x => x === '.' ? 0x40 : 0x41)
            .reverse() : getFillArr(8, 0x40)
        const p2 = match[2] ? match[2].split('').map(x => x === '.' ? 0x40 : 0x41)
            .reverse() : getFillArr(8, 0x40)
        match = reg.exec(text)

        tasState[frame] = {
            p1,
            p2,
        }
        frame++
    }
}

export { fm2Parse, tasState }