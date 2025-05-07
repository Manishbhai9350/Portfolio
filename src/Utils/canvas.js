import { CanvasTexture } from "three"

export const MyCanvasTexture = (cb = () => {}) => {
    let Canvas = document.createElement('canvas')
    let Ctx = Canvas.getContext('2d')
    cb(Canvas,Ctx)
    return new CanvasTexture(Canvas)
}