
import org.w3c.dom.HTMLAnchorElement
import kotlin.browser.document

class Option(val text: String, val onClick: () -> Unit) {
    fun toAnchor(): HTMLAnchorElement {
        val anchor = document.createElement("a") as HTMLAnchorElement
        anchor.onclick = { onClick() }
        anchor.href = "#"
        anchor.text = text
        return anchor
    }
}

fun option(text: String, onClick: () -> Unit): Option {
    return Option(text, onClick)
}