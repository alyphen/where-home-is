import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLImageElement
import kotlin.browser.document
import kotlin.math.abs

class Background : Renderable {

    val image: HTMLImageElement
    var x: Double
    var y: Double
    var endX: Double
    var endY: Double
    var speed: Double
    var depth: Int = 0

    constructor(image: HTMLImageElement, x: Double, y: Double, endX: Double = x, endY: Double = y, speed: Double = 1.0, depth: Int = 0) {
        this.image = image
        this.x = x
        this.y = y
        this.endX = endX
        this.endY = endY
        this.speed = speed
        this.depth = depth
    }

    constructor(image: HTMLImageElement, x: Int, y: Int, endX: Int = x, endY: Int = y, speed: Double = 1.0, depth: Int = 0):
            this(image, x.toDouble(), y.toDouble(), endX.toDouble(), endY.toDouble(), speed, depth)

    constructor(imageSource: String, x: Double, y: Double, endX: Double = x, endY: Double = y, speed: Double = 1.0, depth: Int = 0) {
        this.image = document.createElement("img") as HTMLImageElement
        this.image.src = imageSource
        this.x = x
        this.y = y
        this.endX = endX
        this.endY = endY
        this.speed = speed
        this.depth = depth
    }

    constructor(imageSource: String, x: Int, y: Int, endX: Int = x, endY: Int = y, speed: Double = 1.0, depth: Int = 0):
            this(imageSource, x.toDouble(), y.toDouble(), endX.toDouble(), endY.toDouble(), speed, depth)

    override fun onTick(dt: Double) {
        if (abs(x - endX) <= dt * speed && abs(y - endY) <= dt * speed) return
        if (x < endX) {
            x += dt * speed
        }
        if (x > endX) {
            x -= dt * speed
        }
        if (abs(x - endX) <= dt * speed) {
            x = endX
        }
        if (y < endY) {
            y += dt * speed
        }
        if (y > endY) {
            y -= dt * speed
        }
        if (abs(y - endY) <= dt * speed) {
            y = endY
        }
    }

    override fun onRender(ctx: CanvasRenderingContext2D, dt: Double) {
        ctx.translate(x, y)
        if (image.complete && image.naturalHeight != 0) {
            ctx.drawImage(image, 0.0, 0.0)
        }
    }

}