import org.w3c.dom.CanvasRenderingContext2D

interface Renderable {

    fun onTick(dt: Double)
    fun onRender(ctx: CanvasRenderingContext2D, dt: Double)

}