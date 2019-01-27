import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLImageElement
import kotlin.browser.document
import kotlin.math.max
import kotlin.math.min

class Item: Renderable {

    val image: HTMLImageElement
    var x: Double
    var y: Double
    var alpha: Double
    val fadeSpeed: Float
    val depth: Int
    private var fadingIn = true

    constructor(image: HTMLImageElement, x: Double, y: Double, alpha: Double, depth: Int = 0, fadeSpeed: Float = 0.2f) {
        this.image = image
        this.x = x
        this.y = y
        this.alpha = alpha
        this.fadeSpeed = fadeSpeed
        this.depth = depth
    }

    constructor(image: HTMLImageElement, x: Int, y: Int, alpha: Double, depth: Int = 0, fadeSpeed: Float = 0.2f): this(image, x.toDouble(), y.toDouble(), alpha, depth, fadeSpeed)

    constructor(imageSource: String, x: Double, y: Double, alpha: Double, depth: Int = 0, fadeSpeed: Float = 0.2f) {
        this.image = document.createElement("img") as HTMLImageElement
        this.image.src = imageSource
        this.x = x
        this.y = y
        this.alpha = alpha
        this.fadeSpeed = fadeSpeed
        this.depth = depth
    }

    constructor(imageSource: String, x: Int, y: Int, alpha: Double, depth: Int = 0, fadeSpeed: Float = 0.2f): this(imageSource, x.toDouble(), y.toDouble(), alpha, depth, fadeSpeed)

    override fun onTick(dt: Double) {
        if (fadingIn) {
            if (alpha >= 1.0) return
            alpha += dt / (1 / fadeSpeed)
            alpha = min(1.0, alpha)
        } else {
            if (alpha <= 0.0) return
            alpha -= dt / (1 / fadeSpeed)
            alpha = max(0.0, alpha)
        }
    }

    override fun onRender(ctx: CanvasRenderingContext2D, dt: Double) {
        ctx.globalAlpha = alpha
        ctx.translate(x, y)
        if (image.complete && image.naturalHeight != 0) {
            ctx.drawImage(image, 0.0, 0.0)
        }
    }

    fun fadeOut() {
        fadingIn = false
    }

}

fun item(imageSource: String, x: Int, y: Int, depth: Int = 0, fadeSpeed: Float = 0.2f): Item {
    return Item(imageSource, x, y, 0.0, depth, fadeSpeed)
}